(()=>{var Ha="169";var gh=0,vl=1,_h=2;var yc=1,Va=2,Mn=3,kn=0,Ne=1,be=2,Bn=0,Ii=1,ls=2,yl=3,Ml=4,xh=5,ni=100,vh=101,yh=102,Mh=103,Sh=104,bh=200,wh=201,Eh=202,Th=203,To=204,Ao=205,Ah=206,Rh=207,Ch=208,Ph=209,Ih=210,Lh=211,Uh=212,Dh=213,Nh=214,Ro=0,Co=1,Po=2,Ni=3,Io=4,Lo=5,Uo=6,Do=7,Mc=0,Fh=1,Oh=2,zn=0,Bh=1,zh=2,kh=3,Ga=4,Hh=5,Vh=6,Gh=7;var Sc=300,Fi=301,Oi=302,No=303,Fo=304,Tr=306,cs=1e3,ri=1001,Oo=1002,Qe=1003,Wh=1004;var ws=1005;var an=1006,qr=1007;var oi=1008;var En=1009,bc=1010,wc=1011,hs=1012,Wa=1013,ai=1014,bn=1015,ms=1016,Xa=1017,qa=1018,Bi=1020,Ec=35902,Tc=1021,Ac=1022,ln=1023,Rc=1024,Cc=1025,Li=1026,zi=1027,Pc=1028,Ya=1029,Ic=1030,Za=1031;var $a=1033,Zs=33776,$s=33777,Js=33778,Ks=33779,Bo=35840,zo=35841,ko=35842,Ho=35843,Vo=36196,Go=37492,Wo=37496,Xo=37808,qo=37809,Yo=37810,Zo=37811,$o=37812,Jo=37813,Ko=37814,Qo=37815,jo=37816,ta=37817,ea=37818,na=37819,ia=37820,sa=37821,Qs=36492,ra=36494,oa=36495,Lc=36283,aa=36284,la=36285,ca=36286;var tr=2300,ha=2301,Yr=2302,Sl=2400,bl=2401,wl=2402;var Xh=3200,qh=3201;var Uc=0,Yh=1,On="",Ue="srgb",Gn="srgb-linear",Ja="display-p3",Ar="display-p3-linear",er="linear",fe="srgb",nr="rec709",ir="p3";var mi=7680;var El=519,Zh=512,$h=513,Jh=514,Dc=515,Kh=516,Qh=517,jh=518,tu=519,Tl=35044;var Al="300 es",wn=2e3,sr=2001,Hn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Zr=Math.PI/180,ua=180/Math.PI;function gs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Oe(i,t,e){return Math.max(t,Math.min(e,i))}function eu(i,t){return(i%t+t)%t}function $r(i,t,e){return(1-e)*i+e*t}function ji(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ke(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Xt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Gt=class i{constructor(t,e,n,s,r,o,a,c,h){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,h)}set(t,e,n,s,r,o,a,c,h){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],h=n[1],u=n[4],d=n[7],l=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],E=s[1],S=s[4],T=s[7],I=s[2],R=s[5],C=s[8];return r[0]=o*_+a*E+c*I,r[3]=o*m+a*S+c*R,r[6]=o*p+a*T+c*C,r[1]=h*_+u*E+d*I,r[4]=h*m+u*S+d*R,r[7]=h*p+u*T+d*C,r[2]=l*_+f*E+g*I,r[5]=l*m+f*S+g*R,r[8]=l*p+f*T+g*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],u=t[8];return e*o*u-e*a*h-n*r*u+n*a*c+s*r*h-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],u=t[8],d=u*o-a*h,l=a*c-u*r,f=h*r-o*c,g=e*d+n*l+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*h-u*n)*_,t[2]=(a*n-s*o)*_,t[3]=l*_,t[4]=(u*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-h*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),h=Math.sin(r);return this.set(n*c,n*h,-n*(c*o+h*a)+o+t,-s*h,s*c,-s*(-h*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Jr.makeScale(t,e)),this}rotate(t){return this.premultiply(Jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Jr=new Gt;function Nc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function rr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nu(){let i=rr("canvas");return i.style.display="block",i}var Rl={};function js(i){i in Rl||(Rl[i]=!0,console.warn(i))}function iu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function su(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function ru(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Cl=new Gt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Pl=new Gt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ts={[Gn]:{transfer:er,primaries:nr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Ue]:{transfer:fe,primaries:nr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ar]:{transfer:er,primaries:ir,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Pl),fromReference:i=>i.applyMatrix3(Cl)},[Ja]:{transfer:fe,primaries:ir,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Pl),fromReference:i=>i.applyMatrix3(Cl).convertLinearToSRGB()}},ou=new Set([Gn,Ar]),oe={enabled:!0,_workingColorSpace:Gn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!ou.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=ts[t].toReference,s=ts[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return ts[i].primaries},getTransfer:function(i){return i===On?er:ts[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(ts[t].luminanceCoefficients)}};function Ui(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Kr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var gi,fa=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gi===void 0&&(gi=rr("canvas")),gi.width=t.width,gi.height=t.height;let n=gi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=gi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=rr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ui(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ui(e[n]/255)*255):e[n]=Ui(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},au=0,or=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:au++}),this.uuid=gs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Qr(s[o].image)):r.push(Qr(s[o]))}else r=Qr(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Qr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?fa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var lu=0,qe=class i extends Hn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ri,s=ri,r=an,o=oi,a=ln,c=En,h=i.DEFAULT_ANISOTROPY,u=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lu++}),this.uuid=gs(),this.name="",this.source=new or(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case cs:t.x=t.x-Math.floor(t.x);break;case ri:t.x=t.x<0?0:1;break;case Oo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case cs:t.y=t.y-Math.floor(t.y);break;case ri:t.y=t.y<0?0:1;break;case Oo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=Sc;qe.DEFAULT_ANISOTROPY=1;var Kt=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,h=c[0],u=c[4],d=c[8],l=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-l)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+l)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(h+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(h+1)/2,T=(f+1)/2,I=(p+1)/2,R=(u+l)/4,C=(d+_)/4,N=(g+m)/4;return S>T&&S>I?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=R/n,r=C/n):T>I?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=R/s,r=N/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=C/r,s=N/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(l-u)*(l-u));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-_)/E,this.z=(l-u)/E,this.w=Math.acos((h+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},da=class extends Hn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Kt(0,0,t,e),this.scissorTest=!1,this.viewport=new Kt(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new qe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new or(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Tn=class extends da{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ar=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var pa=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var cn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],h=n[s+1],u=n[s+2],d=n[s+3],l=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=h,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=l,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||c!==l||h!==f||u!==g){let m=1-a,p=c*l+h*f+u*g+d*_,E=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){let I=Math.sqrt(S),R=Math.atan2(I,p*E);m=Math.sin(m*R)/I,a=Math.sin(a*R)/I}let T=a*E;if(c=c*m+l*T,h=h*m+f*T,u=u*m+g*T,d=d*m+_*T,m===1-a){let I=1/Math.sqrt(c*c+h*h+u*u+d*d);c*=I,h*=I,u*=I,d*=I}}t[e]=c,t[e+1]=h,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o],l=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*d+c*f-h*l,t[e+1]=c*g+u*l+h*d-a*f,t[e+2]=h*g+u*f+a*l-c*d,t[e+3]=u*g-a*d-c*l-h*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,h=a(n/2),u=a(s/2),d=a(r/2),l=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=l*u*d+h*f*g,this._y=h*f*d-l*u*g,this._z=h*u*g+l*f*d,this._w=h*u*d-l*f*g;break;case"YXZ":this._x=l*u*d+h*f*g,this._y=h*f*d-l*u*g,this._z=h*u*g-l*f*d,this._w=h*u*d+l*f*g;break;case"ZXY":this._x=l*u*d-h*f*g,this._y=h*f*d+l*u*g,this._z=h*u*g+l*f*d,this._w=h*u*d-l*f*g;break;case"ZYX":this._x=l*u*d-h*f*g,this._y=h*f*d+l*u*g,this._z=h*u*g-l*f*d,this._w=h*u*d+l*f*g;break;case"YZX":this._x=l*u*d+h*f*g,this._y=h*f*d+l*u*g,this._z=h*u*g-l*f*d,this._w=h*u*d-l*f*g;break;case"XZY":this._x=l*u*d-h*f*g,this._y=h*f*d-l*u*g,this._z=h*u*g+l*f*d,this._w=h*u*d+l*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],h=e[2],u=e[6],d=e[10],l=n+a+d;if(l>0){let f=.5/Math.sqrt(l+1);this._w=.25/f,this._x=(u-c)*f,this._y=(r-h)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(u-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+h)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-h)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+u)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+h)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Oe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,h=e._z,u=e._w;return this._x=n*u+o*a+s*h-r*c,this._y=s*u+o*c+r*a-n*h,this._z=r*u+o*h+n*c-s*a,this._w=o*u-n*a-s*c-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let h=Math.sqrt(c),u=Math.atan2(h,a),d=Math.sin((1-e)*u)/h,l=Math.sin(e*u)/h;return this._w=o*d+this._w*l,this._x=n*d+this._x*l,this._y=s*d+this._y*l,this._z=r*d+this._z*l,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Il.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Il.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,h=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+c*h+o*d-a*u,this.y=n+c*u+a*h-r*d,this.z=s+c*d+r*u-o*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return jr.copy(this).projectOnVector(t),this.sub(jr)}reflect(t){return this.sub(jr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Oe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jr=new L,Il=new cn,li=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,sn):sn.fromBufferAttribute(r,o),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Es.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Es.copy(n.boundingBox)),Es.applyMatrix4(t.matrixWorld),this.union(Es)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(es),Ts.subVectors(this.max,es),_i.subVectors(t.a,es),xi.subVectors(t.b,es),vi.subVectors(t.c,es),In.subVectors(xi,_i),Ln.subVectors(vi,xi),$n.subVectors(_i,vi);let e=[0,-In.z,In.y,0,-Ln.z,Ln.y,0,-$n.z,$n.y,In.z,0,-In.x,Ln.z,0,-Ln.x,$n.z,0,-$n.x,-In.y,In.x,0,-Ln.y,Ln.x,0,-$n.y,$n.x,0];return!to(e,_i,xi,vi,Ts)||(e=[1,0,0,0,1,0,0,0,1],!to(e,_i,xi,vi,Ts))?!1:(As.crossVectors(In,Ln),e=[As.x,As.y,As.z],to(e,_i,xi,vi,Ts))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},gn=[new L,new L,new L,new L,new L,new L,new L,new L],sn=new L,Es=new li,_i=new L,xi=new L,vi=new L,In=new L,Ln=new L,$n=new L,es=new L,Ts=new L,As=new L,Jn=new L;function to(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Jn.fromArray(i,r);let a=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),c=t.dot(Jn),h=e.dot(Jn),u=n.dot(Jn);if(Math.max(-Math.max(c,h,u),Math.min(c,h,u))>a)return!1}return!0}var cu=new li,ns=new L,eo=new L,ki=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):cu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ns.subVectors(t,this.center);let e=ns.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(eo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ns.copy(t.center).add(eo)),this.expandByPoint(ns.copy(t.center).sub(eo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},_n=new L,no=new L,Rs=new L,Un=new L,io=new L,Cs=new L,so=new L,lr=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=_n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_n.copy(this.origin).addScaledVector(this.direction,e),_n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){no.copy(t).add(e).multiplyScalar(.5),Rs.copy(e).sub(t).normalize(),Un.copy(this.origin).sub(no);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Rs),a=Un.dot(this.direction),c=-Un.dot(Rs),h=Un.lengthSq(),u=Math.abs(1-o*o),d,l,f,g;if(u>0)if(d=o*c-a,l=o*a-c,g=r*u,d>=0)if(l>=-g)if(l<=g){let _=1/u;d*=_,l*=_,f=d*(d+o*l+2*a)+l*(o*d+l+2*c)+h}else l=r,d=Math.max(0,-(o*l+a)),f=-d*d+l*(l+2*c)+h;else l=-r,d=Math.max(0,-(o*l+a)),f=-d*d+l*(l+2*c)+h;else l<=-g?(d=Math.max(0,-(-o*r+a)),l=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+l*(l+2*c)+h):l<=g?(d=0,l=Math.min(Math.max(-r,-c),r),f=l*(l+2*c)+h):(d=Math.max(0,-(o*r+a)),l=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+l*(l+2*c)+h);else l=o>0?-r:r,d=Math.max(0,-(o*l+a)),f=-d*d+l*(l+2*c)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(no).addScaledVector(Rs,l),f}intersectSphere(t,e){_n.subVectors(t.center,this.origin);let n=_n.dot(this.direction),s=_n.dot(_n)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,h=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,l=this.origin;return h>=0?(n=(t.min.x-l.x)*h,s=(t.max.x-l.x)*h):(n=(t.max.x-l.x)*h,s=(t.min.x-l.x)*h),u>=0?(r=(t.min.y-l.y)*u,o=(t.max.y-l.y)*u):(r=(t.max.y-l.y)*u,o=(t.min.y-l.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-l.z)*d,c=(t.max.z-l.z)*d):(a=(t.max.z-l.z)*d,c=(t.min.z-l.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,_n)!==null}intersectTriangle(t,e,n,s,r){io.subVectors(e,t),Cs.subVectors(n,t),so.crossVectors(io,Cs);let o=this.direction.dot(so),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Un.subVectors(this.origin,t);let c=a*this.direction.dot(Cs.crossVectors(Un,Cs));if(c<0)return null;let h=a*this.direction.dot(io.cross(Un));if(h<0||c+h>o)return null;let u=-a*Un.dot(so);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ne=class i{constructor(t,e,n,s,r,o,a,c,h,u,d,l,f,g,_,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,h,u,d,l,f,g,_,m)}set(t,e,n,s,r,o,a,c,h,u,d,l,f,g,_,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=h,p[6]=u,p[10]=d,p[14]=l,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/yi.setFromMatrixColumn(t,0).length(),r=1/yi.setFromMatrixColumn(t,1).length(),o=1/yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),h=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let l=o*u,f=o*d,g=a*u,_=a*d;e[0]=c*u,e[4]=-c*d,e[8]=h,e[1]=f+g*h,e[5]=l-_*h,e[9]=-a*c,e[2]=_-l*h,e[6]=g+f*h,e[10]=o*c}else if(t.order==="YXZ"){let l=c*u,f=c*d,g=h*u,_=h*d;e[0]=l+_*a,e[4]=g*a-f,e[8]=o*h,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=_+l*a,e[10]=o*c}else if(t.order==="ZXY"){let l=c*u,f=c*d,g=h*u,_=h*d;e[0]=l-_*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=_-l*a,e[2]=-o*h,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let l=o*u,f=o*d,g=a*u,_=a*d;e[0]=c*u,e[4]=g*h-f,e[8]=l*h+_,e[1]=c*d,e[5]=_*h+l,e[9]=f*h-g,e[2]=-h,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let l=o*c,f=o*h,g=a*c,_=a*h;e[0]=c*u,e[4]=_-l*d,e[8]=g*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-h*u,e[6]=f*d+g,e[10]=l-_*d}else if(t.order==="XZY"){let l=o*c,f=o*h,g=a*c,_=a*h;e[0]=c*u,e[4]=-d,e[8]=h*u,e[1]=l*d+_,e[5]=o*u,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*u,e[10]=_*d+l}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hu,t,uu)}lookAt(t,e,n){let s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Dn.crossVectors(n,We),Dn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Dn.crossVectors(n,We)),Dn.normalize(),Ps.crossVectors(We,Dn),s[0]=Dn.x,s[4]=Ps.x,s[8]=We.x,s[1]=Dn.y,s[5]=Ps.y,s[9]=We.y,s[2]=Dn.z,s[6]=Ps.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],h=n[12],u=n[1],d=n[5],l=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],E=n[3],S=n[7],T=n[11],I=n[15],R=s[0],C=s[4],N=s[8],J=s[12],x=s[1],y=s[5],H=s[9],B=s[13],G=s[2],K=s[6],V=s[10],et=s[14],W=s[3],ut=s[7],ft=s[11],dt=s[15];return r[0]=o*R+a*x+c*G+h*W,r[4]=o*C+a*y+c*K+h*ut,r[8]=o*N+a*H+c*V+h*ft,r[12]=o*J+a*B+c*et+h*dt,r[1]=u*R+d*x+l*G+f*W,r[5]=u*C+d*y+l*K+f*ut,r[9]=u*N+d*H+l*V+f*ft,r[13]=u*J+d*B+l*et+f*dt,r[2]=g*R+_*x+m*G+p*W,r[6]=g*C+_*y+m*K+p*ut,r[10]=g*N+_*H+m*V+p*ft,r[14]=g*J+_*B+m*et+p*dt,r[3]=E*R+S*x+T*G+I*W,r[7]=E*C+S*y+T*K+I*ut,r[11]=E*N+S*H+T*V+I*ft,r[15]=E*J+S*B+T*et+I*dt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],h=t[13],u=t[2],d=t[6],l=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*c*d-s*h*d-r*a*l+n*h*l+s*a*f-n*c*f)+_*(+e*c*f-e*h*l+r*o*l-s*o*f+s*h*u-r*c*u)+m*(+e*h*d-e*a*f-r*o*d+n*o*f+r*a*u-n*h*u)+p*(-s*a*u-e*c*d+e*a*l+s*o*d-n*o*l+n*c*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],h=t[7],u=t[8],d=t[9],l=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],E=d*m*h-_*l*h+_*c*f-a*m*f-d*c*p+a*l*p,S=g*l*h-u*m*h-g*c*f+o*m*f+u*c*p-o*l*p,T=u*_*h-g*d*h+g*a*f-o*_*f-u*a*p+o*d*p,I=g*d*c-u*_*c-g*a*l+o*_*l+u*a*m-o*d*m,R=e*E+n*S+s*T+r*I;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/R;return t[0]=E*C,t[1]=(_*l*r-d*m*r-_*s*f+n*m*f+d*s*p-n*l*p)*C,t[2]=(a*m*r-_*c*r+_*s*h-n*m*h-a*s*p+n*c*p)*C,t[3]=(d*c*r-a*l*r-d*s*h+n*l*h+a*s*f-n*c*f)*C,t[4]=S*C,t[5]=(u*m*r-g*l*r+g*s*f-e*m*f-u*s*p+e*l*p)*C,t[6]=(g*c*r-o*m*r-g*s*h+e*m*h+o*s*p-e*c*p)*C,t[7]=(o*l*r-u*c*r+u*s*h-e*l*h-o*s*f+e*c*f)*C,t[8]=T*C,t[9]=(g*d*r-u*_*r-g*n*f+e*_*f+u*n*p-e*d*p)*C,t[10]=(o*_*r-g*a*r+g*n*h-e*_*h-o*n*p+e*a*p)*C,t[11]=(u*a*r-o*d*r-u*n*h+e*d*h+o*n*f-e*a*f)*C,t[12]=I*C,t[13]=(u*_*s-g*d*s+g*n*l-e*_*l-u*n*m+e*d*m)*C,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*m-e*a*m)*C,t[15]=(o*d*s-u*a*s+u*n*c-e*d*c-o*n*l+e*a*l)*C,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,h=r*o,u=r*a;return this.set(h*o+n,h*a-s*c,h*c+s*a,0,h*a+s*c,u*a+n,u*c-s*o,0,h*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,h=r+r,u=o+o,d=a+a,l=r*h,f=r*u,g=r*d,_=o*u,m=o*d,p=a*d,E=c*h,S=c*u,T=c*d,I=n.x,R=n.y,C=n.z;return s[0]=(1-(_+p))*I,s[1]=(f+T)*I,s[2]=(g-S)*I,s[3]=0,s[4]=(f-T)*R,s[5]=(1-(l+p))*R,s[6]=(m+E)*R,s[7]=0,s[8]=(g+S)*C,s[9]=(m-E)*C,s[10]=(1-(l+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=yi.set(s[0],s[1],s[2]).length(),o=yi.set(s[4],s[5],s[6]).length(),a=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],rn.copy(this);let h=1/r,u=1/o,d=1/a;return rn.elements[0]*=h,rn.elements[1]*=h,rn.elements[2]*=h,rn.elements[4]*=u,rn.elements[5]*=u,rn.elements[6]*=u,rn.elements[8]*=d,rn.elements[9]*=d,rn.elements[10]*=d,e.setFromRotationMatrix(rn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=wn){let c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),l=(n+s)/(n-s),f,g;if(a===wn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===sr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=l,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=wn){let c=this.elements,h=1/(e-t),u=1/(n-s),d=1/(o-r),l=(e+t)*h,f=(n+s)*u,g,_;if(a===wn)g=(o+r)*d,_=-2*d;else if(a===sr)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*h,c[4]=0,c[8]=0,c[12]=-l,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},yi=new L,rn=new ne,hu=new L(0,0,0),uu=new L(1,1,1),Dn=new L,Ps=new L,We=new L,Ll=new ne,Ul=new cn,je=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],h=s[5],u=s[9],d=s[2],l=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Oe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(l,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Oe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Oe(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Oe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(l,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(Oe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Oe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(l,h),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ll.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ll,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ul.setFromEuler(this),this.setFromQuaternion(Ul,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};je.DEFAULT_ORDER="XYZ";var cr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},fu=0,Dl=new L,Mi=new cn,xn=new ne,Is=new L,is=new L,du=new L,pu=new cn,Nl=new L(1,0,0),Fl=new L(0,1,0),Ol=new L(0,0,1),Bl={type:"added"},mu={type:"removed"},Si={type:"childadded",child:null},ro={type:"childremoved",child:null},Re=class i extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=gs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new je,n=new cn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new Gt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(Nl,t)}rotateY(t){return this.rotateOnAxis(Fl,t)}rotateZ(t){return this.rotateOnAxis(Ol,t)}translateOnAxis(t,e){return Dl.copy(t).applyQuaternion(this.quaternion),this.position.add(Dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Nl,t)}translateY(t){return this.translateOnAxis(Fl,t)}translateZ(t){return this.translateOnAxis(Ol,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Is.copy(t):Is.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(is,Is,this.up):xn.lookAt(Is,is,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(xn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bl),Si.child=t,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mu),ro.child=t,this.dispatchEvent(ro),ro.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bl),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,du),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,pu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let h=0,u=c.length;h<u;h++){let d=c[h];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,h=this.material.length;c<h;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),h=o(t.textures),u=o(t.images),d=o(t.shapes),l=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),h.length>0&&(n.textures=h),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),l.length>0&&(n.skeletons=l),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let h in a){let u=a[h];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Re.DEFAULT_UP=new L(0,1,0);Re.DEFAULT_MATRIX_AUTO_UPDATE=!0;Re.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var on=new L,vn=new L,oo=new L,yn=new L,bi=new L,wi=new L,zl=new L,ao=new L,lo=new L,co=new L,ho=new Kt,uo=new Kt,fo=new Kt,ii=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),on.subVectors(t,e),s.cross(on);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){on.subVectors(s,e),vn.subVectors(n,e),oo.subVectors(t,e);let o=on.dot(on),a=on.dot(vn),c=on.dot(oo),h=vn.dot(vn),u=vn.dot(oo),d=o*h-a*a;if(d===0)return r.set(0,0,0),null;let l=1/d,f=(h*c-a*u)*l,g=(o*u-a*c)*l;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,yn.x),c.addScaledVector(o,yn.y),c.addScaledVector(a,yn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return ho.setScalar(0),uo.setScalar(0),fo.setScalar(0),ho.fromBufferAttribute(t,e),uo.fromBufferAttribute(t,n),fo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ho,r.x),o.addScaledVector(uo,r.y),o.addScaledVector(fo,r.z),o}static isFrontFacing(t,e,n,s){return on.subVectors(n,e),vn.subVectors(t,e),on.cross(vn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),on.cross(vn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;bi.subVectors(s,n),wi.subVectors(r,n),ao.subVectors(t,n);let c=bi.dot(ao),h=wi.dot(ao);if(c<=0&&h<=0)return e.copy(n);lo.subVectors(t,s);let u=bi.dot(lo),d=wi.dot(lo);if(u>=0&&d<=u)return e.copy(s);let l=c*d-u*h;if(l<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(bi,o);co.subVectors(t,r);let f=bi.dot(co),g=wi.dot(co);if(g>=0&&f<=g)return e.copy(r);let _=f*h-c*g;if(_<=0&&h>=0&&g<=0)return a=h/(h-g),e.copy(n).addScaledVector(wi,a);let m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return zl.subVectors(r,s),a=(d-u)/(d-u+(f-g)),e.copy(s).addScaledVector(zl,a);let p=1/(m+_+l);return o=_*p,a=l*p,e.copy(n).addScaledVector(bi,o).addScaledVector(wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Fc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},Ls={h:0,s:0,l:0};function po(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Wt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ue){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=oe.workingColorSpace){if(t=eu(t,1),e=Oe(e,0,1),n=Oe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=po(o,r,t+1/3),this.g=po(o,r,t),this.b=po(o,r,t-1/3)}return oe.toWorkingColorSpace(this,s),this}setStyle(t,e=Ue){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ue){let n=Fc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ui(t.r),this.g=Ui(t.g),this.b=Ui(t.b),this}copyLinearToSRGB(t){return this.r=Kr(t.r),this.g=Kr(t.g),this.b=Kr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ue){return oe.fromWorkingColorSpace(Le.copy(this),t),Math.round(Oe(Le.r*255,0,255))*65536+Math.round(Oe(Le.g*255,0,255))*256+Math.round(Oe(Le.b*255,0,255))}getHexString(t=Ue){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(Le.copy(this),e);let n=Le.r,s=Le.g,r=Le.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,h,u=(a+o)/2;if(a===o)c=0,h=0;else{let d=o-a;switch(h=u<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=h,t.l=u,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=Ue){oe.fromWorkingColorSpace(Le.copy(this),t);let e=Le.r,n=Le.g,s=Le.b;return t!==Ue?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Nn),this.setHSL(Nn.h+t,Nn.s+e,Nn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Nn),t.getHSL(Ls);let n=$r(Nn.h,Ls.h,e),s=$r(Nn.s,Ls.s,e),r=$r(Nn.l,Ls.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Le=new Wt;Wt.NAMES=Fc;var gu=0,Vn=class extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=gs(),this.name="",this.type="Material",this.blending=Ii,this.side=kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=To,this.blendDst=Ao,this.blendEquation=ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=Ni,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=El,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(n.blending=this.blending),this.side!==kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==To&&(n.blendSrc=this.blendSrc),this.blendDst!==Ao&&(n.blendDst=this.blendDst),this.blendEquation!==ni&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ni&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==El&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},pn=class extends Vn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new je,this.combine=Mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Se=new L,Us=new Xt,de=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Tl,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Us.fromBufferAttribute(this,e),Us.applyMatrix3(t),this.setXY(e,Us.x,Us.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ji(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ke(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ji(e,this.array)),e}setX(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ji(e,this.array)),e}setY(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ji(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ji(e,this.array)),e}setW(t,e){return this.normalized&&(e=ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),s=ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ke(e,this.array),n=ke(n,this.array),s=ke(s,this.array),r=ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Tl&&(t.usage=this.usage),t}};var hr=class extends de{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ur=class extends de{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var pe=class extends de{constructor(t,e,n){super(new Float32Array(t),e,n)}},_u=0,Ke=new ne,mo=new Re,Ei=new L,Xe=new li,ss=new li,Ae=new L,we=class i extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=gs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Nc(t)?ur:hr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return mo.lookAt(t),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new pe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new li);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];ss.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(Xe.min,ss.min),Xe.expandByPoint(Ae),Ae.addVectors(Xe.max,ss.max),Xe.expandByPoint(Ae)):(Xe.expandByPoint(ss.min),Xe.expandByPoint(ss.max))}Xe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ae.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ae));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let h=0,u=a.count;h<u;h++)Ae.fromBufferAttribute(a,h),c&&(Ei.fromBufferAttribute(t,h),Ae.add(Ei)),s=Math.max(s,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new de(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new L,c[N]=new L;let h=new L,u=new L,d=new L,l=new Xt,f=new Xt,g=new Xt,_=new L,m=new L;function p(N,J,x){h.fromBufferAttribute(n,N),u.fromBufferAttribute(n,J),d.fromBufferAttribute(n,x),l.fromBufferAttribute(r,N),f.fromBufferAttribute(r,J),g.fromBufferAttribute(r,x),u.sub(h),d.sub(h),f.sub(l),g.sub(l);let y=1/(f.x*g.y-g.x*f.y);isFinite(y)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(y),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(y),a[N].add(_),a[J].add(_),a[x].add(_),c[N].add(m),c[J].add(m),c[x].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let N=0,J=E.length;N<J;++N){let x=E[N],y=x.start,H=x.count;for(let B=y,G=y+H;B<G;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let S=new L,T=new L,I=new L,R=new L;function C(N){I.fromBufferAttribute(s,N),R.copy(I);let J=a[N];S.copy(J),S.sub(I.multiplyScalar(I.dot(J))).normalize(),T.crossVectors(R,J);let y=T.dot(c[N])<0?-1:1;o.setXYZW(N,S.x,S.y,S.z,y)}for(let N=0,J=E.length;N<J;++N){let x=E[N],y=x.start,H=x.count;for(let B=y,G=y+H;B<G;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new de(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let l=0,f=n.count;l<f;l++)n.setXYZ(l,0,0,0);let s=new L,r=new L,o=new L,a=new L,c=new L,h=new L,u=new L,d=new L;if(t)for(let l=0,f=t.count;l<f;l+=3){let g=t.getX(l+0),_=t.getX(l+1),m=t.getX(l+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,m),a.add(u),c.add(u),h.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let l=0,f=e.count;l<f;l+=3)s.fromBufferAttribute(e,l+0),r.fromBufferAttribute(e,l+1),o.fromBufferAttribute(e,l+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(l+0,u.x,u.y,u.z),n.setXYZ(l+1,u.x,u.y,u.z),n.setXYZ(l+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,c){let h=a.array,u=a.itemSize,d=a.normalized,l=new h.constructor(c.length*u),f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*u;for(let p=0;p<u;p++)l[g++]=h[f++]}return new de(l,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],h=t(c,n);e.setAttribute(a,h)}let r=this.morphAttributes;for(let a in r){let c=[],h=r[a];for(let u=0,d=h.length;u<d;u++){let l=h[u],f=t(l,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let h=o[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let h in c)c[h]!==void 0&&(t[h]=c[h]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let h=n[c];t.data.attributes[c]=h.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let h=this.morphAttributes[c],u=[];for(let d=0,l=h.length;d<l;d++){let f=h[d];u.push(f.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let h in s){let u=s[h];this.setAttribute(h,u.clone(e))}let r=t.morphAttributes;for(let h in r){let u=[],d=r[h];for(let l=0,f=d.length;l<f;l++)u.push(d[l].clone(e));this.morphAttributes[h]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let h=0,u=o.length;h<u;h++){let d=o[h];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},kl=new ne,Kn=new lr,Ds=new ki,Hl=new L,Ns=new L,Fs=new L,Os=new L,go=new L,Bs=new L,Vl=new L,zs=new L,le=class extends Re{constructor(t=new we,e=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Bs.set(0,0,0);for(let c=0,h=r.length;c<h;c++){let u=a[c],d=r[c];u!==0&&(go.fromBufferAttribute(d,t),o?Bs.addScaledVector(go,u):Bs.addScaledVector(go.sub(e),u))}e.add(Bs)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere),Ds.applyMatrix4(r),Kn.copy(t.ray).recast(t.near),!(Ds.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(Ds,Hl)===null||Kn.origin.distanceToSquared(Hl)>(t.far-t.near)**2))&&(kl.copy(r).invert(),Kn.copy(t.ray).applyMatrix4(kl),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Kn)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,h=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,l=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=l.length;g<_;g++){let m=l[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),S=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let T=E,I=S;T<I;T+=3){let R=a.getX(T),C=a.getX(T+1),N=a.getX(T+2);s=ks(this,p,t,n,h,u,d,R,C,N),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let E=a.getX(m),S=a.getX(m+1),T=a.getX(m+2);s=ks(this,o,t,n,h,u,d,E,S,T),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=l.length;g<_;g++){let m=l[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),S=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let T=E,I=S;T<I;T+=3){let R=T,C=T+1,N=T+2;s=ks(this,p,t,n,h,u,d,R,C,N),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){let E=m,S=m+1,T=m+2;s=ks(this,o,t,n,h,u,d,E,S,T),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function xu(i,t,e,n,s,r,o,a){let c;if(t.side===Ne?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===kn,a),c===null)return null;zs.copy(a),zs.applyMatrix4(i.matrixWorld);let h=e.ray.origin.distanceTo(zs);return h<e.near||h>e.far?null:{distance:h,point:zs.clone(),object:i}}function ks(i,t,e,n,s,r,o,a,c,h){i.getVertexPosition(a,Ns),i.getVertexPosition(c,Fs),i.getVertexPosition(h,Os);let u=xu(i,t,e,n,Ns,Fs,Os,Vl);if(u){let d=new L;ii.getBarycoord(Vl,Ns,Fs,Os,d),s&&(u.uv=ii.getInterpolatedAttribute(s,a,c,h,d,new Xt)),r&&(u.uv1=ii.getInterpolatedAttribute(r,a,c,h,d,new Xt)),o&&(u.normal=ii.getInterpolatedAttribute(o,a,c,h,d,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let l={a,b:c,c:h,normal:new L,materialIndex:0};ii.getNormal(Ns,Fs,Os,l.normal),u.face=l,u.barycoord=d}return u}var hn=class i extends we{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],h=[],u=[],d=[],l=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pe(h,3)),this.setAttribute("normal",new pe(u,3)),this.setAttribute("uv",new pe(d,2));function g(_,m,p,E,S,T,I,R,C,N,J){let x=T/C,y=I/N,H=T/2,B=I/2,G=R/2,K=C+1,V=N+1,et=0,W=0,ut=new L;for(let ft=0;ft<V;ft++){let dt=ft*y-B;for(let qt=0;qt<K;qt++){let Yt=qt*x-H;ut[_]=Yt*E,ut[m]=dt*S,ut[p]=G,h.push(ut.x,ut.y,ut.z),ut[_]=0,ut[m]=0,ut[p]=R>0?1:-1,u.push(ut.x,ut.y,ut.z),d.push(qt/C),d.push(1-ft/N),et+=1}}for(let ft=0;ft<N;ft++)for(let dt=0;dt<C;dt++){let qt=l+dt+K*ft,Yt=l+dt+K*(ft+1),$=l+(dt+1)+K*(ft+1),tt=l+(dt+1)+K*ft;c.push(qt,Yt,tt),c.push(Yt,$,tt),W+=6}a.addGroup(f,W,J),f+=W,l+=et}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Hi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){let t={};for(let e=0;e<i.length;e++){let n=Hi(i[e]);for(let s in n)t[s]=n[s]}return t}function vu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Oc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}var yu={clone:Hi,merge:Fe},Mu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Su=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,tn=class extends Vn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mu,this.fragmentShader=Su,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hi(t.uniforms),this.uniformsGroups=vu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},fr=class extends Re{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Fn=new L,Gl=new Xt,Wl=new Xt,De=class extends fr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ua*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ua*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fn.x,Fn.y).multiplyScalar(-t/Fn.z)}getViewSize(t,e){return this.getViewBounds(t,Gl,Wl),e.subVectors(Wl,Gl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,h=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/h,s*=o.width/c,n*=o.height/h}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ti=-90,Ai=1,ma=class extends Re{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new De(Ti,Ai,t,e);s.layers=this.layers,this.add(s);let r=new De(Ti,Ai,t,e);r.layers=this.layers,this.add(r);let o=new De(Ti,Ai,t,e);o.layers=this.layers,this.add(o);let a=new De(Ti,Ai,t,e);a.layers=this.layers,this.add(a);let c=new De(Ti,Ai,t,e);c.layers=this.layers,this.add(c);let h=new De(Ti,Ai,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let h of e)this.remove(h);if(t===wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,h,u]=this.children,d=t.getRenderTarget(),l=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,l,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},dr=class extends qe{constructor(t,e,n,s,r,o,a,c,h,u){t=t!==void 0?t:[],e=e!==void 0?e:Fi,super(t,e,n,s,r,o,a,c,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ga=class extends Tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new dr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new hn(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Bn});r.uniforms.tEquirect.value=e;let o=new le(s,r),a=e.minFilter;return e.minFilter===oi&&(e.minFilter=an),new ma(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},_o=new L,bu=new L,wu=new Gt,Sn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=_o.subVectors(n,e).cross(bu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(_o),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||wu.getNormalMatrix(t),s=this.coplanarPoint(_o).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Qn=new ki,Hs=new L,us=class{constructor(t=new Sn,e=new Sn,n=new Sn,s=new Sn,r=new Sn,o=new Sn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=wn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],h=s[4],u=s[5],d=s[6],l=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],E=s[13],S=s[14],T=s[15];if(n[0].setComponents(c-r,l-h,m-f,T-p).normalize(),n[1].setComponents(c+r,l+h,m+f,T+p).normalize(),n[2].setComponents(c+o,l+u,m+g,T+E).normalize(),n[3].setComponents(c-o,l-u,m-g,T-E).normalize(),n[4].setComponents(c-a,l-d,m-_,T-S).normalize(),e===wn)n[5].setComponents(c+a,l+d,m+_,T+S).normalize();else if(e===sr)n[5].setComponents(a,d,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){return Qn.center.set(0,0,0),Qn.radius=.7071067811865476,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Hs.x=s.normal.x>0?t.max.x:t.min.x,Hs.y=s.normal.y>0?t.max.y:t.min.y,Hs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Bc(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Eu(i){let t=new WeakMap;function e(a,c){let h=a.array,u=a.usage,d=h.byteLength,l=i.createBuffer();i.bindBuffer(c,l),i.bufferData(c,h,u),a.onUploadCallback();let f;if(h instanceof Float32Array)f=i.FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=i.SHORT;else if(h instanceof Uint32Array)f=i.UNSIGNED_INT;else if(h instanceof Int32Array)f=i.INT;else if(h instanceof Int8Array)f=i.BYTE;else if(h instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:l,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,h){let u=c.array,d=c.updateRanges;if(i.bindBuffer(h,a),d.length===0)i.bufferSubData(h,0,u);else{d.sort((f,g)=>f.start-g.start);let l=0;for(let f=1;f<d.length;f++){let g=d[l],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++l,d[l]=_)}d.length=l+1;for(let f=0,g=d.length;f<g;f++){let _=d[f];i.bufferSubData(h,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let h=t.get(a);if(h===void 0)t.set(a,e(a,c));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,c),h.version=a.version}}return{get:s,remove:r,update:o}}var xe=class i extends we{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),h=a+1,u=c+1,d=t/a,l=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){let E=p*l-o;for(let S=0;S<h;S++){let T=S*d-r;g.push(T,-E,0),_.push(0,0,1),m.push(S/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let E=0;E<a;E++){let S=E+h*p,T=E+h*(p+1),I=E+1+h*(p+1),R=E+1+h*p;f.push(S,T,R),f.push(T,I,R)}this.setIndex(f),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Tu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Au=`#ifdef USE_ALPHAHASH
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
#endif`,Ru=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Iu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lu=`#ifdef USE_AOMAP
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
#endif`,Uu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Du=`#ifdef USE_BATCHING
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
#endif`,Nu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ou=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zu=`#ifdef USE_IRIDESCENCE
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
#endif`,ku=`#ifdef USE_BUMPMAP
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
#endif`,Hu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zu=`#if defined( USE_COLOR_ALPHA )
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
#endif`,$u=`#define PI 3.141592653589793
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
} // validated`,Ju=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ku=`vec3 transformedNormal = objectNormal;
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
#endif`,Qu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ju=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,tf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ef=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nf="gl_FragColor = linearToOutputTexel( gl_FragColor );",sf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rf=`#ifdef USE_ENVMAP
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
#endif`,of=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,af=`#ifdef USE_ENVMAP
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
#endif`,lf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cf=`#ifdef USE_ENVMAP
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
#endif`,hf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ff=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,df=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pf=`#ifdef USE_GRADIENTMAP
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
}`,mf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xf=`uniform bool receiveShadow;
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
#endif`,vf=`#ifdef USE_ENVMAP
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
#endif`,yf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wf=`PhysicalMaterial material;
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
#endif`,Ef=`struct PhysicalMaterial {
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
}`,Tf=`
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
#endif`,Af=`#if defined( RE_IndirectDiffuse )
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
#endif`,Rf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,If=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Df=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Nf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ff=`#if defined( USE_POINTS_UV )
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
#endif`,Of=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vf=`#ifdef USE_MORPHTARGETS
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
#endif`,Gf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$f=`#ifdef USE_NORMALMAP
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
#endif`,Jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,td=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ed=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,nd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,id=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,sd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,od=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ad=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ld=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ud=`float getShadowMask() {
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
}`,fd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dd=`#ifdef USE_SKINNING
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
#endif`,pd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,md=`#ifdef USE_SKINNING
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
#endif`,gd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,_d=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,xd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,yd=`#ifdef USE_TRANSMISSION
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
#endif`,Md=`#ifdef USE_TRANSMISSION
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
#endif`,Sd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ed=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Td=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ad=`uniform sampler2D t2D;
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
}`,Rd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Pd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Id=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ld=`#include <common>
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
}`,Ud=`#if DEPTH_PACKING == 3200
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
}`,Dd=`#define DISTANCE
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
}`,Nd=`#define DISTANCE
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
}`,Fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Od=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bd=`uniform float scale;
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
}`,zd=`uniform vec3 diffuse;
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
}`,kd=`#include <common>
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
}`,Hd=`uniform vec3 diffuse;
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
}`,Vd=`#define LAMBERT
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
}`,Gd=`#define LAMBERT
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
}`,Wd=`#define MATCAP
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
}`,Xd=`#define MATCAP
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
}`,qd=`#define NORMAL
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
}`,Yd=`#define NORMAL
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
}`,Zd=`#define PHONG
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
}`,$d=`#define PHONG
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
}`,Jd=`#define STANDARD
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
}`,Kd=`#define STANDARD
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
}`,Qd=`#define TOON
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
}`,jd=`#define TOON
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
}`,t0=`uniform float size;
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
}`,e0=`uniform vec3 diffuse;
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
}`,n0=`#include <common>
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
}`,i0=`uniform vec3 color;
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
}`,s0=`uniform float rotation;
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
}`,r0=`uniform vec3 diffuse;
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
}`,Vt={alphahash_fragment:Tu,alphahash_pars_fragment:Au,alphamap_fragment:Ru,alphamap_pars_fragment:Cu,alphatest_fragment:Pu,alphatest_pars_fragment:Iu,aomap_fragment:Lu,aomap_pars_fragment:Uu,batching_pars_vertex:Du,batching_vertex:Nu,begin_vertex:Fu,beginnormal_vertex:Ou,bsdfs:Bu,iridescence_fragment:zu,bumpmap_pars_fragment:ku,clipping_planes_fragment:Hu,clipping_planes_pars_fragment:Vu,clipping_planes_pars_vertex:Gu,clipping_planes_vertex:Wu,color_fragment:Xu,color_pars_fragment:qu,color_pars_vertex:Yu,color_vertex:Zu,common:$u,cube_uv_reflection_fragment:Ju,defaultnormal_vertex:Ku,displacementmap_pars_vertex:Qu,displacementmap_vertex:ju,emissivemap_fragment:tf,emissivemap_pars_fragment:ef,colorspace_fragment:nf,colorspace_pars_fragment:sf,envmap_fragment:rf,envmap_common_pars_fragment:of,envmap_pars_fragment:af,envmap_pars_vertex:lf,envmap_physical_pars_fragment:vf,envmap_vertex:cf,fog_vertex:hf,fog_pars_vertex:uf,fog_fragment:ff,fog_pars_fragment:df,gradientmap_pars_fragment:pf,lightmap_pars_fragment:mf,lights_lambert_fragment:gf,lights_lambert_pars_fragment:_f,lights_pars_begin:xf,lights_toon_fragment:yf,lights_toon_pars_fragment:Mf,lights_phong_fragment:Sf,lights_phong_pars_fragment:bf,lights_physical_fragment:wf,lights_physical_pars_fragment:Ef,lights_fragment_begin:Tf,lights_fragment_maps:Af,lights_fragment_end:Rf,logdepthbuf_fragment:Cf,logdepthbuf_pars_fragment:Pf,logdepthbuf_pars_vertex:If,logdepthbuf_vertex:Lf,map_fragment:Uf,map_pars_fragment:Df,map_particle_fragment:Nf,map_particle_pars_fragment:Ff,metalnessmap_fragment:Of,metalnessmap_pars_fragment:Bf,morphinstance_vertex:zf,morphcolor_vertex:kf,morphnormal_vertex:Hf,morphtarget_pars_vertex:Vf,morphtarget_vertex:Gf,normal_fragment_begin:Wf,normal_fragment_maps:Xf,normal_pars_fragment:qf,normal_pars_vertex:Yf,normal_vertex:Zf,normalmap_pars_fragment:$f,clearcoat_normal_fragment_begin:Jf,clearcoat_normal_fragment_maps:Kf,clearcoat_pars_fragment:Qf,iridescence_pars_fragment:jf,opaque_fragment:td,packing:ed,premultiplied_alpha_fragment:nd,project_vertex:id,dithering_fragment:sd,dithering_pars_fragment:rd,roughnessmap_fragment:od,roughnessmap_pars_fragment:ad,shadowmap_pars_fragment:ld,shadowmap_pars_vertex:cd,shadowmap_vertex:hd,shadowmask_pars_fragment:ud,skinbase_vertex:fd,skinning_pars_vertex:dd,skinning_vertex:pd,skinnormal_vertex:md,specularmap_fragment:gd,specularmap_pars_fragment:_d,tonemapping_fragment:xd,tonemapping_pars_fragment:vd,transmission_fragment:yd,transmission_pars_fragment:Md,uv_pars_fragment:Sd,uv_pars_vertex:bd,uv_vertex:wd,worldpos_vertex:Ed,background_vert:Td,background_frag:Ad,backgroundCube_vert:Rd,backgroundCube_frag:Cd,cube_vert:Pd,cube_frag:Id,depth_vert:Ld,depth_frag:Ud,distanceRGBA_vert:Dd,distanceRGBA_frag:Nd,equirect_vert:Fd,equirect_frag:Od,linedashed_vert:Bd,linedashed_frag:zd,meshbasic_vert:kd,meshbasic_frag:Hd,meshlambert_vert:Vd,meshlambert_frag:Gd,meshmatcap_vert:Wd,meshmatcap_frag:Xd,meshnormal_vert:qd,meshnormal_frag:Yd,meshphong_vert:Zd,meshphong_frag:$d,meshphysical_vert:Jd,meshphysical_frag:Kd,meshtoon_vert:Qd,meshtoon_frag:jd,points_vert:t0,points_frag:e0,shadow_vert:n0,shadow_frag:i0,sprite_vert:s0,sprite_frag:r0},at={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},dn={basic:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Fe([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Fe([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Fe([at.points,at.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Fe([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Fe([at.common,at.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Fe([at.sprite,at.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Fe([at.common,at.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Fe([at.lights,at.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};dn.physical={uniforms:Fe([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var Vs={r:0,b:0,g:0},jn=new je,o0=new ne;function a0(i,t,e,n,s,r,o){let a=new Wt(0),c=r===!0?0:1,h,u,d=null,l=0,f=null;function g(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?e:t).get(S)),S}function _(E){let S=!1,T=g(E);T===null?p(a,c):T&&T.isColor&&(p(T,1),S=!0);let I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,S){let T=g(S);T&&(T.isCubeTexture||T.mapping===Tr)?(u===void 0&&(u=new le(new hn(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:Hi(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),jn.copy(S.backgroundRotation),jn.x*=-1,jn.y*=-1,jn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(o0.makeRotationFromEuler(jn)),u.material.toneMapped=oe.getTransfer(T.colorSpace)!==fe,(d!==T||l!==T.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,d=T,l=T.version,f=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(h===void 0&&(h=new le(new xe(2,2),new tn({name:"BackgroundMaterial",uniforms:Hi(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=T,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.toneMapped=oe.getTransfer(T.colorSpace)!==fe,T.matrixAutoUpdate===!0&&T.updateMatrix(),h.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||l!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=T,l=T.version,f=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null))}function p(E,S){E.getRGB(Vs,Oc(i)),n.buffers.color.setClear(Vs.r,Vs.g,Vs.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(E,S=1){a.set(E),c=S,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(a,c)},render:_,addToRenderList:m}}function l0(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=l(null),r=s,o=!1;function a(x,y,H,B,G){let K=!1,V=d(B,H,y);r!==V&&(r=V,h(r.object)),K=f(x,B,H,G),K&&g(x,B,H,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,T(x,y,H,B),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function h(x){return i.bindVertexArray(x)}function u(x){return i.deleteVertexArray(x)}function d(x,y,H){let B=H.wireframe===!0,G=n[x.id];G===void 0&&(G={},n[x.id]=G);let K=G[y.id];K===void 0&&(K={},G[y.id]=K);let V=K[B];return V===void 0&&(V=l(c()),K[B]=V),V}function l(x){let y=[],H=[],B=[];for(let G=0;G<e;G++)y[G]=0,H[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:H,attributeDivisors:B,object:x,attributes:{},index:null}}function f(x,y,H,B){let G=r.attributes,K=y.attributes,V=0,et=H.getAttributes();for(let W in et)if(et[W].location>=0){let ft=G[W],dt=K[W];if(dt===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(dt=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(dt=x.instanceColor)),ft===void 0||ft.attribute!==dt||dt&&ft.data!==dt.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function g(x,y,H,B){let G={},K=y.attributes,V=0,et=H.getAttributes();for(let W in et)if(et[W].location>=0){let ft=K[W];ft===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(ft=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(ft=x.instanceColor));let dt={};dt.attribute=ft,ft&&ft.data&&(dt.data=ft.data),G[W]=dt,V++}r.attributes=G,r.attributesNum=V,r.index=B}function _(){let x=r.newAttributes;for(let y=0,H=x.length;y<H;y++)x[y]=0}function m(x){p(x,0)}function p(x,y){let H=r.newAttributes,B=r.enabledAttributes,G=r.attributeDivisors;H[x]=1,B[x]===0&&(i.enableVertexAttribArray(x),B[x]=1),G[x]!==y&&(i.vertexAttribDivisor(x,y),G[x]=y)}function E(){let x=r.newAttributes,y=r.enabledAttributes;for(let H=0,B=y.length;H<B;H++)y[H]!==x[H]&&(i.disableVertexAttribArray(H),y[H]=0)}function S(x,y,H,B,G,K,V){V===!0?i.vertexAttribIPointer(x,y,H,G,K):i.vertexAttribPointer(x,y,H,B,G,K)}function T(x,y,H,B){_();let G=B.attributes,K=H.getAttributes(),V=y.defaultAttributeValues;for(let et in K){let W=K[et];if(W.location>=0){let ut=G[et];if(ut===void 0&&(et==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),et==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),ut!==void 0){let ft=ut.normalized,dt=ut.itemSize,qt=t.get(ut);if(qt===void 0)continue;let Yt=qt.buffer,$=qt.type,tt=qt.bytesPerElement,_t=$===i.INT||$===i.UNSIGNED_INT||ut.gpuType===Wa;if(ut.isInterleavedBufferAttribute){let X=ut.data,ct=X.stride,nt=ut.offset;if(X.isInstancedInterleavedBuffer){for(let It=0;It<W.locationSize;It++)p(W.location+It,X.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let It=0;It<W.locationSize;It++)m(W.location+It);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let It=0;It<W.locationSize;It++)S(W.location+It,dt/W.locationSize,$,ft,ct*tt,(nt+dt/W.locationSize*It)*tt,_t)}else{if(ut.isInstancedBufferAttribute){for(let X=0;X<W.locationSize;X++)p(W.location+X,ut.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let X=0;X<W.locationSize;X++)m(W.location+X);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let X=0;X<W.locationSize;X++)S(W.location+X,dt/W.locationSize,$,ft,dt*tt,dt/W.locationSize*X*tt,_t)}}else if(V!==void 0){let ft=V[et];if(ft!==void 0)switch(ft.length){case 2:i.vertexAttrib2fv(W.location,ft);break;case 3:i.vertexAttrib3fv(W.location,ft);break;case 4:i.vertexAttrib4fv(W.location,ft);break;default:i.vertexAttrib1fv(W.location,ft)}}}}E()}function I(){N();for(let x in n){let y=n[x];for(let H in y){let B=y[H];for(let G in B)u(B[G].object),delete B[G];delete y[H]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;let y=n[x.id];for(let H in y){let B=y[H];for(let G in B)u(B[G].object),delete B[G];delete y[H]}delete n[x.id]}function C(x){for(let y in n){let H=n[y];if(H[x.id]===void 0)continue;let B=H[x.id];for(let G in B)u(B[G].object),delete B[G];delete H[x.id]}}function N(){J(),o=!0,r!==s&&(r=s,h(r.object))}function J(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:J,dispose:I,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function c0(i,t,e){let n;function s(h){n=h}function r(h,u){i.drawArrays(n,h,u),e.update(u,n,1)}function o(h,u,d){d!==0&&(i.drawArraysInstanced(n,h,u,d),e.update(u,n,d))}function a(h,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];e.update(f,n,1)}function c(h,u,d,l){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h.length;g++)o(h[g],u[g],l[g]);else{f.multiDrawArraysInstancedWEBGL(n,h,0,u,0,l,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];for(let _=0;_<l.length;_++)e.update(g,n,l[_])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function h0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==ln&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let N=C===ms&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==En&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==bn&&!N)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp",u=c(h);u!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);let d=e.logarithmicDepthBuffer===!0,l=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(l===!0){let C=t.get("EXT_clip_control");C.clipControlEXT(C.LOWER_LEFT_EXT,C.ZERO_TO_ONE_EXT)}let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:d,reverseDepthBuffer:l,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:T,vertexTextures:I,maxSamples:R}}function u0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Sn,a=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,l){let f=d.length!==0||l||n!==0||s;return s=l,n=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,l){e=u(d,l,0)},this.setState=function(d,l,f){let g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):h();else{let E=r?0:n,S=E*4,T=p.clippingState||null;c.value=T,T=u(g,l,S,f);for(let I=0;I!==S;++I)T[I]=e[I];p.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function h(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,l,f,g){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=c.value,g!==!0||m===null){let p=f+_*4,E=l.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,T=f;S!==_;++S,T+=4)o.copy(d[S]).applyMatrix4(E,a),o.normal.toArray(m,T),m[T+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function f0(i){let t=new WeakMap;function e(o,a){return a===No?o.mapping=Fi:a===Fo&&(o.mapping=Oi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===No||a===Fo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let h=new ga(c.height);return h.fromEquirectangularTexture(i,o),t.set(o,h),o.addEventListener("dispose",s),e(h.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var pr=class extends fr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,o=r+h*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ci=4,Xl=[.125,.215,.35,.446,.526,.582],si=20,xo=new pr,ql=new Wt,vo=null,yo=0,Mo=0,So=!1,ei=(1+Math.sqrt(5))/2,Ri=1/ei,Yl=[new L(-ei,Ri,0),new L(ei,Ri,0),new L(-Ri,0,ei),new L(Ri,0,ei),new L(0,ei,-Ri),new L(0,ei,Ri),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Vi=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){vo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),Mo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$l(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(vo,yo,Mo),this._renderer.xr.enabled=So,t.scissorTest=!1,Gs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Fi||t.mapping===Oi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),vo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),Mo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:ms,format:ln,colorSpace:Gn,depthBuffer:!1},s=Zl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zl(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=d0(r)),this._blurMaterial=p0(r,t,e)}return s}_compileMaterial(t){let e=new le(this._lodPlanes[0],t);this._renderer.compile(e,xo)}_sceneToCubeUV(t,e,n,s){let a=new De(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,l=u.toneMapping;u.getClearColor(ql),u.toneMapping=zn,u.autoClear=!1;let f=new pn({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new le(new hn,f),_=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(ql),_=!0);for(let p=0;p<6;p++){let E=p%3;E===0?(a.up.set(0,c[p],0),a.lookAt(h[p],0,0)):E===1?(a.up.set(0,0,c[p]),a.lookAt(0,h[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,h[p]));let S=this._cubeSize;Gs(s,E*S,p>2?S:0,S,S),u.setRenderTarget(s),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=l,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Fi||t.mapping===Oi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$l());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new le(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;Gs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,xo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Yl[(s-r-1)%Yl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,h=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new le(this._lodPlanes[s],h),l=h.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*si-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):si;m>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);let p=[],E=0;for(let C=0;C<si;++C){let N=C/_,J=Math.exp(-N*N/2);p.push(J),C===0?E+=J:C<m&&(E+=2*J)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;l.envMap.value=t.texture,l.samples.value=m,l.weights.value=p,l.latitudinal.value=o==="latitudinal",a&&(l.poleAxis.value=a);let{_lodMax:S}=this;l.dTheta.value=g,l.mipInt.value=S-n;let T=this._sizeLods[s],I=3*T*(s>S-Ci?s-S+Ci:0),R=4*(this._cubeSize-T);Gs(e,I,R,3*T,2*T),c.setRenderTarget(e),c.render(d,xo)}};function d0(i){let t=[],e=[],n=[],s=i,r=i-Ci+1+Xl.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Ci?c=Xl[o-i+Ci-1]:o===0&&(c=0),n.push(c);let h=1/(a-2),u=-h,d=1+h,l=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*f),S=new Float32Array(m*g*f),T=new Float32Array(p*g*f);for(let R=0;R<f;R++){let C=R%3*2/3-1,N=R>2?0:-1,J=[C,N,0,C+2/3,N,0,C+2/3,N+1,0,C,N,0,C+2/3,N+1,0,C,N+1,0];E.set(J,_*g*R),S.set(l,m*g*R);let x=[R,R,R,R,R,R];T.set(x,p*g*R)}let I=new we;I.setAttribute("position",new de(E,_)),I.setAttribute("uv",new de(S,m)),I.setAttribute("faceIndex",new de(T,p)),t.push(I),s>Ci&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Zl(i,t,e){let n=new Tn(i,t,e);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Gs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function p0(i,t,e){let n=new Float32Array(si),s=new L(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function $l(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ka(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Jl(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ka(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ka(){return`

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
	`}function m0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,h=c===No||c===Fo,u=c===Fi||c===Oi;if(h||u){let d=t.get(a),l=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==l)return e===null&&(e=new Vi(i)),d=h?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return h&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Vi(i)),d=h?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0,h=6;for(let u=0;u<h;u++)a[u]!==void 0&&c++;return c===h}function r(a){let c=a.target;c.removeEventListener("dispose",r);let h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function g0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&js("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function _0(i,t,e,n){let s={},r=new WeakMap;function o(d){let l=d.target;l.index!==null&&t.remove(l.index);for(let g in l.attributes)t.remove(l.attributes[g]);for(let g in l.morphAttributes){let _=l.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}l.removeEventListener("dispose",o),delete s[l.id];let f=r.get(l);f&&(t.remove(f),r.delete(l)),n.releaseStatesOfGeometry(l),l.isInstancedBufferGeometry===!0&&delete l._maxInstanceCount,e.memory.geometries--}function a(d,l){return s[l.id]===!0||(l.addEventListener("dispose",o),s[l.id]=!0,e.memory.geometries++),l}function c(d){let l=d.attributes;for(let g in l)t.update(l[g],i.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function h(d){let l=[],f=d.index,g=d.attributes.position,_=0;if(f!==null){let E=f.array;_=f.version;for(let S=0,T=E.length;S<T;S+=3){let I=E[S+0],R=E[S+1],C=E[S+2];l.push(I,R,R,C,C,I)}}else if(g!==void 0){let E=g.array;_=g.version;for(let S=0,T=E.length/3-1;S<T;S+=3){let I=S+0,R=S+1,C=S+2;l.push(I,R,R,C,C,I)}}else return;let m=new(Nc(l)?ur:hr)(l,1);m.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function u(d){let l=r.get(d);if(l){let f=d.index;f!==null&&l.version<f.version&&h(d)}else h(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function x0(i,t,e){let n;function s(l){n=l}let r,o;function a(l){r=l.type,o=l.bytesPerElement}function c(l,f){i.drawElements(n,f,r,l*o),e.update(f,n,1)}function h(l,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,l*o,g),e.update(f,n,g))}function u(l,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,l,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function d(l,f,g,_){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<l.length;p++)h(l[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,l,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E];for(let E=0;E<_.length;E++)e.update(p,n,_[E])}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=h,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function v0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function y0(i,t,e){let n=new WeakMap,s=new Kt;function r(o,a,c){let h=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,l=n.get(a);if(l===void 0||l.count!==d){let J=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",J)};l!==void 0&&l.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],S=0;f===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let T=a.attributes.position.count*S,I=1;T>t.maxTextureSize&&(I=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);let R=new Float32Array(T*I*4*d),C=new ar(R,T,I,d);C.type=bn,C.needsUpdate=!0;let N=S*4;for(let x=0;x<d;x++){let y=m[x],H=p[x],B=E[x],G=T*I*4*x;for(let K=0;K<y.count;K++){let V=K*N;f===!0&&(s.fromBufferAttribute(y,K),R[G+V+0]=s.x,R[G+V+1]=s.y,R[G+V+2]=s.z,R[G+V+3]=0),g===!0&&(s.fromBufferAttribute(H,K),R[G+V+4]=s.x,R[G+V+5]=s.y,R[G+V+6]=s.z,R[G+V+7]=0),_===!0&&(s.fromBufferAttribute(B,K),R[G+V+8]=s.x,R[G+V+9]=s.y,R[G+V+10]=s.z,R[G+V+11]=B.itemSize===4?s.w:1)}}l={count:d,texture:C,size:new Xt(T,I)},n.set(a,l),a.addEventListener("dispose",J)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<h.length;_++)f+=h[_];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",h)}c.getUniforms().setValue(i,"morphTargetsTexture",l.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",l.size)}return{update:r}}function M0(i,t,e,n){let s=new WeakMap;function r(c){let h=n.render.frame,u=c.geometry,d=t.get(c,u);if(s.get(d)!==h&&(t.update(d),s.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let l=c.skeleton;s.get(l)!==h&&(l.update(),s.set(l,h))}return d}function o(){s=new WeakMap}function a(c){let h=c.target;h.removeEventListener("dispose",a),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:o}}var mr=class extends qe{constructor(t,e,n,s,r,o,a,c,h,u=Li){if(u!==Li&&u!==zi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Li&&(n=ai),n===void 0&&u===zi&&(n=Bi),super(null,s,r,o,a,c,u,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Qe,this.minFilter=c!==void 0?c:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},zc=new qe,Kl=new mr(1,1),kc=new ar,Hc=new pa,Vc=new dr,Ql=[],jl=[],tc=new Float32Array(16),ec=new Float32Array(9),nc=new Float32Array(4);function qi(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Ql[s];if(r===void 0&&(r=new Float32Array(s),Ql[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Te(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Rr(i,t){let e=jl[t];e===void 0&&(e=new Int32Array(t),jl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function S0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function b0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),Te(e,t)}}function w0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),Te(e,t)}}function E0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),Te(e,t)}}function T0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;nc.set(n),i.uniformMatrix2fv(this.addr,!1,nc),Te(e,n)}}function A0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;ec.set(n),i.uniformMatrix3fv(this.addr,!1,ec),Te(e,n)}}function R0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(Ee(e,n))return;tc.set(n),i.uniformMatrix4fv(this.addr,!1,tc),Te(e,n)}}function C0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function P0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),Te(e,t)}}function I0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),Te(e,t)}}function L0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),Te(e,t)}}function U0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function D0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),Te(e,t)}}function N0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),Te(e,t)}}function F0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),Te(e,t)}}function O0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Kl.compareFunction=Dc,r=Kl):r=zc,e.setTexture2D(t||r,s)}function B0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Hc,s)}function z0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Vc,s)}function k0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||kc,s)}function H0(i){switch(i){case 5126:return S0;case 35664:return b0;case 35665:return w0;case 35666:return E0;case 35674:return T0;case 35675:return A0;case 35676:return R0;case 5124:case 35670:return C0;case 35667:case 35671:return P0;case 35668:case 35672:return I0;case 35669:case 35673:return L0;case 5125:return U0;case 36294:return D0;case 36295:return N0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return O0;case 35679:case 36299:case 36307:return B0;case 35680:case 36300:case 36308:case 36293:return z0;case 36289:case 36303:case 36311:case 36292:return k0}}function V0(i,t){i.uniform1fv(this.addr,t)}function G0(i,t){let e=qi(t,this.size,2);i.uniform2fv(this.addr,e)}function W0(i,t){let e=qi(t,this.size,3);i.uniform3fv(this.addr,e)}function X0(i,t){let e=qi(t,this.size,4);i.uniform4fv(this.addr,e)}function q0(i,t){let e=qi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Y0(i,t){let e=qi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Z0(i,t){let e=qi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function $0(i,t){i.uniform1iv(this.addr,t)}function J0(i,t){i.uniform2iv(this.addr,t)}function K0(i,t){i.uniform3iv(this.addr,t)}function Q0(i,t){i.uniform4iv(this.addr,t)}function j0(i,t){i.uniform1uiv(this.addr,t)}function tp(i,t){i.uniform2uiv(this.addr,t)}function ep(i,t){i.uniform3uiv(this.addr,t)}function np(i,t){i.uniform4uiv(this.addr,t)}function ip(i,t,e){let n=this.cache,s=t.length,r=Rr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||zc,r[o])}function sp(i,t,e){let n=this.cache,s=t.length,r=Rr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Hc,r[o])}function rp(i,t,e){let n=this.cache,s=t.length,r=Rr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Vc,r[o])}function op(i,t,e){let n=this.cache,s=t.length,r=Rr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),Te(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||kc,r[o])}function ap(i){switch(i){case 5126:return V0;case 35664:return G0;case 35665:return W0;case 35666:return X0;case 35674:return q0;case 35675:return Y0;case 35676:return Z0;case 5124:case 35670:return $0;case 35667:case 35671:return J0;case 35668:case 35672:return K0;case 35669:case 35673:return Q0;case 5125:return j0;case 36294:return tp;case 36295:return ep;case 36296:return np;case 35678:case 36198:case 36298:case 36306:case 35682:return ip;case 35679:case 36299:case 36307:return sp;case 35680:case 36300:case 36308:case 36293:return rp;case 36289:case 36303:case 36311:case 36292:return op}}var _a=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=H0(e.type)}},xa=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ap(e.type)}},va=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},bo=/(\w+)(\])?(\[|\.)?/g;function ic(i,t){i.seq.push(t),i.map[t.id]=t}function lp(i,t,e){let n=i.name,s=n.length;for(bo.lastIndex=0;;){let r=bo.exec(n),o=bo.lastIndex,a=r[1],c=r[2]==="]",h=r[3];if(c&&(a=a|0),h===void 0||h==="["&&o+2===s){ic(e,h===void 0?new _a(a,i,t):new xa(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new va(a),ic(e,d)),e=d}}}var Di=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);lp(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function sc(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var cp=37297,hp=0;function up(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function fp(i){let t=oe.getPrimaries(oe.workingColorSpace),e=oe.getPrimaries(i),n;switch(t===e?n="":t===ir&&e===nr?n="LinearDisplayP3ToLinearSRGB":t===nr&&e===ir&&(n="LinearSRGBToLinearDisplayP3"),i){case Gn:case Ar:return[n,"LinearTransferOETF"];case Ue:case Ja:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function rc(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+up(i.getShaderSource(t),o)}else return s}function dp(i,t){let e=fp(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function pp(i,t){let e;switch(t){case Bh:e="Linear";break;case zh:e="Reinhard";break;case kh:e="Cineon";break;case Ga:e="ACESFilmic";break;case Vh:e="AgX";break;case Gh:e="Neutral";break;case Hh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ws=new L;function mp(){oe.getLuminanceCoefficients(Ws);let i=Ws.x.toFixed(4),t=Ws.y.toFixed(4),e=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function _p(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function xp(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function os(i){return i!==""}function oc(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ac(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var vp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ya(i){return i.replace(vp,Mp)}var yp=new Map;function Mp(i,t){let e=Vt[t];if(e===void 0){let n=yp.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ya(e)}var Sp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lc(i){return i.replace(Sp,bp)}function bp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function wp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===yc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Va?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Mn&&(t="SHADOWMAP_TYPE_VSM"),t}function Ep(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fi:case Oi:t="ENVMAP_TYPE_CUBE";break;case Tr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Tp(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Oi:t="ENVMAP_MODE_REFRACTION";break}return t}function Ap(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Mc:t="ENVMAP_BLENDING_MULTIPLY";break;case Fh:t="ENVMAP_BLENDING_MIX";break;case Oh:t="ENVMAP_BLENDING_ADD";break}return t}function Rp(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Cp(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=wp(e),h=Ep(e),u=Tp(e),d=Ap(e),l=Rp(e),f=gp(e),g=_p(r),_=s.createProgram(),m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),p.length>0&&(p+=`
`)):(m=[cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),p=[cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",l?"#define CUBEUV_TEXEL_WIDTH "+l.texelWidth:"",l?"#define CUBEUV_TEXEL_HEIGHT "+l.texelHeight:"",l?"#define CUBEUV_MAX_MIP "+l.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==zn?"#define TONE_MAPPING":"",e.toneMapping!==zn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==zn?pp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,dp("linearToOutputTexel",e.outputColorSpace),mp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),o=ya(o),o=oc(o,e),o=ac(o,e),a=ya(a),a=oc(a,e),a=ac(a,e),o=lc(o),a=lc(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Al?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=E+m+o,T=E+p+a,I=sc(s,s.VERTEX_SHADER,S),R=sc(s,s.FRAGMENT_SHADER,T);s.attachShader(_,I),s.attachShader(_,R),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(y){if(i.debug.checkShaderErrors){let H=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(I).trim(),G=s.getShaderInfoLog(R).trim(),K=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,I,R);else{let et=rc(s,I,"vertex"),W=rc(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+H+`
`+et+`
`+W)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(B===""||G==="")&&(V=!1);V&&(y.diagnostics={runnable:K,programLog:H,vertexShader:{log:B,prefix:m},fragmentShader:{log:G,prefix:p}})}s.deleteShader(I),s.deleteShader(R),N=new Di(s,_),J=xp(s,_)}let N;this.getUniforms=function(){return N===void 0&&C(this),N};let J;this.getAttributes=function(){return J===void 0&&C(this),J};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,cp)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=hp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=R,this}var Pp=0,Ma=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Sa(t),e.set(t,n)),n}},Sa=class{constructor(t){this.id=Pp++,this.code=t,this.usedTimes=0}};function Ip(i,t,e,n,s,r,o){let a=new cr,c=new Ma,h=new Set,u=[],d=s.logarithmicDepthBuffer,l=s.reverseDepthBuffer,f=s.vertexTextures,g=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return h.add(x),x===0?"uv":`uv${x}`}function p(x,y,H,B,G){let K=B.fog,V=G.geometry,et=x.isMeshStandardMaterial?B.environment:null,W=(x.isMeshStandardMaterial?e:t).get(x.envMap||et),ut=W&&W.mapping===Tr?W.image.height:null,ft=_[x.type];x.precision!==null&&(g=s.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));let dt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,qt=dt!==void 0?dt.length:0,Yt=0;V.morphAttributes.position!==void 0&&(Yt=1),V.morphAttributes.normal!==void 0&&(Yt=2),V.morphAttributes.color!==void 0&&(Yt=3);let $,tt,_t,X;if(ft){let ze=dn[ft];$=ze.vertexShader,tt=ze.fragmentShader}else $=x.vertexShader,tt=x.fragmentShader,c.update(x),_t=c.getVertexShaderID(x),X=c.getFragmentShaderID(x);let ct=i.getRenderTarget(),nt=G.isInstancedMesh===!0,It=G.isBatchedMesh===!0,Ft=!!x.map,Ut=!!x.matcap,P=!!W,Qt=!!x.aoMap,wt=!!x.lightMap,Lt=!!x.bumpMap,Rt=!!x.normalMap,Zt=!!x.displacementMap,Pt=!!x.emissiveMap,A=!!x.metalnessMap,v=!!x.roughnessMap,O=x.anisotropy>0,q=x.clearcoat>0,j=x.dispersion>0,Z=x.iridescence>0,Et=x.sheen>0,ht=x.transmission>0,yt=O&&!!x.anisotropyMap,jt=q&&!!x.clearcoatMap,it=q&&!!x.clearcoatNormalMap,Mt=q&&!!x.clearcoatRoughnessMap,Ot=Z&&!!x.iridescenceMap,Bt=Z&&!!x.iridescenceThicknessMap,St=Et&&!!x.sheenColorMap,$t=Et&&!!x.sheenRoughnessMap,Ht=!!x.specularMap,ce=!!x.specularColorMap,U=!!x.specularIntensityMap,xt=ht&&!!x.transmissionMap,Y=ht&&!!x.thicknessMap,Q=!!x.gradientMap,mt=!!x.alphaMap,vt=x.alphaTest>0,Jt=!!x.alphaHash,Me=!!x.extensions,Be=zn;x.toneMapped&&(ct===null||ct.isXRRenderTarget===!0)&&(Be=i.toneMapping);let ee={shaderID:ft,shaderType:x.type,shaderName:x.name,vertexShader:$,fragmentShader:tt,defines:x.defines,customVertexShaderID:_t,customFragmentShaderID:X,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:It,batchingColor:It&&G._colorsTexture!==null,instancing:nt,instancingColor:nt&&G.instanceColor!==null,instancingMorph:nt&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ct===null?i.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Gn,alphaToCoverage:!!x.alphaToCoverage,map:Ft,matcap:Ut,envMap:P,envMapMode:P&&W.mapping,envMapCubeUVHeight:ut,aoMap:Qt,lightMap:wt,bumpMap:Lt,normalMap:Rt,displacementMap:f&&Zt,emissiveMap:Pt,normalMapObjectSpace:Rt&&x.normalMapType===Yh,normalMapTangentSpace:Rt&&x.normalMapType===Uc,metalnessMap:A,roughnessMap:v,anisotropy:O,anisotropyMap:yt,clearcoat:q,clearcoatMap:jt,clearcoatNormalMap:it,clearcoatRoughnessMap:Mt,dispersion:j,iridescence:Z,iridescenceMap:Ot,iridescenceThicknessMap:Bt,sheen:Et,sheenColorMap:St,sheenRoughnessMap:$t,specularMap:Ht,specularColorMap:ce,specularIntensityMap:U,transmission:ht,transmissionMap:xt,thicknessMap:Y,gradientMap:Q,opaque:x.transparent===!1&&x.blending===Ii&&x.alphaToCoverage===!1,alphaMap:mt,alphaTest:vt,alphaHash:Jt,combine:x.combine,mapUv:Ft&&m(x.map.channel),aoMapUv:Qt&&m(x.aoMap.channel),lightMapUv:wt&&m(x.lightMap.channel),bumpMapUv:Lt&&m(x.bumpMap.channel),normalMapUv:Rt&&m(x.normalMap.channel),displacementMapUv:Zt&&m(x.displacementMap.channel),emissiveMapUv:Pt&&m(x.emissiveMap.channel),metalnessMapUv:A&&m(x.metalnessMap.channel),roughnessMapUv:v&&m(x.roughnessMap.channel),anisotropyMapUv:yt&&m(x.anisotropyMap.channel),clearcoatMapUv:jt&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:it&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ot&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:St&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:$t&&m(x.sheenRoughnessMap.channel),specularMapUv:Ht&&m(x.specularMap.channel),specularColorMapUv:ce&&m(x.specularColorMap.channel),specularIntensityMapUv:U&&m(x.specularIntensityMap.channel),transmissionMapUv:xt&&m(x.transmissionMap.channel),thicknessMapUv:Y&&m(x.thicknessMap.channel),alphaMapUv:mt&&m(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Rt||O),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!V.attributes.uv&&(Ft||mt),fog:!!K,useFog:x.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:l,skinning:G.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:qt,morphTextureStride:Yt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&H.length>0,shadowMapType:i.shadowMap.type,toneMapping:Be,decodeVideoTexture:Ft&&x.map.isVideoTexture===!0&&oe.getTransfer(x.map.colorSpace)===fe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===be,flipSided:x.side===Ne,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Me&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&x.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return ee.vertexUv1s=h.has(1),ee.vertexUv2s=h.has(2),ee.vertexUv3s=h.has(3),h.clear(),ee}function E(x){let y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(let H in x.defines)y.push(H),y.push(x.defines[H]);return x.isRawShaderMaterial===!1&&(S(y,x),T(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function S(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function T(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),x.push(a.mask)}function I(x){let y=_[x.type],H;if(y){let B=dn[y];H=yu.clone(B.uniforms)}else H=x.uniforms;return H}function R(x,y){let H;for(let B=0,G=u.length;B<G;B++){let K=u[B];if(K.cacheKey===y){H=K,++H.usedTimes;break}}return H===void 0&&(H=new Cp(i,y,x,r),u.push(H)),H}function C(x){if(--x.usedTimes===0){let y=u.indexOf(x);u[y]=u[u.length-1],u.pop(),x.destroy()}}function N(x){c.remove(x)}function J(){c.dispose()}return{getParameters:p,getProgramCacheKey:E,getUniforms:I,acquireProgram:R,releaseProgram:C,releaseShaderCache:N,programs:u,dispose:J}}function Lp(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Up(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function hc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function uc(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,l,f,g,_,m){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:l,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[t]=p):(p.id=d.id,p.object=d,p.geometry=l,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),t++,p}function a(d,l,f,g,_,m){let p=o(d,l,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(d,l,f,g,_,m){let p=o(d,l,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function h(d,l){e.length>1&&e.sort(d||Up),n.length>1&&n.sort(l||hc),s.length>1&&s.sort(l||hc)}function u(){for(let d=t,l=i.length;d<l;d++){let f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:h}}function Dp(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new uc,i.set(n,[o])):s>=r.length?(o=new uc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Np(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Wt};break;case"SpotLight":e={position:new L,direction:new L,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Fp(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Op=0;function Bp(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function zp(i){let t=new Np,e=Fp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new L);let s=new L,r=new ne,o=new ne;function a(h){let u=0,d=0,l=0;for(let J=0;J<9;J++)n.probe[J].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,E=0,S=0,T=0,I=0,R=0,C=0;h.sort(Bp);for(let J=0,x=h.length;J<x;J++){let y=h[J],H=y.color,B=y.intensity,G=y.distance,K=y.shadow&&y.shadow.map?y.shadow.map.texture:null;if(y.isAmbientLight)u+=H.r*B,d+=H.g*B,l+=H.b*B;else if(y.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(y.sh.coefficients[V],B);C++}else if(y.isDirectionalLight){let V=t.get(y);if(V.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let et=y.shadow,W=e.get(y);W.shadowIntensity=et.intensity,W.shadowBias=et.bias,W.shadowNormalBias=et.normalBias,W.shadowRadius=et.radius,W.shadowMapSize=et.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=K,n.directionalShadowMatrix[f]=y.shadow.matrix,E++}n.directional[f]=V,f++}else if(y.isSpotLight){let V=t.get(y);V.position.setFromMatrixPosition(y.matrixWorld),V.color.copy(H).multiplyScalar(B),V.distance=G,V.coneCos=Math.cos(y.angle),V.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),V.decay=y.decay,n.spot[_]=V;let et=y.shadow;if(y.map&&(n.spotLightMap[I]=y.map,I++,et.updateMatrices(y),y.castShadow&&R++),n.spotLightMatrix[_]=et.matrix,y.castShadow){let W=e.get(y);W.shadowIntensity=et.intensity,W.shadowBias=et.bias,W.shadowNormalBias=et.normalBias,W.shadowRadius=et.radius,W.shadowMapSize=et.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=K,T++}_++}else if(y.isRectAreaLight){let V=t.get(y);V.color.copy(H).multiplyScalar(B),V.halfWidth.set(y.width*.5,0,0),V.halfHeight.set(0,y.height*.5,0),n.rectArea[m]=V,m++}else if(y.isPointLight){let V=t.get(y);if(V.color.copy(y.color).multiplyScalar(y.intensity),V.distance=y.distance,V.decay=y.decay,y.castShadow){let et=y.shadow,W=e.get(y);W.shadowIntensity=et.intensity,W.shadowBias=et.bias,W.shadowNormalBias=et.normalBias,W.shadowRadius=et.radius,W.shadowMapSize=et.mapSize,W.shadowCameraNear=et.camera.near,W.shadowCameraFar=et.camera.far,n.pointShadow[g]=W,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=y.shadow.matrix,S++}n.point[g]=V,g++}else if(y.isHemisphereLight){let V=t.get(y);V.skyColor.copy(y.color).multiplyScalar(B),V.groundColor.copy(y.groundColor).multiplyScalar(B),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=l;let N=n.hash;(N.directionalLength!==f||N.pointLength!==g||N.spotLength!==_||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==E||N.numPointShadows!==S||N.numSpotShadows!==T||N.numSpotMaps!==I||N.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=T+I-R,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,N.directionalLength=f,N.pointLength=g,N.spotLength=_,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=E,N.numPointShadows=S,N.numSpotShadows=T,N.numSpotMaps=I,N.numLightProbes=C,n.version=Op++)}function c(h,u){let d=0,l=0,f=0,g=0,_=0,m=u.matrixWorldInverse;for(let p=0,E=h.length;p<E;p++){let S=h[p];if(S.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),d++}else if(S.isSpotLight){let T=n.spot[f];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),f++}else if(S.isRectAreaLight){let T=n.rectArea[g];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let T=n.point[l];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),l++}else if(S.isHemisphereLight){let T=n.hemi[_];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function fc(i){let t=new zp(i),e=[],n=[];function s(u){h.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function kp(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new fc(i),t.set(s,[a])):r>=o.length?(a=new fc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var ba=class extends Vn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},wa=class extends Vn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Hp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vp=`uniform sampler2D shadow_pass;
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
}`;function Gp(i,t,e){let n=new us,s=new Xt,r=new Xt,o=new Kt,a=new ba({depthPacking:qh}),c=new wa,h={},u=e.maxTextureSize,d={[kn]:Ne,[Ne]:kn,[be]:be},l=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:Hp,fragmentShader:Vp}),f=l.clone();f.defines.HORIZONTAL_PASS=1;let g=new we;g.setAttribute("position",new de(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new le(g,l),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yc;let p=this.type;this.render=function(R,C,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;let J=i.getRenderTarget(),x=i.getActiveCubeFace(),y=i.getActiveMipmapLevel(),H=i.state;H.setBlending(Bn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let B=p!==Mn&&this.type===Mn,G=p===Mn&&this.type!==Mn;for(let K=0,V=R.length;K<V;K++){let et=R[K],W=et.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",et,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let ut=W.getFrameExtents();if(s.multiply(ut),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ut.x),s.x=r.x*ut.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ut.y),s.y=r.y*ut.y,W.mapSize.y=r.y)),W.map===null||B===!0||G===!0){let dt=this.type!==Mn?{minFilter:Qe,magFilter:Qe}:{};W.map!==null&&W.map.dispose(),W.map=new Tn(s.x,s.y,dt),W.map.texture.name=et.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();let ft=W.getViewportCount();for(let dt=0;dt<ft;dt++){let qt=W.getViewport(dt);o.set(r.x*qt.x,r.y*qt.y,r.x*qt.z,r.y*qt.w),H.viewport(o),W.updateMatrices(et,dt),n=W.getFrustum(),T(C,N,W.camera,et,this.type)}W.isPointLightShadow!==!0&&this.type===Mn&&E(W,N),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(J,x,y)};function E(R,C){let N=t.update(_);l.defines.VSM_SAMPLES!==R.blurSamples&&(l.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,l.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Tn(s.x,s.y)),l.uniforms.shadow_pass.value=R.map.texture,l.uniforms.resolution.value=R.mapSize,l.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(C,null,N,l,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(C,null,N,f,_,null)}function S(R,C,N,J){let x=null,y=N.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(y!==void 0)x=y;else if(x=N.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let H=x.uuid,B=C.uuid,G=h[H];G===void 0&&(G={},h[H]=G);let K=G[B];K===void 0&&(K=x.clone(),G[B]=K,C.addEventListener("dispose",I)),x=K}if(x.visible=C.visible,x.wireframe=C.wireframe,J===Mn?x.side=C.shadowSide!==null?C.shadowSide:C.side:x.side=C.shadowSide!==null?C.shadowSide:d[C.side],x.alphaMap=C.alphaMap,x.alphaTest=C.alphaTest,x.map=C.map,x.clipShadows=C.clipShadows,x.clippingPlanes=C.clippingPlanes,x.clipIntersection=C.clipIntersection,x.displacementMap=C.displacementMap,x.displacementScale=C.displacementScale,x.displacementBias=C.displacementBias,x.wireframeLinewidth=C.wireframeLinewidth,x.linewidth=C.linewidth,N.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let H=i.properties.get(x);H.light=N}return x}function T(R,C,N,J,x){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===Mn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,R.matrixWorld);let B=t.update(R),G=R.material;if(Array.isArray(G)){let K=B.groups;for(let V=0,et=K.length;V<et;V++){let W=K[V],ut=G[W.materialIndex];if(ut&&ut.visible){let ft=S(R,ut,J,x);R.onBeforeShadow(i,R,C,N,B,ft,W),i.renderBufferDirect(N,null,B,ft,R,W),R.onAfterShadow(i,R,C,N,B,ft,W)}}}else if(G.visible){let K=S(R,G,J,x);R.onBeforeShadow(i,R,C,N,B,K,null),i.renderBufferDirect(N,null,B,K,R,null),R.onAfterShadow(i,R,C,N,B,K,null)}}let H=R.children;for(let B=0,G=H.length;B<G;B++)T(H[B],C,N,J,x)}function I(R){R.target.removeEventListener("dispose",I);for(let N in h){let J=h[N],x=R.target.uuid;x in J&&(J[x].dispose(),delete J[x])}}}var Wp={[Ro]:Co,[Po]:Uo,[Io]:Do,[Ni]:Lo,[Co]:Ro,[Uo]:Po,[Do]:Io,[Lo]:Ni};function Xp(i){function t(){let U=!1,xt=new Kt,Y=null,Q=new Kt(0,0,0,0);return{setMask:function(mt){Y!==mt&&!U&&(i.colorMask(mt,mt,mt,mt),Y=mt)},setLocked:function(mt){U=mt},setClear:function(mt,vt,Jt,Me,Be){Be===!0&&(mt*=Me,vt*=Me,Jt*=Me),xt.set(mt,vt,Jt,Me),Q.equals(xt)===!1&&(i.clearColor(mt,vt,Jt,Me),Q.copy(xt))},reset:function(){U=!1,Y=null,Q.set(-1,0,0,0)}}}function e(){let U=!1,xt=!1,Y=null,Q=null,mt=null;return{setReversed:function(vt){xt=vt},setTest:function(vt){vt?_t(i.DEPTH_TEST):X(i.DEPTH_TEST)},setMask:function(vt){Y!==vt&&!U&&(i.depthMask(vt),Y=vt)},setFunc:function(vt){if(xt&&(vt=Wp[vt]),Q!==vt){switch(vt){case Ro:i.depthFunc(i.NEVER);break;case Co:i.depthFunc(i.ALWAYS);break;case Po:i.depthFunc(i.LESS);break;case Ni:i.depthFunc(i.LEQUAL);break;case Io:i.depthFunc(i.EQUAL);break;case Lo:i.depthFunc(i.GEQUAL);break;case Uo:i.depthFunc(i.GREATER);break;case Do:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=vt}},setLocked:function(vt){U=vt},setClear:function(vt){mt!==vt&&(i.clearDepth(vt),mt=vt)},reset:function(){U=!1,Y=null,Q=null,mt=null}}}function n(){let U=!1,xt=null,Y=null,Q=null,mt=null,vt=null,Jt=null,Me=null,Be=null;return{setTest:function(ee){U||(ee?_t(i.STENCIL_TEST):X(i.STENCIL_TEST))},setMask:function(ee){xt!==ee&&!U&&(i.stencilMask(ee),xt=ee)},setFunc:function(ee,ze,mn){(Y!==ee||Q!==ze||mt!==mn)&&(i.stencilFunc(ee,ze,mn),Y=ee,Q=ze,mt=mn)},setOp:function(ee,ze,mn){(vt!==ee||Jt!==ze||Me!==mn)&&(i.stencilOp(ee,ze,mn),vt=ee,Jt=ze,Me=mn)},setLocked:function(ee){U=ee},setClear:function(ee){Be!==ee&&(i.clearStencil(ee),Be=ee)},reset:function(){U=!1,xt=null,Y=null,Q=null,mt=null,vt=null,Jt=null,Me=null,Be=null}}}let s=new t,r=new e,o=new n,a=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,l=[],f=null,g=!1,_=null,m=null,p=null,E=null,S=null,T=null,I=null,R=new Wt(0,0,0),C=0,N=!1,J=null,x=null,y=null,H=null,B=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),K=!1,V=0,et=i.getParameter(i.VERSION);et.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(et)[1]),K=V>=1):et.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(et)[1]),K=V>=2);let W=null,ut={},ft=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),qt=new Kt().fromArray(ft),Yt=new Kt().fromArray(dt);function $(U,xt,Y,Q){let mt=new Uint8Array(4),vt=i.createTexture();i.bindTexture(U,vt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Jt=0;Jt<Y;Jt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,mt):i.texImage2D(xt+Jt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,mt);return vt}let tt={};tt[i.TEXTURE_2D]=$(i.TEXTURE_2D,i.TEXTURE_2D,1),tt[i.TEXTURE_CUBE_MAP]=$(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[i.TEXTURE_2D_ARRAY]=$(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),tt[i.TEXTURE_3D]=$(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),_t(i.DEPTH_TEST),r.setFunc(Ni),wt(!1),Lt(vl),_t(i.CULL_FACE),P(Bn);function _t(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function X(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function ct(U,xt){return u[U]!==xt?(i.bindFramebuffer(U,xt),u[U]=xt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function nt(U,xt){let Y=l,Q=!1;if(U){Y=d.get(xt),Y===void 0&&(Y=[],d.set(xt,Y));let mt=U.textures;if(Y.length!==mt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let vt=0,Jt=mt.length;vt<Jt;vt++)Y[vt]=i.COLOR_ATTACHMENT0+vt;Y.length=mt.length,Q=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,Q=!0);Q&&i.drawBuffers(Y)}function It(U){return f!==U?(i.useProgram(U),f=U,!0):!1}let Ft={[ni]:i.FUNC_ADD,[vh]:i.FUNC_SUBTRACT,[yh]:i.FUNC_REVERSE_SUBTRACT};Ft[Mh]=i.MIN,Ft[Sh]=i.MAX;let Ut={[bh]:i.ZERO,[wh]:i.ONE,[Eh]:i.SRC_COLOR,[To]:i.SRC_ALPHA,[Ih]:i.SRC_ALPHA_SATURATE,[Ch]:i.DST_COLOR,[Ah]:i.DST_ALPHA,[Th]:i.ONE_MINUS_SRC_COLOR,[Ao]:i.ONE_MINUS_SRC_ALPHA,[Ph]:i.ONE_MINUS_DST_COLOR,[Rh]:i.ONE_MINUS_DST_ALPHA,[Lh]:i.CONSTANT_COLOR,[Uh]:i.ONE_MINUS_CONSTANT_COLOR,[Dh]:i.CONSTANT_ALPHA,[Nh]:i.ONE_MINUS_CONSTANT_ALPHA};function P(U,xt,Y,Q,mt,vt,Jt,Me,Be,ee){if(U===Bn){g===!0&&(X(i.BLEND),g=!1);return}if(g===!1&&(_t(i.BLEND),g=!0),U!==xh){if(U!==_||ee!==N){if((m!==ni||S!==ni)&&(i.blendEquation(i.FUNC_ADD),m=ni,S=ni),ee)switch(U){case Ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ls:i.blendFunc(i.ONE,i.ONE);break;case yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ml:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ls:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ml:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}p=null,E=null,T=null,I=null,R.set(0,0,0),C=0,_=U,N=ee}return}mt=mt||xt,vt=vt||Y,Jt=Jt||Q,(xt!==m||mt!==S)&&(i.blendEquationSeparate(Ft[xt],Ft[mt]),m=xt,S=mt),(Y!==p||Q!==E||vt!==T||Jt!==I)&&(i.blendFuncSeparate(Ut[Y],Ut[Q],Ut[vt],Ut[Jt]),p=Y,E=Q,T=vt,I=Jt),(Me.equals(R)===!1||Be!==C)&&(i.blendColor(Me.r,Me.g,Me.b,Be),R.copy(Me),C=Be),_=U,N=!1}function Qt(U,xt){U.side===be?X(i.CULL_FACE):_t(i.CULL_FACE);let Y=U.side===Ne;xt&&(Y=!Y),wt(Y),U.blending===Ii&&U.transparent===!1?P(Bn):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),r.setFunc(U.depthFunc),r.setTest(U.depthTest),r.setMask(U.depthWrite),s.setMask(U.colorWrite);let Q=U.stencilWrite;o.setTest(Q),Q&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Zt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?_t(i.SAMPLE_ALPHA_TO_COVERAGE):X(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(U){J!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),J=U)}function Lt(U){U!==gh?(_t(i.CULL_FACE),U!==x&&(U===vl?i.cullFace(i.BACK):U===_h?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):X(i.CULL_FACE),x=U}function Rt(U){U!==y&&(K&&i.lineWidth(U),y=U)}function Zt(U,xt,Y){U?(_t(i.POLYGON_OFFSET_FILL),(H!==xt||B!==Y)&&(i.polygonOffset(xt,Y),H=xt,B=Y)):X(i.POLYGON_OFFSET_FILL)}function Pt(U){U?_t(i.SCISSOR_TEST):X(i.SCISSOR_TEST)}function A(U){U===void 0&&(U=i.TEXTURE0+G-1),W!==U&&(i.activeTexture(U),W=U)}function v(U,xt,Y){Y===void 0&&(W===null?Y=i.TEXTURE0+G-1:Y=W);let Q=ut[Y];Q===void 0&&(Q={type:void 0,texture:void 0},ut[Y]=Q),(Q.type!==U||Q.texture!==xt)&&(W!==Y&&(i.activeTexture(Y),W=Y),i.bindTexture(U,xt||tt[U]),Q.type=U,Q.texture=xt)}function O(){let U=ut[W];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ht(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function yt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function jt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ot(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Bt(U){qt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),qt.copy(U))}function St(U){Yt.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Yt.copy(U))}function $t(U,xt){let Y=c.get(xt);Y===void 0&&(Y=new WeakMap,c.set(xt,Y));let Q=Y.get(U);Q===void 0&&(Q=i.getUniformBlockIndex(xt,U.name),Y.set(U,Q))}function Ht(U,xt){let Q=c.get(xt).get(U);a.get(xt)!==Q&&(i.uniformBlockBinding(xt,Q,U.__bindingPointIndex),a.set(xt,Q))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},W=null,ut={},u={},d=new WeakMap,l=[],f=null,g=!1,_=null,m=null,p=null,E=null,S=null,T=null,I=null,R=new Wt(0,0,0),C=0,N=!1,J=null,x=null,y=null,H=null,B=null,qt.set(0,0,i.canvas.width,i.canvas.height),Yt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:_t,disable:X,bindFramebuffer:ct,drawBuffers:nt,useProgram:It,setBlending:P,setMaterial:Qt,setFlipSided:wt,setCullFace:Lt,setLineWidth:Rt,setPolygonOffset:Zt,setScissorTest:Pt,activeTexture:A,bindTexture:v,unbindTexture:O,compressedTexImage2D:q,compressedTexImage3D:j,texImage2D:Mt,texImage3D:Ot,updateUBOMapping:$t,uniformBlockBinding:Ht,texStorage2D:jt,texStorage3D:it,texSubImage2D:Z,texSubImage3D:Et,compressedTexSubImage2D:ht,compressedTexSubImage3D:yt,scissor:Bt,viewport:St,reset:ce}}function dc(i,t,e,n){let s=qp(n);switch(e){case Tc:return i*t;case Rc:return i*t;case Cc:return i*t*2;case Pc:return i*t/s.components*s.byteLength;case Ya:return i*t/s.components*s.byteLength;case Ic:return i*t*2/s.components*s.byteLength;case Za:return i*t*2/s.components*s.byteLength;case Ac:return i*t*3/s.components*s.byteLength;case ln:return i*t*4/s.components*s.byteLength;case $a:return i*t*4/s.components*s.byteLength;case Zs:case $s:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Js:case Ks:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zo:case Ho:return Math.max(i,16)*Math.max(t,8)/4;case Bo:case ko:return Math.max(i,8)*Math.max(t,8)/2;case Vo:case Go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Yo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Zo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Jo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ko:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Qo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ta:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ea:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case na:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ia:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case sa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Qs:case ra:case oa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Lc:case aa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case la:case ca:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function qp(i){switch(i){case En:case bc:return{byteLength:1,components:1};case hs:case wc:case ms:return{byteLength:2,components:1};case Xa:case qa:return{byteLength:2,components:4};case ai:case Wa:case bn:return{byteLength:4,components:1};case Ec:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Yp(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Xt,u=new WeakMap,d,l=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return f?new OffscreenCanvas(A,v):rr("canvas")}function _(A,v,O){let q=1,j=Pt(A);if((j.width>O||j.height>O)&&(q=O/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let Z=Math.floor(q*j.width),Et=Math.floor(q*j.height);d===void 0&&(d=g(Z,Et));let ht=v?g(Z,Et):d;return ht.width=Z,ht.height=Et,ht.getContext("2d").drawImage(A,0,0,Z,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Z+"x"+Et+")."),ht}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function m(A){return A.generateMipmaps&&A.minFilter!==Qe&&A.minFilter!==an}function p(A){i.generateMipmap(A)}function E(A,v,O,q,j=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=v;if(v===i.RED&&(O===i.FLOAT&&(Z=i.R32F),O===i.HALF_FLOAT&&(Z=i.R16F),O===i.UNSIGNED_BYTE&&(Z=i.R8)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.R8UI),O===i.UNSIGNED_SHORT&&(Z=i.R16UI),O===i.UNSIGNED_INT&&(Z=i.R32UI),O===i.BYTE&&(Z=i.R8I),O===i.SHORT&&(Z=i.R16I),O===i.INT&&(Z=i.R32I)),v===i.RG&&(O===i.FLOAT&&(Z=i.RG32F),O===i.HALF_FLOAT&&(Z=i.RG16F),O===i.UNSIGNED_BYTE&&(Z=i.RG8)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RG8UI),O===i.UNSIGNED_SHORT&&(Z=i.RG16UI),O===i.UNSIGNED_INT&&(Z=i.RG32UI),O===i.BYTE&&(Z=i.RG8I),O===i.SHORT&&(Z=i.RG16I),O===i.INT&&(Z=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),O===i.UNSIGNED_INT&&(Z=i.RGB32UI),O===i.BYTE&&(Z=i.RGB8I),O===i.SHORT&&(Z=i.RGB16I),O===i.INT&&(Z=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),O===i.UNSIGNED_INT&&(Z=i.RGBA32UI),O===i.BYTE&&(Z=i.RGBA8I),O===i.SHORT&&(Z=i.RGBA16I),O===i.INT&&(Z=i.RGBA32I)),v===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),v===i.RGBA){let Et=j?er:oe.getTransfer(q);O===i.FLOAT&&(Z=i.RGBA32F),O===i.HALF_FLOAT&&(Z=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Z=Et===fe?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function S(A,v){let O;return A?v===null||v===ai||v===Bi?O=i.DEPTH24_STENCIL8:v===bn?O=i.DEPTH32F_STENCIL8:v===hs&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ai||v===Bi?O=i.DEPTH_COMPONENT24:v===bn?O=i.DEPTH_COMPONENT32F:v===hs&&(O=i.DEPTH_COMPONENT16),O}function T(A,v){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Qe&&A.minFilter!==an?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function I(A){let v=A.target;v.removeEventListener("dispose",I),C(v),v.isVideoTexture&&u.delete(v)}function R(A){let v=A.target;v.removeEventListener("dispose",R),J(v)}function C(A){let v=n.get(A);if(v.__webglInit===void 0)return;let O=A.source,q=l.get(O);if(q){let j=q[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&N(A),Object.keys(q).length===0&&l.delete(O)}n.remove(A)}function N(A){let v=n.get(A);i.deleteTexture(v.__webglTexture);let O=A.source,q=l.get(O);delete q[v.__cacheKey],o.memory.textures--}function J(A){let v=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let j=0;j<v.__webglFramebuffer[q].length;j++)i.deleteFramebuffer(v.__webglFramebuffer[q][j]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let O=A.textures;for(let q=0,j=O.length;q<j;q++){let Z=n.get(O[q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(O[q])}n.remove(A)}let x=0;function y(){x=0}function H(){let A=x;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),x+=1,A}function B(A){let v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function G(A,v){let O=n.get(A);if(A.isVideoTexture&&Rt(A),A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){let q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Yt(O,A,v);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function K(A,v){let O=n.get(A);if(A.version>0&&O.__version!==A.version){Yt(O,A,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function V(A,v){let O=n.get(A);if(A.version>0&&O.__version!==A.version){Yt(O,A,v);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function et(A,v){let O=n.get(A);if(A.version>0&&O.__version!==A.version){$(O,A,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}let W={[cs]:i.REPEAT,[ri]:i.CLAMP_TO_EDGE,[Oo]:i.MIRRORED_REPEAT},ut={[Qe]:i.NEAREST,[Wh]:i.NEAREST_MIPMAP_NEAREST,[ws]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[oi]:i.LINEAR_MIPMAP_LINEAR},ft={[Zh]:i.NEVER,[tu]:i.ALWAYS,[$h]:i.LESS,[Dc]:i.LEQUAL,[Jh]:i.EQUAL,[jh]:i.GEQUAL,[Kh]:i.GREATER,[Qh]:i.NOTEQUAL};function dt(A,v){if(v.type===bn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===an||v.magFilter===qr||v.magFilter===ws||v.magFilter===oi||v.minFilter===an||v.minFilter===qr||v.minFilter===ws||v.minFilter===oi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,W[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,W[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,W[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ut[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ut[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ft[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Qe||v.minFilter!==ws&&v.minFilter!==oi||v.type===bn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function qt(A,v){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",I));let q=v.source,j=l.get(q);j===void 0&&(j={},l.set(q,j));let Z=B(v);if(Z!==A.__cacheKey){j[Z]===void 0&&(j[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),j[Z].usedTimes++;let Et=j[A.__cacheKey];Et!==void 0&&(j[A.__cacheKey].usedTimes--,Et.usedTimes===0&&N(v)),A.__cacheKey=Z,A.__webglTexture=j[Z].texture}return O}function Yt(A,v,O){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);let j=qt(A,v),Z=v.source;e.bindTexture(q,A.__webglTexture,i.TEXTURE0+O);let Et=n.get(Z);if(Z.version!==Et.__version||j===!0){e.activeTexture(i.TEXTURE0+O);let ht=oe.getPrimaries(oe.workingColorSpace),yt=v.colorSpace===On?null:oe.getPrimaries(v.colorSpace),jt=v.colorSpace===On||ht===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let it=_(v.image,!1,s.maxTextureSize);it=Zt(v,it);let Mt=r.convert(v.format,v.colorSpace),Ot=r.convert(v.type),Bt=E(v.internalFormat,Mt,Ot,v.colorSpace,v.isVideoTexture);dt(q,v);let St,$t=v.mipmaps,Ht=v.isVideoTexture!==!0,ce=Et.__version===void 0||j===!0,U=Z.dataReady,xt=T(v,it);if(v.isDepthTexture)Bt=S(v.format===zi,v.type),ce&&(Ht?e.texStorage2D(i.TEXTURE_2D,1,Bt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Bt,it.width,it.height,0,Mt,Ot,null));else if(v.isDataTexture)if($t.length>0){Ht&&ce&&e.texStorage2D(i.TEXTURE_2D,xt,Bt,$t[0].width,$t[0].height);for(let Y=0,Q=$t.length;Y<Q;Y++)St=$t[Y],Ht?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,St.width,St.height,Mt,Ot,St.data):e.texImage2D(i.TEXTURE_2D,Y,Bt,St.width,St.height,0,Mt,Ot,St.data);v.generateMipmaps=!1}else Ht?(ce&&e.texStorage2D(i.TEXTURE_2D,xt,Bt,it.width,it.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,Mt,Ot,it.data)):e.texImage2D(i.TEXTURE_2D,0,Bt,it.width,it.height,0,Mt,Ot,it.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ht&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,Bt,$t[0].width,$t[0].height,it.depth);for(let Y=0,Q=$t.length;Y<Q;Y++)if(St=$t[Y],v.format!==ln)if(Mt!==null)if(Ht){if(U)if(v.layerUpdates.size>0){let mt=dc(St.width,St.height,v.format,v.type);for(let vt of v.layerUpdates){let Jt=St.data.subarray(vt*mt/St.data.BYTES_PER_ELEMENT,(vt+1)*mt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,vt,St.width,St.height,1,Mt,Jt,0,0)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,St.width,St.height,it.depth,Mt,St.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Bt,St.width,St.height,it.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,St.width,St.height,it.depth,Mt,Ot,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Bt,St.width,St.height,it.depth,0,Mt,Ot,St.data)}else{Ht&&ce&&e.texStorage2D(i.TEXTURE_2D,xt,Bt,$t[0].width,$t[0].height);for(let Y=0,Q=$t.length;Y<Q;Y++)St=$t[Y],v.format!==ln?Mt!==null?Ht?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,St.width,St.height,Mt,St.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Bt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,St.width,St.height,Mt,Ot,St.data):e.texImage2D(i.TEXTURE_2D,Y,Bt,St.width,St.height,0,Mt,Ot,St.data)}else if(v.isDataArrayTexture)if(Ht){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,Bt,it.width,it.height,it.depth),U)if(v.layerUpdates.size>0){let Y=dc(it.width,it.height,v.format,v.type);for(let Q of v.layerUpdates){let mt=it.data.subarray(Q*Y/it.data.BYTES_PER_ELEMENT,(Q+1)*Y/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,it.width,it.height,1,Mt,Ot,mt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Mt,Ot,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,it.width,it.height,it.depth,0,Mt,Ot,it.data);else if(v.isData3DTexture)Ht?(ce&&e.texStorage3D(i.TEXTURE_3D,xt,Bt,it.width,it.height,it.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Mt,Ot,it.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,it.width,it.height,it.depth,0,Mt,Ot,it.data);else if(v.isFramebufferTexture){if(ce)if(Ht)e.texStorage2D(i.TEXTURE_2D,xt,Bt,it.width,it.height);else{let Y=it.width,Q=it.height;for(let mt=0;mt<xt;mt++)e.texImage2D(i.TEXTURE_2D,mt,Bt,Y,Q,0,Mt,Ot,null),Y>>=1,Q>>=1}}else if($t.length>0){if(Ht&&ce){let Y=Pt($t[0]);e.texStorage2D(i.TEXTURE_2D,xt,Bt,Y.width,Y.height)}for(let Y=0,Q=$t.length;Y<Q;Y++)St=$t[Y],Ht?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Mt,Ot,St):e.texImage2D(i.TEXTURE_2D,Y,Bt,Mt,Ot,St);v.generateMipmaps=!1}else if(Ht){if(ce){let Y=Pt(it);e.texStorage2D(i.TEXTURE_2D,xt,Bt,Y.width,Y.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,Ot,it)}else e.texImage2D(i.TEXTURE_2D,0,Bt,Mt,Ot,it);m(v)&&p(q),Et.__version=Z.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function $(A,v,O){if(v.image.length!==6)return;let q=qt(A,v),j=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);let Z=n.get(j);if(j.version!==Z.__version||q===!0){e.activeTexture(i.TEXTURE0+O);let Et=oe.getPrimaries(oe.workingColorSpace),ht=v.colorSpace===On?null:oe.getPrimaries(v.colorSpace),yt=v.colorSpace===On||Et===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let jt=v.isCompressedTexture||v.image[0].isCompressedTexture,it=v.image[0]&&v.image[0].isDataTexture,Mt=[];for(let Q=0;Q<6;Q++)!jt&&!it?Mt[Q]=_(v.image[Q],!0,s.maxCubemapSize):Mt[Q]=it?v.image[Q].image:v.image[Q],Mt[Q]=Zt(v,Mt[Q]);let Ot=Mt[0],Bt=r.convert(v.format,v.colorSpace),St=r.convert(v.type),$t=E(v.internalFormat,Bt,St,v.colorSpace),Ht=v.isVideoTexture!==!0,ce=Z.__version===void 0||q===!0,U=j.dataReady,xt=T(v,Ot);dt(i.TEXTURE_CUBE_MAP,v);let Y;if(jt){Ht&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,$t,Ot.width,Ot.height);for(let Q=0;Q<6;Q++){Y=Mt[Q].mipmaps;for(let mt=0;mt<Y.length;mt++){let vt=Y[mt];v.format!==ln?Bt!==null?Ht?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt,0,0,vt.width,vt.height,Bt,vt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt,$t,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt,0,0,vt.width,vt.height,Bt,St,vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt,$t,vt.width,vt.height,0,Bt,St,vt.data)}}}else{if(Y=v.mipmaps,Ht&&ce){Y.length>0&&xt++;let Q=Pt(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,$t,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(it){Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Mt[Q].width,Mt[Q].height,Bt,St,Mt[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,$t,Mt[Q].width,Mt[Q].height,0,Bt,St,Mt[Q].data);for(let mt=0;mt<Y.length;mt++){let Jt=Y[mt].image[Q].image;Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt+1,0,0,Jt.width,Jt.height,Bt,St,Jt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt+1,$t,Jt.width,Jt.height,0,Bt,St,Jt.data)}}else{Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Bt,St,Mt[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,$t,Bt,St,Mt[Q]);for(let mt=0;mt<Y.length;mt++){let vt=Y[mt];Ht?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt+1,0,0,Bt,St,vt.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,mt+1,$t,Bt,St,vt.image[Q])}}}m(v)&&p(i.TEXTURE_CUBE_MAP),Z.__version=j.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function tt(A,v,O,q,j,Z){let Et=r.convert(O.format,O.colorSpace),ht=r.convert(O.type),yt=E(O.internalFormat,Et,ht,O.colorSpace);if(!n.get(v).__hasExternalTextures){let it=Math.max(1,v.width>>Z),Mt=Math.max(1,v.height>>Z);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,Z,yt,it,Mt,v.depth,0,Et,ht,null):e.texImage2D(j,Z,yt,it,Mt,0,Et,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Lt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,j,n.get(O).__webglTexture,0,wt(v)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,j,n.get(O).__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(A,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){let q=v.depthTexture,j=q&&q.isDepthTexture?q.type:null,Z=S(v.stencilBuffer,j),Et=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=wt(v);Lt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,Z,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,Z,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Z,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Et,i.RENDERBUFFER,A)}else{let q=v.textures;for(let j=0;j<q.length;j++){let Z=q[j],Et=r.convert(Z.format,Z.colorSpace),ht=r.convert(Z.type),yt=E(Z.internalFormat,Et,ht,Z.colorSpace),jt=wt(v);O&&Lt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,jt,yt,v.width,v.height):Lt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,jt,yt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,yt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function X(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),G(v.depthTexture,0);let q=n.get(v.depthTexture).__webglTexture,j=wt(v);if(v.depthTexture.format===Li)Lt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0);else if(v.depthTexture.format===zi)Lt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function ct(A){let v=n.get(A),O=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){let q=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){let j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=q}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");X(v.__webglFramebuffer,A)}else if(O){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),_t(v.__webglDepthbuffer[q],A,!1);else{let j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),_t(v.__webglDepthbuffer,A,!1);else{let q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,j)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(A,v,O){let q=n.get(A);v!==void 0&&tt(q.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&ct(A)}function It(A){let v=A.texture,O=n.get(A),q=n.get(v);A.addEventListener("dispose",R);let j=A.textures,Z=A.isWebGLCubeRenderTarget===!0,Et=j.length>1;if(Et||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,o.memory.textures++),Z){O.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ht]=[];for(let yt=0;yt<v.mipmaps.length;yt++)O.__webglFramebuffer[ht][yt]=i.createFramebuffer()}else O.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ht=0;ht<v.mipmaps.length;ht++)O.__webglFramebuffer[ht]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Et)for(let ht=0,yt=j.length;ht<yt;ht++){let jt=n.get(j[ht]);jt.__webglTexture===void 0&&(jt.__webglTexture=i.createTexture(),o.memory.textures++)}if(A.samples>0&&Lt(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ht=0;ht<j.length;ht++){let yt=j[ht];O.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[ht]);let jt=r.convert(yt.format,yt.colorSpace),it=r.convert(yt.type),Mt=E(yt.internalFormat,jt,it,yt.colorSpace,A.isXRRenderTarget===!0),Ot=wt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot,Mt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,O.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),_t(O.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),dt(i.TEXTURE_CUBE_MAP,v);for(let ht=0;ht<6;ht++)if(v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)tt(O.__webglFramebuffer[ht][yt],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,yt);else tt(O.__webglFramebuffer[ht],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);m(v)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let ht=0,yt=j.length;ht<yt;ht++){let jt=j[ht],it=n.get(jt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),dt(i.TEXTURE_2D,jt),tt(O.__webglFramebuffer,A,jt,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,0),m(jt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ht=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,q.__webglTexture),dt(ht,v),v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)tt(O.__webglFramebuffer[yt],A,v,i.COLOR_ATTACHMENT0,ht,yt);else tt(O.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,ht,0);m(v)&&p(ht),e.unbindTexture()}A.depthBuffer&&ct(A)}function Ft(A){let v=A.textures;for(let O=0,q=v.length;O<q;O++){let j=v[O];if(m(j)){let Z=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Et=n.get(j).__webglTexture;e.bindTexture(Z,Et),p(Z),e.unbindTexture()}}}let Ut=[],P=[];function Qt(A){if(A.samples>0){if(Lt(A)===!1){let v=A.textures,O=A.width,q=A.height,j=i.COLOR_BUFFER_BIT,Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=n.get(A),ht=v.length>1;if(ht)for(let yt=0;yt<v.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let yt=0;yt<v.length;yt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);let jt=n.get(v[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,jt,0)}i.blitFramebuffer(0,0,O,q,0,0,O,q,j,i.NEAREST),c===!0&&(Ut.length=0,P.length=0,Ut.push(i.COLOR_ATTACHMENT0+yt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ut.push(Z),P.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let yt=0;yt<v.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,Et.__webglColorRenderbuffer[yt]);let jt=n.get(v[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Et.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,jt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){let v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function wt(A){return Math.min(s.maxSamples,A.samples)}function Lt(A){let v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Rt(A){let v=o.render.frame;u.get(A)!==v&&(u.set(A,v),A.update())}function Zt(A,v){let O=A.colorSpace,q=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Gn&&O!==On&&(oe.getTransfer(O)===fe?(q!==ln||j!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function Pt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(h.width=A.naturalWidth||A.width,h.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(h.width=A.displayWidth,h.height=A.displayHeight):(h.width=A.width,h.height=A.height),h}this.allocateTextureUnit=H,this.resetTextureUnits=y,this.setTexture2D=G,this.setTexture2DArray=K,this.setTexture3D=V,this.setTextureCube=et,this.rebindTextures=nt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=ct,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=Lt}function Zp(i,t){function e(n,s=On){let r,o=oe.getTransfer(s);if(n===En)return i.UNSIGNED_BYTE;if(n===Xa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ec)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bc)return i.BYTE;if(n===wc)return i.SHORT;if(n===hs)return i.UNSIGNED_SHORT;if(n===Wa)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===ms)return i.HALF_FLOAT;if(n===Tc)return i.ALPHA;if(n===Ac)return i.RGB;if(n===ln)return i.RGBA;if(n===Rc)return i.LUMINANCE;if(n===Cc)return i.LUMINANCE_ALPHA;if(n===Li)return i.DEPTH_COMPONENT;if(n===zi)return i.DEPTH_STENCIL;if(n===Pc)return i.RED;if(n===Ya)return i.RED_INTEGER;if(n===Ic)return i.RG;if(n===Za)return i.RG_INTEGER;if(n===$a)return i.RGBA_INTEGER;if(n===Zs||n===$s||n===Js||n===Ks)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Zs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ks)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Zs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ks)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bo||n===zo||n===ko||n===Ho)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Bo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ko)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ho)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vo||n===Go||n===Wo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vo||n===Go)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xo||n===qo||n===Yo||n===Zo||n===$o||n===Jo||n===Ko||n===Qo||n===jo||n===ta||n===ea||n===na||n===ia||n===sa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Yo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Zo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$o)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Jo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ko)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Qo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ta)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ea)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===na)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ia)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qs||n===ra||n===oa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Qs)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ra)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lc||n===aa||n===la||n===ca)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Qs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===aa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===la)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ca)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Ea=class extends De{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Pi=class extends Re{constructor(){super(),this.isGroup=!0,this.type="Group"}},$p={type:"move"},as=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),p=this._getHandJoint(h,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let u=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],l=u.position.distanceTo(d.position),f=.02,g=.005;h.inputState.pinching&&l>f+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&l<=f-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($p)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Pi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Jp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Kp=`
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

}`,Ta=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new tn({vertexShader:Jp,fragmentShader:Kp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new le(new xe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Aa=class extends Hn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,h=null,u=null,d=null,l=null,f=null,g=null,_=new Ta,m=e.getContextAttributes(),p=null,E=null,S=[],T=[],I=new Xt,R=null,C=new De;C.layers.enable(1),C.viewport=new Kt;let N=new De;N.layers.enable(2),N.viewport=new Kt;let J=[C,N],x=new Ea;x.layers.enable(1),x.layers.enable(2);let y=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let tt=S[$];return tt===void 0&&(tt=new as,S[$]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function($){let tt=S[$];return tt===void 0&&(tt=new as,S[$]=tt),tt.getGripSpace()},this.getHand=function($){let tt=S[$];return tt===void 0&&(tt=new as,S[$]=tt),tt.getHandSpace()};function B($){let tt=T.indexOf($.inputSource);if(tt===-1)return;let _t=S[tt];_t!==void 0&&(_t.update($.inputSource,$.frame,h||o),_t.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",K);for(let $=0;$<S.length;$++){let tt=T[$];tt!==null&&(T[$]=null,S[$].disconnect(tt))}y=null,H=null,_.reset(),t.setRenderTarget(p),f=null,l=null,d=null,s=null,E=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function($){h=$},this.getBaseLayer=function(){return l!==null?l:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",G),s.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){let tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),E=new Tn(f.framebufferWidth,f.framebufferHeight,{format:ln,type:En,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,_t=null,X=null;m.depth&&(X=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?zi:Li,_t=m.stencil?Bi:ai);let ct={colorFormat:e.RGBA8,depthFormat:X,scaleFactor:r};d=new XRWebGLBinding(s,e),l=d.createProjectionLayer(ct),s.updateRenderState({layers:[l]}),t.setPixelRatio(1),t.setSize(l.textureWidth,l.textureHeight,!1),E=new Tn(l.textureWidth,l.textureHeight,{format:ln,type:En,depthTexture:new mr(l.textureWidth,l.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:l.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K($){for(let tt=0;tt<$.removed.length;tt++){let _t=$.removed[tt],X=T.indexOf(_t);X>=0&&(T[X]=null,S[X].disconnect(_t))}for(let tt=0;tt<$.added.length;tt++){let _t=$.added[tt],X=T.indexOf(_t);if(X===-1){for(let nt=0;nt<S.length;nt++)if(nt>=T.length){T.push(_t),X=nt;break}else if(T[nt]===null){T[nt]=_t,X=nt;break}if(X===-1)break}let ct=S[X];ct&&ct.connect(_t)}}let V=new L,et=new L;function W($,tt,_t){V.setFromMatrixPosition(tt.matrixWorld),et.setFromMatrixPosition(_t.matrixWorld);let X=V.distanceTo(et),ct=tt.projectionMatrix.elements,nt=_t.projectionMatrix.elements,It=ct[14]/(ct[10]-1),Ft=ct[14]/(ct[10]+1),Ut=(ct[9]+1)/ct[5],P=(ct[9]-1)/ct[5],Qt=(ct[8]-1)/ct[0],wt=(nt[8]+1)/nt[0],Lt=It*Qt,Rt=It*wt,Zt=X/(-Qt+wt),Pt=Zt*-Qt;if(tt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Pt),$.translateZ(Zt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),ct[10]===-1)$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let A=It+Zt,v=Ft+Zt,O=Lt-Pt,q=Rt+(X-Pt),j=Ut*Ft/v*A,Z=P*Ft/v*A;$.projectionMatrix.makePerspective(O,q,j,Z,A,v),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ut($,tt){tt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(tt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let tt=$.near,_t=$.far;_.texture!==null&&(_.depthNear>0&&(tt=_.depthNear),_.depthFar>0&&(_t=_.depthFar)),x.near=N.near=C.near=tt,x.far=N.far=C.far=_t,(y!==x.near||H!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),y=x.near,H=x.far);let X=$.parent,ct=x.cameras;ut(x,X);for(let nt=0;nt<ct.length;nt++)ut(ct[nt],X);ct.length===2?W(x,C,N):x.projectionMatrix.copy(C.projectionMatrix),ft($,x,X)};function ft($,tt,_t){_t===null?$.matrix.copy(tt.matrixWorld):($.matrix.copy(_t.matrixWorld),$.matrix.invert(),$.matrix.multiply(tt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ua*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(l===null&&f===null))return c},this.setFoveation=function($){c=$,l!==null&&(l.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let dt=null;function qt($,tt){if(u=tt.getViewerPose(h||o),g=tt,u!==null){let _t=u.views;f!==null&&(t.setRenderTargetFramebuffer(E,f.framebuffer),t.setRenderTarget(E));let X=!1;_t.length!==x.cameras.length&&(x.cameras.length=0,X=!0);for(let nt=0;nt<_t.length;nt++){let It=_t[nt],Ft=null;if(f!==null)Ft=f.getViewport(It);else{let P=d.getViewSubImage(l,It);Ft=P.viewport,nt===0&&(t.setRenderTargetTextures(E,P.colorTexture,l.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(E))}let Ut=J[nt];Ut===void 0&&(Ut=new De,Ut.layers.enable(nt),Ut.viewport=new Kt,J[nt]=Ut),Ut.matrix.fromArray(It.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(It.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),nt===0&&(x.matrix.copy(Ut.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),X===!0&&x.cameras.push(Ut)}let ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")){let nt=d.getDepthInformation(_t[0]);nt&&nt.isValid&&nt.texture&&_.init(t,nt,s.renderState)}}for(let _t=0;_t<S.length;_t++){let X=T[_t],ct=S[_t];X!==null&&ct!==void 0&&ct.update(X,tt,h||o)}dt&&dt($,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}let Yt=new Bc;Yt.setAnimationLoop(qt),this.setAnimationLoop=function($){dt=$},this.dispose=function(){}}},ti=new je,Qp=new ne;function jp(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Oc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,S,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),l(m,p),p.isMeshPhysicalMaterial&&f(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,E,S):p.isSpriteMaterial?h(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ne&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ne&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=t.get(p),S=E.envMap,T=E.envMapRotation;S&&(m.envMap.value=S,ti.copy(T),ti.x*=-1,ti.y*=-1,ti.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),m.envMapRotation.value.setFromMatrix4(Qp.makeRotationFromEuler(ti)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,E,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=S*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function l(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ne&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){let E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function tm(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,S){let T=S.program;n.uniformBlockBinding(E,T)}function h(E,S){let T=s[E.id];T===void 0&&(g(E),T=u(E),s[E.id]=T,E.addEventListener("dispose",m));let I=S.program;n.updateUBOMapping(E,I);let R=t.render.frame;r[E.id]!==R&&(l(E),r[E.id]=R)}function u(E){let S=d();E.__bindingPointIndex=S;let T=i.createBuffer(),I=E.__size,R=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,I,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,T),T}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function l(E){let S=s[E.id],T=E.uniforms,I=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let R=0,C=T.length;R<C;R++){let N=Array.isArray(T[R])?T[R]:[T[R]];for(let J=0,x=N.length;J<x;J++){let y=N[J];if(f(y,R,J,I)===!0){let H=y.__offset,B=Array.isArray(y.value)?y.value:[y.value],G=0;for(let K=0;K<B.length;K++){let V=B[K],et=_(V);typeof V=="number"||typeof V=="boolean"?(y.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,H+G,y.__data)):V.isMatrix3?(y.__data[0]=V.elements[0],y.__data[1]=V.elements[1],y.__data[2]=V.elements[2],y.__data[3]=0,y.__data[4]=V.elements[3],y.__data[5]=V.elements[4],y.__data[6]=V.elements[5],y.__data[7]=0,y.__data[8]=V.elements[6],y.__data[9]=V.elements[7],y.__data[10]=V.elements[8],y.__data[11]=0):(V.toArray(y.__data,G),G+=et.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,y.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,S,T,I){let R=E.value,C=S+"_"+T;if(I[C]===void 0)return typeof R=="number"||typeof R=="boolean"?I[C]=R:I[C]=R.clone(),!0;{let N=I[C];if(typeof R=="number"||typeof R=="boolean"){if(N!==R)return I[C]=R,!0}else if(N.equals(R)===!1)return N.copy(R),!0}return!1}function g(E){let S=E.uniforms,T=0,I=16;for(let C=0,N=S.length;C<N;C++){let J=Array.isArray(S[C])?S[C]:[S[C]];for(let x=0,y=J.length;x<y;x++){let H=J[x],B=Array.isArray(H.value)?H.value:[H.value];for(let G=0,K=B.length;G<K;G++){let V=B[G],et=_(V),W=T%I,ut=W%et.boundary,ft=W+ut;T+=ut,ft!==0&&I-ft<et.storage&&(T+=I-ft),H.__data=new Float32Array(et.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=T,T+=et.storage}}}let R=T%I;return R>0&&(T+=I-R),E.__size=T,E.__cache={},this}function _(E){let S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){let S=E.target;S.removeEventListener("dispose",m);let T=o.indexOf(S.__bindingPointIndex);o.splice(T,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(let E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:c,update:h,dispose:p}}var gr=class{constructor(t={}){let{canvas:e=nu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let l;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");l=n.getContextAttributes().alpha}else l=o;let f=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ue,this.toneMapping=zn,this.toneMappingExposure=1;let S=this,T=!1,I=0,R=0,C=null,N=-1,J=null,x=new Kt,y=new Kt,H=null,B=new Wt(0),G=0,K=e.width,V=e.height,et=1,W=null,ut=null,ft=new Kt(0,0,K,V),dt=new Kt(0,0,K,V),qt=!1,Yt=new us,$=!1,tt=!1,_t=new ne,X=new ne,ct=new L,nt=new Kt,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ft=!1;function Ut(){return C===null?et:1}let P=n;function Qt(b,D){return e.getContext(b,D)}try{let b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ha}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),P===null){let D="webgl2";if(P=Qt(D,b),P===null)throw Qt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let wt,Lt,Rt,Zt,Pt,A,v,O,q,j,Z,Et,ht,yt,jt,it,Mt,Ot,Bt,St,$t,Ht,ce,U;function xt(){wt=new g0(P),wt.init(),Ht=new Zp(P,wt),Lt=new h0(P,wt,t,Ht),Rt=new Xp(P),Lt.reverseDepthBuffer&&Rt.buffers.depth.setReversed(!0),Zt=new v0(P),Pt=new Lp,A=new Yp(P,wt,Rt,Pt,Lt,Ht,Zt),v=new f0(S),O=new m0(S),q=new Eu(P),ce=new l0(P,q),j=new _0(P,q,Zt,ce),Z=new M0(P,j,q,Zt),Bt=new y0(P,Lt,A),it=new u0(Pt),Et=new Ip(S,v,O,wt,Lt,ce,it),ht=new jp(S,Pt),yt=new Dp,jt=new kp(wt),Ot=new a0(S,v,O,Rt,Z,l,c),Mt=new Gp(S,Z,Lt),U=new tm(P,Zt,Lt,Rt),St=new c0(P,wt,Zt),$t=new x0(P,wt,Zt),Zt.programs=Et.programs,S.capabilities=Lt,S.extensions=wt,S.properties=Pt,S.renderLists=yt,S.shadowMap=Mt,S.state=Rt,S.info=Zt}xt();let Y=new Aa(S,P);this.xr=Y,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let b=wt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=wt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(b){b!==void 0&&(et=b,this.setSize(K,V,!1))},this.getSize=function(b){return b.set(K,V)},this.setSize=function(b,D,z=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=b,V=D,e.width=Math.floor(b*et),e.height=Math.floor(D*et),z===!0&&(e.style.width=b+"px",e.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(K*et,V*et).floor()},this.setDrawingBufferSize=function(b,D,z){K=b,V=D,et=z,e.width=Math.floor(b*z),e.height=Math.floor(D*z),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(x)},this.getViewport=function(b){return b.copy(ft)},this.setViewport=function(b,D,z,k){b.isVector4?ft.set(b.x,b.y,b.z,b.w):ft.set(b,D,z,k),Rt.viewport(x.copy(ft).multiplyScalar(et).round())},this.getScissor=function(b){return b.copy(dt)},this.setScissor=function(b,D,z,k){b.isVector4?dt.set(b.x,b.y,b.z,b.w):dt.set(b,D,z,k),Rt.scissor(y.copy(dt).multiplyScalar(et).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(b){Rt.setScissorTest(qt=b)},this.setOpaqueSort=function(b){W=b},this.setTransparentSort=function(b){ut=b},this.getClearColor=function(b){return b.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor.apply(Ot,arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha.apply(Ot,arguments)},this.clear=function(b=!0,D=!0,z=!0){let k=0;if(b){let F=!1;if(C!==null){let st=C.texture.format;F=st===$a||st===Za||st===Ya}if(F){let st=C.texture.type,gt=st===En||st===ai||st===hs||st===Bi||st===Xa||st===qa,bt=Ot.getClearColor(),Tt=Ot.getClearAlpha(),Dt=bt.r,Nt=bt.g,At=bt.b;gt?(f[0]=Dt,f[1]=Nt,f[2]=At,f[3]=Tt,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=Dt,g[1]=Nt,g[2]=At,g[3]=Tt,P.clearBufferiv(P.COLOR,0,g))}else k|=P.COLOR_BUFFER_BIT}D&&(k|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),z&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),yt.dispose(),jt.dispose(),Pt.dispose(),v.dispose(),O.dispose(),Z.dispose(),ce.dispose(),U.dispose(),Et.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",ul),Y.removeEventListener("sessionend",fl),Zn.stop()};function Q(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let b=Zt.autoReset,D=Mt.enabled,z=Mt.autoUpdate,k=Mt.needsUpdate,F=Mt.type;xt(),Zt.autoReset=b,Mt.enabled=D,Mt.autoUpdate=z,Mt.needsUpdate=k,Mt.type=F}function vt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Jt(b){let D=b.target;D.removeEventListener("dispose",Jt),Me(D)}function Me(b){Be(b),Pt.remove(b)}function Be(b){let D=Pt.get(b).programs;D!==void 0&&(D.forEach(function(z){Et.releaseProgram(z)}),b.isShaderMaterial&&Et.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,z,k,F,st){D===null&&(D=It);let gt=F.isMesh&&F.matrixWorld.determinant()<0,bt=fh(b,D,z,k,F);Rt.setMaterial(k,gt);let Tt=z.index,Dt=1;if(k.wireframe===!0){if(Tt=j.getWireframeAttribute(z),Tt===void 0)return;Dt=2}let Nt=z.drawRange,At=z.attributes.position,ae=Nt.start*Dt,ue=(Nt.start+Nt.count)*Dt;st!==null&&(ae=Math.max(ae,st.start*Dt),ue=Math.min(ue,(st.start+st.count)*Dt)),Tt!==null?(ae=Math.max(ae,0),ue=Math.min(ue,Tt.count)):At!=null&&(ae=Math.max(ae,0),ue=Math.min(ue,At.count));let _e=ue-ae;if(_e<0||_e===1/0)return;ce.setup(F,k,bt,z,Tt);let Ve,se=St;if(Tt!==null&&(Ve=q.get(Tt),se=$t,se.setIndex(Ve)),F.isMesh)k.wireframe===!0?(Rt.setLineWidth(k.wireframeLinewidth*Ut()),se.setMode(P.LINES)):se.setMode(P.TRIANGLES);else if(F.isLine){let Ct=k.linewidth;Ct===void 0&&(Ct=1),Rt.setLineWidth(Ct*Ut()),F.isLineSegments?se.setMode(P.LINES):F.isLineLoop?se.setMode(P.LINE_LOOP):se.setMode(P.LINE_STRIP)}else F.isPoints?se.setMode(P.POINTS):F.isSprite&&se.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)se.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(wt.get("WEBGL_multi_draw"))se.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let Ct=F._multiDrawStarts,Pe=F._multiDrawCounts,re=F._multiDrawCount,nn=Tt?q.get(Tt).bytesPerElement:1,pi=Pt.get(k).currentProgram.getUniforms();for(let Ge=0;Ge<re;Ge++)pi.setValue(P,"_gl_DrawID",Ge),se.render(Ct[Ge]/nn,Pe[Ge])}else if(F.isInstancedMesh)se.renderInstances(ae,_e,F.count);else if(z.isInstancedBufferGeometry){let Ct=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Pe=Math.min(z.instanceCount,Ct);se.renderInstances(ae,_e,Pe)}else se.render(ae,_e)};function ee(b,D,z){b.transparent===!0&&b.side===be&&b.forceSinglePass===!1?(b.side=Ne,b.needsUpdate=!0,bs(b,D,z),b.side=kn,b.needsUpdate=!0,bs(b,D,z),b.side=be):bs(b,D,z)}this.compile=function(b,D,z=null){z===null&&(z=b),m=jt.get(z),m.init(D),E.push(m),z.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),b!==z&&b.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();let k=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let st=F.material;if(st)if(Array.isArray(st))for(let gt=0;gt<st.length;gt++){let bt=st[gt];ee(bt,z,F),k.add(bt)}else ee(st,z,F),k.add(st)}),E.pop(),m=null,k},this.compileAsync=function(b,D,z=null){let k=this.compile(b,D,z);return new Promise(F=>{function st(){if(k.forEach(function(gt){Pt.get(gt).currentProgram.isReady()&&k.delete(gt)}),k.size===0){F(b);return}setTimeout(st,10)}wt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let ze=null;function mn(b){ze&&ze(b)}function ul(){Zn.stop()}function fl(){Zn.start()}let Zn=new Bc;Zn.setAnimationLoop(mn),typeof self<"u"&&Zn.setContext(self),this.setAnimationLoop=function(b){ze=b,Y.setAnimationLoop(b),b===null?Zn.stop():Zn.start()},Y.addEventListener("sessionstart",ul),Y.addEventListener("sessionend",fl),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(D),D=Y.getCamera()),b.isScene===!0&&b.onBeforeRender(S,b,D,C),m=jt.get(b,E.length),m.init(D),E.push(m),X.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Yt.setFromProjectionMatrix(X),tt=this.localClippingEnabled,$=it.init(this.clippingPlanes,tt),_=yt.get(b,p.length),_.init(),p.push(_),Y.enabled===!0&&Y.isPresenting===!0){let st=S.xr.getDepthSensingMesh();st!==null&&Vr(st,D,-1/0,S.sortObjects)}Vr(b,D,0,S.sortObjects),_.finish(),S.sortObjects===!0&&_.sort(W,ut),Ft=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Ft&&Ot.addToRenderList(_,b),this.info.render.frame++,$===!0&&it.beginShadows();let z=m.state.shadowsArray;Mt.render(z,b,D),$===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();let k=_.opaque,F=_.transmissive;if(m.setupLights(),D.isArrayCamera){let st=D.cameras;if(F.length>0)for(let gt=0,bt=st.length;gt<bt;gt++){let Tt=st[gt];pl(k,F,b,Tt)}Ft&&Ot.render(b);for(let gt=0,bt=st.length;gt<bt;gt++){let Tt=st[gt];dl(_,b,Tt,Tt.viewport)}}else F.length>0&&pl(k,F,b,D),Ft&&Ot.render(b),dl(_,b,D);C!==null&&(A.updateMultisampleRenderTarget(C),A.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(S,b,D),ce.resetDefaultState(),N=-1,J=null,E.pop(),E.length>0?(m=E[E.length-1],$===!0&&it.setGlobalState(S.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Vr(b,D,z,k){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Yt.intersectsSprite(b)){k&&nt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(X);let gt=Z.update(b),bt=b.material;bt.visible&&_.push(b,gt,bt,z,nt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Yt.intersectsObject(b))){let gt=Z.update(b),bt=b.material;if(k&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),nt.copy(b.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),nt.copy(gt.boundingSphere.center)),nt.applyMatrix4(b.matrixWorld).applyMatrix4(X)),Array.isArray(bt)){let Tt=gt.groups;for(let Dt=0,Nt=Tt.length;Dt<Nt;Dt++){let At=Tt[Dt],ae=bt[At.materialIndex];ae&&ae.visible&&_.push(b,gt,ae,z,nt.z,At)}}else bt.visible&&_.push(b,gt,bt,z,nt.z,null)}}let st=b.children;for(let gt=0,bt=st.length;gt<bt;gt++)Vr(st[gt],D,z,k)}function dl(b,D,z,k){let F=b.opaque,st=b.transmissive,gt=b.transparent;m.setupLightsView(z),$===!0&&it.setGlobalState(S.clippingPlanes,z),k&&Rt.viewport(x.copy(k)),F.length>0&&Ss(F,D,z),st.length>0&&Ss(st,D,z),gt.length>0&&Ss(gt,D,z),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function pl(b,D,z,k){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[k.id]===void 0&&(m.state.transmissionRenderTarget[k.id]=new Tn(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float")?ms:En,minFilter:oi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:oe.workingColorSpace}));let st=m.state.transmissionRenderTarget[k.id],gt=k.viewport||x;st.setSize(gt.z,gt.w);let bt=S.getRenderTarget();S.setRenderTarget(st),S.getClearColor(B),G=S.getClearAlpha(),G<1&&S.setClearColor(16777215,.5),S.clear(),Ft&&Ot.render(z);let Tt=S.toneMapping;S.toneMapping=zn;let Dt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),m.setupLightsView(k),$===!0&&it.setGlobalState(S.clippingPlanes,k),Ss(b,z,k),A.updateMultisampleRenderTarget(st),A.updateRenderTargetMipmap(st),wt.has("WEBGL_multisampled_render_to_texture")===!1){let Nt=!1;for(let At=0,ae=D.length;At<ae;At++){let ue=D[At],_e=ue.object,Ve=ue.geometry,se=ue.material,Ct=ue.group;if(se.side===be&&_e.layers.test(k.layers)){let Pe=se.side;se.side=Ne,se.needsUpdate=!0,ml(_e,z,k,Ve,se,Ct),se.side=Pe,se.needsUpdate=!0,Nt=!0}}Nt===!0&&(A.updateMultisampleRenderTarget(st),A.updateRenderTargetMipmap(st))}S.setRenderTarget(bt),S.setClearColor(B,G),Dt!==void 0&&(k.viewport=Dt),S.toneMapping=Tt}function Ss(b,D,z){let k=D.isScene===!0?D.overrideMaterial:null;for(let F=0,st=b.length;F<st;F++){let gt=b[F],bt=gt.object,Tt=gt.geometry,Dt=k===null?gt.material:k,Nt=gt.group;bt.layers.test(z.layers)&&ml(bt,D,z,Tt,Dt,Nt)}}function ml(b,D,z,k,F,st){b.onBeforeRender(S,D,z,k,F,st),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(S,D,z,k,b,st),F.transparent===!0&&F.side===be&&F.forceSinglePass===!1?(F.side=Ne,F.needsUpdate=!0,S.renderBufferDirect(z,D,k,F,b,st),F.side=kn,F.needsUpdate=!0,S.renderBufferDirect(z,D,k,F,b,st),F.side=be):S.renderBufferDirect(z,D,k,F,b,st),b.onAfterRender(S,D,z,k,F,st)}function bs(b,D,z){D.isScene!==!0&&(D=It);let k=Pt.get(b),F=m.state.lights,st=m.state.shadowsArray,gt=F.state.version,bt=Et.getParameters(b,F.state,st,D,z),Tt=Et.getProgramCacheKey(bt),Dt=k.programs;k.environment=b.isMeshStandardMaterial?D.environment:null,k.fog=D.fog,k.envMap=(b.isMeshStandardMaterial?O:v).get(b.envMap||k.environment),k.envMapRotation=k.environment!==null&&b.envMap===null?D.environmentRotation:b.envMapRotation,Dt===void 0&&(b.addEventListener("dispose",Jt),Dt=new Map,k.programs=Dt);let Nt=Dt.get(Tt);if(Nt!==void 0){if(k.currentProgram===Nt&&k.lightsStateVersion===gt)return _l(b,bt),Nt}else bt.uniforms=Et.getUniforms(b),b.onBeforeCompile(bt,S),Nt=Et.acquireProgram(bt,Tt),Dt.set(Tt,Nt),k.uniforms=bt.uniforms;let At=k.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(At.clippingPlanes=it.uniform),_l(b,bt),k.needsLights=ph(b),k.lightsStateVersion=gt,k.needsLights&&(At.ambientLightColor.value=F.state.ambient,At.lightProbe.value=F.state.probe,At.directionalLights.value=F.state.directional,At.directionalLightShadows.value=F.state.directionalShadow,At.spotLights.value=F.state.spot,At.spotLightShadows.value=F.state.spotShadow,At.rectAreaLights.value=F.state.rectArea,At.ltc_1.value=F.state.rectAreaLTC1,At.ltc_2.value=F.state.rectAreaLTC2,At.pointLights.value=F.state.point,At.pointLightShadows.value=F.state.pointShadow,At.hemisphereLights.value=F.state.hemi,At.directionalShadowMap.value=F.state.directionalShadowMap,At.directionalShadowMatrix.value=F.state.directionalShadowMatrix,At.spotShadowMap.value=F.state.spotShadowMap,At.spotLightMatrix.value=F.state.spotLightMatrix,At.spotLightMap.value=F.state.spotLightMap,At.pointShadowMap.value=F.state.pointShadowMap,At.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=Nt,k.uniformsList=null,Nt}function gl(b){if(b.uniformsList===null){let D=b.currentProgram.getUniforms();b.uniformsList=Di.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function _l(b,D){let z=Pt.get(b);z.outputColorSpace=D.outputColorSpace,z.batching=D.batching,z.batchingColor=D.batchingColor,z.instancing=D.instancing,z.instancingColor=D.instancingColor,z.instancingMorph=D.instancingMorph,z.skinning=D.skinning,z.morphTargets=D.morphTargets,z.morphNormals=D.morphNormals,z.morphColors=D.morphColors,z.morphTargetsCount=D.morphTargetsCount,z.numClippingPlanes=D.numClippingPlanes,z.numIntersection=D.numClipIntersection,z.vertexAlphas=D.vertexAlphas,z.vertexTangents=D.vertexTangents,z.toneMapping=D.toneMapping}function fh(b,D,z,k,F){D.isScene!==!0&&(D=It),A.resetTextureUnits();let st=D.fog,gt=k.isMeshStandardMaterial?D.environment:null,bt=C===null?S.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Gn,Tt=(k.isMeshStandardMaterial?O:v).get(k.envMap||gt),Dt=k.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Nt=!!z.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),At=!!z.morphAttributes.position,ae=!!z.morphAttributes.normal,ue=!!z.morphAttributes.color,_e=zn;k.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(_e=S.toneMapping);let Ve=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,se=Ve!==void 0?Ve.length:0,Ct=Pt.get(k),Pe=m.state.lights;if($===!0&&(tt===!0||b!==J)){let Je=b===J&&k.id===N;it.setState(k,b,Je)}let re=!1;k.version===Ct.__version?(Ct.needsLights&&Ct.lightsStateVersion!==Pe.state.version||Ct.outputColorSpace!==bt||F.isBatchedMesh&&Ct.batching===!1||!F.isBatchedMesh&&Ct.batching===!0||F.isBatchedMesh&&Ct.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ct.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ct.instancing===!1||!F.isInstancedMesh&&Ct.instancing===!0||F.isSkinnedMesh&&Ct.skinning===!1||!F.isSkinnedMesh&&Ct.skinning===!0||F.isInstancedMesh&&Ct.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ct.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ct.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ct.instancingMorph===!1&&F.morphTexture!==null||Ct.envMap!==Tt||k.fog===!0&&Ct.fog!==st||Ct.numClippingPlanes!==void 0&&(Ct.numClippingPlanes!==it.numPlanes||Ct.numIntersection!==it.numIntersection)||Ct.vertexAlphas!==Dt||Ct.vertexTangents!==Nt||Ct.morphTargets!==At||Ct.morphNormals!==ae||Ct.morphColors!==ue||Ct.toneMapping!==_e||Ct.morphTargetsCount!==se)&&(re=!0):(re=!0,Ct.__version=k.version);let nn=Ct.currentProgram;re===!0&&(nn=bs(k,D,F));let pi=!1,Ge=!1,Gr=!1,ye=nn.getUniforms(),Pn=Ct.uniforms;if(Rt.useProgram(nn.program)&&(pi=!0,Ge=!0,Gr=!0),k.id!==N&&(N=k.id,Ge=!0),pi||J!==b){Lt.reverseDepthBuffer?(_t.copy(b.projectionMatrix),su(_t),ru(_t),ye.setValue(P,"projectionMatrix",_t)):ye.setValue(P,"projectionMatrix",b.projectionMatrix),ye.setValue(P,"viewMatrix",b.matrixWorldInverse);let Je=ye.map.cameraPosition;Je!==void 0&&Je.setValue(P,ct.setFromMatrixPosition(b.matrixWorld)),Lt.logarithmicDepthBuffer&&ye.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ye.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),J!==b&&(J=b,Ge=!0,Gr=!0)}if(F.isSkinnedMesh){ye.setOptional(P,F,"bindMatrix"),ye.setOptional(P,F,"bindMatrixInverse");let Je=F.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),ye.setValue(P,"boneTexture",Je.boneTexture,A))}F.isBatchedMesh&&(ye.setOptional(P,F,"batchingTexture"),ye.setValue(P,"batchingTexture",F._matricesTexture,A),ye.setOptional(P,F,"batchingIdTexture"),ye.setValue(P,"batchingIdTexture",F._indirectTexture,A),ye.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&ye.setValue(P,"batchingColorTexture",F._colorsTexture,A));let Wr=z.morphAttributes;if((Wr.position!==void 0||Wr.normal!==void 0||Wr.color!==void 0)&&Bt.update(F,z,nn),(Ge||Ct.receiveShadow!==F.receiveShadow)&&(Ct.receiveShadow=F.receiveShadow,ye.setValue(P,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Pn.envMap.value=Tt,Pn.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&D.environment!==null&&(Pn.envMapIntensity.value=D.environmentIntensity),Ge&&(ye.setValue(P,"toneMappingExposure",S.toneMappingExposure),Ct.needsLights&&dh(Pn,Gr),st&&k.fog===!0&&ht.refreshFogUniforms(Pn,st),ht.refreshMaterialUniforms(Pn,k,et,V,m.state.transmissionRenderTarget[b.id]),Di.upload(P,gl(Ct),Pn,A)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Di.upload(P,gl(Ct),Pn,A),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ye.setValue(P,"center",F.center),ye.setValue(P,"modelViewMatrix",F.modelViewMatrix),ye.setValue(P,"normalMatrix",F.normalMatrix),ye.setValue(P,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){let Je=k.uniformsGroups;for(let Xr=0,mh=Je.length;Xr<mh;Xr++){let xl=Je[Xr];U.update(xl,nn),U.bind(xl,nn)}}return nn}function dh(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function ph(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,D,z){Pt.get(b.texture).__webglTexture=D,Pt.get(b.depthTexture).__webglTexture=z;let k=Pt.get(b);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=z===void 0,k.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,D){let z=Pt.get(b);z.__webglFramebuffer=D,z.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,z=0){C=b,I=D,R=z;let k=!0,F=null,st=!1,gt=!1;if(b){let Tt=Pt.get(b);if(Tt.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(P.FRAMEBUFFER,null),k=!1;else if(Tt.__webglFramebuffer===void 0)A.setupRenderTarget(b);else if(Tt.__hasExternalTextures)A.rebindTextures(b,Pt.get(b.texture).__webglTexture,Pt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let At=b.depthTexture;if(Tt.__boundDepthTexture!==At){if(At!==null&&Pt.has(At)&&(b.width!==At.image.width||b.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(b)}}let Dt=b.texture;(Dt.isData3DTexture||Dt.isDataArrayTexture||Dt.isCompressedArrayTexture)&&(gt=!0);let Nt=Pt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Nt[D])?F=Nt[D][z]:F=Nt[D],st=!0):b.samples>0&&A.useMultisampledRTT(b)===!1?F=Pt.get(b).__webglMultisampledFramebuffer:Array.isArray(Nt)?F=Nt[z]:F=Nt,x.copy(b.viewport),y.copy(b.scissor),H=b.scissorTest}else x.copy(ft).multiplyScalar(et).floor(),y.copy(dt).multiplyScalar(et).floor(),H=qt;if(Rt.bindFramebuffer(P.FRAMEBUFFER,F)&&k&&Rt.drawBuffers(b,F),Rt.viewport(x),Rt.scissor(y),Rt.setScissorTest(H),st){let Tt=Pt.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,Tt.__webglTexture,z)}else if(gt){let Tt=Pt.get(b.texture),Dt=D||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.__webglTexture,z||0,Dt)}N=-1},this.readRenderTargetPixels=function(b,D,z,k,F,st,gt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=Pt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(bt=bt[gt]),bt){Rt.bindFramebuffer(P.FRAMEBUFFER,bt);try{let Tt=b.texture,Dt=Tt.format,Nt=Tt.type;if(!Lt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Lt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-k&&z>=0&&z<=b.height-F&&P.readPixels(D,z,k,F,Ht.convert(Dt),Ht.convert(Nt),st)}finally{let Tt=C!==null?Pt.get(C).__webglFramebuffer:null;Rt.bindFramebuffer(P.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(b,D,z,k,F,st,gt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=Pt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&gt!==void 0&&(bt=bt[gt]),bt){let Tt=b.texture,Dt=Tt.format,Nt=Tt.type;if(!Lt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Lt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(D>=0&&D<=b.width-k&&z>=0&&z<=b.height-F){Rt.bindFramebuffer(P.FRAMEBUFFER,bt);let At=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,At),P.bufferData(P.PIXEL_PACK_BUFFER,st.byteLength,P.STREAM_READ),P.readPixels(D,z,k,F,Ht.convert(Dt),Ht.convert(Nt),0);let ae=C!==null?Pt.get(C).__webglFramebuffer:null;Rt.bindFramebuffer(P.FRAMEBUFFER,ae);let ue=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await iu(P,ue,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,At),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,st),P.deleteBuffer(At),P.deleteSync(ue),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,D=null,z=0){b.isTexture!==!0&&(js("WebGLRenderer: copyFramebufferToTexture function signature has changed."),D=arguments[0]||null,b=arguments[1]);let k=Math.pow(2,-z),F=Math.floor(b.image.width*k),st=Math.floor(b.image.height*k),gt=D!==null?D.x:0,bt=D!==null?D.y:0;A.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,gt,bt,F,st),Rt.unbindTexture()},this.copyTextureToTexture=function(b,D,z=null,k=null,F=0){b.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,b=arguments[1],D=arguments[2],F=arguments[3]||0,z=null);let st,gt,bt,Tt,Dt,Nt;z!==null?(st=z.max.x-z.min.x,gt=z.max.y-z.min.y,bt=z.min.x,Tt=z.min.y):(st=b.image.width,gt=b.image.height,bt=0,Tt=0),k!==null?(Dt=k.x,Nt=k.y):(Dt=0,Nt=0);let At=Ht.convert(D.format),ae=Ht.convert(D.type);A.setTexture2D(D,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);let ue=P.getParameter(P.UNPACK_ROW_LENGTH),_e=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ve=P.getParameter(P.UNPACK_SKIP_PIXELS),se=P.getParameter(P.UNPACK_SKIP_ROWS),Ct=P.getParameter(P.UNPACK_SKIP_IMAGES),Pe=b.isCompressedTexture?b.mipmaps[F]:b.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Pe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Pe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,bt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Tt),b.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,F,Dt,Nt,st,gt,At,ae,Pe.data):b.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,F,Dt,Nt,Pe.width,Pe.height,At,Pe.data):P.texSubImage2D(P.TEXTURE_2D,F,Dt,Nt,st,gt,At,ae,Pe),P.pixelStorei(P.UNPACK_ROW_LENGTH,ue),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,_e),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ve),P.pixelStorei(P.UNPACK_SKIP_ROWS,se),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ct),F===0&&D.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),Rt.unbindTexture()},this.copyTextureToTexture3D=function(b,D,z=null,k=null,F=0){b.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,k=arguments[1]||null,b=arguments[2],D=arguments[3],F=arguments[4]||0);let st,gt,bt,Tt,Dt,Nt,At,ae,ue,_e=b.isCompressedTexture?b.mipmaps[F]:b.image;z!==null?(st=z.max.x-z.min.x,gt=z.max.y-z.min.y,bt=z.max.z-z.min.z,Tt=z.min.x,Dt=z.min.y,Nt=z.min.z):(st=_e.width,gt=_e.height,bt=_e.depth,Tt=0,Dt=0,Nt=0),k!==null?(At=k.x,ae=k.y,ue=k.z):(At=0,ae=0,ue=0);let Ve=Ht.convert(D.format),se=Ht.convert(D.type),Ct;if(D.isData3DTexture)A.setTexture3D(D,0),Ct=P.TEXTURE_3D;else if(D.isDataArrayTexture||D.isCompressedArrayTexture)A.setTexture2DArray(D,0),Ct=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);let Pe=P.getParameter(P.UNPACK_ROW_LENGTH),re=P.getParameter(P.UNPACK_IMAGE_HEIGHT),nn=P.getParameter(P.UNPACK_SKIP_PIXELS),pi=P.getParameter(P.UNPACK_SKIP_ROWS),Ge=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,_e.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,_e.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Tt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Dt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Nt),b.isDataTexture||b.isData3DTexture?P.texSubImage3D(Ct,F,At,ae,ue,st,gt,bt,Ve,se,_e.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(Ct,F,At,ae,ue,st,gt,bt,Ve,_e.data):P.texSubImage3D(Ct,F,At,ae,ue,st,gt,bt,Ve,se,_e),P.pixelStorei(P.UNPACK_ROW_LENGTH,Pe),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,re),P.pixelStorei(P.UNPACK_SKIP_PIXELS,nn),P.pixelStorei(P.UNPACK_SKIP_ROWS,pi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ge),F===0&&D.generateMipmaps&&P.generateMipmap(Ct),Rt.unbindTexture()},this.initRenderTarget=function(b){Pt.get(b).__webglFramebuffer===void 0&&A.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),Rt.unbindTexture()},this.resetState=function(){I=0,R=0,C=null,Rt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Ja?"display-p3":"srgb",e.unpackColorSpace=oe.workingColorSpace===Ar?"display-p3":"srgb"}};var Gi=class extends Re{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new je,this.environmentIntensity=1,this.environmentRotation=new je,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var fs=class extends Vn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},pc=new ne,Ra=new lr,Xs=new ki,qs=new L,_r=class extends Re{constructor(t=new we,e=new fs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(s),Xs.radius+=r,t.ray.intersectsSphere(Xs)===!1)return;pc.copy(s).invert(),Ra.copy(t.ray).applyMatrix4(pc);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,h=n.index,d=n.attributes.position;if(h!==null){let l=Math.max(0,o.start),f=Math.min(h.count,o.start+o.count);for(let g=l,_=f;g<_;g++){let m=h.getX(g);qs.fromBufferAttribute(d,m),mc(qs,m,c,s,t,e,this)}}else{let l=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=l,_=f;g<_;g++)qs.fromBufferAttribute(d,g),mc(qs,g,c,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function mc(i,t,e,n,s,r,o){let a=Ra.distanceSqToPoint(i);if(a<e){let c=new L;Ra.closestPointToPoint(i,c),c.applyMatrix4(n);let h=s.ray.origin.distanceTo(c);if(h<s.near||h>s.far)return;r.push({distance:h,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Wi=class extends qe{constructor(t,e,n,s,r,o,a,c,h){super(t,e,n,s,r,o,a,c,h),this.isCanvasTexture=!0,this.needsUpdate=!0}};var xr=class i extends we{constructor(t=[new Xt(0,-.5),new Xt(.5,0),new Xt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Oe(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],h=[],u=1/e,d=new L,l=new Xt,f=new L,g=new L,_=new L,m=0,p=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let E=0;E<=e;E++){let S=n+E*u*s,T=Math.sin(S),I=Math.cos(S);for(let R=0;R<=t.length-1;R++){d.x=t[R].x*T,d.y=t[R].y,d.z=t[R].x*I,o.push(d.x,d.y,d.z),l.x=E/e,l.y=R/(t.length-1),a.push(l.x,l.y);let C=c[3*R+0]*T,N=c[3*R+1],J=c[3*R+0]*I;h.push(C,N,J)}}for(let E=0;E<e;E++)for(let S=0;S<t.length-1;S++){let T=S+E*t.length,I=T,R=T+t.length,C=T+t.length+1,N=T+1;r.push(I,R,N),r.push(C,N,R)}this.setIndex(r),this.setAttribute("position",new pe(o,3)),this.setAttribute("uv",new pe(a,2)),this.setAttribute("normal",new pe(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var ds=class i extends we{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let h=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],l=[],f=[],g=0,_=[],m=n/2,p=0;E(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new pe(d,3)),this.setAttribute("normal",new pe(l,3)),this.setAttribute("uv",new pe(f,2));function E(){let T=new L,I=new L,R=0,C=(e-t)/n;for(let N=0;N<=r;N++){let J=[],x=N/r,y=x*(e-t)+t;for(let H=0;H<=s;H++){let B=H/s,G=B*c+a,K=Math.sin(G),V=Math.cos(G);I.x=y*K,I.y=-x*n+m,I.z=y*V,d.push(I.x,I.y,I.z),T.set(K,C,V).normalize(),l.push(T.x,T.y,T.z),f.push(B,1-x),J.push(g++)}_.push(J)}for(let N=0;N<s;N++)for(let J=0;J<r;J++){let x=_[J][N],y=_[J+1][N],H=_[J+1][N+1],B=_[J][N+1];t>0&&(u.push(x,y,B),R+=3),e>0&&(u.push(y,H,B),R+=3)}h.addGroup(p,R,0),p+=R}function S(T){let I=g,R=new Xt,C=new L,N=0,J=T===!0?t:e,x=T===!0?1:-1;for(let H=1;H<=s;H++)d.push(0,m*x,0),l.push(0,x,0),f.push(.5,.5),g++;let y=g;for(let H=0;H<=s;H++){let G=H/s*c+a,K=Math.cos(G),V=Math.sin(G);C.x=J*V,C.y=m*x,C.z=J*K,d.push(C.x,C.y,C.z),l.push(0,x,0),R.x=K*.5+.5,R.y=V*.5*x+.5,f.push(R.x,R.y),g++}for(let H=0;H<s;H++){let B=I+H,G=y+H;T===!0?u.push(G,G+1,B):u.push(G+1,G,B),N+=3}h.addGroup(p,N,T===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var vr=class i extends we{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),h=0,u=[],d=new L,l=new L,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){let E=[],S=p/n,T=0;p===0&&o===0?T=.5/e:p===n&&c===Math.PI&&(T=-.5/e);for(let I=0;I<=e;I++){let R=I/e;d.x=-t*Math.cos(s+R*r)*Math.sin(o+S*a),d.y=t*Math.cos(o+S*a),d.z=t*Math.sin(s+R*r)*Math.sin(o+S*a),g.push(d.x,d.y,d.z),l.copy(d).normalize(),_.push(l.x,l.y,l.z),m.push(R+T,1-S),E.push(h++)}u.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){let S=u[p][E+1],T=u[p][E],I=u[p+1][E],R=u[p+1][E+1];(p!==0||o>0)&&f.push(S,T,R),(p!==n-1||c<Math.PI)&&f.push(T,I,R)}this.setIndex(f),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(_,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var yr=class i extends we{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],c=[],h=[],u=new L,d=new L,l=new L;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){let _=g/s*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(_),d.y=(t+e*Math.cos(m))*Math.sin(_),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),l.subVectors(d,u).normalize(),c.push(l.x,l.y,l.z),h.push(g/s),h.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){let _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;o.push(_,m,E),o.push(m,p,E)}this.setIndex(o),this.setAttribute("position",new pe(a,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var ci=class extends Vn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uc,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new je,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Ys(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function em(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Xi=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ca=class extends Xi{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sl,endingEnd:Sl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case bl:r=t,a=2*e-n;break;case wl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case bl:o=t,c=2*n-e;break;case wl:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let h=(n-e)*.5,u=this.valueSize;this._weightPrev=h/(e-a),this._weightNext=h/(c-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,u=this._offsetPrev,d=this._offsetNext,l=this._weightPrev,f=this._weightNext,g=(n-e)/(s-e),_=g*g,m=_*g,p=-l*m+2*l*_-l*g,E=(1+l)*m+(-1.5-2*l)*_+(-.5+l)*g+1,S=(-1-f)*m+(1.5+f)*_+.5*g,T=f*m-f*_;for(let I=0;I!==a;++I)r[I]=p*o[u+I]+E*o[h+I]+S*o[c+I]+T*o[d+I];return r}},Pa=class extends Xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,h=c-a,u=(n-e)/(s-e),d=1-u;for(let l=0;l!==a;++l)r[l]=o[h+l]*d+o[c+l]*u;return r}},Ia=class extends Xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},un=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ys(e,this.TimeBufferType),this.values=Ys(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ys(t.times,Array),values:Ys(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Ia(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Pa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ca(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case tr:e=this.InterpolantFactoryMethodDiscrete;break;case ha:e=this.InterpolantFactoryMethodLinear;break;case Yr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tr;case this.InterpolantFactoryMethodLinear:return ha;case this.InterpolantFactoryMethodSmooth:return Yr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&em(s))for(let a=0,c=s.length;a!==c;++a){let h=s[a];if(isNaN(h)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,h),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Yr,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,h=t[a],u=t[a+1];if(h!==u&&(a!==1||h!==t[0]))if(s)c=!0;else{let d=a*n,l=d-n,f=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[l+g]||_!==e[f+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let d=a*n,l=o*n;for(let f=0;f!==n;++f)e[l+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,h=0;h!==n;++h)e[c+h]=e[a+h];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};un.prototype.TimeBufferType=Float32Array;un.prototype.ValueBufferType=Float32Array;un.prototype.DefaultInterpolation=ha;var hi=class extends un{constructor(t,e,n){super(t,e,n)}};hi.prototype.ValueTypeName="bool";hi.prototype.ValueBufferType=Array;hi.prototype.DefaultInterpolation=tr;hi.prototype.InterpolantFactoryMethodLinear=void 0;hi.prototype.InterpolantFactoryMethodSmooth=void 0;var La=class extends un{};La.prototype.ValueTypeName="color";var Ua=class extends un{};Ua.prototype.ValueTypeName="number";var Da=class extends Xi{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),h=t*a;for(let u=h+a;h!==u;h+=4)cn.slerpFlat(r,0,o,h-a,o,h,c);return r}},Mr=class extends un{InterpolantFactoryMethodLinear(t){return new Da(this.times,this.values,this.getValueSize(),t)}};Mr.prototype.ValueTypeName="quaternion";Mr.prototype.InterpolantFactoryMethodSmooth=void 0;var ui=class extends un{constructor(t,e,n){super(t,e,n)}};ui.prototype.ValueTypeName="string";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=tr;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Na=class extends un{};Na.prototype.ValueTypeName="vector";var Fa=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,h=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return h.push(u,d),this},this.removeHandler=function(u){let d=h.indexOf(u);return d!==-1&&h.splice(d,2),this},this.getHandler=function(u){for(let d=0,l=h.length;d<l;d+=2){let f=h[d],g=h[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},nm=new Fa,Oa=class{constructor(t){this.manager=t!==void 0?t:nm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Oa.DEFAULT_MATERIAL_NAME="__DEFAULT";var ps=class extends Re{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Sr=class extends ps{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},wo=new ne,gc=new L,_c=new L,br=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new us,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new Kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;gc.setFromMatrixPosition(t.matrixWorld),e.position.copy(gc),_c.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(_c),e.updateMatrixWorld(),wo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var xc=new ne,rs=new L,Eo=new L,Ba=class extends br{constructor(){super(new De(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Xt(4,2),this._viewportCount=6,this._viewports=[new Kt(2,1,1,1),new Kt(0,1,1,1),new Kt(3,1,1,1),new Kt(1,1,1,1),new Kt(3,0,1,1),new Kt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),rs.setFromMatrixPosition(t.matrixWorld),n.position.copy(rs),Eo.copy(n.position),Eo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Eo),n.updateMatrixWorld(),s.makeTranslation(-rs.x,-rs.y,-rs.z),xc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xc)}},fi=class extends ps{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ba}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},za=class extends br{constructor(){super(new pr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},wr=class extends ps{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Re.DEFAULT_UP),this.updateMatrix(),this.target=new Re,this.shadow=new za}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Er=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=vc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=vc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function vc(){return performance.now()}var Qa="\\[\\]\\.:\\/",im=new RegExp("["+Qa+"]","g"),ja="[^"+Qa+"]",sm="[^"+Qa.replace("\\.","")+"]",rm=/((?:WC+[\/:])*)/.source.replace("WC",ja),om=/(WCOD+)?/.source.replace("WCOD",sm),am=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ja),lm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ja),cm=new RegExp("^"+rm+om+am+lm+"$"),hm=["material","materials","bones","map"],ka=class{constructor(t,e,n){let s=n||me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},me=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(im,"")}static parseTrackName(t){let e=cm.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);hm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let h=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===h){h=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(h!==void 0){if(t[h]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[h]}}let o=t[s];if(o===void 0){let h=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+h+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};me.Composite=ka;me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};me.prototype.GetterByBindingType=[me.prototype._getValue_direct,me.prototype._getValue_array,me.prototype._getValue_arrayElement,me.prototype._getValue_toArray];me.prototype.SetterByBindingTypeAndVersioning=[[me.prototype._setValue_direct,me.prototype._setValue_direct_setNeedsUpdate,me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[me.prototype._setValue_array,me.prototype._setValue_array_setNeedsUpdate,me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[me.prototype._setValue_arrayElement,me.prototype._setValue_arrayElement_setNeedsUpdate,me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[me.prototype._setValue_fromArray,me.prototype._setValue_fromArray_setNeedsUpdate,me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Pm=new Float32Array(1);typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ha);var Pr=class extends Gi{constructor(){super();let t=new hn;t.deleteAttribute("uv");let e=new ci({side:Ne}),n=new ci,s=new fi(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new le(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new le(t,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);let a=new le(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);let c=new le(t,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);let h=new le(t,n);h.position.set(-2.017,.018,6.124),h.rotation.set(0,.333,0),h.scale.set(2.002,4.566,2.064),this.add(h);let u=new le(t,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);let d=new le(t,n);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);let l=new le(t,Yi(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let f=new le(t,Yi(50));f.position.set(-16.109,18.021,-8.207),f.scale.set(.1,2.425,2.751),this.add(f);let g=new le(t,Yi(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);let _=new le(t,Yi(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);let m=new le(t,Yi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);let p=new le(t,Yi(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Yi(i){let t=new pn;return t.color.setScalar(i),t}var tl=1234567;function te(){return tl=tl*16807%2147483647,(tl-1)/2147483646}var lt=(i,t)=>i+(t-i)*te(),el=new Uint8Array(512);(function(){let i=[...Array(256).keys()],t=99991,e=()=>(t=t*16807%2147483647,t/2147483647);for(let n=255;n>0;n--){let s=Math.floor(e()*(n+1));[i[n],i[s]]=[i[s],i[n]]}for(let n=0;n<512;n++)el[n]=i[n&255]})();var _s=(i,t)=>el[el[i&255]+(t&255)]/255,Wn=(i,t)=>(i%t+t)%t;function di(i,t,e=256,n=256){let s=Math.floor(i),r=Math.floor(t),o=i-s,a=t-r,c=o*o*(3-2*o),h=a*a*(3-2*a),u=Wn(s,e),d=Wn(s+1,e),l=Wn(r,n),f=Wn(r+1,n),g=_s(u,l),_=_s(d,l),m=_s(u,f),p=_s(d,f);return g+(_-g)*c+(m-g)*h+(g-_-m+p)*c*h}function Ye(i,t,e,n,s=4){let r=0,o=.5,a=1,c=0;for(let h=0;h<s;h++)r+=o*di(i*a,t*a,e*a,n*a),c+=o,o*=.5,a*=2;return r/c}var An=(i,t,e)=>{let n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function $i(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,e}function Rn(i,t,e){let n=$i(i,t),s=n.getContext("2d"),r=s.createImageData(i,t),o=r.data,a=new Float32Array(i*t),c=[0,0,0,1,0];for(let h=0;h<t;h++)for(let u=0;u<i;u++){c[3]=1,e(u/i,h/t,c,u,h);let d=(h*i+u)*4;o[d]=c[0]*255,o[d+1]=c[1]*255,o[d+2]=c[2]*255,o[d+3]=c[3]*255,a[h*i+u]=c[4]}return s.putImageData(r,0,0),{c:n,ctx:s,H:a,w:i,h:t}}function Xn(i,t,e,n){let s=$i(t,e),r=s.getContext("2d"),o=r.createImageData(t,e),a=o.data;for(let c=0;c<e;c++)for(let h=0;h<t;h++){let u=i[c*t+Wn(h-1,t)],d=i[c*t+Wn(h+1,t)],l=i[Wn(c-1,e)*t+h],f=i[Wn(c+1,e)*t+h],g=(u-d)*n,_=(f-l)*n,m=Math.hypot(g,_,1),p=(c*t+h)*4;a[p]=(g/m*.5+.5)*255,a[p+1]=(_/m*.5+.5)*255,a[p+2]=(1/m*.5+.5)*255,a[p+3]=255}return r.putImageData(o,0,0),He(s,!1)}function He(i,t=!0){let e=new Wi(i);return e.wrapS=e.wrapT=cs,t&&(e.colorSpace=Ue),e.anisotropy=8,e}function um(){let i=Rn(512,512,(t,e,n)=>{let s=Ye(t*4,e*8,4,8,3),r=e*22+s*4.5+Math.sin(t*6.283)*.3,o=r-Math.floor(r),a=An(.62,.95,o),c=di(t*3,e*220,3,220),h=Ye(t*2+9,e*2,2,2,2),u=.86-.2*a-.1*c+.1*(s-.5)-.06*An(.6,.8,h);n[0]=u,n[1]=u*.92,n[2]=u*.82,n[4]=1-a*.5-c*.5});return{map:He(i.c),normal:Xn(i.H,512,512,2.2)}}function fm(){let e=85.33333333333333,n=[];for(let r=0;r<12;r++){let o=te(),a=(o+lt(.35,.65))%1;n.push({j:[Math.min(o,a),Math.max(o,a)],t:[lt(.85,1.1),lt(.85,1.1),lt(.85,1.1)],h:[lt(-.04,.04),lt(-.04,.04),lt(-.04,.04)],off:lt(0,50)})}let s=Rn(1024,1024,(r,o,a,c,h)=>{let u=Math.floor(h/e),d=n[u],l=r<d.j[0]?0:r<d.j[1]?1:2,f=l===2?0:l,g=(h-u*e)/e,_=Ye(r*3+d.off,g*2+f*7,3,64,3),m=g*6+_*3,p=An(.6,.95,m-Math.floor(m)),E=di(r*2+d.off,h*.9,2,2048),S=Ye(r*2,o*2,2,2,3),T=(.78-.18*p-.08*E)*d.t[f]+.12*An(.55,.8,S),I=Math.min(g,1-g)*e,R=Math.min(Math.abs(r-d.j[0]),Math.abs(r-d.j[1]))*1024;I=Math.min(I,R);let C=An(0,2.5,I);T*=.45+.55*C;let N=Math.abs(g-.25)*e,J=Math.abs(g-.75)*e;Math.abs(R-9)<2.2&&(N<2.2||J<2.2)&&(T*=.35);let y=d.h[f];a[0]=T*(.78+y),a[1]=T*.56,a[2]=T*(.37-y*.5),a[4]=C*(1-p*.3-E*.3)});return{map:He(s.c),normal:Xn(s.H,1024,1024,3)}}function dm(){let i=Rn(512,512,(t,e,n)=>{let s=Ye(t*6,e*6,6,6,5),r=Ye(t*2+3,e*2,2,2,3),o=.9+.08*(s-.5)-.08*An(.55,.8,r);n[0]=o,n[1]=o*.97,n[2]=o*.91,n[4]=s});return{map:He(i.c),normal:Xn(i.H,512,512,4)}}function pm(){let i=Rn(256,256,(t,e,n,s,r)=>{let o=s>>3,a=r>>3,c=(o+a)%2===0,h=c?r%8/8:s%8/8,u=Math.sin(h*Math.PI),d=di(c?t*8:o,c?a:e*8,32,32),l=.7+.24*u+.08*(d-.5);n[0]=n[1]=n[2]=l,n[4]=u*.8+d*.2});return{map:He(i.c),normal:Xn(i.H,256,256,1.6)}}function mm(){let i=Rn(256,256,(t,e,n,s,r)=>{let o=s%16/16-.5,a=r%16/16-.5,c=0;for(let d of[-1,1]){let l=o-d*.22,f=a,g=Math.cos(d*.5),_=Math.sin(d*.5),m=l*g-f*_,p=l*_+f*g;c=Math.max(c,Math.sqrt(Math.max(0,1-(m/.22)**2-(p/.6)**2)))}let h=di(t*32,e*32,32,32),u=.5+.45*c+.06*(h-.5);n[0]=n[1]=n[2]=u,n[4]=c});return{map:He(i.c),normal:Xn(i.H,256,256,3)}}function gm(){let i=Rn(256,256,(t,e,n)=>{let s=Ye(t*8,e*8,8,8,4),r=1-Math.abs(2*Ye(t*5+7,e*5,5,5,3)-1),o=An(.85,.98,r),a=.82+.14*(s-.5)-.22*o;n[0]=a,n[1]=a*.96,n[2]=a*.92,n[4]=s*.6-o*.4});return{map:He(i.c),normal:Xn(i.H,256,256,3)}}var Ir=["#2f3f73","#a04a2a","#e6dcc6","#c89a3a","#5f6e3a","#6e2a33","#7c9cc0","#3d4f85","#b8653a","#d8c9a8"];function _m(){let n=$i(1024,1024),s=n.getContext("2d");for(let c=0;c<8;c++)for(let h=0;h<8;h++){let u=c*128,d=h*128,l=Ir[Math.floor(te()*Ir.length)],f=Ir[Math.floor(te()*Ir.length)];s.fillStyle=l,s.fillRect(u,d,128,128);let g=Math.floor(te()*5);if(s.fillStyle=f,s.strokeStyle=f,g===0)for(let _=0;_<128;_+=16)s.fillRect(u+_,d,6,128);else if(g===1)for(let _=0;_<128;_+=22)for(let m=0;m<128;m+=22)s.beginPath(),s.arc(u+_+11,d+m+11,3.5,0,6.3),s.fill();else if(g===2)s.beginPath(),s.moveTo(u+128/2,d+12),s.lineTo(u+128-12,d+128/2),s.lineTo(u+128/2,d+128-12),s.lineTo(u+12,d+128/2),s.closePath(),s.fill();else if(g===3)for(let _=0;_<128;_+=32)for(let m=0;m<128;m+=32)(_+m)/32%2===0&&s.fillRect(u+_,d+m,32,32);else s.beginPath(),s.moveTo(u,d+128),s.lineTo(u+128,d),s.lineTo(u+128,d+128),s.closePath(),s.fill()}s.strokeStyle="rgba(240,230,205,0.75)",s.lineWidth=2,s.setLineDash([7,6]);for(let c=0;c<8;c++)for(let h=0;h<8;h++)s.strokeRect(c*128+9,h*128+9,110,110);s.setLineDash([]),s.fillStyle="#c89a3a",s.fillRect(5*128+30,3*128+40,50,38),s.strokeStyle="rgba(40,30,30,0.8)",s.setLineDash([4,4]),s.strokeRect(5*128+30,3*128+40,50,38),s.setLineDash([]);let r=s.getImageData(0,0,1024,1024),o=r.data,a=new Float32Array(1024*1024);for(let c=0;c<1024;c++)for(let h=0;h<1024;h++){let u=(c*1024+h)*4,d=h%128/128,l=c%128/128,f=Math.pow(Math.sin(d*Math.PI)*Math.sin(l*Math.PI),.4),g=(h+c&3)<2?1:.9,_=(.82+.18*f)*g*(.95+.1*di(h*.05,c*.05,51,51));o[u]*=_,o[u+1]*=_,o[u+2]*=_,a[c*1024+h]=f*3+g*.3}return s.putImageData(r,0,0),{map:He(n),normal:Xn(a,1024,1024,1.5)}}function nl(i,t,e){return Rn(i,t,(n,s,r)=>{let o=Ye(n*6+e,s*6,6,6,4),a=Ye(n*3,s*3+e,3,3,3),c=Math.min(n,1-n,s,1-s),h=An(0,.12,c),u=(.86+.12*(o-.5))*(.75+.25*h)-.1*An(.6,.75,a);r[0]=u*.98,r[1]=u*.88,r[2]=u*.68,r[4]=o})}function Zi(i,t,e,n,s,r,o=1.4){i.strokeStyle=r,i.lineWidth=o,i.beginPath();let a=t;for(;a<t+n;){let c=lt(s*1.5,s*5);i.moveTo(a,e+lt(-1,1));for(let h=0;h<c;h+=s*.5)i.lineTo(a+h,e+Math.sin(h*1.7+te()*2)*s*.45-(te()<.15?s*.6:0));a+=c+s*lt(.8,1.6)}i.stroke()}function xm(i,t,e,n){i.fillStyle="rgba(232,218,185,0.9)",i.beginPath(),i.moveTo(t-n,e),i.lineTo(t-n*.1,e-n*1.4),i.lineTo(t+n,e),i.closePath(),i.fill(),i.strokeStyle="rgba(70,45,25,0.9)",i.lineWidth=1.6,i.stroke(),i.lineWidth=1;for(let s=1;s<5;s++)i.beginPath(),i.moveTo(t-n*.1+s*n*.18,e-n*1.4+s*n*.28),i.lineTo(t+s*n*.08,e),i.stroke()}function Xc(i,t,e,n){i.save(),i.translate(t,e),i.strokeStyle="rgba(70,45,25,0.85)",i.lineWidth=1.5,i.beginPath(),i.arc(0,0,n*.75,0,6.29),i.stroke(),i.beginPath(),i.arc(0,0,n*.68,0,6.29),i.stroke();for(let s=0;s<8;s++){let r=s*Math.PI/4,o=s%2?n*.6:n;i.fillStyle=s%2?"rgba(160,74,42,0.85)":"rgba(47,63,115,0.9)",i.beginPath(),i.moveTo(0,0),i.lineTo(Math.cos(r-.2)*o*.3,Math.sin(r-.2)*o*.3),i.lineTo(Math.cos(r)*o,Math.sin(r)*o),i.lineTo(Math.cos(r+.2)*o*.3,Math.sin(r+.2)*o*.3),i.closePath(),i.fill(),i.stroke()}i.restore()}function Gc(i,t,e,n,s,r){i.beginPath();for(let o=0;o<=90;o++){let a=o/90*Math.PI*2,c=1+.22*Math.sin(a*3+s)+.12*Math.sin(a*7+s*2)+.06*Math.sin(a*17+s),h=t+Math.cos(a)*n*c*r,u=e+Math.sin(a)*n*c*.8*r;o?i.lineTo(h,u):i.moveTo(h,u)}i.closePath()}function vm(){let t=nl(1024,716,3.3),e=t.ctx,n=t.h;e.strokeStyle="rgba(90,60,30,0.12)",e.lineWidth=1;for(let a=0;a<1024;a+=64)e.beginPath(),e.moveTo(a,0),e.lineTo(a,n),e.stroke();for(let a=0;a<n;a+=64)e.beginPath(),e.moveTo(0,a),e.lineTo(1024,a),e.stroke();for(let a=5;a>=0;a--)Gc(e,1024*.5,n*.52,.33+a*.012,1.7,1024),a===0?(e.fillStyle="rgba(150,150,95,0.22)",e.fill(),e.strokeStyle="rgba(60,40,20,0.9)",e.lineWidth=2.2):(e.strokeStyle=`rgba(60,80,110,${.25-a*.035})`,e.lineWidth=1),e.stroke();for(let a=0;a<46;a++){let c=a/45,h=1024*(.26+.48*c)+lt(-18,18),u=n*(.32+.38*c+.08*Math.sin(c*5))+lt(-16,16);xm(e,h,u,lt(9,16))}e.strokeStyle="rgba(55,80,120,0.8)",e.lineWidth=1.8;for(let a=0;a<4;a++){let c=1024*lt(.35,.65),h=n*lt(.4,.6);e.beginPath(),e.moveTo(c,h);for(let u=0;u<22;u++)c+=lt(-6,14)*(a%2?-1:1),h+=lt(4,12)*(a<2?1:-1),e.lineTo(c,h);e.stroke()}Gc(e,1024*.62,n*.66,.03,4,1024),e.fillStyle="rgba(70,95,130,0.45)",e.fill(),e.stroke();for(let a=0;a<6;a++){let c=1024*lt(.25,.75),h=n*lt(.3,.8);for(let u=0;u<14;u++){let d=c+lt(-35,35),l=h+lt(-20,20);e.fillStyle="rgba(80,95,55,0.7)",e.beginPath(),e.arc(d,l,4.5,0,6.3),e.fill(),e.strokeStyle="rgba(60,40,20,0.8)",e.lineWidth=1,e.beginPath(),e.moveTo(d,l+4),e.lineTo(d,l+8),e.stroke()}}let s=[[.18,.75],[.3,.62],[.41,.5],[.5,.47],[.58,.38],[.7,.33],[.83,.22]];e.setLineDash([10,7]),e.strokeStyle="rgba(165,40,30,0.9)",e.lineWidth=3,e.beginPath(),s.forEach((a,c)=>c?e.lineTo(a[0]*1024,a[1]*n):e.moveTo(a[0]*1024,a[1]*n)),e.stroke(),e.setLineDash([]),e.strokeStyle="rgba(70,70,70,0.6)",e.lineWidth=1.5,e.beginPath(),e.moveTo(.41*1024,.5*n),e.quadraticCurveTo(.47*1024,.65*n,.62*1024,.6*n),e.lineTo(.7*1024,.33*n),e.stroke(),e.strokeStyle="rgba(165,40,30,0.9)",e.lineWidth=3;let r=.54*1024,o=.63*n;e.beginPath(),e.moveTo(r-12,o-12),e.lineTo(r+12,o+12),e.moveTo(r+12,o-12),e.lineTo(r-12,o+12),e.stroke();for(let a of s)e.fillStyle="rgba(165,40,30,0.95)",e.beginPath(),e.arc(a[0]*1024,a[1]*n,6,0,6.3),e.fill(),e.strokeStyle="rgba(40,25,10,0.9)",e.lineWidth=1.2,e.stroke();for(let a=0;a<30;a++)Zi(e,1024*lt(.05,.85),n*lt(.08,.95),lt(30,90),3.2,"rgba(50,32,18,0.75)",1.1);for(let a=0;a<9;a++)Zi(e,1024*.8,n*(.55+a*.045),1024*.16,3,"rgba(70,70,75,0.55)",1);return Xc(e,1024*.12,n*.17,70),e.strokeStyle="rgba(120,70,30,0.18)",e.lineWidth=7,e.beginPath(),e.arc(1024*.86,n*.82,44,.3,5.9),e.stroke(),e.lineWidth=2,e.beginPath(),e.arc(1024*.86,n*.82,50,0,6.3),e.stroke(),e.strokeStyle="rgba(60,40,20,0.85)",e.lineWidth=3,e.strokeRect(22,22,980,n-44),e.lineWidth=1,e.strokeRect(30,30,964,n-60),He(t.c)}function ym(){let t=nl(512,512,8.1),e=t.ctx,n="rgba(45,30,20,0.85)";for(let s=0;s<4;s++){let r=s%2*256,o=(s>>1)*256;if(e.strokeStyle="rgba(100,70,40,0.35)",e.lineWidth=2,e.strokeRect(r+3,o+3,250,250),s===0)for(let a=0;a<13;a++)Zi(e,r+20,o+28+a*17,lt(150,215),3,n);if(s===1){e.strokeStyle=n,e.lineWidth=2,e.beginPath(),e.moveTo(r+20,o+170);for(let a=0;a<215;a+=12)e.lineTo(r+20+a,o+170-Math.abs(Math.sin(a*.05))*90-lt(0,15));e.stroke(),e.setLineDash([6,5]),e.strokeStyle="rgba(165,40,30,0.9)",e.beginPath(),e.moveTo(r+30,o+175),e.bezierCurveTo(r+90,o+120,r+130,o+140,r+210,o+90),e.stroke(),e.setLineDash([]);for(let a=0;a<3;a++)Zi(e,r+20,o+200+a*16,180,3,n)}if(s===2)for(let a=0;a<9;a++)e.strokeStyle=n,e.lineWidth=1.5,e.strokeRect(r+22,o+26+a*24,12,12),a%3!==2&&(e.beginPath(),e.moveTo(r+23,o+32+a*24),e.lineTo(r+28,o+37+a*24),e.lineTo(r+38,o+22+a*24),e.stroke()),Zi(e,r+46,o+33+a*24,lt(90,180),3,n);if(s===3){e.strokeStyle=n,e.lineWidth=1.2;for(let a=0;a<8;a++)e.beginPath(),e.moveTo(r+18,o+30+a*26),e.lineTo(r+238,o+30+a*26),e.stroke();for(let a=0;a<4;a++)e.beginPath(),e.moveTo(r+18+a*73,o+30),e.lineTo(r+18+a*73,o+212),e.stroke();for(let a=0;a<7;a++)for(let c=0;c<3;c++)Zi(e,r+24+c*73,o+46+a*26,lt(25,55),2.6,n,1.1);Xc(e,r+210,o+232,18)}}return He(t.c)}function Mm(){let e=$i(512,384),n=e.getContext("2d");n.fillStyle="#26325c",n.fillRect(0,0,512,384),n.fillStyle="#c89a3a",n.fillRect(0,0,512,26),n.fillRect(0,358,512,26),n.fillRect(0,0,22,384),n.fillRect(490,0,22,384),n.fillStyle="#a04a2a";for(let c=0;c<512;c+=20)n.beginPath(),n.moveTo(c,6),n.lineTo(c+10,20),n.lineTo(c+20,6),n.fill(),n.beginPath(),n.moveTo(c,378),n.lineTo(c+10,364),n.lineTo(c+20,378),n.fill();n.fillStyle="#e7c46a",n.beginPath(),n.arc(390,92,30,0,6.3),n.fill(),n.strokeStyle="#e7c46a",n.lineWidth=4;for(let c=0;c<12;c++){let h=c*.5236;n.beginPath(),n.moveTo(390+Math.cos(h)*38,92+Math.sin(h)*38),n.lineTo(390+Math.cos(h)*50,92+Math.sin(h)*50),n.stroke()}let s=[["#3f5a8a",250,70],["#e6dcc6",285,95],["#7c9cc0",320,60]];for(let[c,h,u]of s){n.fillStyle=c,n.beginPath(),n.moveTo(22,358);for(let d=22;d<=490;d+=34)n.lineTo(d,h-u*(.4+.6*Math.abs(Math.sin(d*.021+h))));n.lineTo(490,358),n.closePath(),n.fill()}n.strokeStyle="#a04a2a",n.lineWidth=6,n.setLineDash([12,8]),n.beginPath(),n.moveTo(40,340),n.lineTo(130,260),n.lineTo(200,300),n.lineTo(290,200),n.lineTo(350,240),n.lineTo(470,150),n.stroke(),n.setLineDash([]),n.save(),n.translate(100,110),n.rotate(-.6),n.fillStyle="#e6dcc6",n.beginPath(),n.ellipse(0,0,14,55,0,0,6.3),n.fill(),n.strokeStyle="#26325c",n.lineWidth=2,n.beginPath(),n.moveTo(0,-55),n.lineTo(0,70),n.stroke();for(let c=-45;c<50;c+=9)n.beginPath(),n.moveTo(0,c),n.lineTo(-12,c-8),n.moveTo(0,c),n.lineTo(12,c-8),n.stroke();n.restore();let r=n.getImageData(0,0,512,384),o=r.data,a=new Float32Array(512*384);for(let c=0;c<384;c++)for(let h=0;h<512;h++){let u=(c*512+h)*4,d=Math.sin(c%4/4*Math.PI)*.7+Math.sin(h%3/3*Math.PI)*.3,l=.78+.22*d+.06*(di(h*.1,c*.1,51,38)-.5);o[u]*=l,o[u+1]*=l,o[u+2]*=l,a[c*512+h]=d}return n.putImageData(r,0,0),{map:He(e),normal:Xn(a,512,384,1.2)}}function Sm(){let i=[[160,74,42],[47,63,115],[230,220,198],[200,154,58],[42,34,32]],t=Rn(512,256,(e,n,s,r,o)=>{let a=1,c;if(e<.045||e>.955){let d=o%6<3.4,l=.03+.012*_s(o,3),f=e<.5?e:1-e;a=d&&f>.045-l?1:0,c=i[2]}else{let d=(e-.045)/.91,l=Math.min(n,1-n),f=Math.min(d,1-d);if(l<.08||f<.05)c=i[4];else if(l<.12||f<.08)c=((r>>3)+(o>>3))%2?i[3]:i[0];else{let g=d*6%1-.5,_=n-.5,m=Math.abs(g)*1.2+Math.abs(_)*1.6;c=m<.18?i[2]:m<.3?i[1]:m<.36?i[3]:i[0],Math.abs(_)<.02&&(c=i[4])}}let h=(r+o)%4<2?1:.88,u=.9+.15*Ye(e*8,n*4,8,4,3);s[0]=c[0]/255*h*u,s[1]=c[1]/255*h*u,s[2]=c[2]/255*h*u,s[3]=a,s[4]=h});return He(t.c)}function bm(){let e=$i(1024,512),n=e.getContext("2d"),s=n.createLinearGradient(0,0,0,512);s.addColorStop(0,"#6f97c8"),s.addColorStop(.45,"#b9cde0"),s.addColorStop(.68,"#f4d6a6"),s.addColorStop(1,"#f7c88a"),n.fillStyle=s,n.fillRect(0,0,1024,512);let r=n.createRadialGradient(1024*.78,512*.42,5,1024*.78,512*.42,260);r.addColorStop(0,"rgba(255,248,225,1)"),r.addColorStop(.1,"rgba(255,235,190,0.8)"),r.addColorStop(1,"rgba(255,220,170,0)"),n.fillStyle=r,n.fillRect(0,0,1024,512),[["#9fb0c8",.55,90,.004],["#7f92ad",.64,70,.007],["#5a6b83",.74,55,.012],["#3d4a3c",.86,30,.03]].forEach(([c,h,u,d],l)=>{n.fillStyle=c,n.beginPath(),n.moveTo(0,512);for(let f=0;f<=1024;f+=4){let g=Ye(f*d,l*3.1,1024,64,4);n.lineTo(f,512*h-u*(g*2.2-.4)-(l===0?40*Math.max(0,Math.sin(f/1024*9)):0))}if(n.lineTo(1024,512),n.closePath(),n.fill(),l<2){n.fillStyle="rgba(245,240,235,0.55)";for(let f=0;f<=1024;f+=4){let g=Ye(f*d,l*3.1,1024,64,4),_=512*h-u*(g*2.2-.4)-(l===0?40*Math.max(0,Math.sin(f/1024*9)):0);_<512*h-u*.5&&n.fillRect(f,_,4,(512*h-u*.5-_)*.6)}}});let a=new Wi(e);return a.colorSpace=Ue,a}function wm(){let e=Rn(64,256,(n,s,r,o,a)=>{let c=1-s,h=c<.18?.04:.42*Math.sin(Math.min(1,(c-.12)/.88)*Math.PI)**.6,u=Math.abs(n-.5),d=u<h,l=u<.03,f=.75+.25*Math.sin((a+u*70)*.9),g=.75+.25*Math.sin(c*22),_=Math.sin(c*9+1.3)>.93&&u>.1;r[3]=d&&!_||l?1:0;let m=l?.95:f*g*(.6+.4*u/.42);r[0]=r[1]=r[2]=m});return He(e.c)}function Wc(i,t){let e=$i(64,64),n=e.getContext("2d"),s=n.createRadialGradient(32,32,0,32,32,32);s.addColorStop(0,i),s.addColorStop(1,t),n.fillStyle=s,n.fillRect(0,0,64,64);let r=new Wi(e);return r.colorSpace=Ue,r}function qc(){let i=um(),t=fm(),e=dm(),n=pm(),s=mm(),r=gm(),o=_m(),a=Mm();return{wood:i.map,woodN:i.normal,floor:t.map,floorN:t.normal,plaster:e.map,plasterN:e.normal,weave:n.map,weaveN:n.normal,knit:s.map,knitN:s.normal,leather:r.map,leatherN:r.normal,quilt:o.map,quiltN:o.normal,tap:a.map,tapN:a.normal,parch:He(nl(256,256,1.1).c),map:vm(),notes:ym(),rug:Sm(),sky:bm(),feather:wm(),blob:Wc("rgba(0,0,0,1)","rgba(0,0,0,0)"),mote:Wc("rgba(255,240,210,1)","rgba(255,240,210,0)")}}function Zc(i,t=!1){let e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new we,h=0;for(let u=0;u<i.length;++u){let d=i[u],l=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),l++}if(l!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(h,f,u),h+=f}}if(e){let u=0,d=[];for(let l=0;l<i.length;++l){let f=i[l].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+u);u+=i[l].attributes.position.count}c.setIndex(d)}for(let u in r){let d=Yc(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,d)}for(let u in o){let d=o[u][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let l=0;l<d;++l){let f=[];for(let _=0;_<o[u].length;++_)f.push(o[u][_][l]);let g=Yc(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Yc(i){let t,e,n,s=-1,r=0;for(let h=0;h<i.length;++h){let u=i[h];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}let o=new t(r),a=new de(o,e,n),c=0;for(let h=0;h<i.length;++h){let u=i[h];if(u.isInterleavedBufferAttribute){let d=c/e;for(let l=0,f=u.count;l<f;l++)for(let g=0;g<e;g++){let _=u.getComponent(l,g);a.setComponent(l+d,g,_)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}var xs=new L;function en(i,t,e,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;xs.copy(t),xs[n]=0,xs.normalize();let h=.5*o/(o+a),u=1-xs.angleTo(i)/c;return Math.sign(xs[e])===1?u*h:a/(o+a)+h+h*(1-u)}var Lr=class extends hn{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new L,c=new L,h=new L(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,l=this.attributes.uv.array,f=u.length/6,g=new L,_=.5/s;for(let m=0,p=0;m<u.length;m+=3,p+=2)switch(a.fromArray(u,m),c.copy(a),c.x-=Math.sign(c.x)*_,c.y-=Math.sign(c.y)*_,c.z-=Math.sign(c.z)*_,c.normalize(),u[m+0]=h.x*Math.sign(a.x)+c.x*r,u[m+1]=h.y*Math.sign(a.y)+c.y*r,u[m+2]=h.z*Math.sign(a.z)+c.z*r,d[m+0]=c.x,d[m+1]=c.y,d[m+2]=c.z,Math.floor(m/f)){case 0:g.set(1,0,0),l[p+0]=en(g,c,"z","y",r,n),l[p+1]=1-en(g,c,"y","z",r,e);break;case 1:g.set(-1,0,0),l[p+0]=1-en(g,c,"z","y",r,n),l[p+1]=1-en(g,c,"y","z",r,e);break;case 2:g.set(0,1,0),l[p+0]=1-en(g,c,"x","z",r,t),l[p+1]=en(g,c,"z","x",r,n);break;case 3:g.set(0,-1,0),l[p+0]=1-en(g,c,"x","z",r,t),l[p+1]=1-en(g,c,"z","x",r,n);break;case 4:g.set(0,0,1),l[p+0]=1-en(g,c,"x","y",r,t),l[p+1]=1-en(g,c,"y","x",r,e);break;case 5:g.set(0,0,-1),l[p+0]=en(g,c,"x","y",r,t),l[p+1]=1-en(g,c,"y","x",r,e);break}}};var Nr=(i,t)=>i>2.48?.34:i>2.06&&t>-1.52&&t<-.48?.17:0,vs=new Map,Ji=[new ne],$c=new cn,Jc=new je,Kc=new L,Ur=new L;function eh(i,t,e){return Jc.set(t?t[0]:0,t?t[1]:0,t?t[2]:0,"YXZ"),$c.setFromEuler(Jc),Kc.set(i?i[0]:0,i?i[1]:0,i?i[2]:0),typeof e=="number"?Ur.set(e,e,e):e?Ur.set(e[0],e[1],e[2]):Ur.set(1,1,1),new ne().compose(Kc,$c,Ur)}function zt(i,t,e){Ji.push(Ji[Ji.length-1].clone().multiply(eh(i,t,e)))}function kt(){Ji.pop()}var Qc={wood:1,leather:5,iron:3,brass:3,stone:3,ceramic:1,fabric:18,knit:11,cork:3},jc={floor:1/2.4,plaster:1/1.6},Em=new Set(["floor","glow","glass","sky","blob","rug"]),Dr=new Wt;function th(i,t,e){i.computeBoundingBox();let n=i.boundingBox,s=[n.max.x-n.min.x,n.max.y-n.min.y,n.max.z-n.min.z],r=i.attributes.position,o=i.attributes.normal,a=i.attributes.uv,c=e?0:te()*7,h=e?0:te()*7;for(let u=0;u<r.count;u++){let d=[Math.abs(o.getX(u)),Math.abs(o.getY(u)),Math.abs(o.getZ(u))],l=d[0]>d[1]?d[0]>d[2]?0:2:d[1]>d[2]?1:2,f,g;if(e)[f,g]=l===0?[2,1]:l===1?[0,2]:[0,1];else{let m=[0,1,2].filter(p=>p!==l);[f,g]=s[m[0]]>=s[m[1]]?m:[m[1],m[0]]}let _=[r.getX(u),r.getY(u),r.getZ(u)];a.setXY(u,_[f]*t+c,_[g]*t+h)}}function Tm(i,t,e){let n=i.attributes.uv;for(let s=0;s<n.count;s++)n.setXY(s,n.getX(s)*t,n.getY(s)*e);return i}function M(i,t,e,n,s,r,o={}){if(!t.index){let T=t.attributes.position.count,I=new Uint32Array(T);for(let R=0;R<T;R++)I[R]=R;t.setIndex(new de(I,1))}for(let T of Object.keys(t.attributes))["position","normal","uv"].includes(T)||t.deleteAttribute(T);t.attributes.uv||t.setAttribute("uv",new de(new Float32Array(t.attributes.position.count*2),2)),Qc[i]&&!o.keepUV&&th(t,Qc[i]*(o.uvs||1),!1),t.applyMatrix4(eh(n,s,r)),t.applyMatrix4(Ji[Ji.length-1]),jc[i]&&th(t,jc[i],!0);let a=t.attributes.position.count,c=new Float32Array(a*3),h=t.attributes.position;Dr.set(e??16777215);let u=o.jit??.05,d=1+(te()-.5)*u*2,l=1+(te()-.5)*u*2,f=Dr.r*d,g=Dr.g*d*l,_=Dr.b*d,m=!Em.has(i)&&!o.noAO;for(let T=0;T<a;T++){let I=1;if(m){let R=h.getY(T)-Nr(h.getX(T),h.getZ(T));I=.62+.38*Math.min(1,Math.max(0,R/.45))**.7}c[T*3]=f*I,c[T*3+1]=g*I,c[T*3+2]=_*I}t.setAttribute("color",new de(c,3)),t.computeBoundingBox();let p=(t.boundingBox.min.x+t.boundingBox.max.x)/2,E=i==="plaster"||i==="sky"?"all":p<-2.6?"w":p>2.6?"s":"b",S=i+"|"+E;return vs.has(S)||vs.set(S,[]),vs.get(S).push(t),t}function nh(i,t){let e=[],n=0;for(let[s,r]of vs){let o=s.split("|")[0],a=Zc(r,!1);if(!a){console.warn("merge failed",s);continue}a.computeBoundingSphere();let c=new le(a,i[o]),h=["glass","glow","sky","blob","rug","floor"].includes(o);c.castShadow=!h,c.receiveShadow=!["glow","sky","blob"].includes(o),c.matrixAutoUpdate=!1,o==="blob"&&(c.renderOrder=1),t.add(c),e.push(c),n+=a.index.count/3,r.forEach(u=>u.dispose())}return vs.clear(),{meshes:e,tris:n}}var rt=(i,t,e)=>new hn(i,t,e),ot=(i,t,e,n=.01,s=2)=>new Lr(i,t,e,s,Math.max(5e-4,Math.min(n,i/2-1e-4,t/2-1e-4,e/2-1e-4))),pt=(i,t,e,n=12,s=!1)=>new ds(i,t,e,n,1,s),he=(i,t=12,e=8)=>new vr(i,t,e),ie=(i,t,e=6,n=16,s=Math.PI*2)=>new yr(i,t,e,n,s),ve=(i,t=16)=>new xr(i.map(e=>new Xt(e[0],e[1])),t);function ge(i,t,e,n,s,r=6,o){let a=new L(...t),c=new L(...e),h=c.clone().sub(a),u=h.length(),d=pt(n,n,u,r),l=new cn().setFromUnitVectors(new L(0,1,0),h.normalize());d.applyQuaternion(l);let f=a.add(c).multiplyScalar(.5);return M(i,d,s,[f.x,f.y,f.z],null,null,o)}function fn(i){let t=i.rs||22,e=i.hs||14,n=new ds(1,1,1,t,e,!0),s=n.attributes.position,r=i.phase??te()*6;for(let o=0;o<s.count;o++){let a=s.getX(o),c=s.getY(o),h=s.getZ(o),u=.5-c,d=Math.atan2(h,a),l=i.sh??.07,f=u<l?(i.neck??.35)+(1-(i.neck??.35))*Math.sin(u/l*Math.PI/2):1,g=i.W*.5*f*(1+(i.flare||0)*u*u),_=i.D*.5*(1+.3*u)*(u<l?.5+.5*u/l:1),m=1+(i.amp??.12)*Math.pow(u,.7)*Math.sin(d*(i.folds||6)+r+u*1.7)+.04*Math.sin(d*3+u*6+r),p=-u*i.L;u>.97&&(p+=.012*Math.sin(d*(i.folds||6)+r)),s.setXYZ(o,Math.cos(d)*g*m,p,Math.sin(d)*_*m*(1+(i.zfold||0)*Math.pow(u,.8)*Math.cos(d*2+r)))}return n.computeVertexNormals(),Tm(n,(i.W+i.D)*2*(i.uvd||18),i.L*(i.uvd||18)),n}function ys(i,t,e,n,s,r,o={}){let a=o.r??.06,c=i/2,h=i+2*(s+a*.6),u=e-t+r+a*.6,d=new xe(h,u,o.sx||40,o.sz||36);d.rotateX(-Math.PI/2);let l=d.attributes.position,f=te()*6,g=_=>_<a*Math.PI/2?[a*Math.sin(_/a),a*(1-Math.cos(_/a))]:[a,a+_-a*Math.PI/2];for(let _=0;_<l.count;_++){let m=l.getX(_),p=l.getZ(_)+u/2+t,E=Math.max(0,Math.abs(m)-c),S=Math.max(0,p-e),T=m,I=n,R=p;if(E>0){let[J,x]=g(E);T=Math.sign(m)*(c+J),I-=x}if(S>0){let[J,x]=g(S);R=e+J,I-=x}let C=Math.max(E,S),N=(o.rip??.022)*(.5+.5*Math.sin((E>S?p:m)*(o.freq||16)+f+C*4))*Math.min(1,C/.15);if(E>S?T+=Math.sign(m)*N:S>0&&(R+=N),C<.01&&(I+=(o.lump??.012)*Math.sin(m*4+f)*Math.sin(p*3.1+f)),o.minY!==void 0&&I<o.minY){let J=o.minY-I;I=o.minY,E>S?T+=Math.sign(m)*J*.5:R+=J*.5}l.setXYZ(_,T,I,R)}return d.computeVertexNormals(),d}function Ki(i,t,e,n=.3){let s=he(.5,26,16),r=s.attributes.position;for(let o=0;o<r.count;o++){let a=r.getX(o)*2,c=r.getY(o)*2,h=r.getZ(o)*2;a=Math.sign(a)*Math.pow(Math.abs(a),.55),h=Math.sign(h)*Math.pow(Math.abs(h),.55);let u=Math.max(Math.abs(a),Math.abs(h));c*=1-.65*Math.pow(u,3),c>0&&(c-=n*Math.exp(-(a*a*3+h*h*4))*.5),r.setXYZ(o,a*i/2,c*t/2,h*e/2)}return s.computeVertexNormals(),s}function Fr(i,t,e=.02,n=12,s=10,r=[1,1,1,1]){let o=new xe(i,t,n,s);o.rotateX(-Math.PI/2);let a=o.attributes.position,c=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let h=0;h<a.count;h++){let u=a.getX(h),d=a.getZ(h),l=0;c.forEach(([f,g],_)=>{if(!r[_])return;let m=Math.hypot((u-f*i/2)/i,(d-g*t/2)/t);l+=e*Math.max(0,1-m/.32)**2}),l+=.002*Math.sin(u*9)*Math.sin(d*7),a.setY(h,l)}return o.computeVertexNormals(),o}function Qi(i,t,e,n,s=.12){let r=new xe(i*.22,i,1,6),o=r.attributes.position;for(let a=0;a<o.count;a++){let c=o.getY(a)/i+.5;o.setZ(a,s*i*c*c),o.setY(a,o.getY(a)+i/2)}return r.computeVertexNormals(),M("feather",r,t,e,n,null,{keepUV:!0,noAO:!0,jit:.1})}function Cn(i,t,e,n,s,r){zt(s,r),M("leather",rt(.004,t,e),n,[-i/2+.002,0,0]),M("leather",rt(.004,t,e),n,[i/2-.002,0,0]),M("leather",ot(i,t,.008,.003),n,[0,0,-e/2+.004],null,null,{jit:0}),M("paper",rt(i-.007,t-.008,e-.01),15655620,[0,0,.002],null,null,{jit:.03}),te()<.6&&(M("brass",rt(i+.002,.004,.004),13213778,[0,t*.3,-e/2-5e-4]),M("brass",rt(i+.002,.004,.004),13213778,[0,-t*.3,-e/2-5e-4])),kt()}function Ms(i,t,e=0,n=!0){zt(t,[0,e,0]),M("ceramic",ve([[0,0],[.036,0],[.04,.006],[.042,.092],[.038,.094],[.035,.01],[0,.012]],20),i),M("ceramic",ie(.026,.0065,6,12,Math.PI*1.15),i,[.042,.048,0],[0,0,-Math.PI*.575]),M("ceramic",rt(.012,.008,.006),14206630,[.01,.091,.04],[0,.3,0]),n&&M("ceramic",pt(.035,.035,.004,16),5910292,[0,.07,0],null,null,{noAO:!0}),kt()}function il(i,t=.08,e=!0){zt(i),M("brass",ve([[0,0],[.05,0],[.052,.008],[.012,.012],[.014,.03],[0,.03]],16),13213778),M("wax",pt(.012,.013,t,12),15787724,[0,.03+t/2,0]),M("wax",he(.006,6,4),15787724,[.012,.03+t*.7,0],null,[1,2.4,1]),M("iron",pt(.0012,.0012,.012,4),1118481,[0,.036+t,0]),e&&M("glow",he(.006,8,6),16760944,[0,.047+t,0],null,[1,2.2,1]),kt()}function Ze(i,t,e,n=0){zt(i,[0,t,n]),M("leather",ot(.1,.03,.29,.012),2759956,[0,.015,.03]),M("leather",ot(.095,.085,.26,.04,3),e,[0,.07,.035]);let s=pt(.058,.055,.3,14,!0),r=s.attributes.position;for(let o=0;o<r.count;o++){let a=r.getY(o);r.setX(o,r.getX(o)*(1+.06*Math.sin(a*30+r.getZ(o)*40)))}s.computeVertexNormals(),M("leather",s,e,[0,.25,-.04]),M("leather",pt(.064,.062,.05,14,!0),e,[0,.38,-.04],null,null,{jit:.1}),M("brass",ie(.008,.002,4,8),13213778,[.058,.32,-.04],[0,Math.PI/2,0]),kt()}function sl(i,t=1){zt(i,null,t);let e=.07;M("iron",pt(.085,.09,.02,8),3025446,[0,.01,0]);for(let n=0;n<4;n++){let s=n*Math.PI/2+Math.PI/4;M("iron",rt(.012,.2,.012),3025446,[Math.cos(s)*e,.12,Math.sin(s)*e])}M("glass",pt(.066,.066,.19,8,!0),16773848,[0,.12,0]),M("iron",pt(.02,.095,.07,8),3025446,[0,.255,0]),M("iron",ie(.03,.005,4,12),3025446,[0,.31,0]),M("wax",pt(.018,.018,.06,10),15787724,[0,.05,0]),M("glow",he(.012,8,6),16758880,[0,.1,0],null,[1,2,1]),kt()}var Or=class extends we{constructor(t=50,e=10,n=!0,s=!0,r=!0,o=!0,a=!0){let c=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,3,16,17,18,7,19,20,21,11,22,23,24,15,25,26,27,18,28,29,30,21,31,32,33,24,34,35,36,27,37,38,39,30,40,41,0,33,42,43,4,36,44,45,8,39,46,47,12,12,13,14,15,48,49,50,51,52,53,54,55,56,57,58,59,15,25,26,27,51,60,61,62,55,63,64,65,59,66,67,68,27,37,38,39,62,69,70,71,65,72,73,74,68,75,76,77,39,46,47,12,71,78,79,48,74,80,81,52,77,82,83,56,56,57,58,59,84,85,86,87,88,89,90,91,92,93,94,95,59,66,67,68,87,96,97,98,91,99,100,101,95,102,103,104,68,75,76,77,98,105,106,107,101,108,109,110,104,111,112,113,77,82,83,56,107,114,115,84,110,116,117,88,113,118,119,92,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,123,136,137,120,127,138,139,124,131,140,141,128,135,142,143,132,132,133,134,135,144,145,146,147,148,149,150,151,68,152,153,154,135,142,143,132,147,155,156,144,151,157,158,148,154,159,160,68,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,164,177,178,161,168,179,180,165,172,181,182,169,176,183,184,173,173,174,175,176,185,186,187,188,189,190,191,192,193,194,195,196,176,183,184,173,188,197,198,185,192,199,200,189,196,201,202,193,203,203,203,203,204,205,206,207,208,208,208,208,209,210,211,212,203,203,203,203,207,213,214,215,208,208,208,208,212,216,217,218,203,203,203,203,215,219,220,221,208,208,208,208,218,222,223,224,203,203,203,203,221,225,226,204,208,208,208,208,224,227,228,209,209,210,211,212,229,230,231,232,233,234,235,236,237,238,239,240,212,216,217,218,232,241,242,243,236,244,245,246,240,247,248,249,218,222,223,224,243,250,251,252,246,253,254,255,249,256,257,258,224,227,228,209,252,259,260,229,255,261,262,233,258,263,264,237,265,265,265,265,266,267,268,269,270,271,272,273,92,119,118,113,265,265,265,265,269,274,275,276,273,277,278,279,113,112,111,104,265,265,265,265,276,280,281,282,279,283,284,285,104,103,102,95,265,265,265,265,282,286,287,266,285,288,289,270,95,94,93,92],h=[1.4,0,2.4,1.4,-.784,2.4,.784,-1.4,2.4,0,-1.4,2.4,1.3375,0,2.53125,1.3375,-.749,2.53125,.749,-1.3375,2.53125,0,-1.3375,2.53125,1.4375,0,2.53125,1.4375,-.805,2.53125,.805,-1.4375,2.53125,0,-1.4375,2.53125,1.5,0,2.4,1.5,-.84,2.4,.84,-1.5,2.4,0,-1.5,2.4,-.784,-1.4,2.4,-1.4,-.784,2.4,-1.4,0,2.4,-.749,-1.3375,2.53125,-1.3375,-.749,2.53125,-1.3375,0,2.53125,-.805,-1.4375,2.53125,-1.4375,-.805,2.53125,-1.4375,0,2.53125,-.84,-1.5,2.4,-1.5,-.84,2.4,-1.5,0,2.4,-1.4,.784,2.4,-.784,1.4,2.4,0,1.4,2.4,-1.3375,.749,2.53125,-.749,1.3375,2.53125,0,1.3375,2.53125,-1.4375,.805,2.53125,-.805,1.4375,2.53125,0,1.4375,2.53125,-1.5,.84,2.4,-.84,1.5,2.4,0,1.5,2.4,.784,1.4,2.4,1.4,.784,2.4,.749,1.3375,2.53125,1.3375,.749,2.53125,.805,1.4375,2.53125,1.4375,.805,2.53125,.84,1.5,2.4,1.5,.84,2.4,1.75,0,1.875,1.75,-.98,1.875,.98,-1.75,1.875,0,-1.75,1.875,2,0,1.35,2,-1.12,1.35,1.12,-2,1.35,0,-2,1.35,2,0,.9,2,-1.12,.9,1.12,-2,.9,0,-2,.9,-.98,-1.75,1.875,-1.75,-.98,1.875,-1.75,0,1.875,-1.12,-2,1.35,-2,-1.12,1.35,-2,0,1.35,-1.12,-2,.9,-2,-1.12,.9,-2,0,.9,-1.75,.98,1.875,-.98,1.75,1.875,0,1.75,1.875,-2,1.12,1.35,-1.12,2,1.35,0,2,1.35,-2,1.12,.9,-1.12,2,.9,0,2,.9,.98,1.75,1.875,1.75,.98,1.875,1.12,2,1.35,2,1.12,1.35,1.12,2,.9,2,1.12,.9,2,0,.45,2,-1.12,.45,1.12,-2,.45,0,-2,.45,1.5,0,.225,1.5,-.84,.225,.84,-1.5,.225,0,-1.5,.225,1.5,0,.15,1.5,-.84,.15,.84,-1.5,.15,0,-1.5,.15,-1.12,-2,.45,-2,-1.12,.45,-2,0,.45,-.84,-1.5,.225,-1.5,-.84,.225,-1.5,0,.225,-.84,-1.5,.15,-1.5,-.84,.15,-1.5,0,.15,-2,1.12,.45,-1.12,2,.45,0,2,.45,-1.5,.84,.225,-.84,1.5,.225,0,1.5,.225,-1.5,.84,.15,-.84,1.5,.15,0,1.5,.15,1.12,2,.45,2,1.12,.45,.84,1.5,.225,1.5,.84,.225,.84,1.5,.15,1.5,.84,.15,-1.6,0,2.025,-1.6,-.3,2.025,-1.5,-.3,2.25,-1.5,0,2.25,-2.3,0,2.025,-2.3,-.3,2.025,-2.5,-.3,2.25,-2.5,0,2.25,-2.7,0,2.025,-2.7,-.3,2.025,-3,-.3,2.25,-3,0,2.25,-2.7,0,1.8,-2.7,-.3,1.8,-3,-.3,1.8,-3,0,1.8,-1.5,.3,2.25,-1.6,.3,2.025,-2.5,.3,2.25,-2.3,.3,2.025,-3,.3,2.25,-2.7,.3,2.025,-3,.3,1.8,-2.7,.3,1.8,-2.7,0,1.575,-2.7,-.3,1.575,-3,-.3,1.35,-3,0,1.35,-2.5,0,1.125,-2.5,-.3,1.125,-2.65,-.3,.9375,-2.65,0,.9375,-2,-.3,.9,-1.9,-.3,.6,-1.9,0,.6,-3,.3,1.35,-2.7,.3,1.575,-2.65,.3,.9375,-2.5,.3,1.125,-1.9,.3,.6,-2,.3,.9,1.7,0,1.425,1.7,-.66,1.425,1.7,-.66,.6,1.7,0,.6,2.6,0,1.425,2.6,-.66,1.425,3.1,-.66,.825,3.1,0,.825,2.3,0,2.1,2.3,-.25,2.1,2.4,-.25,2.025,2.4,0,2.025,2.7,0,2.4,2.7,-.25,2.4,3.3,-.25,2.4,3.3,0,2.4,1.7,.66,.6,1.7,.66,1.425,3.1,.66,.825,2.6,.66,1.425,2.4,.25,2.025,2.3,.25,2.1,3.3,.25,2.4,2.7,.25,2.4,2.8,0,2.475,2.8,-.25,2.475,3.525,-.25,2.49375,3.525,0,2.49375,2.9,0,2.475,2.9,-.15,2.475,3.45,-.15,2.5125,3.45,0,2.5125,2.8,0,2.4,2.8,-.15,2.4,3.2,-.15,2.4,3.2,0,2.4,3.525,.25,2.49375,2.8,.25,2.475,3.45,.15,2.5125,2.9,.15,2.475,3.2,.15,2.4,2.8,.15,2.4,0,0,3.15,.8,0,3.15,.8,-.45,3.15,.45,-.8,3.15,0,-.8,3.15,0,0,2.85,.2,0,2.7,.2,-.112,2.7,.112,-.2,2.7,0,-.2,2.7,-.45,-.8,3.15,-.8,-.45,3.15,-.8,0,3.15,-.112,-.2,2.7,-.2,-.112,2.7,-.2,0,2.7,-.8,.45,3.15,-.45,.8,3.15,0,.8,3.15,-.2,.112,2.7,-.112,.2,2.7,0,.2,2.7,.45,.8,3.15,.8,.45,3.15,.112,.2,2.7,.2,.112,2.7,.4,0,2.55,.4,-.224,2.55,.224,-.4,2.55,0,-.4,2.55,1.3,0,2.55,1.3,-.728,2.55,.728,-1.3,2.55,0,-1.3,2.55,1.3,0,2.4,1.3,-.728,2.4,.728,-1.3,2.4,0,-1.3,2.4,-.224,-.4,2.55,-.4,-.224,2.55,-.4,0,2.55,-.728,-1.3,2.55,-1.3,-.728,2.55,-1.3,0,2.55,-.728,-1.3,2.4,-1.3,-.728,2.4,-1.3,0,2.4,-.4,.224,2.55,-.224,.4,2.55,0,.4,2.55,-1.3,.728,2.55,-.728,1.3,2.55,0,1.3,2.55,-1.3,.728,2.4,-.728,1.3,2.4,0,1.3,2.4,.224,.4,2.55,.4,.224,2.55,.728,1.3,2.55,1.3,.728,2.55,.728,1.3,2.4,1.3,.728,2.4,0,0,0,1.425,0,0,1.425,.798,0,.798,1.425,0,0,1.425,0,1.5,0,.075,1.5,.84,.075,.84,1.5,.075,0,1.5,.075,-.798,1.425,0,-1.425,.798,0,-1.425,0,0,-.84,1.5,.075,-1.5,.84,.075,-1.5,0,.075,-1.425,-.798,0,-.798,-1.425,0,0,-1.425,0,-1.5,-.84,.075,-.84,-1.5,.075,0,-1.5,.075,.798,-1.425,0,1.425,-.798,0,.84,-1.5,.075,1.5,-.84,.075];super(),e=Math.max(2,Math.floor(e));let u=1.3,l=3.15*(a?1:u)/2,f=t/l,g=n?(8*e-4)*e:0;g+=s?(16*e-4)*e:0,g+=r?40*e*e:0;let _=new Uint32Array(g*3),m=n?4:0;m+=s?8:0,m+=r?20:0,m*=(e+1)*(e+1);let p=new Float32Array(m*3),E=new Float32Array(m*3),S=new Float32Array(m*2),T=new ne;T.set(-1,3,-3,1,3,-6,3,0,-3,3,0,0,1,0,0,0);let I=[],R=[],C=[],N=[],J=[],x=[],y=[],H=[],B=[],G=new L,K,V,et,W,ut=0,ft=0,dt=new L,qt=new ne,Yt=new ne,$=new Kt,tt=new Kt,_t=new Kt,X=new Kt,ct=new L,nt=new L,It=T.clone();It.transpose();let Ft=(A,v,O)=>!(p[A*3]===p[v*3]&&p[A*3+1]===p[v*3+1]&&p[A*3+2]===p[v*3+2]||p[A*3]===p[O*3]&&p[A*3+1]===p[O*3+1]&&p[A*3+2]===p[O*3+2]||p[v*3]===p[O*3]&&p[v*3+1]===p[O*3+1]&&p[v*3+2]===p[O*3+2]);for(let A=0;A<3;A++)x[A]=new ne;let Ut=r?0:20,P=n?32:28,Qt=e+1,wt=0,Lt=0,Rt=0,Zt=0,Pt=0;for(let A=Ut;A<P;A++)if(s||A<20||A>=28){for(let v=0;v<3;v++){for(let O=0;O<4;O++)for(let q=0;q<4;q++)I[q*4+O]=h[c[A*16+O*4+q]*3+v],o&&A>=20&&A<28&&v!==2&&(I[q*4+O]*=1.077),!a&&v===2&&(I[q*4+O]*=u);qt.set(I[0],I[1],I[2],I[3],I[4],I[5],I[6],I[7],I[8],I[9],I[10],I[11],I[12],I[13],I[14],I[15]),Yt.multiplyMatrices(qt,T),x[v].multiplyMatrices(It,Yt)}for(let v=0;v<=e;v++){let O=v/e;for(let q=0;q<=e;q++){let j=q/e;for(W=4,V=et=1;W--;)R[W]=V,C[W]=et,V*=O,et*=j,W===3?(N[W]=J[W]=0,ut=ft=1):(N[W]=ut*(3-W),J[W]=ft*(3-W),ut*=O,ft*=j);$.fromArray(R),tt.fromArray(C),_t.fromArray(N),X.fromArray(J);for(let Z=0;Z<3;Z++)K=$.clone(),K.applyMatrix4(x[Z]),y[Z]=K.dot(tt),K=_t.clone(),K.applyMatrix4(x[Z]),H[Z]=K.dot(tt),K=$.clone(),K.applyMatrix4(x[Z]),B[Z]=K.dot(X);ct.fromArray(H),nt.fromArray(B),G.crossVectors(nt,ct),G.normalize(),y[0]===0&&y[1]===0?dt.set(0,y[2]>l?1:-1,0):dt.set(G.x,G.z,-G.y),p[Lt++]=f*y[0],p[Lt++]=f*(y[2]-l),p[Lt++]=-f*y[1],E[Rt++]=dt.x,E[Rt++]=dt.y,E[Rt++]=dt.z,S[Zt++]=1-j,S[Zt++]=1-O}}for(let v=0;v<e;v++)for(let O=0;O<e;O++){let q=wt*Qt*Qt+v*Qt+O,j=q+1,Z=j+Qt,Et=q+Qt;Ft(q,j,Z)&&(_[Pt++]=q,_[Pt++]=j,_[Pt++]=Z),Ft(q,Z,Et)&&(_[Pt++]=q,_[Pt++]=Z,_[Pt++]=Et)}wt++}this.setIndex(new de(_,1)),this.setAttribute("position",new de(p,3)),this.setAttribute("normal",new de(E,3)),this.setAttribute("uv",new de(S,2)),this.computeBoundingSphere()}};var w={oak:11041356,walnut:7228467,pine:13213804,dark:5192234,honey:12553296,grey:9276036,indigo:3096435,rust:10504746,ochre:13146682,moss:6254138,cream:15129798,charcoal:3815998,wine:7219763,sky:8166592,linen:14866888,brown:6963752,tan:10119744,brass:13936214,copper:12614218,iron:3420462,plaster:15985630,hemp:11901546,paper:15787208},$e=2.8,kr=[],Ce=(i,t,e,n)=>kr.push({x0:i,x1:t,z0:e,z1:n}),ll=[];function ih(i,t,e,n,s,r,o){M("plaster",rt(t-i,r-s,n-e),o,[(i+t)/2,(s+r)/2,(e+n)/2],null,null,{jit:0,noAO:!0})}function qn(i,t,e,n,s,r=w.plaster){let o=t-i>n-e,a=o?i:e,c=o?t:n,h=(l,f,g,_)=>{f-l<.001||_-g<.001||(o?ih(l,f,e,n,g,_,r):ih(i,t,l,f,g,_,r))},u=(l,f)=>{f-l>.001&&(o?Ce(l,f,e,n):Ce(i,t,l,f))},d=a;for(let l of s.sort((f,g)=>f.a-g.a))h(d,l.a,0,$e),h(l.a,l.b,0,l.y0),h(l.a,l.b,l.y1,$e),u(d,l.a),l.y0>.3&&u(l.a,l.b),d=l.b;h(d,c,0,$e),u(d,c)}function Yn(i,t,e,n,s,r=0,o=.92){for(let d=t;d<e-.02;d+=.13){let l=Math.min(.126,e-d-.004),f=d+l/2,g=te()<.5?w.oak:10252101,_=i==="x"?[f,r+o/2,n+s*.009]:[n+s*.009,r+o/2,f];M("wood",i==="x"?rt(l,o,.018):rt(.018,o,l),g,_,null,null,{jit:.08})}let c=e-t,h=(t+e)/2,u=(d,l,f)=>M("wood",i==="x"?ot(c,l,f,.006):ot(f,l,c,.006),w.walnut,i==="x"?[h,d,n+s*f/2]:[n+s*f/2,d,h]);u(r+o+.025,.05,.045),u(r+.06,.12,.03)}function Br(i,t,e,n,s,r){for(let c of[t-.08/2,e+.08/2])M("wood",i==="x"?ot(.08,r+.08,.03,.008):ot(.03,r+.08,.08,.008),w.walnut,i==="x"?[c,(r+.08)/2,n+s*.03/2]:[n+s*.03/2,(r+.08)/2,c]);M("wood",i==="x"?ot(e-t+2*.08+.04,.08+.02,.03+.01,.008):ot(.03+.01,.08+.02,e-t+2*.08+.04,.008),w.walnut,i==="x"?[(t+e)/2,r+.08/2,n+s*.03/2]:[n+s*.03/2,r+.08/2,(t+e)/2])}function sh(i,t,e,n,s,r=14543088){let a=i+.11,c=(t+e)/2,h=(n+s)/2,u=e-t,d=s-n;M("wood",rt(.2,d,.05),w.walnut,[i+.2/2,h,t+.025]),M("wood",rt(.2,d,.05),w.walnut,[i+.2/2,h,e-.025]),M("wood",rt(.2,.05,u),w.walnut,[i+.2/2,s-.025,c]),M("wood",ot(.3,.045,u+.16,.01),w.oak,[i+.06,n-0,c]);let l=.045;for(let f of[t+.05+l/2,c,e-.05-l/2])M("wood",rt(.05,d-.1,l),w.dark,[a,h,f]);for(let f of[n+.02+l/2,n+d*.62,s-.05-l/2])M("wood",rt(.05,l,u-.1),w.dark,[a,f,c]);for(let f of[(t+c)/2,(c+e)/2])M("wood",rt(.03,d-.1,.02),w.dark,[a,h,f]);M("glass",rt(.006,d-.1,u-.1),r,[a+.01,h,c],null,null,{noAO:!0}),M("iron",rt(.02,.08,.012),w.iron,[a-.035,n+d*.4,c+.03]),ll.push({x:a+.03,z0:t+.06,z1:e-.06,y0:n+.05,y1:s-.05,L:i>4?2.6:4.2})}function rh(i,t,e,n,s){M("fabric",fn({W:.34,D:.06,L:e,flare:.25,folds:9,amp:.22,neck:.95,sh:.02,zfold:.4}),n,[i,2.32,t],[0,Math.PI/2,s?.03:-.03]);for(let r=0;r<6;r++)M("brass",ie(.022,.004,4,10),w.brass,[i,2.34,t-.15+r*.06],[0,0,0])}function oh(i,t,e){zt([i,0,t]);for(let n of[-1,1])for(let s of[-1,1])M("wood",rt(.045,.6,.045),w.walnut,[n*.2,.3,s*.165]);M("wood",ot(.5,.035,.42,.008),w.oak,[0,.6,0]),M("wood",rt(.38,.15,.3),w.walnut,[0,.49,-.01]),M("wood",ot(.34,.12,.022,.005),w.oak,[0,.49,.15]),M("brass",he(.014,10,8),w.brass,[0,.49,.17]),M("wood",rt(.4,.02,.33),w.oak,[0,.14,0]),M("blob",new xe(.75,.65).rotateX(-Math.PI/2),16777215,[0,.003,0]),kt(),Ce(i-.25,i+.25,t-.21,t+.21)}function rl(i,t=1){zt(i,null,t),M("brass",ve([[0,.09],[.012,.09],[.025,.07],[.03,.03],[.045,0],[.04,-.003],[.026,.03],[.02,.068],[0,.07]],18),w.brass,[0,-.09,0]),M("iron",he(.008,6,6),w.iron,[0,-.08,0]),M("leather",ie(.025,.005,4,10),w.brown,[0,.025,0]),kt()}function ah(i){zt(i);let t=0;for(let e=0;e<5;e++){let n=.045-e*.007;M("stone",he(n,10,7),[9210500,7302504,10525324,6052438,10129280][e],[lt(-.006,.006),t+n*.45,lt(-.006,.006)],[0,lt(0,3),lt(-.15,.15)],[1,.45,.85]),t+=n*.82}kt()}function lh(i,t){let e=i.attributes.uv;for(let n=0;n<e.count;n++)e.setXY(n,(t%2+e.getX(n))*.5,((t>>1?0:1)+e.getY(n))*.5);return i}function ol(i,t,e,n,s,r=.01){M("notes",lh(Fr(i,t,r,4,4),e),16777215,n,s,null,{keepUV:!0,noAO:!0})}function al(i,t,e,n,s=0){let r=lh(new xe(i,t),e);M("notes",r,16777215,n,[0,s,lt(-.08,.08)],null,{keepUV:!0,noAO:!0})}function Am(i,t,e,n,s,r,o){M(i,ot(t,n,e,n*.45,2),s,r,[0,o,0],null,{uvs:1})}function zr(i,t,e=.045){M("knit",he(e,14,10),i,t,[lt(0,3),lt(0,3),0],null,{uvs:.6})}function Rm(i,t=5,e=.13){for(let n=0;n<t;n++)M("knit",ie(e-n*.004,.012,6,30),w.hemp,[i[0]+lt(-.01,.01),i[1]+.012+n*.02,i[2]+lt(-.01,.01)],[Math.PI/2+lt(-.06,.06),0,lt(-.06,.06)],null,{uvs:.5})}function ch(){M("floor",rt(5,.1,4.6),16777215,[0,-.05,.1]),M("floor",rt(2.4,.1,3.2),15261912,[-3.7,-.05,-.6]),M("floor",rt(2.8,.44,2.6),16777215,[3.9,.12,-.9]);for(let[l,f,g,_]of[[-2.7,2.7,-2.4,2.6],[-5.1,-2.7,-2.4,1.2],[2.7,5.5,-2.4,.6]])M("plaster",rt(f-l,.2,_-g),16183526,[(l+f)/2,$e+.1,(g+_)/2],null,null,{noAO:!0});qn(-5.1,5.5,-2.4,-2.2,[]),qn(-2.7,2.7,2.4,2.6,[]),qn(-2.7,-2.5,-2.2,2.4,[{a:-.1,b:.9,y0:0,y1:2.15}]),qn(-5.1,-4.9,-2.2,1.2,[],14672866),qn(-4.9,-2.7,1,1.2,[],14672866),qn(2.5,2.7,-2.2,2.4,[{a:-1.5,b:-.5,y0:0,y1:2.25},{a:.8,b:1.9,y0:.8,y1:2.2}]),qn(5.3,5.5,-2.2,.6,[{a:-1.85,b:-.55,y0:1.29,y1:2.49}],15786694),qn(2.7,5.3,.4,.6,[],15786694),M("plaster",rt(.01,$e,3.2),14278624,[-4.895,$e/2,-.6],null,null,{noAO:!0}),M("plaster",rt(2.6,$e-.34,.01),15786694,[4,.34+($e-.34)/2,-2.195],null,null,{noAO:!0}),Yn("x",-2.5,2.5,-2.2,1),Yn("x",-2.5,.95,2.4,-1),Yn("x",1.95,2.5,2.4,-1),Yn("z",-2.2,-.18,-2.5,1),Yn("z",.98,2.4,-2.5,1),Yn("z",-2.2,-1.58,2.5,-1),Yn("z",-.42,.75,2.5,-1),Yn("z",1.95,2.4,2.5,-1);for(let l of[-1.3,.1,1.45]){M("wood",ot(5,.2,.16,.015),w.walnut,[0,$e-.1,l],null,null,{jit:.1});for(let f of[-2.42,2.42])M("wood",ot(.16,.12,.14,.01),w.dark,[f,$e-.26,l]);for(let f of[-1.2,0,1.2])M("wood",pt(.012,.012,.01,8),w.dark,[f,$e-.2,l],[Math.PI/2,0,0])}Br("z",-.1,.9,-2.5,1,2.15),Br("z",-.1,.9,-2.7,-1,2.15),Br("z",-1.5,-.5,2.5,-1,2.25),M("wood",rt(.2,.02,1),w.oak,[-2.6,.01,.4]),zt([1.45,0,2.4]);for(let l=0;l<6;l++)M("wood",rt(.148,2.06,.04),l%2?w.oak:10120258,[-.375+l*.15,1.03,-.02],null,null,{jit:.06});for(let l of[.35,1.72])M("wood",ot(.84,.13,.03,.008),w.walnut,[0,l,-.055]);M("wood",rt(.1,1.45,.028),w.walnut,[0,1.03,-.055],[0,0,-.52]);for(let l of[.35,1.72]){M("iron",rt(.6,.05,.008),w.iron,[.13,l,-.074]),M("iron",pt(.035,.035,.008,12),w.iron,[-.17,l,-.074],[Math.PI/2,0,0]);for(let f=0;f<4;f++)M("iron",he(.008,6,4),2236962,[-.1+f*.12,l,-.08])}M("iron",pt(.045,.045,.01,14),w.iron,[-.33,1.02,-.076],[Math.PI/2,0,0]),M("iron",ie(.04,.007,6,18),w.iron,[-.33,.97,-.088],[.25,0,0]),M("iron",rt(.14,.025,.02),w.iron,[-.3,1.2,-.08]),kt(),Br("x",1,1.9,2.4,-1,2.08),M("wood",ot(1.1,.13,.03,.01),w.walnut,[.32,1.66,2.385]);for(let l=0;l<4;l++)M("wood",pt(.016,.02,.1,10),w.oak,[-.1+l*.28,1.66,2.33],[Math.PI/2-.25,0,0]),M("wood",he(.022,10,8),w.oak,[-.1+l*.28,1.672,2.285]);M("fabric",fn({W:.5,D:.1,L:1.18,flare:.25,folds:8,amp:.16,neck:.25}),4872762,[-.1,1.66,2.29],[0,0,.02]),M("fabric",pt(.07,.11,.12,14,!0),4872762,[-.1,1.6,2.29],null,[1,1,.6]),zt([.24,1.62,2.2],[0,0,.05]),M("leather",ot(.3,.24,.08,.025),w.tan,[0,-.2,0]),M("leather",ot(.31,.15,.012,.004),8015404,[0,-.13,-.045]),M("brass",rt(.03,.035,.006),w.brass,[0,-.2,-.053]),M("leather",ie(.15,.008,4,20,Math.PI),w.brown,[0,-.08,0],[0,0,0]),kt(),M("knit",fn({W:.17,D:.035,L:.95,flare:.1,folds:3,amp:.1,neck:.8,uvd:11}),w.indigo,[.46,1.65,2.33]),M("knit",fn({W:.17,D:.035,L:.75,flare:.1,folds:3,amp:.1,neck:.8,uvd:11}),w.indigo,[.56,1.65,2.32]),rl([.74,1.6,2.32],1.2),M("fabric",ot(.85,.015,.4,.006),8018490,[.33,.008,2.15],null,null,{uvs:.3}),Ze([.12,.016,2.14],.1,5913122),Ze([.26,.016,2.16],-.05,5913122),Ze([.48,.016,2.12],.15,4861984,-0),Ze([.66,.06,2.1],1.3,4861984,1.35),ge("wood",[.9,0,2.32],[.86,1.62,2.36],.018,w.honey,8),M("leather",pt(.022,.022,.12,8),w.brown,[.865,1.3,2.355],[0,0,.02]),zt([0,0,0]);for(let l of[-.8,.8]){M("wood",ot(.09,1.18,.09,.01),w.walnut,[l,.59,-2.13]),M("wood",he(.055,12,8),w.walnut,[l,1.2,-2.13],null,[1,.8,1]),M("wood",ot(.09,.66,.09,.01),w.walnut,[l,.33,.12]),M("wood",he(.05,12,8),w.walnut,[l,.68,.12],null,[1,.8,1]),M("wood",rt(.05,.16,2.16),w.oak,[l*.97,.28,-1]);for(let f of[-1.7,-.3])M("wood",pt(.009,.009,.06,8),w.dark,[l*.97,.32,f],[0,0,Math.PI/2])}for(let l of[.62,1.08])M("wood",ot(1.55,.09,.06,.01),w.walnut,[0,l,-2.13]);M("wood",ot(1.6,.06,.08,.02),w.walnut,[0,1.14,-2.13]);for(let l=0;l<3;l++)M("wood",rt(.44,.37,.025),w.oak,[-.5+l*.5,.85,-2.13],null,null,{jit:.08}),l<2&&M("wood",rt(.06,.4,.05),w.walnut,[-.25+l*.5,.85,-2.13]);M("wood",pt(.07,.07,.012,16),w.honey,[0,.85,-2.112],[Math.PI/2,0,0]);for(let l=0;l<4;l++)M("wood",rt(.016,.11,.008),w.dark,[0,.85,-2.104],[0,0,l*Math.PI/4]);for(let l of[.62,1.08])for(let f of[-.76,.76])M("wood",pt(.008,.008,.012,8),w.dark,[f,l,-2.095],[Math.PI/2,0,0]);M("wood",ot(1.55,.08,.05,.01),w.walnut,[0,.62,.12]),M("wood",rt(1.52,.22,.022),w.oak,[0,.42,.12]);for(let l=0;l<7;l++)M("wood",rt(1.5,.02,.08),w.pine,[0,.355,-1.95+l*.32]);M("fabric",ot(1.48,.2,2.06,.07,3),14208180,[0,.46,-1.08],null,null,{uvs:1}),M("fabric",ys(1.5,-2.08,-1.35,.575,.08,0,{r:.05,sx:24,sz:10,rip:.01}),w.linen,[0,0,0],null,null,{keepUV:!1}),M("quilt",ys(1.48,-1.5,-.04,.6,.29,.1,{r:.078,minY:.3,sx:48,sz:40}),16777215,[0,0,0],null,null,{keepUV:!0}),M("quilt",pt(.035,.035,1.56,12),16777215,[0,.6,-1.5],[0,0,Math.PI/2],[.55,1,1]),M("fabric",ot(1.52,.022,.12,.01),w.linen,[0,.592,-1.58]),M("fabric",Ki(.64,.17,.42,.35),w.linen,[-.36,.66,-1.88],[.18,.05,0]),M("fabric",Ki(.64,.17,.42,.15),15327436,[.37,.665,-1.86],[.2,-.08,0]),M("knit",Ki(.4,.13,.32,.05),w.rust,[.12,.66,-1.58],[.5,.25,.1],null,{uvs:.7}),M("knit",ot(1.2,.045,.34,.02),w.indigo,[.03,.635,-.36],[0,.04,0]),M("knit",pt(.028,.028,1.2,12),w.indigo,[.03,.635,-.19],[0,.04,Math.PI/2],[.8,1,1]),zt([-.42,.615,-.95],[0,.6,0]),M("leather",ot(.15,.022,.21,.006),w.rust,[.075,.02,0],[0,0,.2]),M("leather",ot(.15,.022,.21,.006),w.rust,[-.075,.02,0],[0,0,-.2]),kt(),M("blob",new xe(2.1,2.7).rotateX(-Math.PI/2),16777215,[0,.002,-1]),kt(),Ce(-.86,.86,-2.2,.17);{let l=new xe(1.5,1.1,20,4),f=l.attributes.position;for(let g=0;g<f.count;g++)f.setZ(g,.012*Math.sin(f.getX(g)*9)*(.5-f.getY(g)/1.1));l.computeVertexNormals(),M("tapestry",l,16777215,[0,1.84,-2.17],null,null,{keepUV:!0,noAO:!0}),M("wood",pt(.018,.018,1.66,10),w.walnut,[0,2.41,-2.155],[0,0,Math.PI/2]);for(let g of[-.84,.84])M("brass",he(.028,10,8),w.brass,[g,2.41,-2.155]);ge("fabric",[-.7,2.42,-2.16],[0,2.6,-2.19],.004,w.ochre),ge("fabric",[.7,2.42,-2.16],[0,2.6,-2.19],.004,w.ochre);for(let g=0;g<15;g++)M("fabric",pt(.004,.003,.09,4),w.ochre,[-.7+g*.1,1.245,-2.165])}oh(1.3,-1.98),zt([1.3,.618,-1.98]),zt([.12,0,-.08]),M("brass",ve([[0,0],[.07,0],[.072,.01],[.05,.02],[.02,.04],[.05,.075],[.055,.1],[.03,.12],[.022,.13],[0,.13]],20),w.brass),M("brass",ie(.03,.006,6,12,Math.PI),w.brass,[.07,.05,0],[Math.PI/2,0,0]),M("glass",ve([[.02,.13],[.04,.17],[.045,.21],[.03,.27],[.024,.32]],16),16774109),M("glow",he(.009,8,6),16760944,[0,.165,0],null,[1,2.4,1]),kt(),Ms(3428490,[.16,0,.12],2.4),zt([-.12,0,-.08]),M("glass",ve([[0,0],[.045,0],[.05,.02],[.05,.14],[.035,.17],[.038,.19],[0,.19]],16),15266026),[[w.rust,.2,.15],[14736080,-.3,.18],[3158068,.05,.16],[w.sky,-.1,.2],[11567184,.35,.13]].forEach(([l,f,g],_)=>Qi(g,l,[Math.sin(_*1.3)*.012,.01,Math.cos(_*1.3)*.012],[f*.5,_*1.25,f],.1)),kt(),Cn(.03,.2,.14,w.wine,[-.05,.015,.1],[0,.3,Math.PI/2]),zt([-.06,.035,.1],[0,.4,0]);for(let l of[-.026,.026])M("brass",ie(.019,.0016,4,16),12098138,[l,.003,0],[Math.PI/2,0,0]),M("glass",pt(.018,.018,.002,14),16777215,[l,.003,0]);M("brass",ie(.008,.0015,4,8,Math.PI),12098138,[0,.003,.004],[Math.PI/2,0,0]);for(let l of[-.045,.045])ge("brass",[l,.003,0],[l*1.1,.003,-.1],.0013,12098138,4);kt(),kt(),Cn(.05,.22,.16,w.indigo,[1.22,.175,-1.98],[0,0,Math.PI/2]),Cn(.04,.2,.15,w.moss,[1.24,.22,-1.97],[0,.2,Math.PI/2]),rl([.8,1.06,-2.06],1.1),zt([-1,0,-1.25],[0,.5,0]);for(let[l,f]of[[-.07,.15],[.08,-.25]])M("knit",Ki(.1,.07,.25,.25),w.indigo,[l,.03,0],[0,f,0],null,{uvs:.7}),M("leather",ot(.1,.012,.25,.006),3811870,[l,.006,0],[0,f,0]);kt(),M("knit",fn({W:.14,D:.11,L:.55,flare:.1,folds:3,amp:.1,neck:.9,sh:.02,uvd:11}),w.rust,[-.8,1.2,-2.13],[0,0,.05]),oh(-1.3,-1.98),il([-1.42,.618,-2.06],.06),zt([-1.15,.618,-2.02],[0,.7,0]),M("wood",he(.03,12,8),w.honey,[0,.03,0],null,[1.5,.9,.9]),M("wood",he(.022,10,8),w.honey,[.045,.06,0]),M("wood",pt(.001,.013,.03,8),w.honey,[.07,.056,0],[0,0,Math.PI/2]);for(let l of[-.01,.01])M("wood",pt(.001,.008,.02,6),w.honey,[.04,.085,l]);M("wood",pt(.004,.018,.06,8),14264424,[-.055,.03,.01],[.3,0,-1.2]),kt(),zt([-1.27,.62,-1.86],[0,-.2,0]);for(let l=0;l<4;l++)M("paper",rt(.14,.004,.1),w.paper,[lt(-.005,.005),.002+l*.0045,lt(-.005,.005)],[0,lt(-.08,.08),0]);M("fabric",rt(.005,.022,.104),9056288,[0,.009,0]),M("fabric",rt(.144,.022,.005),9056288,[0,.009,0]),M("wax",pt(.009,.009,.004,10),9052192,[.02,.021,.02]),kt(),M("wood",ot(.3,.38,.025,.006),w.walnut,[-1.3,1.3,-2.185]),al(.24,.32,1,[-1.3,1.3,-2.17]),M("glass",rt(.24,.32,.003),16777215,[-1.3,1.3,-2.166]),zt([-2.47,1.52,-1.1],[0,Math.PI/2,0]);for(let l of[-.25,.22])M("wood",pt(.012,.014,.08,8),w.dark,[l,-.03,.04],[Math.PI/2,0,0]);M("wood",pt(.016,.017,.72,10),w.honey,[0,0,.065],[0,0,Math.PI/2]),M("leather",pt(.019,.019,.16,10),w.brown,[-.26,0,.065],[0,0,Math.PI/2]),M("iron",pt(0,.016,.06,8),5591630,[-.39,0,.065],[0,0,Math.PI/2]),M("iron",ot(.04,.05,.034,.006),5591630,[.37,0,.065]),M("iron",ie(.2,.009,5,14,.75),6973282,[.37,-.2,.065],[0,0,Math.PI/2-.05],[1,1,1.4]),M("iron",rt(.012,.1,.05),6973282,[.37,.07,.065],[0,0,-.2]),kt();for(let l=0;l<6;l++)M("knit",ie(.14-l*.004,.012,6,30),w.hemp,[-2.465+l*.007,1.07-l*.008+lt(-.006,.006),-1.1+lt(-.01,.01)],[lt(-.08,.08),Math.PI/2,0],null,{uvs:.5});M("wood",pt(.014,.014,.1,8),w.dark,[-2.45,1.2,-1.1],[0,0,Math.PI/2]),zt([0,0,.47]),M("wood",rt(1,.36,.46),w.walnut,[0,.2,0]);{let l=pt(.23,.23,1,16,!1);l.rotateZ(Math.PI/2);let f=l.attributes.position;for(let g=0;g<f.count;g++)f.getY(g)<0&&f.setY(g,0);l.computeVertexNormals(),M("wood",l,w.oak,[0,.38,0],null,[1,.38,1])}for(let l of[-.42,0,.42])M("iron",rt(.05,.37,.472),w.iron,[l,.2,0]),M("iron",ie(.236,.008,4,16,Math.PI),w.iron,[l,.38,0],[0,Math.PI/2,0],[1,.38,1]);for(let l of[-.49,.49])for(let f of[-.22,.22])M("brass",rt(.04,.06,.04),w.brass,[l,.04,f]);M("brass",ot(.08,.1,.012,.004),w.brass,[0,.33,.233]),M("iron",pt(.008,.008,.01,8),1118481,[0,.31,.24],[Math.PI/2,0,0]);for(let l of[-.505,.505])M("leather",ie(.05,.01,4,10,Math.PI),w.brown,[l,.25,0],[0,Math.PI/2,Math.PI]);Rm([.25,.47,0],5,.12),zt([-.25,.47,.02],[0,.4,0]),M("leather",ot(.1,.02,.2,.008),8015404,[0,.01,0],[0,0,.05]),M("leather",ot(.1,.02,.2,.008),8015404,[.04,.03,.03],[0,.4,-.08]),kt(),M("blob",new xe(1.3,.75).rotateX(-Math.PI/2),16777215,[0,.003,0]),kt(),Ce(-.56,.56,.22,.73),zt([-1.85,0,1.78],[0,2.356,0]);for(let l of[-.33,.33])for(let f of[-.28,.28])M("wood",ot(.06,.3,.06,.008),w.walnut,[l,.15,f]);M("wood",ot(.74,.1,.66,.01),w.walnut,[0,.33,0]),M("fabric",ot(.6,.14,.58,.05,3),w.rust,[0,.45,.03]),M("wood",ot(.7,.62,.07,.02),w.walnut,[0,.7,-.33],[-.12,0,0]),M("fabric",ot(.58,.5,.13,.05,3),w.rust,[0,.74,-.24],[-.14,0,0]);for(let l of[-.35,.35])M("wood",ot(.08,.05,.66,.015),w.oak,[l,.64,.02]),M("wood",ot(.05,.25,.05,.01),w.walnut,[l,.5,.28]);M("knit",ys(.09,-.3,.3,.675,.3,0,{r:.04,sx:12,sz:16,rip:.03,freq:22,minY:.36}),w.ochre,[.35,0,0],null,null,{keepUV:!0}),M("blob",new xe(1,.95).rotateX(-Math.PI/2),16777215,[0,.003,0]),kt(),Ce(-2.4,-1.32,1.24,2.4),zt([-2.2,0,1.02]),M("knit",ve([[0,.005],[.15,.005],[.17,.05],[.175,.22],[.165,.22],[.16,.05],[0,.015]],22),w.hemp,null,null,null,{uvs:.5}),M("wood",ie(.172,.008,4,22),9071168,[0,.22,0],[Math.PI/2,0,0]),zr(w.indigo,[.05,.2,.04]),zr(w.cream,[-.06,.19,-.03]),zr(w.rust,[.02,.21,-.08],.04),ge("wood",[0,.18,.02],[.12,.42,.08],.004,w.honey),ge("wood",[.02,.18,0],[.16,.4,-.02],.004,w.honey),M("knit",ys(.16,-.08,.08,.235,.2,0,{r:.02,sx:10,sz:8,rip:.02,minY:.05}),w.indigo,[.13,0,.02],[0,.3,0],null,{keepUV:!0}),kt(),Ce(-2.4,-2,.84,1.2),zt([-.95,0,2.12]),M("wood",pt(.22,.22,.03,24),w.oak,[0,.56,0]),M("wood",ve([[.03,0],[.035,.1],[.028,.3],[.04,.45],[.03,.545]],12),w.walnut);for(let l=0;l<3;l++)M("wood",rt(.04,.03,.2),w.walnut,[Math.sin(l*2.09)*.1,.015,Math.cos(l*2.09)*.1],[0,l*2.09,0]);M("ceramic",new Or(.045,4),w.indigo,[.06,.621,.04],[0,.6,0]),Ms(3428490,[-.12,.575,-.06],1,!0),M("fabric",ot(.18,.004,.18,.002),w.cream,[-.1,.578,.08],[0,.3,0]),kt(),Ce(-1.18,-.72,1.9,2.4),zt([-1.8,1.62,2.31]),M("wood",ot(1,.035,.18,.006),w.oak,[0,0,0]);for(let l of[-.4,.4])M("wood",rt(.03,.16,.14),w.walnut,[l,-.09,.02],[0,0,0]);ah([-.38,.018,0]),rl([-.2,.11,.01],.9),M("ceramic",ve([[0,0],[.04,0],[.045,.06],[.025,.11],[.022,.13],[0,.13]],14),w.ochre,[-.02,.018,0]);for(let l=0;l<6;l++)ge("wood",[-.02,.1,0],[-.02+lt(-.07,.07),.24+lt(0,.06),lt(-.04,.04)],.002,8026698,3);for(let l=0;l<9;l++)M("fabric",he(.009,5,4),[9071272,w.ochre,14207200][l%3],[-.02+lt(-.07,.07),.26+lt(0,.06),lt(-.04,.04)]);Cn(.035,.2,.14,w.rust,[.18,.118,0],[0,0,0]),Cn(.03,.18,.13,w.moss,[.225,.108,0],[0,0,.12]),M("wood",ot(.16,.2,.02,.005),w.walnut,[.38,.118,.04]),al(.12,.15,3,[.38,.118,.028],Math.PI),kt(),M("rug",new xe(2.6,1.45).rotateX(-Math.PI/2),16777215,[.45,.004,1.45],[0,.04,0],null,{keepUV:!0}),zt([2.27,0,1.35]),M("wood",ot(.42,.72,.62,.01),w.oak,[0,.36,0]),M("wood",ot(.46,.035,.66,.008),w.walnut,[0,.735,0]);for(let l of[-.14,.14])M("wood",ot(.02,.5,.26,.006),w.walnut,[-.215,.38,l]),M("brass",he(.012,8,6),w.brass,[-.23,.42,l+(l>0?-.09:.09)]);M("brass",ve([[0,0],[.09,0],[.16,.06],[.18,.09],[.175,.095],[.15,.065],[0,.01]],26),w.copper,[-.02,.752,-.1]),M("brass",ve([[0,0],[.06,0],[.07,.04],[.05,.14],[.045,.2],[.06,.24],[.055,.245],[0,.18]],20),w.copper,[.05,.752,.18]),M("brass",ie(.05,.007,5,12,Math.PI),w.copper,[.05,.92,.25],[Math.PI/2,Math.PI/2,-Math.PI/2]),M("wax",ot(.07,.03,.05,.012),14209200,[-.1,.77,.2]),ge("wood",[-.235,.62,-.25],[-.235,.62,.25],.01,w.walnut),M("fabric",fn({W:.46,D:.03,L:.42,folds:5,amp:.08,neck:1,sh:.01}),w.cream,[-.24,.63,0],[0,Math.PI/2,0]),kt(),Ce(2.04,2.5,1.02,1.68),sh(2.5,.8,1.9,.8,2.2),M("iron",pt(.012,.012,1.8,8),w.iron,[2.37,2.34,1.35],[Math.PI/2,0,0]);for(let l of[.45,2.25])M("iron",he(.025,8,6),w.iron,[2.37,2.34,l]);rh(2.35,.64,1.95,14008206,!1),rh(2.35,2.08,1.95,14008206,!0),M("wood",pt(.017,.017,3.18,12),w.oak,[-4.56,1.8,-.6],[Math.PI/2,0,0]);for(let l of[-2.16,.96])M("wood",ot(.1,.12,.08,.01),w.walnut,[-4.56,1.8,l]);M("iron",pt(.006,.006,.28,6),w.iron,[-4.56,1.94,-.6]),M("wood",ot(.62,.03,3.2,.006),w.oak,[-4.6,2.08,-.6]);for(let l of[-2,-.6,.8])M("wood",rt(.04,.15,.04),w.walnut,[-4.88,2,l],[0,0,0]);let i={coat:{W:.5,D:.13,L:1.05,flare:.3,folds:7,amp:.13,sl:.62},cloak:{W:.5,D:.15,L:1.32,flare:.32,folds:9,amp:.18,sl:0},tunic:{W:.46,D:.1,L:.8,flare:.18,folds:6,amp:.1,sl:.5},shirt:{W:.44,D:.08,L:.7,flare:.06,folds:5,amp:.08,sl:.55},vest:{W:.42,D:.09,L:.55,flare:.02,folds:4,amp:.06,sl:0},trews:{W:.34,D:.06,L:.56,flare:0,folds:3,amp:.05,sl:0,neck:1}},t=[["cloak","fabric",4082226],["coat","fabric",w.indigo],["coat","leather",6963752],["tunic","fabric",w.rust],["shirt","fabric",w.cream],["shirt","fabric",13156520],["tunic","knit",w.indigo],["vest","leather",4861984],["shirt","fabric",w.sky],["tunic","fabric",w.moss],["trews","fabric",4868680],["trews","fabric",5917240],["coat","fabric",w.wine],["tunic","knit",w.ochre],["shirt","fabric",w.linen],["cloak","fabric",w.charcoal],["vest","fabric",w.ochre],["coat","knit",3818848]],e=-1.98;for(let[l,f,g]of t){let _={...i[l]},m=1.72;if(f==="leather"&&(_.uvd=4),f==="knit"&&(_.uvd=11),zt([-4.56,m,e],[0,lt(-.1,.1),lt(-.025,.025)]),M(f,fn(_),g,[0,0,0],null,null,{keepUV:!0}),_.sl)for(let p of[-1,1])M(f,fn({W:.1,D:.075,L:_.sl,flare:.35,folds:5,amp:.1,neck:.8,uvd:_.uvd}),g,[p*(_.W/2-.035),-.05,.012],[0,0,p*.06],null,{keepUV:!0});if((l==="coat"||l==="cloak")&&M(f,pt(.06,.09,.06,12,!0),g,[0,-.015,0],null,[1.2,1,.9],{keepUV:!1}),M("wood",ie(.5,.009,5,16,.84),w.honey,[0,-.47,0],[0,0,Math.PI/2-.42]),M("iron",ie(.024,.0025,4,10,Math.PI*1.4),w.iron,[0,.08,0],[0,0,-.2]),ge("iron",[0,.056,0],[0,.03,0],.0025,w.iron,4),l==="trews"&&M("wood",pt(.008,.008,.36,6),w.honey,[0,-.01,0],[0,0,Math.PI/2]),kt(),e+=(l==="cloak"?.2:l==="coat"?.175:.15)+lt(0,.03),e>.86)break}Ce(-4.9,-4.24,-2.2,1),Ze([-4.62,0,-.4],Math.PI/2+.1,4861984),Ze([-4.62,0,-.25],Math.PI/2-.05,4861984),Ze([-4.6,0,.3],Math.PI/2+.2,6965808),Ze([-4.55,0,.47],Math.PI/2+.6,6965808,0),zt([-4.6,2.095,-1.6]),M("fabric",ve([[0,0],[.2,0],[.205,.008],[.11,.012],[.1,.1],[.08,.13],[0,.125]],22),3814446,null,null,null,{uvs:.6}),M("leather",pt(.104,.11,.025,22,!0),6963752,[0,.025,0]),Qi(.2,w.rust,[.09,.03,.03],[.2,0,-.9],.15),kt();for(let l=0;l<3;l++)M("knit",pt(.07,.07,.5,14),[w.cream,w.indigo,w.rust][l],[-4.62,2.165+(l===2?.13:0),-.8+l*.15-(l===2?.08:0)],[0,0,Math.PI/2]);M("knit",ve([[0,0],[.18,0],[.2,.2],[.19,.2],[.17,.01],[0,.01]],18),w.hemp,[-4.6,2.095,.3],null,[1.3,1,1],{uvs:.5}),M("wood",ot(.4,.22,.32,.01),w.pine,[-4.6,2.205,.75]),zt([-2.9,0,0]);for(let l of[-2.17,-1.2,-.235])M("wood",rt(.4,2.2,.025),w.oak,[0,1.1,l]);let n=[.08,.48,.88,1.28,1.68,2.08];for(let l of n)M("wood",ot(.41,.025,1.96,.004),w.oak,[0,l,-1.2]);for(let l of n)M("wood",rt(.02,.05,1.96),w.walnut,[-.2,l-.01,-1.2]);let s=[[w.indigo,w.cream,w.rust,3818848],[w.linen,w.cream,w.sky,14209216],[w.moss,w.ochre,w.charcoal,w.indigo]];n.forEach((l,f)=>{for(let g=0;g<2;g++){let _=g?-.72:-1.68;if(f===0){if(g)Ze([.02,l+.012,_-.18],-Math.PI/2,3811870),Ze([.02,l+.012,_-.05],-Math.PI/2+.1,3811870),M("wood",ot(.32,.18,.3,.01),w.pine,[.02,l+.1,_+.25]);else{M("knit",ve([[0,0],[.15,0],[.16,.2],[.15,.2],[.14,.01],[0,.01]],16),w.hemp,[.02,l+.012,_],null,[1,1,1.4],{uvs:.5});for(let S=0;S<5;S++)zr([5921376,w.cream,w.indigo,8018496,w.rust][S],[lt(-.08,.1),l+.18+lt(0,.03),_+lt(-.12,.12)],.04)}return}if(f===4&&g===1){M("knit",ve([[0,0],[.14,0],[.15,.15],[.14,.15],[.13,.01],[0,.01]],16),w.hemp,[.02,l+.012,_-.2],null,[1,1,1.2],{uvs:.5});for(let S=0;S<4;S++)M("knit",he(.04,10,6),[w.cream,5921376,w.rust,w.indigo][S],[lt(-.07,.07),l+.15,_-.2+lt(-.1,.1)],null,[1.3,.7,1]);for(let S=0;S<3;S++)M("knit",pt(.035,.035,.3,12),[w.indigo,w.ochre,w.wine][S],[.02,l+.05+(S===2?.06:0),_+.12+S*.08-(S===2?.04:0)],[0,0,Math.PI/2]);return}let m=2,p=f%2?"knit":"fabric",E=p==="knit"?.055:.035;for(let S=0;S<m;S++){let T=3+Math.floor(te()*3),I=_+(S-.5)*.42,R=l+.0125;for(let C=0;C<T&&R<l+.34;C++){let N=E*lt(.85,1.2);Am(p,.3,.32,N,s[(f+g)%3][Math.floor(te()*4)],[lt(-.01,.02),R+N/2,I+lt(-.015,.015)],lt(-.05,.05)),R+=N}}}}),kt(),Ce(-3.12,-2.7,-2.2,-.2),zt([-3.75,0,-1.98]),M("wood",rt(1,.78,.44),w.walnut,[0,.45,0]),M("wood",ot(1.06,.035,.48,.008),w.oak,[0,.855,.01]),M("wood",rt(1,.06,.42),w.dark,[0,.03,0]);for(let l=0;l<3;l++){let f=.2+l*.25;M("wood",ot(.92,.21,.025,.006),w.oak,[0,f,.225],null,null,{jit:.08});for(let g of[-.25,.25])M("brass",ie(.022,.004,4,12,Math.PI),w.brass,[g,f-.01,.245],[0,0,Math.PI]),M("brass",rt(.06,.03,.004),w.brass,[g,f+.012,.24])}M("wood",ot(.6,.8,.03,.01),w.walnut,[0,1.38,-.2]),M("mirror",rt(.5,.7,.005),16777215,[0,1.38,-.183],null,null,{noAO:!0,jit:0}),M("wood",ot(.05,.022,.2,.01),w.honey,[-.3,.885,.05],[0,.4,0]),M("fabric",rt(.04,.02,.09),2761758,[-.33,.9,0],[0,.4,0]),M("wood",rt(.14,.004,.035),9071176,[-.12,.876,.1],[0,-.3,0]),M("brass",ve([[0,0],[.04,0],[.06,.018],[.058,.02],[.038,.004],[0,.004]],18),w.brass,[.08,.873,.05]),M("brass",ie(.011,.0025,6,14),14727264,[.08,.882,.05],[Math.PI/2-.2,0,0]);for(let l=0;l<2;l++)M("fabric",ie(.016,.004,4,12),[w.rust,w.indigo][l],[.25+l*.03,.878,.1],[Math.PI/2,0,0]);M("brass",pt(.03,.03,.025,14),9079432,[.32,.885,-.05]),Ms(12628112,[.38,.873,.08],.5,!1);for(let l=0;l<4;l++)ge("wood",[.38,.95,.08],[.38+lt(-.05,.05),1.08,.08+lt(-.04,.04)],.002,6978122,3);M("blob",new xe(1.3,.75).rotateX(-Math.PI/2),16777215,[0,.003,.05]),kt(),Ce(-4.28,-3.2,-2.2,-1.74),zt([-3.8,0,.8]),M("wood",ot(1,.05,.36,.01),w.oak,[0,.44,0]);for(let l of[-.44,.44])M("wood",rt(.05,.42,.3),w.walnut,[l,.21,0]);M("wood",rt(.85,.06,.03),w.walnut,[0,.12,0]),M("fabric",ot(.55,.06,.32,.025,3),w.indigo,[-.18,.49,0]),Ze([.15,0,0],.3,5913122),Ze([.3,0,.02],-.2,5913122);for(let l of[-.25,.25]){zt([l,1.45,.185],[0,0,0]),M("wood",ie(.3,.014,5,24),w.honey,[0,0,0],null,[.42,1,1]);for(let f=-3;f<=3;f++)ge("leather",[-.12*Math.cos(f*.2),f*.07,0],[.12*Math.cos(f*.2),f*.07,0],.003,10123856,4);for(let f of[-.04,.04])ge("leather",[f,-.25,0],[f,.25,0],.003,10123856,4);M("leather",rt(.1,.03,.012),5913122,[0,-.03,-.005]),kt()}M("wood",ot(1,.1,.025,.008),w.walnut,[0,1.9,.188]);for(let l=0;l<4;l++)M("wood",pt(.014,.018,.09,8),w.oak,[-.36+l*.24,1.9,.15],[Math.PI/2-.25,0,0]);M("knit",fn({W:.16,D:.03,L:.7,flare:.1,folds:3,amp:.1,neck:.8,uvd:11}),w.rust,[-.36,1.9,.12]),M("knit",fn({W:.2,D:.04,L:.35,flare:.3,folds:4,amp:.1,neck:.6,uvd:11}),w.cream,[.12,1.9,.12]),zt([.36,1.86,.13]);for(let l of[-.035,.035])M("leather",ot(.055,.03,.02,.008),2761760,[l,-.05,0]);M("leather",ie(.06,.004,4,14,Math.PI),5913122,[0,-.04,.01],[0,0,Math.PI]),kt(),kt(),Ce(-4.32,-3.28,.6,1);for(let l=0;l<5;l++)M("iron",ie(.014,.003,4,8),w.iron,[-3.72,$e-.03-l*.025,-.6],[0,l%2*Math.PI/2,0]);sl([-3.72,$e-.47,-.6],1),M("rug",new xe(2,.95).rotateX(-Math.PI/2),13682880,[-3.72,.004,-.55],[0,Math.PI/2,0],null,{keepUV:!0}),M("wood",rt(.02,.1,3.2),w.walnut,[-4.89,.05,-.6]);let r=.34;M("wood",ot(.44,.17,1.04,.012),w.oak,[2.28,.085,-1]),M("wood",rt(.012,.17,1),w.walnut,[2.505,.255,-1]);for(let[l,f,g]of[[2.7,5.3,-2.19],[2.7,5.3,.39]])M("wood",rt(f-l,.1,.02),w.walnut,[(l+f)/2,r+.05,g]);sh(5.3,-1.85,-.55,1.29,2.49),zt([4.27,r,-1.81]),M("wood",ot(1.96,.05,.78,.012),11567184,[0,.735,0],null,null,{jit:0});for(let l of[-.78,.78]){M("wood",ot(.09,.07,.7,.01),w.walnut,[l,.035,0]),M("wood",ot(.08,.6,.13,.008),w.walnut,[l,.37,0]),M("wood",ot(.07,.06,.68,.01),w.walnut,[l,.68,0]);for(let f of[-.25,.25])M("wood",pt(.008,.008,.1,8),w.dark,[l,.68,f],[0,0,Math.PI/2])}M("wood",rt(1.75,.08,.05),w.oak,[0,.3,0]);for(let l of[-.86,.86])M("wood",rt(.06,.06,.04),w.oak,[l,.3,0]),M("wood",rt(.012,.09,.06),w.dark,[l+Math.sign(l)*.02,.3,0],[0,0,.1]);M("wood",rt(1.4,.1,.02),w.walnut,[0,.66,.37]),M("wood",ot(.5,.085,.022,.005),w.oak,[.1,.66,.385]),M("brass",ie(.02,.004,4,12,Math.PI),w.brass,[.1,.655,.4],[0,0,Math.PI]),M("wood",ot(1.7,.025,.16,.005),w.oak,[0,1,-.31]);for(let l of[-.84,-.3,.3,.84])M("wood",rt(.022,.24,.16),w.oak,[l,.88,-.31]);M("blob",new xe(2.4,1.2).rotateX(-Math.PI/2),16777215,[0,.003,0]),kt(),Ce(3.26,5.3,-2.2,-1.38);let o=r+.76;for(let l=0;l<3;l++)M("ceramic",ve([[0,0],[.025,0],[.028,.05],[.012,.07],[.012,.085],[0,.085]],12),[1976896,4202520,2109472][l],[4.3+l*.07,o,-2.12]);for(let l=0;l<5;l++)M("paper",rt(.004,.17,.12),w.paper,[3.99+l*.03,o+.085,-2.13],[0,0,lt(-.15,.15)]);for(let l=0;l<3;l++)M("paper",pt(.022,.022,.5,10),[w.paper,15259824,14469280][l],[4.85,o+.025+(l===2?.035:0),-2.12+l*.04-(l===2?.02:0)],[0,0,Math.PI/2]);for(let l=0;l<6;l++){let f=.19+te()*.04;Cn(.03+te()*.012,f,.12,[w.indigo,w.rust,w.moss,w.wine,5914672,w.ochre][l],[4+l*.045,o+.2525+f/2,-2.09],[0,Math.PI,0])}M("map",Fr(1,.68,.028,18,12,[0,1,1,0]),16777215,[4.35,o+.002,-1.79],null,null,{keepUV:!0,noAO:!0}),M("paper",Fr(.7,.5,.01,6,6),15128244,[3.85,o+8e-4,-1.72],[0,-.22,0],null,{noAO:!0});let a=(l,f)=>[4.35+(l-.5)*1,-1.79+(f-.5)*.68],c=[[.18,.75],[.3,.62],[.41,.5],[.5,.47],[.58,.38],[.7,.33],[.83,.22]],h=[w.rust,w.rust,w.ochre,w.rust,w.indigo,w.rust,w.ochre];c.forEach(([l,f],g)=>{let[_,m]=a(l,f);if(M("ceramic",he(.0075,8,6),h[g],[_,o+.022,m]),M("iron",pt(.0012,.0012,.02,4),10066329,[_,o+.01,m]),g){let[p,E]=a(...c[g-1]);ge("fabric",[p,o+.016,E],[_,o+.016,m],.0012,11542560,4)}}),Qi(.12,14736080,[a(.58,.38)[0]+.01,o+.006,a(.58,.38)[1]],[-Math.PI/2+.05,.9,0],.02),zt([3.92,o,-2.06]),M("brass",pt(.042,.044,.016,24),w.brass,[0,.008,0]),M("ceramic",pt(.036,.036,.002,24),15787728,[0,.016,0]),M("iron",rt(.004,.002,.058),10103328,[0,.019,0],[0,.3,0]),M("glass",pt(.037,.037,.003,20),16777215,[0,.02,0]),M("brass",pt(.043,.043,.006,24),w.brass,[0,.043,-.04],[-1.3,0,0]),M("brass",ie(.012,.003,6,12),w.brass,[0,.01,.054],[Math.PI/2,0,0]),kt(),M("stone",he(.05,14,10),8026224,[3.94,o+.018,-1.5],[0,.4,0],[1.2,.42,.9]),ge("brass",[4.6,o+.012,-1.64],[4.68,o+.004,-1.5],.0025,w.brass,6),ge("brass",[4.6,o+.012,-1.64],[4.52,o+.004,-1.52],.0025,w.brass,6),M("brass",pt(.007,.007,.01,10),w.brass,[4.6,o+.014,-1.64],[Math.PI/2,0,0]),M("wood",ot(.45,.006,.035,.002),w.pine,[4.15,o+.008,-1.5],[0,.32,0]),zt([4.75,o+.006,-1.98],[0,.6,0]),M("brass",ie(.045,.005,6,24),w.brass,[0,0,0],[Math.PI/2,0,0]),M("glass",pt(.043,.043,.003,22),16777215,[0,0,0]),M("wood",pt(.009,.011,.1,8),w.dark,[.098,0,0],[0,0,Math.PI/2]),kt(),M("ceramic",ve([[0,0],[.035,0],[.04,.02],[.035,.045],[.014,.05],[.014,.06],[0,.06]],16),1710626,[5.05,o,-1.95]),Qi(.28,15394008,[5.05,o+.05,-1.95],[-.45,-.6,.15],.08),Ms(3428490,[5,o,-1.56],.9),il([3.42,o,-1.52],.035,!1),M("ceramic",he(.034,14,10),10103326,[4.95,o+.032,-1.72],null,[1,.9,1]),M("wood",pt(.002,.002,.02,4),4861984,[4.95,o+.068,-1.72],[0,0,.3]);for(let l=0;l<3;l++)M("wood",pt(.004,.004,.13,6),[w.ochre,w.indigo,3103290][l],[4.3+l*.05,o+.005,-1.52+l*.015],[0,.4+l*.6,Math.PI/2]);zt([3.66,o,-1.6],[0,.28,0]),M("leather",ot(.34,.008,.23,.003),w.rust,[0,.004,0]);for(let l of[-1,1])M("paper",ot(.16,.012,.22,.004),w.paper,[l*.083,.014,0],[0,0,l*.03]),ol(.15,.21,l>0?0:2,[l*.083,.0215+.0025,0],[0,0,l*.03],.004);M("fabric",rt(.006,.002,.26),10493984,[.01,.022,.01]),kt(),ol(.12,.16,3,[4.62,o+.003,-1.5],[0,-.3,0]),ol(.11,.14,0,[3.8,o+.004,-1.86],[0,.4,0]);for(let l=0;l<3;l++)Cn(.035,.2+l*.01,.15,[w.indigo,5914672,w.moss][l],[3.5,o+.018+l*.036,-1.9],[0,.1*l,Math.PI/2]);sl([3.56,o,-2.1],.95),M("wood",ot(1.5,.95,.03,.01),w.walnut,[4.3,1.96,-2.185]),M("cork",rt(1.42,.87,.012),10976338,[4.3,1.96,-2.164],null,null,{noAO:!0});let u=[];[[3.75,2.1,1,.26,.2],[4.08,1.68,0,.2,.26],[4.5,2.12,3,.22,.22],[4.82,1.7,2,.2,.26],[4.32,1.62,1,.18,.14],[3.72,1.62,3,.16,.16]].forEach(([l,f,g,_,m])=>{let p=f+.08;al(_,m,g,[l,p,-2.155]),M("ceramic",he(.008,8,6),w.rust,[l,p+m/2-.02,-2.15]),u.push([l,p+m/2-.02])});for(let[l,f]of[[0,2],[2,3],[1,4],[4,3],[0,1]])ge("fabric",[u[l][0],u[l][1],-2.145],[u[f][0],u[f][1],-2.145],.0012,11542560,4);[[4.1,2.26,.3,w.rust],[4.2,2.25,0,3158068],[4.95,2.2,-.4,w.sky]].forEach(([l,f,g,_])=>Qi(.16,_,[l,f-.08,-2.15],[0,0,g],0)),zt([3.92,r,-1],[0,Math.PI-.5,0]);for(let l of[-.21,.21])M("wood",pt(.02,.018,.45,8),w.oak,[l,.225,.2]),M("wood",pt(.02,.018,.98,8),w.oak,[l,.49,-.2]),M("wood",he(.025,8,6),w.oak,[l,.99,-.2]);for(let l of[.12,.25])ge("wood",[-.21,l,.2],[.21,l,.2],.011,w.oak),ge("wood",[-.21,l+.03,-.2],[-.21,l+.03,.2],.011,w.oak),ge("wood",[.21,l+.03,-.2],[.21,l+.03,.2],.011,w.oak);M("wood",ot(.46,.035,.44,.01),w.oak,[0,.45,0]);for(let l=0;l<3;l++)M("wood",ot(.4,.06,.018,.006),w.oak,[0,.62+l*.13,-.205]);M("fabric",Ki(.4,.06,.38,.05),w.indigo,[0,.49,.01]),M("blob",new xe(.7,.7).rotateX(-Math.PI/2),16777215,[0,.003,0]),kt(),Ce(3.66,4.18,-1.26,-.74),zt([3.37,r,.23]);for(let l of[-.56,.56])M("wood",rt(.03,1.9,.32),w.walnut,[l,.95,0]);M("wood",rt(1.12,1.9,.015),w.dark,[0,.95,.155]);let d=[.05,.42,.79,1.16,1.53,1.88];for(let l of d)M("wood",ot(1.12,.025,.31,.004),w.oak,[0,l,0]);d.slice(0,5).forEach((l,f)=>{let g=-.53;for(;g<.5;){if(te()<.1&&f>0){g+=.1;continue}let _=lt(.025,.05),m=lt(.2,.3),p=g>.35&&te()<.4?-.2:0;if(Cn(_,m,lt(.15,.2),[w.indigo,w.rust,w.moss,w.wine,5914672,w.ochre,3818848,8018490][Math.floor(te()*8)],[g+_/2,l+.0125+m/2,-.03],[0,0,p]),g+=_+.003,f===2&&g>-.1&&g<0){for(let E=0;E<4;E++)M("paper",pt(.025,.025,.28,10),[w.paper,15259824][E%2],[.05+E%2*.05,l+.04+Math.floor(E/2)*.05,-.02],[0,Math.PI/2,0]);g=.2}}}),ah([.3,1.893,0]),M("glass",ve([[0,0],[.04,0],[.042,.12],[.025,.15],[0,.15]],14),14215392,[-.3,1.893,0]),kt(),Ce(2.7,3.97,.04,.4),zt([4.66,r,.25]),M("wood",rt(1.2,.03,.3),w.walnut,[0,1,0]),M("wood",rt(1.2,.03,.3),w.walnut,[0,.015,0]);for(let l=0;l<=4;l++)M("wood",rt(.02,1,.3),w.oak,[-.59+l*.295,.5,0]);for(let l=1;l<3;l++)M("wood",rt(1.2,.02,.3),w.oak,[0,l*.33,0]);for(let l=0;l<4;l++)for(let f=0;f<3;f++){let g=-.445+l*.295,_=.03+f*.33,m=2+Math.floor(te()*4);for(let p=0;p<m;p++){let E=lt(.025,.04),S=g+lt(-.09,.09),T=_+E+(p>2?.07:0);M("paper",pt(E,E,.34,12),[w.paper,15259824,14469280,15788240][p%4],[S,T,-.04+lt(-.01,.03)],[Math.PI/2+lt(-.05,.05),0,0]),te()<.5&&M("fabric",ie(E+.002,.002,4,12),w.rust,[S,T,-.12],null,null)}}zt([.35,1.015,0]),M("wood",pt(.05,.05,.015,12),w.walnut,[0,.008,0]),M("wood",pt(.05,.05,.015,12),w.walnut,[0,.21,0]);for(let l=0;l<3;l++)M("wood",pt(.006,.006,.2,6),w.walnut,[Math.cos(l*2.09)*.042,.108,Math.sin(l*2.09)*.042]);M("glass",ve([[0,.015],[.035,.03],[.004,.105],[.035,.18],[0,.2]],14),15790312),M("stone",pt(.024,0,.035,10),14205082,[0,.035,0]),kt(),M("leather",pt(.045,.045,.6,14),w.brown,[-.2,1.06,.02],[0,.2,Math.PI/2]),M("brass",pt(.047,.047,.03,14),w.brass,[-.49,1.06,-.04],[0,.2,Math.PI/2]),kt(),Ce(4.03,5.3,.08,.4),zt([5.06,r,-.22]),M("wood",ve([[0,0],[.13,0],[.15,.2],[.13,.42],[0,.42]],16),w.oak);for(let l of[.06,.36])M("iron",ie(.142,.007,4,18),w.iron,[0,l,0],[Math.PI/2,0,0],[1,1,1]);ge("wood",[.03,.05,.02],[-.12,1.7,.06],.018,w.honey,8),ge("wood",[-.03,.05,-.03],[-.06,1.55,-.14],.016,9068608,8),ge("wood",[0,.05,.04],[-.2,1.4,.16],.013,w.pine,8),M("leather",pt(.021,.021,.1,8),w.brown,[-.1,1.45,.055],[0,0,.09]),kt(),Ce(4.9,5.3,-.4,-.04),M("rug",new xe(1.7,1.2).rotateX(-Math.PI/2),14208192,[4.1,r+.004,-.72],null,null,{keepUV:!0}),M("sky",new xe(26,9).rotateY(-Math.PI/2),16777215,[9.5,2.5,-1.5],null,null,{keepUV:!0,noAO:!0,jit:0})}var hl=document.getElementById("status"),hh=document.getElementById("overlay"),cl=document.getElementById("start"),Hr=document.getElementById("stats"),uh=document.getElementById("hint");function Cm(){let i=new gr({antialias:!0,powerPreference:"high-performance"}),t=Math.min(window.devicePixelRatio||1,2),e=Math.min(t,1.5);i.setPixelRatio(e),i.setSize(window.innerWidth,window.innerHeight),i.toneMapping=Ga,i.toneMappingExposure=1.1,i.outputColorSpace=Ue,i.shadowMap.enabled=!0,i.shadowMap.type=Va,i.shadowMap.autoUpdate=!1,document.body.appendChild(i.domElement);let n=new Gi;n.background=new Wt(1709586);let s=new Vi(i);n.environment=s.fromScene(new Pr,.04).texture,n.environmentIntensity=.32;let r=new De(70,window.innerWidth/window.innerHeight,.03,60),o=qc(),a=Math.min(8,i.capabilities.getMaxAnisotropy());for(let X in o)o[X].isTexture&&(o[X].anisotropy=a);let c=X=>new ci({vertexColors:!0,...X}),h=X=>new Xt(X,X),u={wood:c({map:o.wood,normalMap:o.woodN,normalScale:h(.7),roughness:.68}),floor:c({map:o.floor,normalMap:o.floorN,normalScale:h(.8),roughness:.62}),plaster:c({map:o.plaster,normalMap:o.plasterN,normalScale:h(.6),roughness:.95}),fabric:c({map:o.weave,normalMap:o.weaveN,normalScale:h(.9),roughness:.93,side:be}),knit:c({map:o.knit,normalMap:o.knitN,normalScale:h(1),roughness:.98,side:be}),quilt:c({map:o.quilt,normalMap:o.quiltN,normalScale:h(1),roughness:.9,side:be}),leather:c({map:o.leather,normalMap:o.leatherN,normalScale:h(.7),roughness:.55,side:be}),cork:c({map:o.leather,normalMap:o.leatherN,normalScale:h(1.5),roughness:.95}),paper:c({map:o.parch,roughness:.85,side:be}),map:c({map:o.map,roughness:.82,side:be}),notes:c({map:o.notes,roughness:.85,side:be}),tapestry:c({map:o.tap,normalMap:o.tapN,roughness:.95}),brass:c({metalness:1,roughness:.34,normalMap:o.leatherN,normalScale:h(.15)}),iron:c({metalness:.75,roughness:.55,map:o.leather}),ceramic:c({roughness:.28}),stone:c({roughness:.85,map:o.plaster,normalMap:o.plasterN}),wax:c({roughness:.55,emissive:2759176}),feather:c({map:o.feather,alphaTest:.5,roughness:.8,side:be}),rug:c({map:o.rug,normalMap:o.weaveN,normalScale:h(.8),alphaTest:.5,roughness:.97}),mirror:c({metalness:1,roughness:.12,color:12106940}),glass:c({roughness:.05,transparent:!0,opacity:.16,depthWrite:!1}),glow:new pn({vertexColors:!0,toneMapped:!1}),sky:new pn({map:o.sky,vertexColors:!0}),blob:new pn({map:o.blob,color:0,transparent:!0,opacity:.45,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2})};u.sky.color.setScalar(1.15),ch();let d=nh(u,n);n.add(new Sr(13622511,8018492,.5));let l=new L(-1,-.42,-.45).normalize(),f=new wr(16765082,5.2),g=new Re;g.position.set(.4,1,-.9),n.add(g),f.target=g,f.position.copy(g.position).addScaledVector(l,-16),f.castShadow=!0,f.shadow.mapSize.set(2048,2048),Object.assign(f.shadow.camera,{left:-6.8,right:6.8,top:4.5,bottom:-4.5,near:4,far:30}),f.shadow.camera.updateProjectionMatrix(),f.shadow.bias=-4e-4,f.shadow.normalBias=.025,f.shadow.radius=3,n.add(f);let _=[],m=(X,ct,nt,It,Ft,Ut)=>{let P=new fi(X,ct,nt,2);return P.position.set(It,Ft,Ut),n.add(P),_.push({l:P,base:ct,ph:te()*10}),P};m(16754768,2.4,6.5,1.42,.82,-2.06),m(16752714,2,6,3.56,1.28,-2.1),m(16756832,3,6,-3.72,2.42,-.6);let p=new fi(16763030,1,6,2);p.position.set(-1.7,.6,.2),n.add(p);let E=new tn({transparent:!0,depthWrite:!1,blending:ls,side:be,uniforms:{uCol:{value:new Wt(1,.78,.5)},uI:{value:.05}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uCol; uniform float uI; varying vec2 vUv; void main(){ float a = uI * pow(1.0 - vUv.y, 1.7) * smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x); gl_FragColor = vec4(uCol, a); }"}),S=[];for(let X of ll){let ct=X.L,nt=[[X.x,X.y0,X.z0],[X.x,X.y0,X.z1],[X.x,X.y1,X.z1],[X.x,X.y1,X.z0]].map(wt=>new L(...wt)),It=[],Ft=[],Ut=(wt,Lt)=>{let Rt=wt.clone().addScaledVector(l,ct),Zt=Lt.clone().addScaledVector(l,ct);It.push(...wt.toArray(),...Lt.toArray(),...Rt.toArray(),...Lt.toArray(),...Zt.toArray(),...Rt.toArray()),Ft.push(0,0,1,0,0,1,1,0,1,1,0,1)};for(let wt=0;wt<4;wt++)Ut(nt[wt],nt[(wt+1)%4]);Ut(nt[0],nt[2]),Ut(nt[1],nt[3]);let P=new we;P.setAttribute("position",new pe(It,3)),P.setAttribute("uv",new pe(Ft,2));let Qt=new le(P,E);Qt.renderOrder=2,n.add(Qt);for(let wt=0;wt<160;wt++){let Lt=nt[0].clone().lerp(nt[1],te()).add(new L(0,(X.y1-X.y0)*te(),0)).addScaledVector(l,ct*.75*Math.pow(te(),.8)+.1);S.push(Lt.x,Lt.y,Lt.z,te()*10)}}let T=S.length/4,I=new Float32Array(T*3),R=new we;R.setAttribute("position",new de(I,3));let C=new _r(R,new fs({size:.012,map:o.mote,color:16769712,transparent:!0,opacity:.75,depthWrite:!1,blending:ls}));C.frustumCulled=!1,n.add(C);let N=1.62,J=.24,x={Digit1:[1.45,1.95,.42,-.08],Digit2:[1.05,-1.25,-.35,-.5],Digit3:[-3.7,.3,0,-.12],Digit4:[4.5,-1.05,.12,-.62],Digit5:[3.35,-.95,1.5,-.08]},y={x:0,z:0,yaw:0,pitch:0,vx:0,vz:0,eye:N,crouch:!1};function H(X){y.x=X[0],y.z=X[1],y.yaw=X[2],y.pitch=X[3],y.vx=y.vz=0,y.eye=Nr(y.x,y.z)+(y.crouch?1.05:N)}H(x.Digit1);let B={},G=!1;addEventListener("keydown",X=>{B[X.code]=!0,["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(X.code)&&X.preventDefault(),X.code==="KeyR"&&(y.crouch=!1,H(x.Digit1)),x[X.code]&&H(x[X.code]),X.code==="KeyC"&&(y.crouch=!y.crouch),X.code==="KeyF"&&(Hr.style.display=Hr.style.display==="block"?"none":"block"),X.code==="KeyH"&&(uh.style.display=uh.style.display==="none"?"block":"none"),X.code==="BracketLeft"&&(i.toneMappingExposure=Math.max(.4,i.toneMappingExposure-.1)),X.code==="BracketRight"&&(i.toneMappingExposure=Math.min(2.5,i.toneMappingExposure+.1))}),addEventListener("keyup",X=>{B[X.code]=!1}),addEventListener("blur",()=>{for(let X in B)B[X]=!1});let K=i.domElement,V=()=>{if(K.requestPointerLock){let X=K.requestPointerLock();X&&X.catch&&X.catch(()=>{})}};cl.addEventListener("click",()=>{V(),setTimeout(()=>{G||(hh.style.display="none")},500)}),K.addEventListener("click",()=>{G||V()}),document.addEventListener("pointerlockchange",()=>{G=document.pointerLockElement===K,hh.style.display=G?"none":"flex"});let et=!1;K.addEventListener("mousedown",()=>{et=!0}),addEventListener("mouseup",()=>{et=!1}),addEventListener("mousemove",X=>{if(!G&&!et)return;let ct=Math.max(-200,Math.min(200,X.movementX||0)),nt=Math.max(-200,Math.min(200,X.movementY||0));y.yaw-=ct*.0022,y.pitch=Math.max(-1.45,Math.min(1.45,y.pitch-nt*.0022))});function W(){for(let X=0;X<3;X++)for(let ct of kr){let nt=Math.max(ct.x0,Math.min(y.x,ct.x1)),It=Math.max(ct.z0,Math.min(y.z,ct.z1)),Ft=y.x-nt,Ut=y.z-It,P=Ft*Ft+Ut*Ut;if(!(P>=J*J))if(P>1e-10){let Qt=Math.sqrt(P),wt=(J-Qt)/Qt;y.x+=Ft*wt,y.z+=Ut*wt}else{let Qt=[y.x-ct.x0,ct.x1-y.x,y.z-ct.z0,ct.z1-y.z],wt=Math.min(...Qt),Lt=Qt.indexOf(wt);Lt===0?y.x=ct.x0-J:Lt===1?y.x=ct.x1+J:Lt===2?y.z=ct.z0-J:y.z=ct.z1+J}}}function ut(X){let ct=(B.KeyW||B.ArrowUp?1:0)-(B.KeyS||B.ArrowDown?1:0),nt=(B.KeyD?1:0)-(B.KeyA?1:0),It=(B.ArrowLeft?1:0)-(B.ArrowRight?1:0);y.yaw+=It*1.9*X;let Ft=Math.sin(y.yaw),Ut=Math.cos(y.yaw),P=-Ft*ct+Ut*nt,Qt=-Ut*ct-Ft*nt,wt=Math.hypot(P,Qt);wt>0&&(P/=wt,Qt/=wt);let Lt=(B.ShiftLeft||B.ShiftRight?2.7:1.45)*(y.crouch?.6:1),Rt=1-Math.exp(-X*11);y.vx+=(P*Lt-y.vx)*Rt,y.vz+=(Qt*Lt-y.vz)*Rt;let Zt=Math.max(1,Math.ceil(Math.hypot(y.vx,y.vz)*X/.08));for(let A=0;A<Zt;A++)y.x+=y.vx*X/Zt,y.z+=y.vz*X/Zt,W();let Pt=Nr(y.x,y.z)+(y.crouch?1.05:N);y.eye+=(Pt-y.eye)*(1-Math.exp(-X*12)),r.position.set(y.x,y.eye,y.z),r.rotation.set(y.pitch,y.yaw,0,"YXZ")}addEventListener("resize",()=>{r.aspect=innerWidth/innerHeight,r.updateProjectionMatrix(),i.setSize(innerWidth,innerHeight)}),ut(.016),i.shadowMap.needsUpdate=!0,i.compile(n,r),hl.textContent="Ready.",cl.disabled=!1,cl.textContent="Click to explore";let ft=new Er,dt=0,qt=0,Yt=0,$=0,tt=0,_t=[];i.setAnimationLoop(()=>{let X=ft.getDelta(),ct=Math.min(X,.05);tt+=ct,ut(ct);for(let nt of _)nt.l.intensity=nt.base*(.94+.04*Math.sin(tt*7.3+nt.ph)+.02*Math.sin(tt*17.1+nt.ph*2));for(let nt=0;nt<T;nt++){let It=S[nt*4+3];I[nt*3]=S[nt*4]+Math.sin(tt*.21+It)*.06,I[nt*3+1]=S[nt*4+1]+Math.sin(tt*.13+It*1.7)*.08,I[nt*3+2]=S[nt*4+2]+Math.cos(tt*.17+It)*.06}if(R.attributes.position.needsUpdate=!0,i.render(n,r),dt+=X,qt++,Yt=Math.max(Yt,X),_t.push(X*1e3),_t.length>240&&_t.shift(),dt>=1){let nt=dt/qt*1e3;if(Hr.style.display==="block"){let It=[..._t].sort((Ut,P)=>Ut-P),Ft=It[Math.floor(It.length*.95)]||0;Hr.textContent=`${(qt/dt).toFixed(0)} fps | avg ${nt.toFixed(1)} ms | p95 ${Ft.toFixed(1)} ms | worst ${(Yt*1e3).toFixed(1)} ms
draw calls ${i.info.render.calls} | tris ${(i.info.render.triangles/1e3).toFixed(0)}k | pixel ratio ${e.toFixed(2)} | exposure ${i.toneMappingExposure.toFixed(2)}`}$=nt>24?$+1:0,$>=2&&e>.75&&(e=Math.max(.75,e-.25),i.setPixelRatio(e),$=0),dt=0,qt=0,Yt=0}}),console.info(`[rooms] ${d.meshes.length} merged meshes, ${(d.tris/1e3).toFixed(0)}k triangles, ${kr.length} colliders`)}hl.textContent="Building the rooms\u2026";setTimeout(()=>{try{Cm()}catch(i){console.error(i),hl.textContent="Failed to start: "+i.message}},30);})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/

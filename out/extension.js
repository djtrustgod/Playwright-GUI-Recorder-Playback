"use strict";var Os=Object.create;var Tt=Object.defineProperty;var Us=Object.getOwnPropertyDescriptor;var Fs=Object.getOwnPropertyNames;var qs=Object.getPrototypeOf,js=Object.prototype.hasOwnProperty;var ee=(c,t)=>()=>(c&&(t=c(c=0)),t);var te=(c,t)=>()=>(t||c((t={exports:{}}).exports,t),t.exports),Un=(c,t)=>{for(var i in t)Tt(c,i,{get:t[i],enumerable:!0})},Fn=(c,t,i,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Fs(t))!js.call(c,l)&&l!==i&&Tt(c,l,{get:()=>t[l],enumerable:!(s=Us(t,l))||s.enumerable});return c};var M=(c,t,i)=>(i=c!=null?Os(qs(c)):{},Fn(t||!c||!c.__esModule?Tt(i,"default",{value:c,enumerable:!0}):i,c)),St=c=>Fn(Tt({},"__esModule",{value:!0}),c);var qn=te((Mt,Me)=>{var Dt=void 0,$t=function(c){return Dt||(Dt=new Promise(function(t,i){var s=typeof c<"u"?c:{},l=s.onAbort;s.onAbort=function(e){i(new Error(e)),l&&l(e)},s.postRun=s.postRun||[],s.postRun.push(function(){t(s)}),Me=void 0;var o;o||=typeof s<"u"?s:{};var p=!!globalThis.window,f=!!globalThis.WorkerGlobalScope,b=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";o.onRuntimeInitialized=function(){function e(d,m){switch(typeof m){case"boolean":Ms(d,m?1:0);break;case"number":Ns(d,m);break;case"string":Ds(d,m,-1,-1);break;case"object":if(m===null)$n(d);else if(m.length!=null){var v=vt(m.length);K.set(m,v),$s(d,v,m.length,-1),rt(v)}else _t(d,"Wrong API use : tried to return a value of an unknown type ("+m+").",-1);break;default:$n(d)}}function r(d,m){for(var v=[],w=0;w<d;w+=1){var A=me(m+4*w,"i32"),D=Rs(A);if(D===1||D===2)A=Ls(A);else if(D===3)A=Is(A);else if(D===4){D=A,A=As(D),D=Ps(D);for(var ce=new Uint8Array(A),oe=0;oe<A;oe+=1)ce[oe]=K[D+oe];A=ce}else A=null;v.push(A)}return v}function n(d,m){this.Qa=d,this.db=m,this.Oa=1,this.lb=[]}function a(d,m){if(this.db=m,this.eb=bt(d),this.eb===null)throw Error("Unable to allocate memory for the SQL string");this.kb=this.eb,this.Za=this.qb=null}function u(d){if(this.filename="dbfile_"+(4294967295*Math.random()>>>0),d!=null){var m=this.filename,v="/",w=m;if(v&&(v=typeof v=="string"?v:mr(v),w=m?pr(v+"/"+m):v),m=sn(!0,!0),w=rs(w,m),d){if(typeof d=="string"){v=Array(d.length);for(var A=0,D=d.length;A<D;++A)v[A]=d.charCodeAt(A);d=v}gt(w,m|146),v=Ve(w,577),xn(v,d,0,d.length,0),Er(v),gt(w,m)}}this.handleError(_(this.filename,h)),this.db=me(h,"i32"),Cn(this.db),this.fb={},this.Sa={}}var h=De(4),g=o.cwrap,_=g("sqlite3_open","number",["string","number"]),N=g("sqlite3_close_v2","number",["number"]),k=g("sqlite3_exec","number",["number","string","number","number","number"]),q=g("sqlite3_changes","number",["number"]),X=g("sqlite3_prepare_v2","number",["number","string","number","number","number"]),In=g("sqlite3_sql","string",["number"]),us=g("sqlite3_normalized_sql","string",["number"]),Pn=g("sqlite3_prepare_v2","number",["number","number","number","number","number"]),ds=g("sqlite3_bind_text","number",["number","number","number","number","number"]),Ln=g("sqlite3_bind_blob","number",["number","number","number","number","number"]),ps=g("sqlite3_bind_double","number",["number","number","number"]),hs=g("sqlite3_bind_int","number",["number","number","number"]),gs=g("sqlite3_bind_parameter_index","number",["number","string"]),ms=g("sqlite3_step","number",["number"]),fs=g("sqlite3_errmsg","string",["number"]),ys=g("sqlite3_column_count","number",["number"]),bs=g("sqlite3_data_count","number",["number"]),vs=g("sqlite3_column_double","number",["number","number"]),Nn=g("sqlite3_column_text","string",["number","number"]),ws=g("sqlite3_column_blob","number",["number","number"]),Es=g("sqlite3_column_bytes","number",["number","number"]),xs=g("sqlite3_column_type","number",["number","number"]),_s=g("sqlite3_column_name","string",["number","number"]),Ts=g("sqlite3_reset","number",["number"]),Ss=g("sqlite3_clear_bindings","number",["number"]),ks=g("sqlite3_finalize","number",["number"]),Dn=g("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),Rs=g("sqlite3_value_type","number",["number"]),As=g("sqlite3_value_bytes","number",["number"]),Is=g("sqlite3_value_text","string",["number"]),Ps=g("sqlite3_value_blob","number",["number"]),Ls=g("sqlite3_value_double","number",["number"]),Ns=g("sqlite3_result_double","",["number","number"]),$n=g("sqlite3_result_null","",["number"]),Ds=g("sqlite3_result_text","",["number","string","number","number"]),$s=g("sqlite3_result_blob","",["number","number","number","number"]),Ms=g("sqlite3_result_int","",["number","number"]),_t=g("sqlite3_result_error","",["number","string","number"]),Mn=g("sqlite3_aggregate_context","number",["number","number"]),Cn=g("RegisterExtensionFunctions","number",["number"]),On=g("sqlite3_update_hook","number",["number","number","number"]);n.prototype.bind=function(d){if(!this.Qa)throw"Statement closed";return this.reset(),Array.isArray(d)?this.Cb(d):d!=null&&typeof d=="object"?this.Db(d):!0},n.prototype.step=function(){if(!this.Qa)throw"Statement closed";this.Oa=1;var d=ms(this.Qa);switch(d){case 100:return!0;case 101:return!1;default:throw this.db.handleError(d)}},n.prototype.wb=function(d){return d==null&&(d=this.Oa,this.Oa+=1),vs(this.Qa,d)},n.prototype.Gb=function(d){if(d==null&&(d=this.Oa,this.Oa+=1),d=Nn(this.Qa,d),typeof BigInt!="function")throw Error("BigInt is not supported");return BigInt(d)},n.prototype.Hb=function(d){return d==null&&(d=this.Oa,this.Oa+=1),Nn(this.Qa,d)},n.prototype.getBlob=function(d){d==null&&(d=this.Oa,this.Oa+=1);var m=Es(this.Qa,d);d=ws(this.Qa,d);for(var v=new Uint8Array(m),w=0;w<m;w+=1)v[w]=K[d+w];return v},n.prototype.get=function(d,m){m=m||{},d!=null&&this.bind(d)&&this.step(),d=[];for(var v=bs(this.Qa),w=0;w<v;w+=1)switch(xs(this.Qa,w)){case 1:var A=m.useBigInt?this.Gb(w):this.wb(w);d.push(A);break;case 2:d.push(this.wb(w));break;case 3:d.push(this.Hb(w));break;case 4:d.push(this.getBlob(w));break;default:d.push(null)}return d},n.prototype.getColumnNames=function(){for(var d=[],m=ys(this.Qa),v=0;v<m;v+=1)d.push(_s(this.Qa,v));return d},n.prototype.getAsObject=function(d,m){d=this.get(d,m),m=this.getColumnNames();for(var v={},w=0;w<m.length;w+=1)v[m[w]]=d[w];return v},n.prototype.getSQL=function(){return In(this.Qa)},n.prototype.getNormalizedSQL=function(){return us(this.Qa)},n.prototype.run=function(d){return d!=null&&this.bind(d),this.step(),this.reset()},n.prototype.tb=function(d,m){m==null&&(m=this.Oa,this.Oa+=1),d=bt(d),this.lb.push(d),this.db.handleError(ds(this.Qa,m,d,-1,0))},n.prototype.Bb=function(d,m){m==null&&(m=this.Oa,this.Oa+=1);var v=vt(d.length);K.set(d,v),this.lb.push(v),this.db.handleError(Ln(this.Qa,m,v,d.length,0))},n.prototype.sb=function(d,m){m==null&&(m=this.Oa,this.Oa+=1),this.db.handleError((d===(d|0)?hs:ps)(this.Qa,m,d))},n.prototype.Eb=function(d){d==null&&(d=this.Oa,this.Oa+=1),Ln(this.Qa,d,0,0,0)},n.prototype.ub=function(d,m){switch(m==null&&(m=this.Oa,this.Oa+=1),typeof d){case"string":this.tb(d,m);return;case"number":this.sb(d,m);return;case"bigint":this.tb(d.toString(),m);return;case"boolean":this.sb(d+0,m);return;case"object":if(d===null){this.Eb(m);return}if(d.length!=null){this.Bb(d,m);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+d+")."},n.prototype.Db=function(d){var m=this;return Object.keys(d).forEach(function(v){var w=gs(m.Qa,v);w!==0&&m.ub(d[v],w)}),!0},n.prototype.Cb=function(d){for(var m=0;m<d.length;m+=1)this.ub(d[m],m+1);return!0},n.prototype.reset=function(){return this.freemem(),Ss(this.Qa)===0&&Ts(this.Qa)===0},n.prototype.freemem=function(){for(var d;(d=this.lb.pop())!==void 0;)rt(d)},n.prototype.free=function(){this.freemem();var d=ks(this.Qa)===0;return delete this.db.fb[this.Qa],this.Qa=0,d},a.prototype.next=function(){if(this.eb===null)return{done:!0};if(this.Za!==null&&(this.Za.free(),this.Za=null),!this.db.db)throw this.nb(),Error("Database closed");var d=Et(),m=De(4);Ge(h),Ge(m);try{this.db.handleError(Pn(this.db.db,this.kb,-1,h,m)),this.kb=me(m,"i32");var v=me(h,"i32");return v===0?(this.nb(),{done:!0}):(this.Za=new n(v,this.db),this.db.fb[v]=this.Za,{value:this.Za,done:!1})}catch(w){throw this.qb=V(this.kb),this.nb(),w}finally{wt(d)}},a.prototype.nb=function(){rt(this.eb),this.eb=null},a.prototype.getRemainingSQL=function(){return this.qb!==null?this.qb:V(this.kb)},typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"&&(a.prototype[Symbol.iterator]=function(){return this}),u.prototype.run=function(d,m){if(!this.db)throw"Database closed";if(m){d=this.prepare(d,m);try{d.step()}finally{d.free()}}else this.handleError(k(this.db,d,0,0,h));return this},u.prototype.exec=function(d,m,v){if(!this.db)throw"Database closed";var w=null,A=null,D=null;try{D=A=bt(d);var ce=De(4);for(d=[];me(D,"i8")!==0;){Ge(h),Ge(ce),this.handleError(Pn(this.db,D,-1,h,ce));var oe=me(h,"i32");if(D=me(ce,"i32"),oe!==0){var ie=null;for(w=new n(oe,this),m!=null&&w.bind(m);w.step();)ie===null&&(ie={columns:w.getColumnNames(),values:[]},d.push(ie)),ie.values.push(w.get(null,v));w.free()}}return d}catch(ue){throw w&&w.free(),ue}finally{A&&rt(A)}},u.prototype.each=function(d,m,v,w,A){typeof m=="function"&&(w=v,v=m,m=void 0),d=this.prepare(d,m);try{for(;d.step();)v(d.getAsObject(null,A))}finally{d.free()}if(typeof w=="function")return w()},u.prototype.prepare=function(d,m){if(Ge(h),this.handleError(X(this.db,d,-1,h,0)),d=me(h,"i32"),d===0)throw"Nothing to prepare";var v=new n(d,this);return m!=null&&v.bind(m),this.fb[d]=v},u.prototype.iterateStatements=function(d){return new a(d,this)},u.prototype.export=function(){Object.values(this.fb).forEach(function(m){m.free()}),Object.values(this.Sa).forEach(Ee),this.Sa={},this.handleError(N(this.db));var d=ns(this.filename);return this.handleError(_(this.filename,h)),this.db=me(h,"i32"),Cn(this.db),d},u.prototype.close=function(){this.db!==null&&(Object.values(this.fb).forEach(function(d){d.free()}),Object.values(this.Sa).forEach(Ee),this.Sa={},this.Ya&&(Ee(this.Ya),this.Ya=void 0),this.handleError(N(this.db)),yn("/"+this.filename),this.db=null)},u.prototype.handleError=function(d){if(d===0)return null;throw d=fs(this.db),Error(d)},u.prototype.getRowsModified=function(){return q(this.db)},u.prototype.create_function=function(d,m){Object.prototype.hasOwnProperty.call(this.Sa,d)&&(Ee(this.Sa[d]),delete this.Sa[d]);var v=tt(function(w,A,D){A=r(A,D);try{var ce=m.apply(null,A)}catch(oe){_t(w,oe,-1);return}e(w,ce)},"viii");return this.Sa[d]=v,this.handleError(Dn(this.db,d,m.length,1,0,v,0,0,0)),this},u.prototype.create_aggregate=function(d,m){var v=m.init||function(){return null},w=m.finalize||function(ie){return ie},A=m.step;if(!A)throw"An aggregate function must have a step function in "+d;var D={};Object.hasOwnProperty.call(this.Sa,d)&&(Ee(this.Sa[d]),delete this.Sa[d]),m=d+"__finalize",Object.hasOwnProperty.call(this.Sa,m)&&(Ee(this.Sa[m]),delete this.Sa[m]);var ce=tt(function(ie,ue,Ar){var $e=Mn(ie,1);Object.hasOwnProperty.call(D,$e)||(D[$e]=v()),ue=r(ue,Ar),ue=[D[$e]].concat(ue);try{D[$e]=A.apply(null,ue)}catch(Cs){delete D[$e],_t(ie,Cs,-1)}},"viii"),oe=tt(function(ie){var ue=Mn(ie,1);try{var Ar=w(D[ue])}catch($e){delete D[ue],_t(ie,$e,-1);return}e(ie,Ar),delete D[ue]},"vi");return this.Sa[d]=ce,this.Sa[m]=oe,this.handleError(Dn(this.db,d,A.length-1,1,0,0,ce,oe,0)),this},u.prototype.updateHook=function(d){return this.Ya&&(On(this.db,0,0),Ee(this.Ya),this.Ya=void 0),d?(this.Ya=tt(function(m,v,w,A,D){switch(v){case 18:m="insert";break;case 23:m="update";break;case 9:m="delete";break;default:throw"unknown operationCode in updateHook callback: "+v}if(w=V(w),A=V(A),D>Number.MAX_SAFE_INTEGER)throw"rowId too big to fit inside a Number";d(m,w,A,Number(D))},"viiiij"),On(this.db,this.Ya,0),this):this},o.Database=u};var S="./this.program",R=(e,r)=>{throw r},C=globalThis.document?.currentScript?.src;typeof __filename<"u"?C=__filename:f&&(C=self.location.href);var P="",J,$;if(b){var E=require("node:fs");P=__dirname+"/",$=e=>(e=Ue(e)?new URL(e):e,E.readFileSync(e)),J=async e=>(e=Ue(e)?new URL(e):e,E.readFileSync(e,void 0)),1<process.argv.length&&(S=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),typeof Me<"u"&&(Me.exports=o),R=(e,r)=>{throw process.exitCode=e,r}}else if(p||f){try{P=new URL(".",C).href}catch{}f&&($=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}),J=async e=>{if(Ue(e))return new Promise((n,a)=>{var u=new XMLHttpRequest;u.open("GET",e,!0),u.responseType="arraybuffer",u.onload=()=>{u.status==200||u.status==0&&u.response?n(u.response):a(u.status)},u.onerror=a,u.send(null)});var r=await fetch(e,{credentials:"same-origin"});if(r.ok)return r.arrayBuffer();throw Error(r.status+" : "+r.url)}}var x=console.log.bind(console),I=console.error.bind(console),L,O=!1,Y,Ue=e=>e.startsWith("file://"),K,Q,ze,j,U,lr,cr,le;function Xr(){var e=xt.buffer;K=new Int8Array(e),ze=new Int16Array(e),Q=new Uint8Array(e),new Uint16Array(e),j=new Int32Array(e),U=new Uint32Array(e),lr=new Float32Array(e),cr=new Float64Array(e),le=new BigInt64Array(e),new BigUint64Array(e)}function Fe(e){throw o.onAbort?.(e),e="Aborted("+e+")",I(e),O=!0,new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info.")}var ur;async function Bi(e){if(!L)try{var r=await J(e);return new Uint8Array(r)}catch{}if(e==ur&&L)e=new Uint8Array(L);else if($)e=$(e);else throw"both async and sync fetching of the wasm failed";return e}async function Vi(e,r){try{var n=await Bi(e);return await WebAssembly.instantiate(n,r)}catch(a){I(`failed to asynchronously prepare wasm: ${a}`),Fe(a)}}async function Hi(e){var r=ur;if(!L&&!Ue(r)&&!b)try{var n=fetch(r,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(n,e)}catch(a){I(`wasm streaming compile failed: ${a}`),I("falling back to ArrayBuffer instantiation")}return Vi(r,e)}class dr{name="ExitStatus";constructor(r){this.message=`Program terminated with exit(${r})`,this.status=r}}var Wr=e=>{for(;0<e.length;)e.shift()(o)},zr=[],Yr=[],Ki=()=>{var e=o.preRun.shift();Yr.push(e)},Ie=0,Ye=null;function me(e,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":return K[e];case"i8":return K[e];case"i16":return ze[e>>1];case"i32":return j[e>>2];case"i64":return le[e>>3];case"float":return lr[e>>2];case"double":return cr[e>>3];case"*":return U[e>>2];default:Fe(`invalid type for getValue: ${r}`)}}var ct=!0;function Ge(e){var r="i32";switch(r.endsWith("*")&&(r="*"),r){case"i1":K[e]=0;break;case"i8":K[e]=0;break;case"i16":ze[e>>1]=0;break;case"i32":j[e>>2]=0;break;case"i64":le[e>>3]=BigInt(0);break;case"float":lr[e>>2]=0;break;case"double":cr[e>>3]=0;break;case"*":U[e>>2]=0;break;default:Fe(`invalid type for setValue: ${r}`)}}var Gr=new TextDecoder,Qr=(e,r,n,a)=>{if(n=r+n,a)return n;for(;e[r]&&!(r>=n);)++r;return r},V=(e,r,n)=>e?Gr.decode(Q.subarray(e,Qr(Q,e,r,n))):"",Zr=(e,r)=>{for(var n=0,a=e.length-1;0<=a;a--){var u=e[a];u==="."?e.splice(a,1):u===".."?(e.splice(a,1),n++):n&&(e.splice(a,1),n--)}if(r)for(;n;n--)e.unshift("..");return e},pr=e=>{var r=e.charAt(0)==="/",n=e.slice(-1)==="/";return(e=Zr(e.split("/").filter(a=>!!a),!r).join("/"))||r||(e="."),e&&n&&(e+="/"),(r?"/":"")+e},en=e=>{var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);return e=r[0],r=r[1],!e&&!r?".":(r&&=r.slice(0,-1),e+r)},ut=e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],Ji=()=>{if(b){var e=require("node:crypto");return r=>e.randomFillSync(r)}return r=>crypto.getRandomValues(r)},tn=e=>{(tn=Ji())(e)},Xi=(...e)=>{for(var r="",n=!1,a=e.length-1;-1<=a&&!n;a--){if(n=0<=a?e[a]:"/",typeof n!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!n)return"";r=n+"/"+r,n=n.charAt(0)==="/"}return r=Zr(r.split("/").filter(u=>!!u),!n).join("/"),(n?"/":"")+r||"."},Qe=e=>{var r=Qr(e,0);return Gr.decode(e.buffer?e.subarray(0,r):new Uint8Array(e.slice(0,r)))},hr=[],qe=e=>{for(var r=0,n=0;n<e.length;++n){var a=e.charCodeAt(n);127>=a?r++:2047>=a?r+=2:55296<=a&&57343>=a?(r+=4,++n):r+=3}return r},pe=(e,r,n,a)=>{if(!(0<a))return 0;var u=n;a=n+a-1;for(var h=0;h<e.length;++h){var g=e.codePointAt(h);if(127>=g){if(n>=a)break;r[n++]=g}else if(2047>=g){if(n+1>=a)break;r[n++]=192|g>>6,r[n++]=128|g&63}else if(65535>=g){if(n+2>=a)break;r[n++]=224|g>>12,r[n++]=128|g>>6&63,r[n++]=128|g&63}else{if(n+3>=a)break;r[n++]=240|g>>18,r[n++]=128|g>>12&63,r[n++]=128|g>>6&63,r[n++]=128|g&63,h++}}return r[n]=0,n-u},rn=[];function nn(e,r){rn[e]={input:[],output:[],cb:r},vr(e,Wi)}var Wi={open(e){var r=rn[e.node.rdev];if(!r)throw new y(43);e.tty=r,e.seekable=!1},close(e){e.tty.cb.fsync(e.tty)},fsync(e){e.tty.cb.fsync(e.tty)},read(e,r,n,a){if(!e.tty||!e.tty.cb.xb)throw new y(60);for(var u=0,h=0;h<a;h++){try{var g=e.tty.cb.xb(e.tty)}catch{throw new y(29)}if(g===void 0&&u===0)throw new y(6);if(g==null)break;u++,r[n+h]=g}return u&&(e.node.atime=Date.now()),u},write(e,r,n,a){if(!e.tty||!e.tty.cb.rb)throw new y(60);try{for(var u=0;u<a;u++)e.tty.cb.rb(e.tty,r[n+u])}catch{throw new y(29)}return a&&(e.node.mtime=e.node.ctime=Date.now()),u}},zi={xb(){e:{if(!hr.length){var e=null;if(b){var r=Buffer.alloc(256),n=0,a=process.stdin.fd;try{n=E.readSync(a,r,0,256)}catch(u){if(u.toString().includes("EOF"))n=0;else throw u}0<n&&(e=r.slice(0,n).toString("utf-8"))}else globalThis.window?.prompt&&(e=window.prompt("Input: "),e!==null&&(e+=`
`));if(!e){e=null;break e}r=Array(qe(e)+1),e=pe(e,r,0,r.length),r.length=e,hr=r}e=hr.shift()}return e},rb(e,r){r===null||r===10?(x(Qe(e.output)),e.output=[]):r!=0&&e.output.push(r)},fsync(e){0<e.output?.length&&(x(Qe(e.output)),e.output=[])},Tb(){return{Ob:25856,Qb:5,Nb:191,Pb:35387,Mb:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ub(){return 0},Vb(){return[24,80]}},Yi={rb(e,r){r===null||r===10?(I(Qe(e.output)),e.output=[]):r!=0&&e.output.push(r)},fsync(e){0<e.output?.length&&(I(Qe(e.output)),e.output=[])}},T={Wa:null,Xa(){return T.createNode(null,"/",16895,0)},createNode(e,r,n,a){if((n&61440)===24576||(n&61440)===4096)throw new y(63);return T.Wa||(T.Wa={dir:{node:{Ta:T.La.Ta,Ua:T.La.Ua,lookup:T.La.lookup,hb:T.La.hb,rename:T.La.rename,unlink:T.La.unlink,rmdir:T.La.rmdir,readdir:T.La.readdir,symlink:T.La.symlink},stream:{Va:T.Ma.Va}},file:{node:{Ta:T.La.Ta,Ua:T.La.Ua},stream:{Va:T.Ma.Va,read:T.Ma.read,write:T.Ma.write,ib:T.Ma.ib,jb:T.Ma.jb}},link:{node:{Ta:T.La.Ta,Ua:T.La.Ua,readlink:T.La.readlink},stream:{}},vb:{node:{Ta:T.La.Ta,Ua:T.La.Ua},stream:ts}}),n=un(e,r,n,a),re(n.mode)?(n.La=T.Wa.dir.node,n.Ma=T.Wa.dir.stream,n.Na={}):(n.mode&61440)===32768?(n.La=T.Wa.file.node,n.Ma=T.Wa.file.stream,n.Ra=0,n.Na=null):(n.mode&61440)===40960?(n.La=T.Wa.link.node,n.Ma=T.Wa.link.stream):(n.mode&61440)===8192&&(n.La=T.Wa.vb.node,n.Ma=T.Wa.vb.stream),n.atime=n.mtime=n.ctime=Date.now(),e&&(e.Na[r]=n,e.atime=e.mtime=e.ctime=n.atime),n},Sb(e){return e.Na?e.Na.subarray?e.Na.subarray(0,e.Ra):new Uint8Array(e.Na):new Uint8Array(0)},La:{Ta(e){var r={};return r.dev=(e.mode&61440)===8192?e.id:1,r.ino=e.id,r.mode=e.mode,r.nlink=1,r.uid=0,r.gid=0,r.rdev=e.rdev,re(e.mode)?r.size=4096:(e.mode&61440)===32768?r.size=e.Ra:(e.mode&61440)===40960?r.size=e.link.length:r.size=0,r.atime=new Date(e.atime),r.mtime=new Date(e.mtime),r.ctime=new Date(e.ctime),r.blksize=4096,r.blocks=Math.ceil(r.size/r.blksize),r},Ua(e,r){for(var n of["mode","atime","mtime","ctime"])r[n]!=null&&(e[n]=r[n]);r.size!==void 0&&(r=r.size,e.Ra!=r&&(r==0?(e.Na=null,e.Ra=0):(n=e.Na,e.Na=new Uint8Array(r),n&&e.Na.set(n.subarray(0,Math.min(r,e.Ra))),e.Ra=r)))},lookup(){throw T.mb||(T.mb=new y(44),T.mb.stack="<generic error, no stack>"),T.mb},hb(e,r,n,a){return T.createNode(e,r,n,a)},rename(e,r,n){try{var a=Pe(r,n)}catch{}if(a){if(re(e.mode))for(var u in a.Na)throw new y(55);yr(a)}delete e.parent.Na[e.name],r.Na[n]=e,e.name=n,r.ctime=r.mtime=e.parent.ctime=e.parent.mtime=Date.now()},unlink(e,r){delete e.Na[r],e.ctime=e.mtime=Date.now()},rmdir(e,r){var n=Pe(e,r),a;for(a in n.Na)throw new y(55);delete e.Na[r],e.ctime=e.mtime=Date.now()},readdir(e){return[".","..",...Object.keys(e.Na)]},symlink(e,r,n){return e=T.createNode(e,r,41471,0),e.link=n,e},readlink(e){if((e.mode&61440)!==40960)throw new y(28);return e.link}},Ma:{read(e,r,n,a,u){var h=e.node.Na;if(u>=e.node.Ra)return 0;if(e=Math.min(e.node.Ra-u,a),8<e&&h.subarray)r.set(h.subarray(u,u+e),n);else for(a=0;a<e;a++)r[n+a]=h[u+a];return e},write(e,r,n,a,u,h){if(r.buffer===K.buffer&&(h=!1),!a)return 0;if(e=e.node,e.mtime=e.ctime=Date.now(),r.subarray&&(!e.Na||e.Na.subarray)){if(h)return e.Na=r.subarray(n,n+a),e.Ra=a;if(e.Ra===0&&u===0)return e.Na=r.slice(n,n+a),e.Ra=a;if(u+a<=e.Ra)return e.Na.set(r.subarray(n,n+a),u),a}h=u+a;var g=e.Na?e.Na.length:0;if(g>=h||(h=Math.max(h,g*(1048576>g?2:1.125)>>>0),g!=0&&(h=Math.max(h,256)),g=e.Na,e.Na=new Uint8Array(h),0<e.Ra&&e.Na.set(g.subarray(0,e.Ra),0)),e.Na.subarray&&r.subarray)e.Na.set(r.subarray(n,n+a),u);else for(h=0;h<a;h++)e.Na[u+h]=r[n+h];return e.Ra=Math.max(e.Ra,u+a),a},Va(e,r,n){if(n===1?r+=e.position:n===2&&(e.node.mode&61440)===32768&&(r+=e.node.Ra),0>r)throw new y(28);return r},ib(e,r,n,a,u){if((e.node.mode&61440)!==32768)throw new y(43);if(e=e.node.Na,u&2||!e||e.buffer!==K.buffer){u=!0,a=65536*Math.ceil(r/65536);var h=Rn(65536,a);if(h&&Q.fill(0,h,h+a),a=h,!a)throw new y(48);e&&((0<n||n+r<e.length)&&(e.subarray?e=e.subarray(n,n+r):e=Array.prototype.slice.call(e,n,n+r)),K.set(e,a))}else u=!1,a=e.byteOffset;return{Kb:a,Ab:u}},jb(e,r,n,a){return T.Ma.write(e,r,0,a,n,!1),0}}},sn=(e,r)=>{var n=0;return e&&(n|=365),r&&(n|=146),n},gr=null,on={},je=[],Gi=1,ve=null,an=!1,ln=!0,cn={},y=class{name="ErrnoError";constructor(e){this.Pa=e}},Qi=class{gb={};node=null;get flags(){return this.gb.flags}set flags(e){this.gb.flags=e}get position(){return this.gb.position}set position(e){this.gb.position=e}},Zi=class{La={};Ma={};ab=null;constructor(e,r,n,a){e||=this,this.parent=e,this.Xa=e.Xa,this.id=Gi++,this.name=r,this.mode=n,this.rdev=a,this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&365)===365}set read(e){e?this.mode|=365:this.mode&=-366}get write(){return(this.mode&146)===146}set write(e){e?this.mode|=146:this.mode&=-147}};function se(e,r={}){if(!e)throw new y(44);r.ob??(r.ob=!0),e.charAt(0)==="/"||(e="//"+e);var n=0;e:for(;40>n;n++){e=e.split("/").filter(_=>!!_);for(var a=gr,u="/",h=0;h<e.length;h++){var g=h===e.length-1;if(g&&r.parent)break;if(e[h]!==".")if(e[h]==="..")if(u=en(u),a===a.parent){e=u+"/"+e.slice(h+1).join("/"),n--;continue e}else a=a.parent;else{u=pr(u+"/"+e[h]);try{a=Pe(a,e[h])}catch(_){if(_?.Pa===44&&g&&r.Jb)return{path:u};throw _}if(!a.ab||g&&!r.ob||(a=a.ab.root),(a.mode&61440)===40960&&(!g||r.$a)){if(!a.La.readlink)throw new y(52);a=a.La.readlink(a),a.charAt(0)==="/"||(a=en(u)+"/"+a),e=a+"/"+e.slice(h+1).join("/");continue e}}}return{path:u,node:a}}throw new y(32)}function mr(e){for(var r;;){if(e===e.parent)return e=e.Xa.zb,r?e[e.length-1]!=="/"?`${e}/${r}`:e+r:e;r=r?`${e.name}/${r}`:e.name,e=e.parent}}function fr(e,r){for(var n=0,a=0;a<r.length;a++)n=(n<<5)-n+r.charCodeAt(a)|0;return(e+n>>>0)%ve.length}function yr(e){var r=fr(e.parent.id,e.name);if(ve[r]===e)ve[r]=e.bb;else for(r=ve[r];r;){if(r.bb===e){r.bb=e.bb;break}r=r.bb}}function Pe(e,r){var n=re(e.mode)?(n=Be(e,"x"))?n:e.La.lookup?0:2:54;if(n)throw new y(n);for(n=ve[fr(e.id,r)];n;n=n.bb){var a=n.name;if(n.parent.id===e.id&&a===r)return n}return e.La.lookup(e,r)}function un(e,r,n,a){return e=new Zi(e,r,n,a),r=fr(e.parent.id,e.name),e.bb=ve[r],ve[r]=e}function re(e){return(e&61440)===16384}function dn(e){var r=["r","w","rw"][e&3];return e&512&&(r+="w"),r}function Be(e,r){if(ln)return 0;if(!r.includes("r")||e.mode&292){if(r.includes("w")&&!(e.mode&146)||r.includes("x")&&!(e.mode&73))return 2}else return 2;return 0}function pn(e,r){if(!re(e.mode))return 54;try{return Pe(e,r),20}catch{}return Be(e,"wx")}function hn(e,r,n){try{var a=Pe(e,r)}catch(u){return u.Pa}if(e=Be(e,"wx"))return e;if(n){if(!re(a.mode))return 54;if(a===a.parent||mr(a)==="/")return 10}else if(re(a.mode))return 31;return 0}function dt(e){if(!e)throw new y(63);return e}function Z(e){if(e=je[e],!e)throw new y(8);return e}function gn(e,r=-1){if(e=Object.assign(new Qi,e),r==-1)e:{for(r=0;4096>=r;r++)if(!je[r])break e;throw new y(33)}return e.fd=r,je[r]=e}function es(e,r=-1){return e=gn(e,r),e.Ma?.Rb?.(e),e}function br(e,r,n){var a=e?.Ma.Ua;e=a?e:r,a??=r.La.Ua,dt(a),a(e,n)}var ts={open(e){e.Ma=on[e.node.rdev].Ma,e.Ma.open?.(e)},Va(){throw new y(70)}};function vr(e,r){on[e]={Ma:r}}function mn(e,r){var n=r==="/";if(n&&gr)throw new y(10);if(!n&&r){var a=se(r,{ob:!1});if(r=a.path,a=a.node,a.ab)throw new y(10);if(!re(a.mode))throw new y(54)}r={type:e,Wb:{},zb:r,Ib:[]},e=e.Xa(r),e.Xa=r,r.root=e,n?gr=e:a&&(a.ab=r,a.Xa&&a.Xa.Ib.push(r))}function pt(e,r,n){var a=se(e,{parent:!0}).node;if(e=ut(e),!e)throw new y(28);if(e==="."||e==="..")throw new y(20);var u=pn(a,e);if(u)throw new y(u);if(!a.La.hb)throw new y(63);return a.La.hb(a,e,r,n)}function rs(e,r=438){return pt(e,r&4095|32768,0)}function he(e,r=511){return pt(e,r&1023|16384,0)}function ht(e,r,n){typeof n>"u"&&(n=r,r=438),pt(e,r|8192,n)}function wr(e,r){if(!Xi(e))throw new y(44);var n=se(r,{parent:!0}).node;if(!n)throw new y(44);r=ut(r);var a=pn(n,r);if(a)throw new y(a);if(!n.La.symlink)throw new y(63);n.La.symlink(n,r,e)}function fn(e){var r=se(e,{parent:!0}).node;e=ut(e);var n=Pe(r,e),a=hn(r,e,!0);if(a)throw new y(a);if(!r.La.rmdir)throw new y(63);if(n.ab)throw new y(10);r.La.rmdir(r,e),yr(n)}function yn(e){var r=se(e,{parent:!0}).node;if(!r)throw new y(44);e=ut(e);var n=Pe(r,e),a=hn(r,e,!1);if(a)throw new y(a);if(!r.La.unlink)throw new y(63);if(n.ab)throw new y(10);r.La.unlink(r,e),yr(n)}function Ze(e,r){return e=se(e,{$a:!r}).node,dt(e.La.Ta)(e)}function bn(e,r,n,a){br(e,r,{mode:n&4095|r.mode&-4096,ctime:Date.now(),Fb:a})}function gt(e,r){e=typeof e=="string"?se(e,{$a:!0}).node:e,bn(null,e,r)}function vn(e,r,n){if(re(r.mode))throw new y(31);if((r.mode&61440)!==32768)throw new y(28);var a=Be(r,"w");if(a)throw new y(a);br(e,r,{size:n,timestamp:Date.now()})}function Ve(e,r,n=438){if(e==="")throw new y(44);if(typeof r=="string"){var a={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[r];if(typeof a>"u")throw Error(`Unknown file open mode: ${r}`);r=a}if(n=r&64?n&4095|32768:0,typeof e=="object")a=e;else{var u=e.endsWith("/");e=se(e,{$a:!(r&131072),Jb:!0}),a=e.node,e=e.path}var h=!1;if(r&64)if(a){if(r&128)throw new y(20)}else{if(u)throw new y(31);a=pt(e,n|511,0),h=!0}if(!a)throw new y(44);if((a.mode&61440)===8192&&(r&=-513),r&65536&&!re(a.mode))throw new y(54);if(!h&&(u=a?(a.mode&61440)===40960?32:re(a.mode)&&(dn(r)!=="r"||r&576)?31:Be(a,dn(r)):44))throw new y(u);return r&512&&!h&&(u=a,u=typeof u=="string"?se(u,{$a:!0}).node:u,vn(null,u,0)),r&=-131713,u=gn({node:a,path:mr(a),flags:r,seekable:!0,position:0,Ma:a.Ma,Lb:[],error:!1}),u.Ma.open&&u.Ma.open(u),h&&gt(a,n&511),!o.logReadFiles||r&1||e in cn||(cn[e]=1),u}function Er(e){if(e.fd===null)throw new y(8);e.pb&&(e.pb=null);try{e.Ma.close&&e.Ma.close(e)}catch(r){throw r}finally{je[e.fd]=null}e.fd=null}function wn(e,r,n){if(e.fd===null)throw new y(8);if(!e.seekable||!e.Ma.Va)throw new y(70);if(n!=0&&n!=1&&n!=2)throw new y(28);e.position=e.Ma.Va(e,r,n),e.Lb=[]}function En(e,r,n,a,u){if(0>a||0>u)throw new y(28);if(e.fd===null)throw new y(8);if((e.flags&2097155)===1)throw new y(8);if(re(e.node.mode))throw new y(31);if(!e.Ma.read)throw new y(28);var h=typeof u<"u";if(!h)u=e.position;else if(!e.seekable)throw new y(70);return r=e.Ma.read(e,r,n,a,u),h||(e.position+=r),r}function xn(e,r,n,a,u){if(0>a||0>u)throw new y(28);if(e.fd===null)throw new y(8);if(!(e.flags&2097155))throw new y(8);if(re(e.node.mode))throw new y(31);if(!e.Ma.write)throw new y(28);e.seekable&&e.flags&1024&&wn(e,0,2);var h=typeof u<"u";if(!h)u=e.position;else if(!e.seekable)throw new y(70);return r=e.Ma.write(e,r,n,a,u,void 0),h||(e.position+=r),r}function ns(e){var r=r||0,n="binary";n!=="utf8"&&n!=="binary"&&Fe(`Invalid encoding type "${n}"`),r=Ve(e,r),e=Ze(e).size;var a=new Uint8Array(e);return En(r,a,0,e,0),n==="utf8"&&(a=Qe(a)),Er(r),a}function we(e,r,n){e=pr("/dev/"+e);var a=sn(!!r,!!n);we.yb??(we.yb=64);var u=we.yb++<<8|0;vr(u,{open(h){h.seekable=!1},close(){n?.buffer?.length&&n(10)},read(h,g,_,N){for(var k=0,q=0;q<N;q++){try{var X=r()}catch{throw new y(29)}if(X===void 0&&k===0)throw new y(6);if(X==null)break;k++,g[_+q]=X}return k&&(h.node.atime=Date.now()),k},write(h,g,_,N){for(var k=0;k<N;k++)try{n(g[_+k])}catch{throw new y(29)}return N&&(h.node.mtime=h.node.ctime=Date.now()),k}}),ht(e,a,u)}var F={};function Le(e,r,n){if(r.charAt(0)==="/")return r;if(e=e===-100?"/":Z(e).path,r.length==0){if(!n)throw new y(44);return e}return e+"/"+r}function mt(e,r){U[e>>2]=r.dev,U[e+4>>2]=r.mode,U[e+8>>2]=r.nlink,U[e+12>>2]=r.uid,U[e+16>>2]=r.gid,U[e+20>>2]=r.rdev,le[e+24>>3]=BigInt(r.size),j[e+32>>2]=4096,j[e+36>>2]=r.blocks;var n=r.atime.getTime(),a=r.mtime.getTime(),u=r.ctime.getTime();return le[e+40>>3]=BigInt(Math.floor(n/1e3)),U[e+48>>2]=n%1e3*1e6,le[e+56>>3]=BigInt(Math.floor(a/1e3)),U[e+64>>2]=a%1e3*1e6,le[e+72>>3]=BigInt(Math.floor(u/1e3)),U[e+80>>2]=u%1e3*1e6,le[e+88>>3]=BigInt(r.ino),0}var ft=void 0,yt=()=>{var e=j[+ft>>2];return ft+=4,e},xr=0,is=[0,31,60,91,121,152,182,213,244,274,305,335],ss=[0,31,59,90,120,151,181,212,243,273,304,334],et={},_n=e=>{Y=e,ct||0<xr||(o.onExit?.(e),O=!0),R(e,new dr(e))},os=e=>{if(!O)try{e()}catch(r){r instanceof dr||r=="unwind"||R(1,r)}finally{if(!(ct||0<xr))try{Y=e=Y,_n(e)}catch(r){r instanceof dr||r=="unwind"||R(1,r)}}},_r={},Tn=()=>{if(!Tr){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:S||"./this.program"},r;for(r in _r)_r[r]===void 0?delete e[r]:e[r]=_r[r];var n=[];for(r in e)n.push(`${r}=${e[r]}`);Tr=n}return Tr},Tr,as=(e,r,n,a)=>{var u={string:k=>{var q=0;if(k!=null&&k!==0){q=qe(k)+1;var X=De(q);pe(k,Q,X,q),q=X}return q},array:k=>{var q=De(k.length);return K.set(k,q),q}};e=o["_"+e];var h=[],g=0;if(a)for(var _=0;_<a.length;_++){var N=u[n[_]];N?(g===0&&(g=Et()),h[_]=N(a[_])):h[_]=a[_]}return n=e(...h),n=function(k){return g!==0&&wt(g),r==="string"?V(k):r==="boolean"?!!k:k}(n)},bt=e=>{var r=qe(e)+1,n=vt(r);return n&&pe(e,Q,n,r),n},Ne,Sr=[],Ee=e=>{Ne.delete(xe.get(e)),xe.set(e,null),Sr.push(e)},Sn=e=>{let r=e.length;return[r%128|128,r>>7,...e]},ls={i:127,p:127,j:126,f:125,d:124,e:111},kn=e=>Sn(Array.from(e,r=>ls[r])),tt=(e,r)=>{if(!Ne){Ne=new WeakMap;var n=xe.length;if(Ne)for(var a=0;a<0+n;a++){var u=xe.get(a);u&&Ne.set(u,a)}}if(n=Ne.get(e)||0)return n;n=Sr.length?Sr.pop():xe.grow(1);try{xe.set(n,e)}catch(h){if(!(h instanceof TypeError))throw h;r=Uint8Array.of(0,97,115,109,1,0,0,0,1,...Sn([1,96,...kn(r.slice(1)),...kn(r[0]==="v"?"":r[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),r=new WebAssembly.Module(r),r=new WebAssembly.Instance(r,{e:{f:e}}).exports.f,xe.set(n,r)}return Ne.set(e,n),n};if(ve=Array(4096),mn(T,"/"),he("/tmp"),he("/home"),he("/home/web_user"),function(){he("/dev"),vr(259,{read:()=>0,write:(a,u,h,g)=>g,Va:()=>0}),ht("/dev/null",259),nn(1280,zi),nn(1536,Yi),ht("/dev/tty",1280),ht("/dev/tty1",1536);var e=new Uint8Array(1024),r=0,n=()=>(r===0&&(tn(e),r=e.byteLength),e[--r]);we("random",n),we("urandom",n),he("/dev/shm"),he("/dev/shm/tmp")}(),function(){he("/proc");var e=he("/proc/self");he("/proc/self/fd"),mn({Xa(){var r=un(e,"fd",16895,73);return r.Ma={Va:T.Ma.Va},r.La={lookup(n,a){n=+a;var u=Z(n);return n={parent:null,Xa:{zb:"fake"},La:{readlink:()=>u.path},id:n+1},n.parent=n},readdir(){return Array.from(je.entries()).filter(([,n])=>n).map(([n])=>n.toString())}},r}},"/proc/self/fd")}(),o.noExitRuntime&&(ct=o.noExitRuntime),o.print&&(x=o.print),o.printErr&&(I=o.printErr),o.wasmBinary&&(L=o.wasmBinary),o.thisProgram&&(S=o.thisProgram),o.preInit)for(typeof o.preInit=="function"&&(o.preInit=[o.preInit]);0<o.preInit.length;)o.preInit.shift()();o.stackSave=()=>Et(),o.stackRestore=e=>wt(e),o.stackAlloc=e=>De(e),o.cwrap=(e,r,n,a)=>{var u=!n||n.every(h=>h==="number"||h==="boolean");return r!=="string"&&u&&!a?o["_"+e]:(...h)=>as(e,r,n,h)},o.addFunction=tt,o.removeFunction=Ee,o.UTF8ToString=V,o.stringToNewUTF8=bt,o.writeArrayToMemory=(e,r)=>{K.set(e,r)};var vt,rt,Rn,An,wt,De,Et,xt,xe,cs={a:(e,r,n,a)=>Fe(`Assertion failed: ${V(e)}, at: `+[r?V(r):"unknown filename",n,a?V(a):"unknown function"]),i:function(e,r){try{return e=V(e),gt(e,r),0}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},L:function(e,r,n){try{if(r=V(r),r=Le(e,r),n&-8)return-28;var a=se(r,{$a:!0}).node;return a?(e="",n&4&&(e+="r"),n&2&&(e+="w"),n&1&&(e+="x"),e&&Be(a,e)?-2:0):-44}catch(u){if(typeof F>"u"||u.name!=="ErrnoError")throw u;return-u.Pa}},j:function(e,r){try{var n=Z(e);return bn(n,n.node,r,!1),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},h:function(e){try{var r=Z(e);return br(r,r.node,{timestamp:Date.now(),Fb:!1}),0}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},b:function(e,r,n){ft=n;try{var a=Z(e);switch(r){case 0:var u=yt();if(0>u)break;for(;je[u];)u++;return es(a,u).fd;case 1:case 2:return 0;case 3:return a.flags;case 4:return u=yt(),a.flags|=u,0;case 12:return u=yt(),ze[u+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return-h.Pa}},g:function(e,r){try{var n=Z(e),a=n.node,u=n.Ma.Ta;e=u?n:a,u??=a.La.Ta,dt(u);var h=u(e);return mt(r,h)}catch(g){if(typeof F>"u"||g.name!=="ErrnoError")throw g;return-g.Pa}},H:function(e,r){r=-9007199254740992>r||9007199254740992<r?NaN:Number(r);try{if(isNaN(r))return-61;var n=Z(e);if(0>r||!(n.flags&2097155))throw new y(28);return vn(n,n.node,r),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},G:function(e,r){try{if(r===0)return-28;var n=qe("/")+1;return r<n?-68:(pe("/",Q,e,r),n)}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},K:function(e,r){try{return e=V(e),mt(r,Ze(e,!0))}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},C:function(e,r,n){try{return r=V(r),r=Le(e,r),he(r,n),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},J:function(e,r,n,a){try{r=V(r);var u=a&256;return r=Le(e,r,a&4096),mt(n,u?Ze(r,!0):Ze(r))}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return-h.Pa}},x:function(e,r,n,a){ft=a;try{r=V(r),r=Le(e,r);var u=a?yt():0;return Ve(r,n,u).fd}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return-h.Pa}},v:function(e,r,n,a){try{if(r=V(r),r=Le(e,r),0>=a)return-28;var u=se(r).node;if(!u)throw new y(44);if(!u.La.readlink)throw new y(28);var h=u.La.readlink(u),g=Math.min(a,qe(h)),_=K[n+g];return pe(h,Q,n,a+1),K[n+g]=_,g}catch(N){if(typeof F>"u"||N.name!=="ErrnoError")throw N;return-N.Pa}},u:function(e){try{return e=V(e),fn(e),0}catch(r){if(typeof F>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},f:function(e,r){try{return e=V(e),mt(r,Ze(e))}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},r:function(e,r,n){try{if(r=V(r),r=Le(e,r),n)if(n===512)fn(r);else return-28;else yn(r);return 0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},q:function(e,r,n){try{r=V(r),r=Le(e,r,!0);var a=Date.now(),u,h;if(n){var g=U[n>>2]+4294967296*j[n+4>>2],_=j[n+8>>2];_==1073741823?u=a:_==1073741822?u=null:u=1e3*g+_/1e6,n+=16,g=U[n>>2]+4294967296*j[n+4>>2],_=j[n+8>>2],_==1073741823?h=a:_==1073741822?h=null:h=1e3*g+_/1e6}else h=u=a;if((h??u)!==null){e=u;var N=se(r,{$a:!0}).node;dt(N.La.Ua)(N,{atime:e,mtime:h})}return 0}catch(k){if(typeof F>"u"||k.name!=="ErrnoError")throw k;return-k.Pa}},m:()=>Fe(""),l:()=>{ct=!1,xr=0},A:function(e,r){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),e=new Date(1e3*e),j[r>>2]=e.getSeconds(),j[r+4>>2]=e.getMinutes(),j[r+8>>2]=e.getHours(),j[r+12>>2]=e.getDate(),j[r+16>>2]=e.getMonth(),j[r+20>>2]=e.getFullYear()-1900,j[r+24>>2]=e.getDay();var n=e.getFullYear();j[r+28>>2]=(n%4!==0||n%100===0&&n%400!==0?ss:is)[e.getMonth()]+e.getDate()-1|0,j[r+36>>2]=-(60*e.getTimezoneOffset()),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var a=new Date(e.getFullYear(),0,1).getTimezoneOffset();j[r+32>>2]=(n!=a&&e.getTimezoneOffset()==Math.min(a,n))|0},y:function(e,r,n,a,u,h,g){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u);try{var _=Z(a);if(r&2&&!(n&2)&&(_.flags&2097155)!==2)throw new y(2);if((_.flags&2097155)===1)throw new y(2);if(!_.Ma.ib)throw new y(43);if(!e)throw new y(28);var N=_.Ma.ib(_,e,u,r,n),k=N.Kb;return j[h>>2]=N.Ab,U[g>>2]=k,0}catch(q){if(typeof F>"u"||q.name!=="ErrnoError")throw q;return-q.Pa}},z:function(e,r,n,a,u,h){h=-9007199254740992>h||9007199254740992<h?NaN:Number(h);try{var g=Z(u);if(n&2){if(n=h,(g.node.mode&61440)!==32768)throw new y(43);if(!(a&2)){var _=Q.slice(e,e+r);g.Ma.jb&&g.Ma.jb(g,_,n,r,a)}}}catch(N){if(typeof F>"u"||N.name!=="ErrnoError")throw N;return-N.Pa}},n:(e,r)=>{if(et[e]&&(clearTimeout(et[e].id),delete et[e]),!r)return 0;var n=setTimeout(()=>{delete et[e],os(()=>An(e,performance.now()))},r);return et[e]={id:n,Xb:r},0},B:(e,r,n,a)=>{var u=new Date().getFullYear(),h=new Date(u,0,1).getTimezoneOffset();u=new Date(u,6,1).getTimezoneOffset(),U[e>>2]=60*Math.max(h,u),j[r>>2]=+(h!=u),r=g=>{var _=Math.abs(g);return`UTC${0<=g?"-":"+"}${String(Math.floor(_/60)).padStart(2,"0")}${String(_%60).padStart(2,"0")}`},e=r(h),r=r(u),u<h?(pe(e,Q,n,17),pe(r,Q,a,17)):(pe(e,Q,a,17),pe(r,Q,n,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:e=>{var r=Q.length;if(e>>>=0,2147483648<e)return!1;for(var n=1;4>=n;n*=2){var a=r*(1+.2/n);a=Math.min(a,e+100663296);e:{a=(Math.min(2147483648,65536*Math.ceil(Math.max(e,a)/65536))-xt.buffer.byteLength+65535)/65536|0;try{xt.grow(a),Xr();var u=1;break e}catch{}u=void 0}if(u)return!0}return!1},E:(e,r)=>{var n=0,a=0,u;for(u of Tn()){var h=r+n;U[e+a>>2]=h,n+=pe(u,Q,h,1/0)+1,a+=4}return 0},F:(e,r)=>{var n=Tn();U[e>>2]=n.length,e=0;for(var a of n)e+=qe(a)+1;return U[r>>2]=e,0},e:function(e){try{var r=Z(e);return Er(r),0}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return n.Pa}},p:function(e,r){try{var n=Z(e);return K[r]=n.tty?2:re(n.mode)?3:(n.mode&61440)===40960?7:4,ze[r+2>>1]=0,le[r+8>>3]=BigInt(0),le[r+16>>3]=BigInt(0),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return a.Pa}},w:function(e,r,n,a){try{e:{var u=Z(e);e=r;for(var h,g=r=0;g<n;g++){var _=U[e>>2],N=U[e+4>>2];e+=8;var k=En(u,K,_,N,h);if(0>k){var q=-1;break e}if(r+=k,k<N)break;typeof h<"u"&&(h+=k)}q=r}return U[a>>2]=q,0}catch(X){if(typeof F>"u"||X.name!=="ErrnoError")throw X;return X.Pa}},D:function(e,r,n,a){r=-9007199254740992>r||9007199254740992<r?NaN:Number(r);try{if(isNaN(r))return 61;var u=Z(e);return wn(u,r,n),le[a>>3]=BigInt(u.position),u.pb&&r===0&&n===0&&(u.pb=null),0}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return h.Pa}},I:function(e){try{var r=Z(e);return r.Ma?.fsync?.(r)}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return n.Pa}},t:function(e,r,n,a){try{e:{var u=Z(e);e=r;for(var h,g=r=0;g<n;g++){var _=U[e>>2],N=U[e+4>>2];e+=8;var k=xn(u,K,_,N,h);if(0>k){var q=-1;break e}if(r+=k,k<N)break;typeof h<"u"&&(h+=k)}q=r}return U[a>>2]=q,0}catch(X){if(typeof F>"u"||X.name!=="ErrnoError")throw X;return X.Pa}},k:_n};function kr(){function e(){if(o.calledRun=!0,!O){if(!o.noFSInit&&!an){var r,n;an=!0,r??=o.stdin,n??=o.stdout,a??=o.stderr,r?we("stdin",r):wr("/dev/tty","/dev/stdin"),n?we("stdout",null,n):wr("/dev/tty","/dev/stdout"),a?we("stderr",null,a):wr("/dev/tty1","/dev/stderr"),Ve("/dev/stdin",0),Ve("/dev/stdout",1),Ve("/dev/stderr",1)}if(Rr.N(),ln=!1,o.onRuntimeInitialized?.(),o.postRun)for(typeof o.postRun=="function"&&(o.postRun=[o.postRun]);o.postRun.length;){var a=o.postRun.shift();zr.push(a)}Wr(zr)}}if(0<Ie)Ye=kr;else{if(o.preRun)for(typeof o.preRun=="function"&&(o.preRun=[o.preRun]);o.preRun.length;)Ki();Wr(Yr),0<Ie?Ye=kr:o.setStatus?(o.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>o.setStatus(""),1),e()},1)):e()}}var Rr;return async function(){function e(n){return n=Rr=n.exports,o._sqlite3_free=n.P,o._sqlite3_value_text=n.Q,o._sqlite3_prepare_v2=n.R,o._sqlite3_step=n.S,o._sqlite3_reset=n.T,o._sqlite3_exec=n.U,o._sqlite3_finalize=n.V,o._sqlite3_column_name=n.W,o._sqlite3_column_text=n.X,o._sqlite3_column_type=n.Y,o._sqlite3_errmsg=n.Z,o._sqlite3_clear_bindings=n._,o._sqlite3_value_blob=n.$,o._sqlite3_value_bytes=n.aa,o._sqlite3_value_double=n.ba,o._sqlite3_value_int=n.ca,o._sqlite3_value_type=n.da,o._sqlite3_result_blob=n.ea,o._sqlite3_result_double=n.fa,o._sqlite3_result_error=n.ga,o._sqlite3_result_int=n.ha,o._sqlite3_result_int64=n.ia,o._sqlite3_result_null=n.ja,o._sqlite3_result_text=n.ka,o._sqlite3_aggregate_context=n.la,o._sqlite3_column_count=n.ma,o._sqlite3_data_count=n.na,o._sqlite3_column_blob=n.oa,o._sqlite3_column_bytes=n.pa,o._sqlite3_column_double=n.qa,o._sqlite3_bind_blob=n.ra,o._sqlite3_bind_double=n.sa,o._sqlite3_bind_int=n.ta,o._sqlite3_bind_text=n.ua,o._sqlite3_bind_parameter_index=n.va,o._sqlite3_sql=n.wa,o._sqlite3_normalized_sql=n.xa,o._sqlite3_changes=n.ya,o._sqlite3_close_v2=n.za,o._sqlite3_create_function_v2=n.Aa,o._sqlite3_update_hook=n.Ba,o._sqlite3_open=n.Ca,vt=o._malloc=n.Da,rt=o._free=n.Ea,o._RegisterExtensionFunctions=n.Fa,Rn=n.Ga,An=n.Ha,wt=n.Ia,De=n.Ja,Et=n.Ka,xt=n.M,xe=n.O,Xr(),Ie--,o.monitorRunDependencies?.(Ie),Ie==0&&Ye&&(n=Ye,Ye=null,n()),Rr}Ie++,o.monitorRunDependencies?.(Ie);var r={a:cs};return o.instantiateWasm?new Promise(n=>{o.instantiateWasm(r,(a,u)=>{n(e(a,u))})}):(ur??=o.locateFile?o.locateFile("sql-wasm.wasm",P):P+"sql-wasm.wasm",e((await Hi(r)).instance))}(),kr(),s}),Dt)};typeof Mt=="object"&&typeof Me=="object"?(Me.exports=$t,Me.exports.default=$t):typeof define=="function"&&define.amd?define([],function(){return $t}):typeof Mt=="object"&&(Mt.Module=$t)});var Xn=te((Oa,Jn)=>{"use strict";var zs=require("events"),Dr=class extends zs{constructor(t){if(super(),typeof t!="function")throw"execution must be a function";this._execution=t}execute(t){let i;try{i=this._execution(t)}catch(s){return this.emit("task-failed",s)}return i instanceof Promise?i.then(()=>this.emit("task-finished")).catch(s=>this.emit("task-failed",s)):(this.emit("task-finished"),i)}};Jn.exports=Dr});var zn=te((Ua,Wn)=>{"use strict";Wn.exports=(()=>{let c=["january","february","march","april","may","june","july","august","september","october","november","december"],t=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];function i(l,o){for(let p=0;p<o.length;p++)l=l.replace(new RegExp(o[p],"gi"),parseInt(p,10)+1);return l}function s(l){return l=i(l,c),l=i(l,t),l}return s})()});var Gn=te((Fa,Yn)=>{"use strict";Yn.exports=(()=>{let c=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],t=["sun","mon","tue","wed","thu","fri","sat"];function i(l,o){for(let p=0;p<o.length;p++)l=l.replace(new RegExp(o[p],"gi"),parseInt(p,10));return l}function s(l){return l=l.replace("7","0"),l=i(l,c),i(l,t)}return s})()});var Zn=te((qa,Qn)=>{"use strict";Qn.exports=(()=>{function c(i,s){return i.indexOf("*")!==-1?i.replace("*",s):i}function t(i){return i[0]=c(i[0],"0-59"),i[1]=c(i[1],"0-59"),i[2]=c(i[2],"0-23"),i[3]=c(i[3],"1-31"),i[4]=c(i[4],"1-12"),i[5]=c(i[5],"0-6"),i}return t})()});var ti=te((ja,ei)=>{"use strict";ei.exports=(()=>{function c(s,l,o,p){let f=[],b=parseInt(p),S=parseInt(o);S>b&&(b=parseInt(o),S=parseInt(p));for(let R=S;R<=b;R++)f.push(R);return s.replace(new RegExp(l,"i"),f.join())}function t(s){let l=/(\d+)-(\d+)/,o=l.exec(s);for(;o!==null&&o.length>0;)s=c(s,o[0],o[1],o[2]),o=l.exec(s);return s}function i(s){for(let l=0;l<s.length;l++)s[l]=t(s[l]);return s}return i})()});var ni=te((Ba,ri)=>{"use strict";ri.exports=(()=>{function c(t){for(var i=/^(.+)\/(\w+)$/,s=0;s<t.length;s++){var l=i.exec(t[s]),o=l!==null&&l.length>0;if(o){var p=l[2];if(isNaN(p))throw p+" is not a valid step value";for(var f=l[1].split(","),b=[],S=parseInt(p,10),R=0;R<=f.length;R++){var C=parseInt(f[R],10);C%S===0&&b.push(C)}t[s]=b.join(",")}}return t}return c})()});var $r=te((Va,ii)=>{"use strict";var Ys=zn(),Gs=Gn(),Qs=Zn(),Zs=ti(),eo=ni();ii.exports=(()=>{function c(l){return l.length===5?["0"].concat(l):l}function t(l){return l.replace(/\s{2,}/g," ").trim()}function i(l){for(let o=0;o<l.length;o++){let p=l[o].split(",");for(let f=0;f<p.length;f++)p[f]=parseInt(p[f]);l[o]=p}return l}function s(l){let o=t(l).split(" ");return o=c(o),o[4]=Ys(o[4]),o[5]=Gs(o[5]),o=Qs(o),o=Zs(o),o=eo(o),o=i(o),o.join(" ")}return s})()});var Mr=te((Ha,si)=>{"use strict";var to=$r(),ro=/^(?:\d+|\*|\*\/\d+)$/;function Je(c,t,i){let s=c.split(",");for(let l of s){let o=parseInt(l,10);if(!Number.isNaN(o)&&(o<t||o>i)||!ro.test(l))return!1}return!0}function no(c){return!Je(c,0,59)}function io(c){return!Je(c,0,59)}function so(c){return!Je(c,0,23)}function oo(c){return!Je(c,1,31)}function ao(c){return!Je(c,1,12)}function lo(c){return!Je(c,0,7)}function co(c,t){if(no(t[0]))throw new Error(`${c[0]} is a invalid expression for second`);if(io(t[1]))throw new Error(`${c[1]} is a invalid expression for minute`);if(so(t[2]))throw new Error(`${c[2]} is a invalid expression for hour`);if(oo(t[3]))throw new Error(`${c[3]} is a invalid expression for day of month`);if(ao(t[4]))throw new Error(`${c[4]} is a invalid expression for month`);if(lo(t[5]))throw new Error(`${c[5]} is a invalid expression for week day`)}function uo(c){if(typeof c!="string")throw new TypeError("pattern must be a string!");let t=c.split(" "),i=to(c).split(" ");t.length===5&&t.unshift("0"),co(t,i)}si.exports=uo});var ai=te((Ka,oi)=>{var po=Mr(),ho=$r();function Xe(c,t){return c.indexOf(",")!==-1?c.split(",").indexOf(t.toString())!==-1:c===t.toString()}var Cr=class{constructor(t,i){po(t),this.pattern=ho(t),this.timezone=i,this.expressions=this.pattern.split(" "),this.dtf=this.timezone?new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23",fractionalSecondDigits:3,timeZone:this.timezone}):null}match(t){t=this.apply(t);let i=Xe(this.expressions[0],t.getSeconds()),s=Xe(this.expressions[1],t.getMinutes()),l=Xe(this.expressions[2],t.getHours()),o=Xe(this.expressions[3],t.getDate()),p=Xe(this.expressions[4],t.getMonth()+1),f=Xe(this.expressions[5],t.getDay());return i&&s&&l&&o&&p&&f}apply(t){return this.dtf?new Date(this.dtf.format(t)):t}};oi.exports=Cr});var ci=te((Ja,li)=>{"use strict";var go=require("events"),mo=ai(),Or=class extends go{constructor(t,i,s){super(),this.timeMatcher=new mo(t,i),this.autorecover=s}start(){this.stop();let t=process.hrtime(),i=this.timeMatcher.apply(new Date),s=()=>{let o=process.hrtime(t),p=(o[0]*1e9+o[1])/1e6,f=Math.floor(p/1e3);for(let b=f;b>=0;b--){let S=new Date(new Date().getTime()-b*1e3),R=this.timeMatcher.apply(S);i.getTime()<R.getTime()&&(b===0||this.autorecover)&&this.timeMatcher.match(S)&&(this.emit("scheduled-time-matched",R),R.setMilliseconds(0),i=R)}t=process.hrtime(),this.timeout=setTimeout(s,1e3)};s()}stop(){this.timeout&&clearTimeout(this.timeout),this.timeout=null}};li.exports=Or});function it(){return Yt>Gt.length-16&&(ui.default.randomFillSync(Gt),Yt=0),Gt.slice(Yt,Yt+=16)}var ui,Gt,Yt,Ur=ee(()=>{ui=M(require("crypto")),Gt=new Uint8Array(256),Yt=Gt.length});var di,pi=ee(()=>{di=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i});function fo(c){return typeof c=="string"&&di.test(c)}var ke,st=ee(()=>{pi();ke=fo});function yo(c,t=0){let i=(z[c[t+0]]+z[c[t+1]]+z[c[t+2]]+z[c[t+3]]+"-"+z[c[t+4]]+z[c[t+5]]+"-"+z[c[t+6]]+z[c[t+7]]+"-"+z[c[t+8]]+z[c[t+9]]+"-"+z[c[t+10]]+z[c[t+11]]+z[c[t+12]]+z[c[t+13]]+z[c[t+14]]+z[c[t+15]]).toLowerCase();if(!ke(i))throw TypeError("Stringified UUID is invalid");return i}var z,Re,ot=ee(()=>{st();z=[];for(let c=0;c<256;++c)z.push((c+256).toString(16).substr(1));Re=yo});function bo(c,t,i){let s=t&&i||0,l=t||new Array(16);c=c||{};let o=c.node||hi,p=c.clockseq!==void 0?c.clockseq:Fr;if(o==null||p==null){let P=c.random||(c.rng||it)();o==null&&(o=hi=[P[0]|1,P[1],P[2],P[3],P[4],P[5]]),p==null&&(p=Fr=(P[6]<<8|P[7])&16383)}let f=c.msecs!==void 0?c.msecs:Date.now(),b=c.nsecs!==void 0?c.nsecs:jr+1,S=f-qr+(b-jr)/1e4;if(S<0&&c.clockseq===void 0&&(p=p+1&16383),(S<0||f>qr)&&c.nsecs===void 0&&(b=0),b>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");qr=f,jr=b,Fr=p,f+=122192928e5;let R=((f&268435455)*1e4+b)%4294967296;l[s++]=R>>>24&255,l[s++]=R>>>16&255,l[s++]=R>>>8&255,l[s++]=R&255;let C=f/4294967296*1e4&268435455;l[s++]=C>>>8&255,l[s++]=C&255,l[s++]=C>>>24&15|16,l[s++]=C>>>16&255,l[s++]=p>>>8|128,l[s++]=p&255;for(let P=0;P<6;++P)l[s+P]=o[P];return t||Re(l)}var hi,Fr,qr,jr,gi,mi=ee(()=>{Ur();ot();qr=0,jr=0;gi=bo});function vo(c){if(!ke(c))throw TypeError("Invalid UUID");let t,i=new Uint8Array(16);return i[0]=(t=parseInt(c.slice(0,8),16))>>>24,i[1]=t>>>16&255,i[2]=t>>>8&255,i[3]=t&255,i[4]=(t=parseInt(c.slice(9,13),16))>>>8,i[5]=t&255,i[6]=(t=parseInt(c.slice(14,18),16))>>>8,i[7]=t&255,i[8]=(t=parseInt(c.slice(19,23),16))>>>8,i[9]=t&255,i[10]=(t=parseInt(c.slice(24,36),16))/1099511627776&255,i[11]=t/4294967296&255,i[12]=t>>>24&255,i[13]=t>>>16&255,i[14]=t>>>8&255,i[15]=t&255,i}var Qt,Br=ee(()=>{st();Qt=vo});function wo(c){c=unescape(encodeURIComponent(c));let t=[];for(let i=0;i<c.length;++i)t.push(c.charCodeAt(i));return t}function Zt(c,t,i){function s(l,o,p,f){if(typeof l=="string"&&(l=wo(l)),typeof o=="string"&&(o=Qt(o)),o.length!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let b=new Uint8Array(16+l.length);if(b.set(o),b.set(l,o.length),b=i(b),b[6]=b[6]&15|t,b[8]=b[8]&63|128,p){f=f||0;for(let S=0;S<16;++S)p[f+S]=b[S];return p}return Re(b)}try{s.name=c}catch{}return s.DNS=Eo,s.URL=xo,s}var Eo,xo,Vr=ee(()=>{ot();Br();Eo="6ba7b810-9dad-11d1-80b4-00c04fd430c8",xo="6ba7b811-9dad-11d1-80b4-00c04fd430c8"});function _o(c){return Array.isArray(c)?c=Buffer.from(c):typeof c=="string"&&(c=Buffer.from(c,"utf8")),fi.default.createHash("md5").update(c).digest()}var fi,yi,bi=ee(()=>{fi=M(require("crypto"));yi=_o});var To,vi,wi=ee(()=>{Vr();bi();To=Zt("v3",48,yi),vi=To});function So(c,t,i){c=c||{};let s=c.random||(c.rng||it)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){i=i||0;for(let l=0;l<16;++l)t[i+l]=s[l];return t}return Re(s)}var Ei,xi=ee(()=>{Ur();ot();Ei=So});function ko(c){return Array.isArray(c)?c=Buffer.from(c):typeof c=="string"&&(c=Buffer.from(c,"utf8")),_i.default.createHash("sha1").update(c).digest()}var _i,Ti,Si=ee(()=>{_i=M(require("crypto"));Ti=ko});var Ro,ki,Ri=ee(()=>{Vr();Si();Ro=Zt("v5",80,Ti),ki=Ro});var Ai,Ii=ee(()=>{Ai="00000000-0000-0000-0000-000000000000"});function Ao(c){if(!ke(c))throw TypeError("Invalid UUID");return parseInt(c.substr(14,1),16)}var Pi,Li=ee(()=>{st();Pi=Ao});var er={};Un(er,{NIL:()=>Ai,parse:()=>Qt,stringify:()=>Re,v1:()=>gi,v3:()=>vi,v4:()=>Ei,v5:()=>ki,validate:()=>ke,version:()=>Pi});var tr=ee(()=>{mi();wi();xi();Ri();Ii();Li();st();ot();Br()});var Di=te((Pl,Ni)=>{"use strict";var Io=require("events"),Po=Xn(),Lo=ci(),No=(tr(),St(er)),Hr=class extends Io{constructor(t,i,s){super(),s||(s={scheduled:!0,recoverMissedExecutions:!1}),this.options=s,this.options.name=this.options.name||No.v4(),this._task=new Po(i),this._scheduler=new Lo(t,s.timezone,s.recoverMissedExecutions),this._scheduler.on("scheduled-time-matched",l=>{this.now(l)}),s.scheduled!==!1&&this._scheduler.start(),s.runOnInit===!0&&this.now("init")}now(t="manual"){let i=this._task.execute(t);this.emit("task-done",i)}start(){this._scheduler.start()}stop(){this._scheduler.stop()}};Ni.exports=Hr});var Mi=te((Ll,$i)=>{var Do=require("events"),$o=require("path"),{fork:Mo}=require("child_process"),Co=(tr(),St(er)),Oo=`${__dirname}/daemon.js`,Kr=class extends Do{constructor(t,i,s){super(),s||(s={scheduled:!0,recoverMissedExecutions:!1}),this.cronExpression=t,this.taskPath=i,this.options=s,this.options.name=this.options.name||Co.v4(),s.scheduled&&this.start()}start(){this.stop(),this.forkProcess=Mo(Oo),this.forkProcess.on("message",i=>{switch(i.type){case"task-done":this.emit("task-done",i.result);break}});let t=this.options;t.scheduled=!0,this.forkProcess.send({type:"register",path:$o.resolve(this.taskPath),cron:this.cronExpression,options:t})}stop(){this.forkProcess&&this.forkProcess.kill()}pid(){if(this.forkProcess)return this.forkProcess.pid}isRunning(){return!this.forkProcess.killed}};$i.exports=Kr});var Oi=te((Nl,Ci)=>{Ci.exports=(global.scheduledTasks||(global.scheduledTasks=new Map),{save:c=>{if(!c.options){let t=(tr(),St(er));c.options={},c.options.name=t.v4()}global.scheduledTasks.set(c.options.name,c)},getTasks:()=>global.scheduledTasks})});var qi=te((Dl,Fi)=>{"use strict";var Uo=Di(),Fo=Mi(),qo=Mr(),Ui=Oi();function jo(c,t,i){let s=Bo(c,t,i);return Ui.save(s),s}function Bo(c,t,i){return typeof t=="string"?new Fo(c,t,i):new Uo(c,t,i)}function Vo(c){try{return qo(c),!0}catch{return!1}}function Ho(){return Ui.getTasks()}Fi.exports={schedule:jo,validate:Vo,getTasks:Ho}});var Xo={};Un(Xo,{activate:()=>Ko,deactivate:()=>Jo});module.exports=St(Xo);var H=M(require("vscode"));var de=M(require("vscode")),kt=class{constructor(t){this.db=t}_onDidChangeTreeData=new de.EventEmitter;onDidChangeTreeData=this._onDidChangeTreeData.event;refresh(){this._onDidChangeTreeData.fire()}getTreeItem(t){return t}getChildren(t){if(t)return t.recordingId?this.db.getActions(t.recordingId).map((l,o)=>{let p=new nt(`${o+1}. ${l.action_type} \u2014 ${l.url||""}`,de.TreeItemCollapsibleState.None);return p.description=`${l.timestamp_ms}ms`,p.iconPath=new de.ThemeIcon("debug-step-over"),p}):[];let i=this.db.getAllRecordings();return i.length===0?[new nt("No recordings yet. Click + to start.",de.TreeItemCollapsibleState.None)]:i.map(s=>{let l=new nt(s.name,de.TreeItemCollapsibleState.Collapsed);return l.recordingId=s.id,l.contextValue="recording",l.description=`${s.action_count} actions \xB7 ${new Date(s.created_at).toLocaleDateString()}`,l.tooltip=`URL: ${s.url}
Tags: ${s.tags||"none"}
Duration: ${s.duration_ms}ms`,l.iconPath=new de.ThemeIcon("file-media"),l})}},nt=class extends de.TreeItem{recordingId};var fe=M(require("vscode")),Rt=class{constructor(t){this.db=t}_onDidChangeTreeData=new fe.EventEmitter;onDidChangeTreeData=this._onDidChangeTreeData.event;refresh(){this._onDidChangeTreeData.fire()}getTreeItem(t){return t}getChildren(){let t=this.db.getRecentExecutions(20);return t.length===0?[new fe.TreeItem("No executions yet.")]:t.map(i=>{let s=this.db.getRecording(i.recording_id),l=i.status==="pass"?"pass":i.status==="fail"?"error":"warning",o=new fe.TreeItem(s?.name||i.recording_id,fe.TreeItemCollapsibleState.None);return o.description=`${i.status} \xB7 ${i.trigger} \xB7 ${new Date(i.started_at).toLocaleString()}`,o.iconPath=new fe.ThemeIcon(`testing-${l}-icon`),o.tooltip=i.error_message?`Failed at step ${i.failure_step}: ${i.error_message}`:`Completed in ${i.finished_at?new Date(i.finished_at).getTime()-new Date(i.started_at).getTime():"?"}ms`,o})}};var ye=M(require("vscode")),At=class{constructor(t){this.db=t}_onDidChangeTreeData=new ye.EventEmitter;onDidChangeTreeData=this._onDidChangeTreeData.event;refresh(){this._onDidChangeTreeData.fire()}getTreeItem(t){return t}getChildren(){let t=this.db.getAllSchedules();return t.length===0?[new ye.TreeItem("No schedules configured.")]:t.map(i=>{let s=this.db.getRecording(i.recording_id),l=new ye.TreeItem(s?.name||i.recording_id,ye.TreeItemCollapsibleState.None);return l.description=`${i.cron_expression} \xB7 ${i.enabled?"Active":"Paused"}`,l.iconPath=new ye.ThemeIcon(i.enabled?"clock":"debug-pause"),l.tooltip=`Next run: ${i.next_run||"N/A"}
Last run: ${i.last_run||"Never"}`,l})}};var _e=M(require("vscode")),It=class{constructor(t,i,s,l){this.context=t;this.recorder=i;this.onRecordingSaved=s;this.onRecordingStarted=l}panel;async show(){if(this.panel){this.panel.reveal(_e.ViewColumn.One);return}this.panel=_e.window.createWebviewPanel("playwrightVcr.recording","PlaywrightVCR \u2014 Record",_e.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[_e.Uri.joinPath(this.context.extensionUri,"out")]}),this.panel.webview.html=this.getHtml(this.panel.webview),this.panel.webview.onDidReceiveMessage(async t=>{switch(t.type){case"startRecording":{let{url:i,browser:s,saveAuth:l}=t.payload;await this.recorder.start(i,s,l),this.onRecordingStarted?.(),this.recorder.onAction(o=>{this.panel?.webview.postMessage({type:"recordedAction",payload:o})});break}case"stopRecording":{let i=await this.recorder.stop();this.panel?.webview.postMessage({type:"recordingStopped",payload:i}),this.onRecordingSaved?.();break}}}),this.panel.onDidDispose(()=>{this.panel=void 0})}getHtml(t){let i=t.asWebviewUri(_e.Uri.joinPath(this.context.extensionUri,"out","webview.js")),s=Bs();return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${s}'; style-src ${t.cspSource} 'unsafe-inline';">
  <title>PlaywrightVCR \u2014 Record</title>
</head>
<body>
  <div id="root" data-panel="recording"></div>
  <script nonce="${s}" src="${i}"></script>
</body>
</html>`}};function Bs(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var Te=M(require("vscode")),Pt=class{constructor(t,i){this.context=t;this.player=i}panel;async show(t){if(this.panel){this.panel.reveal(Te.ViewColumn.One),t&&this.panel.webview.postMessage({type:"loadRecording",payload:{recordingId:t}});return}this.panel=Te.window.createWebviewPanel("playwrightVcr.playback","PlaywrightVCR \u2014 Playback",Te.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[Te.Uri.joinPath(this.context.extensionUri,"out")]}),this.panel.webview.html=this.getHtml(this.panel.webview),t&&setTimeout(()=>{this.panel?.webview.postMessage({type:"loadRecording",payload:{recordingId:t}})},500),this.panel.webview.onDidReceiveMessage(async i=>{switch(i.type){case"startPlayback":{let{recordingId:s,options:l}=i.payload;try{await this.player.play(s,l,o=>{this.panel?.webview.postMessage({type:"stepCompleted",payload:o})}),this.panel?.webview.postMessage({type:"playbackCompleted"})}catch(o){this.panel?.webview.postMessage({type:"playbackError",payload:{error:o.message}})}break}case"stopPlayback":{await this.player.stop();break}}}),this.panel.onDidDispose(()=>{this.panel=void 0})}getHtml(t){let i=t.asWebviewUri(Te.Uri.joinPath(this.context.extensionUri,"out","webview.js")),s=Vs();return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${s}'; style-src ${t.cspSource} 'unsafe-inline';">
  <title>PlaywrightVCR \u2014 Playback</title>
</head>
<body>
  <div id="root" data-panel="playback"></div>
  <script nonce="${s}" src="${i}"></script>
</body>
</html>`}};function Vs(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var Se=M(require("vscode")),Lt=class{constructor(t,i){this.context=t;this.db=i}panel;async show(){if(this.panel){this.panel.reveal(Se.ViewColumn.One);return}this.panel=Se.window.createWebviewPanel("playwrightVcr.monitoring","PlaywrightVCR \u2014 Monitoring",Se.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[Se.Uri.joinPath(this.context.extensionUri,"out")]}),this.panel.webview.html=this.getHtml(this.panel.webview),this.panel.webview.onDidReceiveMessage(async t=>{switch(t.type){case"getExecutions":{let i=this.db.getRecentExecutions(50);this.panel?.webview.postMessage({type:"executionsData",payload:i});break}case"getSchedules":{let i=this.db.getAllSchedules();this.panel?.webview.postMessage({type:"schedulesData",payload:i});break}case"addSchedule":{let{recordingId:i,cronExpression:s}=t.payload;this.db.createSchedule(i,s);let l=this.db.getAllSchedules();this.panel?.webview.postMessage({type:"schedulesData",payload:l});break}case"toggleSchedule":{let{scheduleId:i,enabled:s}=t.payload;this.db.updateSchedule(i,{enabled:s});break}case"deleteSchedule":{this.db.deleteSchedule(t.payload.scheduleId);break}}}),this.panel.onDidDispose(()=>{this.panel=void 0})}getHtml(t){let i=t.asWebviewUri(Se.Uri.joinPath(this.context.extensionUri,"out","webview.js")),s=Hs();return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${s}'; style-src ${t.cspSource} 'unsafe-inline';">
  <title>PlaywrightVCR \u2014 Monitoring</title>
</head>
<body>
  <div id="root" data-panel="monitoring"></div>
  <script nonce="${s}" src="${i}"></script>
</body>
</html>`}};function Hs(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var B=M(require("vscode")),Nt=class{constructor(t){this.context=t}panel;async show(){if(this.panel){this.panel.reveal(B.ViewColumn.One),await this.sendCurrentSettings();return}this.panel=B.window.createWebviewPanel("playwrightVcr.settings","PlaywrightVCR \u2014 AI Settings",B.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[B.Uri.joinPath(this.context.extensionUri,"assets")]});let t=this.panel.webview.asWebviewUri(B.Uri.joinPath(this.context.extensionUri,"assets","logo","Logo128.png")),i=this.context.extension.packageJSON;this.panel.webview.html=this.getHtml(t,i.version??"0.0.0",i.description??""),this.panel.webview.onDidReceiveMessage(async s=>{await this.handleMessage(s)}),this.panel.onDidDispose(()=>{this.panel=void 0}),setTimeout(()=>this.sendCurrentSettings(),200)}async sendCurrentSettings(){let t=B.workspace.getConfiguration("playwrightVcr"),i=t.get("ai.provider","openai"),s=!!await this.context.secrets.get("playwrightVcr.apiKey.openai"),l=!!await this.context.secrets.get("playwrightVcr.apiKey.anthropic");this.panel?.webview.postMessage({type:"settingsLoaded",payload:{selfHealingEnabled:t.get("selfHealing.enabled",!0),embeddingThreshold:t.get("selfHealing.embeddingThreshold",.85),llmEnabled:t.get("selfHealing.llmEnabled",!1),provider:i,model:t.get("ai.model","gpt-4o-mini"),ollamaUrl:t.get("ai.ollamaUrl","http://localhost:11434"),hasOpenAIKey:s,hasAnthropicKey:l}})}async handleMessage(t){switch(t.type){case"getSettings":await this.sendCurrentSettings();break;case"updateSetting":{let{key:i,value:s}=t.payload;await B.workspace.getConfiguration("playwrightVcr").update(i,s,B.ConfigurationTarget.Global),this.panel?.webview.postMessage({type:"settingSaved",payload:{key:i}});break}case"setApiKey":{let{provider:i,apiKey:s}=t.payload;s?(await this.context.secrets.store(`playwrightVcr.apiKey.${i}`,s),B.window.showInformationMessage(`${i} API key saved securely.`)):(await this.context.secrets.delete(`playwrightVcr.apiKey.${i}`),B.window.showInformationMessage(`${i} API key removed.`)),await this.sendCurrentSettings();break}case"testConnection":{let{provider:i}=t.payload,s=await this.testProviderConnection(i);this.panel?.webview.postMessage({type:"connectionTestResult",payload:s});break}case"openRepo":{let i=B.Uri.parse("https://github.com/djtrustgod/Playwright-GUI-Recorder-Playback");await B.env.openExternal(i);break}case"openAnthropicConsole":{let i=B.Uri.parse("https://console.anthropic.com/settings/keys");await B.env.openExternal(i),setTimeout(()=>{this.panel?.webview.postMessage({type:"focusAnthropicKey"})},500);break}}}async testProviderConnection(t){let i=B.workspace.getConfiguration("playwrightVcr"),s=i.get("ai.model","gpt-4o-mini");if(t==="ollama"){let o=i.get("ai.ollamaUrl","http://localhost:11434");try{let p=await fetch(`${o}/api/tags`);return p.ok?{ok:!0,message:`Connected. Available models: ${((await p.json()).models??[]).map(S=>S.name).join(", ")||"(none)"}`}:{ok:!1,message:`Ollama returned status ${p.status}`}}catch{return{ok:!1,message:`Cannot reach Ollama at ${o}`}}}let l=await this.context.secrets.get(`playwrightVcr.apiKey.${t}`);if(!l)return{ok:!1,message:`No API key stored for ${t}. Enter one above.`};try{if(t==="openai"){let o=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${l}`}});return o.ok?{ok:!0,message:`Connected to OpenAI. Model: ${s}`}:o.status===401?{ok:!1,message:"Invalid OpenAI API key."}:{ok:!1,message:`OpenAI returned status ${o.status}`}}if(t==="anthropic"){let o=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":l,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:s||"claude-3-haiku-20240307",max_tokens:1,messages:[{role:"user",content:"Hi"}]})});if(o.ok)return{ok:!0,message:`Connected to Anthropic. Model: ${s}`};if(o.status===401)return{ok:!1,message:"Invalid Anthropic API key. Check that the key is correct and active."};if(o.status===403)return{ok:!1,message:"Anthropic API key lacks permissions. Check your account settings."};if(o.status===429)return{ok:!0,message:`Connected to Anthropic (rate limited). Model: ${s}`};if(o.status===400||o.status===404){let f=(await o.json().catch(()=>({})))?.error?.message||`Anthropic returned status ${o.status}`;return f.toLowerCase().includes("model")?{ok:!0,message:`Anthropic key is valid, but model "${s}" may not be available. ${f}`}:{ok:!1,message:f}}return{ok:!1,message:`Anthropic returned status ${o.status}`}}return{ok:!1,message:`Unknown provider: ${t}`}}catch(o){return{ok:!1,message:`Connection failed: ${o.message}`}}}getHtml(t,i,s){let l=Ks();return`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PlaywrightVCR \u2014 AI Settings</title>
  <style>
    :root {
      --bg: var(--vscode-editor-background);
      --fg: var(--vscode-editor-foreground);
      --input-bg: var(--vscode-input-background);
      --input-fg: var(--vscode-input-foreground);
      --input-border: var(--vscode-input-border);
      --btn-bg: var(--vscode-button-background);
      --btn-fg: var(--vscode-button-foreground);
      --btn-hover: var(--vscode-button-hoverBackground);
      --secondary-bg: var(--vscode-button-secondaryBackground);
      --secondary-fg: var(--vscode-button-secondaryForeground);
      --border: var(--vscode-panel-border, #444);
      --success: #4caf50;
      --error: var(--vscode-errorForeground, #f44);
      --muted: var(--vscode-descriptionForeground);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: var(--vscode-font-family); color: var(--fg); background: var(--bg); padding: 20px; line-height: 1.5; }
    h1 { font-size: 1.4em; margin-bottom: 4px; }
    .subtitle { color: var(--muted); margin-bottom: 20px; font-size: 0.9em; }
    .section { border: 1px solid var(--border); border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    .section h2 { font-size: 1.1em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    .field { margin-bottom: 14px; }
    .field:last-child { margin-bottom: 0; }
    label { display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.9em; }
    .hint { color: var(--muted); font-size: 0.8em; margin-top: 2px; }
    select, input[type="text"], input[type="password"], input[type="number"] {
      width: 100%; padding: 6px 10px; background: var(--input-bg); color: var(--input-fg);
      border: 1px solid var(--input-border); border-radius: 4px; font-size: 0.9em;
    }
    select { cursor: pointer; }
    input[type="range"] { width: 100%; }
    .toggle-row { display: flex; align-items: center; gap: 10px; }
    .toggle-row label { margin-bottom: 0; font-weight: normal; }
    .toggle { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle .slider { position: absolute; inset: 0; background: #555; border-radius: 22px; cursor: pointer; transition: .2s; }
    .toggle .slider::before { content: ''; position: absolute; height: 16px; width: 16px; left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .2s; }
    .toggle input:checked + .slider { background: var(--btn-bg); }
    .toggle input:checked + .slider::before { transform: translateX(18px); }
    .api-key-row { display: flex; gap: 8px; align-items: flex-end; }
    .api-key-row input { flex: 1; }
    .btn { padding: 6px 14px; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85em; white-space: nowrap; }
    .btn-primary { background: var(--btn-bg); color: var(--btn-fg); }
    .btn-primary:hover { background: var(--btn-hover); }
    .btn-secondary { background: var(--secondary-bg); color: var(--secondary-fg); }
    .btn-danger { background: var(--error); color: #fff; }
    .key-status { display: inline-flex; align-items: center; gap: 4px; font-size: 0.8em; margin-top: 4px; }
    .key-status.stored { color: var(--success); }
    .key-status.missing { color: var(--error); }
    .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .dot.green { background: var(--success); }
    .dot.red { background: var(--error); }
    .test-result { margin-top: 10px; padding: 8px 12px; border-radius: 4px; font-size: 0.85em; }
    .test-result.ok { border: 1px solid var(--success); color: var(--success); }
    .test-result.fail { border: 1px solid var(--error); color: var(--error); }
    .test-result.hidden { display: none; }
    .row { display: flex; gap: 12px; }
    .row > * { flex: 1; }
    .provider-note { color: var(--muted); font-size: 0.8em; font-style: italic; margin-top: 4px; }
    .about { text-align: center; padding: 24px 16px; }
    .about img { width: 80px; height: 80px; margin-bottom: 12px; }
    .about .name { font-size: 1.2em; font-weight: 600; }
    .about .version { color: var(--muted); font-size: 0.85em; margin-top: 2px; }
    .about .desc { color: var(--muted); font-size: 0.85em; margin-top: 8px; }
    .about .links { margin-top: 12px; display: flex; justify-content: center; gap: 16px; }
    .about .links a { color: var(--btn-bg); text-decoration: none; font-size: 0.85em; cursor: pointer; }
    .about .links a:hover { text-decoration: underline; }
    .about .license { color: var(--muted); font-size: 0.8em; margin-top: 10px; }
  </style>
</head>
<body>
  <h1>AI &amp; Self-Healing Settings</h1>
  <p class="subtitle">Configure LLM providers and self-healing behaviour for selector repair.</p>

  <!-- Self-Healing Section -->
  <div class="section">
    <h2>Self-Healing</h2>

    <div class="field">
      <div class="toggle-row">
        <label class="toggle">
          <input type="checkbox" id="selfHealingEnabled" />
          <span class="slider"></span>
        </label>
        <label for="selfHealingEnabled">Enable self-healing selector resolution</label>
      </div>
      <p class="hint">When enabled, failed locators are automatically repaired using multiple strategies.</p>
    </div>

    <div class="field">
      <label for="embeddingThreshold">Embedding similarity threshold</label>
      <div style="display:flex;align-items:center;gap:10px;">
        <input type="range" id="embeddingThreshold" min="0.5" max="1" step="0.01" />
        <span id="thresholdValue" style="min-width:40px;text-align:right;">0.85</span>
      </div>
      <p class="hint">Higher = stricter matching. Recommended 0.80\u20130.90.</p>
    </div>

    <div class="field">
      <div class="toggle-row">
        <label class="toggle">
          <input type="checkbox" id="llmEnabled" />
          <span class="slider"></span>
        </label>
        <label for="llmEnabled">Enable LLM-based repair (Tier 3)</label>
      </div>
      <p class="hint">Uses an LLM as a last resort when direct and embedding strategies fail. Requires an API key below (unless using Ollama).</p>
    </div>
  </div>

  <!-- LLM Provider Section -->
  <div class="section" id="llmSection">
    <h2>LLM Provider</h2>

    <div class="field">
      <label for="provider">Provider</label>
      <select id="provider">
        <option value="openai">OpenAI</option>
        <option value="anthropic">Anthropic</option>
        <option value="ollama">Ollama (local)</option>
      </select>
    </div>

    <div class="field">
      <label for="model">Model</label>
      <input type="text" id="model" placeholder="e.g. gpt-4o-mini" />
      <p class="hint" id="modelHint">Model name sent to the provider's API.</p>
    </div>

    <!-- API Key for OpenAI -->
    <div class="field" id="openaiKeyField">
      <label>OpenAI API Key</label>
      <div class="api-key-row">
        <input type="password" id="openaiKey" placeholder="sk-..." />
        <button class="btn btn-primary" id="saveOpenaiKey">Save</button>
        <button class="btn btn-danger" id="removeOpenaiKey">Remove</button>
      </div>
      <div class="key-status" id="openaiKeyStatus"></div>
    </div>

    <!-- API Key for Anthropic -->
    <div class="field" id="anthropicKeyField">
      <label>Anthropic API Key</label>
      <div class="api-key-row">
        <input type="password" id="anthropicKey" placeholder="sk-ant-..." />
        <button class="btn btn-primary" id="saveAnthropicKey">Save</button>
        <button class="btn btn-danger" id="removeAnthropicKey">Remove</button>
      </div>
      <div style="margin-top:6px;">
        <button class="btn btn-secondary" id="getAnthropicKey"
          title="Opens the Anthropic Console in your browser where you can create or copy an API key">
          Get API Key &rarr;
        </button>
      </div>
      <div class="key-status" id="anthropicKeyStatus"></div>
    </div>

    <!-- Ollama URL -->
    <div class="field" id="ollamaUrlField">
      <label for="ollamaUrl">Ollama Server URL</label>
      <input type="text" id="ollamaUrl" placeholder="http://localhost:11434" />
      <p class="hint">Local Ollama server. No API key required.</p>
    </div>

    <!-- Test Connection -->
    <div class="field">
      <button class="btn btn-secondary" id="testConnection">Test Connection</button>
      <div class="test-result hidden" id="testResult"></div>
    </div>
  </div>

  <!-- About Section -->
  <div class="section about">
    <img src="${t}" alt="PlaywrightVCR Logo" />
    <div class="name">PlaywrightVCR</div>
    <div class="version">v${i}</div>
    <div class="desc">${s}</div>
    <div class="links">
      <a id="openRepo">GitHub Repository</a>
    </div>
    <div class="license">MIT License</div>
  </div>

  <script nonce="${l}">
    const vscode = acquireVsCodeApi();

    // Elements
    const selfHealingEnabled = document.getElementById('selfHealingEnabled');
    const embeddingThreshold = document.getElementById('embeddingThreshold');
    const thresholdValue = document.getElementById('thresholdValue');
    const llmEnabled = document.getElementById('llmEnabled');
    const provider = document.getElementById('provider');
    const model = document.getElementById('model');
    const ollamaUrl = document.getElementById('ollamaUrl');
    const openaiKey = document.getElementById('openaiKey');
    const anthropicKey = document.getElementById('anthropicKey');
    const testResult = document.getElementById('testResult');
    const llmSection = document.getElementById('llmSection');

    // Key status elements
    const openaiKeyStatus = document.getElementById('openaiKeyStatus');
    const anthropicKeyStatus = document.getElementById('anthropicKeyStatus');

    // Provider-specific field visibility
    const openaiKeyField = document.getElementById('openaiKeyField');
    const anthropicKeyField = document.getElementById('anthropicKeyField');
    const ollamaUrlField = document.getElementById('ollamaUrlField');

    function updateProviderVisibility() {
      const p = provider.value;
      openaiKeyField.style.display = p === 'openai' ? '' : 'none';
      anthropicKeyField.style.display = p === 'anthropic' ? '' : 'none';
      ollamaUrlField.style.display = p === 'ollama' ? '' : 'none';
    }

    function updateLlmSectionVisibility() {
      llmSection.style.opacity = llmEnabled.checked ? '1' : '0.5';
      llmSection.style.pointerEvents = llmEnabled.checked ? '' : 'none';
    }

    function updateKeyStatus(el, hasKey) {
      if (hasKey) {
        el.innerHTML = '<span class="dot green"></span> Key stored securely';
        el.className = 'key-status stored';
      } else {
        el.innerHTML = '<span class="dot red"></span> No key configured';
        el.className = 'key-status missing';
      }
    }

    // Settings change handlers
    selfHealingEnabled.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'selfHealing.enabled', value: selfHealingEnabled.checked } });
    });

    embeddingThreshold.addEventListener('input', () => {
      thresholdValue.textContent = Number(embeddingThreshold.value).toFixed(2);
    });
    embeddingThreshold.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'selfHealing.embeddingThreshold', value: Number(embeddingThreshold.value) } });
    });

    llmEnabled.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'selfHealing.llmEnabled', value: llmEnabled.checked } });
      updateLlmSectionVisibility();
    });

    provider.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'ai.provider', value: provider.value } });
      updateProviderVisibility();
      testResult.className = 'test-result hidden';
    });

    model.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'ai.model', value: model.value } });
    });

    ollamaUrl.addEventListener('change', () => {
      vscode.postMessage({ type: 'updateSetting', payload: { key: 'ai.ollamaUrl', value: ollamaUrl.value } });
    });

    // API key save / remove
    document.getElementById('saveOpenaiKey').addEventListener('click', () => {
      const key = openaiKey.value.trim();
      if (!key) return;
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'openai', apiKey: key } });
      openaiKey.value = '';
    });
    document.getElementById('removeOpenaiKey').addEventListener('click', () => {
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'openai', apiKey: '' } });
    });

    document.getElementById('saveAnthropicKey').addEventListener('click', () => {
      const key = anthropicKey.value.trim();
      if (!key) return;
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'anthropic', apiKey: key } });
      anthropicKey.value = '';
    });
    document.getElementById('removeAnthropicKey').addEventListener('click', () => {
      vscode.postMessage({ type: 'setApiKey', payload: { provider: 'anthropic', apiKey: '' } });
    });

    // Get API Key \u2014 opens Anthropic Console in browser, then focuses the key input
    document.getElementById('getAnthropicKey').addEventListener('click', () => {
      vscode.postMessage({ type: 'openAnthropicConsole' });
      setTimeout(() => {
        const keyInput = document.getElementById('anthropicKey');
        keyInput.type = 'text';
        keyInput.placeholder = 'Paste your API key here...';
        keyInput.focus();
        keyInput.addEventListener('input', function handler() {
          keyInput.type = 'password';
          keyInput.placeholder = 'sk-ant-...';
          keyInput.removeEventListener('input', handler);
        }, { once: true });
      }, 300);
    });

    // Test connection
    document.getElementById('testConnection').addEventListener('click', () => {
      testResult.textContent = 'Testing...';
      testResult.className = 'test-result';
      vscode.postMessage({ type: 'testConnection', payload: { provider: provider.value } });
    });

    // Receive messages from the extension host
    window.addEventListener('message', (event) => {
      const msg = event.data;
      switch (msg.type) {
        case 'settingsLoaded': {
          const s = msg.payload;
          selfHealingEnabled.checked = s.selfHealingEnabled;
          embeddingThreshold.value = s.embeddingThreshold;
          thresholdValue.textContent = Number(s.embeddingThreshold).toFixed(2);
          llmEnabled.checked = s.llmEnabled;
          provider.value = s.provider;
          model.value = s.model;
          ollamaUrl.value = s.ollamaUrl;
          updateKeyStatus(openaiKeyStatus, s.hasOpenAIKey);
          updateKeyStatus(anthropicKeyStatus, s.hasAnthropicKey);
          updateProviderVisibility();
          updateLlmSectionVisibility();
          break;
        }
        case 'connectionTestResult': {
          const r = msg.payload;
          testResult.textContent = r.message;
          testResult.className = 'test-result ' + (r.ok ? 'ok' : 'fail');
          break;
        }
        case 'focusAnthropicKey': {
          const keyInput = document.getElementById('anthropicKey');
          keyInput.type = 'text';
          keyInput.placeholder = 'Paste your API key here...';
          keyInput.focus();
          keyInput.addEventListener('input', function handler() {
            keyInput.type = 'password';
            keyInput.placeholder = 'sk-ant-...';
            keyInput.removeEventListener('input', handler);
          }, { once: true });
          break;
        }
      }
    });

    // About \u2014 open repo link
    document.getElementById('openRepo').addEventListener('click', () => {
      vscode.postMessage({ type: 'openRepo' });
    });

    // Request settings on load
    vscode.postMessage({ type: 'getSettings' });
  </script>
</body>
</html>`}};function Ks(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var jn=M(qn()),Ke=M(require("path")),ge=M(require("fs"));function Js(c,t){let i={};for(let s=0;s<c.length;s++)i[c[s]]=t[s];return i}function He(c,t,i){let s=c.prepare(t);i&&s.bind(i);let l=[];for(;s.step();)l.push(Js(s.getColumnNames(),s.get()));return s.free(),l}function Ct(c,t,i){let s=He(c,t,i);return s.length>0?s[0]:null}var Ot=class c{db;dbPath;ready;persistTimer=null;dirty=!1;static PERSIST_DEBOUNCE_MS=500;constructor(t){ge.existsSync(t)||ge.mkdirSync(t,{recursive:!0}),this.dbPath=Ke.join(t,"playwright-vcr.db"),this.ready=this.initialize()}async initialize(){let t=await(0,jn.default)({locateFile:i=>{let s=Ke.join(__dirname,i);if(ge.existsSync(s))return s;try{let l=Ke.dirname(require.resolve("sql.js/dist/sql-wasm.js"));return Ke.join(l,i)}catch{return s}}});if(ge.existsSync(this.dbPath)){let i=ge.readFileSync(this.dbPath);this.db=new t.Database(i)}else this.db=new t.Database;this.createTables(),this.persistNow()}async waitReady(){await this.ready}persistNow(){this.persistTimer&&(clearTimeout(this.persistTimer),this.persistTimer=null);let t=this.db.export();ge.writeFileSync(this.dbPath,Buffer.from(t)),this.dirty=!1}persist(){this.dirty=!0,!this.persistTimer&&(this.persistTimer=setTimeout(()=>{this.persistTimer=null,this.dirty&&this.persistNow()},c.PERSIST_DEBOUNCE_MS))}createTables(){this.db.run(`
      CREATE TABLE IF NOT EXISTS recordings (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        tags TEXT DEFAULT '',
        description TEXT DEFAULT '',
        action_count INTEGER DEFAULT 0,
        duration_ms INTEGER DEFAULT 0,
        auth_state_path TEXT
      );

      CREATE TABLE IF NOT EXISTS actions (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        step_index INTEGER NOT NULL,
        action_type TEXT NOT NULL,
        url TEXT DEFAULT '',
        locators TEXT NOT NULL DEFAULT '{}',
        screenshot_path TEXT,
        timestamp_ms INTEGER DEFAULT 0,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS executions (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        started_at TEXT NOT NULL,
        finished_at TEXT,
        status TEXT NOT NULL DEFAULT 'running',
        trigger_type TEXT NOT NULL DEFAULT 'manual',
        failure_step INTEGER,
        error_message TEXT,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS healed_selectors (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        step_index INTEGER NOT NULL,
        original_locator TEXT NOT NULL,
        healed_locator TEXT NOT NULL,
        strategy_used TEXT NOT NULL,
        healed_at TEXT NOT NULL,
        success_count INTEGER DEFAULT 0,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS schedules (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        cron_expression TEXT NOT NULL,
        enabled INTEGER DEFAULT 1,
        last_run TEXT,
        next_run TEXT,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        recording_id TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'queued',
        created_at TEXT NOT NULL,
        started_at TEXT,
        finished_at TEXT,
        attempts INTEGER DEFAULT 0,
        max_attempts INTEGER DEFAULT 3,
        result_json TEXT,
        FOREIGN KEY (recording_id) REFERENCES recordings(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_actions_recording ON actions(recording_id, step_index);
      CREATE INDEX IF NOT EXISTS idx_executions_recording ON executions(recording_id, started_at);
      CREATE INDEX IF NOT EXISTS idx_healed_recording_step ON healed_selectors(recording_id, step_index);
      CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status, created_at);
      CREATE INDEX IF NOT EXISTS idx_schedules_enabled ON schedules(enabled);
    `)}createRecording(t){this.db.run(`INSERT INTO recordings (id, name, url, created_at, updated_at, tags, description, action_count, duration_ms, auth_state_path)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[t.id,t.name,t.url,t.created_at,t.updated_at,t.tags,t.description,t.action_count,t.duration_ms,t.auth_state_path]),this.persist()}getRecording(t){return Ct(this.db,"SELECT * FROM recordings WHERE id = ?",[t])}getAllRecordings(){return He(this.db,"SELECT * FROM recordings ORDER BY created_at DESC")}updateRecording(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>`${p} = ?`).join(", "),o=s.map(p=>i[p]);this.db.run(`UPDATE recordings SET ${l} WHERE id = ?`,[...o,t]),this.persist()}deleteRecording(t){this.db.run("DELETE FROM actions WHERE recording_id = ?",[t]),this.db.run("DELETE FROM executions WHERE recording_id = ?",[t]),this.db.run("DELETE FROM healed_selectors WHERE recording_id = ?",[t]),this.db.run("DELETE FROM schedules WHERE recording_id = ?",[t]),this.db.run("DELETE FROM jobs WHERE recording_id = ?",[t]),this.db.run("DELETE FROM recordings WHERE id = ?",[t]),this.persist()}createAction(t){this.db.run(`INSERT INTO actions (id, recording_id, step_index, action_type, url, locators, screenshot_path, timestamp_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,[t.id,t.recording_id,t.step_index,t.action_type,t.url,t.locators,t.screenshot_path,t.timestamp_ms]),this.persist()}getActions(t){return He(this.db,"SELECT * FROM actions WHERE recording_id = ? ORDER BY step_index",[t])}createExecution(t){let i=crypto.randomUUID();return this.db.run(`INSERT INTO executions (id, recording_id, started_at, status, trigger_type)
       VALUES (?, ?, ?, ?, ?)`,[i,t.recording_id,t.started_at,t.status,t.trigger]),this.persist(),i}updateExecution(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>`${p} = ?`).join(", "),o=s.map(p=>i[p]);this.db.run(`UPDATE executions SET ${l} WHERE id = ?`,[...o,t]),this.persist()}getRecentExecutions(t){return He(this.db,"SELECT * FROM executions ORDER BY started_at DESC LIMIT ?",[t])}getHealedSelector(t,i){return Ct(this.db,"SELECT * FROM healed_selectors WHERE recording_id = ? AND step_index = ? ORDER BY success_count DESC LIMIT 1",[t,i])}createHealedSelector(t){let i=crypto.randomUUID();this.db.run(`INSERT INTO healed_selectors (id, recording_id, step_index, original_locator, healed_locator, strategy_used, healed_at, success_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,[i,t.recording_id,t.step_index,t.original_locator,t.healed_locator,t.strategy_used,new Date().toISOString()]),this.persist()}incrementHealedSelectorSuccess(t){this.db.run("UPDATE healed_selectors SET success_count = success_count + 1 WHERE id = ?",[t]),this.persist()}getAllSchedules(){return He(this.db,"SELECT * FROM schedules ORDER BY recording_id").map(t=>({...t,enabled:!!t.enabled}))}getEnabledSchedules(){return He(this.db,"SELECT * FROM schedules WHERE enabled = 1").map(t=>({...t,enabled:!0}))}createSchedule(t,i){let s=crypto.randomUUID();return this.db.run("INSERT INTO schedules (id, recording_id, cron_expression, enabled) VALUES (?, ?, ?, 1)",[s,t,i]),this.persist(),s}updateSchedule(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>p==="enabled"?"enabled = ?":`${p} = ?`).join(", "),o=s.map(p=>p==="enabled"?i.enabled?1:0:i[p]);this.db.run(`UPDATE schedules SET ${l} WHERE id = ?`,[...o,t]),this.persist()}deleteSchedule(t){this.db.run("DELETE FROM schedules WHERE id = ?",[t]),this.persist()}createJob(t,i=3){let s=crypto.randomUUID();return this.db.run("INSERT INTO jobs (id, recording_id, status, created_at, attempts, max_attempts) VALUES (?, ?, 'queued', ?, 0, ?)",[s,t,new Date().toISOString(),i]),this.persist(),s}getNextQueuedJob(){return Ct(this.db,"SELECT * FROM jobs WHERE status = 'queued' ORDER BY created_at ASC LIMIT 1")}updateJob(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>`${p} = ?`).join(", "),o=s.map(p=>i[p]);this.db.run(`UPDATE jobs SET ${l} WHERE id = ?`,[...o,t]),this.persist()}getRunningJobCount(){let t=Ct(this.db,"SELECT COUNT(*) FROM jobs WHERE status = 'running'");return t?t["COUNT(*)"]:0}close(){this.persistNow(),this.db.close()}};var G=M(require("fs/promises")),ae=M(require("path")),Ut=class{constructor(t){this.storagePath=t;this.recordingsDir=ae.join(t,"recordings"),this.modelsDir=ae.join(t,"models")}recordingsDir;modelsDir;async ensureDirectories(){await G.mkdir(this.recordingsDir,{recursive:!0}),await G.mkdir(this.modelsDir,{recursive:!0})}getRecordingDir(t){return ae.join(this.recordingsDir,t)}async ensureRecordingDir(t){let i=this.getRecordingDir(t);return await G.mkdir(i,{recursive:!0}),i}getTracePath(t){return ae.join(this.getRecordingDir(t),"trace.zip")}getPlaybackTracePath(t,i){return ae.join(this.getRecordingDir(t),`playback-${i}.zip`)}getStepScreenshotPath(t,i){return ae.join(this.getRecordingDir(t),`step-${i}.png`)}async saveAuthState(t,i){let s=await this.ensureRecordingDir(t),l=ae.join(s,"auth-state.json");return await G.writeFile(l,JSON.stringify(i,null,2),"utf-8"),l}async loadAuthState(t){let i=ae.join(this.getRecordingDir(t),"auth-state.json");try{let s=await G.readFile(i,"utf-8");return JSON.parse(s)}catch{return null}}async saveActionsJson(t,i){let s=await this.ensureRecordingDir(t),l=ae.join(s,"actions.json");await G.writeFile(l,JSON.stringify(i,null,2),"utf-8")}async loadActionsJson(t){let i=ae.join(this.getRecordingDir(t),"actions.json");try{let s=await G.readFile(i,"utf-8");return JSON.parse(s)}catch{return null}}async deleteRecordingFiles(t){let i=this.getRecordingDir(t);try{await G.rm(i,{recursive:!0,force:!0})}catch{}}getModelsDir(){return this.modelsDir}async fileExists(t){try{return await G.access(t),!0}catch{return!1}}async getScreenshots(t){let i=this.getRecordingDir(t);try{return(await G.readdir(i)).filter(l=>l.startsWith("step-")&&l.endsWith(".png")).sort((l,o)=>{let p=parseInt(l.replace("step-","").replace(".png","")),f=parseInt(o.replace("step-","").replace(".png",""));return p-f}).map(l=>ae.join(i,l))}catch{return[]}}};var Ce=require("playwright");var Bn=M(require("crypto")),qt=new Uint8Array(256),Ft=qt.length;function Ir(){return Ft>qt.length-16&&(Bn.default.randomFillSync(qt),Ft=0),qt.slice(Ft,Ft+=16)}var W=[];for(let c=0;c<256;++c)W.push((c+256).toString(16).slice(1));function Vn(c,t=0){return W[c[t+0]]+W[c[t+1]]+W[c[t+2]]+W[c[t+3]]+"-"+W[c[t+4]]+W[c[t+5]]+"-"+W[c[t+6]]+W[c[t+7]]+"-"+W[c[t+8]]+W[c[t+9]]+"-"+W[c[t+10]]+W[c[t+11]]+W[c[t+12]]+W[c[t+13]]+W[c[t+14]]+W[c[t+15]]}var Hn=M(require("crypto")),Pr={randomUUID:Hn.default.randomUUID};function Xs(c,t,i){if(Pr.randomUUID&&!t&&!c)return Pr.randomUUID();c=c||{};let s=c.random||(c.rng||Ir)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){i=i||0;for(let l=0;l<16;++l)t[i+l]=s[l];return t}return Vn(s)}var jt=Xs;var Lr=M(require("vscode"));var Bt=class{MAX_DEPTH=8;MAX_ELEMENTS=200;MAX_TEXT_LENGTH=80;MAX_ATTR_LENGTH=60;async simplify(t){let i=await t.evaluate(({maxDepth:s,maxElements:l,maxTextLen:o,maxAttrLen:p})=>{let f=new Set(["script","style","noscript","svg","path","circle","rect","line","polygon","polyline","ellipse","g","defs","clippath","lineargradient","radialgradient","stop","symbol","use","mask","iframe","object","embed","applet","meta","link","base"]),b=new Set(["id","class","role","aria-label","aria-labelledby","aria-describedby","aria-expanded","aria-selected","aria-checked","data-testid","data-test","name","type","href","placeholder","value","title","alt","for","action","method"]),S=0;function R(C,P){if(S>=l)return"";if(P>s)return"...";if(C.nodeType===Node.TEXT_NODE){let O=(C.textContent||"").trim();return O?O.substring(0,o):""}if(C.nodeType!==Node.ELEMENT_NODE)return"";let J=C,$=J.tagName.toLowerCase();if(f.has($))return"";let E=window.getComputedStyle(J);if(E.display==="none"||E.visibility==="hidden")return"";S++;let x="";for(let O of b){let Y=J.getAttribute(O);if(Y!==null&&Y!==""){let Ue=Y.substring(0,p);x+=` ${O}="${Ue}"`}}if(["br","hr","img","input"].includes($))return`<${$}${x}/>`;let I=[];for(let O of Array.from(J.childNodes)){let Y=R(O,P+1);Y&&I.push(Y)}let L=I.join("");return!L&&!x?"":`<${$}${x}>${L}</${$}>`}return R(document.body,0)},{maxDepth:this.MAX_DEPTH,maxElements:this.MAX_ELEMENTS,maxTextLen:this.MAX_TEXT_LENGTH,maxAttrLen:this.MAX_ATTR_LENGTH});return i.length>16e3?i.substring(0,16e3)+`
<!-- truncated -->`:i}};var Vt=class{constructor(t){this.secrets=t}domSimplifier=new Bt;async repairSelector(t,i){let s=Lr.workspace.getConfiguration("playwrightVcr"),l=s.get("ai.provider","openai"),o=s.get("ai.model","gpt-4o-mini"),p=await this.secrets?.get(`playwrightVcr.apiKey.${l}`)??"";if(!p&&l!=="ollama")return console.warn('LLM repair: No API key configured. Use "PlaywrightVCR: Set AI Provider API Key" command.'),null;let f=await this.domSimplifier.simplify(t),b=this.buildPrompt(i,f),S=null;switch(l){case"openai":S=await this.callOpenAI(p,o,b);break;case"anthropic":S=await this.callAnthropic(p,o,b);break;case"ollama":S=await this.callOllama(o,b);break;default:return console.warn(`Unknown LLM provider: ${l}`),null}return S?this.extractSelector(S):null}buildPrompt(t,i){let s=[];if(t.fingerprint){let o=t.fingerprint;s.push(`Tag: ${o.tag}`),o.id&&s.push(`ID: ${o.id}`),o.testId&&s.push(`Test ID: ${o.testId}`),o.ariaRole&&s.push(`ARIA Role: ${o.ariaRole}`),o.ariaLabel&&s.push(`ARIA Label: ${o.ariaLabel}`),o.text&&s.push(`Text: ${o.text.substring(0,100)}`),o.placeholder&&s.push(`Placeholder: ${o.placeholder}`),o.classes.length&&s.push(`Classes: ${o.classes.join(", ")}`),s.push(`Position: (${Math.round(o.boundingRect.x)}, ${Math.round(o.boundingRect.y)})`)}let l=[];return t.testId&&l.push(`data-testid="${t.testId}"`),t.role&&l.push(`role="${t.role.role}" name="${t.role.name}"`),t.label&&l.push(`label="${t.label}"`),t.text&&l.push(`text="${t.text}"`),t.css&&l.push(`css="${t.css}"`),t.xpath&&l.push(`xpath="${t.xpath}"`),`You are a Playwright selector repair tool. An automated test cannot find an element on a web page.

## Original Element Description
${s.join(`
`)}

## Original Selectors (all failed)
${l.join(`
`)}

## Current Page DOM (simplified)
\`\`\`html
${i}
\`\`\`

## Task
Find the element that best matches the original element description in the current DOM.
Return ONLY a single Playwright-compatible CSS selector string that uniquely identifies the element.
Do not include any explanation, code blocks, or extra text \u2014 just the raw selector string.

If you cannot find a matching element, respond with: NONE`}async callOpenAI(t,i,s){try{let l=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:i,messages:[{role:"system",content:"You are a Playwright selector repair assistant. Return only the selector string."},{role:"user",content:s}],max_tokens:200,temperature:0})});return l.ok?(await l.json()).choices?.[0]?.message?.content?.trim()||null:(console.error(`OpenAI API error: ${l.status}`),null)}catch(l){return console.error("OpenAI API call failed:",l),null}}async callAnthropic(t,i,s){try{let l=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":t,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i,max_tokens:200,messages:[{role:"user",content:s}]})});return l.ok?(await l.json()).content?.[0]?.text?.trim()||null:(console.error(`Anthropic API error: ${l.status}`),null)}catch(l){return console.error("Anthropic API call failed:",l),null}}async callOllama(t,i){let l=Lr.workspace.getConfiguration("playwrightVcr").get("ai.ollamaUrl","http://localhost:11434");try{let o=await fetch(`${l}/api/generate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,prompt:i,stream:!1,options:{temperature:0}})});return o.ok?(await o.json()).response?.trim()||null:(console.error(`Ollama API error: ${o.status}`),null)}catch(o){return console.error("Ollama API call failed:",o),null}}extractSelector(t){let i=t.trim();if(i==="NONE"||i.toLowerCase().includes("cannot find"))return null;let s=i.replace(/^```[a-z]*\n?/i,"").replace(/\n?```$/i,"").trim();return(s.startsWith('"')&&s.endsWith('"')||s.startsWith("'")&&s.endsWith("'"))&&(s=s.slice(1,-1)),s.length===0||s.length>500?null:s}};var Ht=class{pipeline=null;initialized=!1;async initialize(){if(!this.initialized)try{let{pipeline:t}=await import("@huggingface/transformers");this.pipeline=await t("feature-extraction","Xenova/all-MiniLM-L6-v2",{cache_dir:void 0}),this.initialized=!0}catch(t){throw console.error("Failed to initialize embedding model:",t),new Error("Embedding model initialization failed. Install @huggingface/transformers or disable embedding-based self-healing.")}}async findMostSimilar(t,i,s){if(!this.pipeline)throw new Error("Embedding model not initialized. Call initialize() first.");let l=this.fingerprintToText(i),o=await this.embed(l),p=await t.evaluate(()=>{let R=["a","button","input","select","textarea","label","summary","details"],C=["button","link","textbox","checkbox","radio","combobox","tab","menuitem"],P=[],J=document.querySelectorAll("*"),$=0;return J.forEach(E=>{if(!(E instanceof HTMLElement))return;let x=E.getBoundingClientRect();if(x.width===0||x.height===0||window.getComputedStyle(E).visibility==="hidden")return;let I=E.tagName.toLowerCase(),L=E.getAttribute("role");!(R.includes(I)||L&&C.includes(L)||E.onclick!==null||E.getAttribute("tabindex")!==null)&&!E.id&&!E.getAttribute("data-testid")||P.push({index:$++,tag:I,id:E.id||null,classes:Array.from(E.classList).slice(0,5),text:(E.textContent||"").trim().substring(0,100),ariaLabel:E.getAttribute("aria-label"),ariaRole:L,testId:E.getAttribute("data-testid"),placeholder:E.placeholder||null,name:E.getAttribute("name"),type:E.getAttribute("type")})}),P});if(p.length===0)return null;let f=null,b=-1,S=32;for(let R=0;R<p.length;R+=S){let C=p.slice(R,R+S),P=C.map($=>this.candidateToText($)),J=await Promise.all(P.map($=>this.embed($)));for(let $=0;$<C.length;$++){let E=this.cosineSimilarity(o,J[$]);if(E>b&&E>=s){b=E;let x=C[$],I;x.testId?I=t.getByTestId(x.testId):x.id?I=t.locator(`#${x.id}`):x.ariaRole&&x.text?I=t.getByRole(x.ariaRole,{name:x.text.substring(0,50)}):x.text?I=t.getByText(x.text.substring(0,50)):I=t.locator(`${x.tag}`).nth(x.index),f={locator:I,similarity:E}}}}return f}fingerprintToText(t){return[`tag:${t.tag}`,t.id?`id:${t.id}`:"",t.testId?`testid:${t.testId}`:"",t.ariaRole?`role:${t.ariaRole}`:"",t.ariaLabel?`label:${t.ariaLabel}`:"",t.text?`text:${t.text.substring(0,100)}`:"",t.placeholder?`placeholder:${t.placeholder}`:"",t.name?`name:${t.name}`:"",t.type?`type:${t.type}`:"",t.classes.length?`class:${t.classes.join(" ")}`:""].filter(Boolean).join(" ")}candidateToText(t){return[`tag:${t.tag}`,t.id?`id:${t.id}`:"",t.testId?`testid:${t.testId}`:"",t.ariaRole?`role:${t.ariaRole}`:"",t.ariaLabel?`label:${t.ariaLabel}`:"",t.text?`text:${t.text}`:"",t.placeholder?`placeholder:${t.placeholder}`:"",t.name?`name:${t.name}`:"",t.type?`type:${t.type}`:"",t.classes.length?`class:${t.classes.join(" ")}`:""].filter(Boolean).join(" ")}async embed(t){let i=await this.pipeline(t,{pooling:"mean",normalize:!0});return Array.from(i.data)}cosineSimilarity(t,i){let s=0,l=0,o=0;for(let p=0;p<t.length;p++)s+=t[p]*i[p],l+=t[p]*t[p],o+=i[p]*i[p];return s/(Math.sqrt(l)*Math.sqrt(o))}};function Kn(c){let t=c.fingerprint;return t?{testId:t.testId,role:t.ariaRole?{role:t.ariaRole,name:t.ariaLabel||t.innerText?.substring(0,50)||""}:null,label:t.labels?.[0]||null,text:t.innerText?.substring(0,100)||null,placeholder:t.placeholder,css:c.cssSelector||null,xpath:c.xpath||null,fingerprint:t}:{testId:null,role:null,label:null,text:null,placeholder:null,css:c.cssSelector||null,xpath:c.xpath||null,fingerprint:null}}var Kt=class{constructor(t,i,s){this.db=t;this.config=i;this.secrets=s}embeddings=null;llmRepair=null;async resolve(t,i,s,l){let o=this.db.getHealedSelector(s,l);if(o)try{let f=t.locator(o.healed_locator);if(await f.count()===1)return this.db.incrementHealedSelectorSuccess(o.id),{locator:f,strategy:`cached:${o.strategy_used}`,healed:!0}}catch{}let p=await this.tryDirectLocators(t,i);if(p)return p;if(!this.config.enabled)throw new Error(`No element found for step ${l}. Self-healing is disabled.`);if(i.fingerprint){let f=await this.tryEmbeddingSimilarity(t,i.fingerprint);if(f)return this.cacheHealedSelector(s,l,i,f),f}if(this.config.llmEnabled&&i.fingerprint){let f=await this.tryLlmRepair(t,i);if(f)return this.cacheHealedSelector(s,l,i,f),f}throw new Error(`Self-healing failed: no element found for step ${l} after all tiers.`)}async tryDirectLocators(t,i){let s=[{name:"testId",getLocator:()=>i.testId?t.getByTestId(i.testId):null},{name:"role",getLocator:()=>i.role?t.getByRole(i.role.role,{name:i.role.name}):null},{name:"label",getLocator:()=>i.label?t.getByLabel(i.label):null},{name:"text",getLocator:()=>i.text?t.getByText(i.text,{exact:!1}):null},{name:"placeholder",getLocator:()=>i.placeholder?t.getByPlaceholder(i.placeholder):null},{name:"css",getLocator:()=>i.css?t.locator(i.css):null},{name:"xpath",getLocator:()=>i.xpath?t.locator(`xpath=${i.xpath}`):null}];for(let{name:l,getLocator:o}of s)try{let p=o();if(!p)continue;let f=await p.count();if(f===1)return{locator:p,strategy:l,healed:!1};if(f>1&&i.fingerprint)return{locator:p.first(),strategy:`${l}:first`,healed:!1}}catch{continue}return null}async tryEmbeddingSimilarity(t,i){try{this.embeddings||(this.embeddings=new Ht,await this.embeddings.initialize());let s=await this.embeddings.findMostSimilar(t,i,this.config.embeddingThreshold);if(s)return{locator:s.locator,strategy:`embedding:${s.similarity.toFixed(3)}`,healed:!0}}catch{}return null}async tryLlmRepair(t,i){try{this.llmRepair||(this.llmRepair=new Vt(this.secrets));let s=await this.llmRepair.repairSelector(t,i);if(s){let l=t.locator(s);if(await l.count()>=1)return{locator:l.first(),strategy:"llm",healed:!0}}}catch{}return null}cacheHealedSelector(t,i,s,l){let o=s.testId||s.css||s.xpath||"unknown";this.db.createHealedSelector({recording_id:t,step_index:i,original_locator:o,healed_locator:`[healed:${l.strategy}]`,strategy_used:l.strategy})}};var Ws=`
(() => {
  const RPA_EVENTS = ['click', 'dblclick', 'input', 'change', 'submit', 'keydown', 'select', 'scroll'];

  function getElementFingerprint(el) {
    const rect = el.getBoundingClientRect();
    const labels = el.labels ? Array.from(el.labels).map(l => l.textContent?.trim()) : [];
    return {
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      classes: Array.from(el.classList),
      text: (el.textContent || '').trim().substring(0, 200),
      innerText: (el.innerText || '').trim().substring(0, 200),
      placeholder: el.placeholder || null,
      ariaLabel: el.getAttribute('aria-label') || null,
      ariaRole: el.getAttribute('role') || el.tagName.toLowerCase(),
      testId: el.getAttribute('data-testid') || el.getAttribute('data-test') || null,
      name: el.getAttribute('name') || null,
      type: el.getAttribute('type') || null,
      href: el.getAttribute('href') || null,
      value: el.value || null,
      boundingRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      parentTag: el.parentElement?.tagName.toLowerCase() || null,
      parentId: el.parentElement?.id || null,
      parentClasses: el.parentElement ? Array.from(el.parentElement.classList) : [],
      labels,
      childIndex: el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0,
    };
  }

  function createXPath(el) {
    const parts = [];
    let current = el;
    while (current && current.nodeType === Node.ELEMENT_NODE) {
      let index = 1;
      let sibling = current.previousElementSibling;
      while (sibling) {
        if (sibling.tagName === current.tagName) index++;
        sibling = sibling.previousElementSibling;
      }
      parts.unshift(current.tagName.toLowerCase() + '[' + index + ']');
      current = current.parentElement;
    }
    return '/' + parts.join('/');
  }

  function createCssSelector(el) {
    if (el.id) return '#' + CSS.escape(el.id);
    const parts = [];
    let current = el;
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      if (current.id) {
        selector = '#' + CSS.escape(current.id);
        parts.unshift(selector);
        break;
      }
      if (current.className && typeof current.className === 'string') {
        const classes = current.className.trim().split(/\\s+/).slice(0, 3);
        if (classes.length) selector += '.' + classes.map(c => CSS.escape(c)).join('.');
      }
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
        if (siblings.length > 1) {
          const idx = siblings.indexOf(current) + 1;
          selector += ':nth-of-type(' + idx + ')';
        }
      }
      parts.unshift(selector);
      current = current.parentElement;
    }
    return parts.join(' > ');
  }

  for (const eventType of RPA_EVENTS) {
    document.addEventListener(eventType, (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      // Debounce scroll events
      if (eventType === 'scroll') {
        if (window.__rpaScrollTimeout) clearTimeout(window.__rpaScrollTimeout);
        window.__rpaScrollTimeout = setTimeout(() => {
          window.__rpaEvent(JSON.stringify({
            type: 'scroll',
            url: window.location.href,
            timestamp: Date.now(),
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            fingerprint: getElementFingerprint(target),
            cssSelector: createCssSelector(target),
            xpath: createXPath(target),
          }));
        }, 300);
        return;
      }

      const payload = {
        type: eventType,
        url: window.location.href,
        timestamp: Date.now(),
        value: target.value || null,
        key: e.key || null,
        fingerprint: getElementFingerprint(target),
        cssSelector: createCssSelector(target),
        xpath: createXPath(target),
      };

      window.__rpaEvent(JSON.stringify(payload));
    }, { capture: true, passive: true });
  }

  // Capture navigation
  const originalPushState = history.pushState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    window.__rpaEvent(JSON.stringify({
      type: 'navigation',
      url: window.location.href,
      timestamp: Date.now(),
    }));
  };
})();
`,Jt=class{constructor(t,i){this.db=t;this.fileManager=i}browser=null;context=null;page=null;actions=[];currentRecordingId=null;actionCallbacks=[];startTime=0;isRecording=!1;onAction(t){this.actionCallbacks.push(t)}emitAction(t){for(let i of this.actionCallbacks)i(t)}async start(t,i="chromium",s=!1){if(this.isRecording)throw new Error("Already recording. Stop the current recording first.");let l=jt();this.currentRecordingId=l,this.actions=[],this.startTime=Date.now(),this.isRecording=!0;let p={chromium:Ce.chromium,firefox:Ce.firefox,webkit:Ce.webkit}[i]||Ce.chromium;return this.browser=await p.launch({headless:!1,slowMo:0}),this.context=await this.browser.newContext({viewport:{width:1280,height:720},recordVideo:void 0}),await this.context.tracing.start({screenshots:!0,snapshots:!0}),this.page=await this.context.newPage(),await this.page.exposeFunction("__rpaEvent",f=>{try{let b=JSON.parse(f);this.actions.push(b),this.emitAction(b)}catch{}}),await this.context.addInitScript(Ws),await this.page.goto(t,{waitUntil:"domcontentloaded"}),this.db.createRecording({id:l,name:`Recording ${new Date().toLocaleString()}`,url:t,created_at:new Date().toISOString(),updated_at:new Date().toISOString(),tags:"",description:"",action_count:0,duration_ms:0,auth_state_path:null}),l}async stop(){if(!this.isRecording||!this.currentRecordingId)return null;let t=this.currentRecordingId,i=Date.now()-this.startTime,s=null;if(this.context)try{let o=await this.context.storageState();s=await this.fileManager.saveAuthState(t,o)}catch{}if(this.context){let o=this.fileManager.getTracePath(t);await this.context.tracing.stop({path:o})}for(let o=0;o<this.actions.length;o++){let p=this.actions[o],f=Kn(p);this.db.createAction({id:jt(),recording_id:t,step_index:o,action_type:p.type,url:p.url,locators:JSON.stringify(f),screenshot_path:null,timestamp_ms:p.timestamp-this.startTime})}await this.fileManager.saveActionsJson(t,this.actions),this.db.updateRecording(t,{action_count:this.actions.length,duration_ms:i,auth_state_path:s,updated_at:new Date().toISOString()}),await this.page?.close().catch(()=>{}),await this.context?.close().catch(()=>{}),await this.browser?.close().catch(()=>{}),this.browser=null,this.context=null,this.page=null,this.isRecording=!1,this.actionCallbacks=[];let l=this.db.getRecording(t);return this.currentRecordingId=null,l}dispose(){this.page?.close().catch(()=>{}),this.context?.close().catch(()=>{}),this.browser?.close().catch(()=>{}),this.isRecording=!1}};var Oe=require("playwright"),Nr=M(require("vscode"));var Xt=class{constructor(t,i,s={}){this.db=t;this.fileManager=i;this.deps=s}browser=null;context=null;page=null;isPlaying=!1;shouldStop=!1;async play(t,i={},s){if(this.isPlaying)throw new Error("Already playing. Stop the current playback first.");let l=this.db.getRecording(t);if(!l)throw new Error(`Recording ${t} not found.`);let o=this.db.getActions(t);if(o.length===0)throw new Error("Recording has no actions.");this.isPlaying=!0,this.shouldStop=!1;let p=Nr.workspace.getConfiguration("playwrightVcr"),f=i.headless??p.get("headless",!1),b=i.slowMo??p.get("slowMo",0),S=i.browser??p.get("defaultBrowser","chromium"),R=new Kt(this.db,{enabled:p.get("selfHealing.enabled",!0),embeddingThreshold:p.get("selfHealing.embeddingThreshold",.85),llmEnabled:p.get("selfHealing.llmEnabled",!1)},this.deps.secrets),P={chromium:Oe.chromium,firefox:Oe.firefox,webkit:Oe.webkit}[S]||Oe.chromium;if(this.browser=await P.launch({headless:f,slowMo:b}),this.context=await this.browser.newContext({viewport:{width:1280,height:720}}),l.auth_state_path)try{let E=await this.fileManager.loadAuthState(t);E&&(this.context=await this.browser.newContext({viewport:{width:1280,height:720},storageState:E}))}catch{}this.page=await this.context.newPage(),await this.registerOverlayHandlers(this.page),await this.context.tracing.start({screenshots:!0,snapshots:!0});let J=this.db.createExecution({recording_id:t,started_at:new Date().toISOString(),status:"running",trigger:"manual"}),$=[];try{await this.page.goto(l.url,{waitUntil:"domcontentloaded"});for(let E=0;E<o.length&&!this.shouldStop;E++){let x=o[E],I=Date.now();try{let L=await this.executeAction(this.page,x,R,t),O={stepIndex:E,actionType:x.action_type,status:L.healed?"healed":"success",strategy:L.strategy,durationMs:Date.now()-I};try{let Y=this.fileManager.getStepScreenshotPath(t,E);await this.page.screenshot({path:Y}),O.screenshotPath=Y}catch{}$.push(O),s?.(O)}catch(L){let O={stepIndex:E,actionType:x.action_type,status:"failed",strategy:"none",durationMs:Date.now()-I,error:L.message};try{let Y=this.fileManager.getStepScreenshotPath(t,E);await this.page.screenshot({path:Y}),O.screenshotPath=Y}catch{}throw $.push(O),s?.(O),this.db.updateExecution(J,{finished_at:new Date().toISOString(),status:"fail",failure_step:E,error_message:L.message}),L}b>0&&E<o.length-1&&await new Promise(L=>setTimeout(L,b))}this.db.updateExecution(J,{finished_at:new Date().toISOString(),status:"pass"})}finally{try{let E=this.fileManager.getPlaybackTracePath(t,J);await this.context.tracing.stop({path:E})}catch{}await this.cleanup()}return $}async executeAction(t,i,s,l){let o=JSON.parse(i.locators);switch(i.action_type){case"navigation":return await t.goto(i.url,{waitUntil:"domcontentloaded"}),{healed:!1,strategy:"navigation"};case"scroll":return await t.evaluate(({x:p,y:f})=>window.scrollTo(p,f),{x:0,y:0}),{healed:!1,strategy:"scroll"};case"click":case"dblclick":{let p=await s.resolve(t,o,l,i.step_index);return i.action_type==="dblclick"?await p.locator.dblclick({timeout:1e4}):await p.locator.click({timeout:1e4}),{healed:p.healed,strategy:p.strategy}}case"input":case"change":{let p=await s.resolve(t,o,l,i.step_index),f=o.fingerprint?.value||"";return await p.locator.fill(f,{timeout:1e4}),{healed:p.healed,strategy:p.strategy}}case"keydown":{let p=o.fingerprint?.value||"Enter";return await t.keyboard.press(p),{healed:!1,strategy:"keyboard"}}case"select":{let p=await s.resolve(t,o,l,i.step_index),f=o.fingerprint?.value||"";return await p.locator.selectOption(f,{timeout:1e4}),{healed:p.healed,strategy:p.strategy}}case"submit":{let p=await s.resolve(t,o,l,i.step_index);return await p.locator.press("Enter",{timeout:1e4}),{healed:p.healed,strategy:p.strategy}}default:return{healed:!1,strategy:"skipped"}}}async registerOverlayHandlers(t){let s=Nr.workspace.getConfiguration("playwrightVcr").get("overlayDismissals",[]);for(let l of s)try{await t.addLocatorHandler(t.locator(l.detector),async()=>{try{await t.locator(l.action).click({timeout:5e3})}catch{}})}catch{}}async stop(){this.shouldStop=!0}async cleanup(){await this.page?.close().catch(()=>{}),await this.context?.close().catch(()=>{}),await this.browser?.close().catch(()=>{}),this.page=null,this.context=null,this.browser=null,this.isPlaying=!1,this.shouldStop=!1}dispose(){this.shouldStop=!0,this.cleanup()}};var be=M(require("vscode")),zt=M(require("fs/promises")),Wt=class{constructor(t,i){this.db=t;this.fileManager=i}async export(t,i){let s=this.db.getRecording(t);if(!s)throw new Error(`Recording ${t} not found.`);let l=this.db.getActions(t),o=i,p=this.getDefaultFileName(s.name,o),f=await be.window.showSaveDialog({defaultUri:be.Uri.file(p),filters:this.getFileFilters(o)});if(!f)return;let b;switch(o){case"TypeScript":b=this.generateTypeScript(s,l);break;case"JavaScript":b=this.generateJavaScript(s,l);break;case"Python":b=this.generatePython(s,l);break;case"Java":b=this.generateJava(s,l);break;case"C#":b=this.generateCSharp(s,l);break;case"JSON":b=this.generateJson(s,l);break;case"GitHub Actions YAML":b=this.generateGitHubActions(s);break;case"HAR":await this.exportTraceZip(t,f.fsPath),be.window.showInformationMessage(`Trace exported to ${f.fsPath}`);return;default:throw new Error(`Unsupported export format: ${i}`)}await zt.writeFile(f.fsPath,b,"utf-8"),be.window.showInformationMessage(`Exported to ${f.fsPath}`);let S=await be.workspace.openTextDocument(f);await be.window.showTextDocument(S)}generateTypeScript(t,i){let s=["import { test, expect } from '@playwright/test';","",`test('${this.escapeString(t.name)}', async ({ page }) => {`,`  // Recorded on ${t.created_at} from ${t.url}`,`  await page.goto('${this.escapeString(t.url)}');`,""];for(let l of i){let o=this.generatePlaywrightAction(l,"  ");o&&s.push(o)}return s.push("});",""),s.join(`
`)}generateJavaScript(t,i){let s=["const { test, expect } = require('@playwright/test');","",`test('${this.escapeString(t.name)}', async ({ page }) => {`,`  // Recorded on ${t.created_at} from ${t.url}`,`  await page.goto('${this.escapeString(t.url)}');`,""];for(let l of i){let o=this.generatePlaywrightAction(l,"  ");o&&s.push(o)}return s.push("});",""),s.join(`
`)}generatePython(t,i){let s=["import pytest","from playwright.sync_api import Page, expect","","",`def test_${this.toSnakeCase(t.name)}(page: Page):`,`    """Recorded on ${t.created_at} from ${t.url}"""`,`    page.goto("${this.escapeString(t.url)}")`,""];for(let l of i){let o=this.generatePythonAction(l,"    ");o&&s.push(o)}return s.push(""),s.join(`
`)}generateJava(t,i){let s=this.toPascalCase(t.name),l=["import com.microsoft.playwright.*;","import org.junit.jupiter.api.*;","",`public class ${s}Test {`,"    @Test",`    void test${s}() {`,"        try (Playwright playwright = Playwright.create()) {","            Browser browser = playwright.chromium().launch();","            Page page = browser.newPage();",`            // Recorded on ${t.created_at} from ${t.url}`,`            page.navigate("${this.escapeString(t.url)}");`,""];for(let o of i){let p=this.generateJavaAction(o,"            ");p&&l.push(p)}return l.push("        }","    }","}",""),l.join(`
`)}generateCSharp(t,i){let s=this.toPascalCase(t.name),l=["using Microsoft.Playwright;","using NUnit.Framework;","","[TestFixture]",`public class ${s}Tests`,"{","    [Test]",`    public async Task Test${s}()`,"    {","        using var playwright = await Playwright.CreateAsync();","        await using var browser = await playwright.Chromium.LaunchAsync();","        var page = await browser.NewPageAsync();",`        // Recorded on ${t.created_at} from ${t.url}`,`        await page.GotoAsync("${this.escapeString(t.url)}");`,""];for(let o of i){let p=this.generateCSharpAction(o,"        ");p&&l.push(p)}return l.push("    }","}",""),l.join(`
`)}generateJson(t,i){return JSON.stringify({version:"1.0.0",recording:{id:t.id,name:t.name,url:t.url,createdAt:t.created_at,actionCount:t.action_count,durationMs:t.duration_ms},actions:i.map(s=>({stepIndex:s.step_index,actionType:s.action_type,url:s.url,locators:JSON.parse(s.locators),timestampMs:s.timestamp_ms}))},null,2)}generateGitHubActions(t){return`name: PlaywrightVCR - ${this.escapeString(t.name)}

on:
  schedule:
    - cron: '0 9 * * MON-FRI'  # Weekdays at 9 AM UTC
  workflow_dispatch:

jobs:
  run-recording:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run recording playback
        run: npx playwright test ${this.toKebabCase(t.name)}.spec.ts
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
`}generatePlaywrightAction(t,i){let s=JSON.parse(t.locators),l=this.getBestLocatorCode(s);switch(t.action_type){case"navigation":return`${i}await page.goto('${this.escapeString(t.url)}');`;case"click":return l?`${i}await ${l}.click();`:null;case"dblclick":return l?`${i}await ${l}.dblclick();`:null;case"input":case"change":return l?`${i}await ${l}.fill('${this.escapeString(s.fingerprint?.value||"")}');`:null;case"keydown":return`${i}await page.keyboard.press('${this.escapeString(s.fingerprint?.value||"Enter")}');`;case"select":return l?`${i}await ${l}.selectOption('${this.escapeString(s.fingerprint?.value||"")}');`:null;case"scroll":return`${i}await page.mouse.wheel(0, 300);`;default:return`${i}// Unknown action: ${t.action_type}`}}generatePythonAction(t,i){let s=JSON.parse(t.locators),l=this.getBestPythonLocator(s);switch(t.action_type){case"navigation":return`${i}page.goto("${this.escapeString(t.url)}")`;case"click":return l?`${i}${l}.click()`:null;case"dblclick":return l?`${i}${l}.dblclick()`:null;case"input":case"change":return l?`${i}${l}.fill("${this.escapeString(s.fingerprint?.value||"")}")`:null;case"keydown":return`${i}page.keyboard.press("${this.escapeString(s.fingerprint?.value||"Enter")}")`;default:return`${i}# Unknown action: ${t.action_type}`}}generateJavaAction(t,i){let s=JSON.parse(t.locators);switch(t.action_type){case"navigation":return`${i}page.navigate("${this.escapeString(t.url)}");`;case"click":return s.role?`${i}page.getByRole(AriaRole.${s.role.role.toUpperCase()}, new Page.GetByRoleOptions().setName("${this.escapeString(s.role.name)}")).click();`:s.css?`${i}page.locator("${this.escapeString(s.css)}").click();`:null;default:return`${i}// Unknown action: ${t.action_type}`}}generateCSharpAction(t,i){let s=JSON.parse(t.locators);switch(t.action_type){case"navigation":return`${i}await page.GotoAsync("${this.escapeString(t.url)}");`;case"click":return s.role?`${i}await page.GetByRole(AriaRole.${this.toPascalCase(s.role.role)}, new() { Name = "${this.escapeString(s.role.name)}" }).ClickAsync();`:s.css?`${i}await page.Locator("${this.escapeString(s.css)}").ClickAsync();`:null;default:return`${i}// Unknown action: ${t.action_type}`}}getBestLocatorCode(t){return t.testId?`page.getByTestId('${this.escapeString(t.testId)}')`:t.role?`page.getByRole('${t.role.role}', { name: '${this.escapeString(t.role.name)}' })`:t.label?`page.getByLabel('${this.escapeString(t.label)}')`:t.text?`page.getByText('${this.escapeString(t.text)}')`:t.placeholder?`page.getByPlaceholder('${this.escapeString(t.placeholder)}')`:t.css?`page.locator('${this.escapeString(t.css)}')`:t.xpath?`page.locator('xpath=${this.escapeString(t.xpath)}')`:null}getBestPythonLocator(t){return t.testId?`page.get_by_test_id("${this.escapeString(t.testId)}")`:t.role?`page.get_by_role("${t.role.role}", name="${this.escapeString(t.role.name)}")`:t.label?`page.get_by_label("${this.escapeString(t.label)}")`:t.text?`page.get_by_text("${this.escapeString(t.text)}")`:t.placeholder?`page.get_by_placeholder("${this.escapeString(t.placeholder)}")`:t.css?`page.locator("${this.escapeString(t.css)}")`:null}async exportTraceZip(t,i){let s=this.fileManager.getTracePath(t);await zt.copyFile(s,i)}escapeString(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\n/g,"\\n")}toSnakeCase(t){return t.replace(/[^a-zA-Z0-9]+/g,"_").replace(/([A-Z])/g,"_$1").toLowerCase().replace(/^_/,"").replace(/_+/g,"_")}toPascalCase(t){return t.replace(/[^a-zA-Z0-9]+/g," ").split(" ").map(i=>i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()).join("")}toKebabCase(t){return t.replace(/[^a-zA-Z0-9]+/g,"-").toLowerCase().replace(/^-|-$/g,"")}getDefaultFileName(t,i){return this.toKebabCase(t)+({TypeScript:".spec.ts",JavaScript:".spec.js",Python:"_test.py",Java:"Test.java","C#":"Tests.cs",JSON:".json",HAR:".zip","GitHub Actions YAML":".yml"}[i]||".txt")}getFileFilters(t){return{TypeScript:{TypeScript:["ts"]},JavaScript:{JavaScript:["js"]},Python:{Python:["py"]},Java:{Java:["java"]},"C#":{"C#":["cs"]},JSON:{JSON:["json"]},HAR:{ZIP:["zip"]},"GitHub Actions YAML":{YAML:["yml","yaml"]}}[t]||{All:["*"]}}};var nr=M(qi()),rr=class{constructor(t,i){this.db=t;this.queue=i}tasks=new Map;running=!1;start(){this.running||(this.running=!0,this.loadSchedules())}stop(){this.running=!1;for(let[t,i]of this.tasks)i.stop();this.tasks.clear()}reload(){this.stop(),this.running=!0,this.loadSchedules()}loadSchedules(){let t=this.db.getEnabledSchedules();for(let i of t){if(!nr.validate(i.cron_expression)){console.warn(`Invalid cron expression for schedule ${i.id}: ${i.cron_expression}`);continue}let s=nr.schedule(i.cron_expression,()=>{this.onScheduleTrigger(i)});this.tasks.set(i.id,s)}}onScheduleTrigger(t){console.log(`Schedule ${t.id} triggered for recording ${t.recording_id}`),this.queue.enqueue(t.recording_id),this.db.updateSchedule(t.id,{last_run:new Date().toISOString()})}};var ji=M(require("vscode")),ir=class{constructor(t){this.db=t}enqueue(t,i){let s=ji.workspace.getConfiguration("playwrightVcr"),l=i??s.get("orchestration.maxRetries",3);return this.db.createJob(t,l)}dequeue(){return this.db.getNextQueuedJob()}markRunning(t){this.db.updateJob(t,{status:"running",started_at:new Date().toISOString(),attempts:void 0})}markCompleted(t,i){this.db.updateJob(t,{status:"completed",finished_at:new Date().toISOString(),result_json:i?JSON.stringify(i):null})}markFailed(t,i,s,l){return s<l?(this.db.updateJob(t,{status:"queued",finished_at:null,result_json:JSON.stringify({lastError:i})}),!0):(this.db.updateJob(t,{status:"failed",finished_at:new Date().toISOString(),result_json:JSON.stringify({error:i})}),!1)}runningCount(){return this.db.getRunningJobCount()}};var Ae=M(require("vscode")),sr=class{constructor(t,i){this.queue=t;this.player=i}interval=null;running=!1;POLL_INTERVAL_MS=5e3;start(){this.running||(this.running=!0,this.interval=setInterval(()=>{this.tick().catch(t=>{console.error("Executor tick error:",t)})},this.POLL_INTERVAL_MS))}stop(){this.running=!1,this.interval&&(clearInterval(this.interval),this.interval=null)}async tick(){let i=Ae.workspace.getConfiguration("playwrightVcr").get("orchestration.concurrency",1);if(this.queue.runningCount()>=i)return;let s=this.queue.dequeue();s&&await this.executeJob(s)}async executeJob(t){let i=t.attempts+1;this.queue.markRunning(t.id);try{if(i>1){let l=Math.min(1e3*Math.pow(2,i-1),3e4);await new Promise(o=>setTimeout(o,l))}let s=await this.player.play(t.recording_id,{},l=>{console.log(`Job ${t.id} step ${l.stepIndex}: ${l.status}`)});this.queue.markCompleted(t.id,{steps:s.length,passed:s.filter(l=>l.status==="success").length,healed:s.filter(l=>l.status==="healed").length,failed:s.filter(l=>l.status==="failed").length}),Ae.window.showInformationMessage(`PlaywrightVCR: Job completed for recording "${t.recording_id}".`)}catch(s){let l=s.message;this.queue.markFailed(t.id,l,i,t.max_attempts)?console.log(`Job ${t.id} failed (attempt ${i}/${t.max_attempts}), will retry.`):(await Ae.window.showErrorMessage(`PlaywrightVCR: Job failed after ${i} attempts \u2014 ${l}`,"View Details")==="View Details"&&Ae.commands.executeCommand("playwrightVcr.openMonitoringPanel"),await this.sendWebhookNotification(t,l))}}async sendWebhookNotification(t,i){let l=Ae.workspace.getConfiguration("playwrightVcr").get("webhookUrl","");if(l)try{let o=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:"\u{1F534} PlaywrightVCR job failed",recording_id:t.recording_id,job_id:t.id,attempts:t.attempts+1,error:i,timestamp:new Date().toISOString()})});o.ok||console.error(`Webhook notification failed: ${o.status}`)}catch(o){console.error("Webhook notification error:",o)}}};var ne,We,at,lt,or,Jr,ar;async function Ko(c){console.log("PlaywrightVCR extension activating..."),ne=new Ot(c.globalStoragePath),await ne.waitReady(),We=new Ut(c.globalStoragePath),await We.ensureDirectories(),at=new Jt(ne,We),lt=new Xt(ne,We,{secrets:c.secrets});let t=new Wt(ne,We);Jr=new ir(ne),ar=new sr(Jr,lt),or=new rr(ne,Jr);let i=new kt(ne),s=new Rt(ne),l=new At(ne),o=H.window.createTreeView("playwrightVcr.library",{treeDataProvider:i,showCollapseAll:!0}),p=H.window.createTreeView("playwrightVcr.executions",{treeDataProvider:s}),f=H.window.createTreeView("playwrightVcr.schedules",{treeDataProvider:l}),b=H.window.createStatusBarItem(H.StatusBarAlignment.Left,100);b.text="$(debug-stop) Stop Recording",b.tooltip="Click to stop and save the current recording",b.command="playwrightVcr.stopRecording",b.backgroundColor=new H.ThemeColor("statusBarItem.errorBackground"),c.subscriptions.push(b);let S=()=>b.show(),R=()=>b.hide(),C=new It(c,at,()=>{i.refresh(),R()},()=>{S()}),P=new Pt(c,lt),J=new Lt(c,ne),$=new Nt(c),E=[["playwrightVcr.startRecording",async()=>{await C.show()}],["playwrightVcr.stopRecording",async()=>{await at.stop(),i.refresh(),R()}],["playwrightVcr.playRecording",async(...x)=>{let L=x[0]?.recordingId;if(!L){H.window.showWarningMessage("No recording selected.");return}await P.show(L)}],["playwrightVcr.openRecordingPanel",async()=>{await C.show()}],["playwrightVcr.openPlaybackPanel",async()=>{await P.show()}],["playwrightVcr.openMonitoringPanel",async()=>{await J.show()}],["playwrightVcr.deleteRecording",async(...x)=>{let L=x[0]?.recordingId;if(!L)return;await H.window.showWarningMessage("Delete this recording and all its data?",{modal:!0},"Delete")==="Delete"&&(ne.deleteRecording(L),await We.deleteRecordingFiles(L),i.refresh(),H.window.showInformationMessage("Recording deleted."))}],["playwrightVcr.exportRecording",async(...x)=>{let L=x[0]?.recordingId;if(!L)return;let O=await H.window.showQuickPick(["TypeScript","JavaScript","Python","Java","C#","JSON","HAR","GitHub Actions YAML"],{placeHolder:"Select export format"});O&&await t.export(L,O)}],["playwrightVcr.refreshLibrary",()=>{i.refresh(),s.refresh(),l.refresh()}],["playwrightVcr.installBrowsers",async()=>{let x=H.window.createTerminal("Playwright Install");x.show(),x.sendText("npx playwright install")}],["playwrightVcr.openSettings",async()=>{await $.show()}],["playwrightVcr.setApiKey",async()=>{let x=await H.window.showQuickPick(["openai","anthropic"],{placeHolder:"Select the AI provider to set the API key for"});if(!x)return;let I=await H.window.showInputBox({prompt:`Enter your ${x} API key`,password:!0,placeHolder:"sk-..."});I!==void 0&&(I===""?(await c.secrets.delete(`playwrightVcr.apiKey.${x}`),H.window.showInformationMessage(`${x} API key removed.`)):(await c.secrets.store(`playwrightVcr.apiKey.${x}`,I),H.window.showInformationMessage(`${x} API key saved securely.`)))}]];for(let[x,I]of E)c.subscriptions.push(H.commands.registerCommand(x,I));or.start(),ar.start(),c.subscriptions.push(o,p,f,{dispose:()=>at.dispose()},{dispose:()=>lt.dispose()},{dispose:()=>or.stop()},{dispose:()=>ar.stop()},{dispose:()=>ne.close()}),console.log("PlaywrightVCR extension activated.")}function Jo(){or?.stop(),ar?.stop(),at?.dispose(),lt?.dispose(),ne?.close()}0&&(module.exports={activate,deactivate});

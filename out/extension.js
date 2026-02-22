"use strict";var Ms=Object.create;var xt=Object.defineProperty;var Cs=Object.getOwnPropertyDescriptor;var Os=Object.getOwnPropertyNames;var Us=Object.getPrototypeOf,Fs=Object.prototype.hasOwnProperty;var ee=(c,t)=>()=>(c&&(t=c(c=0)),t);var te=(c,t)=>()=>(t||c((t={exports:{}}).exports,t),t.exports),Cn=(c,t)=>{for(var i in t)xt(c,i,{get:t[i],enumerable:!0})},On=(c,t,i,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let l of Os(t))!Fs.call(c,l)&&l!==i&&xt(c,l,{get:()=>t[l],enumerable:!(s=Cs(t,l))||s.enumerable});return c};var $=(c,t,i)=>(i=c!=null?Ms(Us(c)):{},On(t||!c||!c.__esModule?xt(i,"default",{value:c,enumerable:!0}):i,c)),_t=c=>On(xt({},"__esModule",{value:!0}),c);var Un=te((Dt,Ce)=>{var Lt=void 0,Nt=function(c){return Lt||(Lt=new Promise(function(t,i){var s=typeof c<"u"?c:{},l=s.onAbort;s.onAbort=function(e){i(new Error(e)),l&&l(e)},s.postRun=s.postRun||[],s.postRun.push(function(){t(s)}),Ce=void 0;var o;o||=typeof s<"u"?s:{};var p=!!globalThis.window,f=!!globalThis.WorkerGlobalScope,b=globalThis.process?.versions?.node&&globalThis.process?.type!="renderer";o.onRuntimeInitialized=function(){function e(d,m){switch(typeof m){case"boolean":Ds(d,m?1:0);break;case"number":Ps(d,m);break;case"string":Ls(d,m,-1,-1);break;case"object":if(m===null)Nn(d);else if(m.length!=null){var v=yt(m.length);K.set(m,v),Ns(d,v,m.length,-1),et(v)}else Et(d,"Wrong API use : tried to return a value of an unknown type ("+m+").",-1);break;default:Nn(d)}}function r(d,m){for(var v=[],E=0;E<d;E+=1){var R=fe(m+4*E,"i32"),D=Ss(R);if(D===1||D===2)R=Is(R);else if(D===3)R=Rs(R);else if(D===4){D=R,R=ks(D),D=As(D);for(var ue=new Uint8Array(R),ae=0;ae<R;ae+=1)ue[ae]=K[D+ae];R=ue}else R=null;v.push(R)}return v}function n(d,m){this.Qa=d,this.db=m,this.Oa=1,this.lb=[]}function a(d,m){if(this.db=m,this.eb=ft(d),this.eb===null)throw Error("Unable to allocate memory for the SQL string");this.kb=this.eb,this.Za=this.qb=null}function u(d){if(this.filename="dbfile_"+(4294967295*Math.random()>>>0),d!=null){var m=this.filename,v="/",E=m;if(v&&(v=typeof v=="string"?v:hr(v),E=m?ur(v+"/"+m):v),m=rn(!0,!0),E=es(E,m),d){if(typeof d=="string"){v=Array(d.length);for(var R=0,D=d.length;R<D;++R)v[R]=d.charCodeAt(R);d=v}pt(E,m|146),v=je(E,577),wn(v,d,0,d.length,0),vr(v),pt(E,m)}}this.handleError(x(this.filename,h)),this.db=fe(h,"i32"),$n(this.db),this.fb={},this.Sa={}}var h=$e(4),g=o.cwrap,x=g("sqlite3_open","number",["string","number"]),N=g("sqlite3_close_v2","number",["number"]),S=g("sqlite3_exec","number",["number","string","number","number","number"]),q=g("sqlite3_changes","number",["number"]),X=g("sqlite3_prepare_v2","number",["number","string","number","number","number"]),Rn=g("sqlite3_sql","string",["number"]),ls=g("sqlite3_normalized_sql","string",["number"]),An=g("sqlite3_prepare_v2","number",["number","number","number","number","number"]),cs=g("sqlite3_bind_text","number",["number","number","number","number","number"]),In=g("sqlite3_bind_blob","number",["number","number","number","number","number"]),us=g("sqlite3_bind_double","number",["number","number","number"]),ds=g("sqlite3_bind_int","number",["number","number","number"]),ps=g("sqlite3_bind_parameter_index","number",["number","string"]),hs=g("sqlite3_step","number",["number"]),gs=g("sqlite3_errmsg","string",["number"]),ms=g("sqlite3_column_count","number",["number"]),fs=g("sqlite3_data_count","number",["number"]),ys=g("sqlite3_column_double","number",["number","number"]),Pn=g("sqlite3_column_text","string",["number","number"]),bs=g("sqlite3_column_blob","number",["number","number"]),vs=g("sqlite3_column_bytes","number",["number","number"]),ws=g("sqlite3_column_type","number",["number","number"]),Es=g("sqlite3_column_name","string",["number","number"]),xs=g("sqlite3_reset","number",["number"]),_s=g("sqlite3_clear_bindings","number",["number"]),Ts=g("sqlite3_finalize","number",["number"]),Ln=g("sqlite3_create_function_v2","number","number string number number number number number number number".split(" ")),Ss=g("sqlite3_value_type","number",["number"]),ks=g("sqlite3_value_bytes","number",["number"]),Rs=g("sqlite3_value_text","string",["number"]),As=g("sqlite3_value_blob","number",["number"]),Is=g("sqlite3_value_double","number",["number"]),Ps=g("sqlite3_result_double","",["number","number"]),Nn=g("sqlite3_result_null","",["number"]),Ls=g("sqlite3_result_text","",["number","string","number","number"]),Ns=g("sqlite3_result_blob","",["number","number","number","number"]),Ds=g("sqlite3_result_int","",["number","number"]),Et=g("sqlite3_result_error","",["number","string","number"]),Dn=g("sqlite3_aggregate_context","number",["number","number"]),$n=g("RegisterExtensionFunctions","number",["number"]),Mn=g("sqlite3_update_hook","number",["number","number","number"]);n.prototype.bind=function(d){if(!this.Qa)throw"Statement closed";return this.reset(),Array.isArray(d)?this.Cb(d):d!=null&&typeof d=="object"?this.Db(d):!0},n.prototype.step=function(){if(!this.Qa)throw"Statement closed";this.Oa=1;var d=hs(this.Qa);switch(d){case 100:return!0;case 101:return!1;default:throw this.db.handleError(d)}},n.prototype.wb=function(d){return d==null&&(d=this.Oa,this.Oa+=1),ys(this.Qa,d)},n.prototype.Gb=function(d){if(d==null&&(d=this.Oa,this.Oa+=1),d=Pn(this.Qa,d),typeof BigInt!="function")throw Error("BigInt is not supported");return BigInt(d)},n.prototype.Hb=function(d){return d==null&&(d=this.Oa,this.Oa+=1),Pn(this.Qa,d)},n.prototype.getBlob=function(d){d==null&&(d=this.Oa,this.Oa+=1);var m=vs(this.Qa,d);d=bs(this.Qa,d);for(var v=new Uint8Array(m),E=0;E<m;E+=1)v[E]=K[d+E];return v},n.prototype.get=function(d,m){m=m||{},d!=null&&this.bind(d)&&this.step(),d=[];for(var v=fs(this.Qa),E=0;E<v;E+=1)switch(ws(this.Qa,E)){case 1:var R=m.useBigInt?this.Gb(E):this.wb(E);d.push(R);break;case 2:d.push(this.wb(E));break;case 3:d.push(this.Hb(E));break;case 4:d.push(this.getBlob(E));break;default:d.push(null)}return d},n.prototype.getColumnNames=function(){for(var d=[],m=ms(this.Qa),v=0;v<m;v+=1)d.push(Es(this.Qa,v));return d},n.prototype.getAsObject=function(d,m){d=this.get(d,m),m=this.getColumnNames();for(var v={},E=0;E<m.length;E+=1)v[m[E]]=d[E];return v},n.prototype.getSQL=function(){return Rn(this.Qa)},n.prototype.getNormalizedSQL=function(){return ls(this.Qa)},n.prototype.run=function(d){return d!=null&&this.bind(d),this.step(),this.reset()},n.prototype.tb=function(d,m){m==null&&(m=this.Oa,this.Oa+=1),d=ft(d),this.lb.push(d),this.db.handleError(cs(this.Qa,m,d,-1,0))},n.prototype.Bb=function(d,m){m==null&&(m=this.Oa,this.Oa+=1);var v=yt(d.length);K.set(d,v),this.lb.push(v),this.db.handleError(In(this.Qa,m,v,d.length,0))},n.prototype.sb=function(d,m){m==null&&(m=this.Oa,this.Oa+=1),this.db.handleError((d===(d|0)?ds:us)(this.Qa,m,d))},n.prototype.Eb=function(d){d==null&&(d=this.Oa,this.Oa+=1),In(this.Qa,d,0,0,0)},n.prototype.ub=function(d,m){switch(m==null&&(m=this.Oa,this.Oa+=1),typeof d){case"string":this.tb(d,m);return;case"number":this.sb(d,m);return;case"bigint":this.tb(d.toString(),m);return;case"boolean":this.sb(d+0,m);return;case"object":if(d===null){this.Eb(m);return}if(d.length!=null){this.Bb(d,m);return}}throw"Wrong API use : tried to bind a value of an unknown type ("+d+")."},n.prototype.Db=function(d){var m=this;return Object.keys(d).forEach(function(v){var E=ps(m.Qa,v);E!==0&&m.ub(d[v],E)}),!0},n.prototype.Cb=function(d){for(var m=0;m<d.length;m+=1)this.ub(d[m],m+1);return!0},n.prototype.reset=function(){return this.freemem(),_s(this.Qa)===0&&xs(this.Qa)===0},n.prototype.freemem=function(){for(var d;(d=this.lb.pop())!==void 0;)et(d)},n.prototype.free=function(){this.freemem();var d=Ts(this.Qa)===0;return delete this.db.fb[this.Qa],this.Qa=0,d},a.prototype.next=function(){if(this.eb===null)return{done:!0};if(this.Za!==null&&(this.Za.free(),this.Za=null),!this.db.db)throw this.nb(),Error("Database closed");var d=vt(),m=$e(4);ze(h),ze(m);try{this.db.handleError(An(this.db.db,this.kb,-1,h,m)),this.kb=fe(m,"i32");var v=fe(h,"i32");return v===0?(this.nb(),{done:!0}):(this.Za=new n(v,this.db),this.db.fb[v]=this.Za,{value:this.Za,done:!1})}catch(E){throw this.qb=V(this.kb),this.nb(),E}finally{bt(d)}},a.prototype.nb=function(){et(this.eb),this.eb=null},a.prototype.getRemainingSQL=function(){return this.qb!==null?this.qb:V(this.kb)},typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"&&(a.prototype[Symbol.iterator]=function(){return this}),u.prototype.run=function(d,m){if(!this.db)throw"Database closed";if(m){d=this.prepare(d,m);try{d.step()}finally{d.free()}}else this.handleError(S(this.db,d,0,0,h));return this},u.prototype.exec=function(d,m,v){if(!this.db)throw"Database closed";var E=null,R=null,D=null;try{D=R=ft(d);var ue=$e(4);for(d=[];fe(D,"i8")!==0;){ze(h),ze(ue),this.handleError(An(this.db,D,-1,h,ue));var ae=fe(h,"i32");if(D=fe(ue,"i32"),ae!==0){var ie=null;for(E=new n(ae,this),m!=null&&E.bind(m);E.step();)ie===null&&(ie={columns:E.getColumnNames(),values:[]},d.push(ie)),ie.values.push(E.get(null,v));E.free()}}return d}catch(de){throw E&&E.free(),de}finally{R&&et(R)}},u.prototype.each=function(d,m,v,E,R){typeof m=="function"&&(E=v,v=m,m=void 0),d=this.prepare(d,m);try{for(;d.step();)v(d.getAsObject(null,R))}finally{d.free()}if(typeof E=="function")return E()},u.prototype.prepare=function(d,m){if(ze(h),this.handleError(X(this.db,d,-1,h,0)),d=fe(h,"i32"),d===0)throw"Nothing to prepare";var v=new n(d,this);return m!=null&&v.bind(m),this.fb[d]=v},u.prototype.iterateStatements=function(d){return new a(d,this)},u.prototype.export=function(){Object.values(this.fb).forEach(function(m){m.free()}),Object.values(this.Sa).forEach(xe),this.Sa={},this.handleError(N(this.db));var d=ts(this.filename);return this.handleError(x(this.filename,h)),this.db=fe(h,"i32"),$n(this.db),d},u.prototype.close=function(){this.db!==null&&(Object.values(this.fb).forEach(function(d){d.free()}),Object.values(this.Sa).forEach(xe),this.Sa={},this.Ya&&(xe(this.Ya),this.Ya=void 0),this.handleError(N(this.db)),mn("/"+this.filename),this.db=null)},u.prototype.handleError=function(d){if(d===0)return null;throw d=gs(this.db),Error(d)},u.prototype.getRowsModified=function(){return q(this.db)},u.prototype.create_function=function(d,m){Object.prototype.hasOwnProperty.call(this.Sa,d)&&(xe(this.Sa[d]),delete this.Sa[d]);var v=Ze(function(E,R,D){R=r(R,D);try{var ue=m.apply(null,R)}catch(ae){Et(E,ae,-1);return}e(E,ue)},"viii");return this.Sa[d]=v,this.handleError(Ln(this.db,d,m.length,1,0,v,0,0,0)),this},u.prototype.create_aggregate=function(d,m){var v=m.init||function(){return null},E=m.finalize||function(ie){return ie},R=m.step;if(!R)throw"An aggregate function must have a step function in "+d;var D={};Object.hasOwnProperty.call(this.Sa,d)&&(xe(this.Sa[d]),delete this.Sa[d]),m=d+"__finalize",Object.hasOwnProperty.call(this.Sa,m)&&(xe(this.Sa[m]),delete this.Sa[m]);var ue=Ze(function(ie,de,kr){var Me=Dn(ie,1);Object.hasOwnProperty.call(D,Me)||(D[Me]=v()),de=r(de,kr),de=[D[Me]].concat(de);try{D[Me]=R.apply(null,de)}catch($s){delete D[Me],Et(ie,$s,-1)}},"viii"),ae=Ze(function(ie){var de=Dn(ie,1);try{var kr=E(D[de])}catch(Me){delete D[de],Et(ie,Me,-1);return}e(ie,kr),delete D[de]},"vi");return this.Sa[d]=ue,this.Sa[m]=ae,this.handleError(Ln(this.db,d,R.length-1,1,0,0,ue,ae,0)),this},u.prototype.updateHook=function(d){return this.Ya&&(Mn(this.db,0,0),xe(this.Ya),this.Ya=void 0),d?(this.Ya=Ze(function(m,v,E,R,D){switch(v){case 18:m="insert";break;case 23:m="update";break;case 9:m="delete";break;default:throw"unknown operationCode in updateHook callback: "+v}if(E=V(E),R=V(R),D>Number.MAX_SAFE_INTEGER)throw"rowId too big to fit inside a Number";d(m,E,R,Number(D))},"viiiij"),Mn(this.db,this.Ya,0),this):this},o.Database=u};var _="./this.program",k=(e,r)=>{throw r},P=globalThis.document?.currentScript?.src;typeof __filename<"u"?P=__filename:f&&(P=self.location.href);var L="",Y,M;if(b){var A=require("node:fs");L=__dirname+"/",M=e=>(e=se(e)?new URL(e):e,A.readFileSync(e)),Y=async e=>(e=se(e)?new URL(e):e,A.readFileSync(e,void 0)),1<process.argv.length&&(_=process.argv[1].replace(/\\/g,"/")),process.argv.slice(2),typeof Ce<"u"&&(Ce.exports=o),k=(e,r)=>{throw process.exitCode=e,r}}else if(p||f){try{L=new URL(".",P).href}catch{}f&&(M=e=>{var r=new XMLHttpRequest;return r.open("GET",e,!1),r.responseType="arraybuffer",r.send(null),new Uint8Array(r.response)}),Y=async e=>{if(se(e))return new Promise((n,a)=>{var u=new XMLHttpRequest;u.open("GET",e,!0),u.responseType="arraybuffer",u.onload=()=>{u.status==200||u.status==0&&u.response?n(u.response):a(u.status)},u.onerror=a,u.send(null)});var r=await fetch(e,{credentials:"same-origin"});if(r.ok)return r.arrayBuffer();throw Error(r.status+" : "+r.url)}}var w=console.log.bind(console),I=console.error.bind(console),O,C=!1,J,se=e=>e.startsWith("file://"),K,Q,Xe,j,U,or,ar,ce;function Kr(){var e=wt.buffer;K=new Int8Array(e),Xe=new Int16Array(e),Q=new Uint8Array(e),new Uint16Array(e),j=new Int32Array(e),U=new Uint32Array(e),or=new Float32Array(e),ar=new Float64Array(e),ce=new BigInt64Array(e),new BigUint64Array(e)}function Oe(e){throw o.onAbort?.(e),e="Aborted("+e+")",I(e),C=!0,new WebAssembly.RuntimeError(e+". Build with -sASSERTIONS for more info.")}var lr;async function qi(e){if(!O)try{var r=await Y(e);return new Uint8Array(r)}catch{}if(e==lr&&O)e=new Uint8Array(O);else if(M)e=M(e);else throw"both async and sync fetching of the wasm failed";return e}async function ji(e,r){try{var n=await qi(e);return await WebAssembly.instantiate(n,r)}catch(a){I(`failed to asynchronously prepare wasm: ${a}`),Oe(a)}}async function Bi(e){var r=lr;if(!O&&!se(r)&&!b)try{var n=fetch(r,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(n,e)}catch(a){I(`wasm streaming compile failed: ${a}`),I("falling back to ArrayBuffer instantiation")}return ji(r,e)}class cr{name="ExitStatus";constructor(r){this.message=`Program terminated with exit(${r})`,this.status=r}}var Jr=e=>{for(;0<e.length;)e.shift()(o)},Xr=[],Wr=[],Vi=()=>{var e=o.preRun.shift();Wr.push(e)},Pe=0,We=null;function fe(e,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":return K[e];case"i8":return K[e];case"i16":return Xe[e>>1];case"i32":return j[e>>2];case"i64":return ce[e>>3];case"float":return or[e>>2];case"double":return ar[e>>3];case"*":return U[e>>2];default:Oe(`invalid type for getValue: ${r}`)}}var at=!0;function ze(e){var r="i32";switch(r.endsWith("*")&&(r="*"),r){case"i1":K[e]=0;break;case"i8":K[e]=0;break;case"i16":Xe[e>>1]=0;break;case"i32":j[e>>2]=0;break;case"i64":ce[e>>3]=BigInt(0);break;case"float":or[e>>2]=0;break;case"double":ar[e>>3]=0;break;case"*":U[e>>2]=0;break;default:Oe(`invalid type for setValue: ${r}`)}}var zr=new TextDecoder,Yr=(e,r,n,a)=>{if(n=r+n,a)return n;for(;e[r]&&!(r>=n);)++r;return r},V=(e,r,n)=>e?zr.decode(Q.subarray(e,Yr(Q,e,r,n))):"",Gr=(e,r)=>{for(var n=0,a=e.length-1;0<=a;a--){var u=e[a];u==="."?e.splice(a,1):u===".."?(e.splice(a,1),n++):n&&(e.splice(a,1),n--)}if(r)for(;n;n--)e.unshift("..");return e},ur=e=>{var r=e.charAt(0)==="/",n=e.slice(-1)==="/";return(e=Gr(e.split("/").filter(a=>!!a),!r).join("/"))||r||(e="."),e&&n&&(e+="/"),(r?"/":"")+e},Qr=e=>{var r=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);return e=r[0],r=r[1],!e&&!r?".":(r&&=r.slice(0,-1),e+r)},lt=e=>e&&e.match(/([^\/]+|\/)\/*$/)[1],Hi=()=>{if(b){var e=require("node:crypto");return r=>e.randomFillSync(r)}return r=>crypto.getRandomValues(r)},Zr=e=>{(Zr=Hi())(e)},Ki=(...e)=>{for(var r="",n=!1,a=e.length-1;-1<=a&&!n;a--){if(n=0<=a?e[a]:"/",typeof n!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!n)return"";r=n+"/"+r,n=n.charAt(0)==="/"}return r=Gr(r.split("/").filter(u=>!!u),!n).join("/"),(n?"/":"")+r||"."},Ye=e=>{var r=Yr(e,0);return zr.decode(e.buffer?e.subarray(0,r):new Uint8Array(e.slice(0,r)))},dr=[],Ue=e=>{for(var r=0,n=0;n<e.length;++n){var a=e.charCodeAt(n);127>=a?r++:2047>=a?r+=2:55296<=a&&57343>=a?(r+=4,++n):r+=3}return r},he=(e,r,n,a)=>{if(!(0<a))return 0;var u=n;a=n+a-1;for(var h=0;h<e.length;++h){var g=e.codePointAt(h);if(127>=g){if(n>=a)break;r[n++]=g}else if(2047>=g){if(n+1>=a)break;r[n++]=192|g>>6,r[n++]=128|g&63}else if(65535>=g){if(n+2>=a)break;r[n++]=224|g>>12,r[n++]=128|g>>6&63,r[n++]=128|g&63}else{if(n+3>=a)break;r[n++]=240|g>>18,r[n++]=128|g>>12&63,r[n++]=128|g>>6&63,r[n++]=128|g&63,h++}}return r[n]=0,n-u},en=[];function tn(e,r){en[e]={input:[],output:[],cb:r},yr(e,Ji)}var Ji={open(e){var r=en[e.node.rdev];if(!r)throw new y(43);e.tty=r,e.seekable=!1},close(e){e.tty.cb.fsync(e.tty)},fsync(e){e.tty.cb.fsync(e.tty)},read(e,r,n,a){if(!e.tty||!e.tty.cb.xb)throw new y(60);for(var u=0,h=0;h<a;h++){try{var g=e.tty.cb.xb(e.tty)}catch{throw new y(29)}if(g===void 0&&u===0)throw new y(6);if(g==null)break;u++,r[n+h]=g}return u&&(e.node.atime=Date.now()),u},write(e,r,n,a){if(!e.tty||!e.tty.cb.rb)throw new y(60);try{for(var u=0;u<a;u++)e.tty.cb.rb(e.tty,r[n+u])}catch{throw new y(29)}return a&&(e.node.mtime=e.node.ctime=Date.now()),u}},Xi={xb(){e:{if(!dr.length){var e=null;if(b){var r=Buffer.alloc(256),n=0,a=process.stdin.fd;try{n=A.readSync(a,r,0,256)}catch(u){if(u.toString().includes("EOF"))n=0;else throw u}0<n&&(e=r.slice(0,n).toString("utf-8"))}else globalThis.window?.prompt&&(e=window.prompt("Input: "),e!==null&&(e+=`
`));if(!e){e=null;break e}r=Array(Ue(e)+1),e=he(e,r,0,r.length),r.length=e,dr=r}e=dr.shift()}return e},rb(e,r){r===null||r===10?(w(Ye(e.output)),e.output=[]):r!=0&&e.output.push(r)},fsync(e){0<e.output?.length&&(w(Ye(e.output)),e.output=[])},Tb(){return{Ob:25856,Qb:5,Nb:191,Pb:35387,Mb:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},Ub(){return 0},Vb(){return[24,80]}},Wi={rb(e,r){r===null||r===10?(I(Ye(e.output)),e.output=[]):r!=0&&e.output.push(r)},fsync(e){0<e.output?.length&&(I(Ye(e.output)),e.output=[])}},T={Wa:null,Xa(){return T.createNode(null,"/",16895,0)},createNode(e,r,n,a){if((n&61440)===24576||(n&61440)===4096)throw new y(63);return T.Wa||(T.Wa={dir:{node:{Ta:T.La.Ta,Ua:T.La.Ua,lookup:T.La.lookup,hb:T.La.hb,rename:T.La.rename,unlink:T.La.unlink,rmdir:T.La.rmdir,readdir:T.La.readdir,symlink:T.La.symlink},stream:{Va:T.Ma.Va}},file:{node:{Ta:T.La.Ta,Ua:T.La.Ua},stream:{Va:T.Ma.Va,read:T.Ma.read,write:T.Ma.write,ib:T.Ma.ib,jb:T.Ma.jb}},link:{node:{Ta:T.La.Ta,Ua:T.La.Ua,readlink:T.La.readlink},stream:{}},vb:{node:{Ta:T.La.Ta,Ua:T.La.Ua},stream:Zi}}),n=ln(e,r,n,a),re(n.mode)?(n.La=T.Wa.dir.node,n.Ma=T.Wa.dir.stream,n.Na={}):(n.mode&61440)===32768?(n.La=T.Wa.file.node,n.Ma=T.Wa.file.stream,n.Ra=0,n.Na=null):(n.mode&61440)===40960?(n.La=T.Wa.link.node,n.Ma=T.Wa.link.stream):(n.mode&61440)===8192&&(n.La=T.Wa.vb.node,n.Ma=T.Wa.vb.stream),n.atime=n.mtime=n.ctime=Date.now(),e&&(e.Na[r]=n,e.atime=e.mtime=e.ctime=n.atime),n},Sb(e){return e.Na?e.Na.subarray?e.Na.subarray(0,e.Ra):new Uint8Array(e.Na):new Uint8Array(0)},La:{Ta(e){var r={};return r.dev=(e.mode&61440)===8192?e.id:1,r.ino=e.id,r.mode=e.mode,r.nlink=1,r.uid=0,r.gid=0,r.rdev=e.rdev,re(e.mode)?r.size=4096:(e.mode&61440)===32768?r.size=e.Ra:(e.mode&61440)===40960?r.size=e.link.length:r.size=0,r.atime=new Date(e.atime),r.mtime=new Date(e.mtime),r.ctime=new Date(e.ctime),r.blksize=4096,r.blocks=Math.ceil(r.size/r.blksize),r},Ua(e,r){for(var n of["mode","atime","mtime","ctime"])r[n]!=null&&(e[n]=r[n]);r.size!==void 0&&(r=r.size,e.Ra!=r&&(r==0?(e.Na=null,e.Ra=0):(n=e.Na,e.Na=new Uint8Array(r),n&&e.Na.set(n.subarray(0,Math.min(r,e.Ra))),e.Ra=r)))},lookup(){throw T.mb||(T.mb=new y(44),T.mb.stack="<generic error, no stack>"),T.mb},hb(e,r,n,a){return T.createNode(e,r,n,a)},rename(e,r,n){try{var a=Le(r,n)}catch{}if(a){if(re(e.mode))for(var u in a.Na)throw new y(55);mr(a)}delete e.parent.Na[e.name],r.Na[n]=e,e.name=n,r.ctime=r.mtime=e.parent.ctime=e.parent.mtime=Date.now()},unlink(e,r){delete e.Na[r],e.ctime=e.mtime=Date.now()},rmdir(e,r){var n=Le(e,r),a;for(a in n.Na)throw new y(55);delete e.Na[r],e.ctime=e.mtime=Date.now()},readdir(e){return[".","..",...Object.keys(e.Na)]},symlink(e,r,n){return e=T.createNode(e,r,41471,0),e.link=n,e},readlink(e){if((e.mode&61440)!==40960)throw new y(28);return e.link}},Ma:{read(e,r,n,a,u){var h=e.node.Na;if(u>=e.node.Ra)return 0;if(e=Math.min(e.node.Ra-u,a),8<e&&h.subarray)r.set(h.subarray(u,u+e),n);else for(a=0;a<e;a++)r[n+a]=h[u+a];return e},write(e,r,n,a,u,h){if(r.buffer===K.buffer&&(h=!1),!a)return 0;if(e=e.node,e.mtime=e.ctime=Date.now(),r.subarray&&(!e.Na||e.Na.subarray)){if(h)return e.Na=r.subarray(n,n+a),e.Ra=a;if(e.Ra===0&&u===0)return e.Na=r.slice(n,n+a),e.Ra=a;if(u+a<=e.Ra)return e.Na.set(r.subarray(n,n+a),u),a}h=u+a;var g=e.Na?e.Na.length:0;if(g>=h||(h=Math.max(h,g*(1048576>g?2:1.125)>>>0),g!=0&&(h=Math.max(h,256)),g=e.Na,e.Na=new Uint8Array(h),0<e.Ra&&e.Na.set(g.subarray(0,e.Ra),0)),e.Na.subarray&&r.subarray)e.Na.set(r.subarray(n,n+a),u);else for(h=0;h<a;h++)e.Na[u+h]=r[n+h];return e.Ra=Math.max(e.Ra,u+a),a},Va(e,r,n){if(n===1?r+=e.position:n===2&&(e.node.mode&61440)===32768&&(r+=e.node.Ra),0>r)throw new y(28);return r},ib(e,r,n,a,u){if((e.node.mode&61440)!==32768)throw new y(43);if(e=e.node.Na,u&2||!e||e.buffer!==K.buffer){u=!0,a=65536*Math.ceil(r/65536);var h=Sn(65536,a);if(h&&Q.fill(0,h,h+a),a=h,!a)throw new y(48);e&&((0<n||n+r<e.length)&&(e.subarray?e=e.subarray(n,n+r):e=Array.prototype.slice.call(e,n,n+r)),K.set(e,a))}else u=!1,a=e.byteOffset;return{Kb:a,Ab:u}},jb(e,r,n,a){return T.Ma.write(e,r,0,a,n,!1),0}}},rn=(e,r)=>{var n=0;return e&&(n|=365),r&&(n|=146),n},pr=null,nn={},Fe=[],zi=1,we=null,sn=!1,on=!0,an={},y=class{name="ErrnoError";constructor(e){this.Pa=e}},Yi=class{gb={};node=null;get flags(){return this.gb.flags}set flags(e){this.gb.flags=e}get position(){return this.gb.position}set position(e){this.gb.position=e}},Gi=class{La={};Ma={};ab=null;constructor(e,r,n,a){e||=this,this.parent=e,this.Xa=e.Xa,this.id=zi++,this.name=r,this.mode=n,this.rdev=a,this.atime=this.mtime=this.ctime=Date.now()}get read(){return(this.mode&365)===365}set read(e){e?this.mode|=365:this.mode&=-366}get write(){return(this.mode&146)===146}set write(e){e?this.mode|=146:this.mode&=-147}};function oe(e,r={}){if(!e)throw new y(44);r.ob??(r.ob=!0),e.charAt(0)==="/"||(e="//"+e);var n=0;e:for(;40>n;n++){e=e.split("/").filter(x=>!!x);for(var a=pr,u="/",h=0;h<e.length;h++){var g=h===e.length-1;if(g&&r.parent)break;if(e[h]!==".")if(e[h]==="..")if(u=Qr(u),a===a.parent){e=u+"/"+e.slice(h+1).join("/"),n--;continue e}else a=a.parent;else{u=ur(u+"/"+e[h]);try{a=Le(a,e[h])}catch(x){if(x?.Pa===44&&g&&r.Jb)return{path:u};throw x}if(!a.ab||g&&!r.ob||(a=a.ab.root),(a.mode&61440)===40960&&(!g||r.$a)){if(!a.La.readlink)throw new y(52);a=a.La.readlink(a),a.charAt(0)==="/"||(a=Qr(u)+"/"+a),e=a+"/"+e.slice(h+1).join("/");continue e}}}return{path:u,node:a}}throw new y(32)}function hr(e){for(var r;;){if(e===e.parent)return e=e.Xa.zb,r?e[e.length-1]!=="/"?`${e}/${r}`:e+r:e;r=r?`${e.name}/${r}`:e.name,e=e.parent}}function gr(e,r){for(var n=0,a=0;a<r.length;a++)n=(n<<5)-n+r.charCodeAt(a)|0;return(e+n>>>0)%we.length}function mr(e){var r=gr(e.parent.id,e.name);if(we[r]===e)we[r]=e.bb;else for(r=we[r];r;){if(r.bb===e){r.bb=e.bb;break}r=r.bb}}function Le(e,r){var n=re(e.mode)?(n=qe(e,"x"))?n:e.La.lookup?0:2:54;if(n)throw new y(n);for(n=we[gr(e.id,r)];n;n=n.bb){var a=n.name;if(n.parent.id===e.id&&a===r)return n}return e.La.lookup(e,r)}function ln(e,r,n,a){return e=new Gi(e,r,n,a),r=gr(e.parent.id,e.name),e.bb=we[r],we[r]=e}function re(e){return(e&61440)===16384}function cn(e){var r=["r","w","rw"][e&3];return e&512&&(r+="w"),r}function qe(e,r){if(on)return 0;if(!r.includes("r")||e.mode&292){if(r.includes("w")&&!(e.mode&146)||r.includes("x")&&!(e.mode&73))return 2}else return 2;return 0}function un(e,r){if(!re(e.mode))return 54;try{return Le(e,r),20}catch{}return qe(e,"wx")}function dn(e,r,n){try{var a=Le(e,r)}catch(u){return u.Pa}if(e=qe(e,"wx"))return e;if(n){if(!re(a.mode))return 54;if(a===a.parent||hr(a)==="/")return 10}else if(re(a.mode))return 31;return 0}function ct(e){if(!e)throw new y(63);return e}function Z(e){if(e=Fe[e],!e)throw new y(8);return e}function pn(e,r=-1){if(e=Object.assign(new Yi,e),r==-1)e:{for(r=0;4096>=r;r++)if(!Fe[r])break e;throw new y(33)}return e.fd=r,Fe[r]=e}function Qi(e,r=-1){return e=pn(e,r),e.Ma?.Rb?.(e),e}function fr(e,r,n){var a=e?.Ma.Ua;e=a?e:r,a??=r.La.Ua,ct(a),a(e,n)}var Zi={open(e){e.Ma=nn[e.node.rdev].Ma,e.Ma.open?.(e)},Va(){throw new y(70)}};function yr(e,r){nn[e]={Ma:r}}function hn(e,r){var n=r==="/";if(n&&pr)throw new y(10);if(!n&&r){var a=oe(r,{ob:!1});if(r=a.path,a=a.node,a.ab)throw new y(10);if(!re(a.mode))throw new y(54)}r={type:e,Wb:{},zb:r,Ib:[]},e=e.Xa(r),e.Xa=r,r.root=e,n?pr=e:a&&(a.ab=r,a.Xa&&a.Xa.Ib.push(r))}function ut(e,r,n){var a=oe(e,{parent:!0}).node;if(e=lt(e),!e)throw new y(28);if(e==="."||e==="..")throw new y(20);var u=un(a,e);if(u)throw new y(u);if(!a.La.hb)throw new y(63);return a.La.hb(a,e,r,n)}function es(e,r=438){return ut(e,r&4095|32768,0)}function ge(e,r=511){return ut(e,r&1023|16384,0)}function dt(e,r,n){typeof n>"u"&&(n=r,r=438),ut(e,r|8192,n)}function br(e,r){if(!Ki(e))throw new y(44);var n=oe(r,{parent:!0}).node;if(!n)throw new y(44);r=lt(r);var a=un(n,r);if(a)throw new y(a);if(!n.La.symlink)throw new y(63);n.La.symlink(n,r,e)}function gn(e){var r=oe(e,{parent:!0}).node;e=lt(e);var n=Le(r,e),a=dn(r,e,!0);if(a)throw new y(a);if(!r.La.rmdir)throw new y(63);if(n.ab)throw new y(10);r.La.rmdir(r,e),mr(n)}function mn(e){var r=oe(e,{parent:!0}).node;if(!r)throw new y(44);e=lt(e);var n=Le(r,e),a=dn(r,e,!1);if(a)throw new y(a);if(!r.La.unlink)throw new y(63);if(n.ab)throw new y(10);r.La.unlink(r,e),mr(n)}function Ge(e,r){return e=oe(e,{$a:!r}).node,ct(e.La.Ta)(e)}function fn(e,r,n,a){fr(e,r,{mode:n&4095|r.mode&-4096,ctime:Date.now(),Fb:a})}function pt(e,r){e=typeof e=="string"?oe(e,{$a:!0}).node:e,fn(null,e,r)}function yn(e,r,n){if(re(r.mode))throw new y(31);if((r.mode&61440)!==32768)throw new y(28);var a=qe(r,"w");if(a)throw new y(a);fr(e,r,{size:n,timestamp:Date.now()})}function je(e,r,n=438){if(e==="")throw new y(44);if(typeof r=="string"){var a={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[r];if(typeof a>"u")throw Error(`Unknown file open mode: ${r}`);r=a}if(n=r&64?n&4095|32768:0,typeof e=="object")a=e;else{var u=e.endsWith("/");e=oe(e,{$a:!(r&131072),Jb:!0}),a=e.node,e=e.path}var h=!1;if(r&64)if(a){if(r&128)throw new y(20)}else{if(u)throw new y(31);a=ut(e,n|511,0),h=!0}if(!a)throw new y(44);if((a.mode&61440)===8192&&(r&=-513),r&65536&&!re(a.mode))throw new y(54);if(!h&&(u=a?(a.mode&61440)===40960?32:re(a.mode)&&(cn(r)!=="r"||r&576)?31:qe(a,cn(r)):44))throw new y(u);return r&512&&!h&&(u=a,u=typeof u=="string"?oe(u,{$a:!0}).node:u,yn(null,u,0)),r&=-131713,u=pn({node:a,path:hr(a),flags:r,seekable:!0,position:0,Ma:a.Ma,Lb:[],error:!1}),u.Ma.open&&u.Ma.open(u),h&&pt(a,n&511),!o.logReadFiles||r&1||e in an||(an[e]=1),u}function vr(e){if(e.fd===null)throw new y(8);e.pb&&(e.pb=null);try{e.Ma.close&&e.Ma.close(e)}catch(r){throw r}finally{Fe[e.fd]=null}e.fd=null}function bn(e,r,n){if(e.fd===null)throw new y(8);if(!e.seekable||!e.Ma.Va)throw new y(70);if(n!=0&&n!=1&&n!=2)throw new y(28);e.position=e.Ma.Va(e,r,n),e.Lb=[]}function vn(e,r,n,a,u){if(0>a||0>u)throw new y(28);if(e.fd===null)throw new y(8);if((e.flags&2097155)===1)throw new y(8);if(re(e.node.mode))throw new y(31);if(!e.Ma.read)throw new y(28);var h=typeof u<"u";if(!h)u=e.position;else if(!e.seekable)throw new y(70);return r=e.Ma.read(e,r,n,a,u),h||(e.position+=r),r}function wn(e,r,n,a,u){if(0>a||0>u)throw new y(28);if(e.fd===null)throw new y(8);if(!(e.flags&2097155))throw new y(8);if(re(e.node.mode))throw new y(31);if(!e.Ma.write)throw new y(28);e.seekable&&e.flags&1024&&bn(e,0,2);var h=typeof u<"u";if(!h)u=e.position;else if(!e.seekable)throw new y(70);return r=e.Ma.write(e,r,n,a,u,void 0),h||(e.position+=r),r}function ts(e){var r=r||0,n="binary";n!=="utf8"&&n!=="binary"&&Oe(`Invalid encoding type "${n}"`),r=je(e,r),e=Ge(e).size;var a=new Uint8Array(e);return vn(r,a,0,e,0),n==="utf8"&&(a=Ye(a)),vr(r),a}function Ee(e,r,n){e=ur("/dev/"+e);var a=rn(!!r,!!n);Ee.yb??(Ee.yb=64);var u=Ee.yb++<<8|0;yr(u,{open(h){h.seekable=!1},close(){n?.buffer?.length&&n(10)},read(h,g,x,N){for(var S=0,q=0;q<N;q++){try{var X=r()}catch{throw new y(29)}if(X===void 0&&S===0)throw new y(6);if(X==null)break;S++,g[x+q]=X}return S&&(h.node.atime=Date.now()),S},write(h,g,x,N){for(var S=0;S<N;S++)try{n(g[x+S])}catch{throw new y(29)}return N&&(h.node.mtime=h.node.ctime=Date.now()),S}}),dt(e,a,u)}var F={};function Ne(e,r,n){if(r.charAt(0)==="/")return r;if(e=e===-100?"/":Z(e).path,r.length==0){if(!n)throw new y(44);return e}return e+"/"+r}function ht(e,r){U[e>>2]=r.dev,U[e+4>>2]=r.mode,U[e+8>>2]=r.nlink,U[e+12>>2]=r.uid,U[e+16>>2]=r.gid,U[e+20>>2]=r.rdev,ce[e+24>>3]=BigInt(r.size),j[e+32>>2]=4096,j[e+36>>2]=r.blocks;var n=r.atime.getTime(),a=r.mtime.getTime(),u=r.ctime.getTime();return ce[e+40>>3]=BigInt(Math.floor(n/1e3)),U[e+48>>2]=n%1e3*1e6,ce[e+56>>3]=BigInt(Math.floor(a/1e3)),U[e+64>>2]=a%1e3*1e6,ce[e+72>>3]=BigInt(Math.floor(u/1e3)),U[e+80>>2]=u%1e3*1e6,ce[e+88>>3]=BigInt(r.ino),0}var gt=void 0,mt=()=>{var e=j[+gt>>2];return gt+=4,e},wr=0,rs=[0,31,60,91,121,152,182,213,244,274,305,335],ns=[0,31,59,90,120,151,181,212,243,273,304,334],Qe={},En=e=>{J=e,at||0<wr||(o.onExit?.(e),C=!0),k(e,new cr(e))},is=e=>{if(!C)try{e()}catch(r){r instanceof cr||r=="unwind"||k(1,r)}finally{if(!(at||0<wr))try{J=e=J,En(e)}catch(r){r instanceof cr||r=="unwind"||k(1,r)}}},Er={},xn=()=>{if(!xr){var e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:_||"./this.program"},r;for(r in Er)Er[r]===void 0?delete e[r]:e[r]=Er[r];var n=[];for(r in e)n.push(`${r}=${e[r]}`);xr=n}return xr},xr,ss=(e,r,n,a)=>{var u={string:S=>{var q=0;if(S!=null&&S!==0){q=Ue(S)+1;var X=$e(q);he(S,Q,X,q),q=X}return q},array:S=>{var q=$e(S.length);return K.set(S,q),q}};e=o["_"+e];var h=[],g=0;if(a)for(var x=0;x<a.length;x++){var N=u[n[x]];N?(g===0&&(g=vt()),h[x]=N(a[x])):h[x]=a[x]}return n=e(...h),n=function(S){return g!==0&&bt(g),r==="string"?V(S):r==="boolean"?!!S:S}(n)},ft=e=>{var r=Ue(e)+1,n=yt(r);return n&&he(e,Q,n,r),n},De,_r=[],xe=e=>{De.delete(_e.get(e)),_e.set(e,null),_r.push(e)},_n=e=>{let r=e.length;return[r%128|128,r>>7,...e]},os={i:127,p:127,j:126,f:125,d:124,e:111},Tn=e=>_n(Array.from(e,r=>os[r])),Ze=(e,r)=>{if(!De){De=new WeakMap;var n=_e.length;if(De)for(var a=0;a<0+n;a++){var u=_e.get(a);u&&De.set(u,a)}}if(n=De.get(e)||0)return n;n=_r.length?_r.pop():_e.grow(1);try{_e.set(n,e)}catch(h){if(!(h instanceof TypeError))throw h;r=Uint8Array.of(0,97,115,109,1,0,0,0,1,..._n([1,96,...Tn(r.slice(1)),...Tn(r[0]==="v"?"":r[0])]),2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0),r=new WebAssembly.Module(r),r=new WebAssembly.Instance(r,{e:{f:e}}).exports.f,_e.set(n,r)}return De.set(e,n),n};if(we=Array(4096),hn(T,"/"),ge("/tmp"),ge("/home"),ge("/home/web_user"),function(){ge("/dev"),yr(259,{read:()=>0,write:(a,u,h,g)=>g,Va:()=>0}),dt("/dev/null",259),tn(1280,Xi),tn(1536,Wi),dt("/dev/tty",1280),dt("/dev/tty1",1536);var e=new Uint8Array(1024),r=0,n=()=>(r===0&&(Zr(e),r=e.byteLength),e[--r]);Ee("random",n),Ee("urandom",n),ge("/dev/shm"),ge("/dev/shm/tmp")}(),function(){ge("/proc");var e=ge("/proc/self");ge("/proc/self/fd"),hn({Xa(){var r=ln(e,"fd",16895,73);return r.Ma={Va:T.Ma.Va},r.La={lookup(n,a){n=+a;var u=Z(n);return n={parent:null,Xa:{zb:"fake"},La:{readlink:()=>u.path},id:n+1},n.parent=n},readdir(){return Array.from(Fe.entries()).filter(([,n])=>n).map(([n])=>n.toString())}},r}},"/proc/self/fd")}(),o.noExitRuntime&&(at=o.noExitRuntime),o.print&&(w=o.print),o.printErr&&(I=o.printErr),o.wasmBinary&&(O=o.wasmBinary),o.thisProgram&&(_=o.thisProgram),o.preInit)for(typeof o.preInit=="function"&&(o.preInit=[o.preInit]);0<o.preInit.length;)o.preInit.shift()();o.stackSave=()=>vt(),o.stackRestore=e=>bt(e),o.stackAlloc=e=>$e(e),o.cwrap=(e,r,n,a)=>{var u=!n||n.every(h=>h==="number"||h==="boolean");return r!=="string"&&u&&!a?o["_"+e]:(...h)=>ss(e,r,n,h)},o.addFunction=Ze,o.removeFunction=xe,o.UTF8ToString=V,o.stringToNewUTF8=ft,o.writeArrayToMemory=(e,r)=>{K.set(e,r)};var yt,et,Sn,kn,bt,$e,vt,wt,_e,as={a:(e,r,n,a)=>Oe(`Assertion failed: ${V(e)}, at: `+[r?V(r):"unknown filename",n,a?V(a):"unknown function"]),i:function(e,r){try{return e=V(e),pt(e,r),0}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},L:function(e,r,n){try{if(r=V(r),r=Ne(e,r),n&-8)return-28;var a=oe(r,{$a:!0}).node;return a?(e="",n&4&&(e+="r"),n&2&&(e+="w"),n&1&&(e+="x"),e&&qe(a,e)?-2:0):-44}catch(u){if(typeof F>"u"||u.name!=="ErrnoError")throw u;return-u.Pa}},j:function(e,r){try{var n=Z(e);return fn(n,n.node,r,!1),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},h:function(e){try{var r=Z(e);return fr(r,r.node,{timestamp:Date.now(),Fb:!1}),0}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},b:function(e,r,n){gt=n;try{var a=Z(e);switch(r){case 0:var u=mt();if(0>u)break;for(;Fe[u];)u++;return Qi(a,u).fd;case 1:case 2:return 0;case 3:return a.flags;case 4:return u=mt(),a.flags|=u,0;case 12:return u=mt(),Xe[u+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return-h.Pa}},g:function(e,r){try{var n=Z(e),a=n.node,u=n.Ma.Ta;e=u?n:a,u??=a.La.Ta,ct(u);var h=u(e);return ht(r,h)}catch(g){if(typeof F>"u"||g.name!=="ErrnoError")throw g;return-g.Pa}},H:function(e,r){r=-9007199254740992>r||9007199254740992<r?NaN:Number(r);try{if(isNaN(r))return-61;var n=Z(e);if(0>r||!(n.flags&2097155))throw new y(28);return yn(n,n.node,r),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},G:function(e,r){try{if(r===0)return-28;var n=Ue("/")+1;return r<n?-68:(he("/",Q,e,r),n)}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},K:function(e,r){try{return e=V(e),ht(r,Ge(e,!0))}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},C:function(e,r,n){try{return r=V(r),r=Ne(e,r),ge(r,n),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},J:function(e,r,n,a){try{r=V(r);var u=a&256;return r=Ne(e,r,a&4096),ht(n,u?Ge(r,!0):Ge(r))}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return-h.Pa}},x:function(e,r,n,a){gt=a;try{r=V(r),r=Ne(e,r);var u=a?mt():0;return je(r,n,u).fd}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return-h.Pa}},v:function(e,r,n,a){try{if(r=V(r),r=Ne(e,r),0>=a)return-28;var u=oe(r).node;if(!u)throw new y(44);if(!u.La.readlink)throw new y(28);var h=u.La.readlink(u),g=Math.min(a,Ue(h)),x=K[n+g];return he(h,Q,n,a+1),K[n+g]=x,g}catch(N){if(typeof F>"u"||N.name!=="ErrnoError")throw N;return-N.Pa}},u:function(e){try{return e=V(e),gn(e),0}catch(r){if(typeof F>"u"||r.name!=="ErrnoError")throw r;return-r.Pa}},f:function(e,r){try{return e=V(e),ht(r,Ge(e))}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return-n.Pa}},r:function(e,r,n){try{if(r=V(r),r=Ne(e,r),n)if(n===512)gn(r);else return-28;else mn(r);return 0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return-a.Pa}},q:function(e,r,n){try{r=V(r),r=Ne(e,r,!0);var a=Date.now(),u,h;if(n){var g=U[n>>2]+4294967296*j[n+4>>2],x=j[n+8>>2];x==1073741823?u=a:x==1073741822?u=null:u=1e3*g+x/1e6,n+=16,g=U[n>>2]+4294967296*j[n+4>>2],x=j[n+8>>2],x==1073741823?h=a:x==1073741822?h=null:h=1e3*g+x/1e6}else h=u=a;if((h??u)!==null){e=u;var N=oe(r,{$a:!0}).node;ct(N.La.Ua)(N,{atime:e,mtime:h})}return 0}catch(S){if(typeof F>"u"||S.name!=="ErrnoError")throw S;return-S.Pa}},m:()=>Oe(""),l:()=>{at=!1,wr=0},A:function(e,r){e=-9007199254740992>e||9007199254740992<e?NaN:Number(e),e=new Date(1e3*e),j[r>>2]=e.getSeconds(),j[r+4>>2]=e.getMinutes(),j[r+8>>2]=e.getHours(),j[r+12>>2]=e.getDate(),j[r+16>>2]=e.getMonth(),j[r+20>>2]=e.getFullYear()-1900,j[r+24>>2]=e.getDay();var n=e.getFullYear();j[r+28>>2]=(n%4!==0||n%100===0&&n%400!==0?ns:rs)[e.getMonth()]+e.getDate()-1|0,j[r+36>>2]=-(60*e.getTimezoneOffset()),n=new Date(e.getFullYear(),6,1).getTimezoneOffset();var a=new Date(e.getFullYear(),0,1).getTimezoneOffset();j[r+32>>2]=(n!=a&&e.getTimezoneOffset()==Math.min(a,n))|0},y:function(e,r,n,a,u,h,g){u=-9007199254740992>u||9007199254740992<u?NaN:Number(u);try{var x=Z(a);if(r&2&&!(n&2)&&(x.flags&2097155)!==2)throw new y(2);if((x.flags&2097155)===1)throw new y(2);if(!x.Ma.ib)throw new y(43);if(!e)throw new y(28);var N=x.Ma.ib(x,e,u,r,n),S=N.Kb;return j[h>>2]=N.Ab,U[g>>2]=S,0}catch(q){if(typeof F>"u"||q.name!=="ErrnoError")throw q;return-q.Pa}},z:function(e,r,n,a,u,h){h=-9007199254740992>h||9007199254740992<h?NaN:Number(h);try{var g=Z(u);if(n&2){if(n=h,(g.node.mode&61440)!==32768)throw new y(43);if(!(a&2)){var x=Q.slice(e,e+r);g.Ma.jb&&g.Ma.jb(g,x,n,r,a)}}}catch(N){if(typeof F>"u"||N.name!=="ErrnoError")throw N;return-N.Pa}},n:(e,r)=>{if(Qe[e]&&(clearTimeout(Qe[e].id),delete Qe[e]),!r)return 0;var n=setTimeout(()=>{delete Qe[e],is(()=>kn(e,performance.now()))},r);return Qe[e]={id:n,Xb:r},0},B:(e,r,n,a)=>{var u=new Date().getFullYear(),h=new Date(u,0,1).getTimezoneOffset();u=new Date(u,6,1).getTimezoneOffset(),U[e>>2]=60*Math.max(h,u),j[r>>2]=+(h!=u),r=g=>{var x=Math.abs(g);return`UTC${0<=g?"-":"+"}${String(Math.floor(x/60)).padStart(2,"0")}${String(x%60).padStart(2,"0")}`},e=r(h),r=r(u),u<h?(he(e,Q,n,17),he(r,Q,a,17)):(he(e,Q,a,17),he(r,Q,n,17))},d:()=>Date.now(),s:()=>2147483648,c:()=>performance.now(),o:e=>{var r=Q.length;if(e>>>=0,2147483648<e)return!1;for(var n=1;4>=n;n*=2){var a=r*(1+.2/n);a=Math.min(a,e+100663296);e:{a=(Math.min(2147483648,65536*Math.ceil(Math.max(e,a)/65536))-wt.buffer.byteLength+65535)/65536|0;try{wt.grow(a),Kr();var u=1;break e}catch{}u=void 0}if(u)return!0}return!1},E:(e,r)=>{var n=0,a=0,u;for(u of xn()){var h=r+n;U[e+a>>2]=h,n+=he(u,Q,h,1/0)+1,a+=4}return 0},F:(e,r)=>{var n=xn();U[e>>2]=n.length,e=0;for(var a of n)e+=Ue(a)+1;return U[r>>2]=e,0},e:function(e){try{var r=Z(e);return vr(r),0}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return n.Pa}},p:function(e,r){try{var n=Z(e);return K[r]=n.tty?2:re(n.mode)?3:(n.mode&61440)===40960?7:4,Xe[r+2>>1]=0,ce[r+8>>3]=BigInt(0),ce[r+16>>3]=BigInt(0),0}catch(a){if(typeof F>"u"||a.name!=="ErrnoError")throw a;return a.Pa}},w:function(e,r,n,a){try{e:{var u=Z(e);e=r;for(var h,g=r=0;g<n;g++){var x=U[e>>2],N=U[e+4>>2];e+=8;var S=vn(u,K,x,N,h);if(0>S){var q=-1;break e}if(r+=S,S<N)break;typeof h<"u"&&(h+=S)}q=r}return U[a>>2]=q,0}catch(X){if(typeof F>"u"||X.name!=="ErrnoError")throw X;return X.Pa}},D:function(e,r,n,a){r=-9007199254740992>r||9007199254740992<r?NaN:Number(r);try{if(isNaN(r))return 61;var u=Z(e);return bn(u,r,n),ce[a>>3]=BigInt(u.position),u.pb&&r===0&&n===0&&(u.pb=null),0}catch(h){if(typeof F>"u"||h.name!=="ErrnoError")throw h;return h.Pa}},I:function(e){try{var r=Z(e);return r.Ma?.fsync?.(r)}catch(n){if(typeof F>"u"||n.name!=="ErrnoError")throw n;return n.Pa}},t:function(e,r,n,a){try{e:{var u=Z(e);e=r;for(var h,g=r=0;g<n;g++){var x=U[e>>2],N=U[e+4>>2];e+=8;var S=wn(u,K,x,N,h);if(0>S){var q=-1;break e}if(r+=S,S<N)break;typeof h<"u"&&(h+=S)}q=r}return U[a>>2]=q,0}catch(X){if(typeof F>"u"||X.name!=="ErrnoError")throw X;return X.Pa}},k:En};function Tr(){function e(){if(o.calledRun=!0,!C){if(!o.noFSInit&&!sn){var r,n;sn=!0,r??=o.stdin,n??=o.stdout,a??=o.stderr,r?Ee("stdin",r):br("/dev/tty","/dev/stdin"),n?Ee("stdout",null,n):br("/dev/tty","/dev/stdout"),a?Ee("stderr",null,a):br("/dev/tty1","/dev/stderr"),je("/dev/stdin",0),je("/dev/stdout",1),je("/dev/stderr",1)}if(Sr.N(),on=!1,o.onRuntimeInitialized?.(),o.postRun)for(typeof o.postRun=="function"&&(o.postRun=[o.postRun]);o.postRun.length;){var a=o.postRun.shift();Xr.push(a)}Jr(Xr)}}if(0<Pe)We=Tr;else{if(o.preRun)for(typeof o.preRun=="function"&&(o.preRun=[o.preRun]);o.preRun.length;)Vi();Jr(Wr),0<Pe?We=Tr:o.setStatus?(o.setStatus("Running..."),setTimeout(()=>{setTimeout(()=>o.setStatus(""),1),e()},1)):e()}}var Sr;return async function(){function e(n){return n=Sr=n.exports,o._sqlite3_free=n.P,o._sqlite3_value_text=n.Q,o._sqlite3_prepare_v2=n.R,o._sqlite3_step=n.S,o._sqlite3_reset=n.T,o._sqlite3_exec=n.U,o._sqlite3_finalize=n.V,o._sqlite3_column_name=n.W,o._sqlite3_column_text=n.X,o._sqlite3_column_type=n.Y,o._sqlite3_errmsg=n.Z,o._sqlite3_clear_bindings=n._,o._sqlite3_value_blob=n.$,o._sqlite3_value_bytes=n.aa,o._sqlite3_value_double=n.ba,o._sqlite3_value_int=n.ca,o._sqlite3_value_type=n.da,o._sqlite3_result_blob=n.ea,o._sqlite3_result_double=n.fa,o._sqlite3_result_error=n.ga,o._sqlite3_result_int=n.ha,o._sqlite3_result_int64=n.ia,o._sqlite3_result_null=n.ja,o._sqlite3_result_text=n.ka,o._sqlite3_aggregate_context=n.la,o._sqlite3_column_count=n.ma,o._sqlite3_data_count=n.na,o._sqlite3_column_blob=n.oa,o._sqlite3_column_bytes=n.pa,o._sqlite3_column_double=n.qa,o._sqlite3_bind_blob=n.ra,o._sqlite3_bind_double=n.sa,o._sqlite3_bind_int=n.ta,o._sqlite3_bind_text=n.ua,o._sqlite3_bind_parameter_index=n.va,o._sqlite3_sql=n.wa,o._sqlite3_normalized_sql=n.xa,o._sqlite3_changes=n.ya,o._sqlite3_close_v2=n.za,o._sqlite3_create_function_v2=n.Aa,o._sqlite3_update_hook=n.Ba,o._sqlite3_open=n.Ca,yt=o._malloc=n.Da,et=o._free=n.Ea,o._RegisterExtensionFunctions=n.Fa,Sn=n.Ga,kn=n.Ha,bt=n.Ia,$e=n.Ja,vt=n.Ka,wt=n.M,_e=n.O,Kr(),Pe--,o.monitorRunDependencies?.(Pe),Pe==0&&We&&(n=We,We=null,n()),Sr}Pe++,o.monitorRunDependencies?.(Pe);var r={a:as};return o.instantiateWasm?new Promise(n=>{o.instantiateWasm(r,(a,u)=>{n(e(a,u))})}):(lr??=o.locateFile?o.locateFile("sql-wasm.wasm",L):L+"sql-wasm.wasm",e((await Bi(r)).instance))}(),Tr(),s}),Lt)};typeof Dt=="object"&&typeof Ce=="object"?(Ce.exports=Nt,Ce.exports.default=Nt):typeof define=="function"&&define.amd?define([],function(){return Nt}):typeof Dt=="object"&&(Dt.Module=Nt)});var Kn=te((Ia,Hn)=>{"use strict";var Xs=require("events"),Lr=class extends Xs{constructor(t){if(super(),typeof t!="function")throw"execution must be a function";this._execution=t}execute(t){let i;try{i=this._execution(t)}catch(s){return this.emit("task-failed",s)}return i instanceof Promise?i.then(()=>this.emit("task-finished")).catch(s=>this.emit("task-failed",s)):(this.emit("task-finished"),i)}};Hn.exports=Lr});var Xn=te((Pa,Jn)=>{"use strict";Jn.exports=(()=>{let c=["january","february","march","april","may","june","july","august","september","october","november","december"],t=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];function i(l,o){for(let p=0;p<o.length;p++)l=l.replace(new RegExp(o[p],"gi"),parseInt(p,10)+1);return l}function s(l){return l=i(l,c),l=i(l,t),l}return s})()});var zn=te((La,Wn)=>{"use strict";Wn.exports=(()=>{let c=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],t=["sun","mon","tue","wed","thu","fri","sat"];function i(l,o){for(let p=0;p<o.length;p++)l=l.replace(new RegExp(o[p],"gi"),parseInt(p,10));return l}function s(l){return l=l.replace("7","0"),l=i(l,c),i(l,t)}return s})()});var Gn=te((Na,Yn)=>{"use strict";Yn.exports=(()=>{function c(i,s){return i.indexOf("*")!==-1?i.replace("*",s):i}function t(i){return i[0]=c(i[0],"0-59"),i[1]=c(i[1],"0-59"),i[2]=c(i[2],"0-23"),i[3]=c(i[3],"1-31"),i[4]=c(i[4],"1-12"),i[5]=c(i[5],"0-6"),i}return t})()});var Zn=te((Da,Qn)=>{"use strict";Qn.exports=(()=>{function c(s,l,o,p){let f=[],b=parseInt(p),_=parseInt(o);_>b&&(b=parseInt(o),_=parseInt(p));for(let k=_;k<=b;k++)f.push(k);return s.replace(new RegExp(l,"i"),f.join())}function t(s){let l=/(\d+)-(\d+)/,o=l.exec(s);for(;o!==null&&o.length>0;)s=c(s,o[0],o[1],o[2]),o=l.exec(s);return s}function i(s){for(let l=0;l<s.length;l++)s[l]=t(s[l]);return s}return i})()});var ti=te(($a,ei)=>{"use strict";ei.exports=(()=>{function c(t){for(var i=/^(.+)\/(\w+)$/,s=0;s<t.length;s++){var l=i.exec(t[s]),o=l!==null&&l.length>0;if(o){var p=l[2];if(isNaN(p))throw p+" is not a valid step value";for(var f=l[1].split(","),b=[],_=parseInt(p,10),k=0;k<=f.length;k++){var P=parseInt(f[k],10);P%_===0&&b.push(P)}t[s]=b.join(",")}}return t}return c})()});var Nr=te((Ma,ri)=>{"use strict";var Ws=Xn(),zs=zn(),Ys=Gn(),Gs=Zn(),Qs=ti();ri.exports=(()=>{function c(l){return l.length===5?["0"].concat(l):l}function t(l){return l.replace(/\s{2,}/g," ").trim()}function i(l){for(let o=0;o<l.length;o++){let p=l[o].split(",");for(let f=0;f<p.length;f++)p[f]=parseInt(p[f]);l[o]=p}return l}function s(l){let o=t(l).split(" ");return o=c(o),o[4]=Ws(o[4]),o[5]=zs(o[5]),o=Ys(o),o=Gs(o),o=Qs(o),o=i(o),o.join(" ")}return s})()});var Dr=te((Ca,ni)=>{"use strict";var Zs=Nr(),eo=/^(?:\d+|\*|\*\/\d+)$/;function He(c,t,i){let s=c.split(",");for(let l of s){let o=parseInt(l,10);if(!Number.isNaN(o)&&(o<t||o>i)||!eo.test(l))return!1}return!0}function to(c){return!He(c,0,59)}function ro(c){return!He(c,0,59)}function no(c){return!He(c,0,23)}function io(c){return!He(c,1,31)}function so(c){return!He(c,1,12)}function oo(c){return!He(c,0,7)}function ao(c,t){if(to(t[0]))throw new Error(`${c[0]} is a invalid expression for second`);if(ro(t[1]))throw new Error(`${c[1]} is a invalid expression for minute`);if(no(t[2]))throw new Error(`${c[2]} is a invalid expression for hour`);if(io(t[3]))throw new Error(`${c[3]} is a invalid expression for day of month`);if(so(t[4]))throw new Error(`${c[4]} is a invalid expression for month`);if(oo(t[5]))throw new Error(`${c[5]} is a invalid expression for week day`)}function lo(c){if(typeof c!="string")throw new TypeError("pattern must be a string!");let t=c.split(" "),i=Zs(c).split(" ");t.length===5&&t.unshift("0"),ao(t,i)}ni.exports=lo});var si=te((Oa,ii)=>{var co=Dr(),uo=Nr();function Ke(c,t){return c.indexOf(",")!==-1?c.split(",").indexOf(t.toString())!==-1:c===t.toString()}var $r=class{constructor(t,i){co(t),this.pattern=uo(t),this.timezone=i,this.expressions=this.pattern.split(" "),this.dtf=this.timezone?new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23",fractionalSecondDigits:3,timeZone:this.timezone}):null}match(t){t=this.apply(t);let i=Ke(this.expressions[0],t.getSeconds()),s=Ke(this.expressions[1],t.getMinutes()),l=Ke(this.expressions[2],t.getHours()),o=Ke(this.expressions[3],t.getDate()),p=Ke(this.expressions[4],t.getMonth()+1),f=Ke(this.expressions[5],t.getDay());return i&&s&&l&&o&&p&&f}apply(t){return this.dtf?new Date(this.dtf.format(t)):t}};ii.exports=$r});var ai=te((Ua,oi)=>{"use strict";var po=require("events"),ho=si(),Mr=class extends po{constructor(t,i,s){super(),this.timeMatcher=new ho(t,i),this.autorecover=s}start(){this.stop();let t=process.hrtime(),i=this.timeMatcher.apply(new Date),s=()=>{let o=process.hrtime(t),p=(o[0]*1e9+o[1])/1e6,f=Math.floor(p/1e3);for(let b=f;b>=0;b--){let _=new Date(new Date().getTime()-b*1e3),k=this.timeMatcher.apply(_);i.getTime()<k.getTime()&&(b===0||this.autorecover)&&this.timeMatcher.match(_)&&(this.emit("scheduled-time-matched",k),k.setMilliseconds(0),i=k)}t=process.hrtime(),this.timeout=setTimeout(s,1e3)};s()}stop(){this.timeout&&clearTimeout(this.timeout),this.timeout=null}};oi.exports=Mr});function rt(){return Wt>zt.length-16&&(li.default.randomFillSync(zt),Wt=0),zt.slice(Wt,Wt+=16)}var li,zt,Wt,Cr=ee(()=>{li=$(require("crypto")),zt=new Uint8Array(256),Wt=zt.length});var ci,ui=ee(()=>{ci=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i});function go(c){return typeof c=="string"&&ci.test(c)}var Re,nt=ee(()=>{ui();Re=go});function mo(c,t=0){let i=(z[c[t+0]]+z[c[t+1]]+z[c[t+2]]+z[c[t+3]]+"-"+z[c[t+4]]+z[c[t+5]]+"-"+z[c[t+6]]+z[c[t+7]]+"-"+z[c[t+8]]+z[c[t+9]]+"-"+z[c[t+10]]+z[c[t+11]]+z[c[t+12]]+z[c[t+13]]+z[c[t+14]]+z[c[t+15]]).toLowerCase();if(!Re(i))throw TypeError("Stringified UUID is invalid");return i}var z,Ae,it=ee(()=>{nt();z=[];for(let c=0;c<256;++c)z.push((c+256).toString(16).substr(1));Ae=mo});function fo(c,t,i){let s=t&&i||0,l=t||new Array(16);c=c||{};let o=c.node||di,p=c.clockseq!==void 0?c.clockseq:Or;if(o==null||p==null){let L=c.random||(c.rng||rt)();o==null&&(o=di=[L[0]|1,L[1],L[2],L[3],L[4],L[5]]),p==null&&(p=Or=(L[6]<<8|L[7])&16383)}let f=c.msecs!==void 0?c.msecs:Date.now(),b=c.nsecs!==void 0?c.nsecs:Fr+1,_=f-Ur+(b-Fr)/1e4;if(_<0&&c.clockseq===void 0&&(p=p+1&16383),(_<0||f>Ur)&&c.nsecs===void 0&&(b=0),b>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");Ur=f,Fr=b,Or=p,f+=122192928e5;let k=((f&268435455)*1e4+b)%4294967296;l[s++]=k>>>24&255,l[s++]=k>>>16&255,l[s++]=k>>>8&255,l[s++]=k&255;let P=f/4294967296*1e4&268435455;l[s++]=P>>>8&255,l[s++]=P&255,l[s++]=P>>>24&15|16,l[s++]=P>>>16&255,l[s++]=p>>>8|128,l[s++]=p&255;for(let L=0;L<6;++L)l[s+L]=o[L];return t||Ae(l)}var di,Or,Ur,Fr,pi,hi=ee(()=>{Cr();it();Ur=0,Fr=0;pi=fo});function yo(c){if(!Re(c))throw TypeError("Invalid UUID");let t,i=new Uint8Array(16);return i[0]=(t=parseInt(c.slice(0,8),16))>>>24,i[1]=t>>>16&255,i[2]=t>>>8&255,i[3]=t&255,i[4]=(t=parseInt(c.slice(9,13),16))>>>8,i[5]=t&255,i[6]=(t=parseInt(c.slice(14,18),16))>>>8,i[7]=t&255,i[8]=(t=parseInt(c.slice(19,23),16))>>>8,i[9]=t&255,i[10]=(t=parseInt(c.slice(24,36),16))/1099511627776&255,i[11]=t/4294967296&255,i[12]=t>>>24&255,i[13]=t>>>16&255,i[14]=t>>>8&255,i[15]=t&255,i}var Yt,qr=ee(()=>{nt();Yt=yo});function bo(c){c=unescape(encodeURIComponent(c));let t=[];for(let i=0;i<c.length;++i)t.push(c.charCodeAt(i));return t}function Gt(c,t,i){function s(l,o,p,f){if(typeof l=="string"&&(l=bo(l)),typeof o=="string"&&(o=Yt(o)),o.length!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let b=new Uint8Array(16+l.length);if(b.set(o),b.set(l,o.length),b=i(b),b[6]=b[6]&15|t,b[8]=b[8]&63|128,p){f=f||0;for(let _=0;_<16;++_)p[f+_]=b[_];return p}return Ae(b)}try{s.name=c}catch{}return s.DNS=vo,s.URL=wo,s}var vo,wo,jr=ee(()=>{it();qr();vo="6ba7b810-9dad-11d1-80b4-00c04fd430c8",wo="6ba7b811-9dad-11d1-80b4-00c04fd430c8"});function Eo(c){return Array.isArray(c)?c=Buffer.from(c):typeof c=="string"&&(c=Buffer.from(c,"utf8")),gi.default.createHash("md5").update(c).digest()}var gi,mi,fi=ee(()=>{gi=$(require("crypto"));mi=Eo});var xo,yi,bi=ee(()=>{jr();fi();xo=Gt("v3",48,mi),yi=xo});function _o(c,t,i){c=c||{};let s=c.random||(c.rng||rt)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){i=i||0;for(let l=0;l<16;++l)t[i+l]=s[l];return t}return Ae(s)}var vi,wi=ee(()=>{Cr();it();vi=_o});function To(c){return Array.isArray(c)?c=Buffer.from(c):typeof c=="string"&&(c=Buffer.from(c,"utf8")),Ei.default.createHash("sha1").update(c).digest()}var Ei,xi,_i=ee(()=>{Ei=$(require("crypto"));xi=To});var So,Ti,Si=ee(()=>{jr();_i();So=Gt("v5",80,xi),Ti=So});var ki,Ri=ee(()=>{ki="00000000-0000-0000-0000-000000000000"});function ko(c){if(!Re(c))throw TypeError("Invalid UUID");return parseInt(c.substr(14,1),16)}var Ai,Ii=ee(()=>{nt();Ai=ko});var Qt={};Cn(Qt,{NIL:()=>ki,parse:()=>Yt,stringify:()=>Ae,v1:()=>pi,v3:()=>yi,v4:()=>vi,v5:()=>Ti,validate:()=>Re,version:()=>Ai});var Zt=ee(()=>{hi();bi();wi();Si();Ri();Ii();nt();it();qr()});var Li=te((xl,Pi)=>{"use strict";var Ro=require("events"),Ao=Kn(),Io=ai(),Po=(Zt(),_t(Qt)),Br=class extends Ro{constructor(t,i,s){super(),s||(s={scheduled:!0,recoverMissedExecutions:!1}),this.options=s,this.options.name=this.options.name||Po.v4(),this._task=new Ao(i),this._scheduler=new Io(t,s.timezone,s.recoverMissedExecutions),this._scheduler.on("scheduled-time-matched",l=>{this.now(l)}),s.scheduled!==!1&&this._scheduler.start(),s.runOnInit===!0&&this.now("init")}now(t="manual"){let i=this._task.execute(t);this.emit("task-done",i)}start(){this._scheduler.start()}stop(){this._scheduler.stop()}};Pi.exports=Br});var Di=te((_l,Ni)=>{var Lo=require("events"),No=require("path"),{fork:Do}=require("child_process"),$o=(Zt(),_t(Qt)),Mo=`${__dirname}/daemon.js`,Vr=class extends Lo{constructor(t,i,s){super(),s||(s={scheduled:!0,recoverMissedExecutions:!1}),this.cronExpression=t,this.taskPath=i,this.options=s,this.options.name=this.options.name||$o.v4(),s.scheduled&&this.start()}start(){this.stop(),this.forkProcess=Do(Mo),this.forkProcess.on("message",i=>{switch(i.type){case"task-done":this.emit("task-done",i.result);break}});let t=this.options;t.scheduled=!0,this.forkProcess.send({type:"register",path:No.resolve(this.taskPath),cron:this.cronExpression,options:t})}stop(){this.forkProcess&&this.forkProcess.kill()}pid(){if(this.forkProcess)return this.forkProcess.pid}isRunning(){return!this.forkProcess.killed}};Ni.exports=Vr});var Mi=te((Tl,$i)=>{$i.exports=(global.scheduledTasks||(global.scheduledTasks=new Map),{save:c=>{if(!c.options){let t=(Zt(),_t(Qt));c.options={},c.options.name=t.v4()}global.scheduledTasks.set(c.options.name,c)},getTasks:()=>global.scheduledTasks})});var Ui=te((Sl,Oi)=>{"use strict";var Co=Li(),Oo=Di(),Uo=Dr(),Ci=Mi();function Fo(c,t,i){let s=qo(c,t,i);return Ci.save(s),s}function qo(c,t,i){return typeof t=="string"?new Oo(c,t,i):new Co(c,t,i)}function jo(c){try{return Uo(c),!0}catch{return!1}}function Bo(){return Ci.getTasks()}Oi.exports={schedule:Fo,validate:jo,getTasks:Bo}});var Ko={};Cn(Ko,{activate:()=>Vo,deactivate:()=>Ho});module.exports=_t(Ko);var H=$(require("vscode"));var pe=$(require("vscode")),Tt=class{constructor(t){this.db=t}_onDidChangeTreeData=new pe.EventEmitter;onDidChangeTreeData=this._onDidChangeTreeData.event;refresh(){this._onDidChangeTreeData.fire()}getTreeItem(t){return t}getChildren(t){if(t)return t.recordingId?this.db.getActions(t.recordingId).map((l,o)=>{let p=new tt(`${o+1}. ${l.action_type} \u2014 ${l.url||""}`,pe.TreeItemCollapsibleState.None);return p.description=`${l.timestamp_ms}ms`,p.iconPath=new pe.ThemeIcon("debug-step-over"),p}):[];let i=this.db.getAllRecordings();return i.length===0?[new tt("No recordings yet. Click + to start.",pe.TreeItemCollapsibleState.None)]:i.map(s=>{let l=new tt(s.name,pe.TreeItemCollapsibleState.Collapsed);return l.recordingId=s.id,l.contextValue="recording",l.description=`${s.action_count} actions \xB7 ${new Date(s.created_at).toLocaleDateString()}`,l.tooltip=`URL: ${s.url}
Tags: ${s.tags||"none"}
Duration: ${s.duration_ms}ms`,l.iconPath=new pe.ThemeIcon("file-media"),l})}},tt=class extends pe.TreeItem{recordingId};var ye=$(require("vscode")),St=class{constructor(t){this.db=t}_onDidChangeTreeData=new ye.EventEmitter;onDidChangeTreeData=this._onDidChangeTreeData.event;refresh(){this._onDidChangeTreeData.fire()}getTreeItem(t){return t}getChildren(){let t=this.db.getRecentExecutions(20);return t.length===0?[new ye.TreeItem("No executions yet.")]:t.map(i=>{let s=this.db.getRecording(i.recording_id),l=i.status==="pass"?"pass":i.status==="fail"?"error":"warning",o=new ye.TreeItem(s?.name||i.recording_id,ye.TreeItemCollapsibleState.None);return o.description=`${i.status} \xB7 ${i.trigger} \xB7 ${new Date(i.started_at).toLocaleString()}`,o.iconPath=new ye.ThemeIcon(`testing-${l}-icon`),o.tooltip=i.error_message?`Failed at step ${i.failure_step}: ${i.error_message}`:`Completed in ${i.finished_at?new Date(i.finished_at).getTime()-new Date(i.started_at).getTime():"?"}ms`,o})}};var be=$(require("vscode")),kt=class{constructor(t){this.db=t}_onDidChangeTreeData=new be.EventEmitter;onDidChangeTreeData=this._onDidChangeTreeData.event;refresh(){this._onDidChangeTreeData.fire()}getTreeItem(t){return t}getChildren(){let t=this.db.getAllSchedules();return t.length===0?[new be.TreeItem("No schedules configured.")]:t.map(i=>{let s=this.db.getRecording(i.recording_id),l=new be.TreeItem(s?.name||i.recording_id,be.TreeItemCollapsibleState.None);return l.description=`${i.cron_expression} \xB7 ${i.enabled?"Active":"Paused"}`,l.iconPath=new be.ThemeIcon(i.enabled?"clock":"debug-pause"),l.tooltip=`Next run: ${i.next_run||"N/A"}
Last run: ${i.last_run||"Never"}`,l})}};var Te=$(require("vscode")),Rt=class{constructor(t,i,s,l){this.context=t;this.recorder=i;this.onRecordingSaved=s;this.onRecordingStarted=l}panel;async show(){if(this.panel){this.panel.reveal(Te.ViewColumn.One);return}this.panel=Te.window.createWebviewPanel("playwrightVcr.recording","PlaywrightVCR \u2014 Record",Te.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[Te.Uri.joinPath(this.context.extensionUri,"out")]}),this.panel.webview.html=this.getHtml(this.panel.webview),this.panel.webview.onDidReceiveMessage(async t=>{switch(t.type){case"startRecording":{let{url:i,browser:s,saveAuth:l}=t.payload;await this.recorder.start(i,s,l),this.onRecordingStarted?.(),this.recorder.onAction(o=>{this.panel?.webview.postMessage({type:"recordedAction",payload:o})});break}case"stopRecording":{let i=await this.recorder.stop();this.panel?.webview.postMessage({type:"recordingStopped",payload:i}),this.onRecordingSaved?.();break}}}),this.panel.onDidDispose(()=>{this.panel=void 0})}getHtml(t){let i=t.asWebviewUri(Te.Uri.joinPath(this.context.extensionUri,"out","webview.js")),s=qs();return`<!DOCTYPE html>
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
</html>`}};function qs(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var Se=$(require("vscode")),At=class{constructor(t,i){this.context=t;this.player=i}panel;async show(t){if(this.panel){this.panel.reveal(Se.ViewColumn.One),t&&this.panel.webview.postMessage({type:"loadRecording",payload:{recordingId:t}});return}this.panel=Se.window.createWebviewPanel("playwrightVcr.playback","PlaywrightVCR \u2014 Playback",Se.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[Se.Uri.joinPath(this.context.extensionUri,"out")]}),this.panel.webview.html=this.getHtml(this.panel.webview),t&&setTimeout(()=>{this.panel?.webview.postMessage({type:"loadRecording",payload:{recordingId:t}})},500),this.panel.webview.onDidReceiveMessage(async i=>{switch(i.type){case"startPlayback":{let{recordingId:s,options:l}=i.payload;try{await this.player.play(s,l,o=>{this.panel?.webview.postMessage({type:"stepCompleted",payload:o})}),this.panel?.webview.postMessage({type:"playbackCompleted"})}catch(o){this.panel?.webview.postMessage({type:"playbackError",payload:{error:o.message}})}break}case"stopPlayback":{await this.player.stop();break}}}),this.panel.onDidDispose(()=>{this.panel=void 0})}getHtml(t){let i=t.asWebviewUri(Se.Uri.joinPath(this.context.extensionUri,"out","webview.js")),s=js();return`<!DOCTYPE html>
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
</html>`}};function js(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var ke=$(require("vscode")),It=class{constructor(t,i){this.context=t;this.db=i}panel;async show(){if(this.panel){this.panel.reveal(ke.ViewColumn.One);return}this.panel=ke.window.createWebviewPanel("playwrightVcr.monitoring","PlaywrightVCR \u2014 Monitoring",ke.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[ke.Uri.joinPath(this.context.extensionUri,"out")]}),this.panel.webview.html=this.getHtml(this.panel.webview),this.panel.webview.onDidReceiveMessage(async t=>{switch(t.type){case"getExecutions":{let i=this.db.getRecentExecutions(50);this.panel?.webview.postMessage({type:"executionsData",payload:i});break}case"getSchedules":{let i=this.db.getAllSchedules();this.panel?.webview.postMessage({type:"schedulesData",payload:i});break}case"addSchedule":{let{recordingId:i,cronExpression:s}=t.payload;this.db.createSchedule(i,s);let l=this.db.getAllSchedules();this.panel?.webview.postMessage({type:"schedulesData",payload:l});break}case"toggleSchedule":{let{scheduleId:i,enabled:s}=t.payload;this.db.updateSchedule(i,{enabled:s});break}case"deleteSchedule":{this.db.deleteSchedule(t.payload.scheduleId);break}}}),this.panel.onDidDispose(()=>{this.panel=void 0})}getHtml(t){let i=t.asWebviewUri(ke.Uri.joinPath(this.context.extensionUri,"out","webview.js")),s=Bs();return`<!DOCTYPE html>
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
</html>`}};function Bs(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var B=$(require("vscode")),Pt=class{constructor(t){this.context=t}panel;async show(){if(this.panel){this.panel.reveal(B.ViewColumn.One),await this.sendCurrentSettings();return}this.panel=B.window.createWebviewPanel("playwrightVcr.settings","PlaywrightVCR \u2014 AI Settings",B.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0,localResourceRoots:[B.Uri.joinPath(this.context.extensionUri,"assets")]});let t=this.panel.webview.asWebviewUri(B.Uri.joinPath(this.context.extensionUri,"assets","logo","Logo128.png")),i=this.context.extension.packageJSON;this.panel.webview.html=this.getHtml(t,i.version??"0.0.0",i.description??""),this.panel.webview.onDidReceiveMessage(async s=>{await this.handleMessage(s)}),this.panel.onDidDispose(()=>{this.panel=void 0}),setTimeout(()=>this.sendCurrentSettings(),200)}async sendCurrentSettings(){let t=B.workspace.getConfiguration("playwrightVcr"),i=t.get("ai.provider","openai"),s=!!await this.context.secrets.get("playwrightVcr.apiKey.openai"),l=!!await this.context.secrets.get("playwrightVcr.apiKey.anthropic");this.panel?.webview.postMessage({type:"settingsLoaded",payload:{selfHealingEnabled:t.get("selfHealing.enabled",!0),embeddingThreshold:t.get("selfHealing.embeddingThreshold",.85),llmEnabled:t.get("selfHealing.llmEnabled",!1),provider:i,model:t.get("ai.model","gpt-4o-mini"),ollamaUrl:t.get("ai.ollamaUrl","http://localhost:11434"),hasOpenAIKey:s,hasAnthropicKey:l}})}async handleMessage(t){switch(t.type){case"getSettings":await this.sendCurrentSettings();break;case"updateSetting":{let{key:i,value:s}=t.payload;await B.workspace.getConfiguration("playwrightVcr").update(i,s,B.ConfigurationTarget.Global),this.panel?.webview.postMessage({type:"settingSaved",payload:{key:i}});break}case"setApiKey":{let{provider:i,apiKey:s}=t.payload;s?(await this.context.secrets.store(`playwrightVcr.apiKey.${i}`,s),B.window.showInformationMessage(`${i} API key saved securely.`)):(await this.context.secrets.delete(`playwrightVcr.apiKey.${i}`),B.window.showInformationMessage(`${i} API key removed.`)),await this.sendCurrentSettings();break}case"testConnection":{let{provider:i}=t.payload,s=await this.testProviderConnection(i);this.panel?.webview.postMessage({type:"connectionTestResult",payload:s});break}case"openRepo":{let i=B.Uri.parse("https://github.com/djtrustgod/Playwright-GUI-Recorder-Playback");await B.env.openExternal(i);break}case"openAnthropicConsole":{let i=B.Uri.parse("https://console.anthropic.com/settings/keys");await B.env.openExternal(i),setTimeout(()=>{this.panel?.webview.postMessage({type:"focusAnthropicKey"})},500);break}}}async testProviderConnection(t){let i=B.workspace.getConfiguration("playwrightVcr"),s=i.get("ai.model","gpt-4o-mini");if(t==="ollama"){let o=i.get("ai.ollamaUrl","http://localhost:11434");try{let p=await fetch(`${o}/api/tags`);return p.ok?{ok:!0,message:`Connected. Available models: ${((await p.json()).models??[]).map(_=>_.name).join(", ")||"(none)"}`}:{ok:!1,message:`Ollama returned status ${p.status}`}}catch{return{ok:!1,message:`Cannot reach Ollama at ${o}`}}}let l=await this.context.secrets.get(`playwrightVcr.apiKey.${t}`);if(!l)return{ok:!1,message:`No API key stored for ${t}. Enter one above.`};try{if(t==="openai"){let o=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${l}`}});return o.ok?{ok:!0,message:`Connected to OpenAI. Model: ${s}`}:o.status===401?{ok:!1,message:"Invalid OpenAI API key."}:{ok:!1,message:`OpenAI returned status ${o.status}`}}if(t==="anthropic"){let o=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":l,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:s||"claude-3-haiku-20240307",max_tokens:1,messages:[{role:"user",content:"Hi"}]})});if(o.ok)return{ok:!0,message:`Connected to Anthropic. Model: ${s}`};if(o.status===401)return{ok:!1,message:"Invalid Anthropic API key. Check that the key is correct and active."};if(o.status===403)return{ok:!1,message:"Anthropic API key lacks permissions. Check your account settings."};if(o.status===429)return{ok:!0,message:`Connected to Anthropic (rate limited). Model: ${s}`};if(o.status===400||o.status===404){let f=(await o.json().catch(()=>({})))?.error?.message||`Anthropic returned status ${o.status}`;return f.toLowerCase().includes("model")?{ok:!0,message:`Anthropic key is valid, but model "${s}" may not be available. ${f}`}:{ok:!1,message:f}}return{ok:!1,message:`Anthropic returned status ${o.status}`}}return{ok:!1,message:`Unknown provider: ${t}`}}catch(o){return{ok:!1,message:`Connection failed: ${o.message}`}}}getHtml(t,i,s){let l=Vs();return`<!DOCTYPE html>
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
</html>`}};function Vs(){let c="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let i=0;i<32;i++)c+=t.charAt(Math.floor(Math.random()*t.length));return c}var Fn=$(Un()),Ve=$(require("path")),me=$(require("fs"));function Hs(c,t){let i={};for(let s=0;s<c.length;s++)i[c[s]]=t[s];return i}function Be(c,t,i){let s=c.prepare(t);i&&s.bind(i);let l=[];for(;s.step();)l.push(Hs(s.getColumnNames(),s.get()));return s.free(),l}function $t(c,t,i){let s=Be(c,t,i);return s.length>0?s[0]:null}var Mt=class c{db;dbPath;ready;persistTimer=null;dirty=!1;static PERSIST_DEBOUNCE_MS=500;constructor(t){me.existsSync(t)||me.mkdirSync(t,{recursive:!0}),this.dbPath=Ve.join(t,"playwright-vcr.db"),this.ready=this.initialize()}async initialize(){let t=await(0,Fn.default)({locateFile:i=>{let s=Ve.join(__dirname,i);if(me.existsSync(s))return s;try{let l=Ve.dirname(require.resolve("sql.js/dist/sql-wasm.js"));return Ve.join(l,i)}catch{return s}}});if(me.existsSync(this.dbPath)){let i=me.readFileSync(this.dbPath);this.db=new t.Database(i)}else this.db=new t.Database;this.createTables(),this.persistNow()}async waitReady(){await this.ready}persistNow(){this.persistTimer&&(clearTimeout(this.persistTimer),this.persistTimer=null);let t=this.db.export();me.writeFileSync(this.dbPath,Buffer.from(t)),this.dirty=!1}persist(){this.dirty=!0,!this.persistTimer&&(this.persistTimer=setTimeout(()=>{this.persistTimer=null,this.dirty&&this.persistNow()},c.PERSIST_DEBOUNCE_MS))}createTables(){this.db.run(`
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
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[t.id,t.name,t.url,t.created_at,t.updated_at,t.tags,t.description,t.action_count,t.duration_ms,t.auth_state_path]),this.persist()}getRecording(t){return $t(this.db,"SELECT * FROM recordings WHERE id = ?",[t])}getAllRecordings(){return Be(this.db,"SELECT * FROM recordings ORDER BY created_at DESC")}updateRecording(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>`${p} = ?`).join(", "),o=s.map(p=>i[p]);this.db.run(`UPDATE recordings SET ${l} WHERE id = ?`,[...o,t]),this.persist()}deleteRecording(t){this.db.run("DELETE FROM actions WHERE recording_id = ?",[t]),this.db.run("DELETE FROM executions WHERE recording_id = ?",[t]),this.db.run("DELETE FROM healed_selectors WHERE recording_id = ?",[t]),this.db.run("DELETE FROM schedules WHERE recording_id = ?",[t]),this.db.run("DELETE FROM jobs WHERE recording_id = ?",[t]),this.db.run("DELETE FROM recordings WHERE id = ?",[t]),this.persist()}createAction(t){this.db.run(`INSERT INTO actions (id, recording_id, step_index, action_type, url, locators, screenshot_path, timestamp_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,[t.id,t.recording_id,t.step_index,t.action_type,t.url,t.locators,t.screenshot_path,t.timestamp_ms]),this.persist()}getActions(t){return Be(this.db,"SELECT * FROM actions WHERE recording_id = ? ORDER BY step_index",[t])}createExecution(t){let i=crypto.randomUUID();return this.db.run(`INSERT INTO executions (id, recording_id, started_at, status, trigger_type)
       VALUES (?, ?, ?, ?, ?)`,[i,t.recording_id,t.started_at,t.status,t.trigger]),this.persist(),i}updateExecution(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>`${p} = ?`).join(", "),o=s.map(p=>i[p]);this.db.run(`UPDATE executions SET ${l} WHERE id = ?`,[...o,t]),this.persist()}getRecentExecutions(t){return Be(this.db,"SELECT * FROM executions ORDER BY started_at DESC LIMIT ?",[t])}getHealedSelector(t,i){return $t(this.db,"SELECT * FROM healed_selectors WHERE recording_id = ? AND step_index = ? ORDER BY success_count DESC LIMIT 1",[t,i])}createHealedSelector(t){let i=crypto.randomUUID();this.db.run(`INSERT INTO healed_selectors (id, recording_id, step_index, original_locator, healed_locator, strategy_used, healed_at, success_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,[i,t.recording_id,t.step_index,t.original_locator,t.healed_locator,t.strategy_used,new Date().toISOString()]),this.persist()}incrementHealedSelectorSuccess(t){this.db.run("UPDATE healed_selectors SET success_count = success_count + 1 WHERE id = ?",[t]),this.persist()}getAllSchedules(){return Be(this.db,"SELECT * FROM schedules ORDER BY recording_id").map(t=>({...t,enabled:!!t.enabled}))}getEnabledSchedules(){return Be(this.db,"SELECT * FROM schedules WHERE enabled = 1").map(t=>({...t,enabled:!0}))}createSchedule(t,i){let s=crypto.randomUUID();return this.db.run("INSERT INTO schedules (id, recording_id, cron_expression, enabled) VALUES (?, ?, ?, 1)",[s,t,i]),this.persist(),s}updateSchedule(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>p==="enabled"?"enabled = ?":`${p} = ?`).join(", "),o=s.map(p=>p==="enabled"?i.enabled?1:0:i[p]);this.db.run(`UPDATE schedules SET ${l} WHERE id = ?`,[...o,t]),this.persist()}deleteSchedule(t){this.db.run("DELETE FROM schedules WHERE id = ?",[t]),this.persist()}createJob(t,i=3){let s=crypto.randomUUID();return this.db.run("INSERT INTO jobs (id, recording_id, status, created_at, attempts, max_attempts) VALUES (?, ?, 'queued', ?, 0, ?)",[s,t,new Date().toISOString(),i]),this.persist(),s}getNextQueuedJob(){return $t(this.db,"SELECT * FROM jobs WHERE status = 'queued' ORDER BY created_at ASC LIMIT 1")}updateJob(t,i){let s=Object.keys(i).filter(p=>p!=="id");if(s.length===0)return;let l=s.map(p=>`${p} = ?`).join(", "),o=s.map(p=>i[p]);this.db.run(`UPDATE jobs SET ${l} WHERE id = ?`,[...o,t]),this.persist()}getRunningJobCount(){let t=$t(this.db,"SELECT COUNT(*) FROM jobs WHERE status = 'running'");return t?t["COUNT(*)"]:0}close(){this.persistNow(),this.db.close()}};var G=$(require("fs/promises")),le=$(require("path")),Ct=class{constructor(t){this.storagePath=t;this.recordingsDir=le.join(t,"recordings"),this.modelsDir=le.join(t,"models")}recordingsDir;modelsDir;async ensureDirectories(){await G.mkdir(this.recordingsDir,{recursive:!0}),await G.mkdir(this.modelsDir,{recursive:!0})}getRecordingDir(t){return le.join(this.recordingsDir,t)}async ensureRecordingDir(t){let i=this.getRecordingDir(t);return await G.mkdir(i,{recursive:!0}),i}getTracePath(t){return le.join(this.getRecordingDir(t),"trace.zip")}getPlaybackTracePath(t,i){return le.join(this.getRecordingDir(t),`playback-${i}.zip`)}getStepScreenshotPath(t,i){return le.join(this.getRecordingDir(t),`step-${i}.png`)}async saveAuthState(t,i){let s=await this.ensureRecordingDir(t),l=le.join(s,"auth-state.json");return await G.writeFile(l,JSON.stringify(i,null,2),"utf-8"),l}async loadAuthState(t){let i=le.join(this.getRecordingDir(t),"auth-state.json");try{let s=await G.readFile(i,"utf-8");return JSON.parse(s)}catch{return null}}async saveActionsJson(t,i){let s=await this.ensureRecordingDir(t),l=le.join(s,"actions.json");await G.writeFile(l,JSON.stringify(i,null,2),"utf-8")}async loadActionsJson(t){let i=le.join(this.getRecordingDir(t),"actions.json");try{let s=await G.readFile(i,"utf-8");return JSON.parse(s)}catch{return null}}async deleteRecordingFiles(t){let i=this.getRecordingDir(t);try{await G.rm(i,{recursive:!0,force:!0})}catch{}}getModelsDir(){return this.modelsDir}async fileExists(t){try{return await G.access(t),!0}catch{return!1}}async getScreenshots(t){let i=this.getRecordingDir(t);try{return(await G.readdir(i)).filter(l=>l.startsWith("step-")&&l.endsWith(".png")).sort((l,o)=>{let p=parseInt(l.replace("step-","").replace(".png","")),f=parseInt(o.replace("step-","").replace(".png",""));return p-f}).map(l=>le.join(i,l))}catch{return[]}}};var qn=$(require("crypto")),Ut=new Uint8Array(256),Ot=Ut.length;function Rr(){return Ot>Ut.length-16&&(qn.default.randomFillSync(Ut),Ot=0),Ut.slice(Ot,Ot+=16)}var W=[];for(let c=0;c<256;++c)W.push((c+256).toString(16).slice(1));function jn(c,t=0){return W[c[t+0]]+W[c[t+1]]+W[c[t+2]]+W[c[t+3]]+"-"+W[c[t+4]]+W[c[t+5]]+"-"+W[c[t+6]]+W[c[t+7]]+"-"+W[c[t+8]]+W[c[t+9]]+"-"+W[c[t+10]]+W[c[t+11]]+W[c[t+12]]+W[c[t+13]]+W[c[t+14]]+W[c[t+15]]}var Bn=$(require("crypto")),Ar={randomUUID:Bn.default.randomUUID};function Ks(c,t,i){if(Ar.randomUUID&&!t&&!c)return Ar.randomUUID();c=c||{};let s=c.random||(c.rng||Rr)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,t){i=i||0;for(let l=0;l<16;++l)t[i+l]=s[l];return t}return jn(s)}var Ft=Ks;var Ir=$(require("vscode"));var qt=class{MAX_DEPTH=8;MAX_ELEMENTS=200;MAX_TEXT_LENGTH=80;MAX_ATTR_LENGTH=60;async simplify(t){let i=await t.evaluate(({maxDepth:s,maxElements:l,maxTextLen:o,maxAttrLen:p})=>{let f=new Set(["script","style","noscript","svg","path","circle","rect","line","polygon","polyline","ellipse","g","defs","clippath","lineargradient","radialgradient","stop","symbol","use","mask","iframe","object","embed","applet","meta","link","base"]),b=new Set(["id","class","role","aria-label","aria-labelledby","aria-describedby","aria-expanded","aria-selected","aria-checked","data-testid","data-test","name","type","href","placeholder","value","title","alt","for","action","method"]),_=0;function k(P,L){if(_>=l)return"";if(L>s)return"...";if(P.nodeType===Node.TEXT_NODE){let C=(P.textContent||"").trim();return C?C.substring(0,o):""}if(P.nodeType!==Node.ELEMENT_NODE)return"";let Y=P,M=Y.tagName.toLowerCase();if(f.has(M))return"";let A=window.getComputedStyle(Y);if(A.display==="none"||A.visibility==="hidden")return"";_++;let w="";for(let C of b){let J=Y.getAttribute(C);if(J!==null&&J!==""){let se=J.substring(0,p);w+=` ${C}="${se}"`}}if(["br","hr","img","input"].includes(M))return`<${M}${w}/>`;let I=[];for(let C of Array.from(Y.childNodes)){let J=k(C,L+1);J&&I.push(J)}let O=I.join("");return!O&&!w?"":`<${M}${w}>${O}</${M}>`}return k(document.body,0)},{maxDepth:this.MAX_DEPTH,maxElements:this.MAX_ELEMENTS,maxTextLen:this.MAX_TEXT_LENGTH,maxAttrLen:this.MAX_ATTR_LENGTH});return i.length>16e3?i.substring(0,16e3)+`
<!-- truncated -->`:i}};var jt=class{constructor(t){this.secrets=t}domSimplifier=new qt;async repairSelector(t,i){let s=Ir.workspace.getConfiguration("playwrightVcr"),l=s.get("ai.provider","openai"),o=s.get("ai.model","gpt-4o-mini"),p=await this.secrets?.get(`playwrightVcr.apiKey.${l}`)??"";if(!p&&l!=="ollama")return console.warn('LLM repair: No API key configured. Use "PlaywrightVCR: Set AI Provider API Key" command.'),null;let f=await this.domSimplifier.simplify(t),b=this.buildPrompt(i,f),_=null;switch(l){case"openai":_=await this.callOpenAI(p,o,b);break;case"anthropic":_=await this.callAnthropic(p,o,b);break;case"ollama":_=await this.callOllama(o,b);break;default:return console.warn(`Unknown LLM provider: ${l}`),null}return _?this.extractSelector(_):null}buildPrompt(t,i){let s=[];if(t.fingerprint){let o=t.fingerprint;s.push(`Tag: ${o.tag}`),o.id&&s.push(`ID: ${o.id}`),o.testId&&s.push(`Test ID: ${o.testId}`),o.ariaRole&&s.push(`ARIA Role: ${o.ariaRole}`),o.ariaLabel&&s.push(`ARIA Label: ${o.ariaLabel}`),o.text&&s.push(`Text: ${o.text.substring(0,100)}`),o.placeholder&&s.push(`Placeholder: ${o.placeholder}`),o.classes.length&&s.push(`Classes: ${o.classes.join(", ")}`),s.push(`Position: (${Math.round(o.boundingRect.x)}, ${Math.round(o.boundingRect.y)})`)}let l=[];return t.testId&&l.push(`data-testid="${t.testId}"`),t.role&&l.push(`role="${t.role.role}" name="${t.role.name}"`),t.label&&l.push(`label="${t.label}"`),t.text&&l.push(`text="${t.text}"`),t.css&&l.push(`css="${t.css}"`),t.xpath&&l.push(`xpath="${t.xpath}"`),`You are a Playwright selector repair tool. An automated test cannot find an element on a web page.

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

If you cannot find a matching element, respond with: NONE`}async callOpenAI(t,i,s){try{let l=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({model:i,messages:[{role:"system",content:"You are a Playwright selector repair assistant. Return only the selector string."},{role:"user",content:s}],max_tokens:200,temperature:0})});return l.ok?(await l.json()).choices?.[0]?.message?.content?.trim()||null:(console.error(`OpenAI API error: ${l.status}`),null)}catch(l){return console.error("OpenAI API call failed:",l),null}}async callAnthropic(t,i,s){try{let l=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":t,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:i,max_tokens:200,messages:[{role:"user",content:s}]})});return l.ok?(await l.json()).content?.[0]?.text?.trim()||null:(console.error(`Anthropic API error: ${l.status}`),null)}catch(l){return console.error("Anthropic API call failed:",l),null}}async callOllama(t,i){let l=Ir.workspace.getConfiguration("playwrightVcr").get("ai.ollamaUrl","http://localhost:11434");try{let o=await fetch(`${l}/api/generate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,prompt:i,stream:!1,options:{temperature:0}})});return o.ok?(await o.json()).response?.trim()||null:(console.error(`Ollama API error: ${o.status}`),null)}catch(o){return console.error("Ollama API call failed:",o),null}}extractSelector(t){let i=t.trim();if(i==="NONE"||i.toLowerCase().includes("cannot find"))return null;let s=i.replace(/^```[a-z]*\n?/i,"").replace(/\n?```$/i,"").trim();return(s.startsWith('"')&&s.endsWith('"')||s.startsWith("'")&&s.endsWith("'"))&&(s=s.slice(1,-1)),s.length===0||s.length>500?null:s}};var Bt=class{pipeline=null;initialized=!1;async initialize(){if(!this.initialized)try{let{pipeline:t}=await import("@huggingface/transformers");this.pipeline=await t("feature-extraction","Xenova/all-MiniLM-L6-v2",{cache_dir:void 0}),this.initialized=!0}catch(t){throw console.error("Failed to initialize embedding model:",t),new Error("Embedding model initialization failed. Install @huggingface/transformers or disable embedding-based self-healing.")}}async findMostSimilar(t,i,s){if(!this.pipeline)throw new Error("Embedding model not initialized. Call initialize() first.");let l=this.fingerprintToText(i),o=await this.embed(l),p=await t.evaluate(()=>{let k=["a","button","input","select","textarea","label","summary","details"],P=["button","link","textbox","checkbox","radio","combobox","tab","menuitem"],L=[],Y=document.querySelectorAll("*"),M=0;return Y.forEach(A=>{if(!(A instanceof HTMLElement))return;let w=A.getBoundingClientRect();if(w.width===0||w.height===0||window.getComputedStyle(A).visibility==="hidden")return;let I=A.tagName.toLowerCase(),O=A.getAttribute("role");!(k.includes(I)||O&&P.includes(O)||A.onclick!==null||A.getAttribute("tabindex")!==null)&&!A.id&&!A.getAttribute("data-testid")||L.push({index:M++,tag:I,id:A.id||null,classes:Array.from(A.classList).slice(0,5),text:(A.textContent||"").trim().substring(0,100),ariaLabel:A.getAttribute("aria-label"),ariaRole:O,testId:A.getAttribute("data-testid"),placeholder:A.placeholder||null,name:A.getAttribute("name"),type:A.getAttribute("type")})}),L});if(p.length===0)return null;let f=null,b=-1,_=32;for(let k=0;k<p.length;k+=_){let P=p.slice(k,k+_),L=P.map(M=>this.candidateToText(M)),Y=await Promise.all(L.map(M=>this.embed(M)));for(let M=0;M<P.length;M++){let A=this.cosineSimilarity(o,Y[M]);if(A>b&&A>=s){b=A;let w=P[M],I;w.testId?I=t.getByTestId(w.testId):w.id?I=t.locator(`#${w.id}`):w.ariaRole&&w.text?I=t.getByRole(w.ariaRole,{name:w.text.substring(0,50)}):w.text?I=t.getByText(w.text.substring(0,50)):I=t.locator(`${w.tag}`).nth(w.index),f={locator:I,similarity:A}}}}return f}fingerprintToText(t){return[`tag:${t.tag}`,t.id?`id:${t.id}`:"",t.testId?`testid:${t.testId}`:"",t.ariaRole?`role:${t.ariaRole}`:"",t.ariaLabel?`label:${t.ariaLabel}`:"",t.text?`text:${t.text.substring(0,100)}`:"",t.placeholder?`placeholder:${t.placeholder}`:"",t.name?`name:${t.name}`:"",t.type?`type:${t.type}`:"",t.classes.length?`class:${t.classes.join(" ")}`:""].filter(Boolean).join(" ")}candidateToText(t){return[`tag:${t.tag}`,t.id?`id:${t.id}`:"",t.testId?`testid:${t.testId}`:"",t.ariaRole?`role:${t.ariaRole}`:"",t.ariaLabel?`label:${t.ariaLabel}`:"",t.text?`text:${t.text}`:"",t.placeholder?`placeholder:${t.placeholder}`:"",t.name?`name:${t.name}`:"",t.type?`type:${t.type}`:"",t.classes.length?`class:${t.classes.join(" ")}`:""].filter(Boolean).join(" ")}async embed(t){let i=await this.pipeline(t,{pooling:"mean",normalize:!0});return Array.from(i.data)}cosineSimilarity(t,i){let s=0,l=0,o=0;for(let p=0;p<t.length;p++)s+=t[p]*i[p],l+=t[p]*t[p],o+=i[p]*i[p];return s/(Math.sqrt(l)*Math.sqrt(o))}};function Vn(c){let t=c.fingerprint;return t?{testId:t.testId,role:t.ariaRole?{role:t.ariaRole,name:t.ariaLabel||t.innerText?.substring(0,50)||""}:null,label:t.labels?.[0]||null,text:t.innerText?.substring(0,100)||null,placeholder:t.placeholder,css:c.cssSelector||null,xpath:c.xpath||null,fingerprint:t}:{testId:null,role:null,label:null,text:null,placeholder:null,css:c.cssSelector||null,xpath:c.xpath||null,fingerprint:null}}var Vt=class{constructor(t,i,s){this.db=t;this.config=i;this.secrets=s}embeddings=null;llmRepair=null;async resolve(t,i,s,l){let o=this.db.getHealedSelector(s,l);if(o)try{let f=t.locator(o.healed_locator);if(await f.count()===1)return this.db.incrementHealedSelectorSuccess(o.id),{locator:f,strategy:`cached:${o.strategy_used}`,healed:!0}}catch{}let p=await this.tryDirectLocators(t,i);if(p)return p;if(!this.config.enabled)throw new Error(`No element found for step ${l}. Self-healing is disabled.`);if(i.fingerprint){let f=await this.tryEmbeddingSimilarity(t,i.fingerprint);if(f)return this.cacheHealedSelector(s,l,i,f),f}if(this.config.llmEnabled&&i.fingerprint){let f=await this.tryLlmRepair(t,i);if(f)return this.cacheHealedSelector(s,l,i,f),f}throw new Error(`Self-healing failed: no element found for step ${l} after all tiers.`)}async tryDirectLocators(t,i){let s=[{name:"testId",getLocator:()=>i.testId?t.getByTestId(i.testId):null},{name:"role",getLocator:()=>i.role?t.getByRole(i.role.role,{name:i.role.name}):null},{name:"label",getLocator:()=>i.label?t.getByLabel(i.label):null},{name:"text",getLocator:()=>i.text?t.getByText(i.text,{exact:!1}):null},{name:"placeholder",getLocator:()=>i.placeholder?t.getByPlaceholder(i.placeholder):null},{name:"css",getLocator:()=>i.css?t.locator(i.css):null},{name:"xpath",getLocator:()=>i.xpath?t.locator(`xpath=${i.xpath}`):null}];for(let{name:l,getLocator:o}of s)try{let p=o();if(!p)continue;let f=await p.count();if(f===1)return{locator:p,strategy:l,healed:!1};if(f>1&&i.fingerprint)return{locator:p.first(),strategy:`${l}:first`,healed:!1}}catch{continue}return null}async tryEmbeddingSimilarity(t,i){try{this.embeddings||(this.embeddings=new Bt,await this.embeddings.initialize());let s=await this.embeddings.findMostSimilar(t,i,this.config.embeddingThreshold);if(s)return{locator:s.locator,strategy:`embedding:${s.similarity.toFixed(3)}`,healed:!0}}catch{}return null}async tryLlmRepair(t,i){try{this.llmRepair||(this.llmRepair=new jt(this.secrets));let s=await this.llmRepair.repairSelector(t,i);if(s){let l=t.locator(s);if(await l.count()>=1)return{locator:l.first(),strategy:"llm",healed:!0}}}catch{}return null}cacheHealedSelector(t,i,s,l){let o=s.testId||s.css||s.xpath||"unknown";this.db.createHealedSelector({recording_id:t,step_index:i,original_locator:o,healed_locator:`[healed:${l.strategy}]`,strategy_used:l.strategy})}};var Js=`
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
`,Ht=class{constructor(t,i){this.db=t;this.fileManager=i}browser=null;context=null;page=null;actions=[];currentRecordingId=null;actionCallbacks=[];startTime=0;isRecording=!1;onAction(t){this.actionCallbacks.push(t)}emitAction(t){for(let i of this.actionCallbacks)i(t)}async start(t,i="chromium",s=!1){if(this.isRecording)throw new Error("Already recording. Stop the current recording first.");let l=Ft();this.currentRecordingId=l,this.actions=[],this.startTime=Date.now(),this.isRecording=!0;let o=await import("playwright"),f={chromium:o.chromium,firefox:o.firefox,webkit:o.webkit}[i]||o.chromium;return this.browser=await f.launch({headless:!1,slowMo:0}),this.context=await this.browser.newContext({viewport:{width:1280,height:720},recordVideo:void 0}),await this.context.tracing.start({screenshots:!0,snapshots:!0}),this.page=await this.context.newPage(),await this.page.exposeFunction("__rpaEvent",b=>{try{let _=JSON.parse(b);this.actions.push(_),this.emitAction(_)}catch{}}),await this.context.addInitScript(Js),await this.page.goto(t,{waitUntil:"domcontentloaded"}),this.db.createRecording({id:l,name:`Recording ${new Date().toLocaleString()}`,url:t,created_at:new Date().toISOString(),updated_at:new Date().toISOString(),tags:"",description:"",action_count:0,duration_ms:0,auth_state_path:null}),l}async stop(){if(!this.isRecording||!this.currentRecordingId)return null;let t=this.currentRecordingId,i=Date.now()-this.startTime,s=null;if(this.context)try{let o=await this.context.storageState();s=await this.fileManager.saveAuthState(t,o)}catch{}if(this.context){let o=this.fileManager.getTracePath(t);await this.context.tracing.stop({path:o})}for(let o=0;o<this.actions.length;o++){let p=this.actions[o],f=Vn(p);this.db.createAction({id:Ft(),recording_id:t,step_index:o,action_type:p.type,url:p.url,locators:JSON.stringify(f),screenshot_path:null,timestamp_ms:p.timestamp-this.startTime})}await this.fileManager.saveActionsJson(t,this.actions),this.db.updateRecording(t,{action_count:this.actions.length,duration_ms:i,auth_state_path:s,updated_at:new Date().toISOString()}),await this.page?.close().catch(()=>{}),await this.context?.close().catch(()=>{}),await this.browser?.close().catch(()=>{}),this.browser=null,this.context=null,this.page=null,this.isRecording=!1,this.actionCallbacks=[];let l=this.db.getRecording(t);return this.currentRecordingId=null,l}dispose(){this.page?.close().catch(()=>{}),this.context?.close().catch(()=>{}),this.browser?.close().catch(()=>{}),this.isRecording=!1}};var Pr=$(require("vscode"));var Kt=class{constructor(t,i,s={}){this.db=t;this.fileManager=i;this.deps=s}browser=null;context=null;page=null;isPlaying=!1;shouldStop=!1;async play(t,i={},s){if(this.isPlaying)throw new Error("Already playing. Stop the current playback first.");let l=this.db.getRecording(t);if(!l)throw new Error(`Recording ${t} not found.`);let o=this.db.getActions(t);if(o.length===0)throw new Error("Recording has no actions.");this.isPlaying=!0,this.shouldStop=!1;let p=Pr.workspace.getConfiguration("playwrightVcr"),f=i.headless??p.get("headless",!1),b=i.slowMo??p.get("slowMo",0),_=i.browser??p.get("defaultBrowser","chromium"),k=new Vt(this.db,{enabled:p.get("selfHealing.enabled",!0),embeddingThreshold:p.get("selfHealing.embeddingThreshold",.85),llmEnabled:p.get("selfHealing.llmEnabled",!1)},this.deps.secrets),P=await import("playwright"),Y={chromium:P.chromium,firefox:P.firefox,webkit:P.webkit}[_]||P.chromium;if(this.browser=await Y.launch({headless:f,slowMo:b}),this.context=await this.browser.newContext({viewport:{width:1280,height:720}}),l.auth_state_path)try{let w=await this.fileManager.loadAuthState(t);w&&(this.context=await this.browser.newContext({viewport:{width:1280,height:720},storageState:w}))}catch{}this.page=await this.context.newPage(),await this.registerOverlayHandlers(this.page),await this.context.tracing.start({screenshots:!0,snapshots:!0});let M=this.db.createExecution({recording_id:t,started_at:new Date().toISOString(),status:"running",trigger:"manual"}),A=[];try{await this.page.goto(l.url,{waitUntil:"domcontentloaded"});for(let w=0;w<o.length&&!this.shouldStop;w++){let I=o[w],O=Date.now();try{let C=await this.executeAction(this.page,I,k,t),J={stepIndex:w,actionType:I.action_type,status:C.healed?"healed":"success",strategy:C.strategy,durationMs:Date.now()-O};try{let se=this.fileManager.getStepScreenshotPath(t,w);await this.page.screenshot({path:se}),J.screenshotPath=se}catch{}A.push(J),s?.(J)}catch(C){let J={stepIndex:w,actionType:I.action_type,status:"failed",strategy:"none",durationMs:Date.now()-O,error:C.message};try{let se=this.fileManager.getStepScreenshotPath(t,w);await this.page.screenshot({path:se}),J.screenshotPath=se}catch{}throw A.push(J),s?.(J),this.db.updateExecution(M,{finished_at:new Date().toISOString(),status:"fail",failure_step:w,error_message:C.message}),C}b>0&&w<o.length-1&&await new Promise(C=>setTimeout(C,b))}this.db.updateExecution(M,{finished_at:new Date().toISOString(),status:"pass"})}finally{try{let w=this.fileManager.getPlaybackTracePath(t,M);await this.context.tracing.stop({path:w})}catch{}await this.cleanup()}return A}async executeAction(t,i,s,l){let o=JSON.parse(i.locators);switch(i.action_type){case"navigation":return await t.goto(i.url,{waitUntil:"domcontentloaded"}),{healed:!1,strategy:"navigation"};case"scroll":return await t.evaluate(({x:p,y:f})=>window.scrollTo(p,f),{x:0,y:0}),{healed:!1,strategy:"scroll"};case"click":case"dblclick":{let p=await s.resolve(t,o,l,i.step_index);return i.action_type==="dblclick"?await p.locator.dblclick({timeout:1e4}):await p.locator.click({timeout:1e4}),{healed:p.healed,strategy:p.strategy}}case"input":case"change":{let p=await s.resolve(t,o,l,i.step_index),f=o.fingerprint?.value||"";return await p.locator.fill(f,{timeout:1e4}),{healed:p.healed,strategy:p.strategy}}case"keydown":{let p=o.fingerprint?.value||"Enter";return await t.keyboard.press(p),{healed:!1,strategy:"keyboard"}}case"select":{let p=await s.resolve(t,o,l,i.step_index),f=o.fingerprint?.value||"";return await p.locator.selectOption(f,{timeout:1e4}),{healed:p.healed,strategy:p.strategy}}case"submit":{let p=await s.resolve(t,o,l,i.step_index);return await p.locator.press("Enter",{timeout:1e4}),{healed:p.healed,strategy:p.strategy}}default:return{healed:!1,strategy:"skipped"}}}async registerOverlayHandlers(t){let s=Pr.workspace.getConfiguration("playwrightVcr").get("overlayDismissals",[]);for(let l of s)try{await t.addLocatorHandler(t.locator(l.detector),async()=>{try{await t.locator(l.action).click({timeout:5e3})}catch{}})}catch{}}async stop(){this.shouldStop=!0}async cleanup(){await this.page?.close().catch(()=>{}),await this.context?.close().catch(()=>{}),await this.browser?.close().catch(()=>{}),this.page=null,this.context=null,this.browser=null,this.isPlaying=!1,this.shouldStop=!1}dispose(){this.shouldStop=!0,this.cleanup()}};var ve=$(require("vscode")),Xt=$(require("fs/promises")),Jt=class{constructor(t,i){this.db=t;this.fileManager=i}async export(t,i){let s=this.db.getRecording(t);if(!s)throw new Error(`Recording ${t} not found.`);let l=this.db.getActions(t),o=i,p=this.getDefaultFileName(s.name,o),f=await ve.window.showSaveDialog({defaultUri:ve.Uri.file(p),filters:this.getFileFilters(o)});if(!f)return;let b;switch(o){case"TypeScript":b=this.generateTypeScript(s,l);break;case"JavaScript":b=this.generateJavaScript(s,l);break;case"Python":b=this.generatePython(s,l);break;case"Java":b=this.generateJava(s,l);break;case"C#":b=this.generateCSharp(s,l);break;case"JSON":b=this.generateJson(s,l);break;case"GitHub Actions YAML":b=this.generateGitHubActions(s);break;case"HAR":await this.exportTraceZip(t,f.fsPath),ve.window.showInformationMessage(`Trace exported to ${f.fsPath}`);return;default:throw new Error(`Unsupported export format: ${i}`)}await Xt.writeFile(f.fsPath,b,"utf-8"),ve.window.showInformationMessage(`Exported to ${f.fsPath}`);let _=await ve.workspace.openTextDocument(f);await ve.window.showTextDocument(_)}generateTypeScript(t,i){let s=["import { test, expect } from '@playwright/test';","",`test('${this.escapeString(t.name)}', async ({ page }) => {`,`  // Recorded on ${t.created_at} from ${t.url}`,`  await page.goto('${this.escapeString(t.url)}');`,""];for(let l of i){let o=this.generatePlaywrightAction(l,"  ");o&&s.push(o)}return s.push("});",""),s.join(`
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
`}generatePlaywrightAction(t,i){let s=JSON.parse(t.locators),l=this.getBestLocatorCode(s);switch(t.action_type){case"navigation":return`${i}await page.goto('${this.escapeString(t.url)}');`;case"click":return l?`${i}await ${l}.click();`:null;case"dblclick":return l?`${i}await ${l}.dblclick();`:null;case"input":case"change":return l?`${i}await ${l}.fill('${this.escapeString(s.fingerprint?.value||"")}');`:null;case"keydown":return`${i}await page.keyboard.press('${this.escapeString(s.fingerprint?.value||"Enter")}');`;case"select":return l?`${i}await ${l}.selectOption('${this.escapeString(s.fingerprint?.value||"")}');`:null;case"scroll":return`${i}await page.mouse.wheel(0, 300);`;default:return`${i}// Unknown action: ${t.action_type}`}}generatePythonAction(t,i){let s=JSON.parse(t.locators),l=this.getBestPythonLocator(s);switch(t.action_type){case"navigation":return`${i}page.goto("${this.escapeString(t.url)}")`;case"click":return l?`${i}${l}.click()`:null;case"dblclick":return l?`${i}${l}.dblclick()`:null;case"input":case"change":return l?`${i}${l}.fill("${this.escapeString(s.fingerprint?.value||"")}")`:null;case"keydown":return`${i}page.keyboard.press("${this.escapeString(s.fingerprint?.value||"Enter")}")`;default:return`${i}# Unknown action: ${t.action_type}`}}generateJavaAction(t,i){let s=JSON.parse(t.locators);switch(t.action_type){case"navigation":return`${i}page.navigate("${this.escapeString(t.url)}");`;case"click":return s.role?`${i}page.getByRole(AriaRole.${s.role.role.toUpperCase()}, new Page.GetByRoleOptions().setName("${this.escapeString(s.role.name)}")).click();`:s.css?`${i}page.locator("${this.escapeString(s.css)}").click();`:null;default:return`${i}// Unknown action: ${t.action_type}`}}generateCSharpAction(t,i){let s=JSON.parse(t.locators);switch(t.action_type){case"navigation":return`${i}await page.GotoAsync("${this.escapeString(t.url)}");`;case"click":return s.role?`${i}await page.GetByRole(AriaRole.${this.toPascalCase(s.role.role)}, new() { Name = "${this.escapeString(s.role.name)}" }).ClickAsync();`:s.css?`${i}await page.Locator("${this.escapeString(s.css)}").ClickAsync();`:null;default:return`${i}// Unknown action: ${t.action_type}`}}getBestLocatorCode(t){return t.testId?`page.getByTestId('${this.escapeString(t.testId)}')`:t.role?`page.getByRole('${t.role.role}', { name: '${this.escapeString(t.role.name)}' })`:t.label?`page.getByLabel('${this.escapeString(t.label)}')`:t.text?`page.getByText('${this.escapeString(t.text)}')`:t.placeholder?`page.getByPlaceholder('${this.escapeString(t.placeholder)}')`:t.css?`page.locator('${this.escapeString(t.css)}')`:t.xpath?`page.locator('xpath=${this.escapeString(t.xpath)}')`:null}getBestPythonLocator(t){return t.testId?`page.get_by_test_id("${this.escapeString(t.testId)}")`:t.role?`page.get_by_role("${t.role.role}", name="${this.escapeString(t.role.name)}")`:t.label?`page.get_by_label("${this.escapeString(t.label)}")`:t.text?`page.get_by_text("${this.escapeString(t.text)}")`:t.placeholder?`page.get_by_placeholder("${this.escapeString(t.placeholder)}")`:t.css?`page.locator("${this.escapeString(t.css)}")`:null}async exportTraceZip(t,i){let s=this.fileManager.getTracePath(t);await Xt.copyFile(s,i)}escapeString(t){return t.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\n/g,"\\n")}toSnakeCase(t){return t.replace(/[^a-zA-Z0-9]+/g,"_").replace(/([A-Z])/g,"_$1").toLowerCase().replace(/^_/,"").replace(/_+/g,"_")}toPascalCase(t){return t.replace(/[^a-zA-Z0-9]+/g," ").split(" ").map(i=>i.charAt(0).toUpperCase()+i.slice(1).toLowerCase()).join("")}toKebabCase(t){return t.replace(/[^a-zA-Z0-9]+/g,"-").toLowerCase().replace(/^-|-$/g,"")}getDefaultFileName(t,i){return this.toKebabCase(t)+({TypeScript:".spec.ts",JavaScript:".spec.js",Python:"_test.py",Java:"Test.java","C#":"Tests.cs",JSON:".json",HAR:".zip","GitHub Actions YAML":".yml"}[i]||".txt")}getFileFilters(t){return{TypeScript:{TypeScript:["ts"]},JavaScript:{JavaScript:["js"]},Python:{Python:["py"]},Java:{Java:["java"]},"C#":{"C#":["cs"]},JSON:{JSON:["json"]},HAR:{ZIP:["zip"]},"GitHub Actions YAML":{YAML:["yml","yaml"]}}[t]||{All:["*"]}}};var tr=$(Ui()),er=class{constructor(t,i){this.db=t;this.queue=i}tasks=new Map;running=!1;start(){this.running||(this.running=!0,this.loadSchedules())}stop(){this.running=!1;for(let[t,i]of this.tasks)i.stop();this.tasks.clear()}reload(){this.stop(),this.running=!0,this.loadSchedules()}loadSchedules(){let t=this.db.getEnabledSchedules();for(let i of t){if(!tr.validate(i.cron_expression)){console.warn(`Invalid cron expression for schedule ${i.id}: ${i.cron_expression}`);continue}let s=tr.schedule(i.cron_expression,()=>{this.onScheduleTrigger(i)});this.tasks.set(i.id,s)}}onScheduleTrigger(t){console.log(`Schedule ${t.id} triggered for recording ${t.recording_id}`),this.queue.enqueue(t.recording_id),this.db.updateSchedule(t.id,{last_run:new Date().toISOString()})}};var Fi=$(require("vscode")),rr=class{constructor(t){this.db=t}enqueue(t,i){let s=Fi.workspace.getConfiguration("playwrightVcr"),l=i??s.get("orchestration.maxRetries",3);return this.db.createJob(t,l)}dequeue(){return this.db.getNextQueuedJob()}markRunning(t){this.db.updateJob(t,{status:"running",started_at:new Date().toISOString(),attempts:void 0})}markCompleted(t,i){this.db.updateJob(t,{status:"completed",finished_at:new Date().toISOString(),result_json:i?JSON.stringify(i):null})}markFailed(t,i,s,l){return s<l?(this.db.updateJob(t,{status:"queued",finished_at:null,result_json:JSON.stringify({lastError:i})}),!0):(this.db.updateJob(t,{status:"failed",finished_at:new Date().toISOString(),result_json:JSON.stringify({error:i})}),!1)}runningCount(){return this.db.getRunningJobCount()}};var Ie=$(require("vscode")),nr=class{constructor(t,i){this.queue=t;this.player=i}interval=null;running=!1;POLL_INTERVAL_MS=5e3;start(){this.running||(this.running=!0,this.interval=setInterval(()=>{this.tick().catch(t=>{console.error("Executor tick error:",t)})},this.POLL_INTERVAL_MS))}stop(){this.running=!1,this.interval&&(clearInterval(this.interval),this.interval=null)}async tick(){let i=Ie.workspace.getConfiguration("playwrightVcr").get("orchestration.concurrency",1);if(this.queue.runningCount()>=i)return;let s=this.queue.dequeue();s&&await this.executeJob(s)}async executeJob(t){let i=t.attempts+1;this.queue.markRunning(t.id);try{if(i>1){let l=Math.min(1e3*Math.pow(2,i-1),3e4);await new Promise(o=>setTimeout(o,l))}let s=await this.player.play(t.recording_id,{},l=>{console.log(`Job ${t.id} step ${l.stepIndex}: ${l.status}`)});this.queue.markCompleted(t.id,{steps:s.length,passed:s.filter(l=>l.status==="success").length,healed:s.filter(l=>l.status==="healed").length,failed:s.filter(l=>l.status==="failed").length}),Ie.window.showInformationMessage(`PlaywrightVCR: Job completed for recording "${t.recording_id}".`)}catch(s){let l=s.message;this.queue.markFailed(t.id,l,i,t.max_attempts)?console.log(`Job ${t.id} failed (attempt ${i}/${t.max_attempts}), will retry.`):(await Ie.window.showErrorMessage(`PlaywrightVCR: Job failed after ${i} attempts \u2014 ${l}`,"View Details")==="View Details"&&Ie.commands.executeCommand("playwrightVcr.openMonitoringPanel"),await this.sendWebhookNotification(t,l))}}async sendWebhookNotification(t,i){let l=Ie.workspace.getConfiguration("playwrightVcr").get("webhookUrl","");if(l)try{let o=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:"\u{1F534} PlaywrightVCR job failed",recording_id:t.recording_id,job_id:t.id,attempts:t.attempts+1,error:i,timestamp:new Date().toISOString()})});o.ok||console.error(`Webhook notification failed: ${o.status}`)}catch(o){console.error("Webhook notification error:",o)}}};var ne,Je,st,ot,ir,Hr,sr;async function Vo(c){console.log("PlaywrightVCR extension activating..."),ne=new Mt(c.globalStoragePath),await ne.waitReady(),Je=new Ct(c.globalStoragePath),await Je.ensureDirectories(),st=new Ht(ne,Je),ot=new Kt(ne,Je,{secrets:c.secrets});let t=new Jt(ne,Je);Hr=new rr(ne),sr=new nr(Hr,ot),ir=new er(ne,Hr);let i=new Tt(ne),s=new St(ne),l=new kt(ne),o=H.window.createTreeView("playwrightVcr.library",{treeDataProvider:i,showCollapseAll:!0}),p=H.window.createTreeView("playwrightVcr.executions",{treeDataProvider:s}),f=H.window.createTreeView("playwrightVcr.schedules",{treeDataProvider:l}),b=H.window.createStatusBarItem(H.StatusBarAlignment.Left,100);b.text="$(debug-stop) Stop Recording",b.tooltip="Click to stop and save the current recording",b.command="playwrightVcr.stopRecording",b.backgroundColor=new H.ThemeColor("statusBarItem.errorBackground"),c.subscriptions.push(b);let _=()=>b.show(),k=()=>b.hide(),P=new Rt(c,st,()=>{i.refresh(),k()},()=>{_()}),L=new At(c,ot),Y=new It(c,ne),M=new Pt(c),A=[["playwrightVcr.startRecording",async()=>{await P.show()}],["playwrightVcr.stopRecording",async()=>{await st.stop(),i.refresh(),k()}],["playwrightVcr.playRecording",async(...w)=>{let O=w[0]?.recordingId;if(!O){H.window.showWarningMessage("No recording selected.");return}await L.show(O)}],["playwrightVcr.openRecordingPanel",async()=>{await P.show()}],["playwrightVcr.openPlaybackPanel",async()=>{await L.show()}],["playwrightVcr.openMonitoringPanel",async()=>{await Y.show()}],["playwrightVcr.deleteRecording",async(...w)=>{let O=w[0]?.recordingId;if(!O)return;await H.window.showWarningMessage("Delete this recording and all its data?",{modal:!0},"Delete")==="Delete"&&(ne.deleteRecording(O),await Je.deleteRecordingFiles(O),i.refresh(),H.window.showInformationMessage("Recording deleted."))}],["playwrightVcr.exportRecording",async(...w)=>{let O=w[0]?.recordingId;if(!O)return;let C=await H.window.showQuickPick(["TypeScript","JavaScript","Python","Java","C#","JSON","HAR","GitHub Actions YAML"],{placeHolder:"Select export format"});C&&await t.export(O,C)}],["playwrightVcr.refreshLibrary",()=>{i.refresh(),s.refresh(),l.refresh()}],["playwrightVcr.installBrowsers",async()=>{let w=H.window.createTerminal("Playwright Install");w.show(),w.sendText("npx playwright install")}],["playwrightVcr.openSettings",async()=>{await M.show()}],["playwrightVcr.setApiKey",async()=>{let w=await H.window.showQuickPick(["openai","anthropic"],{placeHolder:"Select the AI provider to set the API key for"});if(!w)return;let I=await H.window.showInputBox({prompt:`Enter your ${w} API key`,password:!0,placeHolder:"sk-..."});I!==void 0&&(I===""?(await c.secrets.delete(`playwrightVcr.apiKey.${w}`),H.window.showInformationMessage(`${w} API key removed.`)):(await c.secrets.store(`playwrightVcr.apiKey.${w}`,I),H.window.showInformationMessage(`${w} API key saved securely.`)))}]];for(let[w,I]of A)c.subscriptions.push(H.commands.registerCommand(w,I));ir.start(),sr.start(),c.subscriptions.push(o,p,f,{dispose:()=>st.dispose()},{dispose:()=>ot.dispose()},{dispose:()=>ir.stop()},{dispose:()=>sr.stop()},{dispose:()=>ne.close()}),console.log("PlaywrightVCR extension activated.")}function Ho(){ir?.stop(),sr?.stop(),st?.dispose(),ot?.dispose(),ne?.close()}0&&(module.exports={activate,deactivate});

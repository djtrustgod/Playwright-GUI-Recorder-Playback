"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/sql.js/dist/sql-wasm.js
var require_sql_wasm = __commonJS({
  "node_modules/sql.js/dist/sql-wasm.js"(exports2, module2) {
    var initSqlJsPromise = void 0;
    var initSqlJs2 = function(moduleConfig) {
      if (initSqlJsPromise) {
        return initSqlJsPromise;
      }
      initSqlJsPromise = new Promise(function(resolveModule, reject) {
        var Module = typeof moduleConfig !== "undefined" ? moduleConfig : {};
        var originalOnAbortFunction = Module["onAbort"];
        Module["onAbort"] = function(errorThatCausedAbort) {
          reject(new Error(errorThatCausedAbort));
          if (originalOnAbortFunction) {
            originalOnAbortFunction(errorThatCausedAbort);
          }
        };
        Module["postRun"] = Module["postRun"] || [];
        Module["postRun"].push(function() {
          resolveModule(Module);
        });
        module2 = void 0;
        var k;
        k ||= typeof Module != "undefined" ? Module : {};
        var aa = !!globalThis.window, ba = !!globalThis.WorkerGlobalScope, ca = globalThis.process?.versions?.node && "renderer" != globalThis.process?.type;
        k.onRuntimeInitialized = function() {
          function a(f, l) {
            switch (typeof l) {
              case "boolean":
                dc(f, l ? 1 : 0);
                break;
              case "number":
                ec(f, l);
                break;
              case "string":
                fc(f, l, -1, -1);
                break;
              case "object":
                if (null === l)
                  lb(f);
                else if (null != l.length) {
                  var n = da(l.length);
                  m.set(l, n);
                  gc(f, n, l.length, -1);
                  ea(n);
                } else
                  sa(f, "Wrong API use : tried to return a value of an unknown type (" + l + ").", -1);
                break;
              default:
                lb(f);
            }
          }
          function b(f, l) {
            for (var n = [], p = 0; p < f; p += 1) {
              var u = r(l + 4 * p, "i32"), v = hc(u);
              if (1 === v || 2 === v)
                u = ic(u);
              else if (3 === v)
                u = jc(u);
              else if (4 === v) {
                v = u;
                u = kc(v);
                v = lc(v);
                for (var K = new Uint8Array(u), I = 0; I < u; I += 1)
                  K[I] = m[v + I];
                u = K;
              } else
                u = null;
              n.push(u);
            }
            return n;
          }
          function c(f, l) {
            this.Qa = f;
            this.db = l;
            this.Oa = 1;
            this.lb = [];
          }
          function d(f, l) {
            this.db = l;
            this.eb = fa(f);
            if (null === this.eb)
              throw Error("Unable to allocate memory for the SQL string");
            this.kb = this.eb;
            this.Za = this.qb = null;
          }
          function e(f) {
            this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
            if (null != f) {
              var l = this.filename, n = "/", p = l;
              n && (n = "string" == typeof n ? n : ha(n), p = l ? ia(n + "/" + l) : n);
              l = ja(true, true);
              p = ka(
                p,
                l
              );
              if (f) {
                if ("string" == typeof f) {
                  n = Array(f.length);
                  for (var u = 0, v = f.length; u < v; ++u)
                    n[u] = f.charCodeAt(u);
                  f = n;
                }
                la(p, l | 146);
                n = ma(p, 577);
                na(n, f, 0, f.length, 0);
                oa(n);
                la(p, l);
              }
            }
            this.handleError(q(this.filename, g));
            this.db = r(g, "i32");
            ob(this.db);
            this.fb = {};
            this.Sa = {};
          }
          var g = y(4), h = k.cwrap, q = h("sqlite3_open", "number", ["string", "number"]), w = h("sqlite3_close_v2", "number", ["number"]), t = h("sqlite3_exec", "number", ["number", "string", "number", "number", "number"]), x = h("sqlite3_changes", "number", ["number"]), D = h(
            "sqlite3_prepare_v2",
            "number",
            ["number", "string", "number", "number", "number"]
          ), pb = h("sqlite3_sql", "string", ["number"]), nc = h("sqlite3_normalized_sql", "string", ["number"]), qb = h("sqlite3_prepare_v2", "number", ["number", "number", "number", "number", "number"]), oc = h("sqlite3_bind_text", "number", ["number", "number", "number", "number", "number"]), rb = h("sqlite3_bind_blob", "number", ["number", "number", "number", "number", "number"]), pc = h("sqlite3_bind_double", "number", ["number", "number", "number"]), qc = h("sqlite3_bind_int", "number", [
            "number",
            "number",
            "number"
          ]), rc = h("sqlite3_bind_parameter_index", "number", ["number", "string"]), sc = h("sqlite3_step", "number", ["number"]), tc = h("sqlite3_errmsg", "string", ["number"]), uc = h("sqlite3_column_count", "number", ["number"]), vc = h("sqlite3_data_count", "number", ["number"]), wc = h("sqlite3_column_double", "number", ["number", "number"]), sb = h("sqlite3_column_text", "string", ["number", "number"]), xc = h("sqlite3_column_blob", "number", ["number", "number"]), yc = h("sqlite3_column_bytes", "number", ["number", "number"]), zc = h(
            "sqlite3_column_type",
            "number",
            ["number", "number"]
          ), Ac = h("sqlite3_column_name", "string", ["number", "number"]), Bc = h("sqlite3_reset", "number", ["number"]), Cc = h("sqlite3_clear_bindings", "number", ["number"]), Dc = h("sqlite3_finalize", "number", ["number"]), tb = h("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), hc = h("sqlite3_value_type", "number", ["number"]), kc = h("sqlite3_value_bytes", "number", ["number"]), jc = h("sqlite3_value_text", "string", ["number"]), lc = h(
            "sqlite3_value_blob",
            "number",
            ["number"]
          ), ic = h("sqlite3_value_double", "number", ["number"]), ec = h("sqlite3_result_double", "", ["number", "number"]), lb = h("sqlite3_result_null", "", ["number"]), fc = h("sqlite3_result_text", "", ["number", "string", "number", "number"]), gc = h("sqlite3_result_blob", "", ["number", "number", "number", "number"]), dc = h("sqlite3_result_int", "", ["number", "number"]), sa = h("sqlite3_result_error", "", ["number", "string", "number"]), ub = h("sqlite3_aggregate_context", "number", ["number", "number"]), ob = h(
            "RegisterExtensionFunctions",
            "number",
            ["number"]
          ), vb = h("sqlite3_update_hook", "number", ["number", "number", "number"]);
          c.prototype.bind = function(f) {
            if (!this.Qa)
              throw "Statement closed";
            this.reset();
            return Array.isArray(f) ? this.Cb(f) : null != f && "object" === typeof f ? this.Db(f) : true;
          };
          c.prototype.step = function() {
            if (!this.Qa)
              throw "Statement closed";
            this.Oa = 1;
            var f = sc(this.Qa);
            switch (f) {
              case 100:
                return true;
              case 101:
                return false;
              default:
                throw this.db.handleError(f);
            }
          };
          c.prototype.wb = function(f) {
            null == f && (f = this.Oa, this.Oa += 1);
            return wc(this.Qa, f);
          };
          c.prototype.Gb = function(f) {
            null == f && (f = this.Oa, this.Oa += 1);
            f = sb(this.Qa, f);
            if ("function" !== typeof BigInt)
              throw Error("BigInt is not supported");
            return BigInt(f);
          };
          c.prototype.Hb = function(f) {
            null == f && (f = this.Oa, this.Oa += 1);
            return sb(this.Qa, f);
          };
          c.prototype.getBlob = function(f) {
            null == f && (f = this.Oa, this.Oa += 1);
            var l = yc(this.Qa, f);
            f = xc(this.Qa, f);
            for (var n = new Uint8Array(l), p = 0; p < l; p += 1)
              n[p] = m[f + p];
            return n;
          };
          c.prototype.get = function(f, l) {
            l = l || {};
            null != f && this.bind(f) && this.step();
            f = [];
            for (var n = vc(this.Qa), p = 0; p < n; p += 1)
              switch (zc(this.Qa, p)) {
                case 1:
                  var u = l.useBigInt ? this.Gb(p) : this.wb(p);
                  f.push(u);
                  break;
                case 2:
                  f.push(this.wb(p));
                  break;
                case 3:
                  f.push(this.Hb(p));
                  break;
                case 4:
                  f.push(this.getBlob(p));
                  break;
                default:
                  f.push(null);
              }
            return f;
          };
          c.prototype.getColumnNames = function() {
            for (var f = [], l = uc(this.Qa), n = 0; n < l; n += 1)
              f.push(Ac(this.Qa, n));
            return f;
          };
          c.prototype.getAsObject = function(f, l) {
            f = this.get(f, l);
            l = this.getColumnNames();
            for (var n = {}, p = 0; p < l.length; p += 1)
              n[l[p]] = f[p];
            return n;
          };
          c.prototype.getSQL = function() {
            return pb(this.Qa);
          };
          c.prototype.getNormalizedSQL = function() {
            return nc(this.Qa);
          };
          c.prototype.run = function(f) {
            null != f && this.bind(f);
            this.step();
            return this.reset();
          };
          c.prototype.tb = function(f, l) {
            null == l && (l = this.Oa, this.Oa += 1);
            f = fa(f);
            this.lb.push(f);
            this.db.handleError(oc(this.Qa, l, f, -1, 0));
          };
          c.prototype.Bb = function(f, l) {
            null == l && (l = this.Oa, this.Oa += 1);
            var n = da(f.length);
            m.set(f, n);
            this.lb.push(n);
            this.db.handleError(rb(this.Qa, l, n, f.length, 0));
          };
          c.prototype.sb = function(f, l) {
            null == l && (l = this.Oa, this.Oa += 1);
            this.db.handleError((f === (f | 0) ? qc : pc)(this.Qa, l, f));
          };
          c.prototype.Eb = function(f) {
            null == f && (f = this.Oa, this.Oa += 1);
            rb(this.Qa, f, 0, 0, 0);
          };
          c.prototype.ub = function(f, l) {
            null == l && (l = this.Oa, this.Oa += 1);
            switch (typeof f) {
              case "string":
                this.tb(f, l);
                return;
              case "number":
                this.sb(f, l);
                return;
              case "bigint":
                this.tb(f.toString(), l);
                return;
              case "boolean":
                this.sb(f + 0, l);
                return;
              case "object":
                if (null === f) {
                  this.Eb(l);
                  return;
                }
                if (null != f.length) {
                  this.Bb(f, l);
                  return;
                }
            }
            throw "Wrong API use : tried to bind a value of an unknown type (" + f + ").";
          };
          c.prototype.Db = function(f) {
            var l = this;
            Object.keys(f).forEach(function(n) {
              var p = rc(l.Qa, n);
              0 !== p && l.ub(f[n], p);
            });
            return true;
          };
          c.prototype.Cb = function(f) {
            for (var l = 0; l < f.length; l += 1)
              this.ub(f[l], l + 1);
            return true;
          };
          c.prototype.reset = function() {
            this.freemem();
            return 0 === Cc(this.Qa) && 0 === Bc(this.Qa);
          };
          c.prototype.freemem = function() {
            for (var f; void 0 !== (f = this.lb.pop()); )
              ea(f);
          };
          c.prototype.free = function() {
            this.freemem();
            var f = 0 === Dc(this.Qa);
            delete this.db.fb[this.Qa];
            this.Qa = 0;
            return f;
          };
          d.prototype.next = function() {
            if (null === this.eb)
              return { done: true };
            null !== this.Za && (this.Za.free(), this.Za = null);
            if (!this.db.db)
              throw this.nb(), Error("Database closed");
            var f = pa(), l = y(4);
            qa(g);
            qa(l);
            try {
              this.db.handleError(qb(this.db.db, this.kb, -1, g, l));
              this.kb = r(l, "i32");
              var n = r(g, "i32");
              if (0 === n)
                return this.nb(), { done: true };
              this.Za = new c(n, this.db);
              this.db.fb[n] = this.Za;
              return { value: this.Za, done: false };
            } catch (p) {
              throw this.qb = z(this.kb), this.nb(), p;
            } finally {
              ra(f);
            }
          };
          d.prototype.nb = function() {
            ea(this.eb);
            this.eb = null;
          };
          d.prototype.getRemainingSQL = function() {
            return null !== this.qb ? this.qb : z(this.kb);
          };
          "function" === typeof Symbol && "symbol" === typeof Symbol.iterator && (d.prototype[Symbol.iterator] = function() {
            return this;
          });
          e.prototype.run = function(f, l) {
            if (!this.db)
              throw "Database closed";
            if (l) {
              f = this.prepare(f, l);
              try {
                f.step();
              } finally {
                f.free();
              }
            } else
              this.handleError(t(this.db, f, 0, 0, g));
            return this;
          };
          e.prototype.exec = function(f, l, n) {
            if (!this.db)
              throw "Database closed";
            var p = null, u = null, v = null;
            try {
              v = u = fa(f);
              var K = y(4);
              for (f = []; 0 !== r(v, "i8"); ) {
                qa(g);
                qa(K);
                this.handleError(qb(this.db, v, -1, g, K));
                var I = r(g, "i32");
                v = r(K, "i32");
                if (0 !== I) {
                  var H = null;
                  p = new c(I, this);
                  for (null != l && p.bind(l); p.step(); )
                    null === H && (H = { columns: p.getColumnNames(), values: [] }, f.push(H)), H.values.push(p.get(null, n));
                  p.free();
                }
              }
              return f;
            } catch (L) {
              throw p && p.free(), L;
            } finally {
              u && ea(u);
            }
          };
          e.prototype.each = function(f, l, n, p, u) {
            "function" === typeof l && (p = n, n = l, l = void 0);
            f = this.prepare(f, l);
            try {
              for (; f.step(); )
                n(f.getAsObject(null, u));
            } finally {
              f.free();
            }
            if ("function" === typeof p)
              return p();
          };
          e.prototype.prepare = function(f, l) {
            qa(g);
            this.handleError(D(this.db, f, -1, g, 0));
            f = r(g, "i32");
            if (0 === f)
              throw "Nothing to prepare";
            var n = new c(f, this);
            null != l && n.bind(l);
            return this.fb[f] = n;
          };
          e.prototype.iterateStatements = function(f) {
            return new d(f, this);
          };
          e.prototype["export"] = function() {
            Object.values(this.fb).forEach(function(l) {
              l.free();
            });
            Object.values(this.Sa).forEach(A);
            this.Sa = {};
            this.handleError(w(this.db));
            var f = ta(this.filename);
            this.handleError(q(this.filename, g));
            this.db = r(g, "i32");
            ob(this.db);
            return f;
          };
          e.prototype.close = function() {
            null !== this.db && (Object.values(this.fb).forEach(function(f) {
              f.free();
            }), Object.values(this.Sa).forEach(A), this.Sa = {}, this.Ya && (A(this.Ya), this.Ya = void 0), this.handleError(w(this.db)), ua("/" + this.filename), this.db = null);
          };
          e.prototype.handleError = function(f) {
            if (0 === f)
              return null;
            f = tc(this.db);
            throw Error(f);
          };
          e.prototype.getRowsModified = function() {
            return x(this.db);
          };
          e.prototype.create_function = function(f, l) {
            Object.prototype.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
            var n = va(function(p, u, v) {
              u = b(u, v);
              try {
                var K = l.apply(null, u);
              } catch (I) {
                sa(p, I, -1);
                return;
              }
              a(p, K);
            }, "viii");
            this.Sa[f] = n;
            this.handleError(tb(this.db, f, l.length, 1, 0, n, 0, 0, 0));
            return this;
          };
          e.prototype.create_aggregate = function(f, l) {
            var n = l.init || function() {
              return null;
            }, p = l.finalize || function(H) {
              return H;
            }, u = l.step;
            if (!u)
              throw "An aggregate function must have a step function in " + f;
            var v = {};
            Object.hasOwnProperty.call(this.Sa, f) && (A(this.Sa[f]), delete this.Sa[f]);
            l = f + "__finalize";
            Object.hasOwnProperty.call(
              this.Sa,
              l
            ) && (A(this.Sa[l]), delete this.Sa[l]);
            var K = va(function(H, L, Pa) {
              var V = ub(H, 1);
              Object.hasOwnProperty.call(v, V) || (v[V] = n());
              L = b(L, Pa);
              L = [v[V]].concat(L);
              try {
                v[V] = u.apply(null, L);
              } catch (Fc) {
                delete v[V], sa(H, Fc, -1);
              }
            }, "viii"), I = va(function(H) {
              var L = ub(H, 1);
              try {
                var Pa = p(v[L]);
              } catch (V) {
                delete v[L];
                sa(H, V, -1);
                return;
              }
              a(H, Pa);
              delete v[L];
            }, "vi");
            this.Sa[f] = K;
            this.Sa[l] = I;
            this.handleError(tb(this.db, f, u.length - 1, 1, 0, 0, K, I, 0));
            return this;
          };
          e.prototype.updateHook = function(f) {
            this.Ya && (vb(this.db, 0, 0), A(this.Ya), this.Ya = void 0);
            if (!f)
              return this;
            this.Ya = va(function(l, n, p, u, v) {
              switch (n) {
                case 18:
                  l = "insert";
                  break;
                case 23:
                  l = "update";
                  break;
                case 9:
                  l = "delete";
                  break;
                default:
                  throw "unknown operationCode in updateHook callback: " + n;
              }
              p = z(p);
              u = z(u);
              if (v > Number.MAX_SAFE_INTEGER)
                throw "rowId too big to fit inside a Number";
              f(l, p, u, Number(v));
            }, "viiiij");
            vb(this.db, this.Ya, 0);
            return this;
          };
          k.Database = e;
        };
        var wa = "./this.program", xa = (a, b) => {
          throw b;
        }, ya = globalThis.document?.currentScript?.src;
        "undefined" != typeof __filename ? ya = __filename : ba && (ya = self.location.href);
        var za = "", Aa, Ba;
        if (ca) {
          var fs4 = require("node:fs");
          za = __dirname + "/";
          Ba = (a) => {
            a = Ca(a) ? new URL(a) : a;
            return fs4.readFileSync(a);
          };
          Aa = async (a) => {
            a = Ca(a) ? new URL(a) : a;
            return fs4.readFileSync(a, void 0);
          };
          1 < process.argv.length && (wa = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          "undefined" != typeof module2 && (module2.exports = k);
          xa = (a, b) => {
            process.exitCode = a;
            throw b;
          };
        } else if (aa || ba) {
          try {
            za = new URL(".", ya).href;
          } catch {
          }
          ba && (Ba = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          });
          Aa = async (a) => {
            if (Ca(a))
              return new Promise((c, d) => {
                var e = new XMLHttpRequest();
                e.open("GET", a, true);
                e.responseType = "arraybuffer";
                e.onload = () => {
                  200 == e.status || 0 == e.status && e.response ? c(e.response) : d(e.status);
                };
                e.onerror = d;
                e.send(null);
              });
            var b = await fetch(a, { credentials: "same-origin" });
            if (b.ok)
              return b.arrayBuffer();
            throw Error(b.status + " : " + b.url);
          };
        }
        var Da = console.log.bind(console), B = console.error.bind(console), Ea, Fa = false, Ga, Ca = (a) => a.startsWith("file://"), m, C, Ha, E, F, Ia, Ja, G;
        function Ka() {
          var a = La.buffer;
          m = new Int8Array(a);
          Ha = new Int16Array(a);
          C = new Uint8Array(a);
          new Uint16Array(a);
          E = new Int32Array(a);
          F = new Uint32Array(a);
          Ia = new Float32Array(a);
          Ja = new Float64Array(a);
          G = new BigInt64Array(a);
          new BigUint64Array(a);
        }
        function Ma(a) {
          k.onAbort?.(a);
          a = "Aborted(" + a + ")";
          B(a);
          Fa = true;
          throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
        }
        var Na;
        async function Oa(a) {
          if (!Ea)
            try {
              var b = await Aa(a);
              return new Uint8Array(b);
            } catch {
            }
          if (a == Na && Ea)
            a = new Uint8Array(Ea);
          else if (Ba)
            a = Ba(a);
          else
            throw "both async and sync fetching of the wasm failed";
          return a;
        }
        async function Qa(a, b) {
          try {
            var c = await Oa(a);
            return await WebAssembly.instantiate(c, b);
          } catch (d) {
            B(`failed to asynchronously prepare wasm: ${d}`), Ma(d);
          }
        }
        async function Ra(a) {
          var b = Na;
          if (!Ea && !Ca(b) && !ca)
            try {
              var c = fetch(b, { credentials: "same-origin" });
              return await WebAssembly.instantiateStreaming(c, a);
            } catch (d) {
              B(`wasm streaming compile failed: ${d}`), B("falling back to ArrayBuffer instantiation");
            }
          return Qa(b, a);
        }
        class Sa {
          name = "ExitStatus";
          constructor(a) {
            this.message = `Program terminated with exit(${a})`;
            this.status = a;
          }
        }
        var Ta = (a) => {
          for (; 0 < a.length; )
            a.shift()(k);
        }, Ua = [], Va = [], Wa = () => {
          var a = k.preRun.shift();
          Va.push(a);
        }, J = 0, Xa = null;
        function r(a, b = "i8") {
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              return m[a];
            case "i8":
              return m[a];
            case "i16":
              return Ha[a >> 1];
            case "i32":
              return E[a >> 2];
            case "i64":
              return G[a >> 3];
            case "float":
              return Ia[a >> 2];
            case "double":
              return Ja[a >> 3];
            case "*":
              return F[a >> 2];
            default:
              Ma(`invalid type for getValue: ${b}`);
          }
        }
        var Ya = true;
        function qa(a) {
          var b = "i32";
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              m[a] = 0;
              break;
            case "i8":
              m[a] = 0;
              break;
            case "i16":
              Ha[a >> 1] = 0;
              break;
            case "i32":
              E[a >> 2] = 0;
              break;
            case "i64":
              G[a >> 3] = BigInt(0);
              break;
            case "float":
              Ia[a >> 2] = 0;
              break;
            case "double":
              Ja[a >> 3] = 0;
              break;
            case "*":
              F[a >> 2] = 0;
              break;
            default:
              Ma(`invalid type for setValue: ${b}`);
          }
        }
        var Za = new TextDecoder(), $a = (a, b, c, d) => {
          c = b + c;
          if (d)
            return c;
          for (; a[b] && !(b >= c); )
            ++b;
          return b;
        }, z = (a, b, c) => a ? Za.decode(C.subarray(a, $a(C, a, b, c))) : "", ab = (a, b) => {
          for (var c = 0, d = a.length - 1; 0 <= d; d--) {
            var e = a[d];
            "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
          }
          if (b)
            for (; c; c--)
              a.unshift("..");
          return a;
        }, ia = (a) => {
          var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
          (a = ab(a.split("/").filter((d) => !!d), !b).join("/")) || b || (a = ".");
          a && c && (a += "/");
          return (b ? "/" : "") + a;
        }, bb = (a) => {
          var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
          a = b[0];
          b = b[1];
          if (!a && !b)
            return ".";
          b &&= b.slice(0, -1);
          return a + b;
        }, cb = (a) => a && a.match(/([^\/]+|\/)\/*$/)[1], db = () => {
          if (ca) {
            var a = require("node:crypto");
            return (b) => a.randomFillSync(b);
          }
          return (b) => crypto.getRandomValues(b);
        }, eb = (a) => {
          (eb = db())(a);
        }, fb = (...a) => {
          for (var b = "", c = false, d = a.length - 1; -1 <= d && !c; d--) {
            c = 0 <= d ? a[d] : "/";
            if ("string" != typeof c)
              throw new TypeError("Arguments to path.resolve must be strings");
            if (!c)
              return "";
            b = c + "/" + b;
            c = "/" === c.charAt(0);
          }
          b = ab(b.split("/").filter((e) => !!e), !c).join("/");
          return (c ? "/" : "") + b || ".";
        }, gb = (a) => {
          var b = $a(a, 0);
          return Za.decode(a.buffer ? a.subarray(0, b) : new Uint8Array(a.slice(0, b)));
        }, hb = [], ib = (a) => {
          for (var b = 0, c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c);
            127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
          }
          return b;
        }, M = (a, b, c, d) => {
          if (!(0 < d))
            return 0;
          var e = c;
          d = c + d - 1;
          for (var g = 0; g < a.length; ++g) {
            var h = a.codePointAt(g);
            if (127 >= h) {
              if (c >= d)
                break;
              b[c++] = h;
            } else if (2047 >= h) {
              if (c + 1 >= d)
                break;
              b[c++] = 192 | h >> 6;
              b[c++] = 128 | h & 63;
            } else if (65535 >= h) {
              if (c + 2 >= d)
                break;
              b[c++] = 224 | h >> 12;
              b[c++] = 128 | h >> 6 & 63;
              b[c++] = 128 | h & 63;
            } else {
              if (c + 3 >= d)
                break;
              b[c++] = 240 | h >> 18;
              b[c++] = 128 | h >> 12 & 63;
              b[c++] = 128 | h >> 6 & 63;
              b[c++] = 128 | h & 63;
              g++;
            }
          }
          b[c] = 0;
          return c - e;
        }, jb = [];
        function kb(a, b) {
          jb[a] = { input: [], output: [], cb: b };
          mb(a, nb);
        }
        var nb = { open(a) {
          var b = jb[a.node.rdev];
          if (!b)
            throw new N(43);
          a.tty = b;
          a.seekable = false;
        }, close(a) {
          a.tty.cb.fsync(a.tty);
        }, fsync(a) {
          a.tty.cb.fsync(a.tty);
        }, read(a, b, c, d) {
          if (!a.tty || !a.tty.cb.xb)
            throw new N(60);
          for (var e = 0, g = 0; g < d; g++) {
            try {
              var h = a.tty.cb.xb(a.tty);
            } catch (q) {
              throw new N(29);
            }
            if (void 0 === h && 0 === e)
              throw new N(6);
            if (null === h || void 0 === h)
              break;
            e++;
            b[c + g] = h;
          }
          e && (a.node.atime = Date.now());
          return e;
        }, write(a, b, c, d) {
          if (!a.tty || !a.tty.cb.rb)
            throw new N(60);
          try {
            for (var e = 0; e < d; e++)
              a.tty.cb.rb(a.tty, b[c + e]);
          } catch (g) {
            throw new N(29);
          }
          d && (a.node.mtime = a.node.ctime = Date.now());
          return e;
        } }, wb = { xb() {
          a: {
            if (!hb.length) {
              var a = null;
              if (ca) {
                var b = Buffer.alloc(256), c = 0, d = process.stdin.fd;
                try {
                  c = fs4.readSync(d, b, 0, 256);
                } catch (e) {
                  if (e.toString().includes("EOF"))
                    c = 0;
                  else
                    throw e;
                }
                0 < c && (a = b.slice(0, c).toString("utf-8"));
              } else
                globalThis.window?.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
              if (!a) {
                a = null;
                break a;
              }
              b = Array(ib(a) + 1);
              a = M(a, b, 0, b.length);
              b.length = a;
              hb = b;
            }
            a = hb.shift();
          }
          return a;
        }, rb(a, b) {
          null === b || 10 === b ? (Da(gb(a.output)), a.output = []) : 0 != b && a.output.push(b);
        }, fsync(a) {
          0 < a.output?.length && (Da(gb(a.output)), a.output = []);
        }, Tb() {
          return { Ob: 25856, Qb: 5, Nb: 191, Pb: 35387, Mb: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
        }, Ub() {
          return 0;
        }, Vb() {
          return [24, 80];
        } }, xb = { rb(a, b) {
          null === b || 10 === b ? (B(gb(a.output)), a.output = []) : 0 != b && a.output.push(b);
        }, fsync(a) {
          0 < a.output?.length && (B(gb(a.output)), a.output = []);
        } }, O = { Wa: null, Xa() {
          return O.createNode(null, "/", 16895, 0);
        }, createNode(a, b, c, d) {
          if (24576 === (c & 61440) || 4096 === (c & 61440))
            throw new N(63);
          O.Wa || (O.Wa = { dir: { node: { Ta: O.La.Ta, Ua: O.La.Ua, lookup: O.La.lookup, hb: O.La.hb, rename: O.La.rename, unlink: O.La.unlink, rmdir: O.La.rmdir, readdir: O.La.readdir, symlink: O.La.symlink }, stream: { Va: O.Ma.Va } }, file: { node: { Ta: O.La.Ta, Ua: O.La.Ua }, stream: { Va: O.Ma.Va, read: O.Ma.read, write: O.Ma.write, ib: O.Ma.ib, jb: O.Ma.jb } }, link: { node: { Ta: O.La.Ta, Ua: O.La.Ua, readlink: O.La.readlink }, stream: {} }, vb: { node: { Ta: O.La.Ta, Ua: O.La.Ua }, stream: yb } });
          c = zb(a, b, c, d);
          P(c.mode) ? (c.La = O.Wa.dir.node, c.Ma = O.Wa.dir.stream, c.Na = {}) : 32768 === (c.mode & 61440) ? (c.La = O.Wa.file.node, c.Ma = O.Wa.file.stream, c.Ra = 0, c.Na = null) : 40960 === (c.mode & 61440) ? (c.La = O.Wa.link.node, c.Ma = O.Wa.link.stream) : 8192 === (c.mode & 61440) && (c.La = O.Wa.vb.node, c.Ma = O.Wa.vb.stream);
          c.atime = c.mtime = c.ctime = Date.now();
          a && (a.Na[b] = c, a.atime = a.mtime = a.ctime = c.atime);
          return c;
        }, Sb(a) {
          return a.Na ? a.Na.subarray ? a.Na.subarray(0, a.Ra) : new Uint8Array(a.Na) : new Uint8Array(0);
        }, La: {
          Ta(a) {
            var b = {};
            b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
            b.ino = a.id;
            b.mode = a.mode;
            b.nlink = 1;
            b.uid = 0;
            b.gid = 0;
            b.rdev = a.rdev;
            P(a.mode) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.Ra : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
            b.atime = new Date(a.atime);
            b.mtime = new Date(a.mtime);
            b.ctime = new Date(a.ctime);
            b.blksize = 4096;
            b.blocks = Math.ceil(b.size / b.blksize);
            return b;
          },
          Ua(a, b) {
            for (var c of ["mode", "atime", "mtime", "ctime"])
              null != b[c] && (a[c] = b[c]);
            void 0 !== b.size && (b = b.size, a.Ra != b && (0 == b ? (a.Na = null, a.Ra = 0) : (c = a.Na, a.Na = new Uint8Array(b), c && a.Na.set(c.subarray(0, Math.min(b, a.Ra))), a.Ra = b)));
          },
          lookup() {
            O.mb || (O.mb = new N(44), O.mb.stack = "<generic error, no stack>");
            throw O.mb;
          },
          hb(a, b, c, d) {
            return O.createNode(a, b, c, d);
          },
          rename(a, b, c) {
            try {
              var d = Q(b, c);
            } catch (g) {
            }
            if (d) {
              if (P(a.mode))
                for (var e in d.Na)
                  throw new N(55);
              Ab(d);
            }
            delete a.parent.Na[a.name];
            b.Na[c] = a;
            a.name = c;
            b.ctime = b.mtime = a.parent.ctime = a.parent.mtime = Date.now();
          },
          unlink(a, b) {
            delete a.Na[b];
            a.ctime = a.mtime = Date.now();
          },
          rmdir(a, b) {
            var c = Q(a, b), d;
            for (d in c.Na)
              throw new N(55);
            delete a.Na[b];
            a.ctime = a.mtime = Date.now();
          },
          readdir(a) {
            return [".", "..", ...Object.keys(a.Na)];
          },
          symlink(a, b, c) {
            a = O.createNode(a, b, 41471, 0);
            a.link = c;
            return a;
          },
          readlink(a) {
            if (40960 !== (a.mode & 61440))
              throw new N(28);
            return a.link;
          }
        }, Ma: { read(a, b, c, d, e) {
          var g = a.node.Na;
          if (e >= a.node.Ra)
            return 0;
          a = Math.min(a.node.Ra - e, d);
          if (8 < a && g.subarray)
            b.set(g.subarray(e, e + a), c);
          else
            for (d = 0; d < a; d++)
              b[c + d] = g[e + d];
          return a;
        }, write(a, b, c, d, e, g) {
          b.buffer === m.buffer && (g = false);
          if (!d)
            return 0;
          a = a.node;
          a.mtime = a.ctime = Date.now();
          if (b.subarray && (!a.Na || a.Na.subarray)) {
            if (g)
              return a.Na = b.subarray(c, c + d), a.Ra = d;
            if (0 === a.Ra && 0 === e)
              return a.Na = b.slice(c, c + d), a.Ra = d;
            if (e + d <= a.Ra)
              return a.Na.set(b.subarray(c, c + d), e), d;
          }
          g = e + d;
          var h = a.Na ? a.Na.length : 0;
          h >= g || (g = Math.max(g, h * (1048576 > h ? 2 : 1.125) >>> 0), 0 != h && (g = Math.max(g, 256)), h = a.Na, a.Na = new Uint8Array(g), 0 < a.Ra && a.Na.set(h.subarray(0, a.Ra), 0));
          if (a.Na.subarray && b.subarray)
            a.Na.set(b.subarray(c, c + d), e);
          else
            for (g = 0; g < d; g++)
              a.Na[e + g] = b[c + g];
          a.Ra = Math.max(a.Ra, e + d);
          return d;
        }, Va(a, b, c) {
          1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.Ra);
          if (0 > b)
            throw new N(28);
          return b;
        }, ib(a, b, c, d, e) {
          if (32768 !== (a.node.mode & 61440))
            throw new N(43);
          a = a.node.Na;
          if (e & 2 || !a || a.buffer !== m.buffer) {
            e = true;
            d = 65536 * Math.ceil(b / 65536);
            var g = Bb(65536, d);
            g && C.fill(0, g, g + d);
            d = g;
            if (!d)
              throw new N(48);
            if (a) {
              if (0 < c || c + b < a.length)
                a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
              m.set(a, d);
            }
          } else
            e = false, d = a.byteOffset;
          return { Kb: d, Ab: e };
        }, jb(a, b, c, d) {
          O.Ma.write(a, b, 0, d, c, false);
          return 0;
        } } }, ja = (a, b) => {
          var c = 0;
          a && (c |= 365);
          b && (c |= 146);
          return c;
        }, Cb = null, Db = {}, Eb = [], Fb = 1, R = null, Gb = false, Hb = true, Ib = {}, N = class {
          name = "ErrnoError";
          constructor(a) {
            this.Pa = a;
          }
        }, Jb = class {
          gb = {};
          node = null;
          get flags() {
            return this.gb.flags;
          }
          set flags(a) {
            this.gb.flags = a;
          }
          get position() {
            return this.gb.position;
          }
          set position(a) {
            this.gb.position = a;
          }
        }, Kb = class {
          La = {};
          Ma = {};
          ab = null;
          constructor(a, b, c, d) {
            a ||= this;
            this.parent = a;
            this.Xa = a.Xa;
            this.id = Fb++;
            this.name = b;
            this.mode = c;
            this.rdev = d;
            this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return 365 === (this.mode & 365);
          }
          set read(a) {
            a ? this.mode |= 365 : this.mode &= -366;
          }
          get write() {
            return 146 === (this.mode & 146);
          }
          set write(a) {
            a ? this.mode |= 146 : this.mode &= -147;
          }
        };
        function S(a, b = {}) {
          if (!a)
            throw new N(44);
          b.ob ?? (b.ob = true);
          "/" === a.charAt(0) || (a = "//" + a);
          var c = 0;
          a:
            for (; 40 > c; c++) {
              a = a.split("/").filter((q) => !!q);
              for (var d = Cb, e = "/", g = 0; g < a.length; g++) {
                var h = g === a.length - 1;
                if (h && b.parent)
                  break;
                if ("." !== a[g])
                  if (".." === a[g])
                    if (e = bb(e), d === d.parent) {
                      a = e + "/" + a.slice(g + 1).join("/");
                      c--;
                      continue a;
                    } else
                      d = d.parent;
                  else {
                    e = ia(e + "/" + a[g]);
                    try {
                      d = Q(d, a[g]);
                    } catch (q) {
                      if (44 === q?.Pa && h && b.Jb)
                        return { path: e };
                      throw q;
                    }
                    !d.ab || h && !b.ob || (d = d.ab.root);
                    if (40960 === (d.mode & 61440) && (!h || b.$a)) {
                      if (!d.La.readlink)
                        throw new N(52);
                      d = d.La.readlink(d);
                      "/" === d.charAt(0) || (d = bb(e) + "/" + d);
                      a = d + "/" + a.slice(g + 1).join("/");
                      continue a;
                    }
                  }
              }
              return { path: e, node: d };
            }
          throw new N(32);
        }
        function ha(a) {
          for (var b; ; ) {
            if (a === a.parent)
              return a = a.Xa.zb, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
            b = b ? `${a.name}/${b}` : a.name;
            a = a.parent;
          }
        }
        function Lb(a, b) {
          for (var c = 0, d = 0; d < b.length; d++)
            c = (c << 5) - c + b.charCodeAt(d) | 0;
          return (a + c >>> 0) % R.length;
        }
        function Ab(a) {
          var b = Lb(a.parent.id, a.name);
          if (R[b] === a)
            R[b] = a.bb;
          else
            for (b = R[b]; b; ) {
              if (b.bb === a) {
                b.bb = a.bb;
                break;
              }
              b = b.bb;
            }
        }
        function Q(a, b) {
          var c = P(a.mode) ? (c = Mb(a, "x")) ? c : a.La.lookup ? 0 : 2 : 54;
          if (c)
            throw new N(c);
          for (c = R[Lb(a.id, b)]; c; c = c.bb) {
            var d = c.name;
            if (c.parent.id === a.id && d === b)
              return c;
          }
          return a.La.lookup(a, b);
        }
        function zb(a, b, c, d) {
          a = new Kb(a, b, c, d);
          b = Lb(a.parent.id, a.name);
          a.bb = R[b];
          return R[b] = a;
        }
        function P(a) {
          return 16384 === (a & 61440);
        }
        function Nb(a) {
          var b = ["r", "w", "rw"][a & 3];
          a & 512 && (b += "w");
          return b;
        }
        function Mb(a, b) {
          if (Hb)
            return 0;
          if (!b.includes("r") || a.mode & 292) {
            if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73))
              return 2;
          } else
            return 2;
          return 0;
        }
        function Ob(a, b) {
          if (!P(a.mode))
            return 54;
          try {
            return Q(a, b), 20;
          } catch (c) {
          }
          return Mb(a, "wx");
        }
        function Pb(a, b, c) {
          try {
            var d = Q(a, b);
          } catch (e) {
            return e.Pa;
          }
          if (a = Mb(a, "wx"))
            return a;
          if (c) {
            if (!P(d.mode))
              return 54;
            if (d === d.parent || "/" === ha(d))
              return 10;
          } else if (P(d.mode))
            return 31;
          return 0;
        }
        function Qb(a) {
          if (!a)
            throw new N(63);
          return a;
        }
        function T(a) {
          a = Eb[a];
          if (!a)
            throw new N(8);
          return a;
        }
        function Rb(a, b = -1) {
          a = Object.assign(new Jb(), a);
          if (-1 == b)
            a: {
              for (b = 0; 4096 >= b; b++)
                if (!Eb[b])
                  break a;
              throw new N(33);
            }
          a.fd = b;
          return Eb[b] = a;
        }
        function Sb(a, b = -1) {
          a = Rb(a, b);
          a.Ma?.Rb?.(a);
          return a;
        }
        function Tb(a, b, c) {
          var d = a?.Ma.Ua;
          a = d ? a : b;
          d ??= b.La.Ua;
          Qb(d);
          d(a, c);
        }
        var yb = { open(a) {
          a.Ma = Db[a.node.rdev].Ma;
          a.Ma.open?.(a);
        }, Va() {
          throw new N(70);
        } };
        function mb(a, b) {
          Db[a] = { Ma: b };
        }
        function Ub(a, b) {
          var c = "/" === b;
          if (c && Cb)
            throw new N(10);
          if (!c && b) {
            var d = S(b, { ob: false });
            b = d.path;
            d = d.node;
            if (d.ab)
              throw new N(10);
            if (!P(d.mode))
              throw new N(54);
          }
          b = { type: a, Wb: {}, zb: b, Ib: [] };
          a = a.Xa(b);
          a.Xa = b;
          b.root = a;
          c ? Cb = a : d && (d.ab = b, d.Xa && d.Xa.Ib.push(b));
        }
        function Vb(a, b, c) {
          var d = S(a, { parent: true }).node;
          a = cb(a);
          if (!a)
            throw new N(28);
          if ("." === a || ".." === a)
            throw new N(20);
          var e = Ob(d, a);
          if (e)
            throw new N(e);
          if (!d.La.hb)
            throw new N(63);
          return d.La.hb(d, a, b, c);
        }
        function ka(a, b = 438) {
          return Vb(a, b & 4095 | 32768, 0);
        }
        function U(a, b = 511) {
          return Vb(a, b & 1023 | 16384, 0);
        }
        function Wb(a, b, c) {
          "undefined" == typeof c && (c = b, b = 438);
          Vb(a, b | 8192, c);
        }
        function Xb(a, b) {
          if (!fb(a))
            throw new N(44);
          var c = S(b, { parent: true }).node;
          if (!c)
            throw new N(44);
          b = cb(b);
          var d = Ob(c, b);
          if (d)
            throw new N(d);
          if (!c.La.symlink)
            throw new N(63);
          c.La.symlink(c, b, a);
        }
        function Yb(a) {
          var b = S(a, { parent: true }).node;
          a = cb(a);
          var c = Q(b, a), d = Pb(b, a, true);
          if (d)
            throw new N(d);
          if (!b.La.rmdir)
            throw new N(63);
          if (c.ab)
            throw new N(10);
          b.La.rmdir(b, a);
          Ab(c);
        }
        function ua(a) {
          var b = S(a, { parent: true }).node;
          if (!b)
            throw new N(44);
          a = cb(a);
          var c = Q(b, a), d = Pb(b, a, false);
          if (d)
            throw new N(d);
          if (!b.La.unlink)
            throw new N(63);
          if (c.ab)
            throw new N(10);
          b.La.unlink(b, a);
          Ab(c);
        }
        function Zb(a, b) {
          a = S(a, { $a: !b }).node;
          return Qb(a.La.Ta)(a);
        }
        function $b(a, b, c, d) {
          Tb(a, b, { mode: c & 4095 | b.mode & -4096, ctime: Date.now(), Fb: d });
        }
        function la(a, b) {
          a = "string" == typeof a ? S(a, { $a: true }).node : a;
          $b(null, a, b);
        }
        function ac(a, b, c) {
          if (P(b.mode))
            throw new N(31);
          if (32768 !== (b.mode & 61440))
            throw new N(28);
          var d = Mb(b, "w");
          if (d)
            throw new N(d);
          Tb(a, b, { size: c, timestamp: Date.now() });
        }
        function ma(a, b, c = 438) {
          if ("" === a)
            throw new N(44);
          if ("string" == typeof b) {
            var d = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
            if ("undefined" == typeof d)
              throw Error(`Unknown file open mode: ${b}`);
            b = d;
          }
          c = b & 64 ? c & 4095 | 32768 : 0;
          if ("object" == typeof a)
            d = a;
          else {
            var e = a.endsWith("/");
            a = S(a, { $a: !(b & 131072), Jb: true });
            d = a.node;
            a = a.path;
          }
          var g = false;
          if (b & 64)
            if (d) {
              if (b & 128)
                throw new N(20);
            } else {
              if (e)
                throw new N(31);
              d = Vb(a, c | 511, 0);
              g = true;
            }
          if (!d)
            throw new N(44);
          8192 === (d.mode & 61440) && (b &= -513);
          if (b & 65536 && !P(d.mode))
            throw new N(54);
          if (!g && (e = d ? 40960 === (d.mode & 61440) ? 32 : P(d.mode) && ("r" !== Nb(b) || b & 576) ? 31 : Mb(d, Nb(b)) : 44))
            throw new N(e);
          b & 512 && !g && (e = d, e = "string" == typeof e ? S(e, { $a: true }).node : e, ac(null, e, 0));
          b &= -131713;
          e = Rb({ node: d, path: ha(d), flags: b, seekable: true, position: 0, Ma: d.Ma, Lb: [], error: false });
          e.Ma.open && e.Ma.open(e);
          g && la(d, c & 511);
          !k.logReadFiles || b & 1 || a in Ib || (Ib[a] = 1);
          return e;
        }
        function oa(a) {
          if (null === a.fd)
            throw new N(8);
          a.pb && (a.pb = null);
          try {
            a.Ma.close && a.Ma.close(a);
          } catch (b) {
            throw b;
          } finally {
            Eb[a.fd] = null;
          }
          a.fd = null;
        }
        function bc(a, b, c) {
          if (null === a.fd)
            throw new N(8);
          if (!a.seekable || !a.Ma.Va)
            throw new N(70);
          if (0 != c && 1 != c && 2 != c)
            throw new N(28);
          a.position = a.Ma.Va(a, b, c);
          a.Lb = [];
        }
        function cc(a, b, c, d, e) {
          if (0 > d || 0 > e)
            throw new N(28);
          if (null === a.fd)
            throw new N(8);
          if (1 === (a.flags & 2097155))
            throw new N(8);
          if (P(a.node.mode))
            throw new N(31);
          if (!a.Ma.read)
            throw new N(28);
          var g = "undefined" != typeof e;
          if (!g)
            e = a.position;
          else if (!a.seekable)
            throw new N(70);
          b = a.Ma.read(a, b, c, d, e);
          g || (a.position += b);
          return b;
        }
        function na(a, b, c, d, e) {
          if (0 > d || 0 > e)
            throw new N(28);
          if (null === a.fd)
            throw new N(8);
          if (0 === (a.flags & 2097155))
            throw new N(8);
          if (P(a.node.mode))
            throw new N(31);
          if (!a.Ma.write)
            throw new N(28);
          a.seekable && a.flags & 1024 && bc(a, 0, 2);
          var g = "undefined" != typeof e;
          if (!g)
            e = a.position;
          else if (!a.seekable)
            throw new N(70);
          b = a.Ma.write(a, b, c, d, e, void 0);
          g || (a.position += b);
          return b;
        }
        function ta(a) {
          var b = b || 0;
          var c = "binary";
          "utf8" !== c && "binary" !== c && Ma(`Invalid encoding type "${c}"`);
          b = ma(a, b);
          a = Zb(a).size;
          var d = new Uint8Array(a);
          cc(b, d, 0, a, 0);
          "utf8" === c && (d = gb(d));
          oa(b);
          return d;
        }
        function W(a, b, c) {
          a = ia("/dev/" + a);
          var d = ja(!!b, !!c);
          W.yb ?? (W.yb = 64);
          var e = W.yb++ << 8 | 0;
          mb(e, { open(g) {
            g.seekable = false;
          }, close() {
            c?.buffer?.length && c(10);
          }, read(g, h, q, w) {
            for (var t = 0, x = 0; x < w; x++) {
              try {
                var D = b();
              } catch (pb) {
                throw new N(29);
              }
              if (void 0 === D && 0 === t)
                throw new N(6);
              if (null === D || void 0 === D)
                break;
              t++;
              h[q + x] = D;
            }
            t && (g.node.atime = Date.now());
            return t;
          }, write(g, h, q, w) {
            for (var t = 0; t < w; t++)
              try {
                c(h[q + t]);
              } catch (x) {
                throw new N(29);
              }
            w && (g.node.mtime = g.node.ctime = Date.now());
            return t;
          } });
          Wb(a, d, e);
        }
        var X = {};
        function Y(a, b, c) {
          if ("/" === b.charAt(0))
            return b;
          a = -100 === a ? "/" : T(a).path;
          if (0 == b.length) {
            if (!c)
              throw new N(44);
            return a;
          }
          return a + "/" + b;
        }
        function mc(a, b) {
          F[a >> 2] = b.dev;
          F[a + 4 >> 2] = b.mode;
          F[a + 8 >> 2] = b.nlink;
          F[a + 12 >> 2] = b.uid;
          F[a + 16 >> 2] = b.gid;
          F[a + 20 >> 2] = b.rdev;
          G[a + 24 >> 3] = BigInt(b.size);
          E[a + 32 >> 2] = 4096;
          E[a + 36 >> 2] = b.blocks;
          var c = b.atime.getTime(), d = b.mtime.getTime(), e = b.ctime.getTime();
          G[a + 40 >> 3] = BigInt(Math.floor(c / 1e3));
          F[a + 48 >> 2] = c % 1e3 * 1e6;
          G[a + 56 >> 3] = BigInt(Math.floor(d / 1e3));
          F[a + 64 >> 2] = d % 1e3 * 1e6;
          G[a + 72 >> 3] = BigInt(Math.floor(e / 1e3));
          F[a + 80 >> 2] = e % 1e3 * 1e6;
          G[a + 88 >> 3] = BigInt(b.ino);
          return 0;
        }
        var Ec = void 0, Gc = () => {
          var a = E[+Ec >> 2];
          Ec += 4;
          return a;
        }, Hc = 0, Ic = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Jc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Kc = {}, Lc = (a) => {
          Ga = a;
          Ya || 0 < Hc || (k.onExit?.(a), Fa = true);
          xa(a, new Sa(a));
        }, Mc = (a) => {
          if (!Fa)
            try {
              a();
            } catch (b) {
              b instanceof Sa || "unwind" == b || xa(1, b);
            } finally {
              if (!(Ya || 0 < Hc))
                try {
                  Ga = a = Ga, Lc(a);
                } catch (b) {
                  b instanceof Sa || "unwind" == b || xa(1, b);
                }
            }
        }, Nc = {}, Pc = () => {
          if (!Oc) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", _: wa || "./this.program" }, b;
            for (b in Nc)
              void 0 === Nc[b] ? delete a[b] : a[b] = Nc[b];
            var c = [];
            for (b in a)
              c.push(`${b}=${a[b]}`);
            Oc = c;
          }
          return Oc;
        }, Oc, Qc = (a, b, c, d) => {
          var e = { string: (t) => {
            var x = 0;
            if (null !== t && void 0 !== t && 0 !== t) {
              x = ib(t) + 1;
              var D = y(x);
              M(t, C, D, x);
              x = D;
            }
            return x;
          }, array: (t) => {
            var x = y(t.length);
            m.set(t, x);
            return x;
          } };
          a = k["_" + a];
          var g = [], h = 0;
          if (d)
            for (var q = 0; q < d.length; q++) {
              var w = e[c[q]];
              w ? (0 === h && (h = pa()), g[q] = w(d[q])) : g[q] = d[q];
            }
          c = a(...g);
          return c = function(t) {
            0 !== h && ra(h);
            return "string" === b ? z(t) : "boolean" === b ? !!t : t;
          }(c);
        }, fa = (a) => {
          var b = ib(a) + 1, c = da(b);
          c && M(a, C, c, b);
          return c;
        }, Rc, Sc = [], A = (a) => {
          Rc.delete(Z.get(a));
          Z.set(a, null);
          Sc.push(a);
        }, Tc = (a) => {
          const b = a.length;
          return [b % 128 | 128, b >> 7, ...a];
        }, Uc = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 }, Vc = (a) => Tc(Array.from(a, (b) => Uc[b])), va = (a, b) => {
          if (!Rc) {
            Rc = /* @__PURE__ */ new WeakMap();
            var c = Z.length;
            if (Rc)
              for (var d = 0; d < 0 + c; d++) {
                var e = Z.get(d);
                e && Rc.set(e, d);
              }
          }
          if (c = Rc.get(a) || 0)
            return c;
          c = Sc.length ? Sc.pop() : Z.grow(1);
          try {
            Z.set(c, a);
          } catch (g) {
            if (!(g instanceof TypeError))
              throw g;
            b = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0, 1, ...Tc([1, 96, ...Vc(b.slice(1)), ...Vc("v" === b[0] ? "" : b[0])]), 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
            b = new WebAssembly.Module(b);
            b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
            Z.set(c, b);
          }
          Rc.set(a, c);
          return c;
        };
        R = Array(4096);
        Ub(O, "/");
        U("/tmp");
        U("/home");
        U("/home/web_user");
        (function() {
          U("/dev");
          mb(259, { read: () => 0, write: (d, e, g, h) => h, Va: () => 0 });
          Wb("/dev/null", 259);
          kb(1280, wb);
          kb(1536, xb);
          Wb("/dev/tty", 1280);
          Wb("/dev/tty1", 1536);
          var a = new Uint8Array(1024), b = 0, c = () => {
            0 === b && (eb(a), b = a.byteLength);
            return a[--b];
          };
          W("random", c);
          W("urandom", c);
          U("/dev/shm");
          U("/dev/shm/tmp");
        })();
        (function() {
          U("/proc");
          var a = U("/proc/self");
          U("/proc/self/fd");
          Ub({ Xa() {
            var b = zb(a, "fd", 16895, 73);
            b.Ma = { Va: O.Ma.Va };
            b.La = { lookup(c, d) {
              c = +d;
              var e = T(c);
              c = { parent: null, Xa: { zb: "fake" }, La: { readlink: () => e.path }, id: c + 1 };
              return c.parent = c;
            }, readdir() {
              return Array.from(Eb.entries()).filter(([, c]) => c).map(([c]) => c.toString());
            } };
            return b;
          } }, "/proc/self/fd");
        })();
        k.noExitRuntime && (Ya = k.noExitRuntime);
        k.print && (Da = k.print);
        k.printErr && (B = k.printErr);
        k.wasmBinary && (Ea = k.wasmBinary);
        k.thisProgram && (wa = k.thisProgram);
        if (k.preInit)
          for ("function" == typeof k.preInit && (k.preInit = [k.preInit]); 0 < k.preInit.length; )
            k.preInit.shift()();
        k.stackSave = () => pa();
        k.stackRestore = (a) => ra(a);
        k.stackAlloc = (a) => y(a);
        k.cwrap = (a, b, c, d) => {
          var e = !c || c.every((g) => "number" === g || "boolean" === g);
          return "string" !== b && e && !d ? k["_" + a] : (...g) => Qc(a, b, c, g);
        };
        k.addFunction = va;
        k.removeFunction = A;
        k.UTF8ToString = z;
        k.stringToNewUTF8 = fa;
        k.writeArrayToMemory = (a, b) => {
          m.set(a, b);
        };
        var da, ea, Bb, Wc, ra, y, pa, La, Z, Xc = {
          a: (a, b, c, d) => Ma(`Assertion failed: ${z(a)}, at: ` + [b ? z(b) : "unknown filename", c, d ? z(d) : "unknown function"]),
          i: function(a, b) {
            try {
              return a = z(a), la(a, b), 0;
            } catch (c) {
              if ("undefined" == typeof X || "ErrnoError" !== c.name)
                throw c;
              return -c.Pa;
            }
          },
          L: function(a, b, c) {
            try {
              b = z(b);
              b = Y(a, b);
              if (c & -8)
                return -28;
              var d = S(b, { $a: true }).node;
              if (!d)
                return -44;
              a = "";
              c & 4 && (a += "r");
              c & 2 && (a += "w");
              c & 1 && (a += "x");
              return a && Mb(d, a) ? -2 : 0;
            } catch (e) {
              if ("undefined" == typeof X || "ErrnoError" !== e.name)
                throw e;
              return -e.Pa;
            }
          },
          j: function(a, b) {
            try {
              var c = T(a);
              $b(c, c.node, b, false);
              return 0;
            } catch (d) {
              if ("undefined" == typeof X || "ErrnoError" !== d.name)
                throw d;
              return -d.Pa;
            }
          },
          h: function(a) {
            try {
              var b = T(a);
              Tb(b, b.node, { timestamp: Date.now(), Fb: false });
              return 0;
            } catch (c) {
              if ("undefined" == typeof X || "ErrnoError" !== c.name)
                throw c;
              return -c.Pa;
            }
          },
          b: function(a, b, c) {
            Ec = c;
            try {
              var d = T(a);
              switch (b) {
                case 0:
                  var e = Gc();
                  if (0 > e)
                    break;
                  for (; Eb[e]; )
                    e++;
                  return Sb(d, e).fd;
                case 1:
                case 2:
                  return 0;
                case 3:
                  return d.flags;
                case 4:
                  return e = Gc(), d.flags |= e, 0;
                case 12:
                  return e = Gc(), Ha[e + 0 >> 1] = 2, 0;
                case 13:
                case 14:
                  return 0;
              }
              return -28;
            } catch (g) {
              if ("undefined" == typeof X || "ErrnoError" !== g.name)
                throw g;
              return -g.Pa;
            }
          },
          g: function(a, b) {
            try {
              var c = T(a), d = c.node, e = c.Ma.Ta;
              a = e ? c : d;
              e ??= d.La.Ta;
              Qb(e);
              var g = e(a);
              return mc(b, g);
            } catch (h) {
              if ("undefined" == typeof X || "ErrnoError" !== h.name)
                throw h;
              return -h.Pa;
            }
          },
          H: function(a, b) {
            b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
            try {
              if (isNaN(b))
                return -61;
              var c = T(a);
              if (0 > b || 0 === (c.flags & 2097155))
                throw new N(28);
              ac(c, c.node, b);
              return 0;
            } catch (d) {
              if ("undefined" == typeof X || "ErrnoError" !== d.name)
                throw d;
              return -d.Pa;
            }
          },
          G: function(a, b) {
            try {
              if (0 === b)
                return -28;
              var c = ib("/") + 1;
              if (b < c)
                return -68;
              M("/", C, a, b);
              return c;
            } catch (d) {
              if ("undefined" == typeof X || "ErrnoError" !== d.name)
                throw d;
              return -d.Pa;
            }
          },
          K: function(a, b) {
            try {
              return a = z(a), mc(b, Zb(a, true));
            } catch (c) {
              if ("undefined" == typeof X || "ErrnoError" !== c.name)
                throw c;
              return -c.Pa;
            }
          },
          C: function(a, b, c) {
            try {
              return b = z(b), b = Y(a, b), U(b, c), 0;
            } catch (d) {
              if ("undefined" == typeof X || "ErrnoError" !== d.name)
                throw d;
              return -d.Pa;
            }
          },
          J: function(a, b, c, d) {
            try {
              b = z(b);
              var e = d & 256;
              b = Y(a, b, d & 4096);
              return mc(c, e ? Zb(b, true) : Zb(b));
            } catch (g) {
              if ("undefined" == typeof X || "ErrnoError" !== g.name)
                throw g;
              return -g.Pa;
            }
          },
          x: function(a, b, c, d) {
            Ec = d;
            try {
              b = z(b);
              b = Y(a, b);
              var e = d ? Gc() : 0;
              return ma(b, c, e).fd;
            } catch (g) {
              if ("undefined" == typeof X || "ErrnoError" !== g.name)
                throw g;
              return -g.Pa;
            }
          },
          v: function(a, b, c, d) {
            try {
              b = z(b);
              b = Y(a, b);
              if (0 >= d)
                return -28;
              var e = S(b).node;
              if (!e)
                throw new N(44);
              if (!e.La.readlink)
                throw new N(28);
              var g = e.La.readlink(e);
              var h = Math.min(d, ib(g)), q = m[c + h];
              M(
                g,
                C,
                c,
                d + 1
              );
              m[c + h] = q;
              return h;
            } catch (w) {
              if ("undefined" == typeof X || "ErrnoError" !== w.name)
                throw w;
              return -w.Pa;
            }
          },
          u: function(a) {
            try {
              return a = z(a), Yb(a), 0;
            } catch (b) {
              if ("undefined" == typeof X || "ErrnoError" !== b.name)
                throw b;
              return -b.Pa;
            }
          },
          f: function(a, b) {
            try {
              return a = z(a), mc(b, Zb(a));
            } catch (c) {
              if ("undefined" == typeof X || "ErrnoError" !== c.name)
                throw c;
              return -c.Pa;
            }
          },
          r: function(a, b, c) {
            try {
              b = z(b);
              b = Y(a, b);
              if (c)
                if (512 === c)
                  Yb(b);
                else
                  return -28;
              else
                ua(b);
              return 0;
            } catch (d) {
              if ("undefined" == typeof X || "ErrnoError" !== d.name)
                throw d;
              return -d.Pa;
            }
          },
          q: function(a, b, c) {
            try {
              b = z(b);
              b = Y(a, b, true);
              var d = Date.now(), e, g;
              if (c) {
                var h = F[c >> 2] + 4294967296 * E[c + 4 >> 2], q = E[c + 8 >> 2];
                1073741823 == q ? e = d : 1073741822 == q ? e = null : e = 1e3 * h + q / 1e6;
                c += 16;
                h = F[c >> 2] + 4294967296 * E[c + 4 >> 2];
                q = E[c + 8 >> 2];
                1073741823 == q ? g = d : 1073741822 == q ? g = null : g = 1e3 * h + q / 1e6;
              } else
                g = e = d;
              if (null !== (g ?? e)) {
                a = e;
                var w = S(b, { $a: true }).node;
                Qb(w.La.Ua)(w, { atime: a, mtime: g });
              }
              return 0;
            } catch (t) {
              if ("undefined" == typeof X || "ErrnoError" !== t.name)
                throw t;
              return -t.Pa;
            }
          },
          m: () => Ma(""),
          l: () => {
            Ya = false;
            Hc = 0;
          },
          A: function(a, b) {
            a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
            a = new Date(1e3 * a);
            E[b >> 2] = a.getSeconds();
            E[b + 4 >> 2] = a.getMinutes();
            E[b + 8 >> 2] = a.getHours();
            E[b + 12 >> 2] = a.getDate();
            E[b + 16 >> 2] = a.getMonth();
            E[b + 20 >> 2] = a.getFullYear() - 1900;
            E[b + 24 >> 2] = a.getDay();
            var c = a.getFullYear();
            E[b + 28 >> 2] = (0 !== c % 4 || 0 === c % 100 && 0 !== c % 400 ? Jc : Ic)[a.getMonth()] + a.getDate() - 1 | 0;
            E[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
            c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
            var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            E[b + 32 >> 2] = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
          },
          y: function(a, b, c, d, e, g, h) {
            e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e);
            try {
              var q = T(d);
              if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (q.flags & 2097155))
                throw new N(2);
              if (1 === (q.flags & 2097155))
                throw new N(2);
              if (!q.Ma.ib)
                throw new N(43);
              if (!a)
                throw new N(28);
              var w = q.Ma.ib(q, a, e, b, c);
              var t = w.Kb;
              E[g >> 2] = w.Ab;
              F[h >> 2] = t;
              return 0;
            } catch (x) {
              if ("undefined" == typeof X || "ErrnoError" !== x.name)
                throw x;
              return -x.Pa;
            }
          },
          z: function(a, b, c, d, e, g) {
            g = -9007199254740992 > g || 9007199254740992 < g ? NaN : Number(g);
            try {
              var h = T(e);
              if (c & 2) {
                c = g;
                if (32768 !== (h.node.mode & 61440))
                  throw new N(43);
                if (!(d & 2)) {
                  var q = C.slice(a, a + b);
                  h.Ma.jb && h.Ma.jb(h, q, c, b, d);
                }
              }
            } catch (w) {
              if ("undefined" == typeof X || "ErrnoError" !== w.name)
                throw w;
              return -w.Pa;
            }
          },
          n: (a, b) => {
            Kc[a] && (clearTimeout(Kc[a].id), delete Kc[a]);
            if (!b)
              return 0;
            var c = setTimeout(() => {
              delete Kc[a];
              Mc(() => Wc(a, performance.now()));
            }, b);
            Kc[a] = { id: c, Xb: b };
            return 0;
          },
          B: (a, b, c, d) => {
            var e = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(e, 0, 1).getTimezoneOffset();
            e = new Date(e, 6, 1).getTimezoneOffset();
            F[a >> 2] = 60 * Math.max(g, e);
            E[b >> 2] = Number(g != e);
            b = (h) => {
              var q = Math.abs(h);
              return `UTC${0 <= h ? "-" : "+"}${String(Math.floor(q / 60)).padStart(2, "0")}${String(q % 60).padStart(2, "0")}`;
            };
            a = b(g);
            b = b(e);
            e < g ? (M(a, C, c, 17), M(b, C, d, 17)) : (M(a, C, d, 17), M(b, C, c, 17));
          },
          d: () => Date.now(),
          s: () => 2147483648,
          c: () => performance.now(),
          o: (a) => {
            var b = C.length;
            a >>>= 0;
            if (2147483648 < a)
              return false;
            for (var c = 1; 4 >= c; c *= 2) {
              var d = b * (1 + 0.2 / c);
              d = Math.min(d, a + 100663296);
              a: {
                d = (Math.min(2147483648, 65536 * Math.ceil(Math.max(
                  a,
                  d
                ) / 65536)) - La.buffer.byteLength + 65535) / 65536 | 0;
                try {
                  La.grow(d);
                  Ka();
                  var e = 1;
                  break a;
                } catch (g) {
                }
                e = void 0;
              }
              if (e)
                return true;
            }
            return false;
          },
          E: (a, b) => {
            var c = 0, d = 0, e;
            for (e of Pc()) {
              var g = b + c;
              F[a + d >> 2] = g;
              c += M(e, C, g, Infinity) + 1;
              d += 4;
            }
            return 0;
          },
          F: (a, b) => {
            var c = Pc();
            F[a >> 2] = c.length;
            a = 0;
            for (var d of c)
              a += ib(d) + 1;
            F[b >> 2] = a;
            return 0;
          },
          e: function(a) {
            try {
              var b = T(a);
              oa(b);
              return 0;
            } catch (c) {
              if ("undefined" == typeof X || "ErrnoError" !== c.name)
                throw c;
              return c.Pa;
            }
          },
          p: function(a, b) {
            try {
              var c = T(a);
              m[b] = c.tty ? 2 : P(c.mode) ? 3 : 40960 === (c.mode & 61440) ? 7 : 4;
              Ha[b + 2 >> 1] = 0;
              G[b + 8 >> 3] = BigInt(0);
              G[b + 16 >> 3] = BigInt(0);
              return 0;
            } catch (d) {
              if ("undefined" == typeof X || "ErrnoError" !== d.name)
                throw d;
              return d.Pa;
            }
          },
          w: function(a, b, c, d) {
            try {
              a: {
                var e = T(a);
                a = b;
                for (var g, h = b = 0; h < c; h++) {
                  var q = F[a >> 2], w = F[a + 4 >> 2];
                  a += 8;
                  var t = cc(e, m, q, w, g);
                  if (0 > t) {
                    var x = -1;
                    break a;
                  }
                  b += t;
                  if (t < w)
                    break;
                  "undefined" != typeof g && (g += t);
                }
                x = b;
              }
              F[d >> 2] = x;
              return 0;
            } catch (D) {
              if ("undefined" == typeof X || "ErrnoError" !== D.name)
                throw D;
              return D.Pa;
            }
          },
          D: function(a, b, c, d) {
            b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
            try {
              if (isNaN(b))
                return 61;
              var e = T(a);
              bc(e, b, c);
              G[d >> 3] = BigInt(e.position);
              e.pb && 0 === b && 0 === c && (e.pb = null);
              return 0;
            } catch (g) {
              if ("undefined" == typeof X || "ErrnoError" !== g.name)
                throw g;
              return g.Pa;
            }
          },
          I: function(a) {
            try {
              var b = T(a);
              return b.Ma?.fsync?.(b);
            } catch (c) {
              if ("undefined" == typeof X || "ErrnoError" !== c.name)
                throw c;
              return c.Pa;
            }
          },
          t: function(a, b, c, d) {
            try {
              a: {
                var e = T(a);
                a = b;
                for (var g, h = b = 0; h < c; h++) {
                  var q = F[a >> 2], w = F[a + 4 >> 2];
                  a += 8;
                  var t = na(e, m, q, w, g);
                  if (0 > t) {
                    var x = -1;
                    break a;
                  }
                  b += t;
                  if (t < w)
                    break;
                  "undefined" != typeof g && (g += t);
                }
                x = b;
              }
              F[d >> 2] = x;
              return 0;
            } catch (D) {
              if ("undefined" == typeof X || "ErrnoError" !== D.name)
                throw D;
              return D.Pa;
            }
          },
          k: Lc
        };
        function Yc() {
          function a() {
            k.calledRun = true;
            if (!Fa) {
              if (!k.noFSInit && !Gb) {
                var b, c;
                Gb = true;
                b ??= k.stdin;
                c ??= k.stdout;
                d ??= k.stderr;
                b ? W("stdin", b) : Xb("/dev/tty", "/dev/stdin");
                c ? W("stdout", null, c) : Xb("/dev/tty", "/dev/stdout");
                d ? W("stderr", null, d) : Xb("/dev/tty1", "/dev/stderr");
                ma("/dev/stdin", 0);
                ma("/dev/stdout", 1);
                ma("/dev/stderr", 1);
              }
              Zc.N();
              Hb = false;
              k.onRuntimeInitialized?.();
              if (k.postRun)
                for ("function" == typeof k.postRun && (k.postRun = [k.postRun]); k.postRun.length; ) {
                  var d = k.postRun.shift();
                  Ua.push(d);
                }
              Ta(Ua);
            }
          }
          if (0 < J)
            Xa = Yc;
          else {
            if (k.preRun)
              for ("function" == typeof k.preRun && (k.preRun = [k.preRun]); k.preRun.length; )
                Wa();
            Ta(Va);
            0 < J ? Xa = Yc : k.setStatus ? (k.setStatus("Running..."), setTimeout(() => {
              setTimeout(() => k.setStatus(""), 1);
              a();
            }, 1)) : a();
          }
        }
        var Zc;
        (async function() {
          function a(c) {
            c = Zc = c.exports;
            k._sqlite3_free = c.P;
            k._sqlite3_value_text = c.Q;
            k._sqlite3_prepare_v2 = c.R;
            k._sqlite3_step = c.S;
            k._sqlite3_reset = c.T;
            k._sqlite3_exec = c.U;
            k._sqlite3_finalize = c.V;
            k._sqlite3_column_name = c.W;
            k._sqlite3_column_text = c.X;
            k._sqlite3_column_type = c.Y;
            k._sqlite3_errmsg = c.Z;
            k._sqlite3_clear_bindings = c._;
            k._sqlite3_value_blob = c.$;
            k._sqlite3_value_bytes = c.aa;
            k._sqlite3_value_double = c.ba;
            k._sqlite3_value_int = c.ca;
            k._sqlite3_value_type = c.da;
            k._sqlite3_result_blob = c.ea;
            k._sqlite3_result_double = c.fa;
            k._sqlite3_result_error = c.ga;
            k._sqlite3_result_int = c.ha;
            k._sqlite3_result_int64 = c.ia;
            k._sqlite3_result_null = c.ja;
            k._sqlite3_result_text = c.ka;
            k._sqlite3_aggregate_context = c.la;
            k._sqlite3_column_count = c.ma;
            k._sqlite3_data_count = c.na;
            k._sqlite3_column_blob = c.oa;
            k._sqlite3_column_bytes = c.pa;
            k._sqlite3_column_double = c.qa;
            k._sqlite3_bind_blob = c.ra;
            k._sqlite3_bind_double = c.sa;
            k._sqlite3_bind_int = c.ta;
            k._sqlite3_bind_text = c.ua;
            k._sqlite3_bind_parameter_index = c.va;
            k._sqlite3_sql = c.wa;
            k._sqlite3_normalized_sql = c.xa;
            k._sqlite3_changes = c.ya;
            k._sqlite3_close_v2 = c.za;
            k._sqlite3_create_function_v2 = c.Aa;
            k._sqlite3_update_hook = c.Ba;
            k._sqlite3_open = c.Ca;
            da = k._malloc = c.Da;
            ea = k._free = c.Ea;
            k._RegisterExtensionFunctions = c.Fa;
            Bb = c.Ga;
            Wc = c.Ha;
            ra = c.Ia;
            y = c.Ja;
            pa = c.Ka;
            La = c.M;
            Z = c.O;
            Ka();
            J--;
            k.monitorRunDependencies?.(J);
            0 == J && Xa && (c = Xa, Xa = null, c());
            return Zc;
          }
          J++;
          k.monitorRunDependencies?.(J);
          var b = { a: Xc };
          if (k.instantiateWasm)
            return new Promise((c) => {
              k.instantiateWasm(b, (d, e) => {
                c(a(d, e));
              });
            });
          Na ??= k.locateFile ? k.locateFile("sql-wasm.wasm", za) : za + "sql-wasm.wasm";
          return a((await Ra(b)).instance);
        })();
        Yc();
        return Module;
      });
      return initSqlJsPromise;
    };
    if (typeof exports2 === "object" && typeof module2 === "object") {
      module2.exports = initSqlJs2;
      module2.exports.default = initSqlJs2;
    } else if (typeof define === "function" && define["amd"]) {
      define([], function() {
        return initSqlJs2;
      });
    } else if (typeof exports2 === "object") {
      exports2["Module"] = initSqlJs2;
    }
  }
});

// node_modules/node-cron/src/task.js
var require_task = __commonJS({
  "node_modules/node-cron/src/task.js"(exports2, module2) {
    "use strict";
    var EventEmitter4 = require("events");
    var Task = class extends EventEmitter4 {
      constructor(execution) {
        super();
        if (typeof execution !== "function") {
          throw "execution must be a function";
        }
        this._execution = execution;
      }
      execute(now) {
        let exec;
        try {
          exec = this._execution(now);
        } catch (error) {
          return this.emit("task-failed", error);
        }
        if (exec instanceof Promise) {
          return exec.then(() => this.emit("task-finished")).catch((error) => this.emit("task-failed", error));
        } else {
          this.emit("task-finished");
          return exec;
        }
      }
    };
    module2.exports = Task;
  }
});

// node_modules/node-cron/src/convert-expression/month-names-conversion.js
var require_month_names_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/month-names-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
      ];
      const shortMonths = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec"
      ];
      function convertMonthName(expression, items) {
        for (let i = 0; i < items.length; i++) {
          expression = expression.replace(new RegExp(items[i], "gi"), parseInt(i, 10) + 1);
        }
        return expression;
      }
      function interprete(monthExpression) {
        monthExpression = convertMonthName(monthExpression, months);
        monthExpression = convertMonthName(monthExpression, shortMonths);
        return monthExpression;
      }
      return interprete;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/week-day-names-conversion.js
var require_week_day_names_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/week-day-names-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      const weekDays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];
      const shortWeekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      function convertWeekDayName(expression, items) {
        for (let i = 0; i < items.length; i++) {
          expression = expression.replace(new RegExp(items[i], "gi"), parseInt(i, 10));
        }
        return expression;
      }
      function convertWeekDays(expression) {
        expression = expression.replace("7", "0");
        expression = convertWeekDayName(expression, weekDays);
        return convertWeekDayName(expression, shortWeekDays);
      }
      return convertWeekDays;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/asterisk-to-range-conversion.js
var require_asterisk_to_range_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/asterisk-to-range-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function convertAsterisk(expression, replecement) {
        if (expression.indexOf("*") !== -1) {
          return expression.replace("*", replecement);
        }
        return expression;
      }
      function convertAsterisksToRanges(expressions) {
        expressions[0] = convertAsterisk(expressions[0], "0-59");
        expressions[1] = convertAsterisk(expressions[1], "0-59");
        expressions[2] = convertAsterisk(expressions[2], "0-23");
        expressions[3] = convertAsterisk(expressions[3], "1-31");
        expressions[4] = convertAsterisk(expressions[4], "1-12");
        expressions[5] = convertAsterisk(expressions[5], "0-6");
        return expressions;
      }
      return convertAsterisksToRanges;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/range-conversion.js
var require_range_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/range-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function replaceWithRange(expression, text, init, end) {
        const numbers = [];
        let last = parseInt(end);
        let first = parseInt(init);
        if (first > last) {
          last = parseInt(init);
          first = parseInt(end);
        }
        for (let i = first; i <= last; i++) {
          numbers.push(i);
        }
        return expression.replace(new RegExp(text, "i"), numbers.join());
      }
      function convertRange(expression) {
        const rangeRegEx = /(\d+)-(\d+)/;
        let match = rangeRegEx.exec(expression);
        while (match !== null && match.length > 0) {
          expression = replaceWithRange(expression, match[0], match[1], match[2]);
          match = rangeRegEx.exec(expression);
        }
        return expression;
      }
      function convertAllRanges(expressions) {
        for (let i = 0; i < expressions.length; i++) {
          expressions[i] = convertRange(expressions[i]);
        }
        return expressions;
      }
      return convertAllRanges;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/step-values-conversion.js
var require_step_values_conversion = __commonJS({
  "node_modules/node-cron/src/convert-expression/step-values-conversion.js"(exports2, module2) {
    "use strict";
    module2.exports = /* @__PURE__ */ (() => {
      function convertSteps(expressions) {
        var stepValuePattern = /^(.+)\/(\w+)$/;
        for (var i = 0; i < expressions.length; i++) {
          var match = stepValuePattern.exec(expressions[i]);
          var isStepValue = match !== null && match.length > 0;
          if (isStepValue) {
            var baseDivider = match[2];
            if (isNaN(baseDivider)) {
              throw baseDivider + " is not a valid step value";
            }
            var values = match[1].split(",");
            var stepValues = [];
            var divider = parseInt(baseDivider, 10);
            for (var j = 0; j <= values.length; j++) {
              var value = parseInt(values[j], 10);
              if (value % divider === 0) {
                stepValues.push(value);
              }
            }
            expressions[i] = stepValues.join(",");
          }
        }
        return expressions;
      }
      return convertSteps;
    })();
  }
});

// node_modules/node-cron/src/convert-expression/index.js
var require_convert_expression = __commonJS({
  "node_modules/node-cron/src/convert-expression/index.js"(exports2, module2) {
    "use strict";
    var monthNamesConversion = require_month_names_conversion();
    var weekDayNamesConversion = require_week_day_names_conversion();
    var convertAsterisksToRanges = require_asterisk_to_range_conversion();
    var convertRanges = require_range_conversion();
    var convertSteps = require_step_values_conversion();
    module2.exports = /* @__PURE__ */ (() => {
      function appendSeccondExpression(expressions) {
        if (expressions.length === 5) {
          return ["0"].concat(expressions);
        }
        return expressions;
      }
      function removeSpaces(str) {
        return str.replace(/\s{2,}/g, " ").trim();
      }
      function normalizeIntegers(expressions) {
        for (let i = 0; i < expressions.length; i++) {
          const numbers = expressions[i].split(",");
          for (let j = 0; j < numbers.length; j++) {
            numbers[j] = parseInt(numbers[j]);
          }
          expressions[i] = numbers;
        }
        return expressions;
      }
      function interprete(expression) {
        let expressions = removeSpaces(expression).split(" ");
        expressions = appendSeccondExpression(expressions);
        expressions[4] = monthNamesConversion(expressions[4]);
        expressions[5] = weekDayNamesConversion(expressions[5]);
        expressions = convertAsterisksToRanges(expressions);
        expressions = convertRanges(expressions);
        expressions = convertSteps(expressions);
        expressions = normalizeIntegers(expressions);
        return expressions.join(" ");
      }
      return interprete;
    })();
  }
});

// node_modules/node-cron/src/pattern-validation.js
var require_pattern_validation = __commonJS({
  "node_modules/node-cron/src/pattern-validation.js"(exports2, module2) {
    "use strict";
    var convertExpression = require_convert_expression();
    var validationRegex = /^(?:\d+|\*|\*\/\d+)$/;
    function isValidExpression(expression, min, max) {
      const options = expression.split(",");
      for (const option of options) {
        const optionAsInt = parseInt(option, 10);
        if (!Number.isNaN(optionAsInt) && (optionAsInt < min || optionAsInt > max) || !validationRegex.test(option))
          return false;
      }
      return true;
    }
    function isInvalidSecond(expression) {
      return !isValidExpression(expression, 0, 59);
    }
    function isInvalidMinute(expression) {
      return !isValidExpression(expression, 0, 59);
    }
    function isInvalidHour(expression) {
      return !isValidExpression(expression, 0, 23);
    }
    function isInvalidDayOfMonth(expression) {
      return !isValidExpression(expression, 1, 31);
    }
    function isInvalidMonth(expression) {
      return !isValidExpression(expression, 1, 12);
    }
    function isInvalidWeekDay(expression) {
      return !isValidExpression(expression, 0, 7);
    }
    function validateFields(patterns, executablePatterns) {
      if (isInvalidSecond(executablePatterns[0]))
        throw new Error(`${patterns[0]} is a invalid expression for second`);
      if (isInvalidMinute(executablePatterns[1]))
        throw new Error(`${patterns[1]} is a invalid expression for minute`);
      if (isInvalidHour(executablePatterns[2]))
        throw new Error(`${patterns[2]} is a invalid expression for hour`);
      if (isInvalidDayOfMonth(executablePatterns[3]))
        throw new Error(
          `${patterns[3]} is a invalid expression for day of month`
        );
      if (isInvalidMonth(executablePatterns[4]))
        throw new Error(`${patterns[4]} is a invalid expression for month`);
      if (isInvalidWeekDay(executablePatterns[5]))
        throw new Error(`${patterns[5]} is a invalid expression for week day`);
    }
    function validate3(pattern) {
      if (typeof pattern !== "string")
        throw new TypeError("pattern must be a string!");
      const patterns = pattern.split(" ");
      const executablePatterns = convertExpression(pattern).split(" ");
      if (patterns.length === 5)
        patterns.unshift("0");
      validateFields(patterns, executablePatterns);
    }
    module2.exports = validate3;
  }
});

// node_modules/node-cron/src/time-matcher.js
var require_time_matcher = __commonJS({
  "node_modules/node-cron/src/time-matcher.js"(exports2, module2) {
    var validatePattern = require_pattern_validation();
    var convertExpression = require_convert_expression();
    function matchPattern(pattern, value) {
      if (pattern.indexOf(",") !== -1) {
        const patterns = pattern.split(",");
        return patterns.indexOf(value.toString()) !== -1;
      }
      return pattern === value.toString();
    }
    var TimeMatcher = class {
      constructor(pattern, timezone) {
        validatePattern(pattern);
        this.pattern = convertExpression(pattern);
        this.timezone = timezone;
        this.expressions = this.pattern.split(" ");
        this.dtf = this.timezone ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
          fractionalSecondDigits: 3,
          timeZone: this.timezone
        }) : null;
      }
      match(date) {
        date = this.apply(date);
        const runOnSecond = matchPattern(this.expressions[0], date.getSeconds());
        const runOnMinute = matchPattern(this.expressions[1], date.getMinutes());
        const runOnHour = matchPattern(this.expressions[2], date.getHours());
        const runOnDay = matchPattern(this.expressions[3], date.getDate());
        const runOnMonth = matchPattern(this.expressions[4], date.getMonth() + 1);
        const runOnWeekDay = matchPattern(this.expressions[5], date.getDay());
        return runOnSecond && runOnMinute && runOnHour && runOnDay && runOnMonth && runOnWeekDay;
      }
      apply(date) {
        if (this.dtf) {
          return new Date(this.dtf.format(date));
        }
        return date;
      }
    };
    module2.exports = TimeMatcher;
  }
});

// node_modules/node-cron/src/scheduler.js
var require_scheduler = __commonJS({
  "node_modules/node-cron/src/scheduler.js"(exports2, module2) {
    "use strict";
    var EventEmitter4 = require("events");
    var TimeMatcher = require_time_matcher();
    var Scheduler2 = class extends EventEmitter4 {
      constructor(pattern, timezone, autorecover) {
        super();
        this.timeMatcher = new TimeMatcher(pattern, timezone);
        this.autorecover = autorecover;
      }
      start() {
        this.stop();
        let lastCheck = process.hrtime();
        let lastExecution = this.timeMatcher.apply(/* @__PURE__ */ new Date());
        const matchTime = () => {
          const delay = 1e3;
          const elapsedTime = process.hrtime(lastCheck);
          const elapsedMs = (elapsedTime[0] * 1e9 + elapsedTime[1]) / 1e6;
          const missedExecutions = Math.floor(elapsedMs / 1e3);
          for (let i = missedExecutions; i >= 0; i--) {
            const date = new Date((/* @__PURE__ */ new Date()).getTime() - i * 1e3);
            let date_tmp = this.timeMatcher.apply(date);
            if (lastExecution.getTime() < date_tmp.getTime() && (i === 0 || this.autorecover) && this.timeMatcher.match(date)) {
              this.emit("scheduled-time-matched", date_tmp);
              date_tmp.setMilliseconds(0);
              lastExecution = date_tmp;
            }
          }
          lastCheck = process.hrtime();
          this.timeout = setTimeout(matchTime, delay);
        };
        matchTime();
      }
      stop() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = null;
      }
    };
    module2.exports = Scheduler2;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/rng.js
function rng2() {
  if (poolPtr2 > rnds8Pool2.length - 16) {
    import_crypto3.default.randomFillSync(rnds8Pool2);
    poolPtr2 = 0;
  }
  return rnds8Pool2.slice(poolPtr2, poolPtr2 += 16);
}
var import_crypto3, rnds8Pool2, poolPtr2;
var init_rng = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/rng.js"() {
    import_crypto3 = __toESM(require("crypto"));
    rnds8Pool2 = new Uint8Array(256);
    poolPtr2 = rnds8Pool2.length;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/stringify.js
function stringify(arr, offset = 0) {
  const uuid = (byteToHex2[arr[offset + 0]] + byteToHex2[arr[offset + 1]] + byteToHex2[arr[offset + 2]] + byteToHex2[arr[offset + 3]] + "-" + byteToHex2[arr[offset + 4]] + byteToHex2[arr[offset + 5]] + "-" + byteToHex2[arr[offset + 6]] + byteToHex2[arr[offset + 7]] + "-" + byteToHex2[arr[offset + 8]] + byteToHex2[arr[offset + 9]] + "-" + byteToHex2[arr[offset + 10]] + byteToHex2[arr[offset + 11]] + byteToHex2[arr[offset + 12]] + byteToHex2[arr[offset + 13]] + byteToHex2[arr[offset + 14]] + byteToHex2[arr[offset + 15]]).toLowerCase();
  if (!validate_default(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var byteToHex2, stringify_default;
var init_stringify = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/stringify.js"() {
    init_validate();
    byteToHex2 = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex2.push((i + 256).toString(16).substr(1));
    }
    stringify_default = stringify;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/v1.js
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || rng2)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || stringify_default(b);
}
var _nodeId, _clockseq, _lastMSecs, _lastNSecs, v1_default;
var init_v1 = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/v1.js"() {
    init_rng();
    init_stringify();
    _lastMSecs = 0;
    _lastNSecs = 0;
    v1_default = v1;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35_default(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (namespace.length !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return stringify_default(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/md5.js
function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto4.default.createHash("md5").update(bytes).digest();
}
var import_crypto4, md5_default;
var init_md5 = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/md5.js"() {
    import_crypto4 = __toESM(require("crypto"));
    md5_default = md5;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/v3.js
var v3, v3_default;
var init_v3 = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35_default("v3", 48, md5_default);
    v3_default = v3;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/v4.js
function v42(options, buf, offset) {
  options = options || {};
  const rnds = options.random || (options.rng || rng2)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return stringify_default(rnds);
}
var v4_default2;
var init_v4 = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/v4.js"() {
    init_rng();
    init_stringify();
    v4_default2 = v42;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/sha1.js
function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === "string") {
    bytes = Buffer.from(bytes, "utf8");
  }
  return import_crypto5.default.createHash("sha1").update(bytes).digest();
}
var import_crypto5, sha1_default;
var init_sha1 = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/sha1.js"() {
    import_crypto5 = __toESM(require("crypto"));
    sha1_default = sha1;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/v5.js
var v5, v5_default;
var init_v5 = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35_default("v5", 80, sha1_default);
    v5_default = v5;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/nil.js
var nil_default;
var init_nil = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/nil.js"() {
    nil_default = "00000000-0000-0000-0000-000000000000";
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/version.js
function version(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.substr(14, 1), 16);
}
var version_default;
var init_version = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/version.js"() {
    init_validate();
    version_default = version;
  }
});

// node_modules/node-cron/node_modules/uuid/dist/esm-node/index.js
var esm_node_exports = {};
__export(esm_node_exports, {
  NIL: () => nil_default,
  parse: () => parse_default,
  stringify: () => stringify_default,
  v1: () => v1_default,
  v3: () => v3_default,
  v4: () => v4_default2,
  v5: () => v5_default,
  validate: () => validate_default,
  version: () => version_default
});
var init_esm_node = __esm({
  "node_modules/node-cron/node_modules/uuid/dist/esm-node/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/node-cron/src/scheduled-task.js
var require_scheduled_task = __commonJS({
  "node_modules/node-cron/src/scheduled-task.js"(exports2, module2) {
    "use strict";
    var EventEmitter4 = require("events");
    var Task = require_task();
    var Scheduler2 = require_scheduler();
    var uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var ScheduledTask = class extends EventEmitter4 {
      constructor(cronExpression, func, options) {
        super();
        if (!options) {
          options = {
            scheduled: true,
            recoverMissedExecutions: false
          };
        }
        this.options = options;
        this.options.name = this.options.name || uuid.v4();
        this._task = new Task(func);
        this._scheduler = new Scheduler2(cronExpression, options.timezone, options.recoverMissedExecutions);
        this._scheduler.on("scheduled-time-matched", (now) => {
          this.now(now);
        });
        if (options.scheduled !== false) {
          this._scheduler.start();
        }
        if (options.runOnInit === true) {
          this.now("init");
        }
      }
      now(now = "manual") {
        let result = this._task.execute(now);
        this.emit("task-done", result);
      }
      start() {
        this._scheduler.start();
      }
      stop() {
        this._scheduler.stop();
      }
    };
    module2.exports = ScheduledTask;
  }
});

// node_modules/node-cron/src/background-scheduled-task/index.js
var require_background_scheduled_task = __commonJS({
  "node_modules/node-cron/src/background-scheduled-task/index.js"(exports2, module2) {
    var EventEmitter4 = require("events");
    var path3 = require("path");
    var { fork } = require("child_process");
    var uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
    var daemonPath = `${__dirname}/daemon.js`;
    var BackgroundScheduledTask = class extends EventEmitter4 {
      constructor(cronExpression, taskPath, options) {
        super();
        if (!options) {
          options = {
            scheduled: true,
            recoverMissedExecutions: false
          };
        }
        this.cronExpression = cronExpression;
        this.taskPath = taskPath;
        this.options = options;
        this.options.name = this.options.name || uuid.v4();
        if (options.scheduled) {
          this.start();
        }
      }
      start() {
        this.stop();
        this.forkProcess = fork(daemonPath);
        this.forkProcess.on("message", (message) => {
          switch (message.type) {
            case "task-done":
              this.emit("task-done", message.result);
              break;
          }
        });
        let options = this.options;
        options.scheduled = true;
        this.forkProcess.send({
          type: "register",
          path: path3.resolve(this.taskPath),
          cron: this.cronExpression,
          options
        });
      }
      stop() {
        if (this.forkProcess) {
          this.forkProcess.kill();
        }
      }
      pid() {
        if (this.forkProcess) {
          return this.forkProcess.pid;
        }
      }
      isRunning() {
        return !this.forkProcess.killed;
      }
    };
    module2.exports = BackgroundScheduledTask;
  }
});

// node_modules/node-cron/src/storage.js
var require_storage = __commonJS({
  "node_modules/node-cron/src/storage.js"(exports2, module2) {
    module2.exports = (() => {
      if (!global.scheduledTasks) {
        global.scheduledTasks = /* @__PURE__ */ new Map();
      }
      return {
        save: (task) => {
          if (!task.options) {
            const uuid = (init_esm_node(), __toCommonJS(esm_node_exports));
            task.options = {};
            task.options.name = uuid.v4();
          }
          global.scheduledTasks.set(task.options.name, task);
        },
        getTasks: () => {
          return global.scheduledTasks;
        }
      };
    })();
  }
});

// node_modules/node-cron/src/node-cron.js
var require_node_cron = __commonJS({
  "node_modules/node-cron/src/node-cron.js"(exports2, module2) {
    "use strict";
    var ScheduledTask = require_scheduled_task();
    var BackgroundScheduledTask = require_background_scheduled_task();
    var validation = require_pattern_validation();
    var storage = require_storage();
    function schedule2(expression, func, options) {
      const task = createTask(expression, func, options);
      storage.save(task);
      return task;
    }
    function createTask(expression, func, options) {
      if (typeof func === "string")
        return new BackgroundScheduledTask(expression, func, options);
      return new ScheduledTask(expression, func, options);
    }
    function validate3(expression) {
      try {
        validation(expression);
        return true;
      } catch (_) {
        return false;
      }
    }
    function getTasks() {
      return storage.getTasks();
    }
    module2.exports = { schedule: schedule2, validate: validate3, getTasks };
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode12 = __toESM(require("vscode"));

// src/views/sidebarProvider.ts
var vscode = __toESM(require("vscode"));
var RecordingLibraryProvider = class {
  constructor(db) {
    this.db = db;
  }
  _onDidChangeTreeData = new vscode.EventEmitter();
  onDidChangeTreeData = this._onDidChangeTreeData.event;
  refresh() {
    this._onDidChangeTreeData.fire();
  }
  getTreeItem(element) {
    return element;
  }
  getChildren(element) {
    if (element) {
      if (element.recordingId) {
        const actions = this.db.getActions(element.recordingId);
        return actions.map((action, i) => {
          const item = new RecordingTreeItem(
            `${i + 1}. ${action.action_type} \u2014 ${action.url || ""}`,
            vscode.TreeItemCollapsibleState.None
          );
          item.description = `${action.timestamp_ms}ms`;
          item.iconPath = new vscode.ThemeIcon("debug-step-over");
          return item;
        });
      }
      return [];
    }
    const recordings = this.db.getAllRecordings();
    if (recordings.length === 0) {
      return [new RecordingTreeItem("No recordings yet. Click + to start.", vscode.TreeItemCollapsibleState.None)];
    }
    return recordings.map((rec) => {
      const item = new RecordingTreeItem(
        rec.name,
        vscode.TreeItemCollapsibleState.Collapsed
      );
      item.recordingId = rec.id;
      item.contextValue = "recording";
      item.description = `${rec.action_count} actions \xB7 ${new Date(rec.created_at).toLocaleDateString()}`;
      item.tooltip = `URL: ${rec.url}
Tags: ${rec.tags || "none"}
Duration: ${rec.duration_ms}ms`;
      item.iconPath = new vscode.ThemeIcon("file-media");
      return item;
    });
  }
};
var RecordingTreeItem = class extends vscode.TreeItem {
  recordingId;
};

// src/views/executionsProvider.ts
var vscode2 = __toESM(require("vscode"));
var ExecutionsProvider = class {
  constructor(db) {
    this.db = db;
  }
  _onDidChangeTreeData = new vscode2.EventEmitter();
  onDidChangeTreeData = this._onDidChangeTreeData.event;
  refresh() {
    this._onDidChangeTreeData.fire();
  }
  getTreeItem(element) {
    return element;
  }
  getChildren() {
    const executions = this.db.getRecentExecutions(20);
    if (executions.length === 0) {
      return [new vscode2.TreeItem("No executions yet.")];
    }
    return executions.map((exec) => {
      const recording = this.db.getRecording(exec.recording_id);
      const statusIcon = exec.status === "pass" ? "pass" : exec.status === "fail" ? "error" : "warning";
      const item = new vscode2.TreeItem(
        recording?.name || exec.recording_id,
        vscode2.TreeItemCollapsibleState.None
      );
      item.description = `${exec.status} \xB7 ${exec.trigger} \xB7 ${new Date(exec.started_at).toLocaleString()}`;
      item.iconPath = new vscode2.ThemeIcon(`testing-${statusIcon}-icon`);
      item.tooltip = exec.error_message ? `Failed at step ${exec.failure_step}: ${exec.error_message}` : `Completed in ${exec.finished_at ? new Date(exec.finished_at).getTime() - new Date(exec.started_at).getTime() : "?"}ms`;
      return item;
    });
  }
};

// src/views/schedulesProvider.ts
var vscode3 = __toESM(require("vscode"));
var SchedulesProvider = class {
  constructor(db) {
    this.db = db;
  }
  _onDidChangeTreeData = new vscode3.EventEmitter();
  onDidChangeTreeData = this._onDidChangeTreeData.event;
  refresh() {
    this._onDidChangeTreeData.fire();
  }
  getTreeItem(element) {
    return element;
  }
  getChildren() {
    const schedules = this.db.getAllSchedules();
    if (schedules.length === 0) {
      return [new vscode3.TreeItem("No schedules configured.")];
    }
    return schedules.map((sched) => {
      const recording = this.db.getRecording(sched.recording_id);
      const item = new vscode3.TreeItem(
        recording?.name || sched.recording_id,
        vscode3.TreeItemCollapsibleState.None
      );
      item.description = `${sched.cron_expression} \xB7 ${sched.enabled ? "Active" : "Paused"}`;
      item.iconPath = new vscode3.ThemeIcon(sched.enabled ? "clock" : "debug-pause");
      item.tooltip = `Next run: ${sched.next_run || "N/A"}
Last run: ${sched.last_run || "Never"}`;
      return item;
    });
  }
};

// src/views/recordingPanel.ts
var vscode4 = __toESM(require("vscode"));
var RecordingPanelManager = class {
  constructor(context, recorder2) {
    this.context = context;
    this.recorder = recorder2;
  }
  panel;
  async show() {
    if (this.panel) {
      this.panel.reveal(vscode4.ViewColumn.One);
      return;
    }
    this.panel = vscode4.window.createWebviewPanel(
      "playwrightRpa.recording",
      "Playwright RPA \u2014 Record",
      vscode4.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode4.Uri.joinPath(this.context.extensionUri, "out", "webview")
        ]
      }
    );
    this.panel.webview.html = this.getHtml(this.panel.webview);
    this.panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case "startRecording": {
          const { url, browser, saveAuth } = message.payload;
          await this.recorder.start(url, browser, saveAuth);
          this.recorder.onAction((action) => {
            this.panel?.webview.postMessage({
              type: "recordedAction",
              payload: action
            });
          });
          break;
        }
        case "stopRecording": {
          const recording = await this.recorder.stop();
          this.panel?.webview.postMessage({
            type: "recordingStopped",
            payload: recording
          });
          break;
        }
      }
    });
    this.panel.onDidDispose(() => {
      this.panel = void 0;
    });
  }
  getHtml(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode4.Uri.joinPath(this.context.extensionUri, "out", "webview", "webview.js")
    );
    const nonce = getNonce();
    return (
      /* html */
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src ${webview.cspSource} 'unsafe-inline';">
  <title>Playwright RPA \u2014 Record</title>
</head>
<body>
  <div id="root" data-panel="recording"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`
    );
  }
};
function getNonce() {
  let text = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

// src/views/playbackPanel.ts
var vscode5 = __toESM(require("vscode"));
var PlaybackPanelManager = class {
  constructor(context, player2) {
    this.context = context;
    this.player = player2;
  }
  panel;
  async show(recordingId) {
    if (this.panel) {
      this.panel.reveal(vscode5.ViewColumn.One);
      if (recordingId) {
        this.panel.webview.postMessage({
          type: "loadRecording",
          payload: { recordingId }
        });
      }
      return;
    }
    this.panel = vscode5.window.createWebviewPanel(
      "playwrightRpa.playback",
      "Playwright RPA \u2014 Playback",
      vscode5.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode5.Uri.joinPath(this.context.extensionUri, "out", "webview")
        ]
      }
    );
    this.panel.webview.html = this.getHtml(this.panel.webview);
    if (recordingId) {
      setTimeout(() => {
        this.panel?.webview.postMessage({
          type: "loadRecording",
          payload: { recordingId }
        });
      }, 500);
    }
    this.panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case "startPlayback": {
          const { recordingId: id, options } = message.payload;
          try {
            await this.player.play(id, options, (stepResult) => {
              this.panel?.webview.postMessage({
                type: "stepCompleted",
                payload: stepResult
              });
            });
            this.panel?.webview.postMessage({ type: "playbackCompleted" });
          } catch (err) {
            this.panel?.webview.postMessage({
              type: "playbackError",
              payload: { error: err.message }
            });
          }
          break;
        }
        case "stopPlayback": {
          await this.player.stop();
          break;
        }
      }
    });
    this.panel.onDidDispose(() => {
      this.panel = void 0;
    });
  }
  getHtml(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode5.Uri.joinPath(this.context.extensionUri, "out", "webview", "webview.js")
    );
    const nonce = getNonce2();
    return (
      /* html */
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src ${webview.cspSource} 'unsafe-inline';">
  <title>Playwright RPA \u2014 Playback</title>
</head>
<body>
  <div id="root" data-panel="playback"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`
    );
  }
};
function getNonce2() {
  let text = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

// src/views/monitoringPanel.ts
var vscode6 = __toESM(require("vscode"));
var MonitoringPanelManager = class {
  constructor(context, db) {
    this.context = context;
    this.db = db;
  }
  panel;
  async show() {
    if (this.panel) {
      this.panel.reveal(vscode6.ViewColumn.One);
      return;
    }
    this.panel = vscode6.window.createWebviewPanel(
      "playwrightRpa.monitoring",
      "Playwright RPA \u2014 Monitoring",
      vscode6.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode6.Uri.joinPath(this.context.extensionUri, "out", "webview")
        ]
      }
    );
    this.panel.webview.html = this.getHtml(this.panel.webview);
    this.panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case "getExecutions": {
          const executions = this.db.getRecentExecutions(50);
          this.panel?.webview.postMessage({
            type: "executionsData",
            payload: executions
          });
          break;
        }
        case "getSchedules": {
          const schedules = this.db.getAllSchedules();
          this.panel?.webview.postMessage({
            type: "schedulesData",
            payload: schedules
          });
          break;
        }
        case "addSchedule": {
          const { recordingId, cronExpression } = message.payload;
          this.db.createSchedule(recordingId, cronExpression);
          const schedules = this.db.getAllSchedules();
          this.panel?.webview.postMessage({
            type: "schedulesData",
            payload: schedules
          });
          break;
        }
        case "toggleSchedule": {
          const { scheduleId, enabled } = message.payload;
          this.db.updateSchedule(scheduleId, { enabled });
          break;
        }
        case "deleteSchedule": {
          this.db.deleteSchedule(message.payload.scheduleId);
          break;
        }
      }
    });
    this.panel.onDidDispose(() => {
      this.panel = void 0;
    });
  }
  getHtml(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode6.Uri.joinPath(this.context.extensionUri, "out", "webview", "webview.js")
    );
    const nonce = getNonce3();
    return (
      /* html */
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src ${webview.cspSource} 'unsafe-inline';">
  <title>Playwright RPA \u2014 Monitoring</title>
</head>
<body>
  <div id="root" data-panel="monitoring"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`
    );
  }
};
function getNonce3() {
  let text = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

// src/storage/database.ts
var import_sql = __toESM(require_sql_wasm());
var path = __toESM(require("path"));
var fs = __toESM(require("fs"));
function rowToObject(columns, values) {
  const obj = {};
  for (let i = 0; i < columns.length; i++) {
    obj[columns[i]] = values[i];
  }
  return obj;
}
function queryAll(db, sql, params) {
  const stmt = db.prepare(sql);
  if (params)
    stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(rowToObject(stmt.getColumnNames(), stmt.get()));
  }
  stmt.free();
  return results;
}
function queryOne(db, sql, params) {
  const rows = queryAll(db, sql, params);
  return rows.length > 0 ? rows[0] : null;
}
var Database = class {
  db;
  dbPath;
  ready;
  constructor(storagePath) {
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }
    this.dbPath = path.join(storagePath, "playwright-rpa.db");
    this.ready = this.initialize();
  }
  async initialize() {
    const SQL = await (0, import_sql.default)();
    if (fs.existsSync(this.dbPath)) {
      const buffer = fs.readFileSync(this.dbPath);
      this.db = new SQL.Database(buffer);
    } else {
      this.db = new SQL.Database();
    }
    this.createTables();
    this.persist();
  }
  /** Wait for async init to complete — call before first DB access */
  async waitReady() {
    await this.ready;
  }
  persist() {
    const data = this.db.export();
    fs.writeFileSync(this.dbPath, Buffer.from(data));
  }
  createTables() {
    this.db.run(`
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
    `);
  }
  // --- Recordings ---
  createRecording(recording) {
    this.db.run(
      `INSERT INTO recordings (id, name, url, created_at, updated_at, tags, description, action_count, duration_ms, auth_state_path)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recording.id,
        recording.name,
        recording.url,
        recording.created_at,
        recording.updated_at,
        recording.tags,
        recording.description,
        recording.action_count,
        recording.duration_ms,
        recording.auth_state_path
      ]
    );
    this.persist();
  }
  getRecording(id) {
    return queryOne(this.db, "SELECT * FROM recordings WHERE id = ?", [id]);
  }
  getAllRecordings() {
    return queryAll(this.db, "SELECT * FROM recordings ORDER BY created_at DESC");
  }
  updateRecording(id, updates) {
    const keys = Object.keys(updates).filter((k) => k !== "id");
    if (keys.length === 0)
      return;
    const setClause = keys.map((k) => `${k} = ?`).join(", ");
    const values = keys.map((k) => updates[k]);
    this.db.run(`UPDATE recordings SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }
  deleteRecording(id) {
    this.db.run("DELETE FROM actions WHERE recording_id = ?", [id]);
    this.db.run("DELETE FROM executions WHERE recording_id = ?", [id]);
    this.db.run("DELETE FROM healed_selectors WHERE recording_id = ?", [id]);
    this.db.run("DELETE FROM schedules WHERE recording_id = ?", [id]);
    this.db.run("DELETE FROM jobs WHERE recording_id = ?", [id]);
    this.db.run("DELETE FROM recordings WHERE id = ?", [id]);
    this.persist();
  }
  // --- Actions ---
  createAction(action) {
    this.db.run(
      `INSERT INTO actions (id, recording_id, step_index, action_type, url, locators, screenshot_path, timestamp_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        action.id,
        action.recording_id,
        action.step_index,
        action.action_type,
        action.url,
        action.locators,
        action.screenshot_path,
        action.timestamp_ms
      ]
    );
    this.persist();
  }
  getActions(recordingId) {
    return queryAll(this.db, "SELECT * FROM actions WHERE recording_id = ? ORDER BY step_index", [recordingId]);
  }
  // --- Executions ---
  createExecution(execution) {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO executions (id, recording_id, started_at, status, trigger_type)
       VALUES (?, ?, ?, ?, ?)`,
      [id, execution.recording_id, execution.started_at, execution.status, execution.trigger]
    );
    this.persist();
    return id;
  }
  updateExecution(id, updates) {
    const keys = Object.keys(updates).filter((k) => k !== "id");
    if (keys.length === 0)
      return;
    const setClause = keys.map((k) => `${k} = ?`).join(", ");
    const values = keys.map((k) => updates[k]);
    this.db.run(`UPDATE executions SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }
  getRecentExecutions(limit) {
    return queryAll(this.db, "SELECT * FROM executions ORDER BY started_at DESC LIMIT ?", [limit]);
  }
  // --- Healed Selectors ---
  getHealedSelector(recordingId, stepIndex) {
    return queryOne(
      this.db,
      "SELECT * FROM healed_selectors WHERE recording_id = ? AND step_index = ? ORDER BY success_count DESC LIMIT 1",
      [recordingId, stepIndex]
    );
  }
  createHealedSelector(data) {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO healed_selectors (id, recording_id, step_index, original_locator, healed_locator, strategy_used, healed_at, success_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      [id, data.recording_id, data.step_index, data.original_locator, data.healed_locator, data.strategy_used, (/* @__PURE__ */ new Date()).toISOString()]
    );
    this.persist();
  }
  incrementHealedSelectorSuccess(id) {
    this.db.run("UPDATE healed_selectors SET success_count = success_count + 1 WHERE id = ?", [id]);
    this.persist();
  }
  // --- Schedules ---
  getAllSchedules() {
    return queryAll(this.db, "SELECT * FROM schedules ORDER BY recording_id").map((row) => ({
      ...row,
      enabled: !!row.enabled
    }));
  }
  getEnabledSchedules() {
    return queryAll(this.db, "SELECT * FROM schedules WHERE enabled = 1").map((row) => ({
      ...row,
      enabled: true
    }));
  }
  createSchedule(recordingId, cronExpression) {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO schedules (id, recording_id, cron_expression, enabled) VALUES (?, ?, ?, 1)`,
      [id, recordingId, cronExpression]
    );
    this.persist();
    return id;
  }
  updateSchedule(id, updates) {
    const keys = Object.keys(updates).filter((k) => k !== "id");
    if (keys.length === 0)
      return;
    const setClause = keys.map((k) => {
      if (k === "enabled")
        return "enabled = ?";
      return `${k} = ?`;
    }).join(", ");
    const values = keys.map((k) => {
      if (k === "enabled")
        return updates.enabled ? 1 : 0;
      return updates[k];
    });
    this.db.run(`UPDATE schedules SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }
  deleteSchedule(id) {
    this.db.run("DELETE FROM schedules WHERE id = ?", [id]);
    this.persist();
  }
  // --- Jobs ---
  createJob(recordingId, maxAttempts = 3) {
    const id = crypto.randomUUID();
    this.db.run(
      `INSERT INTO jobs (id, recording_id, status, created_at, attempts, max_attempts) VALUES (?, ?, 'queued', ?, 0, ?)`,
      [id, recordingId, (/* @__PURE__ */ new Date()).toISOString(), maxAttempts]
    );
    this.persist();
    return id;
  }
  getNextQueuedJob() {
    return queryOne(this.db, "SELECT * FROM jobs WHERE status = 'queued' ORDER BY created_at ASC LIMIT 1");
  }
  updateJob(id, updates) {
    const keys = Object.keys(updates).filter((k) => k !== "id");
    if (keys.length === 0)
      return;
    const setClause = keys.map((k) => `${k} = ?`).join(", ");
    const values = keys.map((k) => updates[k]);
    this.db.run(`UPDATE jobs SET ${setClause} WHERE id = ?`, [...values, id]);
    this.persist();
  }
  getRunningJobCount() {
    const row = queryOne(this.db, "SELECT COUNT(*) FROM jobs WHERE status = 'running'");
    return row ? row["COUNT(*)"] : 0;
  }
  // --- Lifecycle ---
  close() {
    this.persist();
    this.db.close();
  }
};

// src/storage/fileManager.ts
var fs2 = __toESM(require("fs/promises"));
var path2 = __toESM(require("path"));
var FileManager = class {
  constructor(storagePath) {
    this.storagePath = storagePath;
    this.recordingsDir = path2.join(storagePath, "recordings");
    this.modelsDir = path2.join(storagePath, "models");
  }
  recordingsDir;
  modelsDir;
  /** Create required directories if they don't exist */
  async ensureDirectories() {
    await fs2.mkdir(this.recordingsDir, { recursive: true });
    await fs2.mkdir(this.modelsDir, { recursive: true });
  }
  /** Get the base directory for a recording's files */
  getRecordingDir(recordingId) {
    return path2.join(this.recordingsDir, recordingId);
  }
  /** Ensure a recording's directory exists */
  async ensureRecordingDir(recordingId) {
    const dir = this.getRecordingDir(recordingId);
    await fs2.mkdir(dir, { recursive: true });
    return dir;
  }
  /** Get the path where a recording's trace ZIP should be stored */
  getTracePath(recordingId) {
    return path2.join(this.getRecordingDir(recordingId), "trace.zip");
  }
  /** Get the path for a playback's trace ZIP */
  getPlaybackTracePath(recordingId, executionId) {
    return path2.join(this.getRecordingDir(recordingId), `playback-${executionId}.zip`);
  }
  /** Get the path for a step's screenshot */
  getStepScreenshotPath(recordingId, stepIndex) {
    return path2.join(this.getRecordingDir(recordingId), `step-${stepIndex}.png`);
  }
  /** Save authentication state to disk */
  async saveAuthState(recordingId, storageState) {
    const dir = await this.ensureRecordingDir(recordingId);
    const filePath = path2.join(dir, "auth-state.json");
    await fs2.writeFile(filePath, JSON.stringify(storageState, null, 2), "utf-8");
    return filePath;
  }
  /** Load authentication state from disk */
  async loadAuthState(recordingId) {
    const filePath = path2.join(this.getRecordingDir(recordingId), "auth-state.json");
    try {
      const content = await fs2.readFile(filePath, "utf-8");
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
  /** Save the raw actions JSON for a recording */
  async saveActionsJson(recordingId, actions) {
    const dir = await this.ensureRecordingDir(recordingId);
    const filePath = path2.join(dir, "actions.json");
    await fs2.writeFile(filePath, JSON.stringify(actions, null, 2), "utf-8");
  }
  /** Load the raw actions JSON for a recording */
  async loadActionsJson(recordingId) {
    const filePath = path2.join(this.getRecordingDir(recordingId), "actions.json");
    try {
      const content = await fs2.readFile(filePath, "utf-8");
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
  /** Delete all files for a recording */
  async deleteRecordingFiles(recordingId) {
    const dir = this.getRecordingDir(recordingId);
    try {
      await fs2.rm(dir, { recursive: true, force: true });
    } catch {
    }
  }
  /** Get the models directory for embedding model storage */
  getModelsDir() {
    return this.modelsDir;
  }
  /** Check if a file exists */
  async fileExists(filePath) {
    try {
      await fs2.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
  /** List all screenshot files for a recording */
  async getScreenshots(recordingId) {
    const dir = this.getRecordingDir(recordingId);
    try {
      const files = await fs2.readdir(dir);
      return files.filter((f) => f.startsWith("step-") && f.endsWith(".png")).sort((a, b) => {
        const aNum = parseInt(a.replace("step-", "").replace(".png", ""));
        const bNum = parseInt(b.replace("step-", "").replace(".png", ""));
        return aNum - bNum;
      }).map((f) => path2.join(dir, f));
    } catch {
      return [];
    }
  }
};

// src/playwright/recorder.ts
var import_playwright = require("playwright");

// node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/ai/llmRepair.ts
var vscode7 = __toESM(require("vscode"));

// src/ai/domSimplifier.ts
var DomSimplifier = class {
  MAX_DEPTH = 8;
  MAX_ELEMENTS = 200;
  MAX_TEXT_LENGTH = 80;
  MAX_ATTR_LENGTH = 60;
  /**
   * Get a simplified HTML representation of the current page.
   * Focuses on interactive elements and visible content.
   */
  async simplify(page) {
    const simplified = await page.evaluate(
      ({ maxDepth, maxElements, maxTextLen, maxAttrLen }) => {
        const SKIP_TAGS = /* @__PURE__ */ new Set([
          "script",
          "style",
          "noscript",
          "svg",
          "path",
          "circle",
          "rect",
          "line",
          "polygon",
          "polyline",
          "ellipse",
          "g",
          "defs",
          "clippath",
          "lineargradient",
          "radialgradient",
          "stop",
          "symbol",
          "use",
          "mask",
          "iframe",
          "object",
          "embed",
          "applet",
          "meta",
          "link",
          "base"
        ]);
        const KEEP_ATTRS = /* @__PURE__ */ new Set([
          "id",
          "class",
          "role",
          "aria-label",
          "aria-labelledby",
          "aria-describedby",
          "aria-expanded",
          "aria-selected",
          "aria-checked",
          "data-testid",
          "data-test",
          "name",
          "type",
          "href",
          "placeholder",
          "value",
          "title",
          "alt",
          "for",
          "action",
          "method"
        ]);
        let elementCount = 0;
        function simplifyNode(node, depth) {
          if (elementCount >= maxElements)
            return "";
          if (depth > maxDepth)
            return "...";
          if (node.nodeType === Node.TEXT_NODE) {
            const text = (node.textContent || "").trim();
            if (!text)
              return "";
            return text.substring(0, maxTextLen);
          }
          if (node.nodeType !== Node.ELEMENT_NODE)
            return "";
          const el = node;
          const tag = el.tagName.toLowerCase();
          if (SKIP_TAGS.has(tag))
            return "";
          const style = window.getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden")
            return "";
          elementCount++;
          let attrs = "";
          for (const attrName of KEEP_ATTRS) {
            const value = el.getAttribute(attrName);
            if (value !== null && value !== "") {
              const truncated = value.substring(0, maxAttrLen);
              attrs += ` ${attrName}="${truncated}"`;
            }
          }
          if (["br", "hr", "img", "input"].includes(tag)) {
            return `<${tag}${attrs}/>`;
          }
          const children = [];
          for (const child of Array.from(el.childNodes)) {
            const result = simplifyNode(child, depth + 1);
            if (result)
              children.push(result);
          }
          const inner = children.join("");
          if (!inner && !attrs)
            return "";
          return `<${tag}${attrs}>${inner}</${tag}>`;
        }
        return simplifyNode(document.body, 0);
      },
      {
        maxDepth: this.MAX_DEPTH,
        maxElements: this.MAX_ELEMENTS,
        maxTextLen: this.MAX_TEXT_LENGTH,
        maxAttrLen: this.MAX_ATTR_LENGTH
      }
    );
    if (simplified.length > 16e3) {
      return simplified.substring(0, 16e3) + "\n<!-- truncated -->";
    }
    return simplified;
  }
};

// src/ai/llmRepair.ts
var LlmRepair = class {
  domSimplifier = new DomSimplifier();
  /**
   * Ask the LLM to repair a broken selector.
   * Returns a Playwright-compatible locator string, or null if repair fails.
   */
  async repairSelector(page, locators) {
    const config = vscode7.workspace.getConfiguration("playwrightRpa");
    const provider = config.get("ai.provider", "openai");
    const model = config.get("ai.model", "gpt-4o-mini");
    const apiKey = config.get("ai.apiKey", "");
    if (!apiKey && provider !== "ollama") {
      console.warn("LLM repair: No API key configured.");
      return null;
    }
    const simplifiedDom = await this.domSimplifier.simplify(page);
    const prompt = this.buildPrompt(locators, simplifiedDom);
    let response = null;
    switch (provider) {
      case "openai":
        response = await this.callOpenAI(apiKey, model, prompt);
        break;
      case "anthropic":
        response = await this.callAnthropic(apiKey, model, prompt);
        break;
      case "ollama":
        response = await this.callOllama(model, prompt);
        break;
      default:
        console.warn(`Unknown LLM provider: ${provider}`);
        return null;
    }
    if (!response)
      return null;
    return this.extractSelector(response);
  }
  buildPrompt(locators, dom) {
    const elementDesc = [];
    if (locators.fingerprint) {
      const fp = locators.fingerprint;
      elementDesc.push(`Tag: ${fp.tag}`);
      if (fp.id)
        elementDesc.push(`ID: ${fp.id}`);
      if (fp.testId)
        elementDesc.push(`Test ID: ${fp.testId}`);
      if (fp.ariaRole)
        elementDesc.push(`ARIA Role: ${fp.ariaRole}`);
      if (fp.ariaLabel)
        elementDesc.push(`ARIA Label: ${fp.ariaLabel}`);
      if (fp.text)
        elementDesc.push(`Text: ${fp.text.substring(0, 100)}`);
      if (fp.placeholder)
        elementDesc.push(`Placeholder: ${fp.placeholder}`);
      if (fp.classes.length)
        elementDesc.push(`Classes: ${fp.classes.join(", ")}`);
      elementDesc.push(`Position: (${Math.round(fp.boundingRect.x)}, ${Math.round(fp.boundingRect.y)})`);
    }
    const originalSelectors = [];
    if (locators.testId)
      originalSelectors.push(`data-testid="${locators.testId}"`);
    if (locators.role)
      originalSelectors.push(`role="${locators.role.role}" name="${locators.role.name}"`);
    if (locators.label)
      originalSelectors.push(`label="${locators.label}"`);
    if (locators.text)
      originalSelectors.push(`text="${locators.text}"`);
    if (locators.css)
      originalSelectors.push(`css="${locators.css}"`);
    if (locators.xpath)
      originalSelectors.push(`xpath="${locators.xpath}"`);
    return `You are a Playwright selector repair tool. An automated test cannot find an element on a web page.

## Original Element Description
${elementDesc.join("\n")}

## Original Selectors (all failed)
${originalSelectors.join("\n")}

## Current Page DOM (simplified)
\`\`\`html
${dom}
\`\`\`

## Task
Find the element that best matches the original element description in the current DOM.
Return ONLY a single Playwright-compatible CSS selector string that uniquely identifies the element.
Do not include any explanation, code blocks, or extra text \u2014 just the raw selector string.

If you cannot find a matching element, respond with: NONE`;
  }
  /** Call OpenAI Chat Completions API */
  async callOpenAI(apiKey, model, prompt) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: "You are a Playwright selector repair assistant. Return only the selector string." },
            { role: "user", content: prompt }
          ],
          max_tokens: 200,
          temperature: 0
        })
      });
      if (!response.ok) {
        console.error(`OpenAI API error: ${response.status}`);
        return null;
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || null;
    } catch (err) {
      console.error("OpenAI API call failed:", err);
      return null;
    }
  }
  /** Call Anthropic Messages API */
  async callAnthropic(apiKey, model, prompt) {
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model,
          max_tokens: 200,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });
      if (!response.ok) {
        console.error(`Anthropic API error: ${response.status}`);
        return null;
      }
      const data = await response.json();
      return data.content?.[0]?.text?.trim() || null;
    } catch (err) {
      console.error("Anthropic API call failed:", err);
      return null;
    }
  }
  /** Call local Ollama API */
  async callOllama(model, prompt) {
    const config = vscode7.workspace.getConfiguration("playwrightRpa");
    const ollamaUrl = config.get("ai.ollamaUrl", "http://localhost:11434");
    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          options: { temperature: 0 }
        })
      });
      if (!response.ok) {
        console.error(`Ollama API error: ${response.status}`);
        return null;
      }
      const data = await response.json();
      return data.response?.trim() || null;
    } catch (err) {
      console.error("Ollama API call failed:", err);
      return null;
    }
  }
  /** Extract a clean selector from the LLM response */
  extractSelector(response) {
    const trimmed = response.trim();
    if (trimmed === "NONE" || trimmed.toLowerCase().includes("cannot find")) {
      return null;
    }
    let selector = trimmed.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "").trim();
    if (selector.startsWith('"') && selector.endsWith('"') || selector.startsWith("'") && selector.endsWith("'")) {
      selector = selector.slice(1, -1);
    }
    if (selector.length === 0 || selector.length > 500) {
      return null;
    }
    return selector;
  }
};

// src/ai/locatorEmbeddings.ts
var LocatorEmbeddings = class {
  pipeline = null;
  initialized = false;
  async initialize() {
    if (this.initialized)
      return;
    try {
      const { pipeline } = await import("@xenova/transformers");
      this.pipeline = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
        // Cache models in extension storage
        cache_dir: void 0
        // Will use default cache
      });
      this.initialized = true;
    } catch (err) {
      console.error("Failed to initialize embedding model:", err);
      throw new Error(
        "Embedding model initialization failed. Install @xenova/transformers or disable embedding-based self-healing."
      );
    }
  }
  /**
   * Find the visible element on the page most similar to the recorded fingerprint.
   * Returns null if no element exceeds the similarity threshold.
   */
  async findMostSimilar(page, targetFingerprint, threshold) {
    if (!this.pipeline) {
      throw new Error("Embedding model not initialized. Call initialize() first.");
    }
    const targetText = this.fingerprintToText(targetFingerprint);
    const targetEmbedding = await this.embed(targetText);
    const candidates = await page.evaluate(() => {
      const interactiveTags = ["a", "button", "input", "select", "textarea", "label", "summary", "details"];
      const interactiveRoles = ["button", "link", "textbox", "checkbox", "radio", "combobox", "tab", "menuitem"];
      const elements = [];
      const allElements = document.querySelectorAll("*");
      let index = 0;
      allElements.forEach((el) => {
        if (!(el instanceof HTMLElement))
          return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0)
          return;
        if (window.getComputedStyle(el).visibility === "hidden")
          return;
        const tag = el.tagName.toLowerCase();
        const role = el.getAttribute("role");
        const isInteractive = interactiveTags.includes(tag) || role && interactiveRoles.includes(role) || el.onclick !== null || el.getAttribute("tabindex") !== null;
        if (!isInteractive && !el.id && !el.getAttribute("data-testid"))
          return;
        elements.push({
          index: index++,
          tag,
          id: el.id || null,
          classes: Array.from(el.classList).slice(0, 5),
          text: (el.textContent || "").trim().substring(0, 100),
          ariaLabel: el.getAttribute("aria-label"),
          ariaRole: role,
          testId: el.getAttribute("data-testid"),
          placeholder: el.placeholder || null,
          name: el.getAttribute("name"),
          type: el.getAttribute("type")
        });
      });
      return elements;
    });
    if (candidates.length === 0)
      return null;
    let bestMatch = null;
    let bestSimilarity = -1;
    const batchSize = 32;
    for (let i = 0; i < candidates.length; i += batchSize) {
      const batch = candidates.slice(i, i + batchSize);
      const texts = batch.map((c) => this.candidateToText(c));
      const embeddings = await Promise.all(texts.map((t) => this.embed(t)));
      for (let j = 0; j < batch.length; j++) {
        const similarity = this.cosineSimilarity(targetEmbedding, embeddings[j]);
        if (similarity > bestSimilarity && similarity >= threshold) {
          bestSimilarity = similarity;
          const candidate = batch[j];
          let locator;
          if (candidate.testId) {
            locator = page.getByTestId(candidate.testId);
          } else if (candidate.id) {
            locator = page.locator(`#${candidate.id}`);
          } else if (candidate.ariaRole && candidate.text) {
            locator = page.getByRole(candidate.ariaRole, { name: candidate.text.substring(0, 50) });
          } else if (candidate.text) {
            locator = page.getByText(candidate.text.substring(0, 50));
          } else {
            locator = page.locator(`${candidate.tag}`).nth(candidate.index);
          }
          bestMatch = { locator, similarity };
        }
      }
    }
    return bestMatch;
  }
  /** Convert a fingerprint to a text representation for embedding */
  fingerprintToText(fp) {
    const parts = [
      `tag:${fp.tag}`,
      fp.id ? `id:${fp.id}` : "",
      fp.testId ? `testid:${fp.testId}` : "",
      fp.ariaRole ? `role:${fp.ariaRole}` : "",
      fp.ariaLabel ? `label:${fp.ariaLabel}` : "",
      fp.text ? `text:${fp.text.substring(0, 100)}` : "",
      fp.placeholder ? `placeholder:${fp.placeholder}` : "",
      fp.name ? `name:${fp.name}` : "",
      fp.type ? `type:${fp.type}` : "",
      fp.classes.length ? `class:${fp.classes.join(" ")}` : ""
    ];
    return parts.filter(Boolean).join(" ");
  }
  /** Convert a candidate element to text for embedding */
  candidateToText(candidate) {
    const parts = [
      `tag:${candidate.tag}`,
      candidate.id ? `id:${candidate.id}` : "",
      candidate.testId ? `testid:${candidate.testId}` : "",
      candidate.ariaRole ? `role:${candidate.ariaRole}` : "",
      candidate.ariaLabel ? `label:${candidate.ariaLabel}` : "",
      candidate.text ? `text:${candidate.text}` : "",
      candidate.placeholder ? `placeholder:${candidate.placeholder}` : "",
      candidate.name ? `name:${candidate.name}` : "",
      candidate.type ? `type:${candidate.type}` : "",
      candidate.classes.length ? `class:${candidate.classes.join(" ")}` : ""
    ];
    return parts.filter(Boolean).join(" ");
  }
  /** Generate an embedding vector from text */
  async embed(text) {
    const result = await this.pipeline(text, { pooling: "mean", normalize: true });
    return Array.from(result.data);
  }
  /** Compute cosine similarity between two vectors */
  cosineSimilarity(a, b) {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
};

// src/playwright/selfHealing.ts
function generateLocators(action) {
  const fp = action.fingerprint;
  if (!fp) {
    return {
      testId: null,
      role: null,
      label: null,
      text: null,
      placeholder: null,
      css: action.cssSelector || null,
      xpath: action.xpath || null,
      fingerprint: null
    };
  }
  return {
    testId: fp.testId,
    role: fp.ariaRole ? { role: fp.ariaRole, name: fp.ariaLabel || fp.innerText?.substring(0, 50) || "" } : null,
    label: fp.labels?.[0] || null,
    text: fp.innerText?.substring(0, 100) || null,
    placeholder: fp.placeholder,
    css: action.cssSelector || null,
    xpath: action.xpath || null,
    fingerprint: fp
  };
}
var SelfHealingResolver = class {
  constructor(db, config) {
    this.db = db;
    this.config = config;
  }
  embeddings = null;
  llmRepair = null;
  async resolve(page, locators, recordingId, stepIndex) {
    const cached = this.db.getHealedSelector(recordingId, stepIndex);
    if (cached) {
      try {
        const locator = page.locator(cached.healed_locator);
        if (await locator.count() === 1) {
          this.db.incrementHealedSelectorSuccess(cached.id);
          return { locator, strategy: `cached:${cached.strategy_used}`, healed: true };
        }
      } catch {
      }
    }
    const tier1Result = await this.tryDirectLocators(page, locators);
    if (tier1Result) {
      return tier1Result;
    }
    if (!this.config.enabled) {
      throw new Error(
        `No element found for step ${stepIndex}. Self-healing is disabled.`
      );
    }
    if (locators.fingerprint) {
      const tier2Result = await this.tryEmbeddingSimilarity(page, locators.fingerprint);
      if (tier2Result) {
        this.cacheHealedSelector(recordingId, stepIndex, locators, tier2Result);
        return tier2Result;
      }
    }
    if (this.config.llmEnabled && locators.fingerprint) {
      const tier3Result = await this.tryLlmRepair(page, locators);
      if (tier3Result) {
        this.cacheHealedSelector(recordingId, stepIndex, locators, tier3Result);
        return tier3Result;
      }
    }
    throw new Error(
      `Self-healing failed: no element found for step ${stepIndex} after all tiers.`
    );
  }
  /** Tier 1: Try each locator strategy in priority order */
  async tryDirectLocators(page, locators) {
    const strategies = [
      {
        name: "testId",
        getLocator: () => locators.testId ? page.getByTestId(locators.testId) : null
      },
      {
        name: "role",
        getLocator: () => locators.role ? page.getByRole(locators.role.role, { name: locators.role.name }) : null
      },
      {
        name: "label",
        getLocator: () => locators.label ? page.getByLabel(locators.label) : null
      },
      {
        name: "text",
        getLocator: () => locators.text ? page.getByText(locators.text, { exact: false }) : null
      },
      {
        name: "placeholder",
        getLocator: () => locators.placeholder ? page.getByPlaceholder(locators.placeholder) : null
      },
      {
        name: "css",
        getLocator: () => locators.css ? page.locator(locators.css) : null
      },
      {
        name: "xpath",
        getLocator: () => locators.xpath ? page.locator(`xpath=${locators.xpath}`) : null
      }
    ];
    for (const { name, getLocator } of strategies) {
      try {
        const locator = getLocator();
        if (!locator)
          continue;
        const count = await locator.count();
        if (count === 1) {
          return { locator, strategy: name, healed: false };
        }
        if (count > 1 && locators.fingerprint) {
          const first = locator.first();
          return { locator: first, strategy: `${name}:first`, healed: false };
        }
      } catch {
        continue;
      }
    }
    return null;
  }
  /** Tier 2: Find element by embedding similarity */
  async tryEmbeddingSimilarity(page, fingerprint) {
    try {
      if (!this.embeddings) {
        this.embeddings = new LocatorEmbeddings();
        await this.embeddings.initialize();
      }
      const bestMatch = await this.embeddings.findMostSimilar(page, fingerprint, this.config.embeddingThreshold);
      if (bestMatch) {
        return {
          locator: bestMatch.locator,
          strategy: `embedding:${bestMatch.similarity.toFixed(3)}`,
          healed: true
        };
      }
    } catch {
    }
    return null;
  }
  /** Tier 3: Ask LLM to repair the selector */
  async tryLlmRepair(page, locators) {
    try {
      if (!this.llmRepair) {
        this.llmRepair = new LlmRepair();
      }
      const repairedSelector = await this.llmRepair.repairSelector(page, locators);
      if (repairedSelector) {
        const locator = page.locator(repairedSelector);
        if (await locator.count() >= 1) {
          return {
            locator: locator.first(),
            strategy: "llm",
            healed: true
          };
        }
      }
    } catch {
    }
    return null;
  }
  /** Cache a healed selector for future runs */
  cacheHealedSelector(recordingId, stepIndex, originalLocators, resolution) {
    const originalLocator = originalLocators.testId || originalLocators.css || originalLocators.xpath || "unknown";
    this.db.createHealedSelector({
      recording_id: recordingId,
      step_index: stepIndex,
      original_locator: originalLocator,
      healed_locator: `[healed:${resolution.strategy}]`,
      // Placeholder — real impl would extract selector
      strategy_used: resolution.strategy
    });
  }
};

// src/playwright/recorder.ts
var CAPTURE_SCRIPT = `
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
`;
var Recorder = class {
  constructor(db, fileManager2) {
    this.db = db;
    this.fileManager = fileManager2;
  }
  browser = null;
  context = null;
  page = null;
  actions = [];
  currentRecordingId = null;
  actionCallbacks = [];
  startTime = 0;
  isRecording = false;
  onAction(callback) {
    this.actionCallbacks.push(callback);
  }
  emitAction(action) {
    for (const cb of this.actionCallbacks) {
      cb(action);
    }
  }
  async start(url, browserType = "chromium", saveAuth = false) {
    if (this.isRecording) {
      throw new Error("Already recording. Stop the current recording first.");
    }
    const recordingId = v4_default();
    this.currentRecordingId = recordingId;
    this.actions = [];
    this.startTime = Date.now();
    this.isRecording = true;
    const engines = { chromium: import_playwright.chromium, firefox: import_playwright.firefox, webkit: import_playwright.webkit };
    const engine = engines[browserType] || import_playwright.chromium;
    this.browser = await engine.launch({
      headless: false,
      slowMo: 0
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: void 0
      // Could enable video recording
    });
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true
    });
    this.page = await this.context.newPage();
    await this.page.exposeFunction("__rpaEvent", (eventJson) => {
      try {
        const action = JSON.parse(eventJson);
        this.actions.push(action);
        this.emitAction(action);
      } catch {
      }
    });
    await this.context.addInitScript(CAPTURE_SCRIPT);
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
    this.db.createRecording({
      id: recordingId,
      name: `Recording ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
      url,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      tags: "",
      description: "",
      action_count: 0,
      duration_ms: 0,
      auth_state_path: null
    });
    return recordingId;
  }
  async stop() {
    if (!this.isRecording || !this.currentRecordingId) {
      return null;
    }
    const recordingId = this.currentRecordingId;
    const duration = Date.now() - this.startTime;
    let authStatePath = null;
    if (this.context) {
      try {
        const storageState = await this.context.storageState();
        authStatePath = await this.fileManager.saveAuthState(recordingId, storageState);
      } catch {
      }
    }
    if (this.context) {
      const tracePath = this.fileManager.getTracePath(recordingId);
      await this.context.tracing.stop({ path: tracePath });
    }
    for (let i = 0; i < this.actions.length; i++) {
      const action = this.actions[i];
      const locators = generateLocators(action);
      this.db.createAction({
        id: v4_default(),
        recording_id: recordingId,
        step_index: i,
        action_type: action.type,
        url: action.url,
        locators: JSON.stringify(locators),
        screenshot_path: null,
        timestamp_ms: action.timestamp - this.startTime
      });
    }
    await this.fileManager.saveActionsJson(recordingId, this.actions);
    this.db.updateRecording(recordingId, {
      action_count: this.actions.length,
      duration_ms: duration,
      auth_state_path: authStatePath,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    await this.page?.close().catch(() => {
    });
    await this.context?.close().catch(() => {
    });
    await this.browser?.close().catch(() => {
    });
    this.browser = null;
    this.context = null;
    this.page = null;
    this.isRecording = false;
    this.actionCallbacks = [];
    const recording = this.db.getRecording(recordingId);
    this.currentRecordingId = null;
    return recording;
  }
  dispose() {
    this.page?.close().catch(() => {
    });
    this.context?.close().catch(() => {
    });
    this.browser?.close().catch(() => {
    });
    this.isRecording = false;
  }
};

// src/playwright/player.ts
var import_playwright2 = require("playwright");
var vscode8 = __toESM(require("vscode"));
var Player = class {
  constructor(db, fileManager2) {
    this.db = db;
    this.fileManager = fileManager2;
  }
  browser = null;
  context = null;
  page = null;
  isPlaying = false;
  shouldStop = false;
  async play(recordingId, options = {}, onStep) {
    if (this.isPlaying) {
      throw new Error("Already playing. Stop the current playback first.");
    }
    const recording = this.db.getRecording(recordingId);
    if (!recording) {
      throw new Error(`Recording ${recordingId} not found.`);
    }
    const actions = this.db.getActions(recordingId);
    if (actions.length === 0) {
      throw new Error("Recording has no actions.");
    }
    this.isPlaying = true;
    this.shouldStop = false;
    const config = vscode8.workspace.getConfiguration("playwrightRpa");
    const headless = options.headless ?? config.get("headless", false);
    const slowMo = options.slowMo ?? config.get("slowMo", 0);
    const browserType = options.browser ?? config.get("defaultBrowser", "chromium");
    const resolver = new SelfHealingResolver(this.db, {
      enabled: config.get("selfHealing.enabled", true),
      embeddingThreshold: config.get("selfHealing.embeddingThreshold", 0.85),
      llmEnabled: config.get("selfHealing.llmEnabled", false)
    });
    const engines = { chromium: import_playwright2.chromium, firefox: import_playwright2.firefox, webkit: import_playwright2.webkit };
    const engine = engines[browserType] || import_playwright2.chromium;
    this.browser = await engine.launch({ headless, slowMo });
    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    if (recording.auth_state_path) {
      try {
        const authState = await this.fileManager.loadAuthState(recordingId);
        if (authState) {
          this.context = await this.browser.newContext({
            viewport: { width: 1280, height: 720 },
            storageState: authState
          });
        }
      } catch {
      }
    }
    this.page = await this.context.newPage();
    await this.registerOverlayHandlers(this.page);
    await this.context.tracing.start({ screenshots: true, snapshots: true });
    const executionId = this.db.createExecution({
      recording_id: recordingId,
      started_at: (/* @__PURE__ */ new Date()).toISOString(),
      status: "running",
      trigger: "manual"
    });
    const results = [];
    try {
      await this.page.goto(recording.url, { waitUntil: "domcontentloaded" });
      for (let i = 0; i < actions.length; i++) {
        if (this.shouldStop) {
          break;
        }
        const action = actions[i];
        const stepStart = Date.now();
        try {
          const result = await this.executeAction(this.page, action, resolver, recordingId);
          const stepResult = {
            stepIndex: i,
            actionType: action.action_type,
            status: result.healed ? "healed" : "success",
            strategy: result.strategy,
            durationMs: Date.now() - stepStart
          };
          try {
            const screenshotPath = this.fileManager.getStepScreenshotPath(recordingId, i);
            await this.page.screenshot({ path: screenshotPath });
            stepResult.screenshotPath = screenshotPath;
          } catch {
          }
          results.push(stepResult);
          onStep?.(stepResult);
        } catch (err) {
          const stepResult = {
            stepIndex: i,
            actionType: action.action_type,
            status: "failed",
            strategy: "none",
            durationMs: Date.now() - stepStart,
            error: err.message
          };
          try {
            const screenshotPath = this.fileManager.getStepScreenshotPath(recordingId, i);
            await this.page.screenshot({ path: screenshotPath });
            stepResult.screenshotPath = screenshotPath;
          } catch {
          }
          results.push(stepResult);
          onStep?.(stepResult);
          this.db.updateExecution(executionId, {
            finished_at: (/* @__PURE__ */ new Date()).toISOString(),
            status: "fail",
            failure_step: i,
            error_message: err.message
          });
          throw err;
        }
        if (slowMo > 0 && i < actions.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, slowMo));
        }
      }
      this.db.updateExecution(executionId, {
        finished_at: (/* @__PURE__ */ new Date()).toISOString(),
        status: "pass"
      });
    } finally {
      try {
        const tracePath = this.fileManager.getPlaybackTracePath(recordingId, executionId);
        await this.context.tracing.stop({ path: tracePath });
      } catch {
      }
      await this.cleanup();
    }
    return results;
  }
  /** Execute a single recorded action on the page */
  async executeAction(page, action, resolver, recordingId) {
    const locators = JSON.parse(action.locators);
    switch (action.action_type) {
      case "navigation": {
        await page.goto(action.url, { waitUntil: "domcontentloaded" });
        return { healed: false, strategy: "navigation" };
      }
      case "scroll": {
        await page.evaluate(
          ({ x, y }) => window.scrollTo(x, y),
          { x: 0, y: 0 }
          // Would use stored scroll position
        );
        return { healed: false, strategy: "scroll" };
      }
      case "click":
      case "dblclick": {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        if (action.action_type === "dblclick") {
          await resolution.locator.dblclick({ timeout: 1e4 });
        } else {
          await resolution.locator.click({ timeout: 1e4 });
        }
        return { healed: resolution.healed, strategy: resolution.strategy };
      }
      case "input":
      case "change": {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        const value = locators.fingerprint?.value || "";
        await resolution.locator.fill(value, { timeout: 1e4 });
        return { healed: resolution.healed, strategy: resolution.strategy };
      }
      case "keydown": {
        const key = locators.fingerprint?.value || "Enter";
        await page.keyboard.press(key);
        return { healed: false, strategy: "keyboard" };
      }
      case "select": {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        const value = locators.fingerprint?.value || "";
        await resolution.locator.selectOption(value, { timeout: 1e4 });
        return { healed: resolution.healed, strategy: resolution.strategy };
      }
      case "submit": {
        const resolution = await resolver.resolve(page, locators, recordingId, action.step_index);
        await resolution.locator.press("Enter", { timeout: 1e4 });
        return { healed: resolution.healed, strategy: resolution.strategy };
      }
      default: {
        return { healed: false, strategy: "skipped" };
      }
    }
  }
  /** Register overlay dismissal handlers from extension settings */
  async registerOverlayHandlers(page) {
    const config = vscode8.workspace.getConfiguration("playwrightRpa");
    const dismissals = config.get("overlayDismissals", []);
    for (const rule of dismissals) {
      try {
        await page.addLocatorHandler(
          page.locator(rule.detector),
          async () => {
            try {
              await page.locator(rule.action).click({ timeout: 5e3 });
            } catch {
            }
          }
        );
      } catch {
      }
    }
  }
  async stop() {
    this.shouldStop = true;
  }
  async cleanup() {
    await this.page?.close().catch(() => {
    });
    await this.context?.close().catch(() => {
    });
    await this.browser?.close().catch(() => {
    });
    this.page = null;
    this.context = null;
    this.browser = null;
    this.isPlaying = false;
    this.shouldStop = false;
  }
  dispose() {
    this.shouldStop = true;
    this.cleanup();
  }
};

// src/playwright/exporter.ts
var vscode9 = __toESM(require("vscode"));
var fs3 = __toESM(require("fs/promises"));
var Exporter = class {
  constructor(db, fileManager2) {
    this.db = db;
    this.fileManager = fileManager2;
  }
  async export(recordingId, format) {
    const recording = this.db.getRecording(recordingId);
    if (!recording) {
      throw new Error(`Recording ${recordingId} not found.`);
    }
    const actions = this.db.getActions(recordingId);
    const exportFormat = format;
    const defaultName = this.getDefaultFileName(recording.name, exportFormat);
    const uri = await vscode9.window.showSaveDialog({
      defaultUri: vscode9.Uri.file(defaultName),
      filters: this.getFileFilters(exportFormat)
    });
    if (!uri) {
      return;
    }
    let content;
    switch (exportFormat) {
      case "TypeScript":
        content = this.generateTypeScript(recording, actions);
        break;
      case "JavaScript":
        content = this.generateJavaScript(recording, actions);
        break;
      case "Python":
        content = this.generatePython(recording, actions);
        break;
      case "Java":
        content = this.generateJava(recording, actions);
        break;
      case "C#":
        content = this.generateCSharp(recording, actions);
        break;
      case "JSON":
        content = this.generateJson(recording, actions);
        break;
      case "GitHub Actions YAML":
        content = this.generateGitHubActions(recording);
        break;
      case "HAR":
        await this.exportTraceZip(recordingId, uri.fsPath);
        vscode9.window.showInformationMessage(`Trace exported to ${uri.fsPath}`);
        return;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
    await fs3.writeFile(uri.fsPath, content, "utf-8");
    vscode9.window.showInformationMessage(`Exported to ${uri.fsPath}`);
    const doc = await vscode9.workspace.openTextDocument(uri);
    await vscode9.window.showTextDocument(doc);
  }
  generateTypeScript(recording, actions) {
    const lines = [
      `import { test, expect } from '@playwright/test';`,
      ``,
      `test('${this.escapeString(recording.name)}', async ({ page }) => {`,
      `  // Recorded on ${recording.created_at} from ${recording.url}`,
      `  await page.goto('${this.escapeString(recording.url)}');`,
      ``
    ];
    for (const action of actions) {
      const line = this.generatePlaywrightAction(action, "  ");
      if (line)
        lines.push(line);
    }
    lines.push(`});`, ``);
    return lines.join("\n");
  }
  generateJavaScript(recording, actions) {
    const lines = [
      `const { test, expect } = require('@playwright/test');`,
      ``,
      `test('${this.escapeString(recording.name)}', async ({ page }) => {`,
      `  // Recorded on ${recording.created_at} from ${recording.url}`,
      `  await page.goto('${this.escapeString(recording.url)}');`,
      ``
    ];
    for (const action of actions) {
      const line = this.generatePlaywrightAction(action, "  ");
      if (line)
        lines.push(line);
    }
    lines.push(`});`, ``);
    return lines.join("\n");
  }
  generatePython(recording, actions) {
    const lines = [
      `import pytest`,
      `from playwright.sync_api import Page, expect`,
      ``,
      ``,
      `def test_${this.toSnakeCase(recording.name)}(page: Page):`,
      `    """Recorded on ${recording.created_at} from ${recording.url}"""`,
      `    page.goto("${this.escapeString(recording.url)}")`,
      ``
    ];
    for (const action of actions) {
      const line = this.generatePythonAction(action, "    ");
      if (line)
        lines.push(line);
    }
    lines.push(``);
    return lines.join("\n");
  }
  generateJava(recording, actions) {
    const className = this.toPascalCase(recording.name);
    const lines = [
      `import com.microsoft.playwright.*;`,
      `import org.junit.jupiter.api.*;`,
      ``,
      `public class ${className}Test {`,
      `    @Test`,
      `    void test${className}() {`,
      `        try (Playwright playwright = Playwright.create()) {`,
      `            Browser browser = playwright.chromium().launch();`,
      `            Page page = browser.newPage();`,
      `            // Recorded on ${recording.created_at} from ${recording.url}`,
      `            page.navigate("${this.escapeString(recording.url)}");`,
      ``
    ];
    for (const action of actions) {
      const line = this.generateJavaAction(action, "            ");
      if (line)
        lines.push(line);
    }
    lines.push(`        }`, `    }`, `}`, ``);
    return lines.join("\n");
  }
  generateCSharp(recording, actions) {
    const className = this.toPascalCase(recording.name);
    const lines = [
      `using Microsoft.Playwright;`,
      `using NUnit.Framework;`,
      ``,
      `[TestFixture]`,
      `public class ${className}Tests`,
      `{`,
      `    [Test]`,
      `    public async Task Test${className}()`,
      `    {`,
      `        using var playwright = await Playwright.CreateAsync();`,
      `        await using var browser = await playwright.Chromium.LaunchAsync();`,
      `        var page = await browser.NewPageAsync();`,
      `        // Recorded on ${recording.created_at} from ${recording.url}`,
      `        await page.GotoAsync("${this.escapeString(recording.url)}");`,
      ``
    ];
    for (const action of actions) {
      const line = this.generateCSharpAction(action, "        ");
      if (line)
        lines.push(line);
    }
    lines.push(`    }`, `}`, ``);
    return lines.join("\n");
  }
  generateJson(recording, actions) {
    return JSON.stringify(
      {
        version: "1.0.0",
        recording: {
          id: recording.id,
          name: recording.name,
          url: recording.url,
          createdAt: recording.created_at,
          actionCount: recording.action_count,
          durationMs: recording.duration_ms
        },
        actions: actions.map((a) => ({
          stepIndex: a.step_index,
          actionType: a.action_type,
          url: a.url,
          locators: JSON.parse(a.locators),
          timestampMs: a.timestamp_ms
        }))
      },
      null,
      2
    );
  }
  generateGitHubActions(recording) {
    return `name: Playwright RPA - ${this.escapeString(recording.name)}

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
        run: npx playwright test ${this.toKebabCase(recording.name)}.spec.ts
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
`;
  }
  /** Generate a Playwright TS/JS action line from a recorded action */
  generatePlaywrightAction(action, indent) {
    const locators = JSON.parse(action.locators);
    const selector = this.getBestLocatorCode(locators);
    switch (action.action_type) {
      case "navigation":
        return `${indent}await page.goto('${this.escapeString(action.url)}');`;
      case "click":
        return selector ? `${indent}await ${selector}.click();` : null;
      case "dblclick":
        return selector ? `${indent}await ${selector}.dblclick();` : null;
      case "input":
      case "change":
        return selector ? `${indent}await ${selector}.fill('${this.escapeString(locators.fingerprint?.value || "")}');` : null;
      case "keydown":
        return `${indent}await page.keyboard.press('${this.escapeString(locators.fingerprint?.value || "Enter")}');`;
      case "select":
        return selector ? `${indent}await ${selector}.selectOption('${this.escapeString(locators.fingerprint?.value || "")}');` : null;
      case "scroll":
        return `${indent}await page.mouse.wheel(0, 300);`;
      default:
        return `${indent}// Unknown action: ${action.action_type}`;
    }
  }
  generatePythonAction(action, indent) {
    const locators = JSON.parse(action.locators);
    const selector = this.getBestPythonLocator(locators);
    switch (action.action_type) {
      case "navigation":
        return `${indent}page.goto("${this.escapeString(action.url)}")`;
      case "click":
        return selector ? `${indent}${selector}.click()` : null;
      case "dblclick":
        return selector ? `${indent}${selector}.dblclick()` : null;
      case "input":
      case "change":
        return selector ? `${indent}${selector}.fill("${this.escapeString(locators.fingerprint?.value || "")}")` : null;
      case "keydown":
        return `${indent}page.keyboard.press("${this.escapeString(locators.fingerprint?.value || "Enter")}")`;
      default:
        return `${indent}# Unknown action: ${action.action_type}`;
    }
  }
  generateJavaAction(action, indent) {
    const locators = JSON.parse(action.locators);
    switch (action.action_type) {
      case "navigation":
        return `${indent}page.navigate("${this.escapeString(action.url)}");`;
      case "click":
        if (locators.role) {
          return `${indent}page.getByRole(AriaRole.${locators.role.role.toUpperCase()}, new Page.GetByRoleOptions().setName("${this.escapeString(locators.role.name)}")).click();`;
        }
        if (locators.css) {
          return `${indent}page.locator("${this.escapeString(locators.css)}").click();`;
        }
        return null;
      default:
        return `${indent}// Unknown action: ${action.action_type}`;
    }
  }
  generateCSharpAction(action, indent) {
    const locators = JSON.parse(action.locators);
    switch (action.action_type) {
      case "navigation":
        return `${indent}await page.GotoAsync("${this.escapeString(action.url)}");`;
      case "click":
        if (locators.role) {
          return `${indent}await page.GetByRole(AriaRole.${this.toPascalCase(locators.role.role)}, new() { Name = "${this.escapeString(locators.role.name)}" }).ClickAsync();`;
        }
        if (locators.css) {
          return `${indent}await page.Locator("${this.escapeString(locators.css)}").ClickAsync();`;
        }
        return null;
      default:
        return `${indent}// Unknown action: ${action.action_type}`;
    }
  }
  /** Get best locator code for TS/JS export — prefers semantic locators */
  getBestLocatorCode(locators) {
    if (locators.testId)
      return `page.getByTestId('${this.escapeString(locators.testId)}')`;
    if (locators.role)
      return `page.getByRole('${locators.role.role}', { name: '${this.escapeString(locators.role.name)}' })`;
    if (locators.label)
      return `page.getByLabel('${this.escapeString(locators.label)}')`;
    if (locators.text)
      return `page.getByText('${this.escapeString(locators.text)}')`;
    if (locators.placeholder)
      return `page.getByPlaceholder('${this.escapeString(locators.placeholder)}')`;
    if (locators.css)
      return `page.locator('${this.escapeString(locators.css)}')`;
    if (locators.xpath)
      return `page.locator('xpath=${this.escapeString(locators.xpath)}')`;
    return null;
  }
  getBestPythonLocator(locators) {
    if (locators.testId)
      return `page.get_by_test_id("${this.escapeString(locators.testId)}")`;
    if (locators.role)
      return `page.get_by_role("${locators.role.role}", name="${this.escapeString(locators.role.name)}")`;
    if (locators.label)
      return `page.get_by_label("${this.escapeString(locators.label)}")`;
    if (locators.text)
      return `page.get_by_text("${this.escapeString(locators.text)}")`;
    if (locators.placeholder)
      return `page.get_by_placeholder("${this.escapeString(locators.placeholder)}")`;
    if (locators.css)
      return `page.locator("${this.escapeString(locators.css)}")`;
    return null;
  }
  async exportTraceZip(recordingId, destPath) {
    const tracePath = this.fileManager.getTracePath(recordingId);
    await fs3.copyFile(tracePath, destPath);
  }
  // --- String utilities ---
  escapeString(str) {
    return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
  }
  toSnakeCase(str) {
    return str.replace(/[^a-zA-Z0-9]+/g, "_").replace(/([A-Z])/g, "_$1").toLowerCase().replace(/^_/, "").replace(/_+/g, "_");
  }
  toPascalCase(str) {
    return str.replace(/[^a-zA-Z0-9]+/g, " ").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
  }
  toKebabCase(str) {
    return str.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase().replace(/^-|-$/g, "");
  }
  getDefaultFileName(name, format) {
    const base = this.toKebabCase(name);
    const ext = {
      TypeScript: ".spec.ts",
      JavaScript: ".spec.js",
      Python: "_test.py",
      Java: "Test.java",
      "C#": "Tests.cs",
      JSON: ".json",
      HAR: ".zip",
      "GitHub Actions YAML": ".yml"
    };
    return base + (ext[format] || ".txt");
  }
  getFileFilters(format) {
    const filters = {
      TypeScript: { "TypeScript": ["ts"] },
      JavaScript: { "JavaScript": ["js"] },
      Python: { "Python": ["py"] },
      Java: { "Java": ["java"] },
      "C#": { "C#": ["cs"] },
      JSON: { "JSON": ["json"] },
      HAR: { "ZIP": ["zip"] },
      "GitHub Actions YAML": { "YAML": ["yml", "yaml"] }
    };
    return filters[format] || { "All": ["*"] };
  }
};

// src/orchestration/scheduler.ts
var cron = __toESM(require_node_cron());
var Scheduler = class {
  constructor(db, queue) {
    this.db = db;
    this.queue = queue;
  }
  tasks = /* @__PURE__ */ new Map();
  running = false;
  /** Start all enabled schedules */
  start() {
    if (this.running)
      return;
    this.running = true;
    this.loadSchedules();
  }
  /** Stop all cron tasks */
  stop() {
    this.running = false;
    for (const [id, task] of this.tasks) {
      task.stop();
    }
    this.tasks.clear();
  }
  /** Reload schedules from the database (call after add/update/delete) */
  reload() {
    this.stop();
    this.running = true;
    this.loadSchedules();
  }
  loadSchedules() {
    const schedules = this.db.getEnabledSchedules();
    for (const schedule2 of schedules) {
      if (!cron.validate(schedule2.cron_expression)) {
        console.warn(`Invalid cron expression for schedule ${schedule2.id}: ${schedule2.cron_expression}`);
        continue;
      }
      const task = cron.schedule(schedule2.cron_expression, () => {
        this.onScheduleTrigger(schedule2);
      });
      this.tasks.set(schedule2.id, task);
    }
  }
  onScheduleTrigger(schedule2) {
    console.log(`Schedule ${schedule2.id} triggered for recording ${schedule2.recording_id}`);
    this.queue.enqueue(schedule2.recording_id);
    this.db.updateSchedule(schedule2.id, {
      last_run: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
};

// src/orchestration/queue.ts
var vscode10 = __toESM(require("vscode"));
var JobQueue = class {
  constructor(db) {
    this.db = db;
  }
  /** Add a recording playback to the queue */
  enqueue(recordingId, maxAttempts) {
    const config = vscode10.workspace.getConfiguration("playwrightRpa");
    const retries = maxAttempts ?? config.get("orchestration.maxRetries", 3);
    return this.db.createJob(recordingId, retries);
  }
  /** Get the next queued job (FIFO) */
  dequeue() {
    return this.db.getNextQueuedJob();
  }
  /** Mark a job as running */
  markRunning(jobId) {
    this.db.updateJob(jobId, {
      status: "running",
      started_at: (/* @__PURE__ */ new Date()).toISOString(),
      attempts: void 0
      // Will be incremented by executor
    });
  }
  /** Mark a job as completed */
  markCompleted(jobId, result) {
    this.db.updateJob(jobId, {
      status: "completed",
      finished_at: (/* @__PURE__ */ new Date()).toISOString(),
      result_json: result ? JSON.stringify(result) : null
    });
  }
  /** Mark a job as failed. Returns true if the job can be retried. */
  markFailed(jobId, error, currentAttempts, maxAttempts) {
    if (currentAttempts < maxAttempts) {
      this.db.updateJob(jobId, {
        status: "queued",
        finished_at: null,
        result_json: JSON.stringify({ lastError: error })
      });
      return true;
    }
    this.db.updateJob(jobId, {
      status: "failed",
      finished_at: (/* @__PURE__ */ new Date()).toISOString(),
      result_json: JSON.stringify({ error })
    });
    return false;
  }
  /** Get the number of currently running jobs */
  runningCount() {
    return this.db.getRunningJobCount();
  }
};

// src/orchestration/executor.ts
var vscode11 = __toESM(require("vscode"));
var Executor = class {
  // Check for new jobs every 5 seconds
  constructor(queue, player2) {
    this.queue = queue;
    this.player = player2;
  }
  interval = null;
  running = false;
  POLL_INTERVAL_MS = 5e3;
  /** Start polling the queue for jobs */
  start() {
    if (this.running)
      return;
    this.running = true;
    this.interval = setInterval(() => {
      this.tick().catch((err) => {
        console.error("Executor tick error:", err);
      });
    }, this.POLL_INTERVAL_MS);
  }
  /** Stop polling */
  stop() {
    this.running = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  /** Process the next job in the queue */
  async tick() {
    const config = vscode11.workspace.getConfiguration("playwrightRpa");
    const maxConcurrency = config.get("orchestration.concurrency", 1);
    if (this.queue.runningCount() >= maxConcurrency) {
      return;
    }
    const job = this.queue.dequeue();
    if (!job)
      return;
    await this.executeJob(job);
  }
  /** Execute a single job */
  async executeJob(job) {
    const attempts = job.attempts + 1;
    this.queue.markRunning(job.id);
    try {
      if (attempts > 1) {
        const delayMs = Math.min(1e3 * Math.pow(2, attempts - 1), 3e4);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
      const results = await this.player.play(job.recording_id, {}, (stepResult) => {
        console.log(`Job ${job.id} step ${stepResult.stepIndex}: ${stepResult.status}`);
      });
      this.queue.markCompleted(job.id, {
        steps: results.length,
        passed: results.filter((r) => r.status === "success").length,
        healed: results.filter((r) => r.status === "healed").length,
        failed: results.filter((r) => r.status === "failed").length
      });
      vscode11.window.showInformationMessage(
        `Playwright RPA: Job completed for recording "${job.recording_id}".`
      );
    } catch (err) {
      const errorMsg = err.message;
      const canRetry = this.queue.markFailed(job.id, errorMsg, attempts, job.max_attempts);
      if (canRetry) {
        console.log(`Job ${job.id} failed (attempt ${attempts}/${job.max_attempts}), will retry.`);
      } else {
        const action = await vscode11.window.showErrorMessage(
          `Playwright RPA: Job failed after ${attempts} attempts \u2014 ${errorMsg}`,
          "View Details"
        );
        if (action === "View Details") {
          vscode11.commands.executeCommand("playwrightRpa.openMonitoringPanel");
        }
        await this.sendWebhookNotification(job, errorMsg);
      }
    }
  }
  /** Send a failure notification to the configured webhook */
  async sendWebhookNotification(job, error) {
    const config = vscode11.workspace.getConfiguration("playwrightRpa");
    const webhookUrl = config.get("webhookUrl", "");
    if (!webhookUrl)
      return;
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `\u{1F534} Playwright RPA job failed`,
          recording_id: job.recording_id,
          job_id: job.id,
          attempts: job.attempts + 1,
          error,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      });
      if (!response.ok) {
        console.error(`Webhook notification failed: ${response.status}`);
      }
    } catch (err) {
      console.error("Webhook notification error:", err);
    }
  }
};

// src/extension.ts
var database;
var fileManager;
var recorder;
var player;
var scheduler;
var jobQueue;
var executor;
async function activate(context) {
  console.log("Playwright RPA extension activating...");
  database = new Database(context.globalStoragePath);
  await database.waitReady();
  fileManager = new FileManager(context.globalStoragePath);
  await fileManager.ensureDirectories();
  recorder = new Recorder(database, fileManager);
  player = new Player(database, fileManager);
  const exporter = new Exporter(database, fileManager);
  jobQueue = new JobQueue(database);
  executor = new Executor(jobQueue, player);
  scheduler = new Scheduler(database, jobQueue);
  const libraryProvider = new RecordingLibraryProvider(database);
  const executionsProvider = new ExecutionsProvider(database);
  const schedulesProvider = new SchedulesProvider(database);
  const libraryView = vscode12.window.createTreeView("playwrightRpa.library", {
    treeDataProvider: libraryProvider,
    showCollapseAll: true
  });
  const executionsView = vscode12.window.createTreeView("playwrightRpa.executions", {
    treeDataProvider: executionsProvider
  });
  const schedulesView = vscode12.window.createTreeView("playwrightRpa.schedules", {
    treeDataProvider: schedulesProvider
  });
  const recordingPanelManager = new RecordingPanelManager(context, recorder);
  const playbackPanelManager = new PlaybackPanelManager(context, player);
  const monitoringPanelManager = new MonitoringPanelManager(context, database);
  const commands3 = [
    ["playwrightRpa.startRecording", async () => {
      await recordingPanelManager.show();
    }],
    ["playwrightRpa.stopRecording", async () => {
      await recorder.stop();
      libraryProvider.refresh();
    }],
    ["playwrightRpa.playRecording", async (...args) => {
      const item = args[0];
      const recordingId = item?.recordingId;
      if (!recordingId) {
        vscode12.window.showWarningMessage("No recording selected.");
        return;
      }
      await playbackPanelManager.show(recordingId);
    }],
    ["playwrightRpa.openRecordingPanel", async () => {
      await recordingPanelManager.show();
    }],
    ["playwrightRpa.openPlaybackPanel", async () => {
      await playbackPanelManager.show();
    }],
    ["playwrightRpa.openMonitoringPanel", async () => {
      await monitoringPanelManager.show();
    }],
    ["playwrightRpa.deleteRecording", async (...args) => {
      const item = args[0];
      const recordingId = item?.recordingId;
      if (!recordingId) {
        return;
      }
      const confirm = await vscode12.window.showWarningMessage(
        "Delete this recording and all its data?",
        { modal: true },
        "Delete"
      );
      if (confirm === "Delete") {
        database.deleteRecording(recordingId);
        await fileManager.deleteRecordingFiles(recordingId);
        libraryProvider.refresh();
        vscode12.window.showInformationMessage("Recording deleted.");
      }
    }],
    ["playwrightRpa.exportRecording", async (...args) => {
      const item = args[0];
      const recordingId = item?.recordingId;
      if (!recordingId) {
        return;
      }
      const format = await vscode12.window.showQuickPick(
        ["TypeScript", "JavaScript", "Python", "Java", "C#", "JSON", "HAR", "GitHub Actions YAML"],
        { placeHolder: "Select export format" }
      );
      if (format) {
        await exporter.export(recordingId, format);
      }
    }],
    ["playwrightRpa.refreshLibrary", () => {
      libraryProvider.refresh();
      executionsProvider.refresh();
      schedulesProvider.refresh();
    }],
    ["playwrightRpa.installBrowsers", async () => {
      const terminal = vscode12.window.createTerminal("Playwright Install");
      terminal.show();
      terminal.sendText("npx playwright install");
    }]
  ];
  for (const [id, handler] of commands3) {
    context.subscriptions.push(
      vscode12.commands.registerCommand(id, handler)
    );
  }
  scheduler.start();
  executor.start();
  context.subscriptions.push(
    libraryView,
    executionsView,
    schedulesView,
    { dispose: () => recorder.dispose() },
    { dispose: () => player.dispose() },
    { dispose: () => scheduler.stop() },
    { dispose: () => executor.stop() },
    { dispose: () => database.close() }
  );
  console.log("Playwright RPA extension activated.");
}
function deactivate() {
  scheduler?.stop();
  executor?.stop();
  recorder?.dispose();
  player?.dispose();
  database?.close();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map

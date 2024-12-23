/*! For license information please see SubApp.bundle.js.LICENSE.txt */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (exports.SubApp = t()) : (e.SubApp = t());
})(self, () =>
  (() => {
    "use strict";
    var e = {
        193: function (e, t, r) {
          var n,
            o = r(271),
            u = Symbol.for("react.element"),
            a = Symbol.for("react.fragment"),
            c = Object.prototype.hasOwnProperty,
            f = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
            i = { key: !0, ref: !0, __self: !0, __source: !0 };
          function l(e, t, r) {
            var n,
              o = {},
              a = null,
              l = null;
            for (n in (void 0 !== r && (a = "" + r), void 0 !== t.key && (a = "" + t.key), void 0 !== t.ref && (l = t.ref), t)) c.call(t, n) && !i.hasOwnProperty(n) && (o[n] = t[n]);
            if (e && e.defaultProps) for (n in (t = e.defaultProps)) void 0 === o[n] && (o[n] = t[n]);
            return { $$typeof: u, type: e, key: a, ref: l, props: o, _owner: f.current };
          }
          t.jsx = l;
        },
        596: function (e, t) {
          var r = Symbol.for("react.element"),
            n = Symbol.for("react.portal"),
            o = Symbol.for("react.fragment"),
            u = Symbol.for("react.strict_mode"),
            a = Symbol.for("react.profiler"),
            c = Symbol.for("react.provider"),
            f = Symbol.for("react.context"),
            i = Symbol.for("react.forward_ref"),
            l = Symbol.for("react.suspense"),
            s = Symbol.for("react.memo"),
            p = Symbol.for("react.lazy"),
            y = Symbol.iterator,
            d = {
              isMounted: function () {
                return !1;
              },
              enqueueForceUpdate: function () {},
              enqueueReplaceState: function () {},
              enqueueSetState: function () {},
            },
            _ = Object.assign,
            v = {};
          function b(e, t, r) {
            (this.props = e), (this.context = t), (this.refs = v), (this.updater = r || d);
          }
          function m() {}
          function h(e, t, r) {
            (this.props = e), (this.context = t), (this.refs = v), (this.updater = r || d);
          }
          (b.prototype.isReactComponent = {}),
            (b.prototype.setState = function (e, t) {
              if ("object" != typeof e && "function" != typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
              this.updater.enqueueSetState(this, e, t, "setState");
            }),
            (b.prototype.forceUpdate = function (e) {
              this.updater.enqueueForceUpdate(this, e, "forceUpdate");
            }),
            (m.prototype = b.prototype);
          var S = (h.prototype = new m());
          (S.constructor = h), _(S, b.prototype), (S.isPureReactComponent = !0);
          var E = Array.isArray,
            w = Object.prototype.hasOwnProperty,
            R = { current: null },
            j = { key: !0, ref: !0, __self: !0, __source: !0 };
          function k(e, t, n) {
            var o,
              u = {},
              a = null,
              c = null;
            if (null != t) for (o in (void 0 !== t.ref && (c = t.ref), void 0 !== t.key && (a = "" + t.key), t)) w.call(t, o) && !j.hasOwnProperty(o) && (u[o] = t[o]);
            var f = arguments.length - 2;
            if (1 === f) u.children = n;
            else if (1 < f) {
              for (var i = Array(f), l = 0; l < f; l++) i[l] = arguments[l + 2];
              u.children = i;
            }
            if (e && e.defaultProps) for (o in (f = e.defaultProps)) void 0 === u[o] && (u[o] = f[o]);
            return { $$typeof: r, type: e, key: a, ref: c, props: u, _owner: R.current };
          }
          function $(e) {
            return "object" == typeof e && null !== e && e.$$typeof === r;
          }
          var x = /\/+/g;
          function O(e, t) {
            var r, n;
            return "object" == typeof e && null !== e && null != e.key
              ? ((r = "" + e.key),
                (n = { "=": "=0", ":": "=2" }),
                "$" +
                  r.replace(/[=:]/g, function (e) {
                    return n[e];
                  }))
              : t.toString(36);
          }
          function C(e, t, o) {
            if (null == e) return e;
            var u = [],
              a = 0;
            return (
              !(function e(t, o, u, a, c) {
                var f,
                  i,
                  l,
                  s = typeof t;
                ("undefined" === s || "boolean" === s) && (t = null);
                var p = !1;
                if (null === t) p = !0;
                else
                  switch (s) {
                    case "string":
                    case "number":
                      p = !0;
                      break;
                    case "object":
                      switch (t.$$typeof) {
                        case r:
                        case n:
                          p = !0;
                      }
                  }
                if (p) {
                  return (
                    (c = c((p = t))),
                    (t = "" === a ? "." + O(p, 0) : a),
                    E(c)
                      ? ((u = ""),
                        null != t && (u = t.replace(x, "$&/") + "/"),
                        e(c, o, u, "", function (e) {
                          return e;
                        }))
                      : null != c &&
                        ($(c) && ((f = c), (i = u + (!c.key || (p && p.key === c.key) ? "" : ("" + c.key).replace(x, "$&/") + "/") + t), (c = { $$typeof: r, type: f.type, key: i, ref: f.ref, props: f.props, _owner: f._owner })), o.push(c)),
                    1
                  );
                }
                if (((p = 0), (a = "" === a ? "." : a + ":"), E(t)))
                  for (var d = 0; d < t.length; d++) {
                    var _ = a + O((s = t[d]), d);
                    p += e(s, o, u, _, c);
                  }
                else {
                  if ("function" == typeof (_ = null === (l = t) || "object" != typeof l ? null : "function" == typeof (l = (y && l[y]) || l["@@iterator"]) ? l : null))
                    for (t = _.call(t), d = 0; !(s = t.next()).done; ) (_ = a + O((s = s.value), d++)), (p += e(s, o, u, _, c));
                  else if ("object" === s)
                    throw Error(
                      "Objects are not valid as a React child (found: " +
                        ("[object Object]" === (o = String(t)) ? "object with keys {" + Object.keys(t).join(", ") + "}" : o) +
                        "). If you meant to render a collection of children, use an array instead."
                    );
                }
                return p;
              })(e, u, "", "", function (e) {
                return t.call(o, e, a++);
              }),
              u
            );
          }
          function P(e) {
            if (-1 === e._status) {
              var t = e._result;
              (t = t()).then(
                function (t) {
                  (0 === e._status || -1 === e._status) && ((e._status = 1), (e._result = t));
                },
                function (t) {
                  (0 === e._status || -1 === e._status) && ((e._status = 2), (e._result = t));
                }
              ),
                -1 === e._status && ((e._status = 0), (e._result = t));
            }
            if (1 === e._status) return e._result.default;
            throw e._result;
          }
          var g = { current: null },
            I = { transition: null };
          function A() {
            throw Error("act(...) is not supported in production builds of React.");
          }
          (t.Children = {
            map: C,
            forEach: function (e, t, r) {
              C(
                e,
                function () {
                  t.apply(this, arguments);
                },
                r
              );
            },
            count: function (e) {
              var t = 0;
              return (
                C(e, function () {
                  t++;
                }),
                t
              );
            },
            toArray: function (e) {
              return (
                C(e, function (e) {
                  return e;
                }) || []
              );
            },
            only: function (e) {
              if (!$(e)) throw Error("React.Children.only expected to receive a single React element child.");
              return e;
            },
          }),
            (t.Component = b),
            (t.Fragment = o),
            (t.Profiler = a),
            (t.PureComponent = h),
            (t.StrictMode = u),
            (t.Suspense = l),
            (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = { ReactCurrentDispatcher: g, ReactCurrentBatchConfig: I, ReactCurrentOwner: R }),
            (t.act = A),
            (t.cloneElement = function (e, t, n) {
              if (null == e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
              var o = _({}, e.props),
                u = e.key,
                a = e.ref,
                c = e._owner;
              if (null != t) {
                if ((void 0 !== t.ref && ((a = t.ref), (c = R.current)), void 0 !== t.key && (u = "" + t.key), e.type && e.type.defaultProps)) var f = e.type.defaultProps;
                for (i in t) w.call(t, i) && !j.hasOwnProperty(i) && (o[i] = void 0 === t[i] && void 0 !== f ? f[i] : t[i]);
              }
              var i = arguments.length - 2;
              if (1 === i) o.children = n;
              else if (1 < i) {
                f = Array(i);
                for (var l = 0; l < i; l++) f[l] = arguments[l + 2];
                o.children = f;
              }
              return { $$typeof: r, type: e.type, key: u, ref: a, props: o, _owner: c };
            }),
            (t.createContext = function (e) {
              return ((e = { $$typeof: f, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }).Provider = { $$typeof: c, _context: e }), (e.Consumer = e);
            }),
            (t.createElement = k),
            (t.createFactory = function (e) {
              var t = k.bind(null, e);
              return (t.type = e), t;
            }),
            (t.createRef = function () {
              return { current: null };
            }),
            (t.forwardRef = function (e) {
              return { $$typeof: i, render: e };
            }),
            (t.isValidElement = $),
            (t.lazy = function (e) {
              return { $$typeof: p, _payload: { _status: -1, _result: e }, _init: P };
            }),
            (t.memo = function (e, t) {
              return { $$typeof: s, type: e, compare: void 0 === t ? null : t };
            }),
            (t.startTransition = function (e) {
              var t = I.transition;
              I.transition = {};
              try {
                e();
              } finally {
                I.transition = t;
              }
            }),
            (t.unstable_act = A),
            (t.useCallback = function (e, t) {
              return g.current.useCallback(e, t);
            }),
            (t.useContext = function (e) {
              return g.current.useContext(e);
            }),
            (t.useDebugValue = function () {}),
            (t.useDeferredValue = function (e) {
              return g.current.useDeferredValue(e);
            }),
            (t.useEffect = function (e, t) {
              return g.current.useEffect(e, t);
            }),
            (t.useId = function () {
              return g.current.useId();
            }),
            (t.useImperativeHandle = function (e, t, r) {
              return g.current.useImperativeHandle(e, t, r);
            }),
            (t.useInsertionEffect = function (e, t) {
              return g.current.useInsertionEffect(e, t);
            }),
            (t.useLayoutEffect = function (e, t) {
              return g.current.useLayoutEffect(e, t);
            }),
            (t.useMemo = function (e, t) {
              return g.current.useMemo(e, t);
            }),
            (t.useReducer = function (e, t, r) {
              return g.current.useReducer(e, t, r);
            }),
            (t.useRef = function (e) {
              return g.current.useRef(e);
            }),
            (t.useState = function (e) {
              return g.current.useState(e);
            }),
            (t.useSyncExternalStore = function (e, t, r) {
              return g.current.useSyncExternalStore(e, t, r);
            }),
            (t.useTransition = function () {
              return g.current.useTransition();
            }),
            (t.version = "18.3.1");
        },
        271: function (e, t, r) {
          e.exports = r(596);
        },
        676: function (e, t, r) {
          e.exports = r(193);
        },
      },
      t = {};
    function r(n) {
      var o = t[n];
      if (void 0 !== o) return o.exports;
      var u = (t[n] = { exports: {} });
      return e[n](u, u.exports, r), u.exports;
    }
    (r.d = function (e, t) {
      for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      });
    var n = {};
    r.d(n, { default: () => c });
    var o = r("676"),
      u = r("271");
    let a = () => (0, o.jsx)("div", { className: "content", children: (0, o.jsx)("h1", { children: "Sub App" }) }),
      c = u.lazy(() => Promise.resolve({ default: a }));
    return (n = n.default);
  })()
);

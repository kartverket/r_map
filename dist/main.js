import e, { createContext as t, useContext as n, useEffect as r, useLayoutEffect as i, useReducer as a, useState as o } from "react";
import s from "ol/format/WMSCapabilities";
import c from "ol/format/WMTSCapabilities.js";
import l from "ol/source/ImageWMS";
import u from "ol/layer/Image";
import { GML as d, GeoJSON as f, WFS as p, WMSCapabilities as m } from "ol/format";
import h from "ol/format/GML2";
import g from "ol/format/GML32";
import _ from "ol/format/GeoJSON.js";
import { Vector as v } from "ol/layer.js";
import { Vector as y } from "ol/source.js";
import { bbox as b } from "ol/loadingstrategy.js";
import { Circle as x, Fill as S, Icon as C, RegularShape as w, Stroke as T, Style as E, Text as D } from "ol/style";
import O from "ol/Map";
import ee from "ol/proj/Projection";
import te from "ol/View";
import { defaults as ne } from "ol/interaction";
import re from "ol/control/MousePosition.js";
import ie from "ol/format/GML3";
import ae from "ol/style/Style";
import { Image as oe, Tile as se, Vector as ce } from "ol/layer";
import { ImageWMS as le, TileWMS as ue, Vector as de } from "ol/source";
import { get as fe, transform as pe, transformExtent as me } from "ol/proj.js";
import { ScaleLine as he, Zoom as ge, ZoomSlider as _e, ZoomToExtent as ve } from "ol/control";
import { Circle as ye, Point as be } from "ol/geom.js";
import xe from "ol/geom/GeometryCollection";
import Se from "ol/Feature.js";
import { containsCoordinate as Ce, getCenter as we, getTopLeft as k, getWidth as Te } from "ol/extent";
import Ee from "ol/Geolocation";
import A from "ol/format/WMTSCapabilities";
import De from "ol/source/WMTS";
import Oe from "ol/tilegrid/WMTS";
import j from "ol/tilegrid/TileGrid";
import { bbox as M, tile as ke } from "ol/loadingstrategy";
import { parse as N } from "ol/xml";
import { Projection as Ae, addProjection as je, transform as Me } from "ol/proj";
import { register as Ne } from "ol/proj/proj4.js";
import { METERS_PER_UNIT as Pe } from "ol/proj/Units";
import { Point as Fe, Polygon as Ie } from "ol/geom";
import Le from "ol/geom/LinearRing";
import Re from "ol/Overlay";
import ze from "ol/Feature";
import { FontAwesomeIcon as P } from "@fortawesome/react-fontawesome";
import { Fragment as F, jsx as I, jsxs as L } from "react/jsx-runtime";
import { ToggleButton as Be, ToggleButtonGroup as Ve } from "react-bootstrap";
import He from "ol/geom/Point";
import { format as Ue } from "ol/coordinate.js";
import We from "ol/control/MousePosition";
import Ge from "react-bootstrap/Modal";
import { library as Ke } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown as qe, faAngleUp as Je, faLayerGroup as Ye, faSlidersH as Xe, faTimes as Ze } from "@fortawesome/free-solid-svg-icons";
import { faCheckSquare as Qe, faSquare as $e } from "@fortawesome/free-regular-svg-icons";
//#region \0rolldown/runtime.js
var et = Object.create, tt = Object.defineProperty, nt = Object.getOwnPropertyDescriptor, rt = Object.getOwnPropertyNames, it = Object.getPrototypeOf, at = Object.prototype.hasOwnProperty, R = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ot = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = rt(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !at.call(e, s) && s !== n && tt(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = nt(t, s)) || r.enumerable
	});
	return e;
}, st = (e, t, n) => (n = e == null ? {} : et(it(e)), ot(t || !e || !e.__esModule ? tt(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), ct = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), lt = class {
	static s4() {
		return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
	}
	static newGuid() {
		return `${this.s4() + this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}${this.s4()}${this.s4()}`;
	}
}, ut = /* @__PURE__ */ R(((e, t) => {
	t.exports = (e) => encodeURIComponent(e).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`);
})), dt = /* @__PURE__ */ R(((e, t) => {
	var n = "%[a-f0-9]{2}", r = RegExp("(" + n + ")|([^%]+?)", "gi"), i = RegExp("(" + n + ")+", "gi");
	function a(e, t) {
		try {
			return [decodeURIComponent(e.join(""))];
		} catch {}
		if (e.length === 1) return e;
		t ||= 1;
		var n = e.slice(0, t), r = e.slice(t);
		return Array.prototype.concat.call([], a(n), a(r));
	}
	function o(e) {
		try {
			return decodeURIComponent(e);
		} catch {
			for (var t = e.match(r) || [], n = 1; n < t.length; n++) e = a(t, n).join(""), t = e.match(r) || [];
			return e;
		}
	}
	function s(e) {
		for (var t = {
			"%FE%FF": "��",
			"%FF%FE": "��"
		}, n = i.exec(e); n;) {
			try {
				t[n[0]] = decodeURIComponent(n[0]);
			} catch {
				var r = o(n[0]);
				r !== n[0] && (t[n[0]] = r);
			}
			n = i.exec(e);
		}
		t["%C2"] = "�";
		for (var a = Object.keys(t), s = 0; s < a.length; s++) {
			var c = a[s];
			e = e.replace(new RegExp(c, "g"), t[c]);
		}
		return e;
	}
	t.exports = function(e) {
		if (typeof e != "string") throw TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
		try {
			return e = e.replace(/\+/g, " "), decodeURIComponent(e);
		} catch {
			return s(e);
		}
	};
})), ft = /* @__PURE__ */ R(((e, t) => {
	t.exports = (e, t) => {
		if (!(typeof e == "string" && typeof t == "string")) throw TypeError("Expected the arguments to be of type `string`");
		if (t === "") return [e];
		let n = e.indexOf(t);
		return n === -1 ? [e] : [e.slice(0, n), e.slice(n + t.length)];
	};
})), pt = /* @__PURE__ */ R(((e, t) => {
	t.exports = function(e, t) {
		for (var n = {}, r = Object.keys(e), i = Array.isArray(t), a = 0; a < r.length; a++) {
			var o = r[a], s = e[o];
			(i ? t.indexOf(o) !== -1 : t(o, s, e)) && (n[o] = s);
		}
		return n;
	};
})), mt = /* @__PURE__ */ R(((e) => {
	var t = ut(), n = dt(), r = ft(), i = pt(), a = (e) => e == null, o = Symbol("encodeFragmentIdentifier");
	function s(e) {
		switch (e.arrayFormat) {
			case "index": return (t) => (n, r) => {
				let i = n.length;
				return r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? n : r === null ? [...n, [
					u(t, e),
					"[",
					i,
					"]"
				].join("")] : [...n, [
					u(t, e),
					"[",
					u(i, e),
					"]=",
					u(r, e)
				].join("")];
			};
			case "bracket": return (t) => (n, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? n : r === null ? [...n, [u(t, e), "[]"].join("")] : [...n, [
				u(t, e),
				"[]=",
				u(r, e)
			].join("")];
			case "colon-list-separator": return (t) => (n, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? n : r === null ? [...n, [u(t, e), ":list="].join("")] : [...n, [
				u(t, e),
				":list=",
				u(r, e)
			].join("")];
			case "comma":
			case "separator":
			case "bracket-separator": {
				let t = e.arrayFormat === "bracket-separator" ? "[]=" : "=";
				return (n) => (r, i) => i === void 0 || e.skipNull && i === null || e.skipEmptyString && i === "" ? r : (i = i === null ? "" : i, r.length === 0 ? [[
					u(n, e),
					t,
					u(i, e)
				].join("")] : [[r, u(i, e)].join(e.arrayFormatSeparator)]);
			}
			default: return (t) => (n, r) => r === void 0 || e.skipNull && r === null || e.skipEmptyString && r === "" ? n : r === null ? [...n, u(t, e)] : [...n, [
				u(t, e),
				"=",
				u(r, e)
			].join("")];
		}
	}
	function c(e) {
		let t;
		switch (e.arrayFormat) {
			case "index": return (e, n, r) => {
				if (t = /\[(\d*)\]$/.exec(e), e = e.replace(/\[\d*\]$/, ""), !t) {
					r[e] = n;
					return;
				}
				r[e] === void 0 && (r[e] = {}), r[e][t[1]] = n;
			};
			case "bracket": return (e, n, r) => {
				if (t = /(\[\])$/.exec(e), e = e.replace(/\[\]$/, ""), !t) {
					r[e] = n;
					return;
				}
				if (r[e] === void 0) {
					r[e] = [n];
					return;
				}
				r[e] = [].concat(r[e], n);
			};
			case "colon-list-separator": return (e, n, r) => {
				if (t = /(:list)$/.exec(e), e = e.replace(/:list$/, ""), !t) {
					r[e] = n;
					return;
				}
				if (r[e] === void 0) {
					r[e] = [n];
					return;
				}
				r[e] = [].concat(r[e], n);
			};
			case "comma":
			case "separator": return (t, n, r) => {
				let i = typeof n == "string" && n.includes(e.arrayFormatSeparator), a = typeof n == "string" && !i && d(n, e).includes(e.arrayFormatSeparator);
				n = a ? d(n, e) : n, r[t] = i || a ? n.split(e.arrayFormatSeparator).map((t) => d(t, e)) : n === null ? n : d(n, e);
			};
			case "bracket-separator": return (t, n, r) => {
				let i = /(\[\])$/.test(t);
				if (t = t.replace(/\[\]$/, ""), !i) {
					r[t] = n && d(n, e);
					return;
				}
				let a = n === null ? [] : n.split(e.arrayFormatSeparator).map((t) => d(t, e));
				if (r[t] === void 0) {
					r[t] = a;
					return;
				}
				r[t] = [].concat(r[t], a);
			};
			default: return (e, t, n) => {
				if (n[e] === void 0) {
					n[e] = t;
					return;
				}
				n[e] = [].concat(n[e], t);
			};
		}
	}
	function l(e) {
		if (typeof e != "string" || e.length !== 1) throw TypeError("arrayFormatSeparator must be single character string");
	}
	function u(e, n) {
		return n.encode ? n.strict ? t(e) : encodeURIComponent(e) : e;
	}
	function d(e, t) {
		return t.decode ? n(e) : e;
	}
	function f(e) {
		return Array.isArray(e) ? e.sort() : typeof e == "object" ? f(Object.keys(e)).sort((e, t) => Number(e) - Number(t)).map((t) => e[t]) : e;
	}
	function p(e) {
		let t = e.indexOf("#");
		return t !== -1 && (e = e.slice(0, t)), e;
	}
	function m(e) {
		let t = "", n = e.indexOf("#");
		return n !== -1 && (t = e.slice(n)), t;
	}
	function h(e) {
		e = p(e);
		let t = e.indexOf("?");
		return t === -1 ? "" : e.slice(t + 1);
	}
	function g(e, t) {
		return t.parseNumbers && !Number.isNaN(Number(e)) && typeof e == "string" && e.trim() !== "" ? e = Number(e) : t.parseBooleans && e !== null && (e.toLowerCase() === "true" || e.toLowerCase() === "false") && (e = e.toLowerCase() === "true"), e;
	}
	function _(e, t) {
		t = Object.assign({
			decode: !0,
			sort: !0,
			arrayFormat: "none",
			arrayFormatSeparator: ",",
			parseNumbers: !1,
			parseBooleans: !1
		}, t), l(t.arrayFormatSeparator);
		let n = c(t), i = Object.create(null);
		if (typeof e != "string" || (e = e.trim().replace(/^[?#&]/, ""), !e)) return i;
		for (let a of e.split("&")) {
			if (a === "") continue;
			let [e, o] = r(t.decode ? a.replace(/\+/g, " ") : a, "=");
			o = o === void 0 ? null : [
				"comma",
				"separator",
				"bracket-separator"
			].includes(t.arrayFormat) ? o : d(o, t), n(d(e, t), o, i);
		}
		for (let e of Object.keys(i)) {
			let n = i[e];
			if (typeof n == "object" && n) for (let e of Object.keys(n)) n[e] = g(n[e], t);
			else i[e] = g(n, t);
		}
		return t.sort === !1 ? i : (t.sort === !0 ? Object.keys(i).sort() : Object.keys(i).sort(t.sort)).reduce((e, t) => {
			let n = i[t];
			return n && typeof n == "object" && !Array.isArray(n) ? e[t] = f(n) : e[t] = n, e;
		}, Object.create(null));
	}
	e.extract = h, e.parse = _, e.stringify = (e, t) => {
		if (!e) return "";
		t = Object.assign({
			encode: !0,
			strict: !0,
			arrayFormat: "none",
			arrayFormatSeparator: ","
		}, t), l(t.arrayFormatSeparator);
		let n = (n) => t.skipNull && a(e[n]) || t.skipEmptyString && e[n] === "", r = s(t), i = {};
		for (let t of Object.keys(e)) n(t) || (i[t] = e[t]);
		let o = Object.keys(i);
		return t.sort !== !1 && o.sort(t.sort), o.map((n) => {
			let i = e[n];
			return i === void 0 ? "" : i === null ? u(n, t) : Array.isArray(i) ? i.length === 0 && t.arrayFormat === "bracket-separator" ? u(n, t) + "[]" : i.reduce(r(n), []).join("&") : u(n, t) + "=" + u(i, t);
		}).filter((e) => e.length > 0).join("&");
	}, e.parseUrl = (e, t) => {
		t = Object.assign({ decode: !0 }, t);
		let [n, i] = r(e, "#");
		return Object.assign({
			url: n.split("?")[0] || "",
			query: _(h(e), t)
		}, t && t.parseFragmentIdentifier && i ? { fragmentIdentifier: d(i, t) } : {});
	}, e.stringifyUrl = (t, n) => {
		n = Object.assign({
			encode: !0,
			strict: !0,
			[o]: !0
		}, n);
		let r = p(t.url).split("?")[0] || "", i = e.extract(t.url), a = e.parse(i, { sort: !1 }), s = Object.assign(a, t.query), c = e.stringify(s, n);
		c &&= `?${c}`;
		let l = m(t.url);
		return t.fragmentIdentifier && (l = `#${n[o] ? u(t.fragmentIdentifier, n) : t.fragmentIdentifier}`), `${r}${c}${l}`;
	}, e.pick = (t, n, r) => {
		r = Object.assign({
			parseFragmentIdentifier: !0,
			[o]: !1
		}, r);
		let { url: a, query: s, fragmentIdentifier: c } = e.parseUrl(t, r);
		return e.stringifyUrl({
			url: a,
			query: i(s, n),
			fragmentIdentifier: c
		}, r);
	}, e.exclude = (t, n, r) => {
		let i = Array.isArray(n) ? (e) => !n.includes(e) : (e, t) => !n(e, t);
		return e.pick(t, i, r);
	};
})), ht = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
ht + "";
var gt = "[" + ht + "][:A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*", _t = RegExp("^" + gt + "$");
function vt(e, t) {
	let n = [], r = t.exec(e);
	for (; r;) {
		let i = [];
		i.startIndex = t.lastIndex - r[0].length;
		let a = r.length;
		for (let e = 0; e < a; e++) i.push(r[e]);
		n.push(i), r = t.exec(e);
	}
	return n;
}
var yt = function(e) {
	return _t.exec(e) != null;
};
function bt(e) {
	return e !== void 0;
}
var xt = [
	"hasOwnProperty",
	"toString",
	"valueOf",
	"__defineGetter__",
	"__defineSetter__",
	"__lookupGetter__",
	"__lookupSetter__"
], St = [
	"__proto__",
	"constructor",
	"prototype"
], Ct = {
	allowBooleanAttributes: !1,
	unpairedTags: []
};
function wt(e, t) {
	t = Object.assign({}, Ct, t);
	let n = [], r = !1, i = !1;
	e[0] === "﻿" && (e = e.substr(1));
	for (let a = 0; a < e.length; a++) if (e[a] === "<" && e[a + 1] === "?") {
		if (a += 2, a = Tt(e, a), a.err) return a;
	} else if (e[a] === "<") {
		let o = a;
		if (a++, e[a] === "!") {
			a = Et(e, a);
			continue;
		} else {
			let s = !1;
			e[a] === "/" && (s = !0, a++);
			let c = "";
			for (; a < e.length && e[a] !== ">" && e[a] !== " " && e[a] !== "	" && e[a] !== "\n" && e[a] !== "\r"; a++) c += e[a];
			if (c = c.trim(), c[c.length - 1] === "/" && (c = c.substring(0, c.length - 1), a--), !Ft(c)) {
				let t;
				return t = c.trim().length === 0 ? "Invalid space after '<'." : "Tag '" + c + "' is an invalid name.", B("InvalidTag", t, V(e, a));
			}
			let l = kt(e, a);
			if (l === !1) return B("InvalidAttr", "Attributes for '" + c + "' have open quote.", V(e, a));
			let u = l.value;
			if (a = l.index, u[u.length - 1] === "/") {
				let n = a - u.length;
				u = u.substring(0, u.length - 1);
				let i = jt(u, t);
				if (i === !0) r = !0;
				else return B(i.err.code, i.err.msg, V(e, n + i.err.line));
			} else if (s) {
				if (!l.tagClosed) return B("InvalidTag", "Closing tag '" + c + "' doesn't have proper closing.", V(e, a));
				if (u.trim().length > 0) return B("InvalidTag", "Closing tag '" + c + "' can't have attributes or invalid starting.", V(e, o));
				if (n.length === 0) return B("InvalidTag", "Closing tag '" + c + "' has not been opened.", V(e, o));
				{
					let t = n.pop();
					if (c !== t.tagName) {
						let n = V(e, t.tagStartPos);
						return B("InvalidTag", "Expected closing tag '" + t.tagName + "' (opened in line " + n.line + ", col " + n.col + ") instead of closing tag '" + c + "'.", V(e, o));
					}
					n.length == 0 && (i = !0);
				}
			} else {
				let s = jt(u, t);
				if (s !== !0) return B(s.err.code, s.err.msg, V(e, a - u.length + s.err.line));
				if (i === !0) return B("InvalidXml", "Multiple possible root nodes found.", V(e, a));
				t.unpairedTags.indexOf(c) !== -1 || n.push({
					tagName: c,
					tagStartPos: o
				}), r = !0;
			}
			for (a++; a < e.length; a++) if (e[a] === "<") if (e[a + 1] === "!") {
				a++, a = Et(e, a);
				continue;
			} else if (e[a + 1] === "?") {
				if (a = Tt(e, ++a), a.err) return a;
			} else break;
			else if (e[a] === "&") {
				let t = Nt(e, a);
				if (t == -1) return B("InvalidChar", "char '&' is not expected.", V(e, a));
				a = t;
			} else if (i === !0 && !z(e[a])) return B("InvalidXml", "Extra text at the end", V(e, a));
			e[a] === "<" && a--;
		}
	} else {
		if (z(e[a])) continue;
		return B("InvalidChar", "char '" + e[a] + "' is not expected.", V(e, a));
	}
	return r ? n.length == 1 ? B("InvalidTag", "Unclosed tag '" + n[0].tagName + "'.", V(e, n[0].tagStartPos)) : n.length > 0 ? B("InvalidXml", "Invalid '" + JSON.stringify(n.map((e) => e.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", {
		line: 1,
		col: 1
	}) : !0 : B("InvalidXml", "Start tag expected.", 1);
}
function z(e) {
	return e === " " || e === "	" || e === "\n" || e === "\r";
}
function Tt(e, t) {
	let n = t;
	for (; t < e.length; t++) if (e[t] == "?" || e[t] == " ") {
		let r = e.substr(n, t - n);
		if (t > 5 && r === "xml") return B("InvalidXml", "XML declaration allowed only at the start of the document.", V(e, t));
		if (e[t] == "?" && e[t + 1] == ">") {
			t++;
			break;
		} else continue;
	}
	return t;
}
function Et(e, t) {
	if (e.length > t + 5 && e[t + 1] === "-" && e[t + 2] === "-") {
		for (t += 3; t < e.length; t++) if (e[t] === "-" && e[t + 1] === "-" && e[t + 2] === ">") {
			t += 2;
			break;
		}
	} else if (e.length > t + 8 && e[t + 1] === "D" && e[t + 2] === "O" && e[t + 3] === "C" && e[t + 4] === "T" && e[t + 5] === "Y" && e[t + 6] === "P" && e[t + 7] === "E") {
		let n = 1;
		for (t += 8; t < e.length; t++) if (e[t] === "<") n++;
		else if (e[t] === ">" && (n--, n === 0)) break;
	} else if (e.length > t + 9 && e[t + 1] === "[" && e[t + 2] === "C" && e[t + 3] === "D" && e[t + 4] === "A" && e[t + 5] === "T" && e[t + 6] === "A" && e[t + 7] === "[") {
		for (t += 8; t < e.length; t++) if (e[t] === "]" && e[t + 1] === "]" && e[t + 2] === ">") {
			t += 2;
			break;
		}
	}
	return t;
}
var Dt = "\"", Ot = "'";
function kt(e, t) {
	let n = "", r = "", i = !1;
	for (; t < e.length; t++) {
		if (e[t] === Dt || e[t] === Ot) r === "" ? r = e[t] : r !== e[t] || (r = "");
		else if (e[t] === ">" && r === "") {
			i = !0;
			break;
		}
		n += e[t];
	}
	return r === "" ? {
		value: n,
		index: t,
		tagClosed: i
	} : !1;
}
var At = /* @__PURE__ */ RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?", "g");
function jt(e, t) {
	let n = vt(e, At), r = {};
	for (let e = 0; e < n.length; e++) {
		if (n[e][1].length === 0) return B("InvalidAttr", "Attribute '" + n[e][2] + "' has no space in starting.", It(n[e]));
		if (n[e][3] !== void 0 && n[e][4] === void 0) return B("InvalidAttr", "Attribute '" + n[e][2] + "' is without value.", It(n[e]));
		if (n[e][3] === void 0 && !t.allowBooleanAttributes) return B("InvalidAttr", "boolean attribute '" + n[e][2] + "' is not allowed.", It(n[e]));
		let i = n[e][2];
		if (!Pt(i)) return B("InvalidAttr", "Attribute '" + i + "' is an invalid name.", It(n[e]));
		if (!Object.prototype.hasOwnProperty.call(r, i)) r[i] = 1;
		else return B("InvalidAttr", "Attribute '" + i + "' is repeated.", It(n[e]));
	}
	return !0;
}
function Mt(e, t) {
	let n = /\d/;
	for (e[t] === "x" && (t++, n = /[\da-fA-F]/); t < e.length; t++) {
		if (e[t] === ";") return t;
		if (!e[t].match(n)) break;
	}
	return -1;
}
function Nt(e, t) {
	if (t++, e[t] === ";") return -1;
	if (e[t] === "#") return t++, Mt(e, t);
	let n = 0;
	for (; t < e.length; t++, n++) if (!(e[t].match(/\w/) && n < 20)) {
		if (e[t] === ";") break;
		return -1;
	}
	return t;
}
function B(e, t, n) {
	return { err: {
		code: e,
		msg: t,
		line: n.line || n,
		col: n.col
	} };
}
function Pt(e) {
	return yt(e);
}
function Ft(e) {
	return yt(e);
}
function V(e, t) {
	let n = e.substring(0, t).split(/\r?\n/);
	return {
		line: n.length,
		col: n[n.length - 1].length + 1
	};
}
function It(e) {
	return e.startIndex + e[1].length;
}
//#endregion
//#region node_modules/@nodable/entities/src/entities.js
var Lt = {
	amp: "&",
	AMP: "&",
	lt: "<",
	LT: "<",
	gt: ">",
	GT: ">",
	quot: "\"",
	QUOT: "\"",
	apos: "'",
	lsquo: "‘",
	rsquo: "’",
	ldquo: "“",
	rdquo: "”",
	lsquor: "‚",
	rsquor: "’",
	ldquor: "„",
	bdquo: "„",
	comma: ",",
	period: ".",
	colon: ":",
	semi: ";",
	excl: "!",
	quest: "?",
	num: "#",
	dollar: "$",
	percent: "%",
	amp: "&",
	ast: "*",
	commat: "@",
	lowbar: "_",
	verbar: "|",
	vert: "|",
	sol: "/",
	bsol: "\\",
	lbrace: "{",
	rbrace: "}",
	lbrack: "[",
	rbrack: "]",
	lpar: "(",
	rpar: ")",
	nbsp: "\xA0",
	iexcl: "¡",
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	brvbar: "¦",
	sect: "§",
	uml: "¨",
	copy: "©",
	COPY: "©",
	ordf: "ª",
	laquo: "«",
	not: "¬",
	shy: "­",
	reg: "®",
	REG: "®",
	macr: "¯",
	deg: "°",
	plusmn: "±",
	sup2: "²",
	sup3: "³",
	acute: "´",
	micro: "µ",
	para: "¶",
	middot: "·",
	cedil: "¸",
	sup1: "¹",
	ordm: "º",
	raquo: "»",
	frac14: "¼",
	frac12: "½",
	half: "½",
	frac34: "¾",
	iquest: "¿",
	times: "×",
	div: "÷",
	divide: "÷"
}, Rt = {
	Agrave: "À",
	agrave: "à",
	Aacute: "Á",
	aacute: "á",
	Acirc: "Â",
	acirc: "â",
	Atilde: "Ã",
	atilde: "ã",
	Auml: "Ä",
	auml: "ä",
	Aring: "Å",
	aring: "å",
	AElig: "Æ",
	aelig: "æ",
	Ccedil: "Ç",
	ccedil: "ç",
	Egrave: "È",
	egrave: "è",
	Eacute: "É",
	eacute: "é",
	Ecirc: "Ê",
	ecirc: "ê",
	Euml: "Ë",
	euml: "ë",
	Igrave: "Ì",
	igrave: "ì",
	Iacute: "Í",
	iacute: "í",
	Icirc: "Î",
	icirc: "î",
	Iuml: "Ï",
	iuml: "ï",
	ETH: "Ð",
	eth: "ð",
	Ntilde: "Ñ",
	ntilde: "ñ",
	Ograve: "Ò",
	ograve: "ò",
	Oacute: "Ó",
	oacute: "ó",
	Ocirc: "Ô",
	ocirc: "ô",
	Otilde: "Õ",
	otilde: "õ",
	Ouml: "Ö",
	ouml: "ö",
	Oslash: "Ø",
	oslash: "ø",
	Ugrave: "Ù",
	ugrave: "ù",
	Uacute: "Ú",
	uacute: "ú",
	Ucirc: "Û",
	ucirc: "û",
	Uuml: "Ü",
	uuml: "ü",
	Yacute: "Ý",
	yacute: "ý",
	THORN: "Þ",
	thorn: "þ",
	szlig: "ß",
	yuml: "ÿ",
	Yuml: "Ÿ"
}, zt = {
	Amacr: "Ā",
	amacr: "ā",
	Abreve: "Ă",
	abreve: "ă",
	Aogon: "Ą",
	aogon: "ą",
	Cacute: "Ć",
	cacute: "ć",
	Ccirc: "Ĉ",
	ccirc: "ĉ",
	Cdot: "Ċ",
	cdot: "ċ",
	Ccaron: "Č",
	ccaron: "č",
	Dcaron: "Ď",
	dcaron: "ď",
	Dstrok: "Đ",
	dstrok: "đ",
	Emacr: "Ē",
	emacr: "ē",
	Ecaron: "Ě",
	ecaron: "ě",
	Edot: "Ė",
	edot: "ė",
	Eogon: "Ę",
	eogon: "ę",
	Gcirc: "Ĝ",
	gcirc: "ĝ",
	Gbreve: "Ğ",
	gbreve: "ğ",
	Gdot: "Ġ",
	gdot: "ġ",
	Gcedil: "Ģ",
	Hcirc: "Ĥ",
	hcirc: "ĥ",
	Hstrok: "Ħ",
	hstrok: "ħ",
	Itilde: "Ĩ",
	itilde: "ĩ",
	Imacr: "Ī",
	imacr: "ī",
	Iogon: "Į",
	iogon: "į",
	Idot: "İ",
	IJlig: "Ĳ",
	ijlig: "ĳ",
	Jcirc: "Ĵ",
	jcirc: "ĵ",
	Kcedil: "Ķ",
	kcedil: "ķ",
	kgreen: "ĸ",
	Lacute: "Ĺ",
	lacute: "ĺ",
	Lcedil: "Ļ",
	lcedil: "ļ",
	Lcaron: "Ľ",
	lcaron: "ľ",
	Lmidot: "Ŀ",
	lmidot: "ŀ",
	Lstrok: "Ł",
	lstrok: "ł",
	Nacute: "Ń",
	nacute: "ń",
	Ncaron: "Ň",
	ncaron: "ň",
	Ncedil: "Ņ",
	ncedil: "ņ",
	ENG: "Ŋ",
	eng: "ŋ",
	Omacr: "Ō",
	omacr: "ō",
	Odblac: "Ő",
	odblac: "ő",
	OElig: "Œ",
	oelig: "œ",
	Racute: "Ŕ",
	racute: "ŕ",
	Rcaron: "Ř",
	rcaron: "ř",
	Rcedil: "Ŗ",
	rcedil: "ŗ",
	Sacute: "Ś",
	sacute: "ś",
	Scirc: "Ŝ",
	scirc: "ŝ",
	Scedil: "Ş",
	scedil: "ş",
	Scaron: "Š",
	scaron: "š",
	Tcedil: "Ţ",
	tcedil: "ţ",
	Tcaron: "Ť",
	tcaron: "ť",
	Tstrok: "Ŧ",
	tstrok: "ŧ",
	Utilde: "Ũ",
	utilde: "ũ",
	Umacr: "Ū",
	umacr: "ū",
	Ubreve: "Ŭ",
	ubreve: "ŭ",
	Uring: "Ů",
	uring: "ů",
	Udblac: "Ű",
	udblac: "ű",
	Uogon: "Ų",
	uogon: "ų",
	Wcirc: "Ŵ",
	wcirc: "ŵ",
	Ycirc: "Ŷ",
	ycirc: "ŷ",
	Zacute: "Ź",
	zacute: "ź",
	Zdot: "Ż",
	zdot: "ż",
	Zcaron: "Ž",
	zcaron: "ž"
}, Bt = {
	Alpha: "Α",
	alpha: "α",
	Beta: "Β",
	beta: "β",
	Gamma: "Γ",
	gamma: "γ",
	Delta: "Δ",
	delta: "δ",
	Epsilon: "Ε",
	epsilon: "ε",
	epsiv: "ϵ",
	varepsilon: "ϵ",
	Zeta: "Ζ",
	zeta: "ζ",
	Eta: "Η",
	eta: "η",
	Theta: "Θ",
	theta: "θ",
	thetasym: "ϑ",
	vartheta: "ϑ",
	Iota: "Ι",
	iota: "ι",
	Kappa: "Κ",
	kappa: "κ",
	kappav: "ϰ",
	varkappa: "ϰ",
	Lambda: "Λ",
	lambda: "λ",
	Mu: "Μ",
	mu: "μ",
	Nu: "Ν",
	nu: "ν",
	Xi: "Ξ",
	xi: "ξ",
	Omicron: "Ο",
	omicron: "ο",
	Pi: "Π",
	pi: "π",
	piv: "ϖ",
	varpi: "ϖ",
	Rho: "Ρ",
	rho: "ρ",
	rhov: "ϱ",
	varrho: "ϱ",
	Sigma: "Σ",
	sigma: "σ",
	sigmaf: "ς",
	sigmav: "ς",
	varsigma: "ς",
	Tau: "Τ",
	tau: "τ",
	Upsilon: "Υ",
	upsilon: "υ",
	upsi: "υ",
	Upsi: "ϒ",
	upsih: "ϒ",
	Phi: "Φ",
	phi: "φ",
	phiv: "ϕ",
	varphi: "ϕ",
	Chi: "Χ",
	chi: "χ",
	Psi: "Ψ",
	psi: "ψ",
	Omega: "Ω",
	omega: "ω",
	ohm: "Ω",
	Gammad: "Ϝ",
	gammad: "ϝ",
	digamma: "ϝ"
}, Vt = {
	Afr: "𝔄",
	afr: "𝔞",
	Acy: "А",
	acy: "а",
	Bcy: "Б",
	bcy: "б",
	Vcy: "В",
	vcy: "в",
	Gcy: "Г",
	gcy: "г",
	Dcy: "Д",
	dcy: "д",
	IEcy: "Е",
	iecy: "е",
	IOcy: "Ё",
	iocy: "ё",
	ZHcy: "Ж",
	zhcy: "ж",
	Zcy: "З",
	zcy: "з",
	Icy: "И",
	icy: "и",
	Jcy: "Й",
	jcy: "й",
	Kcy: "К",
	kcy: "к",
	Lcy: "Л",
	lcy: "л",
	Mcy: "М",
	mcy: "м",
	Ncy: "Н",
	ncy: "н",
	Ocy: "О",
	ocy: "о",
	Pcy: "П",
	pcy: "п",
	Rcy: "Р",
	rcy: "р",
	Scy: "С",
	scy: "с",
	Tcy: "Т",
	tcy: "т",
	Ucy: "У",
	ucy: "у",
	Fcy: "Ф",
	fcy: "ф",
	KHcy: "Х",
	khcy: "х",
	TScy: "Ц",
	tscy: "ц",
	CHcy: "Ч",
	chcy: "ч",
	SHcy: "Ш",
	shcy: "ш",
	SHCHcy: "Щ",
	shchcy: "щ",
	HARDcy: "Ъ",
	hardcy: "ъ",
	Ycy: "Ы",
	ycy: "ы",
	SOFTcy: "Ь",
	softcy: "ь",
	Ecy: "Э",
	ecy: "э",
	YUcy: "Ю",
	yucy: "ю",
	YAcy: "Я",
	yacy: "я",
	DJcy: "Ђ",
	djcy: "ђ",
	GJcy: "Ѓ",
	gjcy: "ѓ",
	Jukcy: "Є",
	jukcy: "є",
	DScy: "Ѕ",
	dscy: "ѕ",
	Iukcy: "І",
	iukcy: "і",
	YIcy: "Ї",
	yicy: "ї",
	Jsercy: "Ј",
	jsercy: "ј",
	LJcy: "Љ",
	ljcy: "љ",
	NJcy: "Њ",
	njcy: "њ",
	TSHcy: "Ћ",
	tshcy: "ћ",
	KJcy: "Ќ",
	kjcy: "ќ",
	Ubrcy: "Ў",
	ubrcy: "ў",
	DZcy: "Џ",
	dzcy: "џ"
}, Ht = {
	plus: "+",
	minus: "−",
	mnplus: "∓",
	mp: "∓",
	pm: "±",
	times: "×",
	div: "÷",
	divide: "÷",
	sdot: "⋅",
	star: "☆",
	starf: "★",
	bigstar: "★",
	lowast: "∗",
	ast: "*",
	midast: "*",
	compfn: "∘",
	smallcircle: "∘",
	bullet: "•",
	bull: "•",
	nbsp: "\xA0",
	hellip: "…",
	mldr: "…",
	prime: "′",
	Prime: "″",
	tprime: "‴",
	bprime: "‵",
	backprime: "‵",
	minus: "−",
	minusd: "∸",
	dotminus: "∸",
	plusdo: "∔",
	dotplus: "∔",
	plusmn: "±",
	minusplus: "∓",
	mnplus: "∓",
	mp: "∓",
	setminus: "∖",
	smallsetminus: "∖",
	Backslash: "∖",
	setmn: "∖",
	ssetmn: "∖",
	lowbar: "_",
	verbar: "|",
	vert: "|",
	VerticalLine: "|",
	colon: ":",
	Colon: "∷",
	Proportion: "∷",
	ratio: "∶",
	equals: "=",
	ne: "≠",
	nequiv: "≢",
	equiv: "≡",
	Congruent: "≡",
	sim: "∼",
	thicksim: "∼",
	thksim: "∼",
	sime: "≃",
	simeq: "≃",
	TildeEqual: "≃",
	asymp: "≈",
	approx: "≈",
	thickapprox: "≈",
	thkap: "≈",
	TildeTilde: "≈",
	ncong: "≇",
	cong: "≅",
	TildeFullEqual: "≅",
	asympeq: "≍",
	CupCap: "≍",
	bump: "≎",
	Bumpeq: "≎",
	HumpDownHump: "≎",
	bumpe: "≏",
	bumpeq: "≏",
	HumpEqual: "≏",
	dotminus: "∸",
	minusd: "∸",
	plusdo: "∔",
	dotplus: "∔",
	le: "≤",
	LessEqual: "≤",
	ge: "≥",
	GreaterEqual: "≥",
	lesseqgtr: "⋚",
	lesseqqgtr: "⪋",
	greater: ">",
	less: "<"
}, Ut = {
	alefsym: "ℵ",
	aleph: "ℵ",
	beth: "ℶ",
	gimel: "ℷ",
	daleth: "ℸ",
	forall: "∀",
	ForAll: "∀",
	part: "∂",
	PartialD: "∂",
	exist: "∃",
	Exists: "∃",
	nexist: "∄",
	nexists: "∄",
	empty: "∅",
	emptyset: "∅",
	emptyv: "∅",
	varnothing: "∅",
	nabla: "∇",
	Del: "∇",
	isin: "∈",
	isinv: "∈",
	in: "∈",
	Element: "∈",
	notin: "∉",
	notinva: "∉",
	ni: "∋",
	niv: "∋",
	SuchThat: "∋",
	ReverseElement: "∋",
	notni: "∌",
	notniva: "∌",
	prod: "∏",
	Product: "∏",
	coprod: "∐",
	Coproduct: "∐",
	sum: "∑",
	Sum: "∑",
	minus: "−",
	mp: "∓",
	plusdo: "∔",
	dotplus: "∔",
	setminus: "∖",
	lowast: "∗",
	radic: "√",
	Sqrt: "√",
	prop: "∝",
	propto: "∝",
	Proportional: "∝",
	varpropto: "∝",
	infin: "∞",
	infintie: "⧝",
	ang: "∠",
	angle: "∠",
	angmsd: "∡",
	measuredangle: "∡",
	angsph: "∢",
	mid: "∣",
	VerticalBar: "∣",
	nmid: "∤",
	nsmid: "∤",
	npar: "∦",
	parallel: "∥",
	spar: "∥",
	nparallel: "∦",
	nspar: "∦",
	and: "∧",
	wedge: "∧",
	or: "∨",
	vee: "∨",
	cap: "∩",
	cup: "∪",
	int: "∫",
	Integral: "∫",
	conint: "∮",
	ContourIntegral: "∮",
	Conint: "∯",
	DoubleContourIntegral: "∯",
	Cconint: "∰",
	there4: "∴",
	therefore: "∴",
	Therefore: "∴",
	becaus: "∵",
	because: "∵",
	Because: "∵",
	ratio: "∶",
	Proportion: "∷",
	minusd: "∸",
	dotminus: "∸",
	mDDot: "∺",
	homtht: "∻",
	sim: "∼",
	bsimg: "∽",
	backsim: "∽",
	ac: "∾",
	mstpos: "∾",
	acd: "∿",
	VerticalTilde: "≀",
	wr: "≀",
	wreath: "≀",
	nsime: "≄",
	nsimeq: "≄",
	nsimeq: "≄",
	ncong: "≇",
	simne: "≆",
	ncongdot: "⩭̸",
	ngsim: "≵",
	nsim: "≁",
	napprox: "≉",
	nap: "≉",
	ngeq: "≱",
	nge: "≱",
	nleq: "≰",
	nle: "≰",
	ngtr: "≯",
	ngt: "≯",
	nless: "≮",
	nlt: "≮",
	nprec: "⊀",
	npr: "⊀",
	nsucc: "⊁",
	nsc: "⊁"
}, Wt = {
	larr: "←",
	leftarrow: "←",
	LeftArrow: "←",
	uarr: "↑",
	uparrow: "↑",
	UpArrow: "↑",
	rarr: "→",
	rightarrow: "→",
	RightArrow: "→",
	darr: "↓",
	downarrow: "↓",
	DownArrow: "↓",
	harr: "↔",
	leftrightarrow: "↔",
	LeftRightArrow: "↔",
	varr: "↕",
	updownarrow: "↕",
	UpDownArrow: "↕",
	nwarr: "↖",
	nwarrow: "↖",
	UpperLeftArrow: "↖",
	nearr: "↗",
	nearrow: "↗",
	UpperRightArrow: "↗",
	searr: "↘",
	searrow: "↘",
	LowerRightArrow: "↘",
	swarr: "↙",
	swarrow: "↙",
	LowerLeftArrow: "↙",
	lArr: "⇐",
	Leftarrow: "⇐",
	uArr: "⇑",
	Uparrow: "⇑",
	rArr: "⇒",
	Rightarrow: "⇒",
	dArr: "⇓",
	Downarrow: "⇓",
	hArr: "⇔",
	Leftrightarrow: "⇔",
	iff: "⇔",
	vArr: "⇕",
	Updownarrow: "⇕",
	lAarr: "⇚",
	Lleftarrow: "⇚",
	rAarr: "⇛",
	Rrightarrow: "⇛",
	lrarr: "⇆",
	leftrightarrows: "⇆",
	rlarr: "⇄",
	rightleftarrows: "⇄",
	lrhar: "⇋",
	leftrightharpoons: "⇋",
	ReverseEquilibrium: "⇋",
	rlhar: "⇌",
	rightleftharpoons: "⇌",
	Equilibrium: "⇌",
	udarr: "⇅",
	UpArrowDownArrow: "⇅",
	duarr: "⇵",
	DownArrowUpArrow: "⇵",
	llarr: "⇇",
	leftleftarrows: "⇇",
	rrarr: "⇉",
	rightrightarrows: "⇉",
	ddarr: "⇊",
	downdownarrows: "⇊",
	har: "↽",
	lhard: "↽",
	leftharpoondown: "↽",
	lharu: "↼",
	leftharpoonup: "↼",
	rhard: "⇁",
	rightharpoondown: "⇁",
	rharu: "⇀",
	rightharpoonup: "⇀",
	lsh: "↰",
	Lsh: "↰",
	rsh: "↱",
	Rsh: "↱",
	ldsh: "↲",
	rdsh: "↳",
	hookleftarrow: "↩",
	hookrightarrow: "↪",
	mapstoleft: "↤",
	mapstoup: "↥",
	map: "↦",
	mapsto: "↦",
	mapstodown: "↧",
	crarr: "↵",
	nwarrow: "↖",
	nearrow: "↗",
	searrow: "↘",
	swarrow: "↙",
	nleftarrow: "↚",
	nleftrightarrow: "↮",
	nrightarrow: "↛",
	nrarr: "↛",
	larrtl: "↢",
	rarrtl: "↣",
	leftarrowtail: "↢",
	rightarrowtail: "↣",
	twoheadleftarrow: "↞",
	twoheadrightarrow: "↠",
	Larr: "↞",
	Rarr: "↠",
	larrhk: "↩",
	rarrhk: "↪",
	larrlp: "↫",
	looparrowleft: "↫",
	rarrlp: "↬",
	looparrowright: "↬",
	harrw: "↭",
	leftrightsquigarrow: "↭",
	nrarrw: "↝̸",
	rarrw: "↝",
	rightsquigarrow: "↝",
	larrbfs: "⤟",
	rarrbfs: "⤠",
	nvHarr: "⤄",
	nvlArr: "⤂",
	nvrArr: "⤃",
	larrfs: "⤝",
	rarrfs: "⤞",
	Map: "⤅",
	larrsim: "⥳",
	rarrsim: "⥴",
	harrcir: "⥈",
	Uarrocir: "⥉",
	lurdshar: "⥊",
	ldrdhar: "⥧",
	ldrushar: "⥋",
	rdldhar: "⥩",
	lrhard: "⥭",
	rlhar: "⇌",
	uharr: "↾",
	uharl: "↿",
	dharr: "⇂",
	dharl: "⇃",
	Uarr: "↟",
	Darr: "↡",
	zigrarr: "⇝",
	nwArr: "⇖",
	neArr: "⇗",
	seArr: "⇘",
	swArr: "⇙",
	nharr: "↮",
	nhArr: "⇎",
	nlarr: "↚",
	nlArr: "⇍",
	nrarr: "↛",
	nrArr: "⇏",
	larrb: "⇤",
	LeftArrowBar: "⇤",
	rarrb: "⇥",
	RightArrowBar: "⇥"
}, Gt = {
	square: "□",
	Square: "□",
	squ: "□",
	squf: "▪",
	squarf: "▪",
	blacksquar: "▪",
	blacksquare: "▪",
	FilledVerySmallSquare: "▪",
	blk34: "▓",
	blk12: "▒",
	blk14: "░",
	block: "█",
	srect: "▭",
	rect: "▭",
	sdot: "⋅",
	sdotb: "⊡",
	dotsquare: "⊡",
	triangle: "▵",
	tri: "▵",
	trine: "▵",
	utri: "▵",
	triangledown: "▿",
	dtri: "▿",
	tridown: "▿",
	triangleleft: "◃",
	ltri: "◃",
	triangleright: "▹",
	rtri: "▹",
	blacktriangle: "▴",
	utrif: "▴",
	blacktriangledown: "▾",
	dtrif: "▾",
	blacktriangleleft: "◂",
	ltrif: "◂",
	blacktriangleright: "▸",
	rtrif: "▸",
	loz: "◊",
	lozenge: "◊",
	blacklozenge: "⧫",
	lozf: "⧫",
	bigcirc: "◯",
	xcirc: "◯",
	circ: "ˆ",
	Circle: "○",
	cir: "○",
	o: "○",
	bullet: "•",
	bull: "•",
	hellip: "…",
	mldr: "…",
	nldr: "‥",
	boxh: "─",
	HorizontalLine: "─",
	boxv: "│",
	boxdr: "┌",
	boxdl: "┐",
	boxur: "└",
	boxul: "┘",
	boxvr: "├",
	boxvl: "┤",
	boxhd: "┬",
	boxhu: "┴",
	boxvh: "┼",
	boxH: "═",
	boxV: "║",
	boxdR: "╒",
	boxDr: "╓",
	boxDR: "╔",
	boxDl: "╕",
	boxdL: "╖",
	boxDL: "╗",
	boxuR: "╘",
	boxUr: "╙",
	boxUR: "╚",
	boxUl: "╜",
	boxuL: "╛",
	boxUL: "╝",
	boxvR: "╞",
	boxVr: "╟",
	boxVR: "╠",
	boxVl: "╢",
	boxvL: "╡",
	boxVL: "╣",
	boxHd: "╤",
	boxhD: "╥",
	boxHD: "╦",
	boxHu: "╧",
	boxhU: "╨",
	boxHU: "╩",
	boxvH: "╪",
	boxVh: "╫",
	boxVH: "╬"
}, Kt = {
	excl: "!",
	iexcl: "¡",
	brvbar: "¦",
	sect: "§",
	uml: "¨",
	copy: "©",
	ordf: "ª",
	laquo: "«",
	not: "¬",
	shy: "­",
	reg: "®",
	macr: "¯",
	deg: "°",
	plusmn: "±",
	sup2: "²",
	sup3: "³",
	acute: "´",
	micro: "µ",
	para: "¶",
	middot: "·",
	cedil: "¸",
	sup1: "¹",
	ordm: "º",
	raquo: "»",
	frac14: "¼",
	frac12: "½",
	frac34: "¾",
	iquest: "¿",
	nbsp: "\xA0",
	comma: ",",
	period: ".",
	colon: ":",
	semi: ";",
	vert: "|",
	Verbar: "‖",
	verbar: "|",
	dblac: "˝",
	circ: "ˆ",
	caron: "ˇ",
	breve: "˘",
	dot: "˙",
	ring: "˚",
	ogon: "˛",
	tilde: "˜",
	DiacriticalGrave: "`",
	DiacriticalAcute: "´",
	DiacriticalTilde: "˜",
	DiacriticalDot: "˙",
	DiacriticalDoubleAcute: "˝",
	grave: "`",
	acute: "´"
}, qt = {
	cent: "¢",
	pound: "£",
	curren: "¤",
	yen: "¥",
	euro: "€",
	dollar: "$",
	euro: "€",
	fnof: "ƒ",
	inr: "₹",
	af: "؋",
	birr: "ብር",
	peso: "₱",
	rub: "₽",
	won: "₩",
	yuan: "¥",
	cedil: "¸"
}, Jt = {
	frac12: "½",
	half: "½",
	frac13: "⅓",
	frac14: "¼",
	frac15: "⅕",
	frac16: "⅙",
	frac18: "⅛",
	frac23: "⅔",
	frac25: "⅖",
	frac34: "¾",
	frac35: "⅗",
	frac38: "⅜",
	frac45: "⅘",
	frac56: "⅚",
	frac58: "⅝",
	frac78: "⅞",
	frasl: "⁄"
}, Yt = {
	trade: "™",
	TRADE: "™",
	telrec: "⌕",
	target: "⌖",
	ulcorn: "⌜",
	ulcorner: "⌜",
	urcorn: "⌝",
	urcorner: "⌝",
	dlcorn: "⌞",
	llcorner: "⌞",
	drcorn: "⌟",
	lrcorner: "⌟",
	intercal: "⊺",
	intcal: "⊺",
	oplus: "⊕",
	CirclePlus: "⊕",
	ominus: "⊖",
	CircleMinus: "⊖",
	otimes: "⊗",
	CircleTimes: "⊗",
	osol: "⊘",
	odot: "⊙",
	CircleDot: "⊙",
	oast: "⊛",
	circledast: "⊛",
	odash: "⊝",
	circleddash: "⊝",
	ocirc: "⊚",
	circledcirc: "⊚",
	boxplus: "⊞",
	plusb: "⊞",
	boxminus: "⊟",
	minusb: "⊟",
	boxtimes: "⊠",
	timesb: "⊠",
	boxdot: "⊡",
	sdotb: "⊡",
	veebar: "⊻",
	vee: "∨",
	barvee: "⊽",
	and: "∧",
	wedge: "∧",
	Cap: "⋒",
	Cup: "⋓",
	Fork: "⋔",
	pitchfork: "⋔",
	epar: "⋕",
	ltlarr: "⥶",
	nvap: "≍⃒",
	nvsim: "∼⃒",
	nvge: "≥⃒",
	nvle: "≤⃒",
	nvlt: "<⃒",
	nvgt: ">⃒",
	nvltrie: "⊴⃒",
	nvrtrie: "⊵⃒",
	Vdash: "⊩",
	dashv: "⊣",
	vDash: "⊨",
	Vdash: "⊩",
	Vvdash: "⊪",
	nvdash: "⊬",
	nvDash: "⊭",
	nVdash: "⊮",
	nVDash: "⊯"
};
({
	...Lt,
	...Rt,
	...zt,
	...Bt,
	...Vt,
	...Ht,
	...Ut,
	...Wt,
	...Gt,
	...Kt,
	...qt,
	...Jt,
	...Yt
});
var Xt = {
	amp: "&",
	apos: "'",
	gt: ">",
	lt: "<",
	quot: "\""
}, Zt = {
	nbsp: "\xA0",
	copy: "©",
	reg: "®",
	trade: "™",
	mdash: "—",
	ndash: "–",
	hellip: "…",
	laquo: "«",
	raquo: "»",
	lsquo: "‘",
	rsquo: "’",
	ldquo: "“",
	rdquo: "”",
	bull: "•",
	para: "¶",
	sect: "§",
	deg: "°",
	frac12: "½",
	frac14: "¼",
	frac34: "¾"
}, Qt = /* @__PURE__ */ new Set("!?\\\\/[]$%{}^&*()<>|+");
function $t(e) {
	if (e[0] === "#") throw Error(`[EntityReplacer] Invalid character '#' in entity name: "${e}"`);
	for (let t of e) if (Qt.has(t)) throw Error(`[EntityReplacer] Invalid character '${t}' in entity name: "${e}"`);
	return e;
}
function en(...e) {
	let t = Object.create(null);
	for (let n of e) if (n) for (let e of Object.keys(n)) {
		let r = n[e];
		if (typeof r == "string") t[e] = r;
		else if (r && typeof r == "object" && r.val !== void 0) {
			let n = r.val;
			typeof n == "string" && (t[e] = n);
		}
	}
	return t;
}
var tn = "external", nn = "base", rn = "all";
function an(e) {
	return !e || e === tn ? new Set([tn]) : e === rn ? new Set([rn]) : e === nn ? new Set([nn]) : Array.isArray(e) ? new Set(e) : new Set([tn]);
}
var on = Object.freeze({
	allow: 0,
	leave: 1,
	remove: 2,
	throw: 3
}), sn = new Set([
	9,
	10,
	13
]);
function cn(e) {
	if (!e) return {
		xmlVersion: 1,
		onLevel: on.allow,
		nullLevel: on.remove
	};
	let t = e.xmlVersion === 1.1 ? 1.1 : 1, n = on[e.onNCR] ?? on.allow, r = on[e.nullNCR] ?? on.remove;
	return {
		xmlVersion: t,
		onLevel: n,
		nullLevel: Math.max(r, on.remove)
	};
}
var ln = class {
	constructor(e = {}) {
		this._limit = e.limit || {}, this._maxTotalExpansions = this._limit.maxTotalExpansions || 0, this._maxExpandedLength = this._limit.maxExpandedLength || 0, this._postCheck = typeof e.postCheck == "function" ? e.postCheck : (e) => e, this._limitTiers = an(this._limit.applyLimitsTo ?? tn), this._numericAllowed = e.numericAllowed ?? !0, this._baseMap = en(Xt, e.namedEntities || null), this._externalMap = Object.create(null), this._inputMap = Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this._removeSet = new Set(e.remove && Array.isArray(e.remove) ? e.remove : []), this._leaveSet = new Set(e.leave && Array.isArray(e.leave) ? e.leave : []);
		let t = cn(e.ncr);
		this._ncrXmlVersion = t.xmlVersion, this._ncrOnLevel = t.onLevel, this._ncrNullLevel = t.nullLevel;
	}
	setExternalEntities(e) {
		if (e) for (let t of Object.keys(e)) $t(t);
		this._externalMap = en(e);
	}
	addExternalEntity(e, t) {
		$t(e), typeof t == "string" && t.indexOf("&") === -1 && (this._externalMap[e] = t);
	}
	addInputEntities(e) {
		this._totalExpansions = 0, this._expandedLength = 0, this._inputMap = en(e);
	}
	reset() {
		return this._inputMap = Object.create(null), this._totalExpansions = 0, this._expandedLength = 0, this;
	}
	setXmlVersion(e) {
		this._ncrXmlVersion = e === 1.1 ? 1.1 : 1;
	}
	decode(e) {
		if (typeof e != "string" || e.length === 0) return e;
		let t = e, n = [], r = e.length, i = 0, a = 0, o = this._maxTotalExpansions > 0, s = this._maxExpandedLength > 0, c = o || s;
		for (; a < r;) {
			if (e.charCodeAt(a) !== 38) {
				a++;
				continue;
			}
			let t = a + 1;
			for (; t < r && e.charCodeAt(t) !== 59 && t - a <= 32;) t++;
			if (t >= r || e.charCodeAt(t) !== 59) {
				a++;
				continue;
			}
			let l = e.slice(a + 1, t);
			if (l.length === 0) {
				a++;
				continue;
			}
			let u, d;
			if (this._removeSet.has(l)) u = "", d === void 0 && (d = tn);
			else if (this._leaveSet.has(l)) {
				a++;
				continue;
			} else if (l.charCodeAt(0) === 35) {
				let e = this._resolveNCR(l);
				if (e === void 0) {
					a++;
					continue;
				}
				u = e, d = nn;
			} else {
				let e = this._resolveName(l);
				u = e?.value, d = e?.tier;
			}
			if (u === void 0) {
				a++;
				continue;
			}
			if (a > i && n.push(e.slice(i, a)), n.push(u), i = t + 1, a = i, c && this._tierCounts(d)) {
				if (o && (this._totalExpansions++, this._totalExpansions > this._maxTotalExpansions)) throw Error(`[EntityReplacer] Entity expansion count limit exceeded: ${this._totalExpansions} > ${this._maxTotalExpansions}`);
				if (s) {
					let e = u.length - (l.length + 2);
					if (e > 0 && (this._expandedLength += e, this._expandedLength > this._maxExpandedLength)) throw Error(`[EntityReplacer] Expanded content length limit exceeded: ${this._expandedLength} > ${this._maxExpandedLength}`);
				}
			}
		}
		i < r && n.push(e.slice(i));
		let l = n.length === 0 ? e : n.join("");
		return this._postCheck(l, t);
	}
	_tierCounts(e) {
		return this._limitTiers.has(rn) ? !0 : this._limitTiers.has(e);
	}
	_resolveName(e) {
		if (e in this._inputMap) return {
			value: this._inputMap[e],
			tier: tn
		};
		if (e in this._externalMap) return {
			value: this._externalMap[e],
			tier: tn
		};
		if (e in this._baseMap) return {
			value: this._baseMap[e],
			tier: nn
		};
	}
	_classifyNCR(e) {
		return e === 0 ? this._ncrNullLevel : e >= 55296 && e <= 57343 || this._ncrXmlVersion === 1 && e >= 1 && e <= 31 && !sn.has(e) ? on.remove : -1;
	}
	_applyNCRAction(e, t, n) {
		switch (e) {
			case on.allow: return String.fromCodePoint(n);
			case on.remove: return "";
			case on.leave: return;
			case on.throw: throw Error(`[EntityDecoder] Prohibited numeric character reference &${t}; (U+${n.toString(16).toUpperCase().padStart(4, "0")})`);
			default: return String.fromCodePoint(n);
		}
	}
	_resolveNCR(e) {
		let t = e.charCodeAt(1), n;
		if (n = t === 120 || t === 88 ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), Number.isNaN(n) || n < 0 || n > 1114111) return;
		let r = this._classifyNCR(n);
		if (!this._numericAllowed && r < on.remove) return;
		let i = r === -1 ? this._ncrOnLevel : Math.max(this._ncrOnLevel, r);
		return this._applyNCRAction(i, e, n);
	}
}, un = (e) => xt.includes(e) ? "__" + e : e, dn = {
	preserveOrder: !1,
	attributeNamePrefix: "@_",
	attributesGroupName: !1,
	textNodeName: "#text",
	ignoreAttributes: !0,
	removeNSPrefix: !1,
	allowBooleanAttributes: !1,
	parseTagValue: !0,
	parseAttributeValue: !1,
	trimValues: !0,
	cdataPropName: !1,
	numberParseOptions: {
		hex: !0,
		leadingZeros: !0,
		eNotation: !0
	},
	tagValueProcessor: function(e, t) {
		return t;
	},
	attributeValueProcessor: function(e, t) {
		return t;
	},
	stopNodes: [],
	alwaysCreateTextNode: !1,
	isArray: () => !1,
	commentPropName: !1,
	unpairedTags: [],
	processEntities: !0,
	htmlEntities: !1,
	entityDecoder: null,
	ignoreDeclaration: !1,
	ignorePiTags: !1,
	transformTagName: !1,
	transformAttributeName: !1,
	updateTag: function(e, t, n) {
		return e;
	},
	captureMetaData: !1,
	maxNestedTags: 100,
	strictReservedNames: !0,
	jPath: !0,
	onDangerousProperty: un
};
function fn(e, t) {
	if (typeof e != "string") return;
	let n = e.toLowerCase();
	if (xt.some((e) => n === e.toLowerCase()) || St.some((e) => n === e.toLowerCase())) throw Error(`[SECURITY] Invalid ${t}: "${e}" is a reserved JavaScript keyword that could cause prototype pollution`);
}
function pn(e, t) {
	return typeof e == "boolean" ? {
		enabled: e,
		maxEntitySize: 1e4,
		maxExpansionDepth: 1e4,
		maxTotalExpansions: Infinity,
		maxExpandedLength: 1e5,
		maxEntityCount: 1e3,
		allowedTags: null,
		tagFilter: null,
		appliesTo: "all"
	} : typeof e == "object" && e ? {
		enabled: e.enabled !== !1,
		maxEntitySize: Math.max(1, e.maxEntitySize ?? 1e4),
		maxExpansionDepth: Math.max(1, e.maxExpansionDepth ?? 1e4),
		maxTotalExpansions: Math.max(1, e.maxTotalExpansions ?? Infinity),
		maxExpandedLength: Math.max(1, e.maxExpandedLength ?? 1e5),
		maxEntityCount: Math.max(1, e.maxEntityCount ?? 1e3),
		allowedTags: e.allowedTags ?? null,
		tagFilter: e.tagFilter ?? null,
		appliesTo: e.appliesTo ?? "all"
	} : pn(!0);
}
var mn = function(e) {
	let t = Object.assign({}, dn, e), n = [
		{
			value: t.attributeNamePrefix,
			name: "attributeNamePrefix"
		},
		{
			value: t.attributesGroupName,
			name: "attributesGroupName"
		},
		{
			value: t.textNodeName,
			name: "textNodeName"
		},
		{
			value: t.cdataPropName,
			name: "cdataPropName"
		},
		{
			value: t.commentPropName,
			name: "commentPropName"
		}
	];
	for (let { value: e, name: t } of n) e && fn(e, t);
	return t.onDangerousProperty === null && (t.onDangerousProperty = un), t.processEntities = pn(t.processEntities, t.htmlEntities), t.unpairedTagsSet = new Set(t.unpairedTags), t.stopNodes && Array.isArray(t.stopNodes) && (t.stopNodes = t.stopNodes.map((e) => typeof e == "string" && e.startsWith("*.") ? ".." + e.substring(2) : e)), t;
}, hn = typeof Symbol == "function" ? Symbol("XML Node Metadata") : "@@xmlMetadata", gn = class {
	constructor(e) {
		this.tagname = e, this.child = [], this[":@"] = Object.create(null);
	}
	add(e, t) {
		e === "__proto__" && (e = "#__proto__"), this.child.push({ [e]: t });
	}
	addChild(e, t) {
		e.tagname === "__proto__" && (e.tagname = "#__proto__"), e[":@"] && Object.keys(e[":@"]).length > 0 ? this.child.push({
			[e.tagname]: e.child,
			":@": e[":@"]
		}) : this.child.push({ [e.tagname]: e.child }), t !== void 0 && (this.child[this.child.length - 1][hn] = { startIndex: t });
	}
	static getMetaDataSymbol() {
		return hn;
	}
}, _n = class {
	constructor(e) {
		this.suppressValidationErr = !e, this.options = e;
	}
	readDocType(e, t) {
		let n = Object.create(null), r = 0;
		if (e[t + 3] === "O" && e[t + 4] === "C" && e[t + 5] === "T" && e[t + 6] === "Y" && e[t + 7] === "P" && e[t + 8] === "E") {
			t += 9;
			let i = 1, a = !1, o = !1, s = "";
			for (; t < e.length; t++) if (e[t] === "<" && !o) {
				if (a && vn(e, "!ENTITY", t)) {
					t += 7;
					let i, a;
					if ([i, a, t] = this.readEntityExp(e, t + 1, this.suppressValidationErr), a.indexOf("&") === -1) {
						if (this.options.enabled !== !1 && this.options.maxEntityCount != null && r >= this.options.maxEntityCount) throw Error(`Entity count (${r + 1}) exceeds maximum allowed (${this.options.maxEntityCount})`);
						n[i] = a, r++;
					}
				} else if (a && vn(e, "!ELEMENT", t)) {
					t += 8;
					let { index: n } = this.readElementExp(e, t + 1);
					t = n;
				} else if (a && vn(e, "!ATTLIST", t)) t += 8;
				else if (a && vn(e, "!NOTATION", t)) {
					t += 9;
					let { index: n } = this.readNotationExp(e, t + 1, this.suppressValidationErr);
					t = n;
				} else if (vn(e, "!--", t)) o = !0;
				else throw Error("Invalid DOCTYPE");
				i++, s = "";
			} else if (e[t] === ">") {
				if (o ? e[t - 1] === "-" && e[t - 2] === "-" && (o = !1, i--) : i--, i === 0) break;
			} else e[t] === "[" ? a = !0 : s += e[t];
			if (i !== 0) throw Error("Unclosed DOCTYPE");
		} else throw Error("Invalid Tag instead of DOCTYPE");
		return {
			entities: n,
			i: t
		};
	}
	readEntityExp(e, t) {
		t = H(e, t);
		let n = t;
		for (; t < e.length && !/\s/.test(e[t]) && e[t] !== "\"" && e[t] !== "'";) t++;
		let r = e.substring(n, t);
		if (yn(r), t = H(e, t), !this.suppressValidationErr) {
			if (e.substring(t, t + 6).toUpperCase() === "SYSTEM") throw Error("External entities are not supported");
			if (e[t] === "%") throw Error("Parameter entities are not supported");
		}
		let i = "";
		if ([t, i] = this.readIdentifierVal(e, t, "entity"), this.options.enabled !== !1 && this.options.maxEntitySize != null && i.length > this.options.maxEntitySize) throw Error(`Entity "${r}" size (${i.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);
		return t--, [
			r,
			i,
			t
		];
	}
	readNotationExp(e, t) {
		t = H(e, t);
		let n = t;
		for (; t < e.length && !/\s/.test(e[t]);) t++;
		let r = e.substring(n, t);
		!this.suppressValidationErr && yn(r), t = H(e, t);
		let i = e.substring(t, t + 6).toUpperCase();
		if (!this.suppressValidationErr && i !== "SYSTEM" && i !== "PUBLIC") throw Error(`Expected SYSTEM or PUBLIC, found "${i}"`);
		t += i.length, t = H(e, t);
		let a = null, o = null;
		if (i === "PUBLIC") [t, a] = this.readIdentifierVal(e, t, "publicIdentifier"), t = H(e, t), (e[t] === "\"" || e[t] === "'") && ([t, o] = this.readIdentifierVal(e, t, "systemIdentifier"));
		else if (i === "SYSTEM" && ([t, o] = this.readIdentifierVal(e, t, "systemIdentifier"), !this.suppressValidationErr && !o)) throw Error("Missing mandatory system identifier for SYSTEM notation");
		return {
			notationName: r,
			publicIdentifier: a,
			systemIdentifier: o,
			index: --t
		};
	}
	readIdentifierVal(e, t, n) {
		let r = "", i = e[t];
		if (i !== "\"" && i !== "'") throw Error(`Expected quoted string, found "${i}"`);
		t++;
		let a = t;
		for (; t < e.length && e[t] !== i;) t++;
		if (r = e.substring(a, t), e[t] !== i) throw Error(`Unterminated ${n} value`);
		return t++, [t, r];
	}
	readElementExp(e, t) {
		t = H(e, t);
		let n = t;
		for (; t < e.length && !/\s/.test(e[t]);) t++;
		let r = e.substring(n, t);
		if (!this.suppressValidationErr && !yt(r)) throw Error(`Invalid element name: "${r}"`);
		t = H(e, t);
		let i = "";
		if (e[t] === "E" && vn(e, "MPTY", t)) t += 4;
		else if (e[t] === "A" && vn(e, "NY", t)) t += 2;
		else if (e[t] === "(") {
			t++;
			let n = t;
			for (; t < e.length && e[t] !== ")";) t++;
			if (i = e.substring(n, t), e[t] !== ")") throw Error("Unterminated content model");
		} else if (!this.suppressValidationErr) throw Error(`Invalid Element Expression, found "${e[t]}"`);
		return {
			elementName: r,
			contentModel: i.trim(),
			index: t
		};
	}
	readAttlistExp(e, t) {
		t = H(e, t);
		let n = t;
		for (; t < e.length && !/\s/.test(e[t]);) t++;
		let r = e.substring(n, t);
		for (yn(r), t = H(e, t), n = t; t < e.length && !/\s/.test(e[t]);) t++;
		let i = e.substring(n, t);
		if (!yn(i)) throw Error(`Invalid attribute name: "${i}"`);
		t = H(e, t);
		let a = "";
		if (e.substring(t, t + 8).toUpperCase() === "NOTATION") {
			if (a = "NOTATION", t += 8, t = H(e, t), e[t] !== "(") throw Error(`Expected '(', found "${e[t]}"`);
			t++;
			let n = [];
			for (; t < e.length && e[t] !== ")";) {
				let r = t;
				for (; t < e.length && e[t] !== "|" && e[t] !== ")";) t++;
				let i = e.substring(r, t);
				if (i = i.trim(), !yn(i)) throw Error(`Invalid notation name: "${i}"`);
				n.push(i), e[t] === "|" && (t++, t = H(e, t));
			}
			if (e[t] !== ")") throw Error("Unterminated list of notations");
			t++, a += " (" + n.join("|") + ")";
		} else {
			let n = t;
			for (; t < e.length && !/\s/.test(e[t]);) t++;
			if (a += e.substring(n, t), !this.suppressValidationErr && ![
				"CDATA",
				"ID",
				"IDREF",
				"IDREFS",
				"ENTITY",
				"ENTITIES",
				"NMTOKEN",
				"NMTOKENS"
			].includes(a.toUpperCase())) throw Error(`Invalid attribute type: "${a}"`);
		}
		t = H(e, t);
		let o = "";
		return e.substring(t, t + 8).toUpperCase() === "#REQUIRED" ? (o = "#REQUIRED", t += 8) : e.substring(t, t + 7).toUpperCase() === "#IMPLIED" ? (o = "#IMPLIED", t += 7) : [t, o] = this.readIdentifierVal(e, t, "ATTLIST"), {
			elementName: r,
			attributeName: i,
			attributeType: a,
			defaultValue: o,
			index: t
		};
	}
}, H = (e, t) => {
	for (; t < e.length && /\s/.test(e[t]);) t++;
	return t;
};
function vn(e, t, n) {
	for (let r = 0; r < t.length; r++) if (t[r] !== e[n + r + 1]) return !1;
	return !0;
}
function yn(e) {
	if (yt(e)) return e;
	throw Error(`Invalid entity name ${e}`);
}
//#endregion
//#region node_modules/strnum/strnum.js
var bn = /^[-+]?0x[a-fA-F0-9]+$/, xn = /^0b[01]+$/, Sn = /^0o[0-7]+$/, Cn = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/, wn = {
	hex: !0,
	binary: !1,
	octal: !1,
	leadingZeros: !0,
	decimalPoint: ".",
	eNotation: !0,
	infinity: "original"
};
function Tn(e, t = {}) {
	if (t = Object.assign({}, wn, t), !e || typeof e != "string") return e;
	let n = e.trim();
	if (n.length === 0 || t.skipLike !== void 0 && t.skipLike.test(n)) return e;
	if (n === "0") return 0;
	if (t.hex && bn.test(n)) return kn(n, 16);
	if (t.binary && xn.test(n)) return kn(n, 2);
	if (t.octal && Sn.test(n)) return kn(n, 8);
	if (!isFinite(n)) return An(e, Number(n), t);
	if (n.includes("e") || n.includes("E")) return Dn(e, n, t);
	{
		let r = Cn.exec(n);
		if (r) {
			let i = r[1] || "", a = r[2], o = On(r[3]), s = i ? e[a.length + 1] === "." : e[a.length] === ".";
			if (!t.leadingZeros && (a.length > 1 || a.length === 1 && !s)) return e;
			{
				let r = Number(n), s = String(r);
				if (r === 0) return r;
				if (s.search(/[eE]/) !== -1) return t.eNotation ? r : e;
				if (n.indexOf(".") !== -1) return s === "0" || s === o || s === `${i}${o}` ? r : e;
				let c = a ? o : n;
				return a ? c === s || i + c === s ? r : e : c === s || c === i + s ? r : e;
			}
		} else return e;
	}
}
var En = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
function Dn(e, t, n) {
	if (!n.eNotation) return e;
	let r = t.match(En);
	if (r) {
		let i = r[1] || "", a = r[3].indexOf("e") === -1 ? "E" : "e", o = r[2], s = i ? e[o.length + 1] === a : e[o.length] === a;
		return o.length > 1 && s ? e : o.length === 1 && (r[3].startsWith(`.${a}`) || r[3][0] === a) ? Number(t) : o.length > 0 ? n.leadingZeros && !s ? (t = (r[1] || "") + r[3], Number(t)) : e : Number(t);
	} else return e;
}
function On(e) {
	return e && e.indexOf(".") !== -1 ? (e = e.replace(/0+$/, ""), e === "." ? e = "0" : e[0] === "." ? e = "0" + e : e[e.length - 1] === "." && (e = e.substring(0, e.length - 1)), e) : e;
}
function kn(e, t) {
	let n = e.trim();
	if ((t === 2 || t === 8) && (e = n.substring(2)), parseInt) return parseInt(e, t);
	if (Number.parseInt) return Number.parseInt(e, t);
	if (window && window.parseInt) return window.parseInt(e, t);
	throw Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
function An(e, t, n) {
	let r = t === Infinity;
	switch (n.infinity.toLowerCase()) {
		case "null": return null;
		case "infinity": return t;
		case "string": return r ? "Infinity" : "-Infinity";
		default: return e;
	}
}
//#endregion
//#region node_modules/fast-xml-parser/src/ignoreAttributes.js
function jn(e) {
	return typeof e == "function" ? e : Array.isArray(e) ? (t) => {
		for (let n of e) if (typeof n == "string" && t === n || n instanceof RegExp && n.test(t)) return !0;
	} : () => !1;
}
//#endregion
//#region node_modules/path-expression-matcher/src/Expression.js
var Mn = class {
	constructor(e, t = {}, n) {
		this.pattern = e, this.separator = t.separator || ".", this.segments = this._parse(e), this.data = n, this._hasDeepWildcard = this.segments.some((e) => e.type === "deep-wildcard"), this._hasAttributeCondition = this.segments.some((e) => e.attrName !== void 0), this._hasPositionSelector = this.segments.some((e) => e.position !== void 0);
	}
	_parse(e) {
		let t = [], n = 0, r = "";
		for (; n < e.length;) e[n] === this.separator ? n + 1 < e.length && e[n + 1] === this.separator ? (r.trim() && (t.push(this._parseSegment(r.trim())), r = ""), t.push({ type: "deep-wildcard" }), n += 2) : (r.trim() && t.push(this._parseSegment(r.trim())), r = "", n++) : (r += e[n], n++);
		return r.trim() && t.push(this._parseSegment(r.trim())), t;
	}
	_parseSegment(e) {
		let t = { type: "tag" }, n = null, r = e, i = e.match(/^([^\[]+)(\[[^\]]*\])(.*)$/);
		if (i && (r = i[1] + i[3], i[2])) {
			let e = i[2].slice(1, -1);
			e && (n = e);
		}
		let a, o = r;
		if (r.includes("::")) {
			let t = r.indexOf("::");
			if (a = r.substring(0, t).trim(), o = r.substring(t + 2).trim(), !a) throw Error(`Invalid namespace in pattern: ${e}`);
		}
		let s, c = null;
		if (o.includes(":")) {
			let e = o.lastIndexOf(":"), t = o.substring(0, e).trim(), n = o.substring(e + 1).trim();
			[
				"first",
				"last",
				"odd",
				"even"
			].includes(n) || /^nth\(\d+\)$/.test(n) ? (s = t, c = n) : s = o;
		} else s = o;
		if (!s) throw Error(`Invalid segment pattern: ${e}`);
		if (t.tag = s, a && (t.namespace = a), n) if (n.includes("=")) {
			let e = n.indexOf("=");
			t.attrName = n.substring(0, e).trim(), t.attrValue = n.substring(e + 1).trim();
		} else t.attrName = n.trim();
		if (c) {
			let e = c.match(/^nth\((\d+)\)$/);
			e ? (t.position = "nth", t.positionValue = parseInt(e[1], 10)) : t.position = c;
		}
		return t;
	}
	get length() {
		return this.segments.length;
	}
	hasDeepWildcard() {
		return this._hasDeepWildcard;
	}
	hasAttributeCondition() {
		return this._hasAttributeCondition;
	}
	hasPositionSelector() {
		return this._hasPositionSelector;
	}
	toString() {
		return this.pattern;
	}
}, Nn = class {
	constructor() {
		this._byDepthAndTag = /* @__PURE__ */ new Map(), this._wildcardByDepth = /* @__PURE__ */ new Map(), this._deepWildcards = [], this._patterns = /* @__PURE__ */ new Set(), this._sealed = !1;
	}
	add(e) {
		if (this._sealed) throw TypeError("ExpressionSet is sealed. Create a new ExpressionSet to add more expressions.");
		if (this._patterns.has(e.pattern)) return this;
		if (this._patterns.add(e.pattern), e.hasDeepWildcard()) return this._deepWildcards.push(e), this;
		let t = e.length, n = e.segments[e.segments.length - 1]?.tag;
		if (!n || n === "*") this._wildcardByDepth.has(t) || this._wildcardByDepth.set(t, []), this._wildcardByDepth.get(t).push(e);
		else {
			let r = `${t}:${n}`;
			this._byDepthAndTag.has(r) || this._byDepthAndTag.set(r, []), this._byDepthAndTag.get(r).push(e);
		}
		return this;
	}
	addAll(e) {
		for (let t of e) this.add(t);
		return this;
	}
	has(e) {
		return this._patterns.has(e.pattern);
	}
	get size() {
		return this._patterns.size;
	}
	seal() {
		return this._sealed = !0, this;
	}
	get isSealed() {
		return this._sealed;
	}
	matchesAny(e) {
		return this.findMatch(e) !== null;
	}
	findMatch(e) {
		let t = e.getDepth(), n = `${t}:${e.getCurrentTag()}`, r = this._byDepthAndTag.get(n);
		if (r) {
			for (let t = 0; t < r.length; t++) if (e.matches(r[t])) return r[t];
		}
		let i = this._wildcardByDepth.get(t);
		if (i) {
			for (let t = 0; t < i.length; t++) if (e.matches(i[t])) return i[t];
		}
		for (let t = 0; t < this._deepWildcards.length; t++) if (e.matches(this._deepWildcards[t])) return this._deepWildcards[t];
		return null;
	}
}, Pn = class {
	constructor(e) {
		this._matcher = e;
	}
	get separator() {
		return this._matcher.separator;
	}
	getCurrentTag() {
		let e = this._matcher.path;
		return e.length > 0 ? e[e.length - 1].tag : void 0;
	}
	getCurrentNamespace() {
		let e = this._matcher.path;
		return e.length > 0 ? e[e.length - 1].namespace : void 0;
	}
	getAttrValue(e) {
		let t = this._matcher.path;
		if (t.length !== 0) return t[t.length - 1].values?.[e];
	}
	hasAttr(e) {
		let t = this._matcher.path;
		if (t.length === 0) return !1;
		let n = t[t.length - 1];
		return n.values !== void 0 && e in n.values;
	}
	getPosition() {
		let e = this._matcher.path;
		return e.length === 0 ? -1 : e[e.length - 1].position ?? 0;
	}
	getCounter() {
		let e = this._matcher.path;
		return e.length === 0 ? -1 : e[e.length - 1].counter ?? 0;
	}
	getIndex() {
		return this.getPosition();
	}
	getDepth() {
		return this._matcher.path.length;
	}
	toString(e, t = !0) {
		return this._matcher.toString(e, t);
	}
	toArray() {
		return this._matcher.path.map((e) => e.tag);
	}
	matches(e) {
		return this._matcher.matches(e);
	}
	matchesAny(e) {
		return e.matchesAny(this._matcher);
	}
}, Fn = class {
	constructor(e = {}) {
		this.separator = e.separator || ".", this.path = [], this.siblingStacks = [], this._pathStringCache = null, this._view = new Pn(this);
	}
	push(e, t = null, n = null) {
		this._pathStringCache = null, this.path.length > 0 && (this.path[this.path.length - 1].values = void 0);
		let r = this.path.length;
		this.siblingStacks[r] || (this.siblingStacks[r] = /* @__PURE__ */ new Map());
		let i = this.siblingStacks[r], a = n ? `${n}:${e}` : e, o = i.get(a) || 0, s = 0;
		for (let e of i.values()) s += e;
		i.set(a, o + 1);
		let c = {
			tag: e,
			position: s,
			counter: o
		};
		n != null && (c.namespace = n), t != null && (c.values = t), this.path.push(c);
	}
	pop() {
		if (this.path.length === 0) return;
		this._pathStringCache = null;
		let e = this.path.pop();
		return this.siblingStacks.length > this.path.length + 1 && (this.siblingStacks.length = this.path.length + 1), e;
	}
	updateCurrent(e) {
		if (this.path.length > 0) {
			let t = this.path[this.path.length - 1];
			e != null && (t.values = e);
		}
	}
	getCurrentTag() {
		return this.path.length > 0 ? this.path[this.path.length - 1].tag : void 0;
	}
	getCurrentNamespace() {
		return this.path.length > 0 ? this.path[this.path.length - 1].namespace : void 0;
	}
	getAttrValue(e) {
		if (this.path.length !== 0) return this.path[this.path.length - 1].values?.[e];
	}
	hasAttr(e) {
		if (this.path.length === 0) return !1;
		let t = this.path[this.path.length - 1];
		return t.values !== void 0 && e in t.values;
	}
	getPosition() {
		return this.path.length === 0 ? -1 : this.path[this.path.length - 1].position ?? 0;
	}
	getCounter() {
		return this.path.length === 0 ? -1 : this.path[this.path.length - 1].counter ?? 0;
	}
	getIndex() {
		return this.getPosition();
	}
	getDepth() {
		return this.path.length;
	}
	toString(e, t = !0) {
		let n = e || this.separator;
		if (n === this.separator && t === !0) {
			if (this._pathStringCache !== null) return this._pathStringCache;
			let e = this.path.map((e) => e.namespace ? `${e.namespace}:${e.tag}` : e.tag).join(n);
			return this._pathStringCache = e, e;
		}
		return this.path.map((e) => t && e.namespace ? `${e.namespace}:${e.tag}` : e.tag).join(n);
	}
	toArray() {
		return this.path.map((e) => e.tag);
	}
	reset() {
		this._pathStringCache = null, this.path = [], this.siblingStacks = [];
	}
	matches(e) {
		let t = e.segments;
		return t.length === 0 ? !1 : e.hasDeepWildcard() ? this._matchWithDeepWildcard(t) : this._matchSimple(t);
	}
	_matchSimple(e) {
		if (this.path.length !== e.length) return !1;
		for (let t = 0; t < e.length; t++) if (!this._matchSegment(e[t], this.path[t], t === this.path.length - 1)) return !1;
		return !0;
	}
	_matchWithDeepWildcard(e) {
		let t = this.path.length - 1, n = e.length - 1;
		for (; n >= 0 && t >= 0;) {
			let r = e[n];
			if (r.type === "deep-wildcard") {
				if (n--, n < 0) return !0;
				let r = e[n], i = !1;
				for (let e = t; e >= 0; e--) if (this._matchSegment(r, this.path[e], e === this.path.length - 1)) {
					t = e - 1, n--, i = !0;
					break;
				}
				if (!i) return !1;
			} else {
				if (!this._matchSegment(r, this.path[t], t === this.path.length - 1)) return !1;
				t--, n--;
			}
		}
		return n < 0;
	}
	_matchSegment(e, t, n) {
		if (e.tag !== "*" && e.tag !== t.tag || e.namespace !== void 0 && e.namespace !== "*" && e.namespace !== t.namespace || e.attrName !== void 0 && (!n || !t.values || !(e.attrName in t.values) || e.attrValue !== void 0 && String(t.values[e.attrName]) !== String(e.attrValue))) return !1;
		if (e.position !== void 0) {
			if (!n) return !1;
			let r = t.counter ?? 0;
			if (e.position === "first" && r !== 0 || e.position === "odd" && r % 2 != 1 || e.position === "even" && r % 2 != 0 || e.position === "nth" && r !== e.positionValue) return !1;
		}
		return !0;
	}
	matchesAny(e) {
		return e.matchesAny(this);
	}
	snapshot() {
		return {
			path: this.path.map((e) => ({ ...e })),
			siblingStacks: this.siblingStacks.map((e) => new Map(e))
		};
	}
	restore(e) {
		this._pathStringCache = null, this.path = e.path.map((e) => ({ ...e })), this.siblingStacks = e.siblingStacks.map((e) => new Map(e));
	}
	readOnly() {
		return this._view;
	}
};
//#endregion
//#region node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
function In(e, t) {
	if (!e) return {};
	let n = t.attributesGroupName ? e[t.attributesGroupName] : e;
	if (!n) return {};
	let r = {};
	for (let e in n) if (e.startsWith(t.attributeNamePrefix)) {
		let i = e.substring(t.attributeNamePrefix.length);
		r[i] = n[e];
	} else r[e] = n[e];
	return r;
}
function Ln(e) {
	if (!e || typeof e != "string") return;
	let t = e.indexOf(":");
	if (t !== -1 && t > 0) {
		let n = e.substring(0, t);
		if (n !== "xmlns") return n;
	}
}
var Rn = class {
	constructor(e, t) {
		this.options = e, this.currentNode = null, this.tagsNodeStack = [], this.parseXml = Un, this.parseTextData = zn, this.resolveNameSpace = Bn, this.buildAttributesMap = Hn, this.isItStopNode = qn, this.replaceEntitiesValue = Gn, this.readStopNodeData = Qn, this.saveTextToParentTag = Kn, this.addChild = Wn, this.ignoreAttributesFn = jn(this.options.ignoreAttributes), this.entityExpansionCount = 0, this.currentExpandedLength = 0;
		let n = { ...Xt };
		this.options.entityDecoder ? this.entityDecoder = this.options.entityDecoder : (typeof this.options.htmlEntities == "object" ? n = this.options.htmlEntities : this.options.htmlEntities === !0 && (n = {
			...Zt,
			...qt
		}), this.entityDecoder = new ln({
			namedEntities: {
				...n,
				...t
			},
			numericAllowed: this.options.htmlEntities,
			limit: {
				maxTotalExpansions: this.options.processEntities.maxTotalExpansions,
				maxExpandedLength: this.options.processEntities.maxExpandedLength,
				applyLimitsTo: this.options.processEntities.appliesTo
			}
		})), this.matcher = new Fn(), this.readonlyMatcher = this.matcher.readOnly(), this.isCurrentNodeStopNode = !1, this.stopNodeExpressionsSet = new Nn();
		let r = this.options.stopNodes;
		if (r && r.length > 0) {
			for (let e = 0; e < r.length; e++) {
				let t = r[e];
				typeof t == "string" ? this.stopNodeExpressionsSet.add(new Mn(t)) : t instanceof Mn && this.stopNodeExpressionsSet.add(t);
			}
			this.stopNodeExpressionsSet.seal();
		}
	}
};
function zn(e, t, n, r, i, a, o) {
	let s = this.options;
	if (e !== void 0 && (s.trimValues && !r && (e = e.trim()), e.length > 0)) {
		o || (e = this.replaceEntitiesValue(e, t, n));
		let r = s.jPath ? n.toString() : n, c = s.tagValueProcessor(t, e, r, i, a);
		return c == null ? e : typeof c != typeof e || c !== e ? c : s.trimValues || e.trim() === e ? $n(e, s.parseTagValue, s.numberParseOptions) : e;
	}
}
function Bn(e) {
	if (this.options.removeNSPrefix) {
		let t = e.split(":"), n = e.charAt(0) === "/" ? "/" : "";
		if (t[0] === "xmlns") return "";
		t.length === 2 && (e = n + t[1]);
	}
	return e;
}
var Vn = /* @__PURE__ */ RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?", "gm");
function Hn(e, t, n, r = !1) {
	let i = this.options;
	if (r === !0 || i.ignoreAttributes !== !0 && typeof e == "string") {
		let r = vt(e, Vn), a = r.length, o = {}, s = Array(a), c = !1, l = {};
		for (let e = 0; e < a; e++) {
			let t = this.resolveNameSpace(r[e][1]), a = r[e][4];
			if (t.length && a !== void 0) {
				let r = a;
				i.trimValues && (r = r.trim()), r = this.replaceEntitiesValue(r, n, this.readonlyMatcher), s[e] = r, l[t] = r, c = !0;
			}
		}
		c && typeof t == "object" && t.updateCurrent && t.updateCurrent(l);
		let u = i.jPath ? t.toString() : this.readonlyMatcher, d = !1;
		for (let e = 0; e < a; e++) {
			let t = this.resolveNameSpace(r[e][1]);
			if (this.ignoreAttributesFn(t, u)) continue;
			let n = i.attributeNamePrefix + t;
			if (t.length) if (i.transformAttributeName && (n = i.transformAttributeName(n)), n = tr(n, i), r[e][4] !== void 0) {
				let r = s[e], a = i.attributeValueProcessor(t, r, u);
				a == null ? o[n] = r : typeof a != typeof r || a !== r ? o[n] = a : o[n] = $n(r, i.parseAttributeValue, i.numberParseOptions), d = !0;
			} else i.allowBooleanAttributes && (o[n] = !0, d = !0);
		}
		if (!d) return;
		if (i.attributesGroupName && !i.preserveOrder) {
			let e = {};
			return e[i.attributesGroupName] = o, e;
		}
		return o;
	}
}
var Un = function(e) {
	e = e.replace(/\r\n?/g, "\n");
	let t = new gn("!xml"), n = t, r = "";
	this.matcher.reset(), this.entityDecoder.reset(), this.entityExpansionCount = 0, this.currentExpandedLength = 0;
	let i = this.options, a = new _n(i.processEntities), o = e.length;
	for (let s = 0; s < o; s++) if (e[s] === "<") {
		let c = e.charCodeAt(s + 1);
		if (c === 47) {
			let t = Yn(e, ">", s, "Closing Tag is not closed."), a = e.substring(s + 2, t).trim();
			if (i.removeNSPrefix) {
				let e = a.indexOf(":");
				e !== -1 && (a = a.substr(e + 1));
			}
			a = er(i.transformTagName, a, "", i).tagName, n && (r = this.saveTextToParentTag(r, n, this.readonlyMatcher));
			let o = this.matcher.getCurrentTag();
			if (a && i.unpairedTagsSet.has(a)) throw Error(`Unpaired tag can not be used as closing tag: </${a}>`);
			o && i.unpairedTagsSet.has(o) && (this.matcher.pop(), this.tagsNodeStack.pop()), this.matcher.pop(), this.isCurrentNodeStopNode = !1, n = this.tagsNodeStack.pop(), r = "", s = t;
		} else if (c === 63) {
			let t = Zn(e, s, !1, "?>");
			if (!t) throw Error("Pi Tag is not closed.");
			r = this.saveTextToParentTag(r, n, this.readonlyMatcher);
			let a = this.buildAttributesMap(t.tagExp, this.matcher, t.tagName, !0);
			if (a) {
				let e = a[this.options.attributeNamePrefix + "version"];
				this.entityDecoder.setXmlVersion(Number(e) || 1);
			}
			if (!(i.ignoreDeclaration && t.tagName === "?xml" || i.ignorePiTags)) {
				let e = new gn(t.tagName);
				e.add(i.textNodeName, ""), t.tagName !== t.tagExp && t.attrExpPresent && i.ignoreAttributes !== !0 && (e[":@"] = a), this.addChild(n, e, this.readonlyMatcher, s);
			}
			s = t.closeIndex + 1;
		} else if (c === 33 && e.charCodeAt(s + 2) === 45 && e.charCodeAt(s + 3) === 45) {
			let t = Yn(e, "-->", s + 4, "Comment is not closed.");
			if (i.commentPropName) {
				let a = e.substring(s + 4, t - 2);
				r = this.saveTextToParentTag(r, n, this.readonlyMatcher), n.add(i.commentPropName, [{ [i.textNodeName]: a }]);
			}
			s = t;
		} else if (c === 33 && e.charCodeAt(s + 2) === 68) {
			let t = a.readDocType(e, s);
			this.entityDecoder.addInputEntities(t.entities), s = t.i;
		} else if (c === 33 && e.charCodeAt(s + 2) === 91) {
			let t = Yn(e, "]]>", s, "CDATA is not closed.") - 2, a = e.substring(s + 9, t);
			r = this.saveTextToParentTag(r, n, this.readonlyMatcher);
			let o = this.parseTextData(a, n.tagname, this.readonlyMatcher, !0, !1, !0, !0);
			o ??= "", i.cdataPropName ? n.add(i.cdataPropName, [{ [i.textNodeName]: a }]) : n.add(i.textNodeName, o), s = t + 2;
		} else {
			let a = Zn(e, s, i.removeNSPrefix);
			if (!a) {
				let t = e.substring(Math.max(0, s - 50), Math.min(o, s + 50));
				throw Error(`readTagExp returned undefined at position ${s}. Context: "${t}"`);
			}
			let c = a.tagName, l = a.rawTagName, u = a.tagExp, d = a.attrExpPresent, f = a.closeIndex;
			if ({tagName: c, tagExp: u} = er(i.transformTagName, c, u, i), i.strictReservedNames && (c === i.commentPropName || c === i.cdataPropName || c === i.textNodeName || c === i.attributesGroupName)) throw Error(`Invalid tag name: ${c}`);
			n && r && n.tagname !== "!xml" && (r = this.saveTextToParentTag(r, n, this.readonlyMatcher, !1));
			let p = n;
			p && i.unpairedTagsSet.has(p.tagname) && (n = this.tagsNodeStack.pop(), this.matcher.pop());
			let m = !1;
			u.length > 0 && u.lastIndexOf("/") === u.length - 1 && (m = !0, c[c.length - 1] === "/" ? (c = c.substr(0, c.length - 1), u = c) : u = u.substr(0, u.length - 1), d = c !== u);
			let h = null, g;
			g = Ln(l), c !== t.tagname && this.matcher.push(c, {}, g), c !== u && d && (h = this.buildAttributesMap(u, this.matcher, c), h && In(h, i)), c !== t.tagname && (this.isCurrentNodeStopNode = this.isItStopNode());
			let _ = s;
			if (this.isCurrentNodeStopNode) {
				let t = "";
				if (m) s = a.closeIndex;
				else if (i.unpairedTagsSet.has(c)) s = a.closeIndex;
				else {
					let n = this.readStopNodeData(e, l, f + 1);
					if (!n) throw Error(`Unexpected end of ${l}`);
					s = n.i, t = n.tagContent;
				}
				let r = new gn(c);
				h && (r[":@"] = h), r.add(i.textNodeName, t), this.matcher.pop(), this.isCurrentNodeStopNode = !1, this.addChild(n, r, this.readonlyMatcher, _);
			} else {
				if (m) {
					({tagName: c, tagExp: u} = er(i.transformTagName, c, u, i));
					let e = new gn(c);
					h && (e[":@"] = h), this.addChild(n, e, this.readonlyMatcher, _), this.matcher.pop(), this.isCurrentNodeStopNode = !1;
				} else if (i.unpairedTagsSet.has(c)) {
					let e = new gn(c);
					h && (e[":@"] = h), this.addChild(n, e, this.readonlyMatcher, _), this.matcher.pop(), this.isCurrentNodeStopNode = !1, s = a.closeIndex;
					continue;
				} else {
					let e = new gn(c);
					if (this.tagsNodeStack.length > i.maxNestedTags) throw Error("Maximum nested tags exceeded");
					this.tagsNodeStack.push(n), h && (e[":@"] = h), this.addChild(n, e, this.readonlyMatcher, _), n = e;
				}
				r = "", s = f;
			}
		}
	} else r += e[s];
	return t.child;
};
function Wn(e, t, n, r) {
	this.options.captureMetaData || (r = void 0);
	let i = this.options.jPath ? n.toString() : n, a = this.options.updateTag(t.tagname, i, t[":@"]);
	a === !1 || (typeof a == "string" && (t.tagname = a), e.addChild(t, r));
}
function Gn(e, t, n) {
	let r = this.options.processEntities;
	if (!r || !r.enabled) return e;
	if (r.allowedTags) {
		let i = this.options.jPath ? n.toString() : n;
		if (!(Array.isArray(r.allowedTags) ? r.allowedTags.includes(t) : r.allowedTags(t, i))) return e;
	}
	if (r.tagFilter) {
		let i = this.options.jPath ? n.toString() : n;
		if (!r.tagFilter(t, i)) return e;
	}
	return this.entityDecoder.decode(e);
}
function Kn(e, t, n, r) {
	return e &&= (r === void 0 && (r = t.child.length === 0), e = this.parseTextData(e, t.tagname, n, !1, t[":@"] ? Object.keys(t[":@"]).length !== 0 : !1, r), e !== void 0 && e !== "" && t.add(this.options.textNodeName, e), ""), e;
}
function qn() {
	return this.stopNodeExpressionsSet.size === 0 ? !1 : this.matcher.matchesAny(this.stopNodeExpressionsSet);
}
function Jn(e, t, n = ">") {
	let r = 0, i = e.length, a = n.charCodeAt(0), o = n.length > 1 ? n.charCodeAt(1) : -1, s = "", c = t;
	for (let n = t; n < i; n++) {
		let t = e.charCodeAt(n);
		if (r) t === r && (r = 0);
		else if (t === 34 || t === 39) r = t;
		else if (t === a) if (o !== -1) {
			if (e.charCodeAt(n + 1) === o) return s += e.substring(c, n), {
				data: s,
				index: n
			};
		} else return s += e.substring(c, n), {
			data: s,
			index: n
		};
		else t === 9 && !r && (s += e.substring(c, n) + " ", c = n + 1);
	}
}
function Yn(e, t, n, r) {
	let i = e.indexOf(t, n);
	if (i === -1) throw Error(r);
	return i + t.length - 1;
}
function Xn(e, t, n, r) {
	let i = e.indexOf(t, n);
	if (i === -1) throw Error(r);
	return i;
}
function Zn(e, t, n, r = ">") {
	let i = Jn(e, t + 1, r);
	if (!i) return;
	let a = i.data, o = i.index, s = a.search(/\s/), c = a, l = !0;
	s !== -1 && (c = a.substring(0, s), a = a.substring(s + 1).trimStart());
	let u = c;
	if (n) {
		let e = c.indexOf(":");
		e !== -1 && (c = c.substr(e + 1), l = c !== i.data.substr(e + 1));
	}
	return {
		tagName: c,
		tagExp: a,
		closeIndex: o,
		attrExpPresent: l,
		rawTagName: u
	};
}
function Qn(e, t, n) {
	let r = n, i = 1, a = e.length;
	for (; n < a; n++) if (e[n] === "<") {
		let a = e.charCodeAt(n + 1);
		if (a === 47) {
			let a = Xn(e, ">", n, `${t} is not closed`);
			if (e.substring(n + 2, a).trim() === t && (i--, i === 0)) return {
				tagContent: e.substring(r, n),
				i: a
			};
			n = a;
		} else if (a === 63) n = Yn(e, "?>", n + 1, "StopNode is not closed.");
		else if (a === 33 && e.charCodeAt(n + 2) === 45 && e.charCodeAt(n + 3) === 45) n = Yn(e, "-->", n + 3, "StopNode is not closed.");
		else if (a === 33 && e.charCodeAt(n + 2) === 91) n = Yn(e, "]]>", n, "StopNode is not closed.") - 2;
		else {
			let r = Zn(e, n, !1);
			r && ((r && r.tagName) === t && r.tagExp[r.tagExp.length - 1] !== "/" && i++, n = r.closeIndex);
		}
	}
}
function $n(e, t, n) {
	if (t && typeof e == "string") {
		let t = e.trim();
		return t === "true" ? !0 : t === "false" ? !1 : Tn(e, n);
	} else if (bt(e)) return e;
	else return "";
}
function er(e, t, n, r) {
	if (e) {
		let r = e(t);
		n === t && (n = r), t = r;
	}
	return t = tr(t, r), {
		tagName: t,
		tagExp: n
	};
}
function tr(e, t) {
	if (St.includes(e)) throw Error(`[SECURITY] Invalid name: "${e}" is a reserved JavaScript keyword that could cause prototype pollution`);
	return xt.includes(e) ? t.onDangerousProperty(e) : e;
}
//#endregion
//#region node_modules/fast-xml-parser/src/xmlparser/node2json.js
var nr = gn.getMetaDataSymbol();
function rr(e, t) {
	if (!e || typeof e != "object") return {};
	if (!t) return e;
	let n = {};
	for (let r in e) if (r.startsWith(t)) {
		let i = r.substring(t.length);
		n[i] = e[r];
	} else n[r] = e[r];
	return n;
}
function ir(e, t, n, r) {
	return ar(e, t, n, r);
}
function ar(e, t, n, r) {
	let i, a = {};
	for (let o = 0; o < e.length; o++) {
		let s = e[o], c = or(s);
		if (c !== void 0 && c !== t.textNodeName) {
			let e = rr(s[":@"] || {}, t.attributeNamePrefix);
			n.push(c, e);
		}
		if (c === t.textNodeName) i === void 0 ? i = s[c] : i += "" + s[c];
		else if (c === void 0) continue;
		else if (s[c]) {
			let e = ar(s[c], t, n, r), i = cr(e, t);
			if (Object.keys(e).length === 0 && t.alwaysCreateTextNode && (e[t.textNodeName] = ""), s[":@"] ? sr(e, s[":@"], r, t) : Object.keys(e).length === 1 && e[t.textNodeName] !== void 0 && !t.alwaysCreateTextNode ? e = e[t.textNodeName] : Object.keys(e).length === 0 && (t.alwaysCreateTextNode ? e[t.textNodeName] = "" : e = ""), s[nr] !== void 0 && typeof e == "object" && e && (e[nr] = s[nr]), a[c] !== void 0 && Object.prototype.hasOwnProperty.call(a, c)) Array.isArray(a[c]) || (a[c] = [a[c]]), a[c].push(e);
			else {
				let n = t.jPath ? r.toString() : r;
				t.isArray(c, n, i) ? a[c] = [e] : a[c] = e;
			}
			c !== void 0 && c !== t.textNodeName && n.pop();
		}
	}
	return typeof i == "string" ? i.length > 0 && (a[t.textNodeName] = i) : i !== void 0 && (a[t.textNodeName] = i), a;
}
function or(e) {
	let t = Object.keys(e);
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (n !== ":@") return n;
	}
}
function sr(e, t, n, r) {
	if (t) {
		let i = Object.keys(t), a = i.length;
		for (let o = 0; o < a; o++) {
			let a = i[o], s = a.startsWith(r.attributeNamePrefix) ? a.substring(r.attributeNamePrefix.length) : a, c = r.jPath ? n.toString() + "." + s : n;
			r.isArray(a, c, !0, !0) ? e[a] = [t[a]] : e[a] = t[a];
		}
	}
}
function cr(e, t) {
	let { textNodeName: n } = t, r = Object.keys(e).length;
	return !!(r === 0 || r === 1 && (e[n] || typeof e[n] == "boolean" || e[n] === 0));
}
//#endregion
//#region node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var lr = class {
	constructor(e) {
		this.externalEntities = {}, this.options = mn(e);
	}
	parse(e, t) {
		if (typeof e != "string" && e.toString) e = e.toString();
		else if (typeof e != "string") throw Error("XML data is accepted in String or Bytes[] form.");
		if (t) {
			t === !0 && (t = {});
			let n = wt(e, t);
			if (n !== !0) throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`);
		}
		let n = new Rn(this.options, this.externalEntities), r = n.parseXml(e);
		return this.options.preserveOrder || r === void 0 ? r : ir(r, this.options, n.matcher, n.readonlyMatcher);
	}
	addEntity(e, t) {
		if (t.indexOf("&") !== -1) throw Error("Entity value can't have '&'");
		if (e.indexOf("&") !== -1 || e.indexOf(";") !== -1) throw Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
		if (t === "&") throw Error("An entity with value '&' is not permitted");
		this.externalEntities[e] = t;
	}
	static getMetaDataSymbol() {
		return gn.getMetaDataSymbol();
	}
}, ur = /* @__PURE__ */ st(mt(), 1), dr = (e, t) => {
	let n = ur.parseUrl(e), r = n.query, i = new URL(n.url);
	for (var a in window.location.protocol === "https:" && i.protocol === "http:" && (i.protocol = "https:"), r) t[a] = r[a], t.hasOwnProperty(a.toLowerCase()) && a !== a.toLowerCase() && delete t[a.toLowerCase()];
	return i.pathname === "/ws/px.py" ? e : i.href + "?" + ur.stringify(t);
}, fr = (e) => Object.assign({}, {
	supportsGetFeatureInfo: !0,
	getFeatureInfoFormat: "application/json",
	getFeatureInfoCrs: "",
	supportsGetFeature: !0,
	getFeatureBaseUrl: "",
	getFeatureFormat: "application/json",
	getFeatureCrs: "EPSG:4326"
}, e), pr = (e) => e.url === "" || e.url === "?" ? null : dr(e.url, {
	width: "20",
	height: "20",
	format: "image/png",
	request: "GetLegendGraphic",
	version: "1.0.0",
	service: "wms",
	layer: ""
}), mr = (e) => {
	let t = lt.newGuid(), n = {
		name: "",
		providerName: "",
		source: U.wmts,
		url: "",
		format: hr.imagepng,
		coordinate_system: "",
		srs_dimension: "",
		matrixSet: "",
		extent: [
			-1,
			1,
			-1,
			1
		],
		extentUnits: "m",
		id: t,
		transparent: !0,
		layerIndex: -1,
		legendGraphicUrl: "",
		Origin: "anonymous",
		featureInfoTitle: "",
		tooltipTemplate: "",
		showDialog: !0,
		openNewWindow: !1,
		openParentWindow: !1,
		windowWidth: 500,
		featureInfoElement: [],
		editable: !1,
		featureInfo: fr(),
		featureNS: "",
		geometryName: "geometry"
	}, r = Object.assign({}, n, e);
	return r.legendGraphicUrl.indexOf("?") === -1 && (r.legendGraphicUrl += "?"), r.legendGraphicUrl !== "" && (r.legendGraphicUrl = pr({
		url: r.legendGraphicUrl,
		layer: r.name
	})), r;
}, U = {
	wmts: "WMTS",
	wms: "WMS",
	vector: "VECTOR",
	proxyWmts: "proxyWmts",
	proxyWms: "proxyWms",
	tms: "TMS",
	wfs: "WFS"
}, hr = {
	imagepng: "image/png",
	imagejpeg: "image/jpeg",
	geoJson: "application/json"
}, gr = (e) => {
	let t = {
		guid: "",
		subLayers: [],
		name: "",
		categoryId: 0,
		visibleOnLoad: !0,
		isVisible: !1,
		id: lt.newGuid(),
		isBaseLayer: !1,
		previewActive: !1,
		opacity: 1,
		mapLayerIndex: -1,
		minResolution: 0,
		maxResolution: 21664,
		legendGraphicUrls: [],
		selectedLayerOpen: !1
	}, n = Object.assign({}, t, e), r = [];
	for (let t = 0; t < e.subLayers.length; t++) r.push(mr(e.subLayers[t]));
	return n.subLayers = r, n;
}, _r = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAoCAYAAABw65OnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTNEMzgzMzgxOTg2MTFFNEE4RTNERjVDMTIyRjc3NEUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTNEMzgzMzkxOTg2MTFFNEE4RTNERjVDMTIyRjc3NEUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFM0QzODMzNjE5ODYxMUU0QThFM0RGNUMxMjJGNzc0RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFM0QzODMzNzE5ODYxMUU0QThFM0RGNUMxMjJGNzc0RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnCXP8gAAAOjSURBVHjazFhdSBRRFD4z6vpDZVuJGPmiUfTii0Q9FYVU9BAESYGED8b6Er2FvVVv/tBjDy75EqjlPmVQKSv0gxGImZJUmkvbpuLfutvu6ri7M9M5y11wd2dm78wodOBj1plz7/nOz733XAVVVWG7hJtOAIfUIxo03nvLe7+Ng0kpNKHrRLgYavSU0AkfPtwEJLTOM7HISaARMYdoNyLApIbpzSGhxp0iQRMOsEiAycgNIJF2uyS6EW1gT9qQSLeRgmBQmC5GIndQeRU4LreAWFEF4sFKUNaWQFlZhPirHlDDi3q2WrFG3GZIOFkN5KSg5FYHOE43gFBaljOZurkB8U9ekJ5oBo+KtFarWPXS4dIiUHrnMRSfu6JJIOURvqfvpGewurhrok0zAqfOcxUB6ZE+z7x6JBqzoyBW16U8NCOkT+Oyo6G1bEWddZ7p2cUmS8tCZ1wND4n67BcF1bWWSOiMq+ch4YTdFafVbXtXRYtEzikoB+YsTa4zbpyHRM5mkpwctUQiMTbyl2d+LRK+HBJjg5D8OW2KAOnLk8P7eObnIkGy0eUCecHPlwbUI30d8fHWRE7I1GgQYg+vQ3LWOCL0nfRIXysVWp2XXmfl0drn1WgYYg+uQWHdWXBcasZ94CiIBypACa6A/HsW4kNPITn1zoijx0x759U7bFLeoqE8xsBgXu4DzKOVEptCqfCY7azcO0zCbaW9+y9I+PQKyUotYCp8VhvdnYpGh51u26tX0SajkDGHIAgZEO16kU+2FLULDRUhihElBOp32PZQQJxEzrVtKRoJRX1b+ezHBP6sYDjE+ok91DebIWE5Gm/mo734OII4jKhkJOhQ24soYuUg8pLwmi1SfzTx4uaH+RlmtIyB0lDMVJT0UzRZ4Vy7aFJVI51fV58zTwX2TN+ythCblC1E3CwJH29aPq9J/b2+jPtgkhkMM0c2GBHFSo/Zka9IV7fk8QvD/v70wcuMk9FVxAoigohtS4elRrdVLy2UhvsTy4+YcZkZCyEoKsuMgLQtNZZJ+NBYl9aHL0GpD9Pwh+U9yDxfQKxRNPDynVCzb+Am/12Ukv1936nQOpdvHD/pEIWr6fdLUnKkYcjfwwiEWBRiLB2qlnG79w7hZSByW1Yh1XTGFTVwd2zpHnFBBFgEQmhXQihGBOyQUFtGF9anQ1Iz/TG1LjUPBiIzjAS1+WRctnP54SJBATjz+tdHXA3HMA3vWdHFyXg+z7PlnwADAFViffw90A7hAAAAAElFTkSuQmCC", vr = /* @__PURE__ */ R(((e, t) => {
	t.exports = Array.isArray;
})), yr = /* @__PURE__ */ R(((e, t) => {
	t.exports = typeof global == "object" && global && global.Object === Object && global;
})), br = /* @__PURE__ */ R(((e, t) => {
	var n = yr(), r = typeof self == "object" && self && self.Object === Object && self;
	t.exports = n || r || Function("return this")();
})), xr = /* @__PURE__ */ R(((e, t) => {
	t.exports = br().Symbol;
})), Sr = /* @__PURE__ */ R(((e, t) => {
	var n = xr(), r = Object.prototype, i = r.hasOwnProperty, a = r.toString, o = n ? n.toStringTag : void 0;
	function s(e) {
		var t = i.call(e, o), n = e[o];
		try {
			e[o] = void 0;
			var r = !0;
		} catch {}
		var s = a.call(e);
		return r && (t ? e[o] = n : delete e[o]), s;
	}
	t.exports = s;
})), Cr = /* @__PURE__ */ R(((e, t) => {
	var n = Object.prototype.toString;
	function r(e) {
		return n.call(e);
	}
	t.exports = r;
})), wr = /* @__PURE__ */ R(((e, t) => {
	var n = xr(), r = Sr(), i = Cr(), a = "[object Null]", o = "[object Undefined]", s = n ? n.toStringTag : void 0;
	function c(e) {
		return e == null ? e === void 0 ? o : a : s && s in Object(e) ? r(e) : i(e);
	}
	t.exports = c;
})), Tr = /* @__PURE__ */ R(((e, t) => {
	function n(e) {
		return typeof e == "object" && !!e;
	}
	t.exports = n;
})), Er = /* @__PURE__ */ R(((e, t) => {
	var n = wr(), r = Tr(), i = "[object Symbol]";
	function a(e) {
		return typeof e == "symbol" || r(e) && n(e) == i;
	}
	t.exports = a;
})), Dr = /* @__PURE__ */ R(((e, t) => {
	var n = vr(), r = Er(), i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, a = /^\w*$/;
	function o(e, t) {
		if (n(e)) return !1;
		var o = typeof e;
		return o == "number" || o == "symbol" || o == "boolean" || e == null || r(e) ? !0 : a.test(e) || !i.test(e) || t != null && e in Object(t);
	}
	t.exports = o;
})), Or = /* @__PURE__ */ R(((e, t) => {
	function n(e) {
		var t = typeof e;
		return e != null && (t == "object" || t == "function");
	}
	t.exports = n;
})), kr = /* @__PURE__ */ R(((e, t) => {
	var n = wr(), r = Or(), i = "[object AsyncFunction]", a = "[object Function]", o = "[object GeneratorFunction]", s = "[object Proxy]";
	function c(e) {
		if (!r(e)) return !1;
		var t = n(e);
		return t == a || t == o || t == i || t == s;
	}
	t.exports = c;
})), Ar = /* @__PURE__ */ R(((e, t) => {
	t.exports = br()["__core-js_shared__"];
})), jr = /* @__PURE__ */ R(((e, t) => {
	var n = Ar(), r = function() {
		var e = /[^.]+$/.exec(n && n.keys && n.keys.IE_PROTO || "");
		return e ? "Symbol(src)_1." + e : "";
	}();
	function i(e) {
		return !!r && r in e;
	}
	t.exports = i;
})), Mr = /* @__PURE__ */ R(((e, t) => {
	var n = Function.prototype.toString;
	function r(e) {
		if (e != null) {
			try {
				return n.call(e);
			} catch {}
			try {
				return e + "";
			} catch {}
		}
		return "";
	}
	t.exports = r;
})), Nr = /* @__PURE__ */ R(((e, t) => {
	var n = kr(), r = jr(), i = Or(), a = Mr(), o = /[\\^$.*+?()[\]{}|]/g, s = /^\[object .+?Constructor\]$/, c = Function.prototype, l = Object.prototype, u = c.toString, d = l.hasOwnProperty, f = RegExp("^" + u.call(d).replace(o, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
	function p(e) {
		return !i(e) || r(e) ? !1 : (n(e) ? f : s).test(a(e));
	}
	t.exports = p;
})), Pr = /* @__PURE__ */ R(((e, t) => {
	function n(e, t) {
		return e?.[t];
	}
	t.exports = n;
})), Fr = /* @__PURE__ */ R(((e, t) => {
	var n = Nr(), r = Pr();
	function i(e, t) {
		var i = r(e, t);
		return n(i) ? i : void 0;
	}
	t.exports = i;
})), Ir = /* @__PURE__ */ R(((e, t) => {
	t.exports = Fr()(Object, "create");
})), Lr = /* @__PURE__ */ R(((e, t) => {
	var n = Ir();
	function r() {
		this.__data__ = n ? n(null) : {}, this.size = 0;
	}
	t.exports = r;
})), Rr = /* @__PURE__ */ R(((e, t) => {
	function n(e) {
		var t = this.has(e) && delete this.__data__[e];
		return this.size -= +!!t, t;
	}
	t.exports = n;
})), zr = /* @__PURE__ */ R(((e, t) => {
	var n = Ir(), r = "__lodash_hash_undefined__", i = Object.prototype.hasOwnProperty;
	function a(e) {
		var t = this.__data__;
		if (n) {
			var a = t[e];
			return a === r ? void 0 : a;
		}
		return i.call(t, e) ? t[e] : void 0;
	}
	t.exports = a;
})), Br = /* @__PURE__ */ R(((e, t) => {
	var n = Ir(), r = Object.prototype.hasOwnProperty;
	function i(e) {
		var t = this.__data__;
		return n ? t[e] !== void 0 : r.call(t, e);
	}
	t.exports = i;
})), Vr = /* @__PURE__ */ R(((e, t) => {
	var n = Ir(), r = "__lodash_hash_undefined__";
	function i(e, t) {
		var i = this.__data__;
		return this.size += +!this.has(e), i[e] = n && t === void 0 ? r : t, this;
	}
	t.exports = i;
})), Hr = /* @__PURE__ */ R(((e, t) => {
	var n = Lr(), r = Rr(), i = zr(), a = Br(), o = Vr();
	function s(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	s.prototype.clear = n, s.prototype.delete = r, s.prototype.get = i, s.prototype.has = a, s.prototype.set = o, t.exports = s;
})), Ur = /* @__PURE__ */ R(((e, t) => {
	function n() {
		this.__data__ = [], this.size = 0;
	}
	t.exports = n;
})), Wr = /* @__PURE__ */ R(((e, t) => {
	function n(e, t) {
		return e === t || e !== e && t !== t;
	}
	t.exports = n;
})), Gr = /* @__PURE__ */ R(((e, t) => {
	var n = Wr();
	function r(e, t) {
		for (var r = e.length; r--;) if (n(e[r][0], t)) return r;
		return -1;
	}
	t.exports = r;
})), Kr = /* @__PURE__ */ R(((e, t) => {
	var n = Gr(), r = Array.prototype.splice;
	function i(e) {
		var t = this.__data__, i = n(t, e);
		return i < 0 ? !1 : (i == t.length - 1 ? t.pop() : r.call(t, i, 1), --this.size, !0);
	}
	t.exports = i;
})), qr = /* @__PURE__ */ R(((e, t) => {
	var n = Gr();
	function r(e) {
		var t = this.__data__, r = n(t, e);
		return r < 0 ? void 0 : t[r][1];
	}
	t.exports = r;
})), Jr = /* @__PURE__ */ R(((e, t) => {
	var n = Gr();
	function r(e) {
		return n(this.__data__, e) > -1;
	}
	t.exports = r;
})), Yr = /* @__PURE__ */ R(((e, t) => {
	var n = Gr();
	function r(e, t) {
		var r = this.__data__, i = n(r, e);
		return i < 0 ? (++this.size, r.push([e, t])) : r[i][1] = t, this;
	}
	t.exports = r;
})), Xr = /* @__PURE__ */ R(((e, t) => {
	var n = Ur(), r = Kr(), i = qr(), a = Jr(), o = Yr();
	function s(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	s.prototype.clear = n, s.prototype.delete = r, s.prototype.get = i, s.prototype.has = a, s.prototype.set = o, t.exports = s;
})), Zr = /* @__PURE__ */ R(((e, t) => {
	t.exports = Fr()(br(), "Map");
})), Qr = /* @__PURE__ */ R(((e, t) => {
	var n = Hr(), r = Xr(), i = Zr();
	function a() {
		this.size = 0, this.__data__ = {
			hash: new n(),
			map: new (i || r)(),
			string: new n()
		};
	}
	t.exports = a;
})), $r = /* @__PURE__ */ R(((e, t) => {
	function n(e) {
		var t = typeof e;
		return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
	}
	t.exports = n;
})), ei = /* @__PURE__ */ R(((e, t) => {
	var n = $r();
	function r(e, t) {
		var r = e.__data__;
		return n(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
	}
	t.exports = r;
})), ti = /* @__PURE__ */ R(((e, t) => {
	var n = ei();
	function r(e) {
		var t = n(this, e).delete(e);
		return this.size -= +!!t, t;
	}
	t.exports = r;
})), ni = /* @__PURE__ */ R(((e, t) => {
	var n = ei();
	function r(e) {
		return n(this, e).get(e);
	}
	t.exports = r;
})), ri = /* @__PURE__ */ R(((e, t) => {
	var n = ei();
	function r(e) {
		return n(this, e).has(e);
	}
	t.exports = r;
})), ii = /* @__PURE__ */ R(((e, t) => {
	var n = ei();
	function r(e, t) {
		var r = n(this, e), i = r.size;
		return r.set(e, t), this.size += r.size == i ? 0 : 1, this;
	}
	t.exports = r;
})), ai = /* @__PURE__ */ R(((e, t) => {
	var n = Qr(), r = ti(), i = ni(), a = ri(), o = ii();
	function s(e) {
		var t = -1, n = e == null ? 0 : e.length;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	s.prototype.clear = n, s.prototype.delete = r, s.prototype.get = i, s.prototype.has = a, s.prototype.set = o, t.exports = s;
})), oi = /* @__PURE__ */ R(((e, t) => {
	var n = ai(), r = "Expected a function";
	function i(e, t) {
		if (typeof e != "function" || t != null && typeof t != "function") throw TypeError(r);
		var a = function() {
			var n = arguments, r = t ? t.apply(this, n) : n[0], i = a.cache;
			if (i.has(r)) return i.get(r);
			var o = e.apply(this, n);
			return a.cache = i.set(r, o) || i, o;
		};
		return a.cache = new (i.Cache || n)(), a;
	}
	i.Cache = n, t.exports = i;
})), si = /* @__PURE__ */ R(((e, t) => {
	var n = oi(), r = 500;
	function i(e) {
		var t = n(e, function(e) {
			return i.size === r && i.clear(), e;
		}), i = t.cache;
		return t;
	}
	t.exports = i;
})), ci = /* @__PURE__ */ R(((e, t) => {
	var n = si(), r = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, i = /\\(\\)?/g;
	t.exports = n(function(e) {
		var t = [];
		return e.charCodeAt(0) === 46 && t.push(""), e.replace(r, function(e, n, r, a) {
			t.push(r ? a.replace(i, "$1") : n || e);
		}), t;
	});
})), li = /* @__PURE__ */ R(((e, t) => {
	function n(e, t) {
		for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
		return i;
	}
	t.exports = n;
})), ui = /* @__PURE__ */ R(((e, t) => {
	var n = xr(), r = li(), i = vr(), a = Er(), o = Infinity, s = n ? n.prototype : void 0, c = s ? s.toString : void 0;
	function l(e) {
		if (typeof e == "string") return e;
		if (i(e)) return r(e, l) + "";
		if (a(e)) return c ? c.call(e) : "";
		var t = e + "";
		return t == "0" && 1 / e == -o ? "-0" : t;
	}
	t.exports = l;
})), di = /* @__PURE__ */ R(((e, t) => {
	var n = ui();
	function r(e) {
		return e == null ? "" : n(e);
	}
	t.exports = r;
})), fi = /* @__PURE__ */ R(((e, t) => {
	var n = vr(), r = Dr(), i = ci(), a = di();
	function o(e, t) {
		return n(e) ? e : r(e, t) ? [e] : i(a(e));
	}
	t.exports = o;
})), pi = /* @__PURE__ */ R(((e, t) => {
	var n = Er(), r = Infinity;
	function i(e) {
		if (typeof e == "string" || n(e)) return e;
		var t = e + "";
		return t == "0" && 1 / e == -r ? "-0" : t;
	}
	t.exports = i;
})), mi = /* @__PURE__ */ R(((e, t) => {
	var n = fi(), r = pi();
	function i(e, t) {
		t = n(t, e);
		for (var i = 0, a = t.length; e != null && i < a;) e = e[r(t[i++])];
		return i && i == a ? e : void 0;
	}
	t.exports = i;
})), W = /* @__PURE__ */ st((/* @__PURE__ */ R(((e, t) => {
	var n = mi();
	function r(e, t, r) {
		var i = e == null ? void 0 : n(e, t);
		return i === void 0 ? r : i;
	}
	t.exports = r;
})))(), 1), hi = (e) => Object.assign({}, {
	catId: "",
	name: "",
	parentId: "",
	subCategories: [],
	isOpen: !1
}, e), gi = (e) => Object.assign({}, {
	name: "",
	comment: "",
	useCategories: !0,
	categories: [],
	numZoomLevels: 10,
	newMaxRes: 21664,
	newMaxScale: 8192e4,
	renderer: "canvas",
	center: [-1, 1],
	zoom: 5,
	layers: [],
	coordinate_system: "EPSG:25833",
	matrixSet: "EPSG:25833",
	extent: [
		-1,
		-1,
		-1,
		-1
	],
	extentUnits: "m",
	proxyHost: "",
	groups: []
}, e), _i = () => {
	var e = [];
	function t(t, n) {
		e.push({
			eventType: t,
			callBack: n
		});
	}
	function n(t, n) {
		for (var r = 0; r < e.length; r++) if (e[r].eventType === t && e[r].callBack === n) {
			e.splice(r, 1);
			break;
		}
	}
	function r(t, n) {
		for (var r = 0; r < e.length; r++) {
			var i = e[r];
			i.eventType === t && i.callBack(n);
		}
	}
	return {
		RegisterEvent: t,
		UnRegisterEvent: n,
		TriggerEvent: r
	};
}, vi = {
	ChangeCenter: "ChangeCenter",
	ChangeResolution: "ChangeResolution",
	ChangeLayers: "ChangeLayers",
	FeatureInfoStart: "FeatureInfoStart",
	FeatureInfoEnd: "FeatureInfoEnd",
	MapConfigLoaded: "MapConfigLoaded",
	MapLoaded: "MapLoaded",
	MapMoveend: "MapMoveend",
	ShowExportPanel: "ShowExportPanel",
	MeasureMouseMove: "MeasureMouseMove",
	LoadingLayerEnd: "LoadingLayerEnd",
	LayerCreated: "LayerCreated",
	CachingStart: "CachingStart",
	CachingEnd: "CachingEnd",
	CachingProgress: "CachingProgress",
	StatusPouchDbChanged: "StatusPouchDbChanged",
	MeasureEnd: "MeasureEnd",
	DrawFeatureMouseMove: "DrawFeatureMouseMove",
	DrawFeatureEnd: "DrawFeatureEnd",
	DrawFeatureSelect: "DrawFeatureSelect",
	AddLayerFeatureEnd: "AddLayerFeatureEnd",
	ModifyFeatureEnd: "ModifyFeatureEnd",
	RefreshSourceDone: "RefreshSourceDone",
	ZoomIn: "ZoomIn",
	ZoomOut: "ZoomOut",
	TransactionSuccessful: "TransactionSuccessful",
	TransactionFailed: "TransactionFailed",
	TransactionInsertEnd: "TransactionInsertEnd",
	TransactionUpdateEnd: "TransactionUpdateEnd",
	TransactionRemoveEnd: "TransactionRemoveEnd",
	FeatureHasBeenDescribed: "FeatureHasBeenDescribed",
	GeolocationUpdated: "GeolocationUpdated",
	PrintBoxSelectReturnValue: "PrintBoxSelectReturnValue",
	MapClickCoordinate: "MapClickCoordinate",
	AddLayerUrlEnd: "AddLayerUrlEnd"
};
//#endregion
//#region node_modules/proj4/lib/global.js
function yi(e) {
	e("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), e("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), e("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
	for (var t = 1; t <= 60; ++t) e("EPSG:" + (32600 + t), "+proj=utm +zone=" + t + " +datum=WGS84 +units=m"), e("EPSG:" + (32700 + t), "+proj=utm +zone=" + t + " +south +datum=WGS84 +units=m");
	e("EPSG:5041", "+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"), e("EPSG:5042", "+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m"), e.WGS84 = e["EPSG:4326"], e["EPSG:3785"] = e["EPSG:3857"], e.GOOGLE = e["EPSG:3857"], e["EPSG:900913"] = e["EPSG:3857"], e["EPSG:102113"] = e["EPSG:3857"];
}
//#endregion
//#region node_modules/proj4/lib/constants/values.js
var bi = 6378137, xi = 6356752.314, Si = .0066943799901413165, Ci = 484813681109536e-20, G = Math.PI / 2, wi = .16666666666666666, Ti = .04722222222222222, Ei = .022156084656084655, Di = 1e-10, K = .017453292519943295, Oi = 57.29577951308232, q = Math.PI / 4, ki = Math.PI * 2, Ai = 3.14159265359, ji = {};
ji.greenwich = 0, ji.lisbon = -9.131906111111, ji.paris = 2.337229166667, ji.bogota = -74.080916666667, ji.madrid = -3.687938888889, ji.rome = 12.452333333333, ji.bern = 7.439583333333, ji.jakarta = 106.807719444444, ji.ferro = -17.666666666667, ji.brussels = 4.367975, ji.stockholm = 18.058277777778, ji.athens = 23.7163375, ji.oslo = 10.722916666667;
//#endregion
//#region node_modules/proj4/lib/constants/units.js
var Mi = {
	mm: { to_meter: .001 },
	cm: { to_meter: .01 },
	ft: { to_meter: .3048 },
	"us-ft": { to_meter: 1200 / 3937 },
	fath: { to_meter: 1.8288 },
	kmi: { to_meter: 1852 },
	"us-ch": { to_meter: 20.1168402336805 },
	"us-mi": { to_meter: 1609.34721869444 },
	km: { to_meter: 1e3 },
	"ind-ft": { to_meter: .30479841 },
	"ind-yd": { to_meter: .91439523 },
	mi: { to_meter: 1609.344 },
	yd: { to_meter: .9144 },
	ch: { to_meter: 20.1168 },
	link: { to_meter: .201168 },
	dm: { to_meter: .1 },
	in: { to_meter: .0254 },
	"ind-ch": { to_meter: 20.11669506 },
	"us-in": { to_meter: .025400050800101 },
	"us-yd": { to_meter: .914401828803658 }
}, Ni = /[\s_\-\/\(\)]/g;
function Pi(e, t) {
	if (e[t]) return e[t];
	for (var n = Object.keys(e), r = t.toLowerCase().replace(Ni, ""), i = -1, a, o; ++i < n.length;) if (a = n[i], o = a.toLowerCase().replace(Ni, ""), o === r) return e[a];
}
//#endregion
//#region node_modules/proj4/lib/projString.js
function Fi(e) {
	var t = {}, n = e.split("+").map(function(e) {
		return e.trim();
	}).filter(function(e) {
		return e;
	}).reduce(function(e, t) {
		var n = t.split("=");
		return n.push(!0), e[n[0].toLowerCase()] = n[1], e;
	}, {}), r, i, a, o = {
		proj: "projName",
		datum: "datumCode",
		rf: function(e) {
			t.rf = parseFloat(e);
		},
		lat_0: function(e) {
			t.lat0 = e * K;
		},
		lat_1: function(e) {
			t.lat1 = e * K;
		},
		lat_2: function(e) {
			t.lat2 = e * K;
		},
		lat_ts: function(e) {
			t.lat_ts = e * K;
		},
		lon_0: function(e) {
			t.long0 = e * K;
		},
		lon_1: function(e) {
			t.long1 = e * K;
		},
		lon_2: function(e) {
			t.long2 = e * K;
		},
		alpha: function(e) {
			t.alpha = parseFloat(e) * K;
		},
		gamma: function(e) {
			t.rectified_grid_angle = parseFloat(e) * K;
		},
		lonc: function(e) {
			t.longc = e * K;
		},
		x_0: function(e) {
			t.x0 = parseFloat(e);
		},
		y_0: function(e) {
			t.y0 = parseFloat(e);
		},
		k_0: function(e) {
			t.k0 = parseFloat(e);
		},
		k: function(e) {
			t.k0 = parseFloat(e);
		},
		a: function(e) {
			t.a = parseFloat(e);
		},
		b: function(e) {
			t.b = parseFloat(e);
		},
		r: function(e) {
			t.a = t.b = parseFloat(e);
		},
		r_a: function() {
			t.R_A = !0;
		},
		zone: function(e) {
			t.zone = parseInt(e, 10);
		},
		south: function() {
			t.utmSouth = !0;
		},
		towgs84: function(e) {
			t.datum_params = e.split(",").map(function(e) {
				return parseFloat(e);
			});
		},
		to_meter: function(e) {
			t.to_meter = parseFloat(e);
		},
		units: function(e) {
			t.units = e;
			var n = Pi(Mi, e);
			n && (t.to_meter = n.to_meter);
		},
		from_greenwich: function(e) {
			t.from_greenwich = e * K;
		},
		pm: function(e) {
			t.from_greenwich = (Pi(ji, e) || parseFloat(e)) * K;
		},
		nadgrids: function(e) {
			e === "@null" ? t.datumCode = "none" : t.nadgrids = e;
		},
		axis: function(e) {
			var n = "ewnsud";
			e.length === 3 && n.indexOf(e.substr(0, 1)) !== -1 && n.indexOf(e.substr(1, 1)) !== -1 && n.indexOf(e.substr(2, 1)) !== -1 && (t.axis = e);
		},
		approx: function() {
			t.approx = !0;
		},
		over: function() {
			t.over = !0;
		}
	};
	for (r in n) i = n[r], r in o ? (a = o[r], typeof a == "function" ? a(i) : t[a] = i) : t[r] = i;
	return typeof t.datumCode == "string" && t.datumCode !== "WGS84" && (t.datumCode = t.datumCode.toLowerCase()), t.projStr = e, t;
}
//#endregion
//#region node_modules/wkt-parser/PROJJSONBuilderBase.js
var Ii = class {
	static getId(e) {
		let t = e.find((e) => Array.isArray(e) && e[0] === "ID");
		return t && t.length >= 3 ? {
			authority: t[1],
			code: parseInt(t[2], 10)
		} : null;
	}
	static convertUnit(e, t = "unit") {
		if (!e || e.length < 3) return {
			type: t,
			name: "unknown",
			conversion_factor: null
		};
		let n = e[1], r = parseFloat(e[2]) || null, i = e.find((e) => Array.isArray(e) && e[0] === "ID");
		return {
			type: t,
			name: n,
			conversion_factor: r,
			id: i ? {
				authority: i[1],
				code: parseInt(i[2], 10)
			} : null
		};
	}
	static convertAxis(e) {
		let t = e[1] || "Unknown", n, r = t.match(/^\((.)\)$/);
		if (r) {
			let t = r[1].toUpperCase();
			if (t === "E") n = "east";
			else if (t === "N") n = "north";
			else if (t === "U") n = "up";
			else if (e[2]) n = e[2];
			else throw Error(`Unknown axis abbreviation: ${t}`);
		} else n = e[2] || "unknown";
		let i = e.find((e) => Array.isArray(e) && e[0] === "ORDER"), a = i ? parseInt(i[1], 10) : null, o = e.find((e) => Array.isArray(e) && (e[0] === "LENGTHUNIT" || e[0] === "ANGLEUNIT" || e[0] === "SCALEUNIT")), s = this.convertUnit(o);
		return {
			name: t,
			direction: n,
			unit: s,
			order: a
		};
	}
	static extractAxes(e) {
		return e.filter((e) => Array.isArray(e) && e[0] === "AXIS").map((e) => this.convertAxis(e)).sort((e, t) => (e.order || 0) - (t.order || 0));
	}
	static convert(e, t = {}) {
		switch (e[0]) {
			case "PROJCRS":
				t.type = "ProjectedCRS", t.name = e[1], t.base_crs = e.find((e) => Array.isArray(e) && e[0] === "BASEGEOGCRS") ? this.convert(e.find((e) => Array.isArray(e) && e[0] === "BASEGEOGCRS")) : null, t.conversion = e.find((e) => Array.isArray(e) && e[0] === "CONVERSION") ? this.convert(e.find((e) => Array.isArray(e) && e[0] === "CONVERSION")) : null;
				let n = e.find((e) => Array.isArray(e) && e[0] === "CS");
				n && (t.coordinate_system = {
					type: n[1],
					axis: this.extractAxes(e)
				});
				let r = e.find((e) => Array.isArray(e) && e[0] === "LENGTHUNIT");
				if (r) {
					let e = this.convertUnit(r);
					t.coordinate_system.unit = e;
				}
				t.id = this.getId(e);
				break;
			case "BASEGEOGCRS":
			case "GEOGCRS":
			case "GEODCRS":
				t.type = e[0] === "GEODCRS" ? "GeodeticCRS" : "GeographicCRS", t.name = e[1];
				let i = e.find((e) => Array.isArray(e) && (e[0] === "DATUM" || e[0] === "ENSEMBLE"));
				if (i) {
					let n = this.convert(i);
					i[0] === "ENSEMBLE" ? t.datum_ensemble = n : t.datum = n;
					let r = e.find((e) => Array.isArray(e) && e[0] === "PRIMEM");
					r && r[1] !== "Greenwich" && (n.prime_meridian = {
						name: r[1],
						longitude: parseFloat(r[2])
					});
				}
				t.coordinate_system = {
					type: "ellipsoidal",
					axis: this.extractAxes(e)
				}, t.id = this.getId(e);
				break;
			case "DATUM":
				t.type = "GeodeticReferenceFrame", t.name = e[1], t.ellipsoid = e.find((e) => Array.isArray(e) && e[0] === "ELLIPSOID") ? this.convert(e.find((e) => Array.isArray(e) && e[0] === "ELLIPSOID")) : null;
				break;
			case "ENSEMBLE":
				t.type = "DatumEnsemble", t.name = e[1], t.members = e.filter((e) => Array.isArray(e) && e[0] === "MEMBER").map((e) => ({
					type: "DatumEnsembleMember",
					name: e[1],
					id: this.getId(e)
				}));
				let a = e.find((e) => Array.isArray(e) && e[0] === "ENSEMBLEACCURACY");
				a && (t.accuracy = parseFloat(a[1]));
				let o = e.find((e) => Array.isArray(e) && e[0] === "ELLIPSOID");
				o && (t.ellipsoid = this.convert(o)), t.id = this.getId(e);
				break;
			case "ELLIPSOID":
				t.type = "Ellipsoid", t.name = e[1], t.semi_major_axis = parseFloat(e[2]), t.inverse_flattening = parseFloat(e[3]), e.find((e) => Array.isArray(e) && e[0] === "LENGTHUNIT") && this.convert(e.find((e) => Array.isArray(e) && e[0] === "LENGTHUNIT"), t);
				break;
			case "CONVERSION":
				t.type = "Conversion", t.name = e[1], t.method = e.find((e) => Array.isArray(e) && e[0] === "METHOD") ? this.convert(e.find((e) => Array.isArray(e) && e[0] === "METHOD")) : null, t.parameters = e.filter((e) => Array.isArray(e) && e[0] === "PARAMETER").map((e) => this.convert(e));
				break;
			case "METHOD":
				t.type = "Method", t.name = e[1], t.id = this.getId(e);
				break;
			case "PARAMETER":
				t.type = "Parameter", t.name = e[1], t.value = parseFloat(e[2]), t.unit = this.convertUnit(e.find((e) => Array.isArray(e) && (e[0] === "LENGTHUNIT" || e[0] === "ANGLEUNIT" || e[0] === "SCALEUNIT"))), t.id = this.getId(e);
				break;
			case "BOUNDCRS":
				t.type = "BoundCRS";
				let s = e.find((e) => Array.isArray(e) && e[0] === "SOURCECRS");
				if (s) {
					let e = s.find((e) => Array.isArray(e));
					t.source_crs = e ? this.convert(e) : null;
				}
				let c = e.find((e) => Array.isArray(e) && e[0] === "TARGETCRS");
				if (c) {
					let e = c.find((e) => Array.isArray(e));
					t.target_crs = e ? this.convert(e) : null;
				}
				let l = e.find((e) => Array.isArray(e) && e[0] === "ABRIDGEDTRANSFORMATION");
				l ? t.transformation = this.convert(l) : t.transformation = null;
				break;
			case "ABRIDGEDTRANSFORMATION":
				if (t.type = "Transformation", t.name = e[1], t.method = e.find((e) => Array.isArray(e) && e[0] === "METHOD") ? this.convert(e.find((e) => Array.isArray(e) && e[0] === "METHOD")) : null, t.parameters = e.filter((e) => Array.isArray(e) && (e[0] === "PARAMETER" || e[0] === "PARAMETERFILE")).map((e) => {
					if (e[0] === "PARAMETER") return this.convert(e);
					if (e[0] === "PARAMETERFILE") return {
						name: e[1],
						value: e[2],
						id: {
							authority: "EPSG",
							code: 8656
						}
					};
				}), t.parameters.length === 7) {
					let e = t.parameters[6];
					e.name === "Scale difference" && (e.value = Math.round((e.value - 1) * 0xe8d4a51000) / 1e6);
				}
				t.id = this.getId(e);
				break;
			case "AXIS":
				t.coordinate_system ||= {
					type: "unspecified",
					axis: []
				}, t.coordinate_system.axis.push(this.convertAxis(e));
				break;
			case "LENGTHUNIT":
				let u = this.convertUnit(e, "LinearUnit");
				t.coordinate_system && t.coordinate_system.axis && t.coordinate_system.axis.forEach((e) => {
					e.unit ||= u;
				}), u.conversion_factor && u.conversion_factor !== 1 && (t.semi_major_axis &&= {
					value: t.semi_major_axis,
					unit: u
				});
				break;
			default:
				t.keyword = e[0];
				break;
		}
		return t;
	}
}, Li = class extends Ii {
	static convert(e, t = {}) {
		return super.convert(e, t), t.coordinate_system && t.coordinate_system.subtype === "Cartesian" && delete t.coordinate_system, t.usage && delete t.usage, t;
	}
}, Ri = class extends Ii {
	static convert(e, t = {}) {
		super.convert(e, t);
		let n = e.find((e) => Array.isArray(e) && e[0] === "CS");
		n && (t.coordinate_system = {
			subtype: n[1],
			axis: this.extractAxes(e)
		});
		let r = e.find((e) => Array.isArray(e) && e[0] === "USAGE");
		if (r) {
			let e = r.find((e) => Array.isArray(e) && e[0] === "SCOPE"), n = r.find((e) => Array.isArray(e) && e[0] === "AREA"), i = r.find((e) => Array.isArray(e) && e[0] === "BBOX");
			t.usage = {}, e && (t.usage.scope = e[1]), n && (t.usage.area = n[1]), i && (t.usage.bbox = i.slice(1));
		}
		return t;
	}
};
//#endregion
//#region node_modules/wkt-parser/buildPROJJSON.js
function zi(e) {
	return e.find((e) => Array.isArray(e) && e[0] === "USAGE") ? "2019" : (e.find((e) => Array.isArray(e) && e[0] === "CS") || e[0] === "BOUNDCRS" || e[0] === "PROJCRS" || e[0], "2015");
}
function Bi(e) {
	return (zi(e) === "2019" ? Ri : Li).convert(e);
}
//#endregion
//#region node_modules/wkt-parser/detectWKTVersion.js
function Vi(e) {
	let t = e.toUpperCase();
	return t.includes("PROJCRS") || t.includes("GEOGCRS") || t.includes("BOUNDCRS") || t.includes("VERTCRS") || t.includes("LENGTHUNIT") || t.includes("ANGLEUNIT") || t.includes("SCALEUNIT") ? "WKT2" : (t.includes("PROJCS") || t.includes("GEOGCS") || t.includes("LOCAL_CS") || t.includes("VERT_CS") || t.includes("UNIT"), "WKT1");
}
//#endregion
//#region node_modules/wkt-parser/parser.js
var Hi = ta, Ui = 1, Wi = 2, Gi = 3, Ki = 4, qi = 5, Ji = -1, Yi = /\s/, Xi = /[A-Za-z]/, Zi = /[A-Za-z84_]/, Qi = /[,\]]/, $i = /[\d\.E\-\+]/;
function ea(e) {
	if (typeof e != "string") throw Error("not a string");
	this.text = e.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = Ui;
}
ea.prototype.readCharicter = function() {
	var e = this.text[this.place++];
	if (this.state !== Ki) for (; Yi.test(e);) {
		if (this.place >= this.text.length) return;
		e = this.text[this.place++];
	}
	switch (this.state) {
		case Ui: return this.neutral(e);
		case Wi: return this.keyword(e);
		case Ki: return this.quoted(e);
		case qi: return this.afterquote(e);
		case Gi: return this.number(e);
		case Ji: return;
	}
}, ea.prototype.afterquote = function(e) {
	if (e === "\"") {
		this.word += "\"", this.state = Ki;
		return;
	}
	if (Qi.test(e)) {
		this.word = this.word.trim(), this.afterItem(e);
		return;
	}
	throw Error("havn't handled \"" + e + "\" in afterquote yet, index " + this.place);
}, ea.prototype.afterItem = function(e) {
	if (e === ",") {
		this.word !== null && this.currentObject.push(this.word), this.word = null, this.state = Ui;
		return;
	}
	if (e === "]") {
		this.level--, this.word !== null && (this.currentObject.push(this.word), this.word = null), this.state = Ui, this.currentObject = this.stack.pop(), this.currentObject || (this.state = Ji);
		return;
	}
}, ea.prototype.number = function(e) {
	if ($i.test(e)) {
		this.word += e;
		return;
	}
	if (Qi.test(e)) {
		this.word = parseFloat(this.word), this.afterItem(e);
		return;
	}
	throw Error("havn't handled \"" + e + "\" in number yet, index " + this.place);
}, ea.prototype.quoted = function(e) {
	if (e === "\"") {
		this.state = qi;
		return;
	}
	this.word += e;
}, ea.prototype.keyword = function(e) {
	if (Zi.test(e)) {
		this.word += e;
		return;
	}
	if (e === "[") {
		var t = [];
		t.push(this.word), this.level++, this.root === null ? this.root = t : this.currentObject.push(t), this.stack.push(this.currentObject), this.currentObject = t, this.state = Ui;
		return;
	}
	if (Qi.test(e)) {
		this.afterItem(e);
		return;
	}
	throw Error("havn't handled \"" + e + "\" in keyword yet, index " + this.place);
}, ea.prototype.neutral = function(e) {
	if (Xi.test(e)) {
		this.word = e, this.state = Wi;
		return;
	}
	if (e === "\"") {
		this.word = "", this.state = Ki;
		return;
	}
	if ($i.test(e)) {
		this.word = e, this.state = Gi;
		return;
	}
	if (Qi.test(e)) {
		this.afterItem(e);
		return;
	}
	throw Error("havn't handled \"" + e + "\" in neutral yet, index " + this.place);
}, ea.prototype.output = function() {
	for (; this.place < this.text.length;) this.readCharicter();
	if (this.state === Ji) return this.root;
	throw Error("unable to parse string \"" + this.text + "\". State is " + this.state);
};
function ta(e) {
	return new ea(e).output();
}
//#endregion
//#region node_modules/wkt-parser/process.js
function na(e, t, n) {
	Array.isArray(t) && (n.unshift(t), t = null);
	var r = t ? {} : e, i = n.reduce(function(e, t) {
		return ra(t, e), e;
	}, r);
	t && (e[t] = i);
}
function ra(e, t) {
	if (!Array.isArray(e)) {
		t[e] = !0;
		return;
	}
	var n = e.shift();
	if (n === "PARAMETER" && (n = e.shift()), e.length === 1) {
		if (Array.isArray(e[0])) {
			t[n] = {}, ra(e[0], t[n]);
			return;
		}
		t[n] = e[0];
		return;
	}
	if (!e.length) {
		t[n] = !0;
		return;
	}
	if (n === "TOWGS84") {
		t[n] = e;
		return;
	}
	if (n === "AXIS") {
		n in t || (t[n] = []), t[n].push(e);
		return;
	}
	Array.isArray(n) || (t[n] = {});
	var r;
	switch (n) {
		case "UNIT":
		case "PRIMEM":
		case "VERT_DATUM":
			t[n] = {
				name: e[0].toLowerCase(),
				convert: e[1]
			}, e.length === 3 && ra(e[2], t[n]);
			return;
		case "SPHEROID":
		case "ELLIPSOID":
			t[n] = {
				name: e[0],
				a: e[1],
				rf: e[2]
			}, e.length === 4 && ra(e[3], t[n]);
			return;
		case "EDATUM":
		case "ENGINEERINGDATUM":
		case "LOCAL_DATUM":
		case "DATUM":
		case "VERT_CS":
		case "VERTCRS":
		case "VERTICALCRS":
			e[0] = ["name", e[0]], na(t, n, e);
			return;
		case "COMPD_CS":
		case "COMPOUNDCRS":
		case "FITTED_CS":
		case "PROJECTEDCRS":
		case "PROJCRS":
		case "GEOGCS":
		case "GEOCCS":
		case "PROJCS":
		case "LOCAL_CS":
		case "GEODCRS":
		case "GEODETICCRS":
		case "GEODETICDATUM":
		case "ENGCRS":
		case "ENGINEERINGCRS":
			e[0] = ["name", e[0]], na(t, n, e), t[n].type = n;
			return;
		default:
			for (r = -1; ++r < e.length;) if (!Array.isArray(e[r])) return ra(e, t[n]);
			return na(t, n, e);
	}
}
//#endregion
//#region node_modules/wkt-parser/util.js
var ia = .017453292519943295;
function aa(e) {
	return e * ia;
}
function oa(e) {
	let t = (e.projName || "").toLowerCase().replace(/_/g, " ");
	e.long0 === void 0 && e.longc !== void 0 && (e.long0 = e.longc), !e.lat_ts && e.lat1 && (t === "stereographic south pole" || t === "polar stereographic (variant b)") ? (e.lat0 = aa(e.lat1 > 0 ? 90 : -90), e.lat_ts = e.lat1, delete e.lat1) : !e.lat_ts && e.lat0 && (t === "polar stereographic" || t === "polar stereographic (variant a)") && (e.lat_ts = e.lat0, e.lat0 = aa(e.lat0 > 0 ? 90 : -90), delete e.lat1);
}
//#endregion
//#region node_modules/wkt-parser/transformPROJJSON.js
function sa(e) {
	let t = {
		units: null,
		to_meter: void 0
	};
	return typeof e == "string" ? (t.units = e.toLowerCase(), t.units === "metre" && (t.units = "meter"), t.units === "meter" && (t.to_meter = 1)) : e && e.name && (t.units = e.name.toLowerCase(), t.units === "metre" && (t.units = "meter"), t.to_meter = e.conversion_factor), t;
}
function ca(e) {
	return typeof e == "object" ? e.value * e.unit.conversion_factor : e;
}
function la(e, t) {
	e.ellipsoid.radius ? (t.a = e.ellipsoid.radius, t.rf = 0) : (t.a = ca(e.ellipsoid.semi_major_axis), e.ellipsoid.inverse_flattening === void 0 ? e.ellipsoid.semi_major_axis !== void 0 && e.ellipsoid.semi_minor_axis !== void 0 && (t.rf = t.a / (t.a - ca(e.ellipsoid.semi_minor_axis))) : t.rf = e.ellipsoid.inverse_flattening);
}
function ua(e, t = {}) {
	return !e || typeof e != "object" ? e : e.type === "BoundCRS" ? (ua(e.source_crs, t), e.transformation && (e.transformation.method && e.transformation.method.name === "NTv2" ? t.nadgrids = e.transformation.parameters[0].value : t.datum_params = e.transformation.parameters.map((e) => e.value)), t) : (Object.keys(e).forEach((n) => {
		let r = e[n];
		if (r !== null) switch (n) {
			case "name":
				if (t.srsCode) break;
				t.name = r, t.srsCode = r;
				break;
			case "type":
				r === "GeographicCRS" ? t.projName = "longlat" : r === "GeodeticCRS" ? e.coordinate_system && e.coordinate_system.subtype === "Cartesian" ? t.projName = "geocent" : t.projName = "longlat" : r === "ProjectedCRS" && e.conversion && e.conversion.method && (t.projName = e.conversion.method.name);
				break;
			case "datum":
			case "datum_ensemble":
				r.ellipsoid && (t.ellps = r.ellipsoid.name, la(r, t)), r.prime_meridian && (t.from_greenwich = r.prime_meridian.longitude * Math.PI / 180);
				break;
			case "ellipsoid":
				t.ellps = r.name, la(r, t);
				break;
			case "prime_meridian":
				t.long0 = (r.longitude || 0) * Math.PI / 180;
				break;
			case "coordinate_system":
				if (r.axis) {
					let e = {
						east: "e",
						north: "n",
						west: "w",
						south: "s",
						up: "u",
						down: "d",
						geocentricx: "e",
						geocentricy: "n",
						geocentricz: "u"
					}, n = r.axis.map((t) => e[t.direction.toLowerCase()]);
					if (n.every(Boolean) && (t.axis = n.join(""), t.axis.length === 2 && (t.axis += "u")), r.unit) {
						let { units: e, to_meter: n } = sa(r.unit);
						t.units = e, t.to_meter = n;
					} else if (r.axis[0] && r.axis[0].unit) {
						let { units: e, to_meter: n } = sa(r.axis[0].unit);
						t.units = e, t.to_meter = n;
					}
				}
				break;
			case "id":
				r.authority && r.code && (t.title = r.authority + ":" + r.code);
				break;
			case "conversion":
				r.method && r.method.name && (t.projName = r.method.name), r.parameters && r.parameters.forEach((e) => {
					let n = e.name.toLowerCase().replace(/\s+/g, "_"), r = e.value;
					e.unit && e.unit.conversion_factor ? t[n] = r * e.unit.conversion_factor : e.unit === "degree" ? t[n] = r * Math.PI / 180 : t[n] = r;
				});
				break;
			case "unit":
				r.name && (t.units = r.name.toLowerCase(), t.units === "metre" && (t.units = "meter")), r.conversion_factor && (t.to_meter = r.conversion_factor);
				break;
			case "base_crs":
				ua(r, t), t.datumCode = r.id ? r.id.authority + "_" + r.id.code : r.name;
				break;
			default: break;
		}
	}), t.latitude_of_false_origin !== void 0 && (t.lat0 = t.latitude_of_false_origin), t.longitude_of_false_origin !== void 0 && (t.long0 = t.longitude_of_false_origin), t.latitude_of_standard_parallel !== void 0 && (t.lat0 = t.latitude_of_standard_parallel, t.lat1 = t.latitude_of_standard_parallel), t.latitude_of_1st_standard_parallel !== void 0 && (t.lat1 = t.latitude_of_1st_standard_parallel), t.latitude_of_2nd_standard_parallel !== void 0 && (t.lat2 = t.latitude_of_2nd_standard_parallel), t.latitude_of_projection_centre !== void 0 && (t.lat0 = t.latitude_of_projection_centre), t.longitude_of_projection_centre !== void 0 && (t.longc = t.longitude_of_projection_centre), t.easting_at_false_origin !== void 0 && (t.x0 = t.easting_at_false_origin), t.northing_at_false_origin !== void 0 && (t.y0 = t.northing_at_false_origin), t.latitude_of_natural_origin !== void 0 && (t.lat0 = t.latitude_of_natural_origin), t.longitude_of_natural_origin !== void 0 && (t.long0 = t.longitude_of_natural_origin), t.longitude_of_origin !== void 0 && (t.long0 = t.longitude_of_origin), t.false_easting !== void 0 && (t.x0 = t.false_easting), t.easting_at_projection_centre && (t.x0 = t.easting_at_projection_centre), t.false_northing !== void 0 && (t.y0 = t.false_northing), t.northing_at_projection_centre && (t.y0 = t.northing_at_projection_centre), t.standard_parallel_1 !== void 0 && (t.lat1 = t.standard_parallel_1), t.standard_parallel_2 !== void 0 && (t.lat2 = t.standard_parallel_2), t.scale_factor_at_natural_origin !== void 0 && (t.k0 = t.scale_factor_at_natural_origin), t.scale_factor_at_projection_centre !== void 0 && (t.k0 = t.scale_factor_at_projection_centre), t.scale_factor_on_pseudo_standard_parallel !== void 0 && (t.k0 = t.scale_factor_on_pseudo_standard_parallel), t.azimuth !== void 0 && (t.alpha = t.azimuth), t.azimuth_at_projection_centre !== void 0 && (t.alpha = t.azimuth_at_projection_centre), t.angle_from_rectified_to_skew_grid && (t.rectified_grid_angle = t.angle_from_rectified_to_skew_grid), oa(t), t);
}
//#endregion
//#region node_modules/wkt-parser/index.js
var da = [
	"PROJECTEDCRS",
	"PROJCRS",
	"GEOGCS",
	"GEOCCS",
	"PROJCS",
	"LOCAL_CS",
	"GEODCRS",
	"GEODETICCRS",
	"GEODETICDATUM",
	"ENGCRS",
	"ENGINEERINGCRS"
];
function fa(e, t) {
	var n = t[0], r = t[1];
	!(n in e) && r in e && (e[n] = e[r], t.length === 3 && (e[n] = t[2](e[n])));
}
function pa(e) {
	for (var t = Object.keys(e), n = 0, r = t.length; n < r; ++n) {
		var i = t[n];
		da.indexOf(i) !== -1 && ma(e[i]), typeof e[i] == "object" && pa(e[i]);
	}
}
function ma(e) {
	if (e.AUTHORITY) {
		var t = Object.keys(e.AUTHORITY)[0];
		t && t in e.AUTHORITY && (e.title = t + ":" + e.AUTHORITY[t]);
	}
	if (e.type === "GEOGCS" ? e.projName = "longlat" : e.type === "LOCAL_CS" ? (e.projName = "identity", e.local = !0) : typeof e.PROJECTION == "object" ? e.projName = Object.keys(e.PROJECTION)[0] : e.projName = e.PROJECTION, e.AXIS) {
		for (var n = "", r = 0, i = e.AXIS.length; r < i; ++r) {
			var a = [e.AXIS[r][0].toLowerCase(), e.AXIS[r][1].toLowerCase()];
			a[0].indexOf("north") !== -1 || (a[0] === "y" || a[0] === "lat") && a[1] === "north" ? n += "n" : a[0].indexOf("south") !== -1 || (a[0] === "y" || a[0] === "lat") && a[1] === "south" ? n += "s" : a[0].indexOf("east") !== -1 || (a[0] === "x" || a[0] === "lon") && a[1] === "east" ? n += "e" : (a[0].indexOf("west") !== -1 || (a[0] === "x" || a[0] === "lon") && a[1] === "west") && (n += "w");
		}
		n.length === 2 && (n += "u"), n.length === 3 && (e.axis = n);
	}
	e.UNIT && (e.units = e.UNIT.name.toLowerCase(), e.units === "metre" && (e.units = "meter"), e.UNIT.convert && (e.type === "GEOGCS" ? e.DATUM && e.DATUM.SPHEROID && (e.to_meter = e.UNIT.convert * e.DATUM.SPHEROID.a) : e.to_meter = e.UNIT.convert));
	var o = e.GEOGCS;
	e.type === "GEOGCS" && (o = e), o && (o.PRIMEM && o.PRIMEM.convert && (e.from_greenwich = aa(o.PRIMEM.convert)), o.DATUM ? e.datumCode = o.DATUM.name.toLowerCase() : e.datumCode = o.name.toLowerCase(), e.datumCode.slice(0, 2) === "d_" && (e.datumCode = e.datumCode.slice(2)), e.datumCode === "new_zealand_1949" && (e.datumCode = "nzgd49"), (e.datumCode === "wgs_1984" || e.datumCode === "world_geodetic_system_1984") && (e.PROJECTION === "Mercator_Auxiliary_Sphere" && (e.sphere = !0), e.datumCode = "wgs84"), e.datumCode === "belge_1972" && (e.datumCode = "rnb72"), o.DATUM && o.DATUM.SPHEROID && (e.ellps = o.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), e.ellps.toLowerCase().slice(0, 13) === "international" && (e.ellps = "intl"), e.a = o.DATUM.SPHEROID.a, e.rf = parseFloat(o.DATUM.SPHEROID.rf)), o.DATUM && o.DATUM.TOWGS84 && (e.datum_params = o.DATUM.TOWGS84), ~e.datumCode.indexOf("osgb_1936") && (e.datumCode = "osgb36"), ~e.datumCode.indexOf("osni_1952") && (e.datumCode = "osni52"), (~e.datumCode.indexOf("tm65") || ~e.datumCode.indexOf("geodetic_datum_of_1965")) && (e.datumCode = "ire65"), e.datumCode === "ch1903+" && (e.datumCode = "ch1903"), ~e.datumCode.indexOf("israel") && (e.datumCode = "isr93")), e.b && !isFinite(e.b) && (e.b = e.a), e.rectified_grid_angle &&= aa(e.rectified_grid_angle);
	function s(t) {
		return t * (e.to_meter || 1);
	}
	[
		["standard_parallel_1", "Standard_Parallel_1"],
		["standard_parallel_1", "Latitude of 1st standard parallel"],
		["standard_parallel_2", "Standard_Parallel_2"],
		["standard_parallel_2", "Latitude of 2nd standard parallel"],
		["false_easting", "False_Easting"],
		["false_easting", "False easting"],
		["false-easting", "Easting at false origin"],
		["false_northing", "False_Northing"],
		["false_northing", "False northing"],
		["false_northing", "Northing at false origin"],
		["central_meridian", "Central_Meridian"],
		["central_meridian", "Longitude of natural origin"],
		["central_meridian", "Longitude of false origin"],
		["latitude_of_origin", "Latitude_Of_Origin"],
		["latitude_of_origin", "Central_Parallel"],
		["latitude_of_origin", "Latitude of natural origin"],
		["latitude_of_origin", "Latitude of false origin"],
		["scale_factor", "Scale_Factor"],
		["k0", "scale_factor"],
		["latitude_of_center", "Latitude_Of_Center"],
		["latitude_of_center", "Latitude_of_center"],
		[
			"lat0",
			"latitude_of_center",
			aa
		],
		["longitude_of_center", "Longitude_Of_Center"],
		["longitude_of_center", "Longitude_of_center"],
		[
			"longc",
			"longitude_of_center",
			aa
		],
		[
			"x0",
			"false_easting",
			s
		],
		[
			"y0",
			"false_northing",
			s
		],
		[
			"long0",
			"central_meridian",
			aa
		],
		[
			"lat0",
			"latitude_of_origin",
			aa
		],
		[
			"lat0",
			"standard_parallel_1",
			aa
		],
		[
			"lat1",
			"standard_parallel_1",
			aa
		],
		[
			"lat2",
			"standard_parallel_2",
			aa
		],
		["azimuth", "Azimuth"],
		[
			"alpha",
			"azimuth",
			aa
		],
		["srsCode", "name"]
	].forEach(function(t) {
		return fa(e, t);
	}), oa(e);
}
function ha(e) {
	if (typeof e == "object") return ua(e);
	let t = Vi(e);
	var n = Hi(e);
	if (t === "WKT2") return ua(Bi(n));
	var r = n[0], i = {};
	return ra(n, i), pa(i), i[r];
}
//#endregion
//#region node_modules/proj4/lib/defs.js
function ga(e) {
	var t = this;
	if (arguments.length === 2) {
		var n = arguments[1];
		typeof n == "string" ? n.charAt(0) === "+" ? ga[e] = Fi(arguments[1]) : ga[e] = ha(arguments[1]) : n && typeof n == "object" && !("projName" in n) ? ga[e] = ha(arguments[1]) : (ga[e] = n, n || delete ga[e]);
	} else if (arguments.length === 1) {
		if (Array.isArray(e)) return e.map(function(e) {
			return Array.isArray(e) ? ga.apply(t, e) : ga(e);
		});
		if (typeof e == "string") {
			if (e in ga) return ga[e];
		} else "EPSG" in e ? ga["EPSG:" + e.EPSG] = e : "ESRI" in e ? ga["ESRI:" + e.ESRI] = e : "IAU2000" in e ? ga["IAU2000:" + e.IAU2000] = e : console.log(e);
		return;
	}
}
yi(ga);
//#endregion
//#region node_modules/proj4/lib/parseCode.js
function _a(e) {
	return typeof e == "string";
}
function va(e) {
	return e in ga;
}
function ya(e) {
	return e.indexOf("+") !== 0 && e.indexOf("[") !== -1 || typeof e == "object" && !("srsCode" in e);
}
var ba = [
	"3857",
	"900913",
	"3785",
	"102113"
];
function xa(e) {
	if (e.title) return e.title.toLowerCase().indexOf("epsg:") === 0 && ba.indexOf(e.title.substr(5)) > -1;
	var t = Pi(e, "authority");
	if (t) {
		var n = Pi(t, "epsg");
		return n && ba.indexOf(n) > -1;
	}
}
function Sa(e) {
	var t = Pi(e, "extension");
	if (t) return Pi(t, "proj4");
}
function Ca(e) {
	return e[0] === "+";
}
function wa(e) {
	let t;
	if (_a(e)) if (va(e)) t = ga[e];
	else if (ya(e)) {
		t = ha(e);
		var n = Sa(t);
		n && (t = Fi(n));
	} else Ca(e) && (t = Fi(e));
	else t = "projName" in e ? e : ha(e);
	return t && xa(t) ? ga["EPSG:3857"] : t;
}
//#endregion
//#region node_modules/proj4/lib/extend.js
function Ta(e, t) {
	e ||= {};
	var n, r;
	if (!t) return e;
	for (r in t) n = t[r], n !== void 0 && (e[r] = n);
	return e;
}
//#endregion
//#region node_modules/proj4/lib/common/msfnz.js
function Ea(e, t, n) {
	var r = e * t;
	return n / Math.sqrt(1 - r * r);
}
//#endregion
//#region node_modules/proj4/lib/common/sign.js
function Da(e) {
	return e < 0 ? -1 : 1;
}
//#endregion
//#region node_modules/proj4/lib/common/adjust_lon.js
function J(e, t) {
	return t || Math.abs(e) <= 3.14159265359 ? e : e - Da(e) * ki;
}
//#endregion
//#region node_modules/proj4/lib/common/tsfnz.js
function Oa(e, t, n) {
	var r = e * n, i = .5 * e;
	return r = ((1 - r) / (1 + r)) ** i, Math.tan(.5 * (G - t)) / r;
}
//#endregion
//#region node_modules/proj4/lib/common/phi2z.js
function ka(e, t) {
	for (var n = .5 * e, r, i, a = G - 2 * Math.atan(t), o = 0; o <= 15; o++) if (r = e * Math.sin(a), i = G - 2 * Math.atan(t * ((1 - r) / (1 + r)) ** n) - a, a += i, Math.abs(i) <= 1e-10) return a;
	return -9999;
}
//#endregion
//#region node_modules/proj4/lib/projections/merc.js
function Aa() {
	var e = this.b / this.a;
	this.es = 1 - e * e, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = Ea(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1);
}
function ja(e) {
	var t = e.x, n = e.y;
	if (n * 57.29577951308232 > 90 && n * 57.29577951308232 < -90 && t * 57.29577951308232 > 180 && t * 57.29577951308232 < -180) return null;
	var r, i;
	if (Math.abs(Math.abs(n) - G) <= 1e-10) return null;
	if (this.sphere) r = this.x0 + this.a * this.k0 * J(t - this.long0, this.over), i = this.y0 + this.a * this.k0 * Math.log(Math.tan(q + .5 * n));
	else {
		var a = Math.sin(n), o = Oa(this.e, n, a);
		r = this.x0 + this.a * this.k0 * J(t - this.long0, this.over), i = this.y0 - this.a * this.k0 * Math.log(o);
	}
	return e.x = r, e.y = i, e;
}
function Ma(e) {
	var t = e.x - this.x0, n = e.y - this.y0, r, i;
	if (this.sphere) i = G - 2 * Math.atan(Math.exp(-n / (this.a * this.k0)));
	else {
		var a = Math.exp(-n / (this.a * this.k0));
		if (i = ka(this.e, a), i === -9999) return null;
	}
	return r = J(this.long0 + t / (this.a * this.k0), this.over), e.x = r, e.y = i, e;
}
var Na = {
	init: Aa,
	forward: ja,
	inverse: Ma,
	names: [
		"Mercator",
		"Popular Visualisation Pseudo Mercator",
		"Mercator_1SP",
		"Mercator_Auxiliary_Sphere",
		"Mercator_Variant_A",
		"merc"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/longlat.js
function Pa() {}
function Fa(e) {
	return e;
}
var Ia = ["longlat", "identity"], La = [Na, {
	init: Pa,
	forward: Fa,
	inverse: Fa,
	names: Ia
}], Ra = {}, za = [];
function Ba(e, t) {
	var n = za.length;
	return e.names ? (za[n] = e, e.names.forEach(function(e) {
		Ra[e.toLowerCase()] = n;
	}), this) : (console.log(t), !0);
}
function Va(e) {
	return e.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
}
function Ha(e) {
	if (!e) return !1;
	var t = e.toLowerCase();
	if (Ra[t] !== void 0 && za[Ra[t]] || (t = Va(t), t in Ra && za[Ra[t]])) return za[Ra[t]];
}
function Ua() {
	La.forEach(Ba);
}
var Wa = {
	start: Ua,
	add: Ba,
	get: Ha
}, Ga = {
	MERIT: {
		a: 6378137,
		rf: 298.257,
		ellipseName: "MERIT 1983"
	},
	SGS85: {
		a: 6378136,
		rf: 298.257,
		ellipseName: "Soviet Geodetic System 85"
	},
	GRS80: {
		a: 6378137,
		rf: 298.257222101,
		ellipseName: "GRS 1980(IUGG, 1980)"
	},
	IAU76: {
		a: 6378140,
		rf: 298.257,
		ellipseName: "IAU 1976"
	},
	airy: {
		a: 6377563.396,
		b: 6356256.91,
		ellipseName: "Airy 1830"
	},
	APL4: {
		a: 6378137,
		rf: 298.25,
		ellipseName: "Appl. Physics. 1965"
	},
	NWL9D: {
		a: 6378145,
		rf: 298.25,
		ellipseName: "Naval Weapons Lab., 1965"
	},
	mod_airy: {
		a: 6377340.189,
		b: 6356034.446,
		ellipseName: "Modified Airy"
	},
	andrae: {
		a: 6377104.43,
		rf: 300,
		ellipseName: "Andrae 1876 (Den., Iclnd.)"
	},
	aust_SA: {
		a: 6378160,
		rf: 298.25,
		ellipseName: "Australian Natl & S. Amer. 1969"
	},
	GRS67: {
		a: 6378160,
		rf: 298.247167427,
		ellipseName: "GRS 67(IUGG 1967)"
	},
	bessel: {
		a: 6377397.155,
		rf: 299.1528128,
		ellipseName: "Bessel 1841"
	},
	bess_nam: {
		a: 6377483.865,
		rf: 299.1528128,
		ellipseName: "Bessel 1841 (Namibia)"
	},
	clrk66: {
		a: 6378206.4,
		b: 6356583.8,
		ellipseName: "Clarke 1866"
	},
	clrk80: {
		a: 6378249.145,
		rf: 293.4663,
		ellipseName: "Clarke 1880 mod."
	},
	clrk80ign: {
		a: 6378249.2,
		b: 6356515,
		rf: 293.4660213,
		ellipseName: "Clarke 1880 (IGN)"
	},
	clrk58: {
		a: 6378293.645208759,
		rf: 294.2606763692654,
		ellipseName: "Clarke 1858"
	},
	CPM: {
		a: 6375738.7,
		rf: 334.29,
		ellipseName: "Comm. des Poids et Mesures 1799"
	},
	delmbr: {
		a: 6376428,
		rf: 311.5,
		ellipseName: "Delambre 1810 (Belgium)"
	},
	engelis: {
		a: 6378136.05,
		rf: 298.2566,
		ellipseName: "Engelis 1985"
	},
	evrst30: {
		a: 6377276.345,
		rf: 300.8017,
		ellipseName: "Everest 1830"
	},
	evrst48: {
		a: 6377304.063,
		rf: 300.8017,
		ellipseName: "Everest 1948"
	},
	evrst56: {
		a: 6377301.243,
		rf: 300.8017,
		ellipseName: "Everest 1956"
	},
	evrst69: {
		a: 6377295.664,
		rf: 300.8017,
		ellipseName: "Everest 1969"
	},
	evrstSS: {
		a: 6377298.556,
		rf: 300.8017,
		ellipseName: "Everest (Sabah & Sarawak)"
	},
	fschr60: {
		a: 6378166,
		rf: 298.3,
		ellipseName: "Fischer (Mercury Datum) 1960"
	},
	fschr60m: {
		a: 6378155,
		rf: 298.3,
		ellipseName: "Fischer 1960"
	},
	fschr68: {
		a: 6378150,
		rf: 298.3,
		ellipseName: "Fischer 1968"
	},
	helmert: {
		a: 6378200,
		rf: 298.3,
		ellipseName: "Helmert 1906"
	},
	hough: {
		a: 6378270,
		rf: 297,
		ellipseName: "Hough"
	},
	intl: {
		a: 6378388,
		rf: 297,
		ellipseName: "International 1909 (Hayford)"
	},
	kaula: {
		a: 6378163,
		rf: 298.24,
		ellipseName: "Kaula 1961"
	},
	lerch: {
		a: 6378139,
		rf: 298.257,
		ellipseName: "Lerch 1979"
	},
	mprts: {
		a: 6397300,
		rf: 191,
		ellipseName: "Maupertius 1738"
	},
	new_intl: {
		a: 6378157.5,
		b: 6356772.2,
		ellipseName: "New International 1967"
	},
	plessis: {
		a: 6376523,
		rf: 6355863,
		ellipseName: "Plessis 1817 (France)"
	},
	krass: {
		a: 6378245,
		rf: 298.3,
		ellipseName: "Krassovsky, 1942"
	},
	SEasia: {
		a: 6378155,
		b: 6356773.3205,
		ellipseName: "Southeast Asia"
	},
	walbeck: {
		a: 6376896,
		b: 6355834.8467,
		ellipseName: "Walbeck"
	},
	WGS60: {
		a: 6378165,
		rf: 298.3,
		ellipseName: "WGS 60"
	},
	WGS66: {
		a: 6378145,
		rf: 298.25,
		ellipseName: "WGS 66"
	},
	WGS7: {
		a: 6378135,
		rf: 298.26,
		ellipseName: "WGS 72"
	},
	WGS84: {
		a: 6378137,
		rf: 298.257223563,
		ellipseName: "WGS 84"
	},
	sphere: {
		a: 6370997,
		b: 6370997,
		ellipseName: "Normal Sphere (r=6370997)"
	}
}, Ka = Ga.WGS84;
function qa(e, t, n, r) {
	var i = e * e, a = t * t, o = (i - a) / i, s = 0;
	r ? (e *= 1 - o * (wi + o * (Ti + o * Ei)), i = e * e, o = 0) : s = Math.sqrt(o);
	var c = (i - a) / a;
	return {
		es: o,
		e: s,
		ep2: c
	};
}
function Ja(e, t, n, r, i) {
	if (!e) {
		var a = Pi(Ga, r);
		a ||= Ka, e = a.a, t = a.b, n = a.rf;
	}
	return n && !t && (t = (1 - 1 / n) * e), (n === 0 || Math.abs(e - t) < 1e-10) && (i = !0, t = e), {
		a: e,
		b: t,
		rf: n,
		sphere: i
	};
}
//#endregion
//#region node_modules/proj4/lib/constants/Datum.js
var Ya = {
	wgs84: {
		towgs84: "0,0,0",
		ellipse: "WGS84",
		datumName: "WGS84"
	},
	ch1903: {
		towgs84: "674.374,15.056,405.346",
		ellipse: "bessel",
		datumName: "swiss"
	},
	ggrs87: {
		towgs84: "-199.87,74.79,246.62",
		ellipse: "GRS80",
		datumName: "Greek_Geodetic_Reference_System_1987"
	},
	nad83: {
		towgs84: "0,0,0",
		ellipse: "GRS80",
		datumName: "North_American_Datum_1983"
	},
	nad27: {
		nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
		ellipse: "clrk66",
		datumName: "North_American_Datum_1927"
	},
	potsdam: {
		towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
		ellipse: "bessel",
		datumName: "Potsdam Rauenberg 1950 DHDN"
	},
	carthage: {
		towgs84: "-263.0,6.0,431.0",
		ellipse: "clark80",
		datumName: "Carthage 1934 Tunisia"
	},
	hermannskogel: {
		towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
		ellipse: "bessel",
		datumName: "Hermannskogel"
	},
	mgi: {
		towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
		ellipse: "bessel",
		datumName: "Militar-Geographische Institut"
	},
	osni52: {
		towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
		ellipse: "airy",
		datumName: "Irish National"
	},
	ire65: {
		towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
		ellipse: "mod_airy",
		datumName: "Ireland 1965"
	},
	rassadiran: {
		towgs84: "-133.63,-157.5,-158.62",
		ellipse: "intl",
		datumName: "Rassadiran"
	},
	nzgd49: {
		towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
		ellipse: "intl",
		datumName: "New Zealand Geodetic Datum 1949"
	},
	osgb36: {
		towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
		ellipse: "airy",
		datumName: "Ordnance Survey of Great Britain 1936"
	},
	s_jtsk: {
		towgs84: "589,76,480",
		ellipse: "bessel",
		datumName: "S-JTSK (Ferro)"
	},
	beduaram: {
		towgs84: "-106,-87,188",
		ellipse: "clrk80",
		datumName: "Beduaram"
	},
	gunung_segara: {
		towgs84: "-403,684,41",
		ellipse: "bessel",
		datumName: "Gunung Segara Jakarta"
	},
	rnb72: {
		towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
		ellipse: "intl",
		datumName: "Reseau National Belge 1972"
	},
	EPSG_5451: { towgs84: "6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649" },
	IGNF_LURESG: { towgs84: "-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43" },
	EPSG_4614: { towgs84: "-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065" },
	EPSG_4615: { towgs84: "-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748" },
	ESRI_37241: { towgs84: "-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031" },
	ESRI_37249: { towgs84: "-440.296,58.548,296.265,1.128,10.202,4.559,-0.438" },
	ESRI_37245: { towgs84: "-511.151,-181.269,139.609,1.05,2.703,1.798,3.071" },
	EPSG_4178: { towgs84: "24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01" },
	EPSG_4622: { towgs84: "-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984" },
	EPSG_4625: { towgs84: "126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227" },
	EPSG_5252: { towgs84: "0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439" },
	EPSG_4314: { towgs84: "597.1,71.4,412.1,0.894,0.068,-1.563,7.58" },
	EPSG_4282: { towgs84: "-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166" },
	EPSG_4231: { towgs84: "-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218" },
	EPSG_4274: { towgs84: "-230.994,102.591,25.199,0.633,-0.239,0.9,1.95" },
	EPSG_4134: { towgs84: "-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006" },
	EPSG_4254: { towgs84: "18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013" },
	EPSG_4159: { towgs84: "-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175" },
	EPSG_4687: { towgs84: "0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093" },
	EPSG_4227: { towgs84: "-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225" },
	EPSG_4746: { towgs84: "599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46" },
	EPSG_4745: { towgs84: "612.4,77,440.2,-0.054,0.057,-2.797,2.55" },
	EPSG_6311: { towgs84: "8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926" },
	EPSG_4289: { towgs84: "565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244" },
	EPSG_4230: { towgs84: "-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4" },
	EPSG_4154: { towgs84: "-123.02,-158.95,-168.47" },
	EPSG_4156: { towgs84: "570.8,85.7,462.8,4.998,1.587,5.261,3.56" },
	EPSG_4299: { towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15" },
	EPSG_4179: { towgs84: "33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84" },
	EPSG_4313: { towgs84: "-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747" },
	EPSG_4194: { towgs84: "163.511,127.533,-159.789" },
	EPSG_4195: { towgs84: "105,326,-102.5" },
	EPSG_4196: { towgs84: "-45,417,-3.5" },
	EPSG_4611: { towgs84: "-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246" },
	EPSG_4633: { towgs84: "137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824" },
	EPSG_4641: { towgs84: "-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993" },
	EPSG_4643: { towgs84: "-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002" },
	EPSG_4300: { towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15" },
	EPSG_4188: { towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15" },
	EPSG_4660: { towgs84: "982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805" },
	EPSG_4662: { towgs84: "97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259" },
	EPSG_3906: { towgs84: "577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664" },
	EPSG_4307: { towgs84: "-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547" },
	EPSG_6892: { towgs84: "-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686" },
	EPSG_4690: { towgs84: "221.597,152.441,176.523,2.403,1.3893,0.884,11.4648" },
	EPSG_4691: { towgs84: "218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817" },
	EPSG_4629: { towgs84: "72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653" },
	EPSG_4630: { towgs84: "165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111" },
	EPSG_4692: { towgs84: "217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093" },
	EPSG_9333: { towgs84: "0,0,0,-0.008393,0.000749,-0.010276,0" },
	EPSG_9059: { towgs84: "0,0,0" },
	EPSG_4312: { towgs84: "601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887" },
	EPSG_4123: { towgs84: "-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496" },
	EPSG_4309: { towgs84: "-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365" },
	ESRI_104106: { towgs84: "-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058" },
	EPSG_4281: { towgs84: "-219.247,-73.802,269.529" },
	EPSG_4322: { towgs84: "0,0,4.5" },
	EPSG_4324: { towgs84: "0,0,1.9" },
	EPSG_4284: { towgs84: "43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549" },
	EPSG_4277: { towgs84: "446.448,-125.157,542.06,0.15,0.247,0.842,-20.489" },
	EPSG_4207: { towgs84: "-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46" },
	EPSG_4688: { towgs84: "347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647" },
	EPSG_4689: { towgs84: "410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218" },
	EPSG_4720: { towgs84: "0,0,4.5" },
	EPSG_4273: { towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21" },
	EPSG_4240: { towgs84: "204.64,834.74,293.8" },
	EPSG_4817: { towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21" },
	ESRI_104131: { towgs84: "426.62,142.62,460.09,4.98,4.49,-12.42,-17.1" },
	EPSG_4265: { towgs84: "-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68" },
	EPSG_4263: { towgs84: "-111.92,-87.85,114.5,1.875,0.202,0.219,0.032" },
	EPSG_4298: { towgs84: "-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536" },
	EPSG_4270: { towgs84: "-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424" },
	EPSG_4229: { towgs84: "-121.8,98.1,-10.7" },
	EPSG_4220: { towgs84: "-55.5,-348,-229.2" },
	EPSG_4214: { towgs84: "12.646,-155.176,-80.863" },
	EPSG_4232: { towgs84: "-345,3,223" },
	EPSG_4238: { towgs84: "-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037" },
	EPSG_4168: { towgs84: "-170,33,326" },
	EPSG_4131: { towgs84: "199,931,318.9" },
	EPSG_4152: { towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0" },
	EPSG_5228: { towgs84: "572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378" },
	EPSG_8351: { towgs84: "485.021,169.465,483.839,7.786342,4.397554,4.102655,0" },
	EPSG_4683: { towgs84: "-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06" },
	EPSG_4133: { towgs84: "0,0,0" },
	EPSG_7373: { towgs84: "0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693" },
	EPSG_9075: { towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0" },
	EPSG_9072: { towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0" },
	EPSG_9294: { towgs84: "1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388" },
	EPSG_4212: { towgs84: "-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492" },
	EPSG_4191: { towgs84: "-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703" },
	EPSG_4237: { towgs84: "52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191" },
	EPSG_4740: { towgs84: "-1.08,-0.27,-0.9" },
	EPSG_4124: { towgs84: "419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496" },
	EPSG_5681: { towgs84: "584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922" },
	EPSG_4141: { towgs84: "23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262" },
	EPSG_4204: { towgs84: "-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194" },
	EPSG_4319: { towgs84: "226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798" },
	EPSG_4200: { towgs84: "24.82,-131.21,-82.66" },
	EPSG_4130: { towgs84: "0,0,0" },
	EPSG_4127: { towgs84: "-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359" },
	EPSG_4149: { towgs84: "674.374,15.056,405.346" },
	EPSG_4617: { towgs84: "-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0" },
	EPSG_4663: { towgs84: "-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485" },
	EPSG_4664: { towgs84: "-211.939,137.626,58.3,-0.089,0.251,0.079,0.384" },
	EPSG_4665: { towgs84: "-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048" },
	EPSG_4666: { towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43" },
	EPSG_4756: { towgs84: "-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188" },
	EPSG_4723: { towgs84: "-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925" },
	EPSG_4726: { towgs84: "8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081" },
	EPSG_4267: { towgs84: "-8.0,160.0,176.0" },
	EPSG_5365: { towgs84: "-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693" },
	EPSG_4218: { towgs84: "304.5,306.5,-318.1" },
	EPSG_4242: { towgs84: "-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95" },
	EPSG_4216: { towgs84: "-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289" },
	ESRI_104105: { towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43" },
	ESRI_104129: { towgs84: "0,0,0" },
	EPSG_4673: { towgs84: "174.05,-25.49,112.57" },
	EPSG_4202: { towgs84: "-124,-60,154" },
	EPSG_4203: { towgs84: "-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191" },
	EPSG_3819: { towgs84: "595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408" },
	EPSG_8694: { towgs84: "-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169" },
	EPSG_4145: { towgs84: "275.57,676.78,229.6" },
	EPSG_4283: { towgs84: "0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994" },
	EPSG_4317: { towgs84: "2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063" },
	EPSG_4272: { towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993" },
	EPSG_4248: { towgs84: "-307.7,265.3,-363.5" },
	EPSG_5561: { towgs84: "24,-121,-76" },
	EPSG_5233: { towgs84: "-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338" },
	ESRI_104130: { towgs84: "-86,-98,-119" },
	ESRI_104102: { towgs84: "682,-203,480" },
	ESRI_37207: { towgs84: "7,-10,-26" },
	EPSG_4675: { towgs84: "59.935,118.4,-10.871" },
	ESRI_104109: { towgs84: "-89.121,-348.182,260.871" },
	ESRI_104112: { towgs84: "-185.583,-230.096,281.361" },
	ESRI_104113: { towgs84: "25.1,-275.6,222.6" },
	IGNF_WGS72G: { towgs84: "0,12,6" },
	IGNF_NTFG: { towgs84: "-168,-60,320" },
	IGNF_EFATE57G: { towgs84: "-127,-769,472" },
	IGNF_PGP50G: { towgs84: "324.8,153.6,172.1" },
	IGNF_REUN47G: { towgs84: "94,-948,-1262" },
	IGNF_CSG67G: { towgs84: "-186,230,110" },
	IGNF_GUAD48G: { towgs84: "-467,-16,-300" },
	IGNF_TAHI51G: { towgs84: "162,117,154" },
	IGNF_TAHAAG: { towgs84: "65,342,77" },
	IGNF_NUKU72G: { towgs84: "84,274,65" },
	IGNF_PETRELS72G: { towgs84: "365,194,166" },
	IGNF_WALL78G: { towgs84: "253,-133,-127" },
	IGNF_MAYO50G: { towgs84: "-382,-59,-262" },
	IGNF_TANNAG: { towgs84: "-139,-967,436" },
	IGNF_IGN72G: { towgs84: "-13,-348,292" },
	IGNF_ATIGG: { towgs84: "1118,23,66" },
	IGNF_FANGA84G: { towgs84: "150.57,158.33,118.32" },
	IGNF_RUSAT84G: { towgs84: "202.13,174.6,-15.74" },
	IGNF_KAUE70G: { towgs84: "126.74,300.1,-75.49" },
	IGNF_MOP90G: { towgs84: "-10.8,-1.8,12.77" },
	IGNF_MHPF67G: { towgs84: "338.08,212.58,-296.17" },
	IGNF_TAHI79G: { towgs84: "160.61,116.05,153.69" },
	IGNF_ANAA92G: { towgs84: "1.5,3.84,4.81" },
	IGNF_MARQUI72G: { towgs84: "330.91,-13.92,58.56" },
	IGNF_APAT86G: { towgs84: "143.6,197.82,74.05" },
	IGNF_TUBU69G: { towgs84: "237.17,171.61,-77.84" },
	IGNF_STPM50G: { towgs84: "11.363,424.148,373.13" },
	EPSG_4150: { towgs84: "674.374,15.056,405.346" },
	EPSG_4754: { towgs84: "-208.4058,-109.8777,-2.5764" },
	ESRI_104101: { towgs84: "372.87,149.23,585.29" },
	EPSG_4693: { towgs84: "0,-0.15,0.68" },
	EPSG_6207: { towgs84: "293.17,726.18,245.36" },
	EPSG_4153: { towgs84: "-133.63,-157.5,-158.62" },
	EPSG_4132: { towgs84: "-241.54,-163.64,396.06" },
	EPSG_4221: { towgs84: "-154.5,150.7,100.4" },
	EPSG_4266: { towgs84: "-80.7,-132.5,41.1" },
	EPSG_4193: { towgs84: "-70.9,-151.8,-41.4" },
	EPSG_5340: { towgs84: "-0.41,0.46,-0.35" },
	EPSG_4246: { towgs84: "-294.7,-200.1,525.5" },
	EPSG_4318: { towgs84: "-3.2,-5.7,2.8" },
	EPSG_4121: { towgs84: "-199.87,74.79,246.62" },
	EPSG_4223: { towgs84: "-260.1,5.5,432.2" },
	EPSG_4158: { towgs84: "-0.465,372.095,171.736" },
	EPSG_4285: { towgs84: "-128.16,-282.42,21.93" },
	EPSG_4613: { towgs84: "-404.78,685.68,45.47" },
	EPSG_4607: { towgs84: "195.671,332.517,274.607" },
	EPSG_4475: { towgs84: "-381.788,-57.501,-256.673" },
	EPSG_4208: { towgs84: "-157.84,308.54,-146.6" },
	EPSG_4743: { towgs84: "70.995,-335.916,262.898" },
	EPSG_4710: { towgs84: "-323.65,551.39,-491.22" },
	EPSG_7881: { towgs84: "-0.077,0.079,0.086" },
	EPSG_4682: { towgs84: "283.729,735.942,261.143" },
	EPSG_4739: { towgs84: "-156,-271,-189" },
	EPSG_4679: { towgs84: "-80.01,253.26,291.19" },
	EPSG_4750: { towgs84: "-56.263,16.136,-22.856" },
	EPSG_4644: { towgs84: "-10.18,-350.43,291.37" },
	EPSG_4695: { towgs84: "-103.746,-9.614,-255.95" },
	EPSG_4292: { towgs84: "-355,21,72" },
	EPSG_4302: { towgs84: "-61.702,284.488,472.052" },
	EPSG_4143: { towgs84: "-124.76,53,466.79" },
	EPSG_4606: { towgs84: "-153,153,307" },
	EPSG_4699: { towgs84: "-770.1,158.4,-498.2" },
	EPSG_4247: { towgs84: "-273.5,110.6,-357.9" },
	EPSG_4160: { towgs84: "8.88,184.86,106.69" },
	EPSG_4161: { towgs84: "-233.43,6.65,173.64" },
	EPSG_9251: { towgs84: "-9.5,122.9,138.2" },
	EPSG_9253: { towgs84: "-78.1,101.6,133.3" },
	EPSG_4297: { towgs84: "-198.383,-240.517,-107.909" },
	EPSG_4269: { towgs84: "0,0,0" },
	EPSG_4301: { towgs84: "-147,506,687" },
	EPSG_4618: { towgs84: "-59,-11,-52" },
	EPSG_4612: { towgs84: "0,0,0" },
	EPSG_4678: { towgs84: "44.585,-131.212,-39.544" },
	EPSG_4250: { towgs84: "-130,29,364" },
	EPSG_4144: { towgs84: "214,804,268" },
	EPSG_4147: { towgs84: "-17.51,-108.32,-62.39" },
	EPSG_4259: { towgs84: "-254.1,-5.36,-100.29" },
	EPSG_4164: { towgs84: "-76,-138,67" },
	EPSG_4211: { towgs84: "-378.873,676.002,-46.255" },
	EPSG_4182: { towgs84: "-422.651,-172.995,84.02" },
	EPSG_4224: { towgs84: "-143.87,243.37,-33.52" },
	EPSG_4225: { towgs84: "-205.57,168.77,-4.12" },
	EPSG_5527: { towgs84: "-67.35,3.88,-38.22" },
	EPSG_4752: { towgs84: "98,390,-22" },
	EPSG_4310: { towgs84: "-30,190,89" },
	EPSG_9248: { towgs84: "-192.26,65.72,132.08" },
	EPSG_4680: { towgs84: "124.5,-63.5,-281" },
	EPSG_4701: { towgs84: "-79.9,-158,-168.9" },
	EPSG_4706: { towgs84: "-146.21,112.63,4.05" },
	EPSG_4805: { towgs84: "682,-203,480" },
	EPSG_4201: { towgs84: "-165,-11,206" },
	EPSG_4210: { towgs84: "-157,-2,-299" },
	EPSG_4183: { towgs84: "-104,167,-38" },
	EPSG_4139: { towgs84: "11,72,-101" },
	EPSG_4668: { towgs84: "-86,-98,-119" },
	EPSG_4717: { towgs84: "-2,151,181" },
	EPSG_4732: { towgs84: "102,52,-38" },
	EPSG_4280: { towgs84: "-377,681,-50" },
	EPSG_4209: { towgs84: "-138,-105,-289" },
	EPSG_4261: { towgs84: "31,146,47" },
	EPSG_4658: { towgs84: "-73,46,-86" },
	EPSG_4721: { towgs84: "265.025,384.929,-194.046" },
	EPSG_4222: { towgs84: "-136,-108,-292" },
	EPSG_4601: { towgs84: "-255,-15,71" },
	EPSG_4602: { towgs84: "725,685,536" },
	EPSG_4603: { towgs84: "72,213.7,93" },
	EPSG_4605: { towgs84: "9,183,236" },
	EPSG_4621: { towgs84: "137,248,-430" },
	EPSG_4657: { towgs84: "-28,199,5" },
	EPSG_4316: { towgs84: "103.25,-100.4,-307.19" },
	EPSG_4642: { towgs84: "-13,-348,292" },
	EPSG_4698: { towgs84: "145,-187,103" },
	EPSG_4192: { towgs84: "-206.1,-174.7,-87.7" },
	EPSG_4311: { towgs84: "-265,120,-358" },
	EPSG_4135: { towgs84: "58,-283,-182" },
	ESRI_104138: { towgs84: "198,-226,-347" },
	EPSG_4245: { towgs84: "-11,851,5" },
	EPSG_4142: { towgs84: "-125,53,467" },
	EPSG_4213: { towgs84: "-106,-87,188" },
	EPSG_4253: { towgs84: "-133,-77,-51" },
	EPSG_4129: { towgs84: "-132,-110,-335" },
	EPSG_4713: { towgs84: "-77,-128,142" },
	EPSG_4239: { towgs84: "217,823,299" },
	EPSG_4146: { towgs84: "295,736,257" },
	EPSG_4155: { towgs84: "-83,37,124" },
	EPSG_4165: { towgs84: "-173,253,27" },
	EPSG_4672: { towgs84: "175,-38,113" },
	EPSG_4236: { towgs84: "-637,-549,-203" },
	EPSG_4251: { towgs84: "-90,40,88" },
	EPSG_4271: { towgs84: "-2,374,172" },
	EPSG_4175: { towgs84: "-88,4,101" },
	EPSG_4716: { towgs84: "298,-304,-375" },
	EPSG_4315: { towgs84: "-23,259,-9" },
	EPSG_4744: { towgs84: "-242.2,-144.9,370.3" },
	EPSG_4244: { towgs84: "-97,787,86" },
	EPSG_4293: { towgs84: "616,97,-251" },
	EPSG_4714: { towgs84: "-127,-769,472" },
	EPSG_4736: { towgs84: "260,12,-147" },
	EPSG_6883: { towgs84: "-235,-110,393" },
	EPSG_6894: { towgs84: "-63,176,185" },
	EPSG_4205: { towgs84: "-43,-163,45" },
	EPSG_4256: { towgs84: "41,-220,-134" },
	EPSG_4262: { towgs84: "639,405,60" },
	EPSG_4604: { towgs84: "174,359,365" },
	EPSG_4169: { towgs84: "-115,118,426" },
	EPSG_4620: { towgs84: "-106,-129,165" },
	EPSG_4184: { towgs84: "-203,141,53" },
	EPSG_4616: { towgs84: "-289,-124,60" },
	EPSG_9403: { towgs84: "-307,-92,127" },
	EPSG_4684: { towgs84: "-133,-321,50" },
	EPSG_4708: { towgs84: "-491,-22,435" },
	EPSG_4707: { towgs84: "114,-116,-333" },
	EPSG_4709: { towgs84: "145,75,-272" },
	EPSG_4712: { towgs84: "-205,107,53" },
	EPSG_4711: { towgs84: "124,-234,-25" },
	EPSG_4718: { towgs84: "230,-199,-752" },
	EPSG_4719: { towgs84: "211,147,111" },
	EPSG_4724: { towgs84: "208,-435,-229" },
	EPSG_4725: { towgs84: "189,-79,-202" },
	EPSG_4735: { towgs84: "647,1777,-1124" },
	EPSG_4722: { towgs84: "-794,119,-298" },
	EPSG_4728: { towgs84: "-307,-92,127" },
	EPSG_4734: { towgs84: "-632,438,-609" },
	EPSG_4727: { towgs84: "912,-58,1227" },
	EPSG_4729: { towgs84: "185,165,42" },
	EPSG_4730: { towgs84: "170,42,84" },
	EPSG_4733: { towgs84: "276,-57,149" },
	ESRI_37218: { towgs84: "230,-199,-752" },
	ESRI_37240: { towgs84: "-7,215,225" },
	ESRI_37221: { towgs84: "252,-209,-751" },
	ESRI_4305: { towgs84: "-123,-206,219" },
	ESRI_104139: { towgs84: "-73,-247,227" },
	EPSG_4748: { towgs84: "51,391,-36" },
	EPSG_4219: { towgs84: "-384,664,-48" },
	EPSG_4255: { towgs84: "-333,-222,114" },
	EPSG_4257: { towgs84: "-587.8,519.75,145.76" },
	EPSG_4646: { towgs84: "-963,510,-359" },
	EPSG_6881: { towgs84: "-24,-203,268" },
	EPSG_6882: { towgs84: "-183,-15,273" },
	EPSG_4715: { towgs84: "-104,-129,239" },
	IGNF_RGF93GDD: { towgs84: "0,0,0" },
	IGNF_RGM04GDD: { towgs84: "0,0,0" },
	IGNF_RGSPM06GDD: { towgs84: "0,0,0" },
	IGNF_RGTAAF07GDD: { towgs84: "0,0,0" },
	IGNF_RGFG95GDD: { towgs84: "0,0,0" },
	IGNF_RGNCG: { towgs84: "0,0,0" },
	IGNF_RGPFGDD: { towgs84: "0,0,0" },
	IGNF_ETRS89G: { towgs84: "0,0,0" },
	IGNF_RGR92GDD: { towgs84: "0,0,0" },
	EPSG_4173: { towgs84: "0,0,0" },
	EPSG_4180: { towgs84: "0,0,0" },
	EPSG_4619: { towgs84: "0,0,0" },
	EPSG_4667: { towgs84: "0,0,0" },
	EPSG_4075: { towgs84: "0,0,0" },
	EPSG_6706: { towgs84: "0,0,0" },
	EPSG_7798: { towgs84: "0,0,0" },
	EPSG_4661: { towgs84: "0,0,0" },
	EPSG_4669: { towgs84: "0,0,0" },
	EPSG_8685: { towgs84: "0,0,0" },
	EPSG_4151: { towgs84: "0,0,0" },
	EPSG_9702: { towgs84: "0,0,0" },
	EPSG_4758: { towgs84: "0,0,0" },
	EPSG_4761: { towgs84: "0,0,0" },
	EPSG_4765: { towgs84: "0,0,0" },
	EPSG_8997: { towgs84: "0,0,0" },
	EPSG_4023: { towgs84: "0,0,0" },
	EPSG_4670: { towgs84: "0,0,0" },
	EPSG_4694: { towgs84: "0,0,0" },
	EPSG_4148: { towgs84: "0,0,0" },
	EPSG_4163: { towgs84: "0,0,0" },
	EPSG_4167: { towgs84: "0,0,0" },
	EPSG_4189: { towgs84: "0,0,0" },
	EPSG_4190: { towgs84: "0,0,0" },
	EPSG_4176: { towgs84: "0,0,0" },
	EPSG_4659: { towgs84: "0,0,0" },
	EPSG_3824: { towgs84: "0,0,0" },
	EPSG_3889: { towgs84: "0,0,0" },
	EPSG_4046: { towgs84: "0,0,0" },
	EPSG_4081: { towgs84: "0,0,0" },
	EPSG_4558: { towgs84: "0,0,0" },
	EPSG_4483: { towgs84: "0,0,0" },
	EPSG_5013: { towgs84: "0,0,0" },
	EPSG_5264: { towgs84: "0,0,0" },
	EPSG_5324: { towgs84: "0,0,0" },
	EPSG_5354: { towgs84: "0,0,0" },
	EPSG_5371: { towgs84: "0,0,0" },
	EPSG_5373: { towgs84: "0,0,0" },
	EPSG_5381: { towgs84: "0,0,0" },
	EPSG_5393: { towgs84: "0,0,0" },
	EPSG_5489: { towgs84: "0,0,0" },
	EPSG_5593: { towgs84: "0,0,0" },
	EPSG_6135: { towgs84: "0,0,0" },
	EPSG_6365: { towgs84: "0,0,0" },
	EPSG_5246: { towgs84: "0,0,0" },
	EPSG_7886: { towgs84: "0,0,0" },
	EPSG_8431: { towgs84: "0,0,0" },
	EPSG_8427: { towgs84: "0,0,0" },
	EPSG_8699: { towgs84: "0,0,0" },
	EPSG_8818: { towgs84: "0,0,0" },
	EPSG_4757: { towgs84: "0,0,0" },
	EPSG_9140: { towgs84: "0,0,0" },
	EPSG_8086: { towgs84: "0,0,0" },
	EPSG_4686: { towgs84: "0,0,0" },
	EPSG_4737: { towgs84: "0,0,0" },
	EPSG_4702: { towgs84: "0,0,0" },
	EPSG_4747: { towgs84: "0,0,0" },
	EPSG_4749: { towgs84: "0,0,0" },
	EPSG_4674: { towgs84: "0,0,0" },
	EPSG_4755: { towgs84: "0,0,0" },
	EPSG_4759: { towgs84: "0,0,0" },
	EPSG_4762: { towgs84: "0,0,0" },
	EPSG_4763: { towgs84: "0,0,0" },
	EPSG_4764: { towgs84: "0,0,0" },
	EPSG_4166: { towgs84: "0,0,0" },
	EPSG_4170: { towgs84: "0,0,0" },
	EPSG_5546: { towgs84: "0,0,0" },
	EPSG_7844: { towgs84: "0,0,0" },
	EPSG_4818: { towgs84: "589,76,480" },
	EPSG_10328: { towgs84: "0,0,0" },
	EPSG_9782: { towgs84: "0,0,0" },
	EPSG_9777: { towgs84: "0,0,0" },
	EPSG_10690: { towgs84: "0,0,0" },
	EPSG_10639: { towgs84: "0,0,0" },
	EPSG_10739: { towgs84: "0,0,0" },
	EPSG_7686: { towgs84: "0,0,0" },
	EPSG_8900: { towgs84: "0,0,0" },
	EPSG_5886: { towgs84: "0,0,0" },
	EPSG_7683: { towgs84: "0,0,0" },
	EPSG_6668: { towgs84: "0,0,0" },
	EPSG_20046: { towgs84: "0,0,0" },
	EPSG_10299: { towgs84: "0,0,0" },
	EPSG_10310: { towgs84: "0,0,0" },
	EPSG_10475: { towgs84: "0,0,0" },
	EPSG_4742: { towgs84: "0,0,0" },
	EPSG_10671: { towgs84: "0,0,0" },
	EPSG_10762: { towgs84: "0,0,0" },
	EPSG_10725: { towgs84: "0,0,0" },
	EPSG_10791: { towgs84: "0,0,0" },
	EPSG_10800: { towgs84: "0,0,0" },
	EPSG_10305: { towgs84: "0,0,0" },
	EPSG_10941: { towgs84: "0,0,0" },
	EPSG_10968: { towgs84: "0,0,0" },
	EPSG_10875: { towgs84: "0,0,0" },
	EPSG_6318: { towgs84: "0,0,0" },
	EPSG_10910: { towgs84: "0,0,0" }
};
for (var Xa in Ya) {
	var Za = Ya[Xa];
	Za.datumName && (Ya[Za.datumName] = Za);
}
//#endregion
//#region node_modules/proj4/lib/datum.js
function Qa(e, t, n, r, i, a, o) {
	var s = {};
	return e === void 0 || e === "none" ? s.datum_type = 5 : s.datum_type = 4, t && (s.datum_params = t.map(parseFloat), (s.datum_params[0] !== 0 || s.datum_params[1] !== 0 || s.datum_params[2] !== 0) && (s.datum_type = 1), s.datum_params.length > 3 && (s.datum_params[3] !== 0 || s.datum_params[4] !== 0 || s.datum_params[5] !== 0 || s.datum_params[6] !== 0) && (s.datum_type = 2, s.datum_params[3] *= Ci, s.datum_params[4] *= Ci, s.datum_params[5] *= Ci, s.datum_params[6] = s.datum_params[6] / 1e6 + 1)), o && (s.datum_type = 3, s.grids = o), s.a = n, s.b = r, s.es = i, s.ep2 = a, s;
}
//#endregion
//#region node_modules/proj4/lib/nadgrid.js
var $a = {};
function eo(e, t, n) {
	return t instanceof ArrayBuffer ? to(e, t, n) : { ready: no(e, t) };
}
function to(e, t, n) {
	var r = !0;
	n !== void 0 && n.includeErrorFields === !1 && (r = !1);
	var i = new DataView(t), a = so(i), o = co(i, a), s = {
		header: o,
		subgrids: uo(i, o, a, r)
	};
	return $a[e] = s, s;
}
async function no(e, t) {
	for (var n = [], r = await t.getImageCount(), i = r - 1; i >= 0; i--) {
		var a = await t.getImage(i), o = await a.readRasters(), s = [a.getWidth(), a.getHeight()], c = a.getBoundingBox().map(ao), l = [a.fileDirectory.ModelPixelScale[0], a.fileDirectory.ModelPixelScale[1]].map(ao), u = c[0] + (s[0] - 1) * l[0], d = c[3] - (s[1] - 1) * l[1], f = o[0], p = o[1], m = [];
		for (let e = s[1] - 1; e >= 0; e--) for (let t = s[0] - 1; t >= 0; t--) {
			var h = e * s[0] + t;
			m.push([-oo(p[h]), oo(f[h])]);
		}
		n.push({
			del: l,
			lim: s,
			ll: [-u, d],
			cvs: m
		});
	}
	var g = {
		header: { nSubgrids: r },
		subgrids: n
	};
	return $a[e] = g, g;
}
function ro(e) {
	return e === void 0 ? null : e.split(",").map(io);
}
function io(e) {
	if (e.length === 0) return null;
	var t = e[0] === "@";
	return t && (e = e.slice(1)), e === "null" ? {
		name: "null",
		mandatory: !t,
		grid: null,
		isNull: !0
	} : {
		name: e,
		mandatory: !t,
		grid: $a[e] || null,
		isNull: !1
	};
}
function ao(e) {
	return e * Math.PI / 180;
}
function oo(e) {
	return e / 3600 * Math.PI / 180;
}
function so(e) {
	var t = e.getInt32(8, !1);
	return t === 11 ? !1 : (t = e.getInt32(8, !0), t !== 11 && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"), !0);
}
function co(e, t) {
	return {
		nFields: e.getInt32(8, t),
		nSubgridFields: e.getInt32(24, t),
		nSubgrids: e.getInt32(40, t),
		shiftType: lo(e, 56, 64).trim(),
		fromSemiMajorAxis: e.getFloat64(120, t),
		fromSemiMinorAxis: e.getFloat64(136, t),
		toSemiMajorAxis: e.getFloat64(152, t),
		toSemiMinorAxis: e.getFloat64(168, t)
	};
}
function lo(e, t, n) {
	return String.fromCharCode.apply(null, new Uint8Array(e.buffer.slice(t, n)));
}
function uo(e, t, n, r) {
	for (var i = 176, a = [], o = 0; o < t.nSubgrids; o++) {
		var s = po(e, i, n), c = mo(e, i, s, n, r), l = Math.round(1 + (s.upperLongitude - s.lowerLongitude) / s.longitudeInterval), u = Math.round(1 + (s.upperLatitude - s.lowerLatitude) / s.latitudeInterval);
		a.push({
			ll: [oo(s.lowerLongitude), oo(s.lowerLatitude)],
			del: [oo(s.longitudeInterval), oo(s.latitudeInterval)],
			lim: [l, u],
			count: s.gridNodeCount,
			cvs: fo(c)
		});
		var d = 16;
		r === !1 && (d = 8), i += 176 + s.gridNodeCount * d;
	}
	return a;
}
function fo(e) {
	return e.map(function(e) {
		return [oo(e.longitudeShift), oo(e.latitudeShift)];
	});
}
function po(e, t, n) {
	return {
		name: lo(e, t + 8, t + 16).trim(),
		parent: lo(e, t + 24, t + 24 + 8).trim(),
		lowerLatitude: e.getFloat64(t + 72, n),
		upperLatitude: e.getFloat64(t + 88, n),
		lowerLongitude: e.getFloat64(t + 104, n),
		upperLongitude: e.getFloat64(t + 120, n),
		latitudeInterval: e.getFloat64(t + 136, n),
		longitudeInterval: e.getFloat64(t + 152, n),
		gridNodeCount: e.getInt32(t + 168, n)
	};
}
function mo(e, t, n, r, i) {
	var a = t + 176, o = 16;
	i === !1 && (o = 8);
	for (var s = [], c = 0; c < n.gridNodeCount; c++) {
		var l = {
			latitudeShift: e.getFloat32(a + c * o, r),
			longitudeShift: e.getFloat32(a + c * o + 4, r)
		};
		i !== !1 && (l.latitudeAccuracy = e.getFloat32(a + c * o + 8, r), l.longitudeAccuracy = e.getFloat32(a + c * o + 12, r)), s.push(l);
	}
	return s;
}
//#endregion
//#region node_modules/proj4/lib/Proj.js
function ho(e, t) {
	if (!(this instanceof ho)) return new ho(e);
	this.forward = null, this.inverse = null, this.init = null, this.name, this.names = null, this.title, t ||= function(e) {
		if (e) throw e;
	};
	var n = wa(e);
	if (typeof n != "object") {
		t("Could not parse to valid json: " + e);
		return;
	}
	var r = ho.projections.get(n.projName);
	if (!r) {
		t("Could not get projection name from: " + e);
		return;
	}
	if (n.datumCode && n.datumCode !== "none") {
		var i = Pi(Ya, n.datumCode);
		i && (n.datum_params = n.datum_params || (i.towgs84 ? i.towgs84.split(",") : null), n.ellps = i.ellipse, n.datumName = i.datumName ? i.datumName : n.datumCode);
	}
	n.k0 = n.k0 || 1, n.axis = n.axis || "enu", n.ellps = n.ellps || "wgs84", n.lat1 = n.lat1 || n.lat0;
	var a = Ja(n.a, n.b, n.rf, n.ellps, n.sphere), o = qa(a.a, a.b, a.rf, n.R_A), s = ro(n.nadgrids), c = n.datum || Qa(n.datumCode, n.datum_params, a.a, a.b, o.es, o.ep2, s);
	Ta(this, n), Ta(this, r), this.a = a.a, this.b = a.b, this.rf = a.rf, this.sphere = a.sphere, this.es = o.es, this.e = o.e, this.ep2 = o.ep2, this.datum = c, "init" in this && typeof this.init == "function" && this.init(), t(null, this);
}
ho.projections = Wa, ho.projections.start();
//#endregion
//#region node_modules/proj4/lib/datumUtils.js
function go(e, t) {
	return e.datum_type === t.datum_type ? e.a !== t.a || Math.abs(e.es - t.es) > 5e-11 ? !1 : e.datum_type === 1 ? e.datum_params[0] === t.datum_params[0] && e.datum_params[1] === t.datum_params[1] && e.datum_params[2] === t.datum_params[2] : e.datum_type === 2 ? e.datum_params[0] === t.datum_params[0] && e.datum_params[1] === t.datum_params[1] && e.datum_params[2] === t.datum_params[2] && e.datum_params[3] === t.datum_params[3] && e.datum_params[4] === t.datum_params[4] && e.datum_params[5] === t.datum_params[5] && e.datum_params[6] === t.datum_params[6] : !0 : !1;
}
function _o(e, t, n) {
	var r = e.x, i = e.y, a = e.z ? e.z : 0, o, s, c, l;
	if (i < -G && i > -1.001 * G) i = -G;
	else if (i > G && i < 1.001 * G) i = G;
	else if (i < -G) return {
		x: -Infinity,
		y: -Infinity,
		z: e.z
	};
	else if (i > G) return {
		x: Infinity,
		y: Infinity,
		z: e.z
	};
	return r > Math.PI && (r -= 2 * Math.PI), s = Math.sin(i), l = Math.cos(i), c = s * s, o = n / Math.sqrt(1 - t * c), {
		x: (o + a) * l * Math.cos(r),
		y: (o + a) * l * Math.sin(r),
		z: (o * (1 - t) + a) * s
	};
}
function vo(e, t, n, r) {
	var i = 1e-12, a = i * i, o = 30, s, c, l, u, d, f, p, m, h, g, _, v, y, b = e.x, x = e.y, S = e.z ? e.z : 0, C, w, T;
	if (s = Math.sqrt(b * b + x * x), c = Math.sqrt(b * b + x * x + S * S), s / n < i) {
		if (C = 0, c / n < i) return w = G, T = -r, {
			x: e.x,
			y: e.y,
			z: e.z
		};
	} else C = Math.atan2(x, b);
	l = S / c, u = s / c, d = 1 / Math.sqrt(1 - t * (2 - t) * u * u), m = u * (1 - t) * d, h = l * d, y = 0;
	do
		y++, p = n / Math.sqrt(1 - t * h * h), T = s * m + S * h - p * (1 - t * h * h), f = t * p / (p + T), d = 1 / Math.sqrt(1 - f * (2 - f) * u * u), g = u * (1 - f) * d, _ = l * d, v = _ * m - g * h, m = g, h = _;
	while (v * v > a && y < o);
	return w = Math.atan(_ / Math.abs(g)), {
		x: C,
		y: w,
		z: T
	};
}
function yo(e, t, n) {
	if (t === 1) return {
		x: e.x + n[0],
		y: e.y + n[1],
		z: e.z + n[2]
	};
	if (t === 2) {
		var r = n[0], i = n[1], a = n[2], o = n[3], s = n[4], c = n[5], l = n[6];
		return {
			x: l * (e.x - c * e.y + s * e.z) + r,
			y: l * (c * e.x + e.y - o * e.z) + i,
			z: l * (-s * e.x + o * e.y + e.z) + a
		};
	}
}
function bo(e, t, n) {
	if (t === 1) return {
		x: e.x - n[0],
		y: e.y - n[1],
		z: e.z - n[2]
	};
	if (t === 2) {
		var r = n[0], i = n[1], a = n[2], o = n[3], s = n[4], c = n[5], l = n[6], u = (e.x - r) / l, d = (e.y - i) / l, f = (e.z - a) / l;
		return {
			x: u + c * d - s * f,
			y: -c * u + d + o * f,
			z: s * u - o * d + f
		};
	}
}
//#endregion
//#region node_modules/proj4/lib/datum_transform.js
function xo(e) {
	return e === 1 || e === 2;
}
function So(e, t, n) {
	if (go(e, t) || e.datum_type === 5 || t.datum_type === 5) return n;
	var r = e.a, i = e.es;
	if (e.datum_type === 3) {
		if (Co(e, !1, n) !== 0) return;
		r = bi, i = Si;
	}
	var a = t.a, o = t.b, s = t.es;
	if (t.datum_type === 3 && (a = bi, o = xi, s = Si), i === s && r === a && !xo(e.datum_type) && !xo(t.datum_type) || (n = _o(n, i, r), xo(e.datum_type) && (n = yo(n, e.datum_type, e.datum_params)), xo(t.datum_type) && (n = bo(n, t.datum_type, t.datum_params)), n = vo(n, s, a, o), !(t.datum_type === 3 && Co(t, !0, n) !== 0))) return n;
}
function Co(e, t, n) {
	if (e.grids === null || e.grids.length === 0) return console.log("Grid shift grids not found"), -1;
	var r = {
		x: -n.x,
		y: n.y
	}, i = {
		x: NaN,
		y: NaN
	}, a = [];
	outer: for (var o = 0; o < e.grids.length; o++) {
		var s = e.grids[o];
		if (a.push(s.name), s.isNull) {
			i = r;
			break;
		}
		if (s.grid === null) {
			if (s.mandatory) return console.log("Unable to find mandatory grid '" + s.name + "'"), -1;
			continue;
		}
		for (var c = s.grid.subgrids, l = 0, u = c.length; l < u; l++) {
			var d = c[l], f = (Math.abs(d.del[1]) + Math.abs(d.del[0])) / 1e4, p = d.ll[0] - f, m = d.ll[1] - f, h = d.ll[0] + (d.lim[0] - 1) * d.del[0] + f, g = d.ll[1] + (d.lim[1] - 1) * d.del[1] + f;
			if (!(m > r.y || p > r.x || g < r.y || h < r.x) && (i = wo(r, t, d), !isNaN(i.x))) break outer;
		}
	}
	return isNaN(i.x) ? (console.log("Failed to find a grid shift table for location '" + -r.x * Oi + " " + r.y * Oi + " tried: '" + a + "'"), -1) : (n.x = -i.x, n.y = i.y, 0);
}
function wo(e, t, n) {
	var r = {
		x: NaN,
		y: NaN
	};
	if (isNaN(e.x)) return r;
	var i = {
		x: e.x,
		y: e.y
	};
	i.x -= n.ll[0], i.y -= n.ll[1], i.x = J(i.x - Math.PI) + Math.PI;
	var a = To(i, n);
	if (t) {
		if (isNaN(a.x)) return r;
		a.x = i.x - a.x, a.y = i.y - a.y;
		var o = 9, s = 1e-12, c, l;
		do {
			if (l = To(a, n), isNaN(l.x)) {
				console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
				break;
			}
			c = {
				x: i.x - (l.x + a.x),
				y: i.y - (l.y + a.y)
			}, a.x += c.x, a.y += c.y;
		} while (o-- && Math.abs(c.x) > s && Math.abs(c.y) > s);
		if (o < 0) return console.log("Inverse grid shift iterator failed to converge."), r;
		r.x = J(a.x + n.ll[0]), r.y = a.y + n.ll[1];
	} else isNaN(a.x) || (r.x = e.x + a.x, r.y = e.y + a.y);
	return r;
}
function To(e, t) {
	var n = {
		x: e.x / t.del[0],
		y: e.y / t.del[1]
	}, r = {
		x: Math.floor(n.x),
		y: Math.floor(n.y)
	}, i = {
		x: n.x - 1 * r.x,
		y: n.y - 1 * r.y
	}, a = {
		x: NaN,
		y: NaN
	}, o;
	if (r.x < 0 || r.x >= t.lim[0] || r.y < 0 || r.y >= t.lim[1]) return a;
	o = r.y * t.lim[0] + r.x;
	var s = {
		x: t.cvs[o][0],
		y: t.cvs[o][1]
	};
	o++;
	var c = {
		x: t.cvs[o][0],
		y: t.cvs[o][1]
	};
	o += t.lim[0];
	var l = {
		x: t.cvs[o][0],
		y: t.cvs[o][1]
	};
	o--;
	var u = {
		x: t.cvs[o][0],
		y: t.cvs[o][1]
	}, d = i.x * i.y, f = i.x * (1 - i.y), p = (1 - i.x) * (1 - i.y), m = (1 - i.x) * i.y;
	return a.x = p * s.x + f * c.x + m * u.x + d * l.x, a.y = p * s.y + f * c.y + m * u.y + d * l.y, a;
}
//#endregion
//#region node_modules/proj4/lib/adjust_axis.js
function Eo(e, t, n) {
	var r = n.x, i = n.y, a = n.z || 0, o, s, c, l = {};
	for (c = 0; c < 3; c++) if (!(t && c === 2 && n.z === void 0)) switch (c === 0 ? (o = r, s = "ew".indexOf(e.axis[c]) === -1 ? "y" : "x") : c === 1 ? (o = i, s = "ns".indexOf(e.axis[c]) === -1 ? "x" : "y") : (o = a, s = "z"), e.axis[c]) {
		case "e":
			l[s] = o;
			break;
		case "w":
			l[s] = -o;
			break;
		case "n":
			l[s] = o;
			break;
		case "s":
			l[s] = -o;
			break;
		case "u":
			n[s] !== void 0 && (l.z = o);
			break;
		case "d":
			n[s] !== void 0 && (l.z = -o);
			break;
		default: return null;
	}
	return l;
}
//#endregion
//#region node_modules/proj4/lib/common/toPoint.js
function Do(e) {
	var t = {
		x: e[0],
		y: e[1]
	};
	return e.length > 2 && (t.z = e[2]), e.length > 3 && (t.m = e[3]), t;
}
//#endregion
//#region node_modules/proj4/lib/checkSanity.js
function Oo(e) {
	ko(e.x), ko(e.y);
}
function ko(e) {
	if (typeof Number.isFinite == "function") {
		if (Number.isFinite(e)) return;
		throw TypeError("coordinates must be finite numbers");
	}
	if (typeof e != "number" || e !== e || !isFinite(e)) throw TypeError("coordinates must be finite numbers");
}
//#endregion
//#region node_modules/proj4/lib/transform.js
function Ao(e, t) {
	return (e.datum.datum_type === 1 || e.datum.datum_type === 2 || e.datum.datum_type === 3) && t.datumCode !== "WGS84" || (t.datum.datum_type === 1 || t.datum.datum_type === 2 || t.datum.datum_type === 3) && e.datumCode !== "WGS84";
}
function jo(e, t, n, r) {
	var i;
	n = Array.isArray(n) ? Do(n) : {
		x: n.x,
		y: n.y,
		z: n.z,
		m: n.m
	};
	var a = n.z !== void 0;
	if (Oo(n), e.datum && t.datum && Ao(e, t) && (i = new ho("WGS84"), n = jo(e, i, n, r), e = i), r && e.axis !== "enu" && (n = Eo(e, !1, n)), e.projName === "longlat") n = {
		x: n.x * K,
		y: n.y * K,
		z: n.z || 0
	};
	else if (e.to_meter && (n = {
		x: n.x * e.to_meter,
		y: n.y * e.to_meter,
		z: n.z || 0
	}), n = e.inverse(n), !n) return;
	if (e.from_greenwich && (n.x += e.from_greenwich), n = So(e.datum, t.datum, n), n) return n = n, t.from_greenwich && (n = {
		x: n.x - t.from_greenwich,
		y: n.y,
		z: n.z || 0
	}), t.projName === "longlat" ? n = {
		x: n.x * Oi,
		y: n.y * Oi,
		z: n.z || 0
	} : (n = t.forward(n), t.to_meter && (n = {
		x: n.x / t.to_meter,
		y: n.y / t.to_meter,
		z: n.z || 0
	})), r && t.axis !== "enu" ? Eo(t, !0, n) : (n && !a && t.projName !== "geocent" && delete n.z, n);
}
//#endregion
//#region node_modules/proj4/lib/core.js
var Mo = ho("WGS84");
function No(e, t, n, r) {
	var i, a, o;
	return Array.isArray(n) ? (i = jo(e, t, n, r) || {
		x: NaN,
		y: NaN
	}, n.length > 2 ? e.name !== void 0 && e.name === "geocent" || t.name !== void 0 && t.name === "geocent" ? typeof i.z == "number" ? [
		i.x,
		i.y,
		i.z
	].concat(n.slice(3)) : [
		i.x,
		i.y,
		n[2]
	].concat(n.slice(3)) : [i.x, i.y].concat(n.slice(2)) : [i.x, i.y]) : (a = jo(e, t, n, r), o = Object.keys(n), o.length === 2 || o.forEach(function(r) {
		if (e.name !== void 0 && e.name === "geocent" || t.name !== void 0 && t.name === "geocent") {
			if (r === "x" || r === "y" || r === "z") return;
		} else if (r === "x" || r === "y") return;
		a[r] = n[r];
	}), a);
}
function Po(e) {
	return e instanceof ho ? e : typeof e == "object" && "oProj" in e ? e.oProj : ho(e);
}
function Fo(e, t, n) {
	var r, i, a = !1, o;
	return t === void 0 ? (i = Po(e), r = Mo, a = !0) : (t.x !== void 0 || Array.isArray(t)) && (n = t, i = Po(e), r = Mo, a = !0), r ||= Po(e), i ||= Po(t), n ? No(r, i, n) : (o = {
		forward: function(e, t) {
			return No(r, i, e, t);
		},
		inverse: function(e, t) {
			return No(i, r, e, t);
		}
	}, a && (o.oProj = i), o);
}
//#endregion
//#region node_modules/mgrs/mgrs.js
var Io = 6, Lo = "AJSAJS", Ro = "AFAFAF", zo = 65, Bo = 73, Vo = 79, Ho = 86, Uo = 90, Wo = {
	forward: Go,
	inverse: Ko,
	toPoint: qo
};
function Go(e, t) {
	return t ||= 5, $o(Xo({
		lat: e[1],
		lon: e[0]
	}), t);
}
function Ko(e) {
	var t = Zo(rs(e.toUpperCase()));
	return t.lat && t.lon ? [
		t.lon,
		t.lat,
		t.lon,
		t.lat
	] : [
		t.left,
		t.bottom,
		t.right,
		t.top
	];
}
function qo(e) {
	var t = Zo(rs(e.toUpperCase()));
	return t.lat && t.lon ? [t.lon, t.lat] : [(t.left + t.right) / 2, (t.top + t.bottom) / 2];
}
function Jo(e) {
	return Math.PI / 180 * e;
}
function Yo(e) {
	return e / Math.PI * 180;
}
function Xo(e) {
	var t = e.lat, n = e.lon, r = 6378137, i = .00669438, a = .9996, o, s, c, l, u, d, f, p = Jo(t), m = Jo(n), h, g = Math.floor((n + 180) / 6) + 1;
	n === 180 && (g = 60), t >= 56 && t < 64 && n >= 3 && n < 12 && (g = 32), t >= 72 && t < 84 && (n >= 0 && n < 9 ? g = 31 : n >= 9 && n < 21 ? g = 33 : n >= 21 && n < 33 ? g = 35 : n >= 33 && n < 42 && (g = 37)), o = (g - 1) * 6 - 180 + 3, h = Jo(o), s = i / (1 - i), c = r / Math.sqrt(1 - i * Math.sin(p) * Math.sin(p)), l = Math.tan(p) * Math.tan(p), u = s * Math.cos(p) * Math.cos(p), d = Math.cos(p) * (m - h), f = r * ((1 - i / 4 - 3 * i * i / 64 - 5 * i * i * i / 256) * p - (3 * i / 8 + 3 * i * i / 32 + 45 * i * i * i / 1024) * Math.sin(2 * p) + (15 * i * i / 256 + 45 * i * i * i / 1024) * Math.sin(4 * p) - 35 * i * i * i / 3072 * Math.sin(6 * p));
	var _ = a * c * (d + (1 - l + u) * d * d * d / 6 + (5 - 18 * l + l * l + 72 * u - 58 * s) * d * d * d * d * d / 120) + 5e5, v = a * (f + c * Math.tan(p) * (d * d / 2 + (5 - l + 9 * u + 4 * u * u) * d * d * d * d / 24 + (61 - 58 * l + l * l + 600 * u - 330 * s) * d * d * d * d * d * d / 720));
	return t < 0 && (v += 1e7), {
		northing: Math.round(v),
		easting: Math.round(_),
		zoneNumber: g,
		zoneLetter: Qo(t)
	};
}
function Zo(e) {
	var t = e.northing, n = e.easting, r = e.zoneLetter, i = e.zoneNumber;
	if (i < 0 || i > 60) return null;
	var a = .9996, o = 6378137, s = .00669438, c, l = (1 - Math.sqrt(1 - s)) / (1 + Math.sqrt(1 - s)), u, d, f, p, m, h, g, _, v, y = n - 5e5, b = t;
	r < "N" && (b -= 1e7), g = (i - 1) * 6 - 180 + 3, c = s / (1 - s), h = b / a, _ = h / (o * (1 - s / 4 - 3 * s * s / 64 - 5 * s * s * s / 256)), v = _ + (3 * l / 2 - 27 * l * l * l / 32) * Math.sin(2 * _) + (21 * l * l / 16 - 55 * l * l * l * l / 32) * Math.sin(4 * _) + 151 * l * l * l / 96 * Math.sin(6 * _), u = o / Math.sqrt(1 - s * Math.sin(v) * Math.sin(v)), d = Math.tan(v) * Math.tan(v), f = c * Math.cos(v) * Math.cos(v), p = o * (1 - s) / (1 - s * Math.sin(v) * Math.sin(v)) ** 1.5, m = y / (u * a);
	var x = v - u * Math.tan(v) / p * (m * m / 2 - (5 + 3 * d + 10 * f - 4 * f * f - 9 * c) * m * m * m * m / 24 + (61 + 90 * d + 298 * f + 45 * d * d - 252 * c - 3 * f * f) * m * m * m * m * m * m / 720);
	x = Yo(x);
	var S = (m - (1 + 2 * d + f) * m * m * m / 6 + (5 - 2 * f + 28 * d - 3 * f * f + 8 * c + 24 * d * d) * m * m * m * m * m / 120) / Math.cos(v);
	S = g + Yo(S);
	var C;
	if (e.accuracy) {
		var w = Zo({
			northing: e.northing + e.accuracy,
			easting: e.easting + e.accuracy,
			zoneLetter: e.zoneLetter,
			zoneNumber: e.zoneNumber
		});
		C = {
			top: w.lat,
			right: w.lon,
			bottom: x,
			left: S
		};
	} else C = {
		lat: x,
		lon: S
	};
	return C;
}
function Qo(e) {
	var t = "Z";
	return 84 >= e && e >= 72 ? t = "X" : 72 > e && e >= 64 ? t = "W" : 64 > e && e >= 56 ? t = "V" : 56 > e && e >= 48 ? t = "U" : 48 > e && e >= 40 ? t = "T" : 40 > e && e >= 32 ? t = "S" : 32 > e && e >= 24 ? t = "R" : 24 > e && e >= 16 ? t = "Q" : 16 > e && e >= 8 ? t = "P" : 8 > e && e >= 0 ? t = "N" : 0 > e && e >= -8 ? t = "M" : -8 > e && e >= -16 ? t = "L" : -16 > e && e >= -24 ? t = "K" : -24 > e && e >= -32 ? t = "J" : -32 > e && e >= -40 ? t = "H" : -40 > e && e >= -48 ? t = "G" : -48 > e && e >= -56 ? t = "F" : -56 > e && e >= -64 ? t = "E" : -64 > e && e >= -72 ? t = "D" : -72 > e && e >= -80 && (t = "C"), t;
}
function $o(e, t) {
	var n = "00000" + e.easting, r = "00000" + e.northing;
	return e.zoneNumber + e.zoneLetter + es(e.easting, e.northing, e.zoneNumber) + n.substr(n.length - 5, t) + r.substr(r.length - 5, t);
}
function es(e, t, n) {
	var r = ts(n);
	return ns(Math.floor(e / 1e5), Math.floor(t / 1e5) % 20, r);
}
function ts(e) {
	var t = e % Io;
	return t === 0 && (t = Io), t;
}
function ns(e, t, n) {
	var r = n - 1, i = Lo.charCodeAt(r), a = Ro.charCodeAt(r), o = i + e - 1, s = a + t, c = !1;
	return o > Uo && (o = o - Uo + zo - 1, c = !0), (o === Bo || i < Bo && o > Bo || (o > Bo || i < Bo) && c) && o++, (o === Vo || i < Vo && o > Vo || (o > Vo || i < Vo) && c) && (o++, o === Bo && o++), o > Uo && (o = o - Uo + zo - 1), s > Ho ? (s = s - Ho + zo - 1, c = !0) : c = !1, (s === Bo || a < Bo && s > Bo || (s > Bo || a < Bo) && c) && s++, (s === Vo || a < Vo && s > Vo || (s > Vo || a < Vo) && c) && (s++, s === Bo && s++), s > Ho && (s = s - Ho + zo - 1), String.fromCharCode(o) + String.fromCharCode(s);
}
function rs(e) {
	if (e && e.length === 0) throw "MGRSPoint coverting from nothing";
	for (var t = e.length, n = null, r = "", i, a = 0; !/[A-Z]/.test(i = e.charAt(a));) {
		if (a >= 2) throw "MGRSPoint bad conversion from: " + e;
		r += i, a++;
	}
	var o = parseInt(r, 10);
	if (a === 0 || a + 3 > t) throw "MGRSPoint bad conversion from: " + e;
	var s = e.charAt(a++);
	if (s <= "A" || s === "B" || s === "Y" || s >= "Z" || s === "I" || s === "O") throw "MGRSPoint zone letter " + s + " not handled: " + e;
	n = e.substring(a, a += 2);
	for (var c = ts(o), l = is(n.charAt(0), c), u = as(n.charAt(1), c); u < os(s);) u += 2e6;
	var d = t - a;
	if (d % 2 != 0) throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + e;
	var f = d / 2, p = 0, m = 0, h, g, _, v, y;
	return f > 0 && (h = 1e5 / 10 ** f, g = e.substring(a, a + f), p = parseFloat(g) * h, _ = e.substring(a + f), m = parseFloat(_) * h), v = p + l, y = m + u, {
		easting: v,
		northing: y,
		zoneLetter: s,
		zoneNumber: o,
		accuracy: h
	};
}
function is(e, t) {
	for (var n = Lo.charCodeAt(t - 1), r = 1e5, i = !1; n !== e.charCodeAt(0);) {
		if (n++, n === Bo && n++, n === Vo && n++, n > Uo) {
			if (i) throw "Bad character: " + e;
			n = zo, i = !0;
		}
		r += 1e5;
	}
	return r;
}
function as(e, t) {
	if (e > "V") throw "MGRSPoint given invalid Northing " + e;
	for (var n = Ro.charCodeAt(t - 1), r = 0, i = !1; n !== e.charCodeAt(0);) {
		if (n++, n === Bo && n++, n === Vo && n++, n > Ho) {
			if (i) throw "Bad character: " + e;
			n = zo, i = !0;
		}
		r += 1e5;
	}
	return r;
}
function os(e) {
	var t;
	switch (e) {
		case "C":
			t = 11e5;
			break;
		case "D":
			t = 2e6;
			break;
		case "E":
			t = 28e5;
			break;
		case "F":
			t = 37e5;
			break;
		case "G":
			t = 46e5;
			break;
		case "H":
			t = 55e5;
			break;
		case "J":
			t = 64e5;
			break;
		case "K":
			t = 73e5;
			break;
		case "L":
			t = 82e5;
			break;
		case "M":
			t = 91e5;
			break;
		case "N":
			t = 0;
			break;
		case "P":
			t = 8e5;
			break;
		case "Q":
			t = 17e5;
			break;
		case "R":
			t = 26e5;
			break;
		case "S":
			t = 35e5;
			break;
		case "T":
			t = 44e5;
			break;
		case "U":
			t = 53e5;
			break;
		case "V":
			t = 62e5;
			break;
		case "W":
			t = 7e6;
			break;
		case "X":
			t = 79e5;
			break;
		default: t = -1;
	}
	if (t >= 0) return t;
	throw "Invalid zone letter: " + e;
}
//#endregion
//#region node_modules/proj4/lib/Point.js
function ss(e, t, n) {
	if (!(this instanceof ss)) return new ss(e, t, n);
	if (Array.isArray(e)) this.x = e[0], this.y = e[1], this.z = e[2] || 0;
	else if (typeof e == "object") this.x = e.x, this.y = e.y, this.z = e.z || 0;
	else if (typeof e == "string" && t === void 0) {
		var r = e.split(",");
		this.x = parseFloat(r[0]), this.y = parseFloat(r[1]), this.z = parseFloat(r[2]) || 0;
	} else this.x = e, this.y = t, this.z = n || 0;
	console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
}
ss.fromMGRS = function(e) {
	return new ss(qo(e));
}, ss.prototype.toMGRS = function(e) {
	return Go([this.x, this.y], e);
};
//#endregion
//#region node_modules/proj4/lib/common/pj_enfn.js
var cs = 1, ls = .25, us = .046875, ds = .01953125, fs = .01068115234375, ps = .75, ms = .46875, hs = .013020833333333334, gs = .007120768229166667, _s = .3645833333333333, vs = .005696614583333333, ys = .3076171875;
function bs(e) {
	var t = [];
	t[0] = cs - e * (ls + e * (us + e * (ds + e * fs))), t[1] = e * (ps - e * (us + e * (ds + e * fs)));
	var n = e * e;
	return t[2] = n * (ms - e * (hs + e * gs)), n *= e, t[3] = n * (_s - e * vs), t[4] = n * e * ys, t;
}
//#endregion
//#region node_modules/proj4/lib/common/pj_mlfn.js
function xs(e, t, n, r) {
	return n *= t, t *= t, r[0] * e - n * (r[1] + t * (r[2] + t * (r[3] + t * r[4])));
}
//#endregion
//#region node_modules/proj4/lib/common/pj_inv_mlfn.js
var Ss = 20;
function Cs(e, t, n) {
	for (var r = 1 / (1 - t), i = e, a = Ss; a; --a) {
		var o = Math.sin(i), s = 1 - t * o * o;
		if (s = (xs(i, o, Math.cos(i), n) - e) * (s * Math.sqrt(s)) * r, i -= s, Math.abs(s) < 1e-10) return i;
	}
	return i;
}
//#endregion
//#region node_modules/proj4/lib/projections/tmerc.js
function ws() {
	this.x0 = this.x0 === void 0 ? 0 : this.x0, this.y0 = this.y0 === void 0 ? 0 : this.y0, this.long0 = this.long0 === void 0 ? 0 : this.long0, this.lat0 = this.lat0 === void 0 ? 0 : this.lat0, this.es && (this.en = bs(this.es), this.ml0 = xs(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en));
}
function Ts(e) {
	var t = e.x, n = e.y, r = J(t - this.long0, this.over), i, a, o, s = Math.sin(n), c = Math.cos(n);
	if (this.es) {
		var l = c * r, u = l ** 2, d = this.ep2 * c ** 2, f = d ** 2, p = (Math.abs(c) > 1e-10 ? Math.tan(n) : 0) ** 2, m = p ** 2;
		i = 1 - this.es * s ** 2, l /= Math.sqrt(i);
		var h = xs(n, s, c, this.en);
		a = this.a * (this.k0 * l * (1 + u / 6 * (1 - p + d + u / 20 * (5 - 18 * p + m + 14 * d - 58 * p * d + u / 42 * (61 + 179 * m - m * p - 479 * p))))) + this.x0, o = this.a * (this.k0 * (h - this.ml0 + s * r * l / 2 * (1 + u / 12 * (5 - p + 9 * d + 4 * f + u / 30 * (61 + m - 58 * p + 270 * d - 330 * p * d + u / 56 * (1385 + 543 * m - m * p - 3111 * p)))))) + this.y0;
	} else {
		var g = c * Math.sin(r);
		if (Math.abs(Math.abs(g) - 1) < 1e-10) return 93;
		if (a = .5 * this.a * this.k0 * Math.log((1 + g) / (1 - g)) + this.x0, o = c * Math.cos(r) / Math.sqrt(1 - g ** 2), g = Math.abs(o), g >= 1) {
			if (g - 1 > 1e-10) return 93;
			o = 0;
		} else o = Math.acos(o);
		n < 0 && (o = -o), o = this.a * this.k0 * (o - this.lat0) + this.y0;
	}
	return e.x = a, e.y = o, e;
}
function Es(e) {
	var t, n, r, i, a = (e.x - this.x0) * (1 / this.a), o = (e.y - this.y0) * (1 / this.a);
	if (!this.es) {
		var s = Math.exp(a / this.k0), c = .5 * (s - 1 / s), l = this.lat0 + o / this.k0, u = Math.cos(l);
		t = Math.sqrt((1 - u ** 2) / (1 + c ** 2)), r = Math.asin(t), o < 0 && (r = -r), i = c === 0 && u === 0 ? 0 : J(Math.atan2(c, u) + this.long0, this.over);
	} else if (t = this.ml0 + o / this.k0, n = Cs(t, this.es, this.en), Math.abs(n) < G) {
		var d = Math.sin(n), f = Math.cos(n), p = Math.abs(f) > 1e-10 ? Math.tan(n) : 0, m = this.ep2 * f ** 2, h = m ** 2, g = p ** 2, _ = g ** 2;
		t = 1 - this.es * d ** 2;
		var v = a * Math.sqrt(t) / this.k0, y = v ** 2;
		t *= p, r = n - t * y / (1 - this.es) * .5 * (1 - y / 12 * (5 + 3 * g - 9 * m * g + m - 4 * h - y / 30 * (61 + 90 * g - 252 * m * g + 45 * _ + 46 * m - y / 56 * (1385 + 3633 * g + 4095 * _ + 1574 * _ * g)))), i = J(this.long0 + v * (1 - y / 6 * (1 + 2 * g + m - y / 20 * (5 + 28 * g + 24 * _ + 8 * m * g + 6 * m - y / 42 * (61 + 662 * g + 1320 * _ + 720 * _ * g)))) / f, this.over);
	} else r = G * Da(o), i = 0;
	return e.x = i, e.y = r, e;
}
var Ds = {
	init: ws,
	forward: Ts,
	inverse: Es,
	names: ["Fast_Transverse_Mercator", "Fast Transverse Mercator"]
};
//#endregion
//#region node_modules/proj4/lib/common/sinh.js
function Os(e) {
	var t = Math.exp(e);
	return t = (t - 1 / t) / 2, t;
}
//#endregion
//#region node_modules/proj4/lib/common/hypot.js
function ks(e, t) {
	e = Math.abs(e), t = Math.abs(t);
	var n = Math.max(e, t), r = Math.min(e, t) / (n || 1);
	return n * Math.sqrt(1 + r ** 2);
}
//#endregion
//#region node_modules/proj4/lib/common/log1py.js
function As(e) {
	var t = 1 + e, n = t - 1;
	return n === 0 ? e : e * Math.log(t) / n;
}
//#endregion
//#region node_modules/proj4/lib/common/asinhy.js
function js(e) {
	var t = Math.abs(e);
	return t = As(t * (1 + t / (ks(1, t) + 1))), e < 0 ? -t : t;
}
//#endregion
//#region node_modules/proj4/lib/common/gatg.js
function Ms(e, t) {
	for (var n = 2 * Math.cos(2 * t), r = e.length - 1, i = e[r], a = 0, o; --r >= 0;) o = -a + n * i + e[r], a = i, i = o;
	return t + o * Math.sin(2 * t);
}
//#endregion
//#region node_modules/proj4/lib/common/clens.js
function Ns(e, t) {
	for (var n = 2 * Math.cos(t), r = e.length - 1, i = e[r], a = 0, o; --r >= 0;) o = -a + n * i + e[r], a = i, i = o;
	return Math.sin(t) * o;
}
//#endregion
//#region node_modules/proj4/lib/common/cosh.js
function Ps(e) {
	var t = Math.exp(e);
	return t = (t + 1 / t) / 2, t;
}
//#endregion
//#region node_modules/proj4/lib/common/clens_cmplx.js
function Fs(e, t, n) {
	for (var r = Math.sin(t), i = Math.cos(t), a = Os(n), o = Ps(n), s = 2 * i * o, c = -2 * r * a, l = e.length - 1, u = e[l], d = 0, f = 0, p = 0, m, h; --l >= 0;) m = f, h = d, f = u, d = p, u = -m + s * f - c * d + e[l], p = -h + c * f + s * d;
	return s = r * o, c = i * a, [s * u - c * p, s * p + c * u];
}
//#endregion
//#region node_modules/proj4/lib/projections/etmerc.js
function Is() {
	if (!this.approx && (isNaN(this.es) || this.es <= 0)) throw Error("Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION[\"Fast_Transverse_Mercator\"] in the WKT.");
	this.approx && (Ds.init.apply(this), this.forward = Ds.forward, this.inverse = Ds.inverse), this.x0 = this.x0 === void 0 ? 0 : this.x0, this.y0 = this.y0 === void 0 ? 0 : this.y0, this.long0 = this.long0 === void 0 ? 0 : this.long0, this.lat0 = this.lat0 === void 0 ? 0 : this.lat0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
	var e = this.es / (1 + Math.sqrt(1 - this.es)), t = e / (2 - e), n = t;
	this.cgb[0] = t * (2 + t * (-2 / 3 + t * (-2 + t * (116 / 45 + t * (26 / 45 + -2854 / 675 * t))))), this.cbg[0] = t * (-2 + t * (2 / 3 + t * (4 / 3 + t * (-82 / 45 + t * (32 / 45 + 4642 / 4725 * t))))), n *= t, this.cgb[1] = n * (7 / 3 + t * (-8 / 5 + t * (-227 / 45 + t * (2704 / 315 + 2323 / 945 * t)))), this.cbg[1] = n * (5 / 3 + t * (-16 / 15 + t * (-13 / 9 + t * (904 / 315 + -1522 / 945 * t)))), n *= t, this.cgb[2] = n * (56 / 15 + t * (-136 / 35 + t * (-1262 / 105 + 73814 / 2835 * t))), this.cbg[2] = n * (-26 / 15 + t * (34 / 21 + t * (8 / 5 + -12686 / 2835 * t))), n *= t, this.cgb[3] = n * (4279 / 630 + t * (-332 / 35 + -399572 / 14175 * t)), this.cbg[3] = n * (1237 / 630 + t * (-12 / 5 + -24832 / 14175 * t)), n *= t, this.cgb[4] = n * (4174 / 315 + -144838 / 6237 * t), this.cbg[4] = n * (-734 / 315 + 109598 / 31185 * t), n *= t, this.cgb[5] = 601676 / 22275 * n, this.cbg[5] = 444337 / 155925 * n, n = t ** 2, this.Qn = this.k0 / (1 + t) * (1 + n * (1 / 4 + n * (1 / 64 + n / 256))), this.utg[0] = t * (-.5 + t * (2 / 3 + t * (-37 / 96 + t * (1 / 360 + t * (81 / 512 + -96199 / 604800 * t))))), this.gtu[0] = t * (.5 + t * (-2 / 3 + t * (5 / 16 + t * (41 / 180 + t * (-127 / 288 + 7891 / 37800 * t))))), this.utg[1] = n * (-1 / 48 + t * (-1 / 15 + t * (437 / 1440 + t * (-46 / 105 + 1118711 / 3870720 * t)))), this.gtu[1] = n * (13 / 48 + t * (-3 / 5 + t * (557 / 1440 + t * (281 / 630 + -1983433 / 1935360 * t)))), n *= t, this.utg[2] = n * (-17 / 480 + t * (37 / 840 + t * (209 / 4480 + -5569 / 90720 * t))), this.gtu[2] = n * (61 / 240 + t * (-103 / 140 + t * (15061 / 26880 + 167603 / 181440 * t))), n *= t, this.utg[3] = n * (-4397 / 161280 + t * (11 / 504 + 830251 / 7257600 * t)), this.gtu[3] = n * (49561 / 161280 + t * (-179 / 168 + 6601661 / 7257600 * t)), n *= t, this.utg[4] = n * (-4583 / 161280 + 108847 / 3991680 * t), this.gtu[4] = n * (34729 / 80640 + -3418889 / 1995840 * t), n *= t, this.utg[5] = -20648693 / 638668800 * n, this.gtu[5] = 212378941 / 319334400 * n;
	var r = Ms(this.cbg, this.lat0);
	this.Zb = -this.Qn * (r + Ns(this.gtu, 2 * r));
}
function Ls(e) {
	var t = J(e.x - this.long0, this.over), n = e.y;
	n = Ms(this.cbg, n);
	var r = Math.sin(n), i = Math.cos(n), a = Math.sin(t), o = Math.cos(t);
	n = Math.atan2(r, o * i), t = Math.atan2(a * i, ks(r, i * o)), t = js(Math.tan(t));
	var s = Fs(this.gtu, 2 * n, 2 * t);
	n += s[0], t += s[1];
	var c, l;
	return Math.abs(t) <= 2.623395162778 ? (c = this.a * (this.Qn * t) + this.x0, l = this.a * (this.Qn * n + this.Zb) + this.y0) : (c = Infinity, l = Infinity), e.x = c, e.y = l, e;
}
function Rs(e) {
	var t = (e.x - this.x0) * (1 / this.a), n = (e.y - this.y0) * (1 / this.a);
	n = (n - this.Zb) / this.Qn, t /= this.Qn;
	var r, i;
	if (Math.abs(t) <= 2.623395162778) {
		var a = Fs(this.utg, 2 * n, 2 * t);
		n += a[0], t += a[1], t = Math.atan(Os(t));
		var o = Math.sin(n), s = Math.cos(n), c = Math.sin(t), l = Math.cos(t);
		n = Math.atan2(o * l, ks(c, l * s)), t = Math.atan2(c, l * s), r = J(t + this.long0, this.over), i = Ms(this.cgb, n);
	} else r = Infinity, i = Infinity;
	return e.x = r, e.y = i, e;
}
var zs = {
	init: Is,
	forward: Ls,
	inverse: Rs,
	names: [
		"Extended_Transverse_Mercator",
		"Extended Transverse Mercator",
		"etmerc",
		"Transverse_Mercator",
		"Transverse Mercator",
		"Gauss Kruger",
		"Gauss_Kruger",
		"tmerc"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/adjust_zone.js
function Bs(e, t) {
	if (e === void 0) {
		if (e = Math.floor((J(t) + Math.PI) * 30 / Math.PI) + 1, e < 0) return 0;
		if (e > 60) return 60;
	}
	return e;
}
//#endregion
//#region node_modules/proj4/lib/projections/utm.js
var Vs = "etmerc";
function Hs() {
	var e = Bs(this.zone, this.long0);
	if (e === void 0) throw Error("unknown utm zone");
	this.lat0 = 0, this.long0 = (6 * Math.abs(e) - 183) * K, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, zs.init.apply(this), this.forward = zs.forward, this.inverse = zs.inverse;
}
var Us = {
	init: Hs,
	names: ["Universal Transverse Mercator System", "utm"],
	dependsOn: Vs
};
//#endregion
//#region node_modules/proj4/lib/common/srat.js
function Ws(e, t) {
	return ((1 - e) / (1 + e)) ** t;
}
//#endregion
//#region node_modules/proj4/lib/projections/gauss.js
var Gs = 20;
function Ks() {
	var e = Math.sin(this.lat0), t = Math.cos(this.lat0);
	t *= t, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * e * e), this.C = Math.sqrt(1 + this.es * t * t / (1 - this.es)), this.phic0 = Math.asin(e / this.C), this.ratexp = .5 * this.C * this.e, this.K = Math.tan(.5 * this.phic0 + q) / (Math.tan(.5 * this.lat0 + q) ** +this.C * Ws(this.e * e, this.ratexp));
}
function qs(e) {
	var t = e.x, n = e.y;
	return e.y = 2 * Math.atan(this.K * Math.tan(.5 * n + q) ** +this.C * Ws(this.e * Math.sin(n), this.ratexp)) - G, e.x = this.C * t, e;
}
function Js(e) {
	for (var t = 1e-14, n = e.x / this.C, r = e.y, i = (Math.tan(.5 * r + q) / this.K) ** (1 / this.C), a = Gs; a > 0 && (r = 2 * Math.atan(i * Ws(this.e * Math.sin(e.y), -.5 * this.e)) - G, !(Math.abs(r - e.y) < t)); --a) e.y = r;
	return a ? (e.x = n, e.y = r, e) : null;
}
var Ys = {
	init: Ks,
	forward: qs,
	inverse: Js,
	names: ["gauss"]
};
//#endregion
//#region node_modules/proj4/lib/projections/sterea.js
function Xs() {
	Ys.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title ||= "Oblique Stereographic Alternative");
}
function Zs(e) {
	var t, n, r, i;
	return e.x = J(e.x - this.long0, this.over), Ys.forward.apply(this, [e]), t = Math.sin(e.y), n = Math.cos(e.y), r = Math.cos(e.x), i = this.k0 * this.R2 / (1 + this.sinc0 * t + this.cosc0 * n * r), e.x = i * n * Math.sin(e.x), e.y = i * (this.cosc0 * t - this.sinc0 * n * r), e.x = this.a * e.x + this.x0, e.y = this.a * e.y + this.y0, e;
}
function Qs(e) {
	var t, n, r, i, a;
	if (e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, e.x /= this.k0, e.y /= this.k0, a = ks(e.x, e.y)) {
		var o = 2 * Math.atan2(a, this.R2);
		t = Math.sin(o), n = Math.cos(o), i = Math.asin(n * this.sinc0 + e.y * t * this.cosc0 / a), r = Math.atan2(e.x * t, a * this.cosc0 * n - e.y * this.sinc0 * t);
	} else i = this.phic0, r = 0;
	return e.x = r, e.y = i, Ys.inverse.apply(this, [e]), e.x = J(e.x + this.long0, this.over), e;
}
var $s = {
	init: Xs,
	forward: Zs,
	inverse: Qs,
	names: [
		"Stereographic_North_Pole",
		"Oblique_Stereographic",
		"sterea",
		"Oblique Stereographic Alternative",
		"Double_Stereographic"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/stere.js
function ec(e, t, n) {
	return t *= n, Math.tan(.5 * (G + e)) * ((1 - t) / (1 + t)) ** (.5 * n);
}
function tc() {
	this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= 1e-10 && (this.k0 = .5 * (1 + Da(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= 1e-10 && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt((1 + this.e) ** +(1 + this.e) * (1 - this.e) ** (1 - this.e)), this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= 1e-10 && Math.abs(Math.cos(this.lat_ts)) > 1e-10 && (this.k0 = .5 * this.cons * Ea(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / Oa(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = Ea(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(ec(this.lat0, this.sinlat0, this.e)) - G, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0));
}
function nc(e) {
	var t = e.x, n = e.y, r = Math.sin(n), i = Math.cos(n), a, o, s, c, l, u, d = J(t - this.long0, this.over);
	return Math.abs(Math.abs(t - this.long0) - Math.PI) <= 1e-10 && Math.abs(n + this.lat0) <= 1e-10 ? (e.x = NaN, e.y = NaN, e) : this.sphere ? (a = 2 * this.k0 / (1 + this.sinlat0 * r + this.coslat0 * i * Math.cos(d)), e.x = this.a * a * i * Math.sin(d) + this.x0, e.y = this.a * a * (this.coslat0 * r - this.sinlat0 * i * Math.cos(d)) + this.y0, e) : (o = 2 * Math.atan(ec(n, r, this.e)) - G, c = Math.cos(o), s = Math.sin(o), Math.abs(this.coslat0) <= 1e-10 ? (l = Oa(this.e, n * this.con, this.con * r), u = 2 * this.a * this.k0 * l / this.cons, e.x = this.x0 + u * Math.sin(t - this.long0), e.y = this.y0 - this.con * u * Math.cos(t - this.long0), e) : (Math.abs(this.sinlat0) < 1e-10 ? (a = 2 * this.a * this.k0 / (1 + c * Math.cos(d)), e.y = a * s) : (a = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * s + this.cosX0 * c * Math.cos(d))), e.y = a * (this.cosX0 * s - this.sinX0 * c * Math.cos(d)) + this.y0), e.x = a * c * Math.sin(d) + this.x0, e));
}
function rc(e) {
	e.x -= this.x0, e.y -= this.y0;
	var t, n, r, i, a, o = Math.sqrt(e.x * e.x + e.y * e.y);
	if (this.sphere) {
		var s = 2 * Math.atan(o / (2 * this.a * this.k0));
		return t = this.long0, n = this.lat0, o <= 1e-10 ? (e.x = t, e.y = n, e) : (n = Math.asin(Math.cos(s) * this.sinlat0 + e.y * Math.sin(s) * this.coslat0 / o), t = Math.abs(this.coslat0) < 1e-10 ? this.lat0 > 0 ? J(this.long0 + Math.atan2(e.x, -1 * e.y), this.over) : J(this.long0 + Math.atan2(e.x, e.y), this.over) : J(this.long0 + Math.atan2(e.x * Math.sin(s), o * this.coslat0 * Math.cos(s) - e.y * this.sinlat0 * Math.sin(s)), this.over), e.x = t, e.y = n, e);
	} else if (Math.abs(this.coslat0) <= 1e-10) {
		if (o <= 1e-10) return n = this.lat0, t = this.long0, e.x = t, e.y = n, e;
		e.x *= this.con, e.y *= this.con, r = o * this.cons / (2 * this.a * this.k0), n = this.con * ka(this.e, r), t = this.con * J(this.con * this.long0 + Math.atan2(e.x, -1 * e.y), this.over);
	} else i = 2 * Math.atan(o * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), t = this.long0, o <= 1e-10 ? a = this.X0 : (a = Math.asin(Math.cos(i) * this.sinX0 + e.y * Math.sin(i) * this.cosX0 / o), t = J(this.long0 + Math.atan2(e.x * Math.sin(i), o * this.cosX0 * Math.cos(i) - e.y * this.sinX0 * Math.sin(i)), this.over)), n = -1 * ka(this.e, Math.tan(.5 * (G + a)));
	return e.x = t, e.y = n, e;
}
var ic = {
	init: tc,
	forward: nc,
	inverse: rc,
	names: [
		"stere",
		"Stereographic_South_Pole",
		"Polar_Stereographic_variant_A",
		"Polar_Stereographic_variant_B",
		"Polar_Stereographic"
	],
	ssfn_: ec
};
//#endregion
//#region node_modules/proj4/lib/projections/somerc.js
function ac() {
	var e = this.lat0;
	this.lambda0 = this.long0;
	var t = Math.sin(e), n = this.a, r = 1 / this.rf, i = 2 * r - r ** 2, a = this.e = Math.sqrt(i);
	this.R = this.k0 * n * Math.sqrt(1 - i) / (1 - i * t ** 2), this.alpha = Math.sqrt(1 + i / (1 - i) * Math.cos(e) ** 4), this.b0 = Math.asin(t / this.alpha);
	var o = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)), s = Math.log(Math.tan(Math.PI / 4 + e / 2)), c = Math.log((1 + a * t) / (1 - a * t));
	this.K = o - this.alpha * s + this.alpha * a / 2 * c;
}
function oc(e) {
	var t = Math.log(Math.tan(Math.PI / 4 - e.y / 2)), n = this.e / 2 * Math.log((1 + this.e * Math.sin(e.y)) / (1 - this.e * Math.sin(e.y))), r = -this.alpha * (t + n) + this.K, i = 2 * (Math.atan(Math.exp(r)) - Math.PI / 4), a = this.alpha * (e.x - this.lambda0), o = Math.atan(Math.sin(a) / (Math.sin(this.b0) * Math.tan(i) + Math.cos(this.b0) * Math.cos(a))), s = Math.asin(Math.cos(this.b0) * Math.sin(i) - Math.sin(this.b0) * Math.cos(i) * Math.cos(a));
	return e.y = this.R / 2 * Math.log((1 + Math.sin(s)) / (1 - Math.sin(s))) + this.y0, e.x = this.R * o + this.x0, e;
}
function sc(e) {
	for (var t = e.x - this.x0, n = e.y - this.y0, r = t / this.R, i = 2 * (Math.atan(Math.exp(n / this.R)) - Math.PI / 4), a = Math.asin(Math.cos(this.b0) * Math.sin(i) + Math.sin(this.b0) * Math.cos(i) * Math.cos(r)), o = Math.atan(Math.sin(r) / (Math.cos(this.b0) * Math.cos(r) - Math.sin(this.b0) * Math.tan(i))), s = this.lambda0 + o / this.alpha, c = 0, l = a, u = -1e3, d = 0; Math.abs(l - u) > 1e-7;) {
		if (++d > 20) return;
		c = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + a / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(l)) / 2)), u = l, l = 2 * Math.atan(Math.exp(c)) - Math.PI / 2;
	}
	return e.x = s, e.y = l, e;
}
var cc = {
	init: ac,
	forward: oc,
	inverse: sc,
	names: ["somerc"]
}, lc = 1e-7;
function uc(e) {
	var t = [
		"Hotine_Oblique_Mercator",
		"Hotine_Oblique_Mercator_variant_A",
		"Hotine_Oblique_Mercator_Azimuth_Natural_Origin"
	], n = typeof e.projName == "object" ? Object.keys(e.projName)[0] : e.projName;
	return "no_uoff" in e || "no_off" in e || t.indexOf(n) !== -1 || t.indexOf(Va(n)) !== -1;
}
function dc() {
	var e, t, n, r, i, a, o, s, c, l, u = 0, d, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0;
	this.no_off = uc(this), this.no_rot = "no_rot" in this;
	var v = !1;
	"alpha" in this && (v = !0);
	var y = !1;
	if ("rectified_grid_angle" in this && (y = !0), v && (_ = this.alpha), y && (u = this.rectified_grid_angle), v || y) f = this.longc;
	else if (p = this.long1, h = this.lat1, m = this.long2, g = this.lat2, Math.abs(h - g) <= lc || (e = Math.abs(h)) <= lc || Math.abs(e - G) <= lc || Math.abs(Math.abs(this.lat0) - G) <= lc || Math.abs(Math.abs(g) - G) <= lc) throw Error();
	var b = 1 - this.es;
	t = Math.sqrt(b), Math.abs(this.lat0) > 1e-10 ? (s = Math.sin(this.lat0), n = Math.cos(this.lat0), e = 1 - this.es * s * s, this.B = n * n, this.B = Math.sqrt(1 + this.es * this.B * this.B / b), this.A = this.B * this.k0 * t / e, r = this.B * t / (n * Math.sqrt(e)), i = r * r - 1, i <= 0 ? i = 0 : (i = Math.sqrt(i), this.lat0 < 0 && (i = -i)), this.E = i += r, this.E *= Oa(this.e, this.lat0, s) ** +this.B) : (this.B = 1 / t, this.A = this.k0, this.E = r = i = 1), v || y ? (v ? (d = Math.asin(Math.sin(_) / r), y || (u = _)) : (d = u, _ = Math.asin(r * Math.sin(d))), this.lam0 = f - Math.asin(.5 * (i - 1 / i) * Math.tan(d)) / this.B) : (a = Oa(this.e, h, Math.sin(h)) ** +this.B, o = Oa(this.e, g, Math.sin(g)) ** +this.B, i = this.E / a, c = (o - a) / (o + a), l = this.E * this.E, l = (l - o * a) / (l + o * a), e = p - m, e < -Math.PI ? m -= ki : e > Math.PI && (m += ki), this.lam0 = J(.5 * (p + m) - Math.atan(l * Math.tan(.5 * this.B * (p - m)) / c) / this.B, this.over), d = Math.atan(2 * Math.sin(this.B * J(p - this.lam0, this.over)) / (i - 1 / i)), u = _ = Math.asin(r * Math.sin(d))), this.singam = Math.sin(d), this.cosgam = Math.cos(d), this.sinrot = Math.sin(u), this.cosrot = Math.cos(u), this.rB = 1 / this.B, this.ArB = this.A * this.rB, this.BrA = 1 / this.ArB, this.no_off ? this.u_0 = 0 : (this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(r * r - 1) / Math.cos(_))), this.lat0 < 0 && (this.u_0 = -this.u_0)), i = .5 * d, this.v_pole_n = this.ArB * Math.log(Math.tan(q - i)), this.v_pole_s = this.ArB * Math.log(Math.tan(q + i));
}
function fc(e) {
	var t = {}, n, r, i, a, o, s, c, l;
	if (e.x -= this.lam0, Math.abs(Math.abs(e.y) - G) > 1e-10) {
		if (o = this.E / Oa(this.e, e.y, Math.sin(e.y)) ** +this.B, s = 1 / o, n = .5 * (o - s), r = .5 * (o + s), a = Math.sin(this.B * e.x), i = (n * this.singam - a * this.cosgam) / r, Math.abs(Math.abs(i) - 1) < 1e-10) throw Error();
		l = .5 * this.ArB * Math.log((1 - i) / (1 + i)), s = Math.cos(this.B * e.x), c = Math.abs(s) < lc ? this.A * e.x : this.ArB * Math.atan2(n * this.cosgam + a * this.singam, s);
	} else l = e.y > 0 ? this.v_pole_n : this.v_pole_s, c = this.ArB * e.y;
	return this.no_rot ? (t.x = c, t.y = l) : (c -= this.u_0, t.x = l * this.cosrot + c * this.sinrot, t.y = c * this.cosrot - l * this.sinrot), t.x = this.a * t.x + this.x0, t.y = this.a * t.y + this.y0, t;
}
function pc(e) {
	var t, n, r, i, a, o, s, c = {};
	if (e.x = (e.x - this.x0) * (1 / this.a), e.y = (e.y - this.y0) * (1 / this.a), this.no_rot ? (n = e.y, t = e.x) : (n = e.x * this.cosrot - e.y * this.sinrot, t = e.y * this.cosrot + e.x * this.sinrot + this.u_0), r = Math.exp(-this.BrA * n), i = .5 * (r - 1 / r), a = .5 * (r + 1 / r), o = Math.sin(this.BrA * t), s = (o * this.cosgam + i * this.singam) / a, Math.abs(Math.abs(s) - 1) < 1e-10) c.x = 0, c.y = s < 0 ? -G : G;
	else {
		if (c.y = this.E / Math.sqrt((1 + s) / (1 - s)), c.y = ka(this.e, c.y ** (1 / this.B)), c.y === Infinity) throw Error();
		c.x = -this.rB * Math.atan2(i * this.cosgam - o * this.singam, Math.cos(this.BrA * t));
	}
	return c.x += this.lam0, c;
}
var mc = {
	init: dc,
	forward: fc,
	inverse: pc,
	names: [
		"Hotine_Oblique_Mercator",
		"Hotine Oblique Mercator",
		"Hotine_Oblique_Mercator_variant_A",
		"Hotine_Oblique_Mercator_Variant_B",
		"Hotine_Oblique_Mercator_Azimuth_Natural_Origin",
		"Hotine_Oblique_Mercator_Two_Point_Natural_Origin",
		"Hotine_Oblique_Mercator_Azimuth_Center",
		"Oblique_Mercator",
		"omerc"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/lcc.js
function hc() {
	if (this.lat2 ||= this.lat1, this.k0 ||= 1, this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < 1e-10)) {
		var e = this.b / this.a;
		this.e = Math.sqrt(1 - e * e);
		var t = Math.sin(this.lat1), n = Math.cos(this.lat1), r = Ea(this.e, t, n), i = Oa(this.e, this.lat1, t), a = Math.sin(this.lat2), o = Math.cos(this.lat2), s = Ea(this.e, a, o), c = Oa(this.e, this.lat2, a), l = Math.abs(Math.abs(this.lat0) - G) < 1e-10 ? 0 : Oa(this.e, this.lat0, Math.sin(this.lat0));
		Math.abs(this.lat1 - this.lat2) > 1e-10 ? this.ns = Math.log(r / s) / Math.log(i / c) : this.ns = t, isNaN(this.ns) && (this.ns = t), this.f0 = r / (this.ns * i ** +this.ns), this.rh = this.a * this.f0 * l ** +this.ns, this.title ||= "Lambert Conformal Conic";
	}
}
function gc(e) {
	var t = e.x, n = e.y;
	Math.abs(2 * Math.abs(n) - Math.PI) <= 1e-10 && (n = Da(n) * (G - 2 * Di));
	var r = Math.abs(Math.abs(n) - G), i, a;
	if (r > 1e-10) i = Oa(this.e, n, Math.sin(n)), a = this.a * this.f0 * i ** +this.ns;
	else {
		if (r = n * this.ns, r <= 0) return null;
		a = 0;
	}
	var o = this.ns * J(t - this.long0, this.over);
	return e.x = this.k0 * (a * Math.sin(o)) + this.x0, e.y = this.k0 * (this.rh - a * Math.cos(o)) + this.y0, e;
}
function _c(e) {
	var t, n, r, i, a, o = (e.x - this.x0) / this.k0, s = this.rh - (e.y - this.y0) / this.k0;
	this.ns > 0 ? (t = Math.sqrt(o * o + s * s), n = 1) : (t = -Math.sqrt(o * o + s * s), n = -1);
	var c = 0;
	if (t !== 0 && (c = Math.atan2(n * o, n * s)), t !== 0 || this.ns > 0) {
		if (n = 1 / this.ns, r = (t / (this.a * this.f0)) ** +n, i = ka(this.e, r), i === -9999) return null;
	} else i = -G;
	return a = J(c / this.ns + this.long0, this.over), e.x = a, e.y = i, e;
}
var vc = {
	init: hc,
	forward: gc,
	inverse: _c,
	names: [
		"Lambert Tangential Conformal Conic Projection",
		"Lambert_Conformal_Conic",
		"Lambert_Conformal_Conic_1SP",
		"Lambert_Conformal_Conic_2SP",
		"lcc",
		"Lambert Conic Conformal (1SP)",
		"Lambert Conic Conformal (2SP)"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/krovak.js
function yc() {
	this.a = 6377397.155, this.es = .006674372230614, this.e = Math.sqrt(this.es), this.lat0 ||= .863937979737193, this.long0 ||= .4334234309119251, this.k0 ||= .9999, this.s45 = .785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.cos(this.fi0) ** 4 / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = ((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0))) ** (this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.tan(this.fi0 / 2 + this.s45) ** +this.alfa * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.sin(this.fi0) ** 2), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq;
}
function bc(e) {
	var t, n, r, i, a, o, s, c = e.x, l = e.y, u = J(c - this.long0, this.over);
	return t = ((1 + this.e * Math.sin(l)) / (1 - this.e * Math.sin(l))) ** (this.alfa * this.e / 2), n = 2 * (Math.atan(this.k * Math.tan(l / 2 + this.s45) ** +this.alfa / t) - this.s45), r = -u * this.alfa, i = Math.asin(Math.cos(this.ad) * Math.sin(n) + Math.sin(this.ad) * Math.cos(n) * Math.cos(r)), a = Math.asin(Math.cos(n) * Math.sin(r) / Math.cos(i)), o = this.n * a, s = this.ro0 * Math.tan(this.s0 / 2 + this.s45) ** +this.n / Math.tan(i / 2 + this.s45) ** +this.n, e.y = s * Math.cos(o) / 1, e.x = s * Math.sin(o) / 1, this.czech || (e.y *= -1, e.x *= -1), e;
}
function xc(e) {
	var t, n, r, i, a, o, s, c, l = e.x;
	e.x = e.y, e.y = l, this.czech || (e.y *= -1, e.x *= -1), o = Math.sqrt(e.x * e.x + e.y * e.y), a = Math.atan2(e.y, e.x), i = a / Math.sin(this.s0), r = 2 * (Math.atan((this.ro0 / o) ** (1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), t = Math.asin(Math.cos(this.ad) * Math.sin(r) - Math.sin(this.ad) * Math.cos(r) * Math.cos(i)), n = Math.asin(Math.cos(r) * Math.sin(i) / Math.cos(t)), e.x = this.long0 - n / this.alfa, s = t, c = 0;
	var u = 0;
	do
		e.y = 2 * (Math.atan(this.k ** (-1 / this.alfa) * Math.tan(t / 2 + this.s45) ** (1 / this.alfa) * ((1 + this.e * Math.sin(s)) / (1 - this.e * Math.sin(s))) ** (this.e / 2)) - this.s45), Math.abs(s - e.y) < 1e-10 && (c = 1), s = e.y, u += 1;
	while (c === 0 && u < 15);
	return u >= 15 ? null : e;
}
var Sc = {
	init: yc,
	forward: bc,
	inverse: xc,
	names: [
		"Krovak",
		"Krovak Modified",
		"Krovak (North Orientated)",
		"Krovak Modified (North Orientated)",
		"krovak"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/mlfn.js
function Cc(e, t, n, r, i) {
	return e * i - t * Math.sin(2 * i) + n * Math.sin(4 * i) - r * Math.sin(6 * i);
}
//#endregion
//#region node_modules/proj4/lib/common/e0fn.js
function wc(e) {
	return 1 - .25 * e * (1 + e / 16 * (3 + 1.25 * e));
}
//#endregion
//#region node_modules/proj4/lib/common/e1fn.js
function Tc(e) {
	return .375 * e * (1 + .25 * e * (1 + .46875 * e));
}
//#endregion
//#region node_modules/proj4/lib/common/e2fn.js
function Ec(e) {
	return .05859375 * e * e * (1 + .75 * e);
}
//#endregion
//#region node_modules/proj4/lib/common/e3fn.js
function Dc(e) {
	return e * e * e * (35 / 3072);
}
//#endregion
//#region node_modules/proj4/lib/common/gN.js
function Oc(e, t, n) {
	var r = t * n;
	return e / Math.sqrt(1 - r * r);
}
//#endregion
//#region node_modules/proj4/lib/common/adjust_lat.js
function kc(e) {
	return Math.abs(e) < G ? e : e - Da(e) * Math.PI;
}
//#endregion
//#region node_modules/proj4/lib/common/imlfn.js
function Ac(e, t, n, r, i) {
	for (var a = e / t, o, s = 0; s < 15; s++) if (o = (e - (t * a - n * Math.sin(2 * a) + r * Math.sin(4 * a) - i * Math.sin(6 * a))) / (t - 2 * n * Math.cos(2 * a) + 4 * r * Math.cos(4 * a) - 6 * i * Math.cos(6 * a)), a += o, Math.abs(o) <= 1e-10) return a;
	return NaN;
}
//#endregion
//#region node_modules/proj4/lib/projections/cass.js
function jc() {
	this.sphere || (this.e0 = wc(this.es), this.e1 = Tc(this.es), this.e2 = Ec(this.es), this.e3 = Dc(this.es), this.ml0 = this.a * Cc(this.e0, this.e1, this.e2, this.e3, this.lat0));
}
function Mc(e) {
	var t, n, r = e.x, i = e.y;
	if (r = J(r - this.long0, this.over), this.sphere) t = this.a * Math.asin(Math.cos(i) * Math.sin(r)), n = this.a * (Math.atan2(Math.tan(i), Math.cos(r)) - this.lat0);
	else {
		var a = Math.sin(i), o = Math.cos(i), s = Oc(this.a, this.e, a), c = Math.tan(i) * Math.tan(i), l = r * Math.cos(i), u = l * l, d = this.es * o * o / (1 - this.es), f = this.a * Cc(this.e0, this.e1, this.e2, this.e3, i);
		t = s * l * (1 - u * c * (1 / 6 - (8 - c + 8 * d) * u / 120)), n = f - this.ml0 + s * a / o * u * (.5 + (5 - c + 6 * d) * u / 24);
	}
	return e.x = t + this.x0, e.y = n + this.y0, e;
}
function Nc(e) {
	e.x -= this.x0, e.y -= this.y0;
	var t = e.x / this.a, n = e.y / this.a, r, i;
	if (this.sphere) {
		var a = n + this.lat0;
		r = Math.asin(Math.sin(a) * Math.cos(t)), i = Math.atan2(Math.tan(t), Math.cos(a));
	} else {
		var o = Ac(this.ml0 / this.a + n, this.e0, this.e1, this.e2, this.e3);
		if (Math.abs(Math.abs(o) - G) <= 1e-10) return e.x = this.long0, e.y = G, n < 0 && (e.y *= -1), e;
		var s = Oc(this.a, this.e, Math.sin(o)), c = s * s * s / this.a / this.a * (1 - this.es), l = Math.tan(o) ** 2, u = t * this.a / s, d = u * u;
		r = o - s * Math.tan(o) / c * u * u * (.5 - (1 + 3 * l) * u * u / 24), i = u * (1 - d * (l / 3 + (1 + 3 * l) * l * d / 15)) / Math.cos(o);
	}
	return e.x = J(i + this.long0, this.over), e.y = kc(r), e;
}
var Pc = {
	init: jc,
	forward: Mc,
	inverse: Nc,
	names: [
		"Cassini",
		"Cassini_Soldner",
		"cass"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/qsfnz.js
function Fc(e, t) {
	var n;
	return e > 1e-7 ? (n = e * t, (1 - e * e) * (t / (1 - n * n) - .5 / e * Math.log((1 - n) / (1 + n)))) : 2 * t;
}
function Ic() {
	var e = Math.abs(this.lat0);
	if (Math.abs(e - G) < 1e-10 ? this.mode = this.lat0 < 0 ? 1 : 2 : Math.abs(e) < 1e-10 ? this.mode = 3 : this.mode = 4, this.es > 0) {
		var t;
		switch (this.qp = Fc(this.e, 1), this.mmf = .5 / (1 - this.es), this.apa = Gc(this.es), this.mode) {
			case 2:
				this.dd = 1;
				break;
			case 1:
				this.dd = 1;
				break;
			case 3:
				this.rq = Math.sqrt(.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = .5 * this.qp;
				break;
			case 4:
				this.rq = Math.sqrt(.5 * this.qp), t = Math.sin(this.lat0), this.sinb1 = Fc(this.e, t) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * t * t) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd;
				break;
		}
	} else this.mode === 4 && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0));
}
function Lc(e) {
	var t, n, r, i, a, o, s, c, l, u, d = e.x, f = e.y;
	if (d = J(d - this.long0, this.over), this.sphere) {
		if (a = Math.sin(f), u = Math.cos(f), r = Math.cos(d), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
			if (n = this.mode === this.EQUIT ? 1 + u * r : 1 + this.sinph0 * a + this.cosph0 * u * r, n <= 1e-10) return null;
			n = Math.sqrt(2 / n), t = n * u * Math.sin(d), n *= this.mode === this.EQUIT ? a : this.cosph0 * a - this.sinph0 * u * r;
		} else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
			if (this.mode === this.N_POLE && (r = -r), Math.abs(f + this.lat0) < 1e-10) return null;
			n = q - f * .5, n = 2 * (this.mode === this.S_POLE ? Math.cos(n) : Math.sin(n)), t = n * Math.sin(d), n *= r;
		}
	} else {
		switch (s = 0, c = 0, l = 0, r = Math.cos(d), i = Math.sin(d), a = Math.sin(f), o = Fc(this.e, a), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (s = o / this.qp, c = Math.sqrt(1 - s * s)), this.mode) {
			case this.OBLIQ:
				l = 1 + this.sinb1 * s + this.cosb1 * c * r;
				break;
			case this.EQUIT:
				l = 1 + c * r;
				break;
			case this.N_POLE:
				l = G + f, o = this.qp - o;
				break;
			case this.S_POLE:
				l = f - G, o = this.qp + o;
				break;
		}
		if (Math.abs(l) < 1e-10) return null;
		switch (this.mode) {
			case this.OBLIQ:
			case this.EQUIT:
				l = Math.sqrt(2 / l), n = this.mode === this.OBLIQ ? this.ymf * l * (this.cosb1 * s - this.sinb1 * c * r) : (l = Math.sqrt(2 / (1 + c * r))) * s * this.ymf, t = this.xmf * l * c * i;
				break;
			case this.N_POLE:
			case this.S_POLE:
				o >= 0 ? (t = (l = Math.sqrt(o)) * i, n = r * (this.mode === this.S_POLE ? l : -l)) : t = n = 0;
				break;
		}
	}
	return e.x = this.a * t + this.x0, e.y = this.a * n + this.y0, e;
}
function Rc(e) {
	e.x -= this.x0, e.y -= this.y0;
	var t = e.x / this.a, n = e.y / this.a, r, i, a, o, s, c, l;
	if (this.sphere) {
		var u = 0, d, f = 0;
		if (d = Math.sqrt(t * t + n * n), i = d * .5, i > 1) return null;
		switch (i = 2 * Math.asin(i), (this.mode === this.OBLIQ || this.mode === this.EQUIT) && (f = Math.sin(i), u = Math.cos(i)), this.mode) {
			case this.EQUIT:
				i = Math.abs(d) <= 1e-10 ? 0 : Math.asin(n * f / d), t *= f, n = u * d;
				break;
			case this.OBLIQ:
				i = Math.abs(d) <= 1e-10 ? this.lat0 : Math.asin(u * this.sinph0 + n * f * this.cosph0 / d), t *= f * this.cosph0, n = (u - Math.sin(i) * this.sinph0) * d;
				break;
			case this.N_POLE:
				n = -n, i = G - i;
				break;
			case this.S_POLE:
				i -= G;
				break;
		}
		r = n === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(t, n);
	} else {
		if (l = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
			if (t /= this.dd, n *= this.dd, c = Math.sqrt(t * t + n * n), c < 1e-10) return e.x = this.long0, e.y = this.lat0, e;
			o = 2 * Math.asin(.5 * c / this.rq), a = Math.cos(o), t *= o = Math.sin(o), this.mode === this.OBLIQ ? (l = a * this.sinb1 + n * o * this.cosb1 / c, s = this.qp * l, n = c * this.cosb1 * a - n * this.sinb1 * o) : (l = n * o / c, s = this.qp * l, n = c * a);
		} else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
			if (this.mode === this.N_POLE && (n = -n), s = t * t + n * n, !s) return e.x = this.long0, e.y = this.lat0, e;
			l = 1 - s / this.qp, this.mode === this.S_POLE && (l = -l);
		}
		r = Math.atan2(t, n), i = Kc(Math.asin(l), this.apa);
	}
	return e.x = J(this.long0 + r, this.over), e.y = i, e;
}
var zc = .3333333333333333, Bc = .17222222222222222, Vc = .10257936507936508, Hc = .06388888888888888, Uc = .0664021164021164, Wc = .016415012942191543;
function Gc(e) {
	var t, n = [];
	return n[0] = e * zc, t = e * e, n[0] += t * Bc, n[1] = t * Hc, t *= e, n[0] += t * Vc, n[1] += t * Uc, n[2] = t * Wc, n;
}
function Kc(e, t) {
	var n = e + e;
	return e + t[0] * Math.sin(n) + t[1] * Math.sin(n + n) + t[2] * Math.sin(n + n + n);
}
var qc = {
	init: Ic,
	forward: Lc,
	inverse: Rc,
	names: [
		"Lambert Azimuthal Equal Area",
		"Lambert_Azimuthal_Equal_Area",
		"laea"
	],
	S_POLE: 1,
	N_POLE: 2,
	EQUIT: 3,
	OBLIQ: 4
};
//#endregion
//#region node_modules/proj4/lib/common/asinz.js
function Jc(e) {
	return Math.abs(e) > 1 && (e = e > 1 ? 1 : -1), Math.asin(e);
}
//#endregion
//#region node_modules/proj4/lib/projections/aea.js
function Yc() {
	Math.abs(this.lat1 + this.lat2) < 1e-10 || (this.temp = this.b / this.a, this.es = 1 - this.temp ** 2, this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = Ea(this.e3, this.sin_po, this.cos_po), this.qs1 = Fc(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = Ea(this.e3, this.sin_po, this.cos_po), this.qs2 = Fc(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = Fc(this.e3, this.sin_po), Math.abs(this.lat1 - this.lat2) > 1e-10 ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0);
}
function Xc(e) {
	var t = e.x, n = e.y;
	this.sin_phi = Math.sin(n), this.cos_phi = Math.cos(n);
	var r = Fc(this.e3, this.sin_phi), i = this.a * Math.sqrt(this.c - this.ns0 * r) / this.ns0, a = this.ns0 * J(t - this.long0, this.over), o = i * Math.sin(a) + this.x0, s = this.rh - i * Math.cos(a) + this.y0;
	return e.x = o, e.y = s, e;
}
function Zc(e) {
	var t, n, r, i, a, o;
	return e.x -= this.x0, e.y = this.rh - e.y + this.y0, this.ns0 >= 0 ? (t = Math.sqrt(e.x * e.x + e.y * e.y), r = 1) : (t = -Math.sqrt(e.x * e.x + e.y * e.y), r = -1), i = 0, t !== 0 && (i = Math.atan2(r * e.x, r * e.y)), r = t * this.ns0 / this.a, this.sphere ? o = Math.asin((this.c - r * r) / (2 * this.ns0)) : (n = (this.c - r * r) / this.ns0, o = this.phi1z(this.e3, n)), a = J(i / this.ns0 + this.long0, this.over), e.x = a, e.y = o, e;
}
function Qc(e, t) {
	var n, r, i, a, o, s = Jc(.5 * t);
	if (e < 1e-10) return s;
	for (var c = e * e, l = 1; l <= 25; l++) if (n = Math.sin(s), r = Math.cos(s), i = e * n, a = 1 - i * i, o = .5 * a * a / r * (t / (1 - c) - n / a + .5 / e * Math.log((1 - i) / (1 + i))), s += o, Math.abs(o) <= 1e-7) return s;
	return null;
}
var $c = {
	init: Yc,
	forward: Xc,
	inverse: Zc,
	names: [
		"Albers_Conic_Equal_Area",
		"Albers_Equal_Area",
		"Albers",
		"aea"
	],
	phi1z: Qc
};
//#endregion
//#region node_modules/proj4/lib/projections/gnom.js
function el() {
	this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1;
}
function tl(e) {
	var t, n, r, i, a, o, s, c, l = e.x, u = e.y;
	return r = J(l - this.long0, this.over), t = Math.sin(u), n = Math.cos(u), i = Math.cos(r), o = this.sin_p14 * t + this.cos_p14 * n * i, a = 1, o > 0 || Math.abs(o) <= 1e-10 ? (s = this.x0 + this.a * a * n * Math.sin(r) / o, c = this.y0 + this.a * a * (this.cos_p14 * t - this.sin_p14 * n * i) / o) : (s = this.x0 + this.infinity_dist * n * Math.sin(r), c = this.y0 + this.infinity_dist * (this.cos_p14 * t - this.sin_p14 * n * i)), e.x = s, e.y = c, e;
}
function nl(e) {
	var t, n, r, i, a, o;
	return e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, e.x /= this.k0, e.y /= this.k0, (t = Math.sqrt(e.x * e.x + e.y * e.y)) ? (i = Math.atan2(t, this.rc), n = Math.sin(i), r = Math.cos(i), o = Jc(r * this.sin_p14 + e.y * n * this.cos_p14 / t), a = Math.atan2(e.x * n, t * this.cos_p14 * r - e.y * this.sin_p14 * n), a = J(this.long0 + a, this.over)) : (o = this.phic0, a = 0), e.x = a, e.y = o, e;
}
var rl = {
	init: el,
	forward: tl,
	inverse: nl,
	names: ["gnom"]
};
//#endregion
//#region node_modules/proj4/lib/common/iqsfnz.js
function il(e, t) {
	var n = 1 - (1 - e * e) / (2 * e) * Math.log((1 - e) / (1 + e));
	if (Math.abs(Math.abs(t) - n) < 1e-6) return t < 0 ? -1 * G : G;
	for (var r = Math.asin(.5 * t), i, a, o, s, c = 0; c < 30; c++) if (a = Math.sin(r), o = Math.cos(r), s = e * a, i = (1 - s * s) ** 2 / (2 * o) * (t / (1 - e * e) - a / (1 - s * s) + .5 / e * Math.log((1 - s) / (1 + s))), r += i, Math.abs(i) <= 1e-10) return r;
	return NaN;
}
//#endregion
//#region node_modules/proj4/lib/projections/cea.js
function al() {
	this.sphere || (this.k0 = Ea(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
}
function ol(e) {
	var t = e.x, n = e.y, r, i, a = J(t - this.long0, this.over);
	if (this.sphere) r = this.x0 + this.a * a * Math.cos(this.lat_ts), i = this.y0 + this.a * Math.sin(n) / Math.cos(this.lat_ts);
	else {
		var o = Fc(this.e, Math.sin(n));
		r = this.x0 + this.a * this.k0 * a, i = this.y0 + this.a * o * .5 / this.k0;
	}
	return e.x = r, e.y = i, e;
}
function sl(e) {
	e.x -= this.x0, e.y -= this.y0;
	var t, n;
	return this.sphere ? (t = J(this.long0 + e.x / this.a / Math.cos(this.lat_ts), this.over), n = Math.asin(e.y / this.a * Math.cos(this.lat_ts))) : (n = il(this.e, 2 * e.y * this.k0 / this.a), t = J(this.long0 + e.x / (this.a * this.k0), this.over)), e.x = t, e.y = n, e;
}
var cl = {
	init: al,
	forward: ol,
	inverse: sl,
	names: ["cea"]
};
//#endregion
//#region node_modules/proj4/lib/projections/eqc.js
function ll() {
	this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts);
}
function ul(e) {
	var t = e.x, n = e.y, r = J(t - this.long0, this.over), i = kc(n - this.lat0);
	return e.x = this.x0 + this.a * r * this.rc, e.y = this.y0 + this.a * i, e;
}
function dl(e) {
	var t = e.x, n = e.y;
	return e.x = J(this.long0 + (t - this.x0) / (this.a * this.rc), this.over), e.y = kc(this.lat0 + (n - this.y0) / this.a), e;
}
var fl = {
	init: ll,
	forward: ul,
	inverse: dl,
	names: [
		"Equirectangular",
		"Equidistant_Cylindrical",
		"Equidistant_Cylindrical_Spherical",
		"eqc"
	]
}, pl = 20;
function ml() {
	this.temp = this.b / this.a, this.es = 1 - this.temp ** 2, this.e = Math.sqrt(this.es), this.e0 = wc(this.es), this.e1 = Tc(this.es), this.e2 = Ec(this.es), this.e3 = Dc(this.es), this.ml0 = this.a * Cc(this.e0, this.e1, this.e2, this.e3, this.lat0);
}
function hl(e) {
	var t = e.x, n = e.y, r, i, a, o = J(t - this.long0, this.over);
	if (a = o * Math.sin(n), this.sphere) Math.abs(n) <= 1e-10 ? (r = this.a * o, i = -1 * this.a * this.lat0) : (r = this.a * Math.sin(a) / Math.tan(n), i = this.a * (kc(n - this.lat0) + (1 - Math.cos(a)) / Math.tan(n)));
	else if (Math.abs(n) <= 1e-10) r = this.a * o, i = -1 * this.ml0;
	else {
		var s = Oc(this.a, this.e, Math.sin(n)) / Math.tan(n);
		r = s * Math.sin(a), i = this.a * Cc(this.e0, this.e1, this.e2, this.e3, n) - this.ml0 + s * (1 - Math.cos(a));
	}
	return e.x = r + this.x0, e.y = i + this.y0, e;
}
function gl(e) {
	var t, n, r = e.x - this.x0, i = e.y - this.y0, a, o, s, c, l;
	if (this.sphere) if (Math.abs(i + this.a * this.lat0) <= 1e-10) t = J(r / this.a + this.long0, this.over), n = 0;
	else {
		o = this.lat0 + i / this.a, s = r * r / this.a / this.a + o * o, c = o;
		var u;
		for (a = pl; a; --a) if (u = Math.tan(c), l = -1 * (o * (c * u + 1) - c - .5 * (c * c + s) * u) / ((c - o) / u - 1), c += l, Math.abs(l) <= 1e-10) {
			n = c;
			break;
		}
		t = J(this.long0 + Math.asin(r * Math.tan(c) / this.a) / Math.sin(n), this.over);
	}
	else if (Math.abs(i + this.ml0) <= 1e-10) n = 0, t = J(this.long0 + r / this.a, this.over);
	else {
		o = (this.ml0 + i) / this.a, s = r * r / this.a / this.a + o * o, c = o;
		var d, f, p, m, h;
		for (a = pl; a; --a) if (h = this.e * Math.sin(c), d = Math.sqrt(1 - h * h) * Math.tan(c), f = this.a * Cc(this.e0, this.e1, this.e2, this.e3, c), p = this.e0 - 2 * this.e1 * Math.cos(2 * c) + 4 * this.e2 * Math.cos(4 * c) - 6 * this.e3 * Math.cos(6 * c), m = f / this.a, l = (o * (d * m + 1) - m - .5 * d * (m * m + s)) / (this.es * Math.sin(2 * c) * (m * m + s - 2 * o * m) / (4 * d) + (o - m) * (d * p - 2 / Math.sin(2 * c)) - p), c -= l, Math.abs(l) <= 1e-10) {
			n = c;
			break;
		}
		d = Math.sqrt(1 - this.es * Math.sin(n) ** 2) * Math.tan(n), t = J(this.long0 + Math.asin(r * d / this.a) / Math.sin(n), this.over);
	}
	return e.x = t, e.y = n, e;
}
var _l = {
	init: ml,
	forward: hl,
	inverse: gl,
	names: [
		"Polyconic",
		"American_Polyconic",
		"poly"
	]
};
//#endregion
//#region node_modules/proj4/lib/projections/nzmg.js
function vl() {
	this.A = [], this.A[1] = .6399175073, this.A[2] = -.1358797613, this.A[3] = .063294409, this.A[4] = -.02526853, this.A[5] = .0117879, this.A[6] = -.0055161, this.A[7] = .0026906, this.A[8] = -.001333, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = .7557853228, this.B_im[1] = 0, this.B_re[2] = .249204646, this.B_im[2] = .003371507, this.B_re[3] = -.001541739, this.B_im[3] = .04105856, this.B_re[4] = -.10162907, this.B_im[4] = .01727609, this.B_re[5] = -.26623489, this.B_im[5] = -.36249218, this.B_re[6] = -.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -.577245789, this.C_im[2] = -.007809598, this.C_re[3] = .508307513, this.C_im[3] = -.112208952, this.C_re[4] = -.15094762, this.C_im[4] = .18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = .5185406398, this.D[3] = -.03333098, this.D[4] = -.1052906, this.D[5] = -.0368594, this.D[6] = .007317, this.D[7] = .0122, this.D[8] = .00394, this.D[9] = -.0013;
}
function yl(e) {
	var t, n = e.x, r = e.y - this.lat0, i = n - this.long0, a = r / Ci * 1e-5, o = i, s = 1, c = 0;
	for (t = 1; t <= 10; t++) s *= a, c += this.A[t] * s;
	var l = c, u = o, d = 1, f = 0, p, m, h = 0, g = 0;
	for (t = 1; t <= 6; t++) p = d * l - f * u, m = f * l + d * u, d = p, f = m, h = h + this.B_re[t] * d - this.B_im[t] * f, g = g + this.B_im[t] * d + this.B_re[t] * f;
	return e.x = g * this.a + this.x0, e.y = h * this.a + this.y0, e;
}
function bl(e) {
	var t, n = e.x, r = e.y, i = n - this.x0, a = (r - this.y0) / this.a, o = i / this.a, s = 1, c = 0, l, u, d = 0, f = 0;
	for (t = 1; t <= 6; t++) l = s * a - c * o, u = c * a + s * o, s = l, c = u, d = d + this.C_re[t] * s - this.C_im[t] * c, f = f + this.C_im[t] * s + this.C_re[t] * c;
	for (var p = 0; p < this.iterations; p++) {
		var m = d, h = f, g, _, v = a, y = o;
		for (t = 2; t <= 6; t++) g = m * d - h * f, _ = h * d + m * f, m = g, h = _, v += (t - 1) * (this.B_re[t] * m - this.B_im[t] * h), y += (t - 1) * (this.B_im[t] * m + this.B_re[t] * h);
		m = 1, h = 0;
		var b = this.B_re[1], x = this.B_im[1];
		for (t = 2; t <= 6; t++) g = m * d - h * f, _ = h * d + m * f, m = g, h = _, b += t * (this.B_re[t] * m - this.B_im[t] * h), x += t * (this.B_im[t] * m + this.B_re[t] * h);
		var S = b * b + x * x;
		d = (v * b + y * x) / S, f = (y * b - v * x) / S;
	}
	var C = d, w = f, T = 1, E = 0;
	for (t = 1; t <= 9; t++) T *= C, E += this.D[t] * T;
	var D = this.lat0 + E * Ci * 1e5;
	return e.x = this.long0 + w, e.y = D, e;
}
var xl = {
	init: vl,
	forward: yl,
	inverse: bl,
	names: ["New_Zealand_Map_Grid", "nzmg"]
};
//#endregion
//#region node_modules/proj4/lib/projections/mill.js
function Sl() {}
function Cl(e) {
	var t = e.x, n = e.y, r = J(t - this.long0, this.over), i = this.x0 + this.a * r, a = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + n / 2.5)) * 1.25;
	return e.x = i, e.y = a, e;
}
function wl(e) {
	e.x -= this.x0, e.y -= this.y0;
	var t = J(this.long0 + e.x / this.a, this.over), n = 2.5 * (Math.atan(Math.exp(.8 * e.y / this.a)) - Math.PI / 4);
	return e.x = t, e.y = n, e;
}
var Tl = {
	init: Sl,
	forward: Cl,
	inverse: wl,
	names: ["Miller_Cylindrical", "mill"]
}, El = 20;
function Dl() {
	this.long0 = this.long0 || 0, this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = bs(this.es);
}
function Ol(e) {
	var t, n, r = e.x, i = e.y;
	if (r = J(r - this.long0, this.over), this.sphere) {
		if (!this.m) i = this.n === 1 ? i : Math.asin(this.n * Math.sin(i));
		else for (var a = this.n * Math.sin(i), o = El; o; --o) {
			var s = (this.m * i + Math.sin(i) - a) / (this.m + Math.cos(i));
			if (i -= s, Math.abs(s) < 1e-10) break;
		}
		t = this.a * this.C_x * r * (this.m + Math.cos(i)), n = this.a * this.C_y * i;
	} else {
		var c = Math.sin(i), l = Math.cos(i);
		n = this.a * xs(i, c, l, this.en), t = this.a * r * l / Math.sqrt(1 - this.es * c * c);
	}
	return e.x = t, e.y = n, e;
}
function kl(e) {
	var t, n, r, i;
	return e.x -= this.x0, r = e.x / this.a, e.y -= this.y0, t = e.y / this.a, this.sphere ? (t /= this.C_y, r /= this.C_x * (this.m + Math.cos(t)), this.m ? t = Jc((this.m * t + Math.sin(t)) / this.n) : this.n !== 1 && (t = Jc(Math.sin(t) / this.n)), r = J(r + this.long0, this.over), t = kc(t)) : (t = Cs(e.y / this.a, this.es, this.en), i = Math.abs(t), i < G ? (i = Math.sin(t), n = this.long0 + e.x * Math.sqrt(1 - this.es * i * i) / (this.a * Math.cos(t)), r = J(n, this.over)) : i - 1e-10 < G && (r = this.long0)), e.x = r, e.y = t, e;
}
var Al = {
	init: Dl,
	forward: Ol,
	inverse: kl,
	names: ["Sinusoidal", "sinu"]
};
//#endregion
//#region node_modules/proj4/lib/projections/moll.js
function jl() {
	this.x0 = this.x0 === void 0 ? 0 : this.x0, this.y0 = this.y0 === void 0 ? 0 : this.y0, this.long0 = this.long0 === void 0 ? 0 : this.long0;
}
function Ml(e) {
	for (var t = e.x, n = e.y, r = J(t - this.long0, this.over), i = n, a = Math.PI * Math.sin(n);;) {
		var o = -(i + Math.sin(i) - a) / (1 + Math.cos(i));
		if (i += o, Math.abs(o) < 1e-10) break;
	}
	i /= 2, Math.PI / 2 - Math.abs(n) < 1e-10 && (r = 0);
	var s = .900316316158 * this.a * r * Math.cos(i) + this.x0, c = 1.4142135623731 * this.a * Math.sin(i) + this.y0;
	return e.x = s, e.y = c, e;
}
function Nl(e) {
	var t, n;
	e.x -= this.x0, e.y -= this.y0, n = e.y / (1.4142135623731 * this.a), Math.abs(n) > .999999999999 && (n = .999999999999), t = Math.asin(n);
	var r = J(this.long0 + e.x / (.900316316158 * this.a * Math.cos(t)), this.over);
	r < -Math.PI && (r = -Math.PI), r > Math.PI && (r = Math.PI), n = (2 * t + Math.sin(2 * t)) / Math.PI, Math.abs(n) > 1 && (n = 1);
	var i = Math.asin(n);
	return e.x = r, e.y = i, e;
}
var Pl = {
	init: jl,
	forward: Ml,
	inverse: Nl,
	names: ["Mollweide", "moll"]
};
//#endregion
//#region node_modules/proj4/lib/projections/eqdc.js
function Fl() {
	Math.abs(this.lat1 + this.lat2) < 1e-10 || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - this.temp ** 2, this.e = Math.sqrt(this.es), this.e0 = wc(this.es), this.e1 = Tc(this.es), this.e2 = Ec(this.es), this.e3 = Dc(this.es), this.sin_phi = Math.sin(this.lat1), this.cos_phi = Math.cos(this.lat1), this.ms1 = Ea(this.e, this.sin_phi, this.cos_phi), this.ml1 = Cc(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < 1e-10 ? this.ns = this.sin_phi : (this.sin_phi = Math.sin(this.lat2), this.cos_phi = Math.cos(this.lat2), this.ms2 = Ea(this.e, this.sin_phi, this.cos_phi), this.ml2 = Cc(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = Cc(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0));
}
function Il(e) {
	var t = e.x, n = e.y, r;
	if (this.sphere) r = this.a * (this.g - n);
	else {
		var i = Cc(this.e0, this.e1, this.e2, this.e3, n);
		r = this.a * (this.g - i);
	}
	var a = this.ns * J(t - this.long0, this.over), o = this.x0 + r * Math.sin(a), s = this.y0 + this.rh - r * Math.cos(a);
	return e.x = o, e.y = s, e;
}
function Ll(e) {
	e.x -= this.x0, e.y = this.rh - e.y + this.y0;
	var t, n, r, i;
	this.ns >= 0 ? (n = Math.sqrt(e.x * e.x + e.y * e.y), t = 1) : (n = -Math.sqrt(e.x * e.x + e.y * e.y), t = -1);
	var a = 0;
	return n !== 0 && (a = Math.atan2(t * e.x, t * e.y)), this.sphere ? (i = J(this.long0 + a / this.ns, this.over), r = kc(this.g - n / this.a), e.x = i, e.y = r, e) : (r = Ac(this.g - n / this.a, this.e0, this.e1, this.e2, this.e3), i = J(this.long0 + a / this.ns, this.over), e.x = i, e.y = r, e);
}
var Rl = {
	init: Fl,
	forward: Il,
	inverse: Ll,
	names: ["Equidistant_Conic", "eqdc"]
};
//#endregion
//#region node_modules/proj4/lib/projections/vandg.js
function zl() {
	this.R = this.a;
}
function Bl(e) {
	var t = e.x, n = e.y, r = J(t - this.long0, this.over), i, a;
	Math.abs(n) <= 1e-10 && (i = this.x0 + this.R * r, a = this.y0);
	var o = Jc(2 * Math.abs(n / Math.PI));
	(Math.abs(r) <= 1e-10 || Math.abs(Math.abs(n) - G) <= 1e-10) && (i = this.x0, a = n >= 0 ? this.y0 + Math.PI * this.R * Math.tan(.5 * o) : this.y0 + Math.PI * this.R * -Math.tan(.5 * o));
	var s = .5 * Math.abs(Math.PI / r - r / Math.PI), c = s * s, l = Math.sin(o), u = Math.cos(o), d = u / (l + u - 1), f = d * d, p = d * (2 / l - 1), m = p * p, h = Math.PI * this.R * (s * (d - m) + Math.sqrt(c * (d - m) * (d - m) - (m + c) * (f - m))) / (m + c);
	r < 0 && (h = -h), i = this.x0 + h;
	var g = c + d;
	return h = Math.PI * this.R * (p * g - s * Math.sqrt((m + c) * (c + 1) - g * g)) / (m + c), a = n >= 0 ? this.y0 + h : this.y0 - h, e.x = i, e.y = a, e;
}
function Vl(e) {
	var t, n, r, i, a, o, s, c, l, u, d, f, p;
	return e.x -= this.x0, e.y -= this.y0, d = Math.PI * this.R, r = e.x / d, i = e.y / d, a = r * r + i * i, o = -Math.abs(i) * (1 + a), s = o - 2 * i * i + r * r, c = -2 * o + 1 + 2 * i * i + a * a, p = i * i / c + (2 * s * s * s / c / c / c - 9 * o * s / c / c) / 27, l = (o - s * s / 3 / c) / c, u = 2 * Math.sqrt(-l / 3), d = 3 * p / l / u, Math.abs(d) > 1 && (d = d >= 0 ? 1 : -1), f = Math.acos(d) / 3, n = e.y >= 0 ? (-u * Math.cos(f + Math.PI / 3) - s / 3 / c) * Math.PI : -(-u * Math.cos(f + Math.PI / 3) - s / 3 / c) * Math.PI, t = Math.abs(r) < 1e-10 ? this.long0 : J(this.long0 + Math.PI * (a - 1 + Math.sqrt(1 + 2 * (r * r - i * i) + a * a)) / 2 / r, this.over), e.x = t, e.y = n, e;
}
var Hl = {
	init: zl,
	forward: Bl,
	inverse: Vl,
	names: [
		"Van_der_Grinten_I",
		"VanDerGrinten",
		"Van_der_Grinten",
		"vandg"
	]
};
//#endregion
//#region node_modules/proj4/lib/common/vincenty.js
function Ul(e, t, n, r, i, a) {
	let o = r - t, s = Math.atan((1 - a) * Math.tan(e)), c = Math.atan((1 - a) * Math.tan(n)), l = Math.sin(s), u = Math.cos(s), d = Math.sin(c), f = Math.cos(c), p = o, m, h = 100, g, _, v, y, b, x, S, C, w, T, E, D, O, ee;
	do {
		if (g = Math.sin(p), _ = Math.cos(p), v = Math.sqrt(f * g * (f * g) + (u * d - l * f * _) * (u * d - l * f * _)), v === 0) return {
			azi1: 0,
			s12: 0
		};
		y = l * d + u * f * _, b = Math.atan2(v, y), x = u * f * g / v, S = 1 - x * x, C = S === 0 ? 0 : y - 2 * l * d / S, w = a / 16 * S * (4 + a * (4 - 3 * S)), m = p, p = o + (1 - w) * a * x * (b + w * v * (C + w * y * (-1 + 2 * C * C)));
	} while (Math.abs(p - m) > 1e-12 && --h > 0);
	return h === 0 ? {
		azi1: NaN,
		s12: NaN
	} : (T = S * (i * i - i * (1 - a) * (i * (1 - a))) / (i * (1 - a) * (i * (1 - a))), E = 1 + T / 16384 * (4096 + T * (-768 + T * (320 - 175 * T))), D = T / 1024 * (256 + T * (-128 + T * (74 - 47 * T))), O = D * v * (C + D / 4 * (y * (-1 + 2 * C * C) - D / 6 * C * (-3 + 4 * v * v) * (-3 + 4 * C * C))), ee = i * (1 - a) * E * (b - O), {
		azi1: Math.atan2(f * g, u * d - l * f * _),
		s12: ee
	});
}
function Wl(e, t, n, r, i, a) {
	let o = Math.atan((1 - a) * Math.tan(e)), s = Math.sin(o), c = Math.cos(o), l = Math.sin(n), u = Math.cos(n), d = Math.atan2(s, c * u), f = c * l, p = 1 - f * f, m = p * (i * i - i * (1 - a) * (i * (1 - a))) / (i * (1 - a) * (i * (1 - a))), h = 1 + m / 16384 * (4096 + m * (-768 + m * (320 - 175 * m))), g = m / 1024 * (256 + m * (-128 + m * (74 - 47 * m))), _ = r / (i * (1 - a) * h), v, y = 100, b, x, S, C;
	do
		b = Math.cos(2 * d + _), x = Math.sin(_), S = Math.cos(_), C = g * x * (b + g / 4 * (S * (-1 + 2 * b * b) - g / 6 * b * (-3 + 4 * x * x) * (-3 + 4 * b * b))), v = _, _ = r / (i * (1 - a) * h) + C;
	while (Math.abs(_ - v) > 1e-12 && --y > 0);
	if (y === 0) return {
		lat2: NaN,
		lon2: NaN
	};
	let w = s * x - c * S * u, T = Math.atan2(s * S + c * x * u, (1 - a) * Math.sqrt(f * f + w * w)), E = Math.atan2(x * l, c * S - s * x * u), D = a / 16 * p * (4 + a * (4 - 3 * p));
	return {
		lat2: T,
		lon2: t + (E - (1 - D) * a * f * (_ + D * x * (b + D * S * (-1 + 2 * b * b))))
	};
}
//#endregion
//#region node_modules/proj4/lib/projections/aeqd.js
function Gl() {
	this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0), this.f = this.es / (1 + Math.sqrt(1 - this.es));
}
function Kl(e) {
	var t = e.x, n = e.y, r = Math.sin(e.y), i = Math.cos(e.y), a = J(t - this.long0, this.over), o, s, c, l, u, d, f, p, m, h, g;
	return this.sphere ? Math.abs(this.sin_p12 - 1) <= 1e-10 ? (e.x = this.x0 + this.a * (G - n) * Math.sin(a), e.y = this.y0 - this.a * (G - n) * Math.cos(a), e) : Math.abs(this.sin_p12 + 1) <= 1e-10 ? (e.x = this.x0 + this.a * (G + n) * Math.sin(a), e.y = this.y0 + this.a * (G + n) * Math.cos(a), e) : (m = this.sin_p12 * r + this.cos_p12 * i * Math.cos(a), f = Math.acos(m), p = f ? f / Math.sin(f) : 1, e.x = this.x0 + this.a * p * i * Math.sin(a), e.y = this.y0 + this.a * p * (this.cos_p12 * r - this.sin_p12 * i * Math.cos(a)), e) : (o = wc(this.es), s = Tc(this.es), c = Ec(this.es), l = Dc(this.es), Math.abs(this.sin_p12 - 1) <= 1e-10 ? (u = this.a * Cc(o, s, c, l, G), d = this.a * Cc(o, s, c, l, n), e.x = this.x0 + (u - d) * Math.sin(a), e.y = this.y0 - (u - d) * Math.cos(a), e) : Math.abs(this.sin_p12 + 1) <= 1e-10 ? (u = this.a * Cc(o, s, c, l, G), d = this.a * Cc(o, s, c, l, n), e.x = this.x0 + (u + d) * Math.sin(a), e.y = this.y0 + (u + d) * Math.cos(a), e) : Math.abs(t) < 1e-10 && Math.abs(n - this.lat0) < 1e-10 ? (e.x = e.y = 0, e) : (h = Ul(this.lat0, this.long0, n, t, this.a, this.f), g = h.azi1, e.x = h.s12 * Math.sin(g), e.y = h.s12 * Math.cos(g), e));
}
function ql(e) {
	e.x -= this.x0, e.y -= this.y0;
	var t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g;
	return this.sphere ? (t = Math.sqrt(e.x * e.x + e.y * e.y), t > 2 * G * this.a ? void 0 : (n = t / this.a, r = Math.sin(n), i = Math.cos(n), a = this.long0, Math.abs(t) <= 1e-10 ? o = this.lat0 : (o = Jc(i * this.sin_p12 + e.y * r * this.cos_p12 / t), s = Math.abs(this.lat0) - G, a = Math.abs(s) <= 1e-10 ? this.lat0 >= 0 ? J(this.long0 + Math.atan2(e.x, -e.y), this.over) : J(this.long0 - Math.atan2(-e.x, e.y), this.over) : J(this.long0 + Math.atan2(e.x * r, t * this.cos_p12 * i - e.y * this.sin_p12 * r), this.over)), e.x = a, e.y = o, e)) : (c = wc(this.es), l = Tc(this.es), u = Ec(this.es), d = Dc(this.es), Math.abs(this.sin_p12 - 1) <= 1e-10 ? (f = this.a * Cc(c, l, u, d, G), t = Math.sqrt(e.x * e.x + e.y * e.y), p = f - t, o = Ac(p / this.a, c, l, u, d), a = J(this.long0 + Math.atan2(e.x, -1 * e.y), this.over), e.x = a, e.y = o, e) : Math.abs(this.sin_p12 + 1) <= 1e-10 ? (f = this.a * Cc(c, l, u, d, G), t = Math.sqrt(e.x * e.x + e.y * e.y), p = t - f, o = Ac(p / this.a, c, l, u, d), a = J(this.long0 + Math.atan2(e.x, e.y), this.over), e.x = a, e.y = o, e) : (m = Math.atan2(e.x, e.y), h = Math.sqrt(e.x * e.x + e.y * e.y), g = Wl(this.lat0, this.long0, m, h, this.a, this.f), e.x = g.lon2, e.y = g.lat2, e));
}
var Jl = {
	init: Gl,
	forward: Kl,
	inverse: ql,
	names: ["Azimuthal_Equidistant", "aeqd"]
};
//#endregion
//#region node_modules/proj4/lib/projections/ortho.js
function Yl() {
	this.sin_p14 = Math.sin(this.lat0 || 0), this.cos_p14 = Math.cos(this.lat0 || 0);
}
function Xl(e) {
	var t, n, r, i, a, o, s, c, l = e.x, u = e.y;
	return r = J(l - (this.long0 || 0), this.over), t = Math.sin(u), n = Math.cos(u), i = Math.cos(r), o = this.sin_p14 * t + this.cos_p14 * n * i, a = 1, (o > 0 || Math.abs(o) <= 1e-10) && (s = this.a * a * n * Math.sin(r), c = (this.y0 || 0) + this.a * a * (this.cos_p14 * t - this.sin_p14 * n * i)), e.x = s, e.y = c, e;
}
function Zl(e) {
	var t, n, r, i, a, o, s, c, l;
	return e.x -= this.x0 || 0, e.y -= this.y0 || 0, t = Math.sqrt(e.x * e.x + e.y * e.y), n = Jc(t / this.a), r = Math.sin(n), i = Math.cos(n), c = this.long0 || 0, l = this.lat0 || 0, o = c, Math.abs(t) <= 1e-10 ? (s = l, e.x = o, e.y = s, e) : (s = Jc(i * this.sin_p14 + e.y * r * this.cos_p14 / t), a = Math.abs(l) - G, Math.abs(a) <= 1e-10 ? (o = J(l >= 0 ? c + Math.atan2(e.x, -e.y) : c - Math.atan2(-e.x, e.y), this.over), e.x = o, e.y = s, e) : (o = J(c + Math.atan2(e.x * r, t * this.cos_p14 * i - e.y * this.sin_p14 * r), this.over), e.x = o, e.y = s, e));
}
var Ql = {
	init: Yl,
	forward: Xl,
	inverse: Zl,
	names: ["ortho"]
}, Y = {
	FRONT: 1,
	RIGHT: 2,
	BACK: 3,
	LEFT: 4,
	TOP: 5,
	BOTTOM: 6
}, X = {
	AREA_0: 1,
	AREA_1: 2,
	AREA_2: 3,
	AREA_3: 4
};
function $l() {
	this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= G - q / 2 ? this.face = Y.TOP : this.lat0 <= -(G - q / 2) ? this.face = Y.BOTTOM : Math.abs(this.long0) <= q ? this.face = Y.FRONT : Math.abs(this.long0) <= G + q ? this.face = this.long0 > 0 ? Y.RIGHT : Y.LEFT : this.face = Y.BACK, this.es !== 0 && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f);
}
function eu(e) {
	var t = {
		x: 0,
		y: 0
	}, n, r, i, a, o, s, c = { value: 0 };
	if (e.x -= this.long0, n = this.es === 0 ? e.y : Math.atan(this.one_minus_f_squared * Math.tan(e.y)), r = e.x, this.face === Y.TOP) a = G - n, r >= q && r <= G + q ? (c.value = X.AREA_0, i = r - G) : r > G + q || r <= -(G + q) ? (c.value = X.AREA_1, i = r > 0 ? r - Ai : r + Ai) : r > -(G + q) && r <= -q ? (c.value = X.AREA_2, i = r + G) : (c.value = X.AREA_3, i = r);
	else if (this.face === Y.BOTTOM) a = G + n, r >= q && r <= G + q ? (c.value = X.AREA_0, i = -r + G) : r < q && r >= -q ? (c.value = X.AREA_1, i = -r) : r < -q && r >= -(G + q) ? (c.value = X.AREA_2, i = -r - G) : (c.value = X.AREA_3, i = r > 0 ? -r + Ai : -r - Ai);
	else {
		var l, u, d, f, p, m, h;
		this.face === Y.RIGHT ? r = ru(r, +G) : this.face === Y.BACK ? r = ru(r, +Ai) : this.face === Y.LEFT && (r = ru(r, -G)), f = Math.sin(n), p = Math.cos(n), m = Math.sin(r), h = Math.cos(r), l = p * h, u = p * m, d = f, this.face === Y.FRONT ? (a = Math.acos(l), i = nu(a, d, u, c)) : this.face === Y.RIGHT ? (a = Math.acos(u), i = nu(a, d, -l, c)) : this.face === Y.BACK ? (a = Math.acos(-l), i = nu(a, d, -u, c)) : this.face === Y.LEFT ? (a = Math.acos(-u), i = nu(a, d, l, c)) : (a = i = 0, c.value = X.AREA_0);
	}
	return s = Math.atan(12 / Ai * (i + Math.acos(Math.sin(i) * Math.cos(q)) - G)), o = Math.sqrt((1 - Math.cos(a)) / (Math.cos(s) * Math.cos(s)) / (1 - Math.cos(Math.atan(1 / Math.cos(i))))), c.value === X.AREA_1 ? s += G : c.value === X.AREA_2 ? s += Ai : c.value === X.AREA_3 && (s += 1.5 * Ai), t.x = o * Math.cos(s), t.y = o * Math.sin(s), t.x = t.x * this.a + this.x0, t.y = t.y * this.a + this.y0, e.x = t.x, e.y = t.y, e;
}
function tu(e) {
	var t = {
		lam: 0,
		phi: 0
	}, n, r, i, a, o, s, c, l, u, d = { value: 0 };
	if (e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a, r = Math.atan(Math.sqrt(e.x * e.x + e.y * e.y)), n = Math.atan2(e.y, e.x), e.x >= 0 && e.x >= Math.abs(e.y) ? d.value = X.AREA_0 : e.y >= 0 && e.y >= Math.abs(e.x) ? (d.value = X.AREA_1, n -= G) : e.x < 0 && -e.x >= Math.abs(e.y) ? (d.value = X.AREA_2, n = n < 0 ? n + Ai : n - Ai) : (d.value = X.AREA_3, n += G), u = Ai / 12 * Math.tan(n), o = Math.sin(u) / (Math.cos(u) - 1 / Math.sqrt(2)), s = Math.atan(o), i = Math.cos(n), a = Math.tan(r), c = 1 - i * i * a * a * (1 - Math.cos(Math.atan(1 / Math.cos(s)))), c < -1 ? c = -1 : c > 1 && (c = 1), this.face === Y.TOP) l = Math.acos(c), t.phi = G - l, d.value === X.AREA_0 ? t.lam = s + G : d.value === X.AREA_1 ? t.lam = s < 0 ? s + Ai : s - Ai : d.value === X.AREA_2 ? t.lam = s - G : t.lam = s;
	else if (this.face === Y.BOTTOM) l = Math.acos(c), t.phi = l - G, d.value === X.AREA_0 ? t.lam = -s + G : d.value === X.AREA_1 ? t.lam = -s : d.value === X.AREA_2 ? t.lam = -s - G : t.lam = s < 0 ? -s - Ai : -s + Ai;
	else {
		var f = c, p, m;
		u = f * f, m = u >= 1 ? 0 : Math.sqrt(1 - u) * Math.sin(s), u += m * m, p = u >= 1 ? 0 : Math.sqrt(1 - u), d.value === X.AREA_1 ? (u = p, p = -m, m = u) : d.value === X.AREA_2 ? (p = -p, m = -m) : d.value === X.AREA_3 && (u = p, p = m, m = -u), this.face === Y.RIGHT ? (u = f, f = -p, p = u) : this.face === Y.BACK ? (f = -f, p = -p) : this.face === Y.LEFT && (u = f, f = p, p = -u), t.phi = Math.acos(-m) - G, t.lam = Math.atan2(p, f), this.face === Y.RIGHT ? t.lam = ru(t.lam, -G) : this.face === Y.BACK ? t.lam = ru(t.lam, -Ai) : this.face === Y.LEFT && (t.lam = ru(t.lam, +G));
	}
	if (this.es !== 0) {
		var h = +(t.phi < 0), g = Math.tan(t.phi), _ = this.b / Math.sqrt(g * g + this.one_minus_f_squared);
		t.phi = Math.atan(Math.sqrt(this.a * this.a - _ * _) / (this.one_minus_f * _)), h && (t.phi = -t.phi);
	}
	return t.lam += this.long0, e.x = t.lam, e.y = t.phi, e;
}
function nu(e, t, n, r) {
	var i;
	return e < 1e-10 ? (r.value = X.AREA_0, i = 0) : (i = Math.atan2(t, n), Math.abs(i) <= q ? r.value = X.AREA_0 : i > q && i <= G + q ? (r.value = X.AREA_1, i -= G) : i > G + q || i <= -(G + q) ? (r.value = X.AREA_2, i = i >= 0 ? i - Ai : i + Ai) : (r.value = X.AREA_3, i += G)), i;
}
function ru(e, t) {
	var n = e + t;
	return n < -3.14159265359 ? n += ki : n > 3.14159265359 && (n -= ki), n;
}
var iu = {
	init: $l,
	forward: eu,
	inverse: tu,
	names: [
		"Quadrilateralized Spherical Cube",
		"Quadrilateralized_Spherical_Cube",
		"qsc"
	]
}, au = [
	[
		1,
		22199e-21,
		-715515e-10,
		31103e-10
	],
	[
		.9986,
		-482243e-9,
		-24897e-9,
		-13309e-10
	],
	[
		.9954,
		-83103e-8,
		-448605e-10,
		-9.86701e-7
	],
	[
		.99,
		-.00135364,
		-59661e-9,
		36777e-10
	],
	[
		.9822,
		-.00167442,
		-449547e-11,
		-572411e-11
	],
	[
		.973,
		-.00214868,
		-903571e-10,
		1.8736e-8
	],
	[
		.96,
		-.00305085,
		-900761e-10,
		164917e-11
	],
	[
		.9427,
		-.00382792,
		-653386e-10,
		-26154e-10
	],
	[
		.9216,
		-.00467746,
		-10457e-8,
		481243e-11
	],
	[
		.8962,
		-.00536223,
		-323831e-10,
		-543432e-11
	],
	[
		.8679,
		-.00609363,
		-113898e-9,
		332484e-11
	],
	[
		.835,
		-.00698325,
		-640253e-10,
		9.34959e-7
	],
	[
		.7986,
		-.00755338,
		-500009e-10,
		9.35324e-7
	],
	[
		.7597,
		-.00798324,
		-35971e-9,
		-227626e-11
	],
	[
		.7186,
		-.00851367,
		-701149e-10,
		-86303e-10
	],
	[
		.6732,
		-.00986209,
		-199569e-9,
		191974e-10
	],
	[
		.6213,
		-.010418,
		883923e-10,
		624051e-11
	],
	[
		.5722,
		-.00906601,
		182e-6,
		624051e-11
	],
	[
		.5322,
		-.00677797,
		275608e-9,
		624051e-11
	]
], ou = [
	[
		-520417e-23,
		.0124,
		121431e-23,
		-845284e-16
	],
	[
		.062,
		.0124,
		-1.26793e-9,
		422642e-15
	],
	[
		.124,
		.0124,
		5.07171e-9,
		-1.60604e-9
	],
	[
		.186,
		.0123999,
		-1.90189e-8,
		6.00152e-9
	],
	[
		.248,
		.0124002,
		7.10039e-8,
		-2.24e-8
	],
	[
		.31,
		.0123992,
		-2.64997e-7,
		8.35986e-8
	],
	[
		.372,
		.0124029,
		9.88983e-7,
		-3.11994e-7
	],
	[
		.434,
		.0123893,
		-369093e-11,
		-4.35621e-7
	],
	[
		.4958,
		.0123198,
		-102252e-10,
		-3.45523e-7
	],
	[
		.5571,
		.0121916,
		-154081e-10,
		-5.82288e-7
	],
	[
		.6176,
		.0119938,
		-241424e-10,
		-5.25327e-7
	],
	[
		.6769,
		.011713,
		-320223e-10,
		-5.16405e-7
	],
	[
		.7346,
		.0113541,
		-397684e-10,
		-6.09052e-7
	],
	[
		.7903,
		.0109107,
		-489042e-10,
		-104739e-11
	],
	[
		.8435,
		.0103431,
		-64615e-9,
		-1.40374e-9
	],
	[
		.8936,
		.00969686,
		-64636e-9,
		-8547e-9
	],
	[
		.9394,
		.00840947,
		-192841e-9,
		-42106e-10
	],
	[
		.9761,
		.00616527,
		-256e-6,
		-42106e-10
	],
	[
		1,
		.00328947,
		-319159e-9,
		-42106e-10
	]
], su = .8487, cu = 1.3523, lu = Oi / 5, uu = 1 / lu, du = 18, fu = function(e, t) {
	return e[0] + t * (e[1] + t * (e[2] + t * e[3]));
}, pu = function(e, t) {
	return e[1] + t * (2 * e[2] + t * 3 * e[3]);
};
function mu(e, t, n, r) {
	for (var i = t; r; --r) {
		var a = e(i);
		if (i -= a, Math.abs(a) < n) break;
	}
	return i;
}
function hu() {
	this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.es = 0, this.title = this.title || "Robinson";
}
function gu(e) {
	var t = J(e.x - this.long0, this.over), n = Math.abs(e.y), r = Math.floor(n * lu);
	r < 0 ? r = 0 : r >= du && (r = du - 1), n = Oi * (n - uu * r);
	var i = {
		x: fu(au[r], n) * t,
		y: fu(ou[r], n)
	};
	return e.y < 0 && (i.y = -i.y), i.x = i.x * this.a * su + this.x0, i.y = i.y * this.a * cu + this.y0, i;
}
function _u(e) {
	var t = {
		x: (e.x - this.x0) / (this.a * su),
		y: Math.abs(e.y - this.y0) / (this.a * cu)
	};
	if (t.y >= 1) t.x /= au[du][0], t.y = e.y < 0 ? -G : G;
	else {
		var n = Math.floor(t.y * du);
		for (n < 0 ? n = 0 : n >= du && (n = du - 1);;) if (ou[n][0] > t.y) --n;
		else if (ou[n + 1][0] <= t.y) ++n;
		else break;
		var r = ou[n], i = 5 * (t.y - r[0]) / (ou[n + 1][0] - r[0]);
		i = mu(function(e) {
			return (fu(r, e) - t.y) / pu(r, e);
		}, i, Di, 100), t.x /= fu(au[n], i), t.y = (5 * n + i) * K, e.y < 0 && (t.y = -t.y);
	}
	return t.x = J(t.x + this.long0, this.over), t;
}
var vu = {
	init: hu,
	forward: gu,
	inverse: _u,
	names: ["Robinson", "robin"]
};
//#endregion
//#region node_modules/proj4/lib/projections/geocent.js
function yu() {
	this.name = "geocent";
}
function bu(e) {
	return _o(e, this.es, this.a);
}
function xu(e) {
	return vo(e, this.es, this.a, this.b);
}
var Su = {
	init: yu,
	forward: bu,
	inverse: xu,
	names: [
		"Geocentric",
		"geocentric",
		"geocent",
		"Geocent"
	]
}, Cu = {
	N_POLE: 0,
	S_POLE: 1,
	EQUIT: 2,
	OBLIQ: 3
}, wu = {
	h: {
		def: 1e5,
		num: !0
	},
	azi: {
		def: 0,
		num: !0,
		degrees: !0
	},
	tilt: {
		def: 0,
		num: !0,
		degrees: !0
	},
	long0: {
		def: 0,
		num: !0
	},
	lat0: {
		def: 0,
		num: !0
	}
};
function Tu() {
	if (Object.keys(wu).forEach(function(e) {
		if (this[e] === void 0) this[e] = wu[e].def;
		else if (wu[e].num && isNaN(this[e])) throw Error("Invalid parameter value, must be numeric " + e + " = " + this[e]);
		else wu[e].num && (this[e] = parseFloat(this[e]));
		wu[e].degrees && (this[e] = this[e] * K);
	}.bind(this)), Math.abs(Math.abs(this.lat0) - G) < 1e-10 ? this.mode = this.lat0 < 0 ? Cu.S_POLE : Cu.N_POLE : Math.abs(this.lat0) < 1e-10 ? this.mode = Cu.EQUIT : (this.mode = Cu.OBLIQ, this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0)), this.pn1 = this.h / this.a, this.pn1 <= 0 || this.pn1 > 1e10) throw Error("Invalid height");
	this.p = 1 + this.pn1, this.rp = 1 / this.p, this.h1 = 1 / this.pn1, this.pfact = (this.p + 1) * this.h1, this.es = 0;
	var e = this.tilt, t = this.azi;
	this.cg = Math.cos(t), this.sg = Math.sin(t), this.cw = Math.cos(e), this.sw = Math.sin(e);
}
function Eu(e) {
	e.x -= this.long0;
	var t = Math.sin(e.y), n = Math.cos(e.y), r = Math.cos(e.x), i, a;
	switch (this.mode) {
		case Cu.OBLIQ:
			a = this.sinph0 * t + this.cosph0 * n * r;
			break;
		case Cu.EQUIT:
			a = n * r;
			break;
		case Cu.S_POLE:
			a = -t;
			break;
		case Cu.N_POLE:
			a = t;
			break;
	}
	switch (a = this.pn1 / (this.p - a), i = a * n * Math.sin(e.x), this.mode) {
		case Cu.OBLIQ:
			a *= this.cosph0 * t - this.sinph0 * n * r;
			break;
		case Cu.EQUIT:
			a *= t;
			break;
		case Cu.N_POLE:
			a *= -(n * r);
			break;
		case Cu.S_POLE:
			a *= n * r;
			break;
	}
	var o = a * this.cg + i * this.sg, s = 1 / (o * this.sw * this.h1 + this.cw);
	return i = (i * this.cg - a * this.sg) * this.cw * s, a = o * s, e.x = i * this.a, e.y = a * this.a, e;
}
function Du(e) {
	e.x /= this.a, e.y /= this.a;
	var t = {
		x: e.x,
		y: e.y
	}, n, r, i = 1 / (this.pn1 - e.y * this.sw);
	n = this.pn1 * e.x * i, r = this.pn1 * e.y * this.cw * i, e.x = n * this.cg + r * this.sg, e.y = r * this.cg - n * this.sg;
	var a = ks(e.x, e.y);
	if (Math.abs(a) < 1e-10) t.x = 0, t.y = e.y;
	else {
		var o, s = 1 - a * a * this.pfact;
		switch (s = (this.p - Math.sqrt(s)) / (this.pn1 / a + a / this.pn1), o = Math.sqrt(1 - s * s), this.mode) {
			case Cu.OBLIQ:
				t.y = Math.asin(o * this.sinph0 + e.y * s * this.cosph0 / a), e.y = (o - this.sinph0 * Math.sin(t.y)) * a, e.x *= s * this.cosph0;
				break;
			case Cu.EQUIT:
				t.y = Math.asin(e.y * s / a), e.y = o * a, e.x *= s;
				break;
			case Cu.N_POLE:
				t.y = Math.asin(o), e.y = -e.y;
				break;
			case Cu.S_POLE:
				t.y = -Math.asin(o);
				break;
		}
		t.x = Math.atan2(e.x, e.y);
	}
	return e.x = t.x + this.long0, e.y = t.y, e;
}
var Ou = {
	init: Tu,
	forward: Eu,
	inverse: Du,
	names: ["Tilted_Perspective", "tpers"]
};
//#endregion
//#region node_modules/proj4/lib/projections/geos.js
function ku() {
	if (this.flip_axis = +(this.sweep === "x"), this.h = Number(this.h), this.radius_g_1 = this.h / this.a, this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) throw Error();
	if (this.radius_g = 1 + this.radius_g_1, this.C = this.radius_g * this.radius_g - 1, this.es !== 0) {
		var e = 1 - this.es, t = 1 / e;
		this.radius_p = Math.sqrt(e), this.radius_p2 = e, this.radius_p_inv2 = t, this.shape = "ellipse";
	} else this.radius_p = 1, this.radius_p2 = 1, this.radius_p_inv2 = 1, this.shape = "sphere";
	this.title ||= "Geostationary Satellite View";
}
function Au(e) {
	var t = e.x, n = e.y, r, i, a, o;
	if (t -= this.long0, this.shape === "ellipse") {
		n = Math.atan(this.radius_p2 * Math.tan(n));
		var s = this.radius_p / ks(this.radius_p * Math.cos(n), Math.sin(n));
		if (i = s * Math.cos(t) * Math.cos(n), a = s * Math.sin(t) * Math.cos(n), o = s * Math.sin(n), (this.radius_g - i) * i - a * a - o * o * this.radius_p_inv2 < 0) return e.x = NaN, e.y = NaN, e;
		r = this.radius_g - i, this.flip_axis ? (e.x = this.radius_g_1 * Math.atan(a / ks(o, r)), e.y = this.radius_g_1 * Math.atan(o / r)) : (e.x = this.radius_g_1 * Math.atan(a / r), e.y = this.radius_g_1 * Math.atan(o / ks(a, r)));
	} else this.shape === "sphere" && (r = Math.cos(n), i = Math.cos(t) * r, a = Math.sin(t) * r, o = Math.sin(n), r = this.radius_g - i, this.flip_axis ? (e.x = this.radius_g_1 * Math.atan(a / ks(o, r)), e.y = this.radius_g_1 * Math.atan(o / r)) : (e.x = this.radius_g_1 * Math.atan(a / r), e.y = this.radius_g_1 * Math.atan(o / ks(a, r))));
	return e.x *= this.a, e.y *= this.a, e;
}
function ju(e) {
	var t = -1, n = 0, r = 0, i, a, o, s;
	if (e.x /= this.a, e.y /= this.a, this.shape === "ellipse") {
		this.flip_axis ? (r = Math.tan(e.y / this.radius_g_1), n = Math.tan(e.x / this.radius_g_1) * ks(1, r)) : (n = Math.tan(e.x / this.radius_g_1), r = Math.tan(e.y / this.radius_g_1) * ks(1, n));
		var c = r / this.radius_p;
		if (i = n * n + c * c + t * t, a = 2 * this.radius_g * t, o = a * a - 4 * i * this.C, o < 0) return e.x = NaN, e.y = NaN, e;
		s = (-a - Math.sqrt(o)) / (2 * i), t = this.radius_g + s * t, n *= s, r *= s, e.x = Math.atan2(n, t), e.y = Math.atan(r * Math.cos(e.x) / t), e.y = Math.atan(this.radius_p_inv2 * Math.tan(e.y));
	} else if (this.shape === "sphere") {
		if (this.flip_axis ? (r = Math.tan(e.y / this.radius_g_1), n = Math.tan(e.x / this.radius_g_1) * Math.sqrt(1 + r * r)) : (n = Math.tan(e.x / this.radius_g_1), r = Math.tan(e.y / this.radius_g_1) * Math.sqrt(1 + n * n)), i = n * n + r * r + t * t, a = 2 * this.radius_g * t, o = a * a - 4 * i * this.C, o < 0) return e.x = NaN, e.y = NaN, e;
		s = (-a - Math.sqrt(o)) / (2 * i), t = this.radius_g + s * t, n *= s, r *= s, e.x = Math.atan2(n, t), e.y = Math.atan(r * Math.cos(e.x) / t);
	}
	return e.x += this.long0, e;
}
var Mu = {
	init: ku,
	forward: Au,
	inverse: ju,
	names: [
		"Geostationary Satellite View",
		"Geostationary_Satellite",
		"geos"
	]
}, Nu = 1.340264, Pu = -.081106, Fu = 893e-6, Iu = .003796, Lu = Math.sqrt(3) / 2;
function Ru() {
	this.es = 0, this.long0 = this.long0 === void 0 ? 0 : this.long0, this.x0 = this.x0 === void 0 ? 0 : this.x0, this.y0 = this.y0 === void 0 ? 0 : this.y0;
}
function zu(e) {
	var t = J(e.x - this.long0, this.over), n = e.y, r = Math.asin(Lu * Math.sin(n)), i = r * r, a = i * i * i;
	return e.x = t * Math.cos(r) / (Lu * (Nu + 3 * Pu * i + a * (7 * Fu + 9 * Iu * i))), e.y = r * (Nu + Pu * i + a * (Fu + Iu * i)), e.x = this.a * e.x + this.x0, e.y = this.a * e.y + this.y0, e;
}
function Bu(e) {
	e.x = (e.x - this.x0) / this.a, e.y = (e.y - this.y0) / this.a;
	var t = 1e-9, n = 12, r = e.y, i, a, o, s, c, l;
	for (l = 0; l < n && (i = r * r, a = i * i * i, o = r * (Nu + Pu * i + a * (Fu + Iu * i)) - e.y, s = Nu + 3 * Pu * i + a * (7 * Fu + 9 * Iu * i), r -= c = o / s, !(Math.abs(c) < t)); ++l);
	return i = r * r, a = i * i * i, e.x = Lu * e.x * (Nu + 3 * Pu * i + a * (7 * Fu + 9 * Iu * i)) / Math.cos(r), e.y = Math.asin(Math.sin(r) / Lu), e.x = J(e.x + this.long0, this.over), e;
}
var Vu = {
	init: Ru,
	forward: zu,
	inverse: Bu,
	names: [
		"eqearth",
		"Equal Earth",
		"Equal_Earth"
	]
}, Hu = 1e-10;
function Uu() {
	var e;
	if (this.phi1 = this.lat1, Math.abs(this.phi1) < Hu) throw Error();
	this.es ? (this.en = bs(this.es), this.m1 = xs(this.phi1, this.am1 = Math.sin(this.phi1), e = Math.cos(this.phi1), this.en), this.am1 = e / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1), this.inverse = Gu, this.forward = Wu) : (Math.abs(this.phi1) + Hu >= G ? this.cphi1 = 0 : this.cphi1 = 1 / Math.tan(this.phi1), this.inverse = qu, this.forward = Ku);
}
function Wu(e) {
	var t = J(e.x - (this.long0 || 0), this.over), n = e.y, r = this.am1 + this.m1 - xs(n, i = Math.sin(n), a = Math.cos(n), this.en), i = a * t / (r * Math.sqrt(1 - this.es * i * i)), a;
	return e.x = r * Math.sin(i), e.y = this.am1 - r * Math.cos(i), e.x = this.a * e.x + (this.x0 || 0), e.y = this.a * e.y + (this.y0 || 0), e;
}
function Gu(e) {
	e.x = (e.x - (this.x0 || 0)) / this.a, e.y = (e.y - (this.y0 || 0)) / this.a;
	var t, n = ks(e.x, e.y = this.am1 - e.y), r, i = Cs(this.am1 + this.m1 - n, this.es, this.en);
	if ((t = Math.abs(i)) < G) t = Math.sin(i), r = n * Math.atan2(e.x, e.y) * Math.sqrt(1 - this.es * t * t) / Math.cos(i);
	else if (Math.abs(t - G) <= Hu) r = 0;
	else throw Error();
	return e.x = J(r + (this.long0 || 0), this.over), e.y = kc(i), e;
}
function Ku(e) {
	var t = J(e.x - (this.long0 || 0), this.over), n = e.y, r, i = this.cphi1 + this.phi1 - n;
	return Math.abs(i) > Hu ? (e.x = i * Math.sin(r = t * Math.cos(n) / i), e.y = this.cphi1 - i * Math.cos(r)) : e.x = e.y = 0, e.x = this.a * e.x + (this.x0 || 0), e.y = this.a * e.y + (this.y0 || 0), e;
}
function qu(e) {
	e.x = (e.x - (this.x0 || 0)) / this.a, e.y = (e.y - (this.y0 || 0)) / this.a;
	var t, n, r = ks(e.x, e.y = this.cphi1 - e.y);
	if (n = this.cphi1 + this.phi1 - r, Math.abs(n) > G) throw Error();
	return t = Math.abs(Math.abs(n) - G) <= Hu ? 0 : r * Math.atan2(e.x, e.y) / Math.cos(n), e.x = J(t + (this.long0 || 0), this.over), e.y = kc(n), e;
}
var Ju = {
	init: Uu,
	names: ["bonne", "Bonne (Werner lat_1=90)"]
}, Yu = {
	OBLIQUE: {
		forward: td,
		inverse: rd
	},
	TRANSVERSE: {
		forward: nd,
		inverse: id
	}
}, Xu = {
	ROTATE: {
		o_alpha: "oAlpha",
		o_lon_c: "oLongC",
		o_lat_c: "oLatC"
	},
	NEW_POLE: {
		o_lat_p: "oLatP",
		o_lon_p: "oLongP"
	},
	NEW_EQUATOR: {
		o_lon_1: "oLong1",
		o_lat_1: "oLat1",
		o_lon_2: "oLong2",
		o_lat_2: "oLat2"
	}
};
function Zu() {
	if (this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.title = this.title || "General Oblique Transformation", this.isIdentity = Ia.includes(this.o_proj), !this.o_proj) throw Error("Missing parameter: o_proj");
	if (this.o_proj === "ob_tran") throw Error("Invalid value for o_proj: " + this.o_proj);
	let e = ho(this.projStr.replace("+proj=ob_tran", "").replace("+o_proj=", "+proj=").trim());
	if (!e) throw Error("Invalid parameter: o_proj. Unknown projection " + this.o_proj);
	e.long0 = 0, this.obliqueProjection = e;
	let t, n = Object.keys(Xu), r = (e) => {
		if (this[e] === void 0) return;
		let t = parseFloat(this[e]) * K;
		if (isNaN(t)) throw Error("Invalid value for " + e + ": " + this[e]);
		return t;
	};
	for (let e = 0; e < n.length; e++) {
		let i = Xu[n[e]], a = Object.entries(i);
		if (a.some(([e]) => this[e] !== void 0)) {
			t = i;
			for (let e = 0; e < a.length; e++) {
				let [t, n] = a[e], i = r(t);
				if (i === void 0) throw Error("Missing parameter: " + t + ".");
				this[n] = i;
			}
			break;
		}
	}
	if (!t) throw Error("No valid parameters provided for ob_tran projection.");
	let { lamp: i, phip: a } = ed(this, t);
	this.lamp = i, Math.abs(a) > 1e-10 ? (this.cphip = Math.cos(a), this.sphip = Math.sin(a), this.projectionType = Yu.OBLIQUE) : this.projectionType = Yu.TRANSVERSE;
}
function Qu(e) {
	return this.projectionType.forward(this, e);
}
function $u(e) {
	return this.projectionType.inverse(this, e);
}
function ed(e, t) {
	let n, r;
	if (t === Xu.ROTATE) {
		let t = e.oLongC, i = e.oLatC, a = e.oAlpha;
		if (Math.abs(Math.abs(i) - G) <= 1e-10) throw Error("Invalid value for o_lat_c: " + e.o_lat_c + " should be < 90°");
		r = t + Math.atan2(-1 * Math.cos(a), -1 * Math.sin(a) * Math.sin(i)), n = Math.asin(Math.cos(i) * Math.sin(a));
	} else if (t === Xu.NEW_POLE) r = e.oLongP, n = e.oLatP;
	else {
		let t = e.oLong1, i = e.oLat1, a = e.oLong2, o = e.oLat2, s = Math.abs(i);
		if (Math.abs(i) > G - 1e-10) throw Error("Invalid value for o_lat_1: " + e.o_lat_1 + " should be < 90°");
		if (Math.abs(o) > G - 1e-10) throw Error("Invalid value for o_lat_2: " + e.o_lat_2 + " should be < 90°");
		if (Math.abs(i - o) < 1e-10) throw Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");
		if (s < 1e-10) throw Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");
		r = Math.atan2(Math.cos(i) * Math.sin(o) * Math.cos(t) - Math.sin(i) * Math.cos(o) * Math.cos(a), Math.sin(i) * Math.cos(o) * Math.sin(a) - Math.cos(i) * Math.sin(o) * Math.sin(t)), n = Math.atan(-1 * Math.cos(r - t) / Math.tan(i));
	}
	return {
		lamp: r,
		phip: n
	};
}
function td(e, t) {
	let { x: n, y: r } = t;
	n += e.long0;
	let i = Math.cos(n), a = Math.sin(r), o = Math.cos(r);
	t.x = J(Math.atan2(o * Math.sin(n), e.sphip * o * i + e.cphip * a) + e.lamp), t.y = Math.asin(e.sphip * a - e.cphip * o * i);
	let s = e.obliqueProjection.forward(t);
	return e.isIdentity && (s.x *= Oi, s.y *= Oi), s;
}
function nd(e, t) {
	let { x: n, y: r } = t;
	n += e.long0;
	let i = Math.cos(r), a = Math.cos(n);
	t.x = J(Math.atan2(i * Math.sin(n), Math.sin(r)) + e.lamp), t.y = Math.asin(-1 * i * a);
	let o = e.obliqueProjection.forward(t);
	return e.isIdentity && (o.x *= Oi, o.y *= Oi), o;
}
function rd(e, t) {
	e.isIdentity && (t.x *= K, t.y *= K);
	let { x: n, y: r } = e.obliqueProjection.inverse(t);
	if (n < Number.MAX_VALUE) {
		n -= e.lamp;
		let i = Math.cos(n), a = Math.sin(r), o = Math.cos(r);
		t.x = Math.atan2(o * Math.sin(n), e.sphip * o * i - e.cphip * a), t.y = Math.asin(e.sphip * a + e.cphip * o * i);
	}
	return t.x = J(t.x + e.long0), t;
}
function id(e, t) {
	e.isIdentity && (t.x *= K, t.y *= K);
	let { x: n, y: r } = e.obliqueProjection.inverse(t);
	if (n < Number.MAX_VALUE) {
		let i = Math.cos(r);
		n -= e.lamp, t.x = Math.atan2(i * Math.sin(n), -1 * Math.sin(r)), t.y = Math.asin(i * Math.cos(n));
	}
	return t.x = J(t.x + e.long0), t;
}
var ad = {
	init: Zu,
	forward: Qu,
	inverse: $u,
	names: [
		"General Oblique Transformation",
		"General_Oblique_Transformation",
		"ob_tran"
	]
};
//#endregion
//#region node_modules/proj4/projs.js
function od(e) {
	e.Proj.projections.add(Ds), e.Proj.projections.add(zs), e.Proj.projections.add(Us), e.Proj.projections.add($s), e.Proj.projections.add(ic), e.Proj.projections.add(cc), e.Proj.projections.add(mc), e.Proj.projections.add(vc), e.Proj.projections.add(Sc), e.Proj.projections.add(Pc), e.Proj.projections.add(qc), e.Proj.projections.add($c), e.Proj.projections.add(rl), e.Proj.projections.add(cl), e.Proj.projections.add(fl), e.Proj.projections.add(_l), e.Proj.projections.add(xl), e.Proj.projections.add(Tl), e.Proj.projections.add(Al), e.Proj.projections.add(Pl), e.Proj.projections.add(Rl), e.Proj.projections.add(Hl), e.Proj.projections.add(Jl), e.Proj.projections.add(Ql), e.Proj.projections.add(iu), e.Proj.projections.add(vu), e.Proj.projections.add(Su), e.Proj.projections.add(Ou), e.Proj.projections.add(Mu), e.Proj.projections.add(Vu), e.Proj.projections.add(Ju), e.Proj.projections.add(ad);
}
//#endregion
//#region node_modules/proj4/lib/index.js
var Z = Object.assign(Fo, {
	defaultDatum: "WGS84",
	Proj: ho,
	WGS84: new ho("WGS84"),
	Point: ss,
	toPoint: Do,
	defs: ga,
	nadgrid: eo,
	transform: jo,
	mgrs: Wo,
	version: "__VERSION__"
});
od(Z);
//#endregion
//#region src/MapUtil/Sources.js
var sd = /* @__PURE__ */ st((/* @__PURE__ */ R(((e, t) => {
	(function(e, n) {
		typeof t == "object" && typeof t.exports == "object" ? t.exports = e.document ? n(e, !0) : function(e) {
			if (!e.document) throw Error("jQuery requires a window with a document");
			return n(e);
		} : n(e);
	})(typeof window < "u" ? window : e, function(e, t) {
		var n = [], r = Object.getPrototypeOf, i = n.slice, a = n.flat ? function(e) {
			return n.flat.call(e);
		} : function(e) {
			return n.concat.apply([], e);
		}, o = n.push, s = n.indexOf, c = {}, l = c.toString, u = c.hasOwnProperty, d = u.toString, f = d.call(Object), p = {}, m = function(e) {
			return typeof e == "function" && typeof e.nodeType != "number" && typeof e.item != "function";
		}, h = function(e) {
			return e != null && e === e.window;
		}, g = e.document, _ = {
			type: !0,
			src: !0,
			nonce: !0,
			noModule: !0
		};
		function v(e, t, n) {
			n ||= g;
			var r, i, a = n.createElement("script");
			if (a.text = e, t) for (r in _) i = t[r] || t.getAttribute && t.getAttribute(r), i && a.setAttribute(r, i);
			n.head.appendChild(a).parentNode.removeChild(a);
		}
		function y(e) {
			return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? c[l.call(e)] || "object" : typeof e;
		}
		var b = "3.7.0", x = /HTML$/i, S = function(e, t) {
			return new S.fn.init(e, t);
		};
		S.fn = S.prototype = {
			jquery: b,
			constructor: S,
			length: 0,
			toArray: function() {
				return i.call(this);
			},
			get: function(e) {
				return e == null ? i.call(this) : e < 0 ? this[e + this.length] : this[e];
			},
			pushStack: function(e) {
				var t = S.merge(this.constructor(), e);
				return t.prevObject = this, t;
			},
			each: function(e) {
				return S.each(this, e);
			},
			map: function(e) {
				return this.pushStack(S.map(this, function(t, n) {
					return e.call(t, n, t);
				}));
			},
			slice: function() {
				return this.pushStack(i.apply(this, arguments));
			},
			first: function() {
				return this.eq(0);
			},
			last: function() {
				return this.eq(-1);
			},
			even: function() {
				return this.pushStack(S.grep(this, function(e, t) {
					return (t + 1) % 2;
				}));
			},
			odd: function() {
				return this.pushStack(S.grep(this, function(e, t) {
					return t % 2;
				}));
			},
			eq: function(e) {
				var t = this.length, n = +e + (e < 0 ? t : 0);
				return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
			},
			end: function() {
				return this.prevObject || this.constructor();
			},
			push: o,
			sort: n.sort,
			splice: n.splice
		}, S.extend = S.fn.extend = function() {
			var e, t, n, r, i, a, o = arguments[0] || {}, s = 1, c = arguments.length, l = !1;
			for (typeof o == "boolean" && (l = o, o = arguments[s] || {}, s++), typeof o != "object" && !m(o) && (o = {}), s === c && (o = this, s--); s < c; s++) if ((e = arguments[s]) != null) for (t in e) r = e[t], !(t === "__proto__" || o === r) && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = o[t], a = i && !Array.isArray(n) ? [] : !i && !S.isPlainObject(n) ? {} : n, i = !1, o[t] = S.extend(l, a, r)) : r !== void 0 && (o[t] = r));
			return o;
		}, S.extend({
			expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
			isReady: !0,
			error: function(e) {
				throw Error(e);
			},
			noop: function() {},
			isPlainObject: function(e) {
				var t, n;
				return !e || l.call(e) !== "[object Object]" ? !1 : (t = r(e), t ? (n = u.call(t, "constructor") && t.constructor, typeof n == "function" && d.call(n) === f) : !0);
			},
			isEmptyObject: function(e) {
				for (var t in e) return !1;
				return !0;
			},
			globalEval: function(e, t, n) {
				v(e, { nonce: t && t.nonce }, n);
			},
			each: function(e, t) {
				var n, r = 0;
				if (C(e)) for (n = e.length; r < n && t.call(e[r], r, e[r]) !== !1; r++);
				else for (r in e) if (t.call(e[r], r, e[r]) === !1) break;
				return e;
			},
			text: function(e) {
				var t, n = "", r = 0, i = e.nodeType;
				if (!i) for (; t = e[r++];) n += S.text(t);
				else if (i === 1 || i === 9 || i === 11) return e.textContent;
				else if (i === 3 || i === 4) return e.nodeValue;
				return n;
			},
			makeArray: function(e, t) {
				var n = t || [];
				return e != null && (C(Object(e)) ? S.merge(n, typeof e == "string" ? [e] : e) : o.call(n, e)), n;
			},
			inArray: function(e, t, n) {
				return t == null ? -1 : s.call(t, e, n);
			},
			isXMLDoc: function(e) {
				var t = e && e.namespaceURI, n = e && (e.ownerDocument || e).documentElement;
				return !x.test(t || n && n.nodeName || "HTML");
			},
			merge: function(e, t) {
				for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
				return e.length = i, e;
			},
			grep: function(e, t, n) {
				for (var r, i = [], a = 0, o = e.length, s = !n; a < o; a++) r = !t(e[a], a), r !== s && i.push(e[a]);
				return i;
			},
			map: function(e, t, n) {
				var r, i, o = 0, s = [];
				if (C(e)) for (r = e.length; o < r; o++) i = t(e[o], o, n), i != null && s.push(i);
				else for (o in e) i = t(e[o], o, n), i != null && s.push(i);
				return a(s);
			},
			guid: 1,
			support: p
		}), typeof Symbol == "function" && (S.fn[Symbol.iterator] = n[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
			c["[object " + t + "]"] = t.toLowerCase();
		});
		function C(e) {
			var t = !!e && "length" in e && e.length, n = y(e);
			return m(e) || h(e) ? !1 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e;
		}
		function w(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
		}
		var T = n.pop, E = n.sort, D = n.splice, O = "[\\x20\\t\\r\\n\\f]", ee = RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g");
		S.contains = function(e, t) {
			var n = t && t.parentNode;
			return e === n || !!(n && n.nodeType === 1 && (e.contains ? e.contains(n) : e.compareDocumentPosition && e.compareDocumentPosition(n) & 16));
		};
		var te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
		function ne(e, t) {
			return t ? e === "\0" ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
		}
		S.escapeSelector = function(e) {
			return (e + "").replace(te, ne);
		};
		var re = g, ie = o;
		(function() {
			var t, r, a, o, c, l = ie, d, f, m, h, g, _ = S.expando, v = 0, y = 0, b = Te(), x = Te(), C = Te(), te = Te(), ne = function(e, t) {
				return e === t && (c = !0), 0;
			}, ae = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", oe = "(?:\\\\[\\da-fA-F]{1,6}" + O + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", se = "\\[" + O + "*(" + oe + ")(?:" + O + "*([*^$|!~]?=)" + O + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + O + "*\\]", ce = ":(" + oe + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + se + ")*)|.*)\\)|)", le = RegExp(O + "+", "g"), ue = RegExp("^" + O + "*," + O + "*"), de = RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"), fe = RegExp(O + "|>"), pe = new RegExp(ce), me = RegExp("^" + oe + "$"), he = {
				ID: RegExp("^#(" + oe + ")"),
				CLASS: RegExp("^\\.(" + oe + ")"),
				TAG: RegExp("^(" + oe + "|[*])"),
				ATTR: RegExp("^" + se),
				PSEUDO: RegExp("^" + ce),
				CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
				bool: RegExp("^(?:" + ae + ")$", "i"),
				needsContext: RegExp("^" + O + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", "i")
			}, ge = /^(?:input|select|textarea|button)$/i, _e = /^h\d$/i, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, be = RegExp("\\\\[\\da-fA-F]{1,6}" + O + "?|\\\\([^\\r\\n\\f])", "g"), xe = function(e, t) {
				var n = "0x" + e.slice(1) - 65536;
				return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, n & 1023 | 56320));
			}, Se = function() {
				N();
			}, Ce = Ne(function(e) {
				return e.disabled === !0 && w(e, "fieldset");
			}, {
				dir: "parentNode",
				next: "legend"
			});
			function we() {
				try {
					return d.activeElement;
				} catch {}
			}
			try {
				l.apply(n = i.call(re.childNodes), re.childNodes), n[re.childNodes.length].nodeType;
			} catch {
				l = {
					apply: function(e, t) {
						ie.apply(e, i.call(t));
					},
					call: function(e) {
						ie.apply(e, i.call(arguments, 1));
					}
				};
			}
			function k(e, t, n, r) {
				var i, a, o, s, c, u, f, g = t && t.ownerDocument, v = t ? t.nodeType : 9;
				if (n ||= [], typeof e != "string" || !e || v !== 1 && v !== 9 && v !== 11) return n;
				if (!r && (N(t), t ||= d, m)) {
					if (v !== 11 && (c = ve.exec(e))) {
						if (i = c[1]) {
							if (v === 9) if (o = t.getElementById(i)) {
								if (o.id === i) return l.call(n, o), n;
							} else return n;
							else if (g && (o = g.getElementById(i)) && k.contains(t, o) && o.id === i) return l.call(n, o), n;
						} else if (c[2]) return l.apply(n, t.getElementsByTagName(e)), n;
						else if ((i = c[3]) && t.getElementsByClassName) return l.apply(n, t.getElementsByClassName(i)), n;
					}
					if (!te[e + " "] && (!h || !h.test(e))) {
						if (f = e, g = t, v === 1 && (fe.test(e) || de.test(e))) {
							for (g = ye.test(e) && ke(t.parentNode) || t, (g != t || !p.scope) && ((s = t.getAttribute("id")) ? s = S.escapeSelector(s) : t.setAttribute("id", s = _)), u = je(e), a = u.length; a--;) u[a] = (s ? "#" + s : ":scope") + " " + Me(u[a]);
							f = u.join(",");
						}
						try {
							return l.apply(n, g.querySelectorAll(f)), n;
						} catch {
							te(e, !0);
						} finally {
							s === _ && t.removeAttribute("id");
						}
					}
				}
				return F(e.replace(ee, "$1"), t, n, r);
			}
			function Te() {
				var e = [];
				function t(n, i) {
					return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i;
				}
				return t;
			}
			function Ee(e) {
				return e[_] = !0, e;
			}
			function A(e) {
				var t = d.createElement("fieldset");
				try {
					return !!e(t);
				} catch {
					return !1;
				} finally {
					t.parentNode && t.parentNode.removeChild(t), t = null;
				}
			}
			function De(e) {
				return function(t) {
					return w(t, "input") && t.type === e;
				};
			}
			function Oe(e) {
				return function(t) {
					return (w(t, "input") || w(t, "button")) && t.type === e;
				};
			}
			function j(e) {
				return function(t) {
					return "form" in t ? t.parentNode && t.disabled === !1 ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && Ce(t) === e : t.disabled === e : "label" in t ? t.disabled === e : !1;
				};
			}
			function M(e) {
				return Ee(function(t) {
					return t = +t, Ee(function(n, r) {
						for (var i, a = e([], n.length, t), o = a.length; o--;) n[i = a[o]] && (n[i] = !(r[i] = n[i]));
					});
				});
			}
			function ke(e) {
				return e && e.getElementsByTagName !== void 0 && e;
			}
			function N(e) {
				var t, n = e ? e.ownerDocument || e : re;
				return n == d || n.nodeType !== 9 || !n.documentElement ? d : (d = n, f = d.documentElement, m = !S.isXMLDoc(d), g = f.matches || f.webkitMatchesSelector || f.msMatchesSelector, re != d && (t = d.defaultView) && t.top !== t && t.addEventListener("unload", Se), p.getById = A(function(e) {
					return f.appendChild(e).id = S.expando, !d.getElementsByName || !d.getElementsByName(S.expando).length;
				}), p.disconnectedMatch = A(function(e) {
					return g.call(e, "*");
				}), p.scope = A(function() {
					return d.querySelectorAll(":scope");
				}), p.cssHas = A(function() {
					try {
						return d.querySelector(":has(*,:jqfake)"), !1;
					} catch {
						return !0;
					}
				}), p.getById ? (r.filter.ID = function(e) {
					var t = e.replace(be, xe);
					return function(e) {
						return e.getAttribute("id") === t;
					};
				}, r.find.ID = function(e, t) {
					if (t.getElementById !== void 0 && m) {
						var n = t.getElementById(e);
						return n ? [n] : [];
					}
				}) : (r.filter.ID = function(e) {
					var t = e.replace(be, xe);
					return function(e) {
						var n = e.getAttributeNode !== void 0 && e.getAttributeNode("id");
						return n && n.value === t;
					};
				}, r.find.ID = function(e, t) {
					if (t.getElementById !== void 0 && m) {
						var n, r, i, a = t.getElementById(e);
						if (a) {
							if (n = a.getAttributeNode("id"), n && n.value === e) return [a];
							for (i = t.getElementsByName(e), r = 0; a = i[r++];) if (n = a.getAttributeNode("id"), n && n.value === e) return [a];
						}
						return [];
					}
				}), r.find.TAG = function(e, t) {
					return t.getElementsByTagName === void 0 ? t.querySelectorAll(e) : t.getElementsByTagName(e);
				}, r.find.CLASS = function(e, t) {
					if (t.getElementsByClassName !== void 0 && m) return t.getElementsByClassName(e);
				}, h = [], A(function(e) {
					var t;
					f.appendChild(e).innerHTML = "<a id='" + _ + "' href='' disabled='disabled'></a><select id='" + _ + "-\r\\' disabled='disabled'><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + O + "*(?:value|" + ae + ")"), e.querySelectorAll("[id~=" + _ + "-]").length || h.push("~="), e.querySelectorAll("a#" + _ + "+*").length || h.push(".#.+[+~]"), e.querySelectorAll(":checked").length || h.push(":checked"), t = d.createElement("input"), t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), f.appendChild(e).disabled = !0, e.querySelectorAll(":disabled").length !== 2 && h.push(":enabled", ":disabled"), t = d.createElement("input"), t.setAttribute("name", ""), e.appendChild(t), e.querySelectorAll("[name='']").length || h.push("\\[" + O + "*name" + O + "*=" + O + "*(?:''|\"\")");
				}), p.cssHas || h.push(":has"), h = h.length && new RegExp(h.join("|")), ne = function(e, t) {
					if (e === t) return c = !0, 0;
					var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
					return n || (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, n & 1 || !p.sortDetached && t.compareDocumentPosition(e) === n ? e === d || e.ownerDocument == re && k.contains(re, e) ? -1 : t === d || t.ownerDocument == re && k.contains(re, t) ? 1 : o ? s.call(o, e) - s.call(o, t) : 0 : n & 4 ? -1 : 1);
				}, d);
			}
			for (t in k.matches = function(e, t) {
				return k(e, null, null, t);
			}, k.matchesSelector = function(e, t) {
				if (N(e), m && !te[t + " "] && (!h || !h.test(t))) try {
					var n = g.call(e, t);
					if (n || p.disconnectedMatch || e.document && e.document.nodeType !== 11) return n;
				} catch {
					te(t, !0);
				}
				return k(t, d, null, [e]).length > 0;
			}, k.contains = function(e, t) {
				return (e.ownerDocument || e) != d && N(e), S.contains(e, t);
			}, k.attr = function(e, t) {
				(e.ownerDocument || e) != d && N(e);
				var n = r.attrHandle[t.toLowerCase()], i = n && u.call(r.attrHandle, t.toLowerCase()) ? n(e, t, !m) : void 0;
				return i === void 0 ? e.getAttribute(t) : i;
			}, k.error = function(e) {
				throw Error("Syntax error, unrecognized expression: " + e);
			}, S.uniqueSort = function(e) {
				var t, n = [], r = 0, a = 0;
				if (c = !p.sortStable, o = !p.sortStable && i.call(e, 0), E.call(e, ne), c) {
					for (; t = e[a++];) t === e[a] && (r = n.push(a));
					for (; r--;) D.call(e, n[r], 1);
				}
				return o = null, e;
			}, S.fn.uniqueSort = function() {
				return this.pushStack(S.uniqueSort(i.apply(this)));
			}, r = S.expr = {
				cacheLength: 50,
				createPseudo: Ee,
				match: he,
				attrHandle: {},
				find: {},
				relative: {
					">": {
						dir: "parentNode",
						first: !0
					},
					" ": { dir: "parentNode" },
					"+": {
						dir: "previousSibling",
						first: !0
					},
					"~": { dir: "previousSibling" }
				},
				preFilter: {
					ATTR: function(e) {
						return e[1] = e[1].replace(be, xe), e[3] = (e[3] || e[4] || e[5] || "").replace(be, xe), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4);
					},
					CHILD: function(e) {
						return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || k.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && k.error(e[0]), e;
					},
					PSEUDO: function(e) {
						var t, n = !e[6] && e[2];
						return he.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && pe.test(n) && (t = je(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
					}
				},
				filter: {
					TAG: function(e) {
						var t = e.replace(be, xe).toLowerCase();
						return e === "*" ? function() {
							return !0;
						} : function(e) {
							return w(e, t);
						};
					},
					CLASS: function(e) {
						var t = b[e + " "];
						return t || (t = RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && b(e, function(e) {
							return t.test(typeof e.className == "string" && e.className || e.getAttribute !== void 0 && e.getAttribute("class") || "");
						});
					},
					ATTR: function(e, t, n) {
						return function(r) {
							var i = k.attr(r, e);
							return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i.replace(le, " ") + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0;
						};
					},
					CHILD: function(e, t, n, r, i) {
						var a = e.slice(0, 3) !== "nth", o = e.slice(-4) !== "last", s = t === "of-type";
						return r === 1 && i === 0 ? function(e) {
							return !!e.parentNode;
						} : function(t, n, c) {
							var l, u, d, f, p, m = a === o ? "previousSibling" : "nextSibling", h = t.parentNode, g = s && t.nodeName.toLowerCase(), y = !c && !s, b = !1;
							if (h) {
								if (a) {
									for (; m;) {
										for (d = t; d = d[m];) if (s ? w(d, g) : d.nodeType === 1) return !1;
										p = m = e === "only" && !p && "nextSibling";
									}
									return !0;
								}
								if (p = [o ? h.firstChild : h.lastChild], o && y) {
									for (u = h[_] || (h[_] = {}), l = u[e] || [], f = l[0] === v && l[1], b = f && l[2], d = f && h.childNodes[f]; d = ++f && d && d[m] || (b = f = 0) || p.pop();) if (d.nodeType === 1 && ++b && d === t) {
										u[e] = [
											v,
											f,
											b
										];
										break;
									}
								} else if (y && (u = t[_] || (t[_] = {}), l = u[e] || [], f = l[0] === v && l[1], b = f), b === !1) for (; (d = ++f && d && d[m] || (b = f = 0) || p.pop()) && !((s ? w(d, g) : d.nodeType === 1) && ++b && (y && (u = d[_] || (d[_] = {}), u[e] = [v, b]), d === t)););
								return b -= i, b === r || b % r === 0 && b / r >= 0;
							}
						};
					},
					PSEUDO: function(e, t) {
						var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || k.error("unsupported pseudo: " + e);
						return i[_] ? i(t) : i.length > 1 ? (n = [
							e,
							e,
							"",
							t
						], r.setFilters.hasOwnProperty(e.toLowerCase()) ? Ee(function(e, n) {
							for (var r, a = i(e, t), o = a.length; o--;) r = s.call(e, a[o]), e[r] = !(n[r] = a[o]);
						}) : function(e) {
							return i(e, 0, n);
						}) : i;
					}
				},
				pseudos: {
					not: Ee(function(e) {
						var t = [], n = [], r = P(e.replace(ee, "$1"));
						return r[_] ? Ee(function(e, t, n, i) {
							for (var a, o = r(e, null, i, []), s = e.length; s--;) (a = o[s]) && (e[s] = !(t[s] = a));
						}) : function(e, i, a) {
							return t[0] = e, r(t, null, a, n), t[0] = null, !n.pop();
						};
					}),
					has: Ee(function(e) {
						return function(t) {
							return k(e, t).length > 0;
						};
					}),
					contains: Ee(function(e) {
						return e = e.replace(be, xe), function(t) {
							return (t.textContent || S.text(t)).indexOf(e) > -1;
						};
					}),
					lang: Ee(function(e) {
						return me.test(e || "") || k.error("unsupported lang: " + e), e = e.replace(be, xe).toLowerCase(), function(t) {
							var n;
							do
								if (n = m ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0;
							while ((t = t.parentNode) && t.nodeType === 1);
							return !1;
						};
					}),
					target: function(t) {
						var n = e.location && e.location.hash;
						return n && n.slice(1) === t.id;
					},
					root: function(e) {
						return e === f;
					},
					focus: function(e) {
						return e === we() && d.hasFocus() && !!(e.type || e.href || ~e.tabIndex);
					},
					enabled: j(!1),
					disabled: j(!0),
					checked: function(e) {
						return w(e, "input") && !!e.checked || w(e, "option") && !!e.selected;
					},
					selected: function(e) {
						return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
					},
					empty: function(e) {
						for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
						return !0;
					},
					parent: function(e) {
						return !r.pseudos.empty(e);
					},
					header: function(e) {
						return _e.test(e.nodeName);
					},
					input: function(e) {
						return ge.test(e.nodeName);
					},
					button: function(e) {
						return w(e, "input") && e.type === "button" || w(e, "button");
					},
					text: function(e) {
						var t;
						return w(e, "input") && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text");
					},
					first: M(function() {
						return [0];
					}),
					last: M(function(e, t) {
						return [t - 1];
					}),
					eq: M(function(e, t, n) {
						return [n < 0 ? n + t : n];
					}),
					even: M(function(e, t) {
						for (var n = 0; n < t; n += 2) e.push(n);
						return e;
					}),
					odd: M(function(e, t) {
						for (var n = 1; n < t; n += 2) e.push(n);
						return e;
					}),
					lt: M(function(e, t, n) {
						for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0;) e.push(r);
						return e;
					}),
					gt: M(function(e, t, n) {
						for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
						return e;
					})
				}
			}, r.pseudos.nth = r.pseudos.eq, {
				radio: !0,
				checkbox: !0,
				file: !0,
				password: !0,
				image: !0
			}) r.pseudos[t] = De(t);
			for (t in {
				submit: !0,
				reset: !0
			}) r.pseudos[t] = Oe(t);
			function Ae() {}
			Ae.prototype = r.filters = r.pseudos, r.setFilters = new Ae();
			function je(e, t) {
				var n, i, a, o, s, c, l, u = x[e + " "];
				if (u) return t ? 0 : u.slice(0);
				for (s = e, c = [], l = r.preFilter; s;) {
					for (o in (!n || (i = ue.exec(s))) && (i && (s = s.slice(i[0].length) || s), c.push(a = [])), n = !1, (i = de.exec(s)) && (n = i.shift(), a.push({
						value: n,
						type: i[0].replace(ee, " ")
					}), s = s.slice(n.length)), r.filter) (i = he[o].exec(s)) && (!l[o] || (i = l[o](i))) && (n = i.shift(), a.push({
						value: n,
						type: o,
						matches: i
					}), s = s.slice(n.length));
					if (!n) break;
				}
				return t ? s.length : s ? k.error(e) : x(e, c).slice(0);
			}
			function Me(e) {
				for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
				return r;
			}
			function Ne(e, t, n) {
				var r = t.dir, i = t.next, a = i || r, o = n && a === "parentNode", s = y++;
				return t.first ? function(t, n, i) {
					for (; t = t[r];) if (t.nodeType === 1 || o) return e(t, n, i);
					return !1;
				} : function(t, n, c) {
					var l, u, d = [v, s];
					if (c) {
						for (; t = t[r];) if ((t.nodeType === 1 || o) && e(t, n, c)) return !0;
					} else for (; t = t[r];) if (t.nodeType === 1 || o) {
						if (u = t[_] || (t[_] = {}), i && w(t, i)) t = t[r] || t;
						else if ((l = u[a]) && l[0] === v && l[1] === s) return d[2] = l[2];
						else if (u[a] = d, d[2] = e(t, n, c)) return !0;
					}
					return !1;
				};
			}
			function Pe(e) {
				return e.length > 1 ? function(t, n, r) {
					for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
					return !0;
				} : e[0];
			}
			function Fe(e, t, n) {
				for (var r = 0, i = t.length; r < i; r++) k(e, t[r], n);
				return n;
			}
			function Ie(e, t, n, r, i) {
				for (var a, o = [], s = 0, c = e.length, l = t != null; s < c; s++) (a = e[s]) && (!n || n(a, r, i)) && (o.push(a), l && t.push(s));
				return o;
			}
			function Le(e, t, n, r, i, a) {
				return r && !r[_] && (r = Le(r)), i && !i[_] && (i = Le(i, a)), Ee(function(a, o, c, u) {
					var d, f, p, m, h = [], g = [], _ = o.length, v = a || Fe(t || "*", c.nodeType ? [c] : c, []), y = e && (a || !t) ? Ie(v, h, e, c, u) : v;
					if (n ? (m = i || (a ? e : _ || r) ? [] : o, n(y, m, c, u)) : m = y, r) for (d = Ie(m, g), r(d, [], c, u), f = d.length; f--;) (p = d[f]) && (m[g[f]] = !(y[g[f]] = p));
					if (a) {
						if (i || e) {
							if (i) {
								for (d = [], f = m.length; f--;) (p = m[f]) && d.push(y[f] = p);
								i(null, m = [], d, u);
							}
							for (f = m.length; f--;) (p = m[f]) && (d = i ? s.call(a, p) : h[f]) > -1 && (a[d] = !(o[d] = p));
						}
					} else m = Ie(m === o ? m.splice(_, m.length) : m), i ? i(null, o, m, u) : l.apply(o, m);
				});
			}
			function Re(e) {
				for (var t, n, i, o = e.length, c = r.relative[e[0].type], l = c || r.relative[" "], u = +!!c, d = Ne(function(e) {
					return e === t;
				}, l, !0), f = Ne(function(e) {
					return s.call(t, e) > -1;
				}, l, !0), p = [function(e, n, r) {
					var i = !c && (r || n != a) || ((t = n).nodeType ? d(e, n, r) : f(e, n, r));
					return t = null, i;
				}]; u < o; u++) if (n = r.relative[e[u].type]) p = [Ne(Pe(p), n)];
				else {
					if (n = r.filter[e[u].type].apply(null, e[u].matches), n[_]) {
						for (i = ++u; i < o && !r.relative[e[i].type]; i++);
						return Le(u > 1 && Pe(p), u > 1 && Me(e.slice(0, u - 1).concat({ value: e[u - 2].type === " " ? "*" : "" })).replace(ee, "$1"), n, u < i && Re(e.slice(u, i)), i < o && Re(e = e.slice(i)), i < o && Me(e));
					}
					p.push(n);
				}
				return Pe(p);
			}
			function ze(e, t) {
				var n = t.length > 0, i = e.length > 0, o = function(o, s, c, u, f) {
					var p, h, g, _ = 0, y = "0", b = o && [], x = [], C = a, w = o || i && r.find.TAG("*", f), E = v += C == null ? 1 : Math.random() || .1, D = w.length;
					for (f && (a = s == d || s || f); y !== D && (p = w[y]) != null; y++) {
						if (i && p) {
							for (h = 0, !s && p.ownerDocument != d && (N(p), c = !m); g = e[h++];) if (g(p, s || d, c)) {
								l.call(u, p);
								break;
							}
							f && (v = E);
						}
						n && ((p = !g && p) && _--, o && b.push(p));
					}
					if (_ += y, n && y !== _) {
						for (h = 0; g = t[h++];) g(b, x, s, c);
						if (o) {
							if (_ > 0) for (; y--;) b[y] || x[y] || (x[y] = T.call(u));
							x = Ie(x);
						}
						l.apply(u, x), f && !o && x.length > 0 && _ + t.length > 1 && S.uniqueSort(u);
					}
					return f && (v = E, a = C), b;
				};
				return n ? Ee(o) : o;
			}
			function P(e, t) {
				var n, r = [], i = [], a = C[e + " "];
				if (!a) {
					for (t ||= je(e), n = t.length; n--;) a = Re(t[n]), a[_] ? r.push(a) : i.push(a);
					a = C(e, ze(i, r)), a.selector = e;
				}
				return a;
			}
			function F(e, t, n, i) {
				var a, o, s, c, u, d = typeof e == "function" && e, f = !i && je(e = d.selector || e);
				if (n ||= [], f.length === 1) {
					if (o = f[0] = f[0].slice(0), o.length > 2 && (s = o[0]).type === "ID" && t.nodeType === 9 && m && r.relative[o[1].type]) {
						if (t = (r.find.ID(s.matches[0].replace(be, xe), t) || [])[0], t) d && (t = t.parentNode);
						else return n;
						e = e.slice(o.shift().value.length);
					}
					for (a = he.needsContext.test(e) ? 0 : o.length; a-- && (s = o[a], !r.relative[c = s.type]);) if ((u = r.find[c]) && (i = u(s.matches[0].replace(be, xe), ye.test(o[0].type) && ke(t.parentNode) || t))) {
						if (o.splice(a, 1), e = i.length && Me(o), !e) return l.apply(n, i), n;
						break;
					}
				}
				return (d || P(e, f))(i, t, !m, n, !t || ye.test(e) && ke(t.parentNode) || t), n;
			}
			p.sortStable = _.split("").sort(ne).join("") === _, N(), p.sortDetached = A(function(e) {
				return e.compareDocumentPosition(d.createElement("fieldset")) & 1;
			}), S.find = k, S.expr[":"] = S.expr.pseudos, S.unique = S.uniqueSort, k.compile = P, k.select = F, k.setDocument = N, k.escape = S.escapeSelector, k.getText = S.text, k.isXML = S.isXMLDoc, k.selectors = S.expr, k.support = S.support, k.uniqueSort = S.uniqueSort;
		})();
		var ae = function(e, t, n) {
			for (var r = [], i = n !== void 0; (e = e[t]) && e.nodeType !== 9;) if (e.nodeType === 1) {
				if (i && S(e).is(n)) break;
				r.push(e);
			}
			return r;
		}, oe = function(e, t) {
			for (var n = []; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
			return n;
		}, se = S.expr.match.needsContext, ce = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
		function le(e, t, n) {
			return m(t) ? S.grep(e, function(e, r) {
				return !!t.call(e, r, e) !== n;
			}) : t.nodeType ? S.grep(e, function(e) {
				return e === t !== n;
			}) : typeof t == "string" ? S.filter(t, e, n) : S.grep(e, function(e) {
				return s.call(t, e) > -1 !== n;
			});
		}
		S.filter = function(e, t, n) {
			var r = t[0];
			return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function(e) {
				return e.nodeType === 1;
			}));
		}, S.fn.extend({
			find: function(e) {
				var t, n, r = this.length, i = this;
				if (typeof e != "string") return this.pushStack(S(e).filter(function() {
					for (t = 0; t < r; t++) if (S.contains(i[t], this)) return !0;
				}));
				for (n = this.pushStack([]), t = 0; t < r; t++) S.find(e, i[t], n);
				return r > 1 ? S.uniqueSort(n) : n;
			},
			filter: function(e) {
				return this.pushStack(le(this, e || [], !1));
			},
			not: function(e) {
				return this.pushStack(le(this, e || [], !0));
			},
			is: function(e) {
				return !!le(this, typeof e == "string" && se.test(e) ? S(e) : e || [], !1).length;
			}
		});
		var ue, de = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, fe = S.fn.init = function(e, t, n) {
			var r, i;
			if (!e) return this;
			if (n ||= ue, typeof e == "string") if (r = e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? [
				null,
				e,
				null
			] : de.exec(e), r && (r[1] || !t)) if (r[1]) {
				if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : g, !0)), ce.test(r[1]) && S.isPlainObject(t)) for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
				return this;
			} else return i = g.getElementById(r[2]), i && (this[0] = i, this.length = 1), this;
			else if (!t || t.jquery) return (t || n).find(e);
			else return this.constructor(t).find(e);
			else if (e.nodeType) return this[0] = e, this.length = 1, this;
			else if (m(e)) return n.ready === void 0 ? e(S) : n.ready(e);
			return S.makeArray(e, this);
		};
		fe.prototype = S.fn, ue = S(g);
		var pe = /^(?:parents|prev(?:Until|All))/, me = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
		S.fn.extend({
			has: function(e) {
				var t = S(e, this), n = t.length;
				return this.filter(function() {
					for (var e = 0; e < n; e++) if (S.contains(this, t[e])) return !0;
				});
			},
			closest: function(e, t) {
				var n, r = 0, i = this.length, a = [], o = typeof e != "string" && S(e);
				if (!se.test(e)) {
					for (; r < i; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && S.find.matchesSelector(n, e))) {
						a.push(n);
						break;
					}
				}
				return this.pushStack(a.length > 1 ? S.uniqueSort(a) : a);
			},
			index: function(e) {
				return e ? typeof e == "string" ? s.call(S(e), this[0]) : s.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
			},
			add: function(e, t) {
				return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
			},
			addBack: function(e) {
				return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
			}
		});
		function he(e, t) {
			for (; (e = e[t]) && e.nodeType !== 1;);
			return e;
		}
		S.each({
			parent: function(e) {
				var t = e.parentNode;
				return t && t.nodeType !== 11 ? t : null;
			},
			parents: function(e) {
				return ae(e, "parentNode");
			},
			parentsUntil: function(e, t, n) {
				return ae(e, "parentNode", n);
			},
			next: function(e) {
				return he(e, "nextSibling");
			},
			prev: function(e) {
				return he(e, "previousSibling");
			},
			nextAll: function(e) {
				return ae(e, "nextSibling");
			},
			prevAll: function(e) {
				return ae(e, "previousSibling");
			},
			nextUntil: function(e, t, n) {
				return ae(e, "nextSibling", n);
			},
			prevUntil: function(e, t, n) {
				return ae(e, "previousSibling", n);
			},
			siblings: function(e) {
				return oe((e.parentNode || {}).firstChild, e);
			},
			children: function(e) {
				return oe(e.firstChild);
			},
			contents: function(e) {
				return e.contentDocument != null && r(e.contentDocument) ? e.contentDocument : (w(e, "template") && (e = e.content || e), S.merge([], e.childNodes));
			}
		}, function(e, t) {
			S.fn[e] = function(n, r) {
				var i = S.map(this, t, n);
				return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = S.filter(r, i)), this.length > 1 && (me[e] || S.uniqueSort(i), pe.test(e) && i.reverse()), this.pushStack(i);
			};
		});
		var ge = /[^\x20\t\r\n\f]+/g;
		function _e(e) {
			var t = {};
			return S.each(e.match(ge) || [], function(e, n) {
				t[n] = !0;
			}), t;
		}
		S.Callbacks = function(e) {
			e = typeof e == "string" ? _e(e) : S.extend({}, e);
			var t, n, r, i, a = [], o = [], s = -1, c = function() {
				for (i ||= e.once, r = t = !0; o.length; s = -1) for (n = o.shift(); ++s < a.length;) a[s].apply(n[0], n[1]) === !1 && e.stopOnFalse && (s = a.length, n = !1);
				e.memory || (n = !1), t = !1, i && (a = n ? [] : "");
			}, l = {
				add: function() {
					return a && (n && !t && (s = a.length - 1, o.push(n)), (function t(n) {
						S.each(n, function(n, r) {
							m(r) ? (!e.unique || !l.has(r)) && a.push(r) : r && r.length && y(r) !== "string" && t(r);
						});
					})(arguments), n && !t && c()), this;
				},
				remove: function() {
					return S.each(arguments, function(e, t) {
						for (var n; (n = S.inArray(t, a, n)) > -1;) a.splice(n, 1), n <= s && s--;
					}), this;
				},
				has: function(e) {
					return e ? S.inArray(e, a) > -1 : a.length > 0;
				},
				empty: function() {
					return a &&= [], this;
				},
				disable: function() {
					return i = o = [], a = n = "", this;
				},
				disabled: function() {
					return !a;
				},
				lock: function() {
					return i = o = [], !n && !t && (a = n = ""), this;
				},
				locked: function() {
					return !!i;
				},
				fireWith: function(e, n) {
					return i || (n ||= [], n = [e, n.slice ? n.slice() : n], o.push(n), t || c()), this;
				},
				fire: function() {
					return l.fireWith(this, arguments), this;
				},
				fired: function() {
					return !!r;
				}
			};
			return l;
		};
		function ve(e) {
			return e;
		}
		function ye(e) {
			throw e;
		}
		function be(e, t, n, r) {
			var i;
			try {
				e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
			} catch (e) {
				n.apply(void 0, [e]);
			}
		}
		S.extend({
			Deferred: function(t) {
				var n = [
					[
						"notify",
						"progress",
						S.Callbacks("memory"),
						S.Callbacks("memory"),
						2
					],
					[
						"resolve",
						"done",
						S.Callbacks("once memory"),
						S.Callbacks("once memory"),
						0,
						"resolved"
					],
					[
						"reject",
						"fail",
						S.Callbacks("once memory"),
						S.Callbacks("once memory"),
						1,
						"rejected"
					]
				], r = "pending", i = {
					state: function() {
						return r;
					},
					always: function() {
						return a.done(arguments).fail(arguments), this;
					},
					catch: function(e) {
						return i.then(null, e);
					},
					pipe: function() {
						var e = arguments;
						return S.Deferred(function(t) {
							S.each(n, function(n, r) {
								var i = m(e[r[4]]) && e[r[4]];
								a[r[1]](function() {
									var e = i && i.apply(this, arguments);
									e && m(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments);
								});
							}), e = null;
						}).promise();
					},
					then: function(t, r, i) {
						var a = 0;
						function o(t, n, r, i) {
							return function() {
								var s = this, c = arguments, l = function() {
									var e, l;
									if (!(t < a)) {
										if (e = r.apply(s, c), e === n.promise()) throw TypeError("Thenable self-resolution");
										l = e && (typeof e == "object" || typeof e == "function") && e.then, m(l) ? i ? l.call(e, o(a, n, ve, i), o(a, n, ye, i)) : (a++, l.call(e, o(a, n, ve, i), o(a, n, ye, i), o(a, n, ve, n.notifyWith))) : (r !== ve && (s = void 0, c = [e]), (i || n.resolveWith)(s, c));
									}
								}, u = i ? l : function() {
									try {
										l();
									} catch (e) {
										S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, u.error), t + 1 >= a && (r !== ye && (s = void 0, c = [e]), n.rejectWith(s, c));
									}
								};
								t ? u() : (S.Deferred.getErrorHook ? u.error = S.Deferred.getErrorHook() : S.Deferred.getStackHook && (u.error = S.Deferred.getStackHook()), e.setTimeout(u));
							};
						}
						return S.Deferred(function(e) {
							n[0][3].add(o(0, e, m(i) ? i : ve, e.notifyWith)), n[1][3].add(o(0, e, m(t) ? t : ve)), n[2][3].add(o(0, e, m(r) ? r : ye));
						}).promise();
					},
					promise: function(e) {
						return e == null ? i : S.extend(e, i);
					}
				}, a = {};
				return S.each(n, function(e, t) {
					var o = t[2], s = t[5];
					i[t[1]] = o.add, s && o.add(function() {
						r = s;
					}, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), o.add(t[3].fire), a[t[0]] = function() {
						return a[t[0] + "With"](this === a ? void 0 : this, arguments), this;
					}, a[t[0] + "With"] = o.fireWith;
				}), i.promise(a), t && t.call(a, a), a;
			},
			when: function(e) {
				var t = arguments.length, n = t, r = Array(n), a = i.call(arguments), o = S.Deferred(), s = function(e) {
					return function(n) {
						r[e] = this, a[e] = arguments.length > 1 ? i.call(arguments) : n, --t || o.resolveWith(r, a);
					};
				};
				if (t <= 1 && (be(e, o.done(s(n)).resolve, o.reject, !t), o.state() === "pending" || m(a[n] && a[n].then))) return o.then();
				for (; n--;) be(a[n], s(n), o.reject);
				return o.promise();
			}
		});
		var xe = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
		S.Deferred.exceptionHook = function(t, n) {
			e.console && e.console.warn && t && xe.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
		}, S.readyException = function(t) {
			e.setTimeout(function() {
				throw t;
			});
		};
		var Se = S.Deferred();
		S.fn.ready = function(e) {
			return Se.then(e).catch(function(e) {
				S.readyException(e);
			}), this;
		}, S.extend({
			isReady: !1,
			readyWait: 1,
			ready: function(e) {
				(e === !0 ? --S.readyWait : S.isReady) || (S.isReady = !0, !(e !== !0 && --S.readyWait > 0) && Se.resolveWith(g, [S]));
			}
		}), S.ready.then = Se.then;
		function Ce() {
			g.removeEventListener("DOMContentLoaded", Ce), e.removeEventListener("load", Ce), S.ready();
		}
		g.readyState === "complete" || g.readyState !== "loading" && !g.documentElement.doScroll ? e.setTimeout(S.ready) : (g.addEventListener("DOMContentLoaded", Ce), e.addEventListener("load", Ce));
		var we = function(e, t, n, r, i, a, o) {
			var s = 0, c = e.length, l = n == null;
			if (y(n) === "object") for (s in i = !0, n) we(e, t, s, n[s], !0, a, o);
			else if (r !== void 0 && (i = !0, m(r) || (o = !0), l && (o ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
				return l.call(S(e), n);
			})), t)) for (; s < c; s++) t(e[s], n, o ? r : r.call(e[s], s, t(e[s], n)));
			return i ? e : l ? t.call(e) : c ? t(e[0], n) : a;
		}, k = /^-ms-/, Te = /-([a-z])/g;
		function Ee(e, t) {
			return t.toUpperCase();
		}
		function A(e) {
			return e.replace(k, "ms-").replace(Te, Ee);
		}
		var De = function(e) {
			return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType;
		};
		function Oe() {
			this.expando = S.expando + Oe.uid++;
		}
		Oe.uid = 1, Oe.prototype = {
			cache: function(e) {
				var t = e[this.expando];
				return t || (t = {}, De(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
					value: t,
					configurable: !0
				}))), t;
			},
			set: function(e, t, n) {
				var r, i = this.cache(e);
				if (typeof t == "string") i[A(t)] = n;
				else for (r in t) i[A(r)] = t[r];
				return i;
			},
			get: function(e, t) {
				return t === void 0 ? this.cache(e) : e[this.expando] && e[this.expando][A(t)];
			},
			access: function(e, t, n) {
				return t === void 0 || t && typeof t == "string" && n === void 0 ? this.get(e, t) : (this.set(e, t, n), n === void 0 ? t : n);
			},
			remove: function(e, t) {
				var n, r = e[this.expando];
				if (r !== void 0) {
					if (t !== void 0) for (Array.isArray(t) ? t = t.map(A) : (t = A(t), t = (t in r) ? [t] : t.match(ge) || []), n = t.length; n--;) delete r[t[n]];
					(t === void 0 || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
				}
			},
			hasData: function(e) {
				var t = e[this.expando];
				return t !== void 0 && !S.isEmptyObject(t);
			}
		};
		var j = new Oe(), M = new Oe(), ke = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, N = /[A-Z]/g;
		function Ae(e) {
			return e === "true" ? !0 : e === "false" ? !1 : e === "null" ? null : e === +e + "" ? +e : ke.test(e) ? JSON.parse(e) : e;
		}
		function je(e, t, n) {
			var r;
			if (n === void 0 && e.nodeType === 1) if (r = "data-" + t.replace(N, "-$&").toLowerCase(), n = e.getAttribute(r), typeof n == "string") {
				try {
					n = Ae(n);
				} catch {}
				M.set(e, t, n);
			} else n = void 0;
			return n;
		}
		S.extend({
			hasData: function(e) {
				return M.hasData(e) || j.hasData(e);
			},
			data: function(e, t, n) {
				return M.access(e, t, n);
			},
			removeData: function(e, t) {
				M.remove(e, t);
			},
			_data: function(e, t, n) {
				return j.access(e, t, n);
			},
			_removeData: function(e, t) {
				j.remove(e, t);
			}
		}), S.fn.extend({
			data: function(e, t) {
				var n, r, i, a = this[0], o = a && a.attributes;
				if (e === void 0) {
					if (this.length && (i = M.get(a), a.nodeType === 1 && !j.get(a, "hasDataAttrs"))) {
						for (n = o.length; n--;) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = A(r.slice(5)), je(a, r, i[r])));
						j.set(a, "hasDataAttrs", !0);
					}
					return i;
				}
				return typeof e == "object" ? this.each(function() {
					M.set(this, e);
				}) : we(this, function(t) {
					var n;
					if (a && t === void 0) return n = M.get(a, e), n !== void 0 || (n = je(a, e), n !== void 0) ? n : void 0;
					this.each(function() {
						M.set(this, e, t);
					});
				}, null, t, arguments.length > 1, null, !0);
			},
			removeData: function(e) {
				return this.each(function() {
					M.remove(this, e);
				});
			}
		}), S.extend({
			queue: function(e, t, n) {
				var r;
				if (e) return t = (t || "fx") + "queue", r = j.get(e, t), n && (!r || Array.isArray(n) ? r = j.access(e, t, S.makeArray(n)) : r.push(n)), r || [];
			},
			dequeue: function(e, t) {
				t ||= "fx";
				var n = S.queue(e, t), r = n.length, i = n.shift(), a = S._queueHooks(e, t);
				i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete a.stop, i.call(e, function() {
					S.dequeue(e, t);
				}, a)), !r && a && a.empty.fire();
			},
			_queueHooks: function(e, t) {
				var n = t + "queueHooks";
				return j.get(e, n) || j.access(e, n, { empty: S.Callbacks("once memory").add(function() {
					j.remove(e, [t + "queue", n]);
				}) });
			}
		}), S.fn.extend({
			queue: function(e, t) {
				var n = 2;
				return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? S.queue(this[0], e) : t === void 0 ? this : this.each(function() {
					var n = S.queue(this, e, t);
					S._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && S.dequeue(this, e);
				});
			},
			dequeue: function(e) {
				return this.each(function() {
					S.dequeue(this, e);
				});
			},
			clearQueue: function(e) {
				return this.queue(e || "fx", []);
			},
			promise: function(e, t) {
				var n, r = 1, i = S.Deferred(), a = this, o = this.length, s = function() {
					--r || i.resolveWith(a, [a]);
				};
				for (typeof e != "string" && (t = e, e = void 0), e ||= "fx"; o--;) n = j.get(a[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(s));
				return s(), i.promise(t);
			}
		});
		var Me = "[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)", Ne = RegExp("^(?:([+-])=|)(" + Me + ")([a-z%]*)$", "i"), Pe = [
			"Top",
			"Right",
			"Bottom",
			"Left"
		], Fe = g.documentElement, Ie = function(e) {
			return S.contains(e.ownerDocument, e);
		}, Le = { composed: !0 };
		Fe.getRootNode && (Ie = function(e) {
			return S.contains(e.ownerDocument, e) || e.getRootNode(Le) === e.ownerDocument;
		});
		var Re = function(e, t) {
			return e = t || e, e.style.display === "none" || e.style.display === "" && Ie(e) && S.css(e, "display") === "none";
		};
		function ze(e, t, n, r) {
			var i, a, o = 20, s = r ? function() {
				return r.cur();
			} : function() {
				return S.css(e, t, "");
			}, c = s(), l = n && n[3] || (S.cssNumber[t] ? "" : "px"), u = e.nodeType && (S.cssNumber[t] || l !== "px" && +c) && Ne.exec(S.css(e, t));
			if (u && u[3] !== l) {
				for (c /= 2, l ||= u[3], u = +c || 1; o--;) S.style(e, t, u + l), (1 - a) * (1 - (a = s() / c || .5)) <= 0 && (o = 0), u /= a;
				u *= 2, S.style(e, t, u + l), n ||= [];
			}
			return n && (u = +u || +c || 0, i = n[1] ? u + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = u, r.end = i)), i;
		}
		var P = {};
		function F(e) {
			var t, n = e.ownerDocument, r = e.nodeName, i = P[r];
			return i || (t = n.body.appendChild(n.createElement(r)), i = S.css(t, "display"), t.parentNode.removeChild(t), i === "none" && (i = "block"), P[r] = i, i);
		}
		function I(e, t) {
			for (var n, r, i = [], a = 0, o = e.length; a < o; a++) r = e[a], r.style && (n = r.style.display, t ? (n === "none" && (i[a] = j.get(r, "display") || null, i[a] || (r.style.display = "")), r.style.display === "" && Re(r) && (i[a] = F(r))) : n !== "none" && (i[a] = "none", j.set(r, "display", n)));
			for (a = 0; a < o; a++) i[a] != null && (e[a].style.display = i[a]);
			return e;
		}
		S.fn.extend({
			show: function() {
				return I(this, !0);
			},
			hide: function() {
				return I(this);
			},
			toggle: function(e) {
				return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function() {
					Re(this) ? S(this).show() : S(this).hide();
				});
			}
		});
		var L = /^(?:checkbox|radio)$/i, Be = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Ve = /^$|^module$|\/(?:java|ecma)script/i;
		(function() {
			var e = g.createDocumentFragment().appendChild(g.createElement("div")), t = g.createElement("input");
			t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), p.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", p.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, e.innerHTML = "<option></option>", p.option = !!e.lastChild;
		})();
		var He = {
			thead: [
				1,
				"<table>",
				"</table>"
			],
			col: [
				2,
				"<table><colgroup>",
				"</colgroup></table>"
			],
			tr: [
				2,
				"<table><tbody>",
				"</tbody></table>"
			],
			td: [
				3,
				"<table><tbody><tr>",
				"</tr></tbody></table>"
			],
			_default: [
				0,
				"",
				""
			]
		};
		He.tbody = He.tfoot = He.colgroup = He.caption = He.thead, He.th = He.td, p.option || (He.optgroup = He.option = [
			1,
			"<select multiple='multiple'>",
			"</select>"
		]);
		function Ue(e, t) {
			var n = e.getElementsByTagName === void 0 ? e.querySelectorAll === void 0 ? [] : e.querySelectorAll(t || "*") : e.getElementsByTagName(t || "*");
			return t === void 0 || t && w(e, t) ? S.merge([e], n) : n;
		}
		function We(e, t) {
			for (var n = 0, r = e.length; n < r; n++) j.set(e[n], "globalEval", !t || j.get(t[n], "globalEval"));
		}
		var Ge = /<|&#?\w+;/;
		function Ke(e, t, n, r, i) {
			for (var a, o, s, c, l, u, d = t.createDocumentFragment(), f = [], p = 0, m = e.length; p < m; p++) if (a = e[p], a || a === 0) if (y(a) === "object") S.merge(f, a.nodeType ? [a] : a);
			else if (!Ge.test(a)) f.push(t.createTextNode(a));
			else {
				for (o ||= d.appendChild(t.createElement("div")), s = (Be.exec(a) || ["", ""])[1].toLowerCase(), c = He[s] || He._default, o.innerHTML = c[1] + S.htmlPrefilter(a) + c[2], u = c[0]; u--;) o = o.lastChild;
				S.merge(f, o.childNodes), o = d.firstChild, o.textContent = "";
			}
			for (d.textContent = "", p = 0; a = f[p++];) {
				if (r && S.inArray(a, r) > -1) {
					i && i.push(a);
					continue;
				}
				if (l = Ie(a), o = Ue(d.appendChild(a), "script"), l && We(o), n) for (u = 0; a = o[u++];) Ve.test(a.type || "") && n.push(a);
			}
			return d;
		}
		var qe = /^([^.]*)(?:\.(.+)|)/;
		function Je() {
			return !0;
		}
		function Ye() {
			return !1;
		}
		function Xe(e, t, n, r, i, a) {
			var o, s;
			if (typeof t == "object") {
				for (s in typeof n != "string" && (r ||= n, n = void 0), t) Xe(e, s, n, r, t[s], a);
				return e;
			}
			if (r == null && i == null ? (i = n, r = n = void 0) : i ?? (typeof n == "string" ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), i === !1) i = Ye;
			else if (!i) return e;
			return a === 1 && (o = i, i = function(e) {
				return S().off(e), o.apply(this, arguments);
			}, i.guid = o.guid ||= S.guid++), e.each(function() {
				S.event.add(this, t, i, r, n);
			});
		}
		S.event = {
			global: {},
			add: function(e, t, n, r, i) {
				var a, o, s, c, l, u, d, f, p, m, h, g = j.get(e);
				if (De(e)) for (n.handler && (a = n, n = a.handler, i = a.selector), i && S.find.matchesSelector(Fe, i), n.guid ||= S.guid++, (c = g.events) || (c = g.events = Object.create(null)), (o = g.handle) || (o = g.handle = function(t) {
					return S !== void 0 && S.event.triggered !== t.type ? S.event.dispatch.apply(e, arguments) : void 0;
				}), t = (t || "").match(ge) || [""], l = t.length; l--;) s = qe.exec(t[l]) || [], p = h = s[1], m = (s[2] || "").split(".").sort(), p && (d = S.event.special[p] || {}, p = (i ? d.delegateType : d.bindType) || p, d = S.event.special[p] || {}, u = S.extend({
					type: p,
					origType: h,
					data: r,
					handler: n,
					guid: n.guid,
					selector: i,
					needsContext: i && S.expr.match.needsContext.test(i),
					namespace: m.join(".")
				}, a), (f = c[p]) || (f = c[p] = [], f.delegateCount = 0, (!d.setup || d.setup.call(e, r, m, o) === !1) && e.addEventListener && e.addEventListener(p, o)), d.add && (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)), i ? f.splice(f.delegateCount++, 0, u) : f.push(u), S.event.global[p] = !0);
			},
			remove: function(e, t, n, r, i) {
				var a, o, s, c, l, u, d, f, p, m, h, g = j.hasData(e) && j.get(e);
				if (!(!g || !(c = g.events))) {
					for (t = (t || "").match(ge) || [""], l = t.length; l--;) {
						if (s = qe.exec(t[l]) || [], p = h = s[1], m = (s[2] || "").split(".").sort(), !p) {
							for (p in c) S.event.remove(e, p + t[l], n, r, !0);
							continue;
						}
						for (d = S.event.special[p] || {}, p = (r ? d.delegateType : d.bindType) || p, f = c[p] || [], s = s[2] && RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = a = f.length; a--;) u = f[a], (i || h === u.origType) && (!n || n.guid === u.guid) && (!s || s.test(u.namespace)) && (!r || r === u.selector || r === "**" && u.selector) && (f.splice(a, 1), u.selector && f.delegateCount--, d.remove && d.remove.call(e, u));
						o && !f.length && ((!d.teardown || d.teardown.call(e, m, g.handle) === !1) && S.removeEvent(e, p, g.handle), delete c[p]);
					}
					S.isEmptyObject(c) && j.remove(e, "handle events");
				}
			},
			dispatch: function(e) {
				var t, n, r, i, a, o, s = Array(arguments.length), c = S.event.fix(e), l = (j.get(this, "events") || Object.create(null))[c.type] || [], u = S.event.special[c.type] || {};
				for (s[0] = c, t = 1; t < arguments.length; t++) s[t] = arguments[t];
				if (c.delegateTarget = this, !(u.preDispatch && u.preDispatch.call(this, c) === !1)) {
					for (o = S.event.handlers.call(this, c, l), t = 0; (i = o[t++]) && !c.isPropagationStopped();) for (c.currentTarget = i.elem, n = 0; (a = i.handlers[n++]) && !c.isImmediatePropagationStopped();) (!c.rnamespace || a.namespace === !1 || c.rnamespace.test(a.namespace)) && (c.handleObj = a, c.data = a.data, r = ((S.event.special[a.origType] || {}).handle || a.handler).apply(i.elem, s), r !== void 0 && (c.result = r) === !1 && (c.preventDefault(), c.stopPropagation()));
					return u.postDispatch && u.postDispatch.call(this, c), c.result;
				}
			},
			handlers: function(e, t) {
				var n, r, i, a, o, s = [], c = t.delegateCount, l = e.target;
				if (c && l.nodeType && !(e.type === "click" && e.button >= 1)) {
					for (; l !== this; l = l.parentNode || this) if (l.nodeType === 1 && !(e.type === "click" && l.disabled === !0)) {
						for (a = [], o = {}, n = 0; n < c; n++) r = t[n], i = r.selector + " ", o[i] === void 0 && (o[i] = r.needsContext ? S(i, this).index(l) > -1 : S.find(i, this, null, [l]).length), o[i] && a.push(r);
						a.length && s.push({
							elem: l,
							handlers: a
						});
					}
				}
				return l = this, c < t.length && s.push({
					elem: l,
					handlers: t.slice(c)
				}), s;
			},
			addProp: function(e, t) {
				Object.defineProperty(S.Event.prototype, e, {
					enumerable: !0,
					configurable: !0,
					get: m(t) ? function() {
						if (this.originalEvent) return t(this.originalEvent);
					} : function() {
						if (this.originalEvent) return this.originalEvent[e];
					},
					set: function(t) {
						Object.defineProperty(this, e, {
							enumerable: !0,
							configurable: !0,
							writable: !0,
							value: t
						});
					}
				});
			},
			fix: function(e) {
				return e[S.expando] ? e : new S.Event(e);
			},
			special: {
				load: { noBubble: !0 },
				click: {
					setup: function(e) {
						var t = this || e;
						return L.test(t.type) && t.click && w(t, "input") && Ze(t, "click", !0), !1;
					},
					trigger: function(e) {
						var t = this || e;
						return L.test(t.type) && t.click && w(t, "input") && Ze(t, "click"), !0;
					},
					_default: function(e) {
						var t = e.target;
						return L.test(t.type) && t.click && w(t, "input") && j.get(t, "click") || w(t, "a");
					}
				},
				beforeunload: { postDispatch: function(e) {
					e.result !== void 0 && e.originalEvent && (e.originalEvent.returnValue = e.result);
				} }
			}
		};
		function Ze(e, t, n) {
			if (!n) {
				j.get(e, t) === void 0 && S.event.add(e, t, Je);
				return;
			}
			j.set(e, t, !1), S.event.add(e, t, {
				namespace: !1,
				handler: function(e) {
					var n, r = j.get(this, t);
					if (e.isTrigger & 1 && this[t]) {
						if (r) (S.event.special[t] || {}).delegateType && e.stopPropagation();
						else if (r = i.call(arguments), j.set(this, t, r), this[t](), n = j.get(this, t), j.set(this, t, !1), r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n;
					} else r && (j.set(this, t, S.event.trigger(r[0], r.slice(1), this)), e.stopPropagation(), e.isImmediatePropagationStopped = Je);
				}
			});
		}
		S.removeEvent = function(e, t, n) {
			e.removeEventListener && e.removeEventListener(t, n);
		}, S.Event = function(e, t) {
			if (!(this instanceof S.Event)) return new S.Event(e, t);
			e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === void 0 && e.returnValue === !1 ? Je : Ye, this.target = e.target && e.target.nodeType === 3 ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0;
		}, S.Event.prototype = {
			constructor: S.Event,
			isDefaultPrevented: Ye,
			isPropagationStopped: Ye,
			isImmediatePropagationStopped: Ye,
			isSimulated: !1,
			preventDefault: function() {
				var e = this.originalEvent;
				this.isDefaultPrevented = Je, e && !this.isSimulated && e.preventDefault();
			},
			stopPropagation: function() {
				var e = this.originalEvent;
				this.isPropagationStopped = Je, e && !this.isSimulated && e.stopPropagation();
			},
			stopImmediatePropagation: function() {
				var e = this.originalEvent;
				this.isImmediatePropagationStopped = Je, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
			}
		}, S.each({
			altKey: !0,
			bubbles: !0,
			cancelable: !0,
			changedTouches: !0,
			ctrlKey: !0,
			detail: !0,
			eventPhase: !0,
			metaKey: !0,
			pageX: !0,
			pageY: !0,
			shiftKey: !0,
			view: !0,
			char: !0,
			code: !0,
			charCode: !0,
			key: !0,
			keyCode: !0,
			button: !0,
			buttons: !0,
			clientX: !0,
			clientY: !0,
			offsetX: !0,
			offsetY: !0,
			pointerId: !0,
			pointerType: !0,
			screenX: !0,
			screenY: !0,
			targetTouches: !0,
			toElement: !0,
			touches: !0,
			which: !0
		}, S.event.addProp), S.each({
			focus: "focusin",
			blur: "focusout"
		}, function(e, t) {
			function n(e) {
				if (g.documentMode) {
					var n = j.get(this, "handle"), r = S.event.fix(e);
					r.type = e.type === "focusin" ? "focus" : "blur", r.isSimulated = !0, n(e), r.target === r.currentTarget && n(r);
				} else S.event.simulate(t, e.target, S.event.fix(e));
			}
			S.event.special[e] = {
				setup: function() {
					var r;
					if (Ze(this, e, !0), g.documentMode) r = j.get(this, t), r || this.addEventListener(t, n), j.set(this, t, (r || 0) + 1);
					else return !1;
				},
				trigger: function() {
					return Ze(this, e), !0;
				},
				teardown: function() {
					var e;
					if (g.documentMode) e = j.get(this, t) - 1, e ? j.set(this, t, e) : (this.removeEventListener(t, n), j.remove(this, t));
					else return !1;
				},
				_default: function(t) {
					return j.get(t.target, e);
				},
				delegateType: t
			}, S.event.special[t] = {
				setup: function() {
					var r = this.ownerDocument || this.document || this, i = g.documentMode ? this : r, a = j.get(i, t);
					a || (g.documentMode ? this.addEventListener(t, n) : r.addEventListener(e, n, !0)), j.set(i, t, (a || 0) + 1);
				},
				teardown: function() {
					var r = this.ownerDocument || this.document || this, i = g.documentMode ? this : r, a = j.get(i, t) - 1;
					a ? j.set(i, t, a) : (g.documentMode ? this.removeEventListener(t, n) : r.removeEventListener(e, n, !0), j.remove(i, t));
				}
			};
		}), S.each({
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function(e, t) {
			S.event.special[e] = {
				delegateType: t,
				bindType: t,
				handle: function(e) {
					var n, r = this, i = e.relatedTarget, a = e.handleObj;
					return (!i || i !== r && !S.contains(r, i)) && (e.type = a.origType, n = a.handler.apply(this, arguments), e.type = t), n;
				}
			};
		}), S.fn.extend({
			on: function(e, t, n, r) {
				return Xe(this, e, t, n, r);
			},
			one: function(e, t, n, r) {
				return Xe(this, e, t, n, r, 1);
			},
			off: function(e, t, n) {
				var r, i;
				if (e && e.preventDefault && e.handleObj) return r = e.handleObj, S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
				if (typeof e == "object") {
					for (i in e) this.off(i, t, e[i]);
					return this;
				}
				return (t === !1 || typeof t == "function") && (n = t, t = void 0), n === !1 && (n = Ye), this.each(function() {
					S.event.remove(this, e, n, t);
				});
			}
		});
		var Qe = /<script|<style|<link/i, $e = /checked\s*(?:[^=]|=\s*.checked.)/i, et = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
		function tt(e, t) {
			return w(e, "table") && w(t.nodeType === 11 ? t.firstChild : t, "tr") && S(e).children("tbody")[0] || e;
		}
		function nt(e) {
			return e.type = (e.getAttribute("type") !== null) + "/" + e.type, e;
		}
		function rt(e) {
			return (e.type || "").slice(0, 5) === "true/" ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
		}
		function it(e, t) {
			var n, r, i, a, o, s, c;
			if (t.nodeType === 1) {
				if (j.hasData(e) && (a = j.get(e), c = a.events, c)) for (i in j.remove(t, "handle events"), c) for (n = 0, r = c[i].length; n < r; n++) S.event.add(t, i, c[i][n]);
				M.hasData(e) && (o = M.access(e), s = S.extend({}, o), M.set(t, s));
			}
		}
		function at(e, t) {
			var n = t.nodeName.toLowerCase();
			n === "input" && L.test(e.type) ? t.checked = e.checked : (n === "input" || n === "textarea") && (t.defaultValue = e.defaultValue);
		}
		function R(e, t, n, r) {
			t = a(t);
			var i, o, s, c, l, u, d = 0, f = e.length, h = f - 1, g = t[0], _ = m(g);
			if (_ || f > 1 && typeof g == "string" && !p.checkClone && $e.test(g)) return e.each(function(i) {
				var a = e.eq(i);
				_ && (t[0] = g.call(this, i, a.html())), R(a, t, n, r);
			});
			if (f && (i = Ke(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, i.childNodes.length === 1 && (i = o), o || r)) {
				for (s = S.map(Ue(i, "script"), nt), c = s.length; d < f; d++) l = i, d !== h && (l = S.clone(l, !0, !0), c && S.merge(s, Ue(l, "script"))), n.call(e[d], l, d);
				if (c) for (u = s[s.length - 1].ownerDocument, S.map(s, rt), d = 0; d < c; d++) l = s[d], Ve.test(l.type || "") && !j.access(l, "globalEval") && S.contains(u, l) && (l.src && (l.type || "").toLowerCase() !== "module" ? S._evalUrl && !l.noModule && S._evalUrl(l.src, { nonce: l.nonce || l.getAttribute("nonce") }, u) : v(l.textContent.replace(et, ""), l, u));
			}
			return e;
		}
		function ot(e, t, n) {
			for (var r, i = t ? S.filter(t, e) : e, a = 0; (r = i[a]) != null; a++) !n && r.nodeType === 1 && S.cleanData(Ue(r)), r.parentNode && (n && Ie(r) && We(Ue(r, "script")), r.parentNode.removeChild(r));
			return e;
		}
		S.extend({
			htmlPrefilter: function(e) {
				return e;
			},
			clone: function(e, t, n) {
				var r, i, a, o, s = e.cloneNode(!0), c = Ie(e);
				if (!p.noCloneChecked && (e.nodeType === 1 || e.nodeType === 11) && !S.isXMLDoc(e)) for (o = Ue(s), a = Ue(e), r = 0, i = a.length; r < i; r++) at(a[r], o[r]);
				if (t) if (n) for (a ||= Ue(e), o ||= Ue(s), r = 0, i = a.length; r < i; r++) it(a[r], o[r]);
				else it(e, s);
				return o = Ue(s, "script"), o.length > 0 && We(o, !c && Ue(e, "script")), s;
			},
			cleanData: function(e) {
				for (var t, n, r, i = S.event.special, a = 0; (n = e[a]) !== void 0; a++) if (De(n)) {
					if (t = n[j.expando]) {
						if (t.events) for (r in t.events) i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
						n[j.expando] = void 0;
					}
					n[M.expando] && (n[M.expando] = void 0);
				}
			}
		}), S.fn.extend({
			detach: function(e) {
				return ot(this, e, !0);
			},
			remove: function(e) {
				return ot(this, e);
			},
			text: function(e) {
				return we(this, function(e) {
					return e === void 0 ? S.text(this) : this.empty().each(function() {
						(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && (this.textContent = e);
					});
				}, null, e, arguments.length);
			},
			append: function() {
				return R(this, arguments, function(e) {
					(this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) && tt(this, e).appendChild(e);
				});
			},
			prepend: function() {
				return R(this, arguments, function(e) {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						var t = tt(this, e);
						t.insertBefore(e, t.firstChild);
					}
				});
			},
			before: function() {
				return R(this, arguments, function(e) {
					this.parentNode && this.parentNode.insertBefore(e, this);
				});
			},
			after: function() {
				return R(this, arguments, function(e) {
					this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
				});
			},
			empty: function() {
				for (var e, t = 0; (e = this[t]) != null; t++) e.nodeType === 1 && (S.cleanData(Ue(e, !1)), e.textContent = "");
				return this;
			},
			clone: function(e, t) {
				return e ??= !1, t ??= e, this.map(function() {
					return S.clone(this, e, t);
				});
			},
			html: function(e) {
				return we(this, function(e) {
					var t = this[0] || {}, n = 0, r = this.length;
					if (e === void 0 && t.nodeType === 1) return t.innerHTML;
					if (typeof e == "string" && !Qe.test(e) && !He[(Be.exec(e) || ["", ""])[1].toLowerCase()]) {
						e = S.htmlPrefilter(e);
						try {
							for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (S.cleanData(Ue(t, !1)), t.innerHTML = e);
							t = 0;
						} catch {}
					}
					t && this.empty().append(e);
				}, null, e, arguments.length);
			},
			replaceWith: function() {
				var e = [];
				return R(this, arguments, function(t) {
					var n = this.parentNode;
					S.inArray(this, e) < 0 && (S.cleanData(Ue(this)), n && n.replaceChild(t, this));
				}, e);
			}
		}), S.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function(e, t) {
			S.fn[e] = function(e) {
				for (var n, r = [], i = S(e), a = i.length - 1, s = 0; s <= a; s++) n = s === a ? this : this.clone(!0), S(i[s])[t](n), o.apply(r, n.get());
				return this.pushStack(r);
			};
		});
		var st = RegExp("^(" + Me + ")(?!px)[a-z%]+$", "i"), ct = /^--/, lt = function(t) {
			var n = t.ownerDocument.defaultView;
			return (!n || !n.opener) && (n = e), n.getComputedStyle(t);
		}, ut = function(e, t, n) {
			var r, i, a = {};
			for (i in t) a[i] = e.style[i], e.style[i] = t[i];
			for (i in r = n.call(e), t) e.style[i] = a[i];
			return r;
		}, dt = new RegExp(Pe.join("|"), "i");
		(function() {
			function t() {
				if (u) {
					l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", Fe.appendChild(l).appendChild(u);
					var t = e.getComputedStyle(u);
					r = t.top !== "1%", c = n(t.marginLeft) === 12, u.style.right = "60%", o = n(t.right) === 36, i = n(t.width) === 36, u.style.position = "absolute", a = n(u.offsetWidth / 3) === 12, Fe.removeChild(l), u = null;
				}
			}
			function n(e) {
				return Math.round(parseFloat(e));
			}
			var r, i, a, o, s, c, l = g.createElement("div"), u = g.createElement("div");
			u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", p.clearCloneStyle = u.style.backgroundClip === "content-box", S.extend(p, {
				boxSizingReliable: function() {
					return t(), i;
				},
				pixelBoxStyles: function() {
					return t(), o;
				},
				pixelPosition: function() {
					return t(), r;
				},
				reliableMarginLeft: function() {
					return t(), c;
				},
				scrollboxSize: function() {
					return t(), a;
				},
				reliableTrDimensions: function() {
					var t, n, r, i;
					return s ?? (t = g.createElement("table"), n = g.createElement("tr"), r = g.createElement("div"), t.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", n.style.cssText = "border:1px solid", n.style.height = "1px", r.style.height = "9px", r.style.display = "block", Fe.appendChild(t).appendChild(n).appendChild(r), i = e.getComputedStyle(n), s = parseInt(i.height, 10) + parseInt(i.borderTopWidth, 10) + parseInt(i.borderBottomWidth, 10) === n.offsetHeight, Fe.removeChild(t)), s;
				}
			}));
		})();
		function ft(e, t, n) {
			var r, i, a, o, s = ct.test(t), c = e.style;
			return n ||= lt(e), n && (o = n.getPropertyValue(t) || n[t], s && o && (o = o.replace(ee, "$1") || void 0), o === "" && !Ie(e) && (o = S.style(e, t)), !p.pixelBoxStyles() && st.test(o) && dt.test(t) && (r = c.width, i = c.minWidth, a = c.maxWidth, c.minWidth = c.maxWidth = c.width = o, o = n.width, c.width = r, c.minWidth = i, c.maxWidth = a)), o === void 0 ? o : o + "";
		}
		function pt(e, t) {
			return { get: function() {
				if (e()) {
					delete this.get;
					return;
				}
				return (this.get = t).apply(this, arguments);
			} };
		}
		var mt = [
			"Webkit",
			"Moz",
			"ms"
		], ht = g.createElement("div").style, gt = {};
		function _t(e) {
			for (var t = e[0].toUpperCase() + e.slice(1), n = mt.length; n--;) if (e = mt[n] + t, e in ht) return e;
		}
		function vt(e) {
			return S.cssProps[e] || gt[e] || (e in ht ? e : gt[e] = _t(e) || e);
		}
		var yt = /^(none|table(?!-c[ea]).+)/, bt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		}, xt = {
			letterSpacing: "0",
			fontWeight: "400"
		};
		function St(e, t, n) {
			var r = Ne.exec(t);
			return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
		}
		function Ct(e, t, n, r, i, a) {
			var o = +(t === "width"), s = 0, c = 0, l = 0;
			if (n === (r ? "border" : "content")) return 0;
			for (; o < 4; o += 2) n === "margin" && (l += S.css(e, n + Pe[o], !0, i)), r ? (n === "content" && (c -= S.css(e, "padding" + Pe[o], !0, i)), n !== "margin" && (c -= S.css(e, "border" + Pe[o] + "Width", !0, i))) : (c += S.css(e, "padding" + Pe[o], !0, i), n === "padding" ? s += S.css(e, "border" + Pe[o] + "Width", !0, i) : c += S.css(e, "border" + Pe[o] + "Width", !0, i));
			return !r && a >= 0 && (c += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - a - c - s - .5)) || 0), c + l;
		}
		function wt(e, t, n) {
			var r = lt(e), i = (!p.boxSizingReliable() || n) && S.css(e, "boxSizing", !1, r) === "border-box", a = i, o = ft(e, t, r), s = "offset" + t[0].toUpperCase() + t.slice(1);
			if (st.test(o)) {
				if (!n) return o;
				o = "auto";
			}
			return (!p.boxSizingReliable() && i || !p.reliableTrDimensions() && w(e, "tr") || o === "auto" || !parseFloat(o) && S.css(e, "display", !1, r) === "inline") && e.getClientRects().length && (i = S.css(e, "boxSizing", !1, r) === "border-box", a = s in e, a && (o = e[s])), o = parseFloat(o) || 0, o + Ct(e, t, n || (i ? "border" : "content"), a, r, o) + "px";
		}
		S.extend({
			cssHooks: { opacity: { get: function(e, t) {
				if (t) {
					var n = ft(e, "opacity");
					return n === "" ? "1" : n;
				}
			} } },
			cssNumber: {
				animationIterationCount: !0,
				aspectRatio: !0,
				borderImageSlice: !0,
				columnCount: !0,
				flexGrow: !0,
				flexShrink: !0,
				fontWeight: !0,
				gridArea: !0,
				gridColumn: !0,
				gridColumnEnd: !0,
				gridColumnStart: !0,
				gridRow: !0,
				gridRowEnd: !0,
				gridRowStart: !0,
				lineHeight: !0,
				opacity: !0,
				order: !0,
				orphans: !0,
				scale: !0,
				widows: !0,
				zIndex: !0,
				zoom: !0,
				fillOpacity: !0,
				floodOpacity: !0,
				stopOpacity: !0,
				strokeMiterlimit: !0,
				strokeOpacity: !0
			},
			cssProps: {},
			style: function(e, t, n, r) {
				if (!(!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)) {
					var i, a, o, s = A(t), c = ct.test(t), l = e.style;
					if (c || (t = vt(s)), o = S.cssHooks[t] || S.cssHooks[s], n !== void 0) {
						if (a = typeof n, a === "string" && (i = Ne.exec(n)) && i[1] && (n = ze(e, t, i), a = "number"), n == null || n !== n) return;
						a === "number" && !c && (n += i && i[3] || (S.cssNumber[s] ? "" : "px")), !p.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (l[t] = "inherit"), (!o || !("set" in o) || (n = o.set(e, n, r)) !== void 0) && (c ? l.setProperty(t, n) : l[t] = n);
					} else return o && "get" in o && (i = o.get(e, !1, r)) !== void 0 ? i : l[t];
				}
			},
			css: function(e, t, n, r) {
				var i, a, o, s = A(t);
				return ct.test(t) || (t = vt(s)), o = S.cssHooks[t] || S.cssHooks[s], o && "get" in o && (i = o.get(e, !0, n)), i === void 0 && (i = ft(e, t, r)), i === "normal" && t in xt && (i = xt[t]), n === "" || n ? (a = parseFloat(i), n === !0 || isFinite(a) ? a || 0 : i) : i;
			}
		}), S.each(["height", "width"], function(e, t) {
			S.cssHooks[t] = {
				get: function(e, n, r) {
					if (n) return yt.test(S.css(e, "display")) && (!e.getClientRects().length || !e.getBoundingClientRect().width) ? ut(e, bt, function() {
						return wt(e, t, r);
					}) : wt(e, t, r);
				},
				set: function(e, n, r) {
					var i, a = lt(e), o = !p.scrollboxSize() && a.position === "absolute", s = (o || r) && S.css(e, "boxSizing", !1, a) === "border-box", c = r ? Ct(e, t, r, s, a) : 0;
					return s && o && (c -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(a[t]) - Ct(e, t, "border", !1, a) - .5)), c && (i = Ne.exec(n)) && (i[3] || "px") !== "px" && (e.style[t] = n, n = S.css(e, t)), St(e, n, c);
				}
			};
		}), S.cssHooks.marginLeft = pt(p.reliableMarginLeft, function(e, t) {
			if (t) return (parseFloat(ft(e, "marginLeft")) || e.getBoundingClientRect().left - ut(e, { marginLeft: 0 }, function() {
				return e.getBoundingClientRect().left;
			})) + "px";
		}), S.each({
			margin: "",
			padding: "",
			border: "Width"
		}, function(e, t) {
			S.cssHooks[e + t] = { expand: function(n) {
				for (var r = 0, i = {}, a = typeof n == "string" ? n.split(" ") : [n]; r < 4; r++) i[e + Pe[r] + t] = a[r] || a[r - 2] || a[0];
				return i;
			} }, e !== "margin" && (S.cssHooks[e + t].set = St);
		}), S.fn.extend({ css: function(e, t) {
			return we(this, function(e, t, n) {
				var r, i, a = {}, o = 0;
				if (Array.isArray(t)) {
					for (r = lt(e), i = t.length; o < i; o++) a[t[o]] = S.css(e, t[o], !1, r);
					return a;
				}
				return n === void 0 ? S.css(e, t) : S.style(e, t, n);
			}, e, t, arguments.length > 1);
		} });
		function z(e, t, n, r, i) {
			return new z.prototype.init(e, t, n, r, i);
		}
		S.Tween = z, z.prototype = {
			constructor: z,
			init: function(e, t, n, r, i, a) {
				this.elem = e, this.prop = n, this.easing = i || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = a || (S.cssNumber[n] ? "" : "px");
			},
			cur: function() {
				var e = z.propHooks[this.prop];
				return e && e.get ? e.get(this) : z.propHooks._default.get(this);
			},
			run: function(e) {
				var t, n = z.propHooks[this.prop];
				return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : z.propHooks._default.set(this), this;
			}
		}, z.prototype.init.prototype = z.prototype, z.propHooks = { _default: {
			get: function(e) {
				var t;
				return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t);
			},
			set: function(e) {
				S.fx.step[e.prop] ? S.fx.step[e.prop](e) : e.elem.nodeType === 1 && (S.cssHooks[e.prop] || e.elem.style[vt(e.prop)] != null) ? S.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
			}
		} }, z.propHooks.scrollTop = z.propHooks.scrollLeft = { set: function(e) {
			e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
		} }, S.easing = {
			linear: function(e) {
				return e;
			},
			swing: function(e) {
				return .5 - Math.cos(e * Math.PI) / 2;
			},
			_default: "swing"
		}, S.fx = z.prototype.init, S.fx.step = {};
		var Tt, Et, Dt = /^(?:toggle|show|hide)$/, Ot = /queueHooks$/;
		function kt() {
			Et && (g.hidden === !1 && e.requestAnimationFrame ? e.requestAnimationFrame(kt) : e.setTimeout(kt, S.fx.interval), S.fx.tick());
		}
		function At() {
			return e.setTimeout(function() {
				Tt = void 0;
			}), Tt = Date.now();
		}
		function jt(e, t) {
			var n, r = 0, i = { height: e };
			for (t = +!!t; r < 4; r += 2 - t) n = Pe[r], i["margin" + n] = i["padding" + n] = e;
			return t && (i.opacity = i.width = e), i;
		}
		function Mt(e, t, n) {
			for (var r, i = (Pt.tweeners[t] || []).concat(Pt.tweeners["*"]), a = 0, o = i.length; a < o; a++) if (r = i[a].call(n, t, e)) return r;
		}
		function Nt(e, t, n) {
			var r, i, a, o, s, c, l, u, d = "width" in t || "height" in t, f = this, p = {}, m = e.style, h = e.nodeType && Re(e), g = j.get(e, "fxshow");
			for (r in n.queue || (o = S._queueHooks(e, "fx"), o.unqueued ?? (o.unqueued = 0, s = o.empty.fire, o.empty.fire = function() {
				o.unqueued || s();
			}), o.unqueued++, f.always(function() {
				f.always(function() {
					o.unqueued--, S.queue(e, "fx").length || o.empty.fire();
				});
			})), t) if (i = t[r], Dt.test(i)) {
				if (delete t[r], a ||= i === "toggle", i === (h ? "hide" : "show")) if (i === "show" && g && g[r] !== void 0) h = !0;
				else continue;
				p[r] = g && g[r] || S.style(e, r);
			}
			if (c = !S.isEmptyObject(t), !(!c && S.isEmptyObject(p))) for (r in d && e.nodeType === 1 && (n.overflow = [
				m.overflow,
				m.overflowX,
				m.overflowY
			], l = g && g.display, l ??= j.get(e, "display"), u = S.css(e, "display"), u === "none" && (l ? u = l : (I([e], !0), l = e.style.display || l, u = S.css(e, "display"), I([e]))), (u === "inline" || u === "inline-block" && l != null) && S.css(e, "float") === "none" && (c || (f.done(function() {
				m.display = l;
			}), l ??= (u = m.display, u === "none" ? "" : u)), m.display = "inline-block")), n.overflow && (m.overflow = "hidden", f.always(function() {
				m.overflow = n.overflow[0], m.overflowX = n.overflow[1], m.overflowY = n.overflow[2];
			})), c = !1, p) c || (g ? "hidden" in g && (h = g.hidden) : g = j.access(e, "fxshow", { display: l }), a && (g.hidden = !h), h && I([e], !0), f.done(function() {
				for (r in h || I([e]), j.remove(e, "fxshow"), p) S.style(e, r, p[r]);
			})), c = Mt(h ? g[r] : 0, r, f), r in g || (g[r] = c.start, h && (c.end = c.start, c.start = 0));
		}
		function B(e, t) {
			var n, r, i, a, o;
			for (n in e) if (r = A(n), i = t[r], a = e[n], Array.isArray(a) && (i = a[1], a = e[n] = a[0]), n !== r && (e[r] = a, delete e[n]), o = S.cssHooks[r], o && "expand" in o) for (n in a = o.expand(a), delete e[r], a) n in e || (e[n] = a[n], t[n] = i);
			else t[r] = i;
		}
		function Pt(e, t, n) {
			var r, i, a = 0, o = Pt.prefilters.length, s = S.Deferred().always(function() {
				delete c.elem;
			}), c = function() {
				if (i) return !1;
				for (var t = Tt || At(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), a = 0, o = l.tweens.length; a < o; a++) l.tweens[a].run(r);
				return s.notifyWith(e, [
					l,
					r,
					n
				]), r < 1 && o ? n : (o || s.notifyWith(e, [
					l,
					1,
					0
				]), s.resolveWith(e, [l]), !1);
			}, l = s.promise({
				elem: e,
				props: S.extend({}, t),
				opts: S.extend(!0, {
					specialEasing: {},
					easing: S.easing._default
				}, n),
				originalProperties: t,
				originalOptions: n,
				startTime: Tt || At(),
				duration: n.duration,
				tweens: [],
				createTween: function(t, n) {
					var r = S.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
					return l.tweens.push(r), r;
				},
				stop: function(t) {
					var n = 0, r = t ? l.tweens.length : 0;
					if (i) return this;
					for (i = !0; n < r; n++) l.tweens[n].run(1);
					return t ? (s.notifyWith(e, [
						l,
						1,
						0
					]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this;
				}
			}), u = l.props;
			for (B(u, l.opts.specialEasing); a < o; a++) if (r = Pt.prefilters[a].call(l, e, u, l.opts), r) return m(r.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
			return S.map(u, Mt, l), m(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), S.fx.timer(S.extend(c, {
				elem: e,
				anim: l,
				queue: l.opts.queue
			})), l;
		}
		S.Animation = S.extend(Pt, {
			tweeners: { "*": [function(e, t) {
				var n = this.createTween(e, t);
				return ze(n.elem, e, Ne.exec(t), n), n;
			}] },
			tweener: function(e, t) {
				m(e) ? (t = e, e = ["*"]) : e = e.match(ge);
				for (var n, r = 0, i = e.length; r < i; r++) n = e[r], Pt.tweeners[n] = Pt.tweeners[n] || [], Pt.tweeners[n].unshift(t);
			},
			prefilters: [Nt],
			prefilter: function(e, t) {
				t ? Pt.prefilters.unshift(e) : Pt.prefilters.push(e);
			}
		}), S.speed = function(e, t, n) {
			var r = e && typeof e == "object" ? S.extend({}, e) : {
				complete: n || !n && t || m(e) && e,
				duration: e,
				easing: n && t || t && !m(t) && t
			};
			return S.fx.off ? r.duration = 0 : typeof r.duration != "number" && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default), (r.queue == null || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
				m(r.old) && r.old.call(this), r.queue && S.dequeue(this, r.queue);
			}, r;
		}, S.fn.extend({
			fadeTo: function(e, t, n, r) {
				return this.filter(Re).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
			},
			animate: function(e, t, n, r) {
				var i = S.isEmptyObject(e), a = S.speed(t, n, r), o = function() {
					var t = Pt(this, S.extend({}, e), a);
					(i || j.get(this, "finish")) && t.stop(!0);
				};
				return o.finish = o, i || a.queue === !1 ? this.each(o) : this.queue(a.queue, o);
			},
			stop: function(e, t, n) {
				var r = function(e) {
					var t = e.stop;
					delete e.stop, t(n);
				};
				return typeof e != "string" && (n = t, t = e, e = void 0), t && this.queue(e || "fx", []), this.each(function() {
					var t = !0, i = e != null && e + "queueHooks", a = S.timers, o = j.get(this);
					if (i) o[i] && o[i].stop && r(o[i]);
					else for (i in o) o[i] && o[i].stop && Ot.test(i) && r(o[i]);
					for (i = a.length; i--;) a[i].elem === this && (e == null || a[i].queue === e) && (a[i].anim.stop(n), t = !1, a.splice(i, 1));
					(t || !n) && S.dequeue(this, e);
				});
			},
			finish: function(e) {
				return e !== !1 && (e ||= "fx"), this.each(function() {
					var t, n = j.get(this), r = n[e + "queue"], i = n[e + "queueHooks"], a = S.timers, o = r ? r.length : 0;
					for (n.finish = !0, S.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = a.length; t--;) a[t].elem === this && a[t].queue === e && (a[t].anim.stop(!0), a.splice(t, 1));
					for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
					delete n.finish;
				});
			}
		}), S.each([
			"toggle",
			"show",
			"hide"
		], function(e, t) {
			var n = S.fn[t];
			S.fn[t] = function(e, r, i) {
				return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(jt(t, !0), e, r, i);
			};
		}), S.each({
			slideDown: jt("show"),
			slideUp: jt("hide"),
			slideToggle: jt("toggle"),
			fadeIn: { opacity: "show" },
			fadeOut: { opacity: "hide" },
			fadeToggle: { opacity: "toggle" }
		}, function(e, t) {
			S.fn[e] = function(e, n, r) {
				return this.animate(t, e, n, r);
			};
		}), S.timers = [], S.fx.tick = function() {
			var e, t = 0, n = S.timers;
			for (Tt = Date.now(); t < n.length; t++) e = n[t], !e() && n[t] === e && n.splice(t--, 1);
			n.length || S.fx.stop(), Tt = void 0;
		}, S.fx.timer = function(e) {
			S.timers.push(e), S.fx.start();
		}, S.fx.interval = 13, S.fx.start = function() {
			Et || (Et = !0, kt());
		}, S.fx.stop = function() {
			Et = null;
		}, S.fx.speeds = {
			slow: 600,
			fast: 200,
			_default: 400
		}, S.fn.delay = function(t, n) {
			return t = S.fx && S.fx.speeds[t] || t, n ||= "fx", this.queue(n, function(n, r) {
				var i = e.setTimeout(n, t);
				r.stop = function() {
					e.clearTimeout(i);
				};
			});
		}, (function() {
			var e = g.createElement("input"), t = g.createElement("select").appendChild(g.createElement("option"));
			e.type = "checkbox", p.checkOn = e.value !== "", p.optSelected = t.selected, e = g.createElement("input"), e.value = "t", e.type = "radio", p.radioValue = e.value === "t";
		})();
		var Ft, V = S.expr.attrHandle;
		S.fn.extend({
			attr: function(e, t) {
				return we(this, S.attr, e, t, arguments.length > 1);
			},
			removeAttr: function(e) {
				return this.each(function() {
					S.removeAttr(this, e);
				});
			}
		}), S.extend({
			attr: function(e, t, n) {
				var r, i, a = e.nodeType;
				if (!(a === 3 || a === 8 || a === 2)) {
					if (e.getAttribute === void 0) return S.prop(e, t, n);
					if ((a !== 1 || !S.isXMLDoc(e)) && (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? Ft : void 0)), n !== void 0) {
						if (n === null) {
							S.removeAttr(e, t);
							return;
						}
						return i && "set" in i && (r = i.set(e, n, t)) !== void 0 ? r : (e.setAttribute(t, n + ""), n);
					}
					return i && "get" in i && (r = i.get(e, t)) !== null ? r : (r = S.find.attr(e, t), r ?? void 0);
				}
			},
			attrHooks: { type: { set: function(e, t) {
				if (!p.radioValue && t === "radio" && w(e, "input")) {
					var n = e.value;
					return e.setAttribute("type", t), n && (e.value = n), t;
				}
			} } },
			removeAttr: function(e, t) {
				var n, r = 0, i = t && t.match(ge);
				if (i && e.nodeType === 1) for (; n = i[r++];) e.removeAttribute(n);
			}
		}), Ft = { set: function(e, t, n) {
			return t === !1 ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
		} }, S.each(S.expr.match.bool.source.match(/\w+/g), function(e, t) {
			var n = V[t] || S.find.attr;
			V[t] = function(e, t, r) {
				var i, a, o = t.toLowerCase();
				return r || (a = V[o], V[o] = i, i = n(e, t, r) == null ? null : o, V[o] = a), i;
			};
		});
		var It = /^(?:input|select|textarea|button)$/i, Lt = /^(?:a|area)$/i;
		S.fn.extend({
			prop: function(e, t) {
				return we(this, S.prop, e, t, arguments.length > 1);
			},
			removeProp: function(e) {
				return this.each(function() {
					delete this[S.propFix[e] || e];
				});
			}
		}), S.extend({
			prop: function(e, t, n) {
				var r, i, a = e.nodeType;
				if (!(a === 3 || a === 8 || a === 2)) return (a !== 1 || !S.isXMLDoc(e)) && (t = S.propFix[t] || t, i = S.propHooks[t]), n === void 0 ? i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t] : i && "set" in i && (r = i.set(e, n, t)) !== void 0 ? r : e[t] = n;
			},
			propHooks: { tabIndex: { get: function(e) {
				var t = S.find.attr(e, "tabindex");
				return t ? parseInt(t, 10) : It.test(e.nodeName) || Lt.test(e.nodeName) && e.href ? 0 : -1;
			} } },
			propFix: {
				for: "htmlFor",
				class: "className"
			}
		}), p.optSelected || (S.propHooks.selected = {
			get: function(e) {
				var t = e.parentNode;
				return t && t.parentNode && t.parentNode.selectedIndex, null;
			},
			set: function(e) {
				var t = e.parentNode;
				t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
			}
		}), S.each([
			"tabIndex",
			"readOnly",
			"maxLength",
			"cellSpacing",
			"cellPadding",
			"rowSpan",
			"colSpan",
			"useMap",
			"frameBorder",
			"contentEditable"
		], function() {
			S.propFix[this.toLowerCase()] = this;
		});
		function Rt(e) {
			return (e.match(ge) || []).join(" ");
		}
		function zt(e) {
			return e.getAttribute && e.getAttribute("class") || "";
		}
		function Bt(e) {
			return Array.isArray(e) ? e : typeof e == "string" && e.match(ge) || [];
		}
		S.fn.extend({
			addClass: function(e) {
				var t, n, r, i, a, o;
				return m(e) ? this.each(function(t) {
					S(this).addClass(e.call(this, t, zt(this)));
				}) : (t = Bt(e), t.length ? this.each(function() {
					if (r = zt(this), n = this.nodeType === 1 && " " + Rt(r) + " ", n) {
						for (a = 0; a < t.length; a++) i = t[a], n.indexOf(" " + i + " ") < 0 && (n += i + " ");
						o = Rt(n), r !== o && this.setAttribute("class", o);
					}
				}) : this);
			},
			removeClass: function(e) {
				var t, n, r, i, a, o;
				return m(e) ? this.each(function(t) {
					S(this).removeClass(e.call(this, t, zt(this)));
				}) : arguments.length ? (t = Bt(e), t.length ? this.each(function() {
					if (r = zt(this), n = this.nodeType === 1 && " " + Rt(r) + " ", n) {
						for (a = 0; a < t.length; a++) for (i = t[a]; n.indexOf(" " + i + " ") > -1;) n = n.replace(" " + i + " ", " ");
						o = Rt(n), r !== o && this.setAttribute("class", o);
					}
				}) : this) : this.attr("class", "");
			},
			toggleClass: function(e, t) {
				var n, r, i, a, o = typeof e, s = o === "string" || Array.isArray(e);
				return m(e) ? this.each(function(n) {
					S(this).toggleClass(e.call(this, n, zt(this), t), t);
				}) : typeof t == "boolean" && s ? t ? this.addClass(e) : this.removeClass(e) : (n = Bt(e), this.each(function() {
					if (s) for (a = S(this), i = 0; i < n.length; i++) r = n[i], a.hasClass(r) ? a.removeClass(r) : a.addClass(r);
					else (e === void 0 || o === "boolean") && (r = zt(this), r && j.set(this, "__className__", r), this.setAttribute && this.setAttribute("class", r || e === !1 ? "" : j.get(this, "__className__") || ""));
				}));
			},
			hasClass: function(e) {
				var t, n, r = 0;
				for (t = " " + e + " "; n = this[r++];) if (n.nodeType === 1 && (" " + Rt(zt(n)) + " ").indexOf(t) > -1) return !0;
				return !1;
			}
		});
		var Vt = /\r/g;
		S.fn.extend({ val: function(e) {
			var t, n, r, i = this[0];
			return arguments.length ? (r = m(e), this.each(function(n) {
				var i;
				this.nodeType === 1 && (i = r ? e.call(this, n, S(this).val()) : e, i == null ? i = "" : typeof i == "number" ? i += "" : Array.isArray(i) && (i = S.map(i, function(e) {
					return e == null ? "" : e + "";
				})), t = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()], (!t || !("set" in t) || t.set(this, i, "value") === void 0) && (this.value = i));
			})) : i ? (t = S.valHooks[i.type] || S.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== void 0 ? n : (n = i.value, typeof n == "string" ? n.replace(Vt, "") : n ?? "")) : void 0;
		} }), S.extend({ valHooks: {
			option: { get: function(e) {
				return S.find.attr(e, "value") ?? Rt(S.text(e));
			} },
			select: {
				get: function(e) {
					var t, n, r, i = e.options, a = e.selectedIndex, o = e.type === "select-one", s = o ? null : [], c = o ? a + 1 : i.length;
					for (r = a < 0 ? c : o ? a : 0; r < c; r++) if (n = i[r], (n.selected || r === a) && !n.disabled && (!n.parentNode.disabled || !w(n.parentNode, "optgroup"))) {
						if (t = S(n).val(), o) return t;
						s.push(t);
					}
					return s;
				},
				set: function(e, t) {
					for (var n, r, i = e.options, a = S.makeArray(t), o = i.length; o--;) r = i[o], (r.selected = S.inArray(S.valHooks.option.get(r), a) > -1) && (n = !0);
					return n || (e.selectedIndex = -1), a;
				}
			}
		} }), S.each(["radio", "checkbox"], function() {
			S.valHooks[this] = { set: function(e, t) {
				if (Array.isArray(t)) return e.checked = S.inArray(S(e).val(), t) > -1;
			} }, p.checkOn || (S.valHooks[this].get = function(e) {
				return e.getAttribute("value") === null ? "on" : e.value;
			});
		});
		var Ht = e.location, Ut = { guid: Date.now() }, Wt = /\?/;
		S.parseXML = function(t) {
			var n, r;
			if (!t || typeof t != "string") return null;
			try {
				n = new e.DOMParser().parseFromString(t, "text/xml");
			} catch {}
			return r = n && n.getElementsByTagName("parsererror")[0], (!n || r) && S.error("Invalid XML: " + (r ? S.map(r.childNodes, function(e) {
				return e.textContent;
			}).join("\n") : t)), n;
		};
		var Gt = /^(?:focusinfocus|focusoutblur)$/, Kt = function(e) {
			e.stopPropagation();
		};
		S.extend(S.event, {
			trigger: function(t, n, r, i) {
				var a, o, s, c, l, d, f, p, _ = [r || g], v = u.call(t, "type") ? t.type : t, y = u.call(t, "namespace") ? t.namespace.split(".") : [];
				if (o = p = s = r ||= g, !(r.nodeType === 3 || r.nodeType === 8) && !Gt.test(v + S.event.triggered) && (v.indexOf(".") > -1 && (y = v.split("."), v = y.shift(), y.sort()), l = v.indexOf(":") < 0 && "on" + v, t = t[S.expando] ? t : new S.Event(v, typeof t == "object" && t), t.isTrigger = i ? 2 : 3, t.namespace = y.join("."), t.rnamespace = t.namespace ? RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target ||= r, n = n == null ? [t] : S.makeArray(n, [t]), f = S.event.special[v] || {}, !(!i && f.trigger && f.trigger.apply(r, n) === !1))) {
					if (!i && !f.noBubble && !h(r)) {
						for (c = f.delegateType || v, Gt.test(c + v) || (o = o.parentNode); o; o = o.parentNode) _.push(o), s = o;
						s === (r.ownerDocument || g) && _.push(s.defaultView || s.parentWindow || e);
					}
					for (a = 0; (o = _[a++]) && !t.isPropagationStopped();) p = o, t.type = a > 1 ? c : f.bindType || v, d = (j.get(o, "events") || Object.create(null))[t.type] && j.get(o, "handle"), d && d.apply(o, n), d = l && o[l], d && d.apply && De(o) && (t.result = d.apply(o, n), t.result === !1 && t.preventDefault());
					return t.type = v, !i && !t.isDefaultPrevented() && (!f._default || f._default.apply(_.pop(), n) === !1) && De(r) && l && m(r[v]) && !h(r) && (s = r[l], s && (r[l] = null), S.event.triggered = v, t.isPropagationStopped() && p.addEventListener(v, Kt), r[v](), t.isPropagationStopped() && p.removeEventListener(v, Kt), S.event.triggered = void 0, s && (r[l] = s)), t.result;
				}
			},
			simulate: function(e, t, n) {
				var r = S.extend(new S.Event(), n, {
					type: e,
					isSimulated: !0
				});
				S.event.trigger(r, null, t);
			}
		}), S.fn.extend({
			trigger: function(e, t) {
				return this.each(function() {
					S.event.trigger(e, t, this);
				});
			},
			triggerHandler: function(e, t) {
				var n = this[0];
				if (n) return S.event.trigger(e, t, n, !0);
			}
		});
		var qt = /\[\]$/, Jt = /\r?\n/g, Yt = /^(?:submit|button|image|reset|file)$/i, Xt = /^(?:input|select|textarea|keygen)/i;
		function Zt(e, t, n, r) {
			var i;
			if (Array.isArray(t)) S.each(t, function(t, i) {
				n || qt.test(e) ? r(e, i) : Zt(e + "[" + (typeof i == "object" && i ? t : "") + "]", i, n, r);
			});
			else if (!n && y(t) === "object") for (i in t) Zt(e + "[" + i + "]", t[i], n, r);
			else r(e, t);
		}
		S.param = function(e, t) {
			var n, r = [], i = function(e, t) {
				var n = m(t) ? t() : t;
				r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(n ?? "");
			};
			if (e == null) return "";
			if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, function() {
				i(this.name, this.value);
			});
			else for (n in e) Zt(n, e[n], t, i);
			return r.join("&");
		}, S.fn.extend({
			serialize: function() {
				return S.param(this.serializeArray());
			},
			serializeArray: function() {
				return this.map(function() {
					var e = S.prop(this, "elements");
					return e ? S.makeArray(e) : this;
				}).filter(function() {
					var e = this.type;
					return this.name && !S(this).is(":disabled") && Xt.test(this.nodeName) && !Yt.test(e) && (this.checked || !L.test(e));
				}).map(function(e, t) {
					var n = S(this).val();
					return n == null ? null : Array.isArray(n) ? S.map(n, function(e) {
						return {
							name: t.name,
							value: e.replace(Jt, "\r\n")
						};
					}) : {
						name: t.name,
						value: n.replace(Jt, "\r\n")
					};
				}).get();
			}
		});
		var Qt = /%20/g, $t = /#.*$/, en = /([?&])_=[^&]*/, tn = /^(.*?):[ \t]*([^\r\n]*)$/gm, nn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rn = /^(?:GET|HEAD)$/, an = /^\/\//, on = {}, sn = {}, cn = "*/*", ln = g.createElement("a");
		ln.href = Ht.href;
		function un(e) {
			return function(t, n) {
				typeof t != "string" && (n = t, t = "*");
				var r, i = 0, a = t.toLowerCase().match(ge) || [];
				if (m(n)) for (; r = a[i++];) r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
			};
		}
		function dn(e, t, n, r) {
			var i = {}, a = e === sn;
			function o(s) {
				var c;
				return i[s] = !0, S.each(e[s] || [], function(e, s) {
					var l = s(t, n, r);
					if (typeof l == "string" && !a && !i[l]) return t.dataTypes.unshift(l), o(l), !1;
					if (a) return !(c = l);
				}), c;
			}
			return o(t.dataTypes[0]) || !i["*"] && o("*");
		}
		function fn(e, t) {
			var n, r, i = S.ajaxSettings.flatOptions || {};
			for (n in t) t[n] !== void 0 && ((i[n] ? e : r ||= {})[n] = t[n]);
			return r && S.extend(!0, e, r), e;
		}
		function pn(e, t, n) {
			for (var r, i, a, o, s = e.contents, c = e.dataTypes; c[0] === "*";) c.shift(), r === void 0 && (r = e.mimeType || t.getResponseHeader("Content-Type"));
			if (r) {
				for (i in s) if (s[i] && s[i].test(r)) {
					c.unshift(i);
					break;
				}
			}
			if (c[0] in n) a = c[0];
			else {
				for (i in n) {
					if (!c[0] || e.converters[i + " " + c[0]]) {
						a = i;
						break;
					}
					o ||= i;
				}
				a ||= o;
			}
			if (a) return a !== c[0] && c.unshift(a), n[a];
		}
		function mn(e, t, n, r) {
			var i, a, o, s, c, l = {}, u = e.dataTypes.slice();
			if (u[1]) for (o in e.converters) l[o.toLowerCase()] = e.converters[o];
			for (a = u.shift(); a;) if (e.responseFields[a] && (n[e.responseFields[a]] = t), !c && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), c = a, a = u.shift(), a) {
				if (a === "*") a = c;
				else if (c !== "*" && c !== a) {
					if (o = l[c + " " + a] || l["* " + a], !o) {
						for (i in l) if (s = i.split(" "), s[1] === a && (o = l[c + " " + s[0]] || l["* " + s[0]], o)) {
							o === !0 ? o = l[i] : l[i] !== !0 && (a = s[0], u.unshift(s[1]));
							break;
						}
					}
					if (o !== !0) if (o && e.throws) t = o(t);
					else try {
						t = o(t);
					} catch (e) {
						return {
							state: "parsererror",
							error: o ? e : "No conversion from " + c + " to " + a
						};
					}
				}
			}
			return {
				state: "success",
				data: t
			};
		}
		S.extend({
			active: 0,
			lastModified: {},
			etag: {},
			ajaxSettings: {
				url: Ht.href,
				type: "GET",
				isLocal: nn.test(Ht.protocol),
				global: !0,
				processData: !0,
				async: !0,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				accepts: {
					"*": cn,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},
				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},
				converters: {
					"* text": String,
					"text html": !0,
					"text json": JSON.parse,
					"text xml": S.parseXML
				},
				flatOptions: {
					url: !0,
					context: !0
				}
			},
			ajaxSetup: function(e, t) {
				return t ? fn(fn(e, S.ajaxSettings), t) : fn(S.ajaxSettings, e);
			},
			ajaxPrefilter: un(on),
			ajaxTransport: un(sn),
			ajax: function(t, n) {
				typeof t == "object" && (n = t, t = void 0), n ||= {};
				var r, i, a, o, s, c, l, u, d, f, p = S.ajaxSetup({}, n), m = p.context || p, h = p.context && (m.nodeType || m.jquery) ? S(m) : S.event, _ = S.Deferred(), v = S.Callbacks("once memory"), y = p.statusCode || {}, b = {}, x = {}, C = "canceled", w = {
					readyState: 0,
					getResponseHeader: function(e) {
						var t;
						if (l) {
							if (!o) for (o = {}; t = tn.exec(a);) o[t[1].toLowerCase() + " "] = (o[t[1].toLowerCase() + " "] || []).concat(t[2]);
							t = o[e.toLowerCase() + " "];
						}
						return t == null ? null : t.join(", ");
					},
					getAllResponseHeaders: function() {
						return l ? a : null;
					},
					setRequestHeader: function(e, t) {
						return l ?? (e = x[e.toLowerCase()] = x[e.toLowerCase()] || e, b[e] = t), this;
					},
					overrideMimeType: function(e) {
						return l ?? (p.mimeType = e), this;
					},
					statusCode: function(e) {
						var t;
						if (e) if (l) w.always(e[w.status]);
						else for (t in e) y[t] = [y[t], e[t]];
						return this;
					},
					abort: function(e) {
						var t = e || C;
						return r && r.abort(t), T(0, t), this;
					}
				};
				if (_.promise(w), p.url = ((t || p.url || Ht.href) + "").replace(an, Ht.protocol + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = (p.dataType || "*").toLowerCase().match(ge) || [""], p.crossDomain == null) {
					c = g.createElement("a");
					try {
						c.href = p.url, c.href = c.href, p.crossDomain = ln.protocol + "//" + ln.host != c.protocol + "//" + c.host;
					} catch {
						p.crossDomain = !0;
					}
				}
				if (p.data && p.processData && typeof p.data != "string" && (p.data = S.param(p.data, p.traditional)), dn(on, p, n, w), l) return w;
				for (d in u = S.event && p.global, u && S.active++ === 0 && S.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !rn.test(p.type), i = p.url.replace($t, ""), p.hasContent ? p.data && p.processData && (p.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && (p.data = p.data.replace(Qt, "+")) : (f = p.url.slice(i.length), p.data && (p.processData || typeof p.data == "string") && (i += (Wt.test(i) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (i = i.replace(en, "$1"), f = (Wt.test(i) ? "&" : "?") + "_=" + Ut.guid++ + f), p.url = i + f), p.ifModified && (S.lastModified[i] && w.setRequestHeader("If-Modified-Since", S.lastModified[i]), S.etag[i] && w.setRequestHeader("If-None-Match", S.etag[i])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + (p.dataTypes[0] === "*" ? "" : ", " + cn + "; q=0.01") : p.accepts["*"]), p.headers) w.setRequestHeader(d, p.headers[d]);
				if (p.beforeSend && (p.beforeSend.call(m, w, p) === !1 || l)) return w.abort();
				if (C = "abort", v.add(p.complete), w.done(p.success), w.fail(p.error), r = dn(sn, p, n, w), !r) T(-1, "No Transport");
				else {
					if (w.readyState = 1, u && h.trigger("ajaxSend", [w, p]), l) return w;
					p.async && p.timeout > 0 && (s = e.setTimeout(function() {
						w.abort("timeout");
					}, p.timeout));
					try {
						l = !1, r.send(b, T);
					} catch (e) {
						if (l) throw e;
						T(-1, e);
					}
				}
				function T(t, n, o, c) {
					var d, f, g, b, x, C = n;
					l || (l = !0, s && e.clearTimeout(s), r = void 0, a = c || "", w.readyState = t > 0 ? 4 : 0, d = t >= 200 && t < 300 || t === 304, o && (b = pn(p, w, o)), !d && S.inArray("script", p.dataTypes) > -1 && S.inArray("json", p.dataTypes) < 0 && (p.converters["text script"] = function() {}), b = mn(p, b, w, d), d ? (p.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (S.lastModified[i] = x), x = w.getResponseHeader("etag"), x && (S.etag[i] = x)), t === 204 || p.type === "HEAD" ? C = "nocontent" : t === 304 ? C = "notmodified" : (C = b.state, f = b.data, g = b.error, d = !g)) : (g = C, (t || !C) && (C = "error", t < 0 && (t = 0))), w.status = t, w.statusText = (n || C) + "", d ? _.resolveWith(m, [
						f,
						C,
						w
					]) : _.rejectWith(m, [
						w,
						C,
						g
					]), w.statusCode(y), y = void 0, u && h.trigger(d ? "ajaxSuccess" : "ajaxError", [
						w,
						p,
						d ? f : g
					]), v.fireWith(m, [w, C]), u && (h.trigger("ajaxComplete", [w, p]), --S.active || S.event.trigger("ajaxStop")));
				}
				return w;
			},
			getJSON: function(e, t, n) {
				return S.get(e, t, n, "json");
			},
			getScript: function(e, t) {
				return S.get(e, void 0, t, "script");
			}
		}), S.each(["get", "post"], function(e, t) {
			S[t] = function(e, n, r, i) {
				return m(n) && (i ||= r, r = n, n = void 0), S.ajax(S.extend({
					url: e,
					type: t,
					dataType: i,
					data: n,
					success: r
				}, S.isPlainObject(e) && e));
			};
		}), S.ajaxPrefilter(function(e) {
			for (var t in e.headers) t.toLowerCase() === "content-type" && (e.contentType = e.headers[t] || "");
		}), S._evalUrl = function(e, t, n) {
			return S.ajax({
				url: e,
				type: "GET",
				dataType: "script",
				cache: !0,
				async: !1,
				global: !1,
				converters: { "text script": function() {} },
				dataFilter: function(e) {
					S.globalEval(e, t, n);
				}
			});
		}, S.fn.extend({
			wrapAll: function(e) {
				var t;
				return this[0] && (m(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
					for (var e = this; e.firstElementChild;) e = e.firstElementChild;
					return e;
				}).append(this)), this;
			},
			wrapInner: function(e) {
				return m(e) ? this.each(function(t) {
					S(this).wrapInner(e.call(this, t));
				}) : this.each(function() {
					var t = S(this), n = t.contents();
					n.length ? n.wrapAll(e) : t.append(e);
				});
			},
			wrap: function(e) {
				var t = m(e);
				return this.each(function(n) {
					S(this).wrapAll(t ? e.call(this, n) : e);
				});
			},
			unwrap: function(e) {
				return this.parent(e).not("body").each(function() {
					S(this).replaceWith(this.childNodes);
				}), this;
			}
		}), S.expr.pseudos.hidden = function(e) {
			return !S.expr.pseudos.visible(e);
		}, S.expr.pseudos.visible = function(e) {
			return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
		}, S.ajaxSettings.xhr = function() {
			try {
				return new e.XMLHttpRequest();
			} catch {}
		};
		var hn = {
			0: 200,
			1223: 204
		}, gn = S.ajaxSettings.xhr();
		p.cors = !!gn && "withCredentials" in gn, p.ajax = gn = !!gn, S.ajaxTransport(function(t) {
			var n, r;
			if (p.cors || gn && !t.crossDomain) return {
				send: function(i, a) {
					var o, s = t.xhr();
					if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (o in t.xhrFields) s[o] = t.xhrFields[o];
					for (o in t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), !t.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest"), i) s.setRequestHeader(o, i[o]);
					n = function(e) {
						return function() {
							n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, e === "abort" ? s.abort() : e === "error" ? typeof s.status == "number" ? a(s.status, s.statusText) : a(0, "error") : a(hn[s.status] || s.status, s.statusText, (s.responseType || "text") !== "text" || typeof s.responseText != "string" ? { binary: s.response } : { text: s.responseText }, s.getAllResponseHeaders()));
						};
					}, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), s.onabort === void 0 ? s.onreadystatechange = function() {
						s.readyState === 4 && e.setTimeout(function() {
							n && r();
						});
					} : s.onabort = r, n = n("abort");
					try {
						s.send(t.hasContent && t.data || null);
					} catch (e) {
						if (n) throw e;
					}
				},
				abort: function() {
					n && n();
				}
			};
		}), S.ajaxPrefilter(function(e) {
			e.crossDomain && (e.contents.script = !1);
		}), S.ajaxSetup({
			accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
			contents: { script: /\b(?:java|ecma)script\b/ },
			converters: { "text script": function(e) {
				return S.globalEval(e), e;
			} }
		}), S.ajaxPrefilter("script", function(e) {
			e.cache === void 0 && (e.cache = !1), e.crossDomain && (e.type = "GET");
		}), S.ajaxTransport("script", function(e) {
			if (e.crossDomain || e.scriptAttrs) {
				var t, n;
				return {
					send: function(r, i) {
						t = S("<script>").attr(e.scriptAttrs || {}).prop({
							charset: e.scriptCharset,
							src: e.url
						}).on("load error", n = function(e) {
							t.remove(), n = null, e && i(e.type === "error" ? 404 : 200, e.type);
						}), g.head.appendChild(t[0]);
					},
					abort: function() {
						n && n();
					}
				};
			}
		});
		var _n = [], H = /(=)\?(?=&|$)|\?\?/;
		S.ajaxSetup({
			jsonp: "callback",
			jsonpCallback: function() {
				var e = _n.pop() || S.expando + "_" + Ut.guid++;
				return this[e] = !0, e;
			}
		}), S.ajaxPrefilter("json jsonp", function(t, n, r) {
			var i, a, o, s = t.jsonp !== !1 && (H.test(t.url) ? "url" : typeof t.data == "string" && (t.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && H.test(t.data) && "data");
			if (s || t.dataTypes[0] === "jsonp") return i = t.jsonpCallback = m(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(H, "$1" + i) : t.jsonp !== !1 && (t.url += (Wt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function() {
				return o || S.error(i + " was not called"), o[0];
			}, t.dataTypes[0] = "json", a = e[i], e[i] = function() {
				o = arguments;
			}, r.always(function() {
				a === void 0 ? S(e).removeProp(i) : e[i] = a, t[i] && (t.jsonpCallback = n.jsonpCallback, _n.push(i)), o && m(a) && a(o[0]), o = a = void 0;
			}), "script";
		}), p.createHTMLDocument = (function() {
			var e = g.implementation.createHTMLDocument("").body;
			return e.innerHTML = "<form></form><form></form>", e.childNodes.length === 2;
		})(), S.parseHTML = function(e, t, n) {
			if (typeof e != "string") return [];
			typeof t == "boolean" && (n = t, t = !1);
			var r, i, a;
			return t || (p.createHTMLDocument ? (t = g.implementation.createHTMLDocument(""), r = t.createElement("base"), r.href = g.location.href, t.head.appendChild(r)) : t = g), i = ce.exec(e), a = !n && [], i ? [t.createElement(i[1])] : (i = Ke([e], t, a), a && a.length && S(a).remove(), S.merge([], i.childNodes));
		}, S.fn.load = function(e, t, n) {
			var r, i, a, o = this, s = e.indexOf(" ");
			return s > -1 && (r = Rt(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && typeof t == "object" && (i = "POST"), o.length > 0 && S.ajax({
				url: e,
				type: i || "GET",
				dataType: "html",
				data: t
			}).done(function(e) {
				a = arguments, o.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e);
			}).always(n && function(e, t) {
				o.each(function() {
					n.apply(this, a || [
						e.responseText,
						t,
						e
					]);
				});
			}), this;
		}, S.expr.pseudos.animated = function(e) {
			return S.grep(S.timers, function(t) {
				return e === t.elem;
			}).length;
		}, S.offset = { setOffset: function(e, t, n) {
			var r, i, a, o, s, c, l, u = S.css(e, "position"), d = S(e), f = {};
			u === "static" && (e.style.position = "relative"), s = d.offset(), a = S.css(e, "top"), c = S.css(e, "left"), l = (u === "absolute" || u === "fixed") && (a + c).indexOf("auto") > -1, l ? (r = d.position(), o = r.top, i = r.left) : (o = parseFloat(a) || 0, i = parseFloat(c) || 0), m(t) && (t = t.call(e, n, S.extend({}, s))), t.top != null && (f.top = t.top - s.top + o), t.left != null && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : d.css(f);
		} }, S.fn.extend({
			offset: function(e) {
				if (arguments.length) return e === void 0 ? this : this.each(function(t) {
					S.offset.setOffset(this, e, t);
				});
				var t, n, r = this[0];
				if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
					top: t.top + n.pageYOffset,
					left: t.left + n.pageXOffset
				}) : {
					top: 0,
					left: 0
				};
			},
			position: function() {
				if (this[0]) {
					var e, t, n, r = this[0], i = {
						top: 0,
						left: 0
					};
					if (S.css(r, "position") === "fixed") t = r.getBoundingClientRect();
					else {
						for (t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && S.css(e, "position") === "static";) e = e.parentNode;
						e && e !== r && e.nodeType === 1 && (i = S(e).offset(), i.top += S.css(e, "borderTopWidth", !0), i.left += S.css(e, "borderLeftWidth", !0));
					}
					return {
						top: t.top - i.top - S.css(r, "marginTop", !0),
						left: t.left - i.left - S.css(r, "marginLeft", !0)
					};
				}
			},
			offsetParent: function() {
				return this.map(function() {
					for (var e = this.offsetParent; e && S.css(e, "position") === "static";) e = e.offsetParent;
					return e || Fe;
				});
			}
		}), S.each({
			scrollLeft: "pageXOffset",
			scrollTop: "pageYOffset"
		}, function(e, t) {
			var n = t === "pageYOffset";
			S.fn[e] = function(r) {
				return we(this, function(e, r, i) {
					var a;
					if (h(e) ? a = e : e.nodeType === 9 && (a = e.defaultView), i === void 0) return a ? a[t] : e[r];
					a ? a.scrollTo(n ? a.pageXOffset : i, n ? i : a.pageYOffset) : e[r] = i;
				}, e, r, arguments.length);
			};
		}), S.each(["top", "left"], function(e, t) {
			S.cssHooks[t] = pt(p.pixelPosition, function(e, n) {
				if (n) return n = ft(e, t), st.test(n) ? S(e).position()[t] + "px" : n;
			});
		}), S.each({
			Height: "height",
			Width: "width"
		}, function(e, t) {
			S.each({
				padding: "inner" + e,
				content: t,
				"": "outer" + e
			}, function(n, r) {
				S.fn[r] = function(i, a) {
					var o = arguments.length && (n || typeof i != "boolean"), s = n || (i === !0 || a === !0 ? "margin" : "border");
					return we(this, function(t, n, i) {
						var a;
						return h(t) ? r.indexOf("outer") === 0 ? t["inner" + e] : t.document.documentElement["client" + e] : t.nodeType === 9 ? (a = t.documentElement, Math.max(t.body["scroll" + e], a["scroll" + e], t.body["offset" + e], a["offset" + e], a["client" + e])) : i === void 0 ? S.css(t, n, s) : S.style(t, n, i, s);
					}, t, o ? i : void 0, o);
				};
			});
		}), S.each([
			"ajaxStart",
			"ajaxStop",
			"ajaxComplete",
			"ajaxError",
			"ajaxSuccess",
			"ajaxSend"
		], function(e, t) {
			S.fn[t] = function(e) {
				return this.on(t, e);
			};
		}), S.fn.extend({
			bind: function(e, t, n) {
				return this.on(e, null, t, n);
			},
			unbind: function(e, t) {
				return this.off(e, null, t);
			},
			delegate: function(e, t, n, r) {
				return this.on(t, e, n, r);
			},
			undelegate: function(e, t, n) {
				return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
			},
			hover: function(e, t) {
				return this.mouseenter(e).mouseleave(t || e);
			}
		}), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, t) {
			S.fn[t] = function(e, n) {
				return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
			};
		});
		var vn = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
		S.proxy = function(e, t) {
			var n, r, a;
			if (typeof t == "string" && (n = e[t], t = e, e = n), m(e)) return r = i.call(arguments, 2), a = function() {
				return e.apply(t || this, r.concat(i.call(arguments)));
			}, a.guid = e.guid = e.guid || S.guid++, a;
		}, S.holdReady = function(e) {
			e ? S.readyWait++ : S.ready(!0);
		}, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = w, S.isFunction = m, S.isWindow = h, S.camelCase = A, S.type = y, S.now = Date.now, S.isNumeric = function(e) {
			var t = S.type(e);
			return (t === "number" || t === "string") && !isNaN(e - parseFloat(e));
		}, S.trim = function(e) {
			return e == null ? "" : (e + "").replace(vn, "$1");
		}, typeof define == "function" && define.amd && define("jquery", [], function() {
			return S;
		});
		var yn = e.jQuery, bn = e.$;
		return S.noConflict = function(t) {
			return e.$ === S && (e.$ = bn), t && e.jQuery === S && (e.jQuery = yn), S;
		}, t === void 0 && (e.jQuery = e.$ = S), S;
	});
})))(), 1), cd = (e, t) => {
	var n, r = "Service down: ", i, a;
	function o(i, o) {
		n = i, o && o.length > 0 && (r = o), a = t, e.RegisterEvent(vi.ChangeLayers, l);
	}
	function s(e) {
		e !== void 0 && (r = e), l();
	}
	function c(e) {
		i && i.showMessage(e);
	}
	function l() {
		var e = document.getElementById("messagecontainer");
		e != null && (i = new u(e), n && n.getLayers().forEach(function(e) {
			var t = a(e), n = e.getSource();
			if (n) switch (n.get("type")) {
				case "ol.source.ImageWMS":
					n.on("imageloaderror", function(e) {
						i.showMessage(t.title, e);
					});
					break;
				case "ol.source.TileWMS":
					n.on("tileloaderror", function(e) {
						i.showMessage(t.title, e);
					});
					break;
				default: break;
			}
		}));
	}
	function u(e) {
		this.el = e, this.messages = [], this.looping = !1, this.visible = !1;
	}
	return u.prototype.showMessage = function(e, t) {
		var n = this;
		if (e = n.getResponse(e, t), n.messages.length === 0) n.messages.push(e);
		else {
			var r = !0;
			n.messages.forEach(function(t) {
				r && t === e && (r = !1);
			}), r && n.messages.push(e);
		}
		n.show();
	}, u.prototype.getResponse = function(e, t) {
		try {
			var n = t.tile.getImage();
			if (n && n.src && (n.src.toLowerCase().indexOf("&gkt=") < 0 || n.src.toLowerCase().indexOf("?gkt=") < 0)) {
				var r = sd.default.ajax({
					type: "GET",
					url: n.src,
					async: !1
				}).responseText, i = new DOMParser(r);
				if (i && i.serviceexceptionreport && i.serviceexceptionreport.serviceexception) {
					var a = i.serviceexceptionreport.serviceexception.split("\n");
					return e + "<br>" + a[2] + " " + a[3].substr(0, a[3].indexOf(" Token:"));
				}
			}
		} catch (e) {
			return e;
		}
		return e;
	}, u.prototype.show = function() {
		var e = this;
		e.visible || (e.visible = !0, e.el.innerHTML = "", e.el.style.opacity = 1, e.el.style.visibility = "visible", e.looping || (e.looping = !0, e.loopMessages()));
	}, u.prototype.hide = function() {
		var e = this;
		e.visible && (e.looping = !1, e.visible = !1, e.el.style.opacity = 0, setTimeout(function() {
			e.el.style.visibility = "hidden";
		}, 2e3));
	}, u.prototype.loopMessages = function(e) {
		e === void 0 && (e = this), e.messages.length > 0 ? (e.el.innerHTML = r + e.messages.pop(), setTimeout(function() {
			e.loopMessages(e);
		}, 1e3)) : e.hide();
	}, {
		Init: o,
		InitMessage: s,
		ShowCustomMessage: c
	};
}, ld = (e, t) => {
	var n, r, i = function(e) {
		var n = "";
		if (t) {
			for (var r in t) n.length > 0 && (n += "&"), n += r + "=" + t[r];
			e.indexOf("?") > 0 ? e += "&" : e += "?", e += n;
		}
		return e;
	};
	if (Array.isArray(e.url)) {
		r = e.url;
		for (var a = 0; a < r.length; a++) r[a] = i(r[a]);
	} else n = e.url, n = i(n);
	var o;
	return e.tiled ? (o = new ue({
		params: {
			LAYERS: e.name,
			VERSION: "1.1.1",
			FORMAT: e.format,
			STYLES: e.styles || ""
		},
		url: n,
		urls: r,
		crossOrigin: e.crossOrigin,
		transparent: e.transparent,
		minResolution: e.minResolution,
		maxResolution: e.maxResolution
	}), o.set("type", "ol.source.TileWMS")) : (n === void 0 && (n = r[r.length - 1]), o = new le({
		params: {
			LAYERS: e.name,
			VERSION: "1.1.1",
			FORMAT: e.format,
			STYLES: e.styles || ""
		},
		ratio: 1,
		url: n,
		crossOrigin: e.crossOrigin,
		transparent: e.transparent,
		minResolution: e.minResolution,
		maxResolution: e.maxResolution
	}), o.set("type", "ol.source.ImageWMS")), o;
}, ud = (e, t) => {
	var n = new ee({
		code: e.coordinate_system,
		extent: e.extent,
		units: e.extentUnits
	}), r = function() {
		var e = "";
		if (t) for (var n in t) e += "&" + n + "=" + t[n];
		return e;
	}, i = e.matrixSet;
	(i === null || i === "" || i === void 0) && (i = e.matrixPrefix ? e.coordinate_system : parseInt(e.coordinate_system.substr(e.coordinate_system.indexOf(":") + 1), 10));
	for (var a = e.url, o = 0; o < a.length; o++) a[o] += r();
	var s, c, l = n.getExtent(), u = e.wmtsExtent ? e.wmtsExtent.split(",") : l;
	if (e.getCapabilities) {
		var d = a[0] + "&Request=GetCapabilities&Service=WMTS&Version=1.0.0", f = sd.default.ajax({
			type: "GET",
			url: d,
			async: !1
		}).responseText;
		f = new A().read(f), f.Contents.Layer.forEach(function(t) {
			t.Identifier === e.name && (t.WGS84BoundingBox = void 0);
		}), c = De.optionsFromCapabilities(f, {
			layer: e.name,
			matrixSet: i,
			requestEncoding: "KVP"
		}), c.tileGrid = new Oe({
			extent: u,
			origin: c.tileGrid.getOrigin(0),
			resolutions: c.tileGrid.getResolutions(),
			matrixIds: c.tileGrid.getMatrixIds(),
			tileSize: c.tileGrid.getTileSize(0)
		});
	} else {
		for (var p = Te(l) / 256, m = Array(e.numZoomLevels), h = Array(e.numZoomLevels), g = 0; g < e.numZoomLevels; ++g) m[g] = p / 2 ** g, h[g] = e.matrixPrefix ? i + ":" + g : h[g] = g;
		c = {
			layer: e.name,
			format: e.format,
			matrixSet: i,
			crossOrigin: e.crossOrigin,
			tileGrid: new Oe({
				extent: u,
				origin: k(l),
				resolutions: m,
				matrixIds: h
			}),
			style: "default",
			wrapX: !0
		};
	}
	return c.projection = n, c.urls = a, s = new De(c), s.set("type", "ol.source.WMTS"), s;
}, dd = (e) => {
	var t;
	switch (e.format) {
		default:
		case hr.geoJson:
			t = new de({
				format: new f({ dataProjection: e.coordinate_system }),
				url: e.url
			}), t.set("type", "ol.source.Vector");
			break;
	}
	return t;
}, fd = (e, t, n, r, i) => {
	var a;
	if (e.tiled) {
		var o = [];
		o[0] = 21664;
		for (var s = 1; s < 18; s++) o[s] = o[s - 1] / 2;
		a = ke(new j({
			origin: [
				0,
				0,
				0
			],
			resolutions: o
		}));
	} else a = M;
	var c = fe(e.coordinate_system), l = function(t) {
		t = new DOMParser().parseFromString(t, "text/xml"), u.dispatchEvent("vectorloadend");
		var n;
		if (u.format === void 0) {
			var a;
			switch (e.version) {
				case "1.0.0":
					a = new h();
					break;
				case "1.1.0":
					a = new g();
					break;
				case "2.0.0":
					a = new g();
					break;
				default:
					a = new d();
					break;
			}
			e.srs_dimension && e.srs_dimension.length > 0 ? (n = e.featureNS || t.firstChild.firstElementChild.firstElementChild.namespaceURI, u.format = new p({
				featureType: e.featureType || t.firstChild.firstElementChild.firstElementChild.localName,
				featureNS: n,
				gmlFormat: a
			})) : (n = e.featureNS || t.firstChild.namespaceURI, u.format = new p({
				featureType: e.featureType || e.name,
				featureNS: n,
				gmlFormat: a
			}));
		}
		if (e.srs_dimension === "3" && (n = t.firstChild.firstElementChild.firstElementChild.namespaceURI, t.firstChild.nodeName.toLowerCase() === "gml:featurecollection")) for (var o = 0; o < t.firstChild.childNodes.length; o++) {
			var s = t.firstChild.childNodes.item(o);
			if (s.nodeName.toLowerCase() === "gml:featureMember") for (var c = 0; c < s.childNodes.length; c++) {
				var l = s.childNodes.item(c);
				if (l.nodeName.toLowerCase() === e.name.toLowerCase()) for (var f = 0; f < l.childNodes.length; f++) for (var m = l.childNodes.item(f), _ = 0; _ < m.childNodes.length; _++) {
					var v = m.childNodes.item(_).nodeName;
					if (v.toLowerCase() === "gml:linestring" || v.toLowerCase() === "gml:point") {
						var y = document.createAttribute("srsDimension");
						y.value = e.srs_dimension, m.firstElementChild.attributes.setNamedItem(y);
					}
				}
			}
		}
		var b = u.format.readFeatures(t);
		return b && b.length > 0 && (function(e) {
			return !1;
		}(b) || console.warn(e.name + " does not have valid coordinates!"), b.forEach(function(t) {
			t.set("layerguid", e.id);
		}), u.addFeatures(b)), b.length > 0 && (e.geometryName = b[0].getGeometryName()), r && i && i.TriggerEvent(vi.RefreshSourceDone, r), b;
	}, u = new de({
		loader: function(t) {
			u.dispatchEvent("vectorloadstart");
			var r = e.url;
			if (Array.isArray(e.url) && (r = e.url[0]), r.toLowerCase().indexOf("service=wfs") < 0 && (r += "service=WFS&"), r += "request=GetFeature&version=" + e.version + "&typename=" + e.name + "&srsname=" + e.coordinate_system + "&bbox=" + t.join(",") + "," + e.coordinate_system + "&outputFormat=text/xml; subtype=gml/3.2.1", n) for (var i in n) r += "&" + i + "=" + n[i];
			return fetch(r).then((e) => e.text()).then((e) => {
				if (typeof e == "object") {
					if (e.firstChild.childElementCount === 0) return;
				} else return l(e);
			});
		},
		strategy: a,
		projection: c
	});
	return u.set("type", "ol.source.Vector"), u;
}, pd = (e) => {
	var t, n;
	function r(n) {
		t = n, e.RegisterEvent(vi.ChangeLayers, i);
	}
	function i() {
		var e = document.getElementById("progressbar");
		e != null && (n = new a(e), t.getLayers().forEach(function(e) {
			var t = e.getSource();
			if (t) switch (t.get("type")) {
				case "ol.source.Vector":
					t.on("vectorloadstart", function() {
						n.addLoading();
					}), t.on("vectorloadend", function() {
						n.addLoaded();
					});
					break;
				case "ol.source.ImageWMS":
					t.on("imageloadstart", function() {
						n.addLoading();
					}), t.on("imageloadend", function() {
						n.addLoaded();
					}), t.on("imageloaderror", function() {
						n.addLoaded();
					});
					break;
				case "ol.source.TileWMS":
					t.on("tileloadstart", function() {
						n.addLoading();
					}), t.on("tileloadend", function() {
						n.addLoaded();
					}), t.on("tileloaderror", function() {
						n.addLoaded();
					});
					break;
				case void 0: break;
				default: break;
			}
		}));
	}
	function a(e) {
		this.el = e, this.loading = 0, this.loaded = 0;
	}
	return a.prototype.addLoading = function() {
		this.loading === 0 && this.show(), ++this.loading, this.update();
	}, a.prototype.addLoaded = function() {
		var e = this;
		++e.loaded, e.loaded > e.loading && (e.loaded = e.loading), e.update();
	}, a.prototype.update = function() {
		if (this.el.style.width = (this.loaded / this.loading * 100).toFixed(1) + "%", this.loading === this.loaded) {
			this.loading = 0, this.loaded = 0;
			var e = this;
			setTimeout(function() {
				e.hide();
			}, 500);
		}
	}, a.prototype.show = function() {
		this.el.style.visibility = "visible";
	}, a.prototype.hide = function() {
		this.loading === this.loaded && (this.el.style.visibility = "hidden", this.el.style.width = 0);
	}, { Init: r };
}, md = (e) => {
	var t = 0;
	function n(e, n, c) {
		var l = typeof n == "object" ? n : JSON.parse(n), u = [];
		return t++, u.push(new E({
			fill: r(l),
			icon: i(l, c),
			image: a(l, c),
			stroke: o(l, c),
			text: s(e, l, c),
			zIndex: t
		})), u;
	}
	function r(e) {
		if (e.fill) return new S(e.fill);
	}
	function i(e) {
		if (e.icon) return new C(e.icon);
	}
	function a(e, t) {
		if (e.image) return new x({
			radius: t ? e.image.radius * 1.2 : e.image.radius,
			fill: r(e.image),
			stroke: o(e.image)
		});
		if (e.regularshape) {
			var n = parseInt(e.regularshape.angle, 10), i = parseInt(e.regularshape.rotation, 10);
			return new w({
				fill: r(e.regularshape),
				stroke: o(e.regularshape),
				radius: t ? e.regularshape.radius * 1.2 : e.regularshape.radius,
				radius2: t ? e.regularshape.radius2 * 1.2 : e.regularshape.radius2,
				points: e.regularshape.points,
				rotation: i > 0 ? Math.PI / i : 0,
				angle: n > 0 ? Math.PI / n : 0
			});
		}
	}
	function o(e, t) {
		if (e.stroke) return t && (e.stroke.width *= 2), new T(e.stroke);
	}
	function s(e, t, n) {
		if (t.text) return n && (t.text.scale && (t.text.scale *= 1.2), t.text.rotation && (t.text.rotation *= -1)), new D({
			font: t.text.font,
			offsetX: t.text.offsetX,
			offsetY: t.text.offsetY,
			scale: t.text.scale,
			rotation: t.text.rotation,
			text: c(e, t.text.text),
			textAlign: t.text.textAlign,
			textBaseline: t.text.textBaseline,
			fill: r(t.text),
			stroke: o(t.text)
		});
	}
	function c(e, t) {
		if (t) {
			var n = t.indexOf("{");
			if (n < 0) return t;
			if (t === "{_id}") return e.getId();
			for (var r = ""; n >= 0;) {
				n > 0 && (r += t.substr(0, n), t = t.slice(n), n = t.indexOf("{"));
				var i = t.indexOf("}"), a = t.substr(n + 1, i - n - 1), o = e.get(a);
				o && (r += o), t = t.slice(i + 1), n = t.indexOf("{");
			}
			return r + t;
		}
	}
	return {
		GetStyle: function(t) {
			if (t) {
				var r = t.getProperties();
				if (r.style) {
					t.setStyle(n(t, r.style));
					return;
				}
				return n(t, e);
			}
			return [];
		},
		GetHoverStyle: function(t) {
			return t ? n(t, e, !0) : [];
		}
	};
}, hd = () => {
	var e = [new E({
		fill: new S({ color: "rgba(255, 255, 255, 0.6)" }),
		stroke: new T({
			color: "#319FD3",
			width: 2
		}),
		image: new x({
			radius: 3,
			fill: new S({ color: "rgba(255, 255, 255, 0.6)" }),
			stroke: new T({
				color: "#319FD3",
				width: 2
			})
		}),
		text: new D({
			font: "12px Calibri,sans-serif",
			fill: new S({ color: "#000" }),
			stroke: new T({
				color: "#fff",
				width: 3
			})
		})
	})], t, n = {
		sld: {
			StyledLayerDescriptor: function(e, t) {
				t.version = e.getAttribute("version"), this.readChildNodes(e, t);
			},
			Name: function(e, t) {
				t.name = this.getChildValue(e);
			},
			Title: function(e, t) {
				t.title = this.getChildValue(e);
			},
			Abstract: function(e, t) {
				t.description = this.getChildValue(e);
			},
			NamedLayer: function(e, t) {
				var n = {
					userStyles: [],
					namedStyles: []
				};
				this.readChildNodes(e, n);
				for (var r = 0, i = n.userStyles.length; r < i; ++r) n.userStyles[r].layerName = n.name;
				Array.isArray(t.namedLayers) ? t.namedLayers.push(n) : t.namedLayers[n.name] = n;
			},
			NamedStyle: function(e, t) {
				t.namedStyles.push(this.getChildName(e.firstChild));
			},
			UserStyle: function(e, t) {
				var n = this, r = {
					defaultsPerSymbolizer: !0,
					rules: []
				};
				this.featureTypeCounter = -1, this.readChildNodes(e, r);
				var i, a = r.isDefault ? r.isDefault : !1;
				this.multipleSymbolizers ? (delete r.defaultsPerSymbolizer, i = new E(r)) : r.rules.each(function(e, r) {
					var o = r.symbolizer.Polygon, s = r.symbolizer.Point, c = r.symbolizer.Line, l = r.symbolizer.Text, u, d, f;
					if (o) o.fill && (u = new S({ color: n.getColorValue(o.fillColor, o.fillOpacity) })), o.stroke && o.strokeColor !== void 0 && o.strokeWidth !== void 0 && (d = new T({
						color: n.getColorValue(o.strokeColor, o.strokeOpacity),
						width: parseInt(o.strokeWidth.trim(), 10),
						lineDash: o.strokeDashstyle ? o.strokeDashstyle.split(" ") : void 0
					}));
					else if (s) {
						if (s.fill && (u = new S({ color: n.getColorValue(s.fillColor, s.fillOpacity) })), s.stroke && (s.strokeColor !== void 0 || s.strokeWidth !== void 0) && (d = new T({
							color: n.getColorValue(s.strokeColor, s.strokeOpacity),
							width: s.strokeWidth ? parseInt(s.strokeWidth.trim(), 10) : void 0,
							lineDash: s.strokeDashstyle ? s.strokeDashstyle.split(" ") : void 0
						})), s.label && (s.outlineColor === void 0 && (s.outlineColor = "#ffffff"), s.outlineWidth === void 0 && (s.outlineWidth = "3"), l = new D({
							textAlign: n.getAlignValue(s.labelAnchorPointX),
							textBaseline: n.getBaselineValue(s.labelAnchorPointY),
							font: n.getFontValue(s),
							text: s.label,
							fill: new S({ color: n.getColorValue(s.fontColor, s.fontOpacity) }),
							stroke: new T({
								color: s.outlineColor ? n.getColorValue(s.outlineColor) : n.getColorValue(s.fontColor, s.fontOpacity),
								width: s.outlineWidth ? parseInt(s.outlineWidth, 10) : void 0
							}),
							offsetX: s.labelXOffset ? parseInt(s.labelXOffset, 10) : void 0,
							offsetY: s.labelYOffset ? parseInt(s.labelYOffset, 10) : void 0,
							rotation: s.rotation ? parseFloat(s.rotation) : void 0
						})), s.graphic) if (s.externalGraphic) f = new C({
							opacity: s.fillOpacity ? parseFloat(s.fillOpacity) : void 0,
							src: s.externalGraphic
						}), u = void 0, d = void 0;
						else switch (s.graphicName) {
							case "circle":
								f = new x({
									radius: parseInt(s.pointRadius, 10),
									stroke: d,
									fill: u
								});
								break;
							case "cross":
								f = new w({
									radius: parseInt(s.pointRadius, 10),
									radius2: 0,
									points: 4,
									stroke: d,
									fill: u
								});
								break;
							case "star":
								f = new w({
									radius: parseInt(s.pointRadius, 10),
									radius2: parseInt(s.pointRadius, 10) / 3,
									points: 5,
									stroke: d,
									fill: u
								});
								break;
							case "square":
								f = new w({
									radius: parseInt(s.pointRadius, 10),
									points: 4,
									angle: Math.PI / 4,
									stroke: d,
									fill: u
								});
								break;
							case "triangle":
								f = new w({
									radius: parseInt(s.pointRadius, 10),
									points: 3,
									stroke: d,
									fill: u
								});
								break;
							case "x":
								f = new w({
									radius: parseInt(s.pointRadius, 10),
									radius2: 0,
									points: 4,
									angle: Math.PI / 4,
									stroke: d,
									fill: u
								});
								break;
							default: break;
						}
					} else c && (c.fill && (u = new S({ color: n.getColorValue(c.fillColor, c.fillOpacity) })), c.stroke && (d = new T({
						color: n.getColorValue(c.strokeColor, c.strokeOpacity),
						width: n.getStrokeWidth(c.strokeWidth),
						lineDash: n.getStrokeDashstyle(c.strokeDashstyle)
					})), c.graphic && c.graphicName === "circle" && (f = new x({
						radius: parseInt(c.pointRadius, 10),
						fill: u
					}), u = void 0));
					i = new E({
						fill: u,
						image: f,
						stroke: d
					}), t.userStyles.push({
						isDefault: a,
						style: i,
						rule: r
					}), l && (i = new E({ text: l }), t.userStyles.push({
						isDefault: a,
						style: i,
						rule: r
					}));
				});
			},
			IsDefault: function(e, t) {
				this.getChildValue(e) === "1" && (t.isDefault = !0);
			},
			FeatureTypeStyle: function(e, t) {
				++this.featureTypeCounter;
				var n = { rules: this.multipleSymbolizers ? t.rules : [] };
				this.readChildNodes(e, n), this.multipleSymbolizers || (t.rules = n.rules);
			},
			Rule: function(e, t) {
				var n = { symbolizer: [] };
				n.symbolizer = {
					fill: !1,
					stroke: !1,
					graphic: !1
				}, this.readChildNodes(e, n), t.rules.push(n);
			},
			ElseFilter: function(e, t) {
				t.elseFilter = !0;
			},
			MinScaleDenominator: function(e, t) {
				t.minScaleDenominator = parseFloat(this.getChildValue(e));
			},
			MaxScaleDenominator: function(e, t) {
				t.maxScaleDenominator = parseFloat(this.getChildValue(e));
			},
			LabelPlacement: function(e, t) {
				this.readChildNodes(e, t);
			},
			PointPlacement: function(e, t) {
				var n = {};
				this.readChildNodes(e, n), n.labelRotation = n.rotation, delete n.rotation;
				var r, i = t.labelAnchorPointX, a = t.labelAnchorPointY;
				i <= 1 / 3 ? r = "l" : i > 1 / 3 && i < 2 / 3 ? r = "c" : i >= 2 / 3 && (r = "r"), a <= 1 / 3 ? r += "b" : a > 1 / 3 && a < 2 / 3 ? r += "m" : a >= 2 / 3 && (r += "t"), n.labelAlign = r;
			},
			AnchorPoint: function(e, t) {
				this.readChildNodes(e, t);
			},
			AnchorPointX: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.labelAnchorPointX = n);
			},
			AnchorPointY: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.labelAnchorPointY = n);
			},
			Displacement: function(e, t) {
				this.readChildNodes(e, t);
			},
			DisplacementX: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.labelXOffset = n);
			},
			DisplacementY: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.labelYOffset = n);
			},
			LinePlacement: function(e, t) {
				this.readChildNodes(e, t);
			},
			PerpendicularOffset: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.labelPerpendicularOffset = n);
			},
			Label: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.label = n);
			},
			Font: function(e, t) {
				this.readChildNodes(e, t);
			},
			Halo: function(e, t) {
				var n = {};
				this.readChildNodes(e, n), t.haloRadius = n.haloRadius, t.haloColor = n.fillColor, t.haloOpacity = n.fillOpacity;
			},
			Radius: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n !== null && (t.haloRadius = n);
			},
			Geometry: function(e, t) {
				t.geometry = {}, this.readChildNodes(e, t.geometry);
			},
			ColorMap: function(e, t) {
				t.colorMap = [], this.readChildNodes(e, t.colorMap);
			},
			ColorMapEntry: function(e, t) {
				var n = e.getAttribute("quantity"), r = e.getAttribute("opacity");
				t.push({
					color: e.getAttribute("color"),
					quantity: n === null ? void 0 : parseFloat(n),
					label: e.getAttribute("label") || void 0,
					opacity: r === null ? void 0 : parseFloat(r)
				});
			},
			Stroke: function(e, t) {
				t.stroke = !0, this.readChildNodes(e, t);
			},
			Fill: function(e, t) {
				t.fill = !0, this.readChildNodes(e, t);
			},
			CssParameter: function(e, t) {
				var n = e.getAttribute("name"), r = this.cssMap[n];
				if (t.label && (n === "fill" ? r = "fontColor" : n === "fill-opacity" && (r = "fontOpacity")), r) {
					var i = this.readers.ogc._expression.call(this, e);
					i && (t[r] = i);
				}
			},
			Graphic: function(e, t) {
				t.graphic = !0;
				var n = {};
				this.readChildNodes(e, n);
				for (var r = [
					"stroke",
					"strokeColor",
					"strokeWidth",
					"strokeOpacity",
					"strokeLinecap",
					"fill",
					"fillColor",
					"fillOpacity",
					"graphicName",
					"rotation",
					"graphicFormat"
				], i, a, o = 0, s = r.length; o < s; ++o) i = r[o], a = n[i], a !== void 0 && (t[i] = a);
				if (n.opacity !== void 0 && (t.graphicOpacity = n.opacity), n.size !== void 0) {
					var c = n.size / 2;
					isNaN(c) ? t.graphicWidth = n.size : t.pointRadius = n.size / 2;
				}
				n.href !== void 0 && (t.externalGraphic = n.href), n.rotation !== void 0 && (t.rotation = n.rotation);
			},
			ExternalGraphic: function(e, t) {
				this.readChildNodes(e, t);
			},
			Mark: function(e, t) {
				this.readChildNodes(e, t);
			},
			WellKnownName: function(e, t) {
				t.graphicName = this.getChildValue(e);
			},
			Opacity: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.opacity = n);
			},
			Size: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.size = n);
			},
			Rotation: function(e, t) {
				var n = this.readers.ogc._expression.call(this, e);
				n && (t.rotation = n);
			},
			OnlineResource: function(e, t) {
				t.href = this.getAttributeNS(e, this.namespaces.xlink, "href");
			},
			Format: function(e, t) {
				t.graphicFormat = this.getChildValue(e);
			}
		},
		ogc: {
			_expression: function(e) {
				for (var t, n = "", r = e.firstChild; r; r = r.nextSibling) switch (r.nodeType) {
					case 1:
						t = this.readNode(r), t.property ? n += "${" + t.property + "}" : t.value !== void 0 && (n += t.value);
						break;
					case 3:
					case 4:
						n += r.nodeValue;
						break;
					default: break;
				}
				return n;
			},
			Filter: function(e, t) {
				var n = {
					fids: [],
					filters: []
				};
				this.readChildNodes(e, n), n.fids.length > 0 ? t.filter = { fids: n.fids } : n.filters.length > 0 && (t.filter = n.filters[0]);
			},
			FeatureId: function(e, t) {
				var n = e.getAttribute("fid");
				n && t.fids.push(n);
			},
			And: function(e, t) {
				var n = { filters: ["&&"] };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			Or: function(e, t) {
				var n = { filters: ["||"] };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			Not: function(e, t) {
				var n = { filters: ["!"] };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsLike: function(e, t) {
				var n = { operator: "==" };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsEqualTo: function(e, t) {
				var n = { operator: "==" };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsNotEqualTo: function(e, t) {
				var n = { operator: "!=" };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsLessThan: function(e, t) {
				var n = { operator: "<" };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsGreaterThan: function(e, t) {
				var n = { operator: ">" };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsLessThanOrEqualTo: function(e, t) {
				var n = { operator: "<=" };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsGreaterThanOrEqualTo: function(e, t) {
				var n = { operator: ">=" };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			PropertyIsBetween: function(e, t) {
				var n = { operator: ".." };
				this.readChildNodes(e, n), t.filters.push(n);
			},
			Literal: function(e, t) {
				t.value = this.getChildValue(e);
			},
			PropertyName: function(e, t) {
				t.property = this.getChildValue(e);
			},
			LowerBoundary: function(e, t) {
				t.lowerBoundary = this.readers.ogc._expression.call(this, e);
			},
			UpperBoundary: function(e, t) {
				t.upperBoundary = this.readers.ogc._expression.call(this, e);
			},
			PropertyIsNull: function(e, t) {
				var n = { operator: "NULL" };
				this.readChildNodes(e, n), t.filters.push(n);
			}
		}
	}, r = function(n, r) {
		if (n === void 0) return e;
		typeof n == "string" && (n = N(n)), t = { namedLayers: [] }, this.readChildNodes(n, t), e = [];
		var i = {
			maxScaleDenominator: 1,
			minScaleDenominator: Infinity
		};
		return t.namedLayers[0].userStyles.each(function(t, n) {
			var a = n.style;
			r && a.setZIndex(r), e.push(a), n.rule && (n.rule.maxScaleDenominator && i.maxScaleDenominator < n.rule.maxScaleDenominator && (i.maxScaleDenominator = n.rule.maxScaleDenominator), n.rule.minScaleDenominator && i.minScaleDenominator > n.rule.minScaleDenominator && (i.minScaleDenominator = n.rule.minScaleDenominator));
		}), i.maxScaleDenominator === 1 && (i.maxScaleDenominator = void 0), i.minScaleDenominator === Infinity && (i.minScaleDenominator = void 0), i;
	}, i = function(e, t) {
		if (t === void 0 || e === void 0) return !1;
		var n, r, i = !1;
		if (n = t.get(e.property), n) switch (e.operator) {
			case "==":
				switch (typeof n) {
					case "string":
						r = e.value, i = n === r;
						break;
					case "number":
						r = parseInt(e.value, 10), i = parseInt(n, 10) === r;
						break;
					default: break;
				}
				break;
			case ">":
				r = parseInt(e.value, 10), i = parseInt(n, 10) > r;
				break;
			case "<":
				r = parseInt(e.value, 10), i = parseInt(n, 10) < r;
				break;
			case ">=":
				r = parseInt(e.value, 10), i = parseInt(n, 10) >= r;
				break;
			case "<=":
				r = parseInt(e.value, 10), i = parseInt(n, 10) <= r;
				break;
			case "!=":
				switch (typeof n) {
					case "string":
						r = e.value, i = n !== r;
						break;
					case "number":
						r = parseInt(e.value, 10), i = parseInt(n, 10) !== r;
						break;
					default: break;
				}
				break;
			case "NULL":
				switch (typeof n) {
					case "string":
						i = n.length === 0;
						break;
					case "number":
						r = parseInt(e.value, 10), i = parseInt(n, 10) !== r;
						break;
					default: break;
				}
				break;
			case "..":
				n = parseInt(n, 10), i = n >= parseInt(e.lowerBoundary, 10) && n <= parseInt(e.upperBoundary, 10);
				break;
			default: break;
		}
		else switch (e.operator) {
			case "NULL":
				i = !0;
				break;
			default: break;
		}
		return i;
	}, a = function(e, t) {
		e.get("isHidden") === void 0 && e.set("isHidden", t);
	}, o = function(e, t) {
		if (t === void 0) return !1;
		if (e === void 0) return !0;
		if (e.filters === void 0) return i(e, t);
		if (e.filters.length <= 1) return !0;
		var n, r = !1;
		switch (e.filters[0]) {
			case "&&":
				for (n = 1; n < e.filters.length && (r = o(e.filters[n], t), r); n++);
				break;
			case "||":
				for (n = 1; n < e.filters.length && (r = o(e.filters[n], t), !r); n++);
				break;
			case "!": break;
			default: break;
		}
		return r;
	}, s = function(e, t) {
		return l(e, t);
	}, c = function(e, t) {
		var n = l(e, t, !0);
		return n === void 0 && (n = l(e, t)), n;
	}, l = function(n, r, i) {
		i === void 0 && (i = !1);
		var s = [], c, l, f;
		if (t) {
			if (t.namedLayers[0].userStyles.each(function(e, t) {
				i && !t.isDefault ? o(t.rule.filter, n) && d(t.rule, r) && (c = t.style.getText(), c ? (l = c.getText(), c = Object.assign({}, t.style), f = u(l, n), c.getText().setText(f)) : s.push(t.style)) : !i && t.isDefault && o(t.rule.filter, n) && d(t.rule, r) && (c = t.style.getText(), c ? (l = c.getText(), c = Object.assign({}, t.style), f = u(l, n), c.getText().setText(f)) : s.push(t.style));
			}), c && s.push(c), s.length > 0) return s;
			i || a(n, !0);
			return;
		}
		return e;
	}, u = function(e, t) {
		return e.indexOf("${") >= 0 && (e = e.slice(e.indexOf("${") + 2), e.indexOf("}") >= 0 && (e = e.slice(0, e.indexOf("}")))), t.get(e);
	}, d = function(e, t) {
		if (e === void 0) return !0;
		var n = e.maxScaleDenominator ? e.maxScaleDenominator : Infinity, r = e.minScaleDenominator ? e.minScaleDenominator : 1;
		return t <= n && t >= r;
	};
	return {
		Sld: t,
		Styles: e,
		ParseSld: r,
		GetStyle: s,
		GetStyleForLegend: function() {
			if (t) return t.namedLayers[0].userStyles;
		},
		GetHoverStyle: c,
		defaultPrefix: "sld",
		namespaces: {
			sld: "http://www.opengis.net/sld",
			ogc: "http://www.opengis.net/ogc",
			gml: "http://www.opengis.net/gml",
			xlink: "http://www.w3.org/1999/xlink",
			xsi: "http://www.w3.org/2001/XMLSchema-instance"
		},
		namespaceAlias: {
			"http://www.opengis.net/sld": "sld",
			"http://www.opengis.net/ogc": "ogc",
			"http://www.opengis.net/gml": "gml",
			"http://www.w3.org/1999/xlink": "xlink",
			"http://www.w3.org/2001/XMLSchema-instance": "xsi"
		},
		getChildValue: function(e, t) {
			var n = t || "";
			if (e) for (var r = e.firstChild; r; r = r.nextSibling) switch (r.nodeType) {
				case 3:
				case 4:
					n += r.nodeValue;
					break;
				default: break;
			}
			return n;
		},
		readChildNodes: function(e, t) {
			t ||= {};
			for (var n = e.childNodes, r, i = 0, a = n.length; i < a; ++i) r = n[i], r.nodeType === 1 && this.readNode(r, t);
			return t;
		},
		readNode: function(e, t) {
			t ||= {};
			var n = this.readers[e.namespaceURI ? this.namespaceAlias[e.namespaceURI] : this.defaultPrefix];
			if (n) {
				var r = n[e.localName || e.nodeName.split(":").pop()] || n["*"];
				r && r.apply(this, [e, t]);
			}
			return t;
		},
		readers: n,
		cssMap: {
			stroke: "strokeColor",
			"stroke-opacity": "strokeOpacity",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-dasharray": "strokeDashstyle",
			fill: "fillColor",
			"fill-opacity": "fillOpacity",
			"font-family": "fontFamily",
			"font-size": "fontSize",
			"font-weight": "fontWeight",
			"font-style": "fontStyle"
		},
		getCssProperty: function(e) {
			var t = null;
			for (var n in this.cssMap) if (this.cssMap[n] === e) {
				t = n;
				break;
			}
			return t;
		},
		getAttributeNodeNS: function(e, t, n) {
			var r = null;
			if (e.getAttributeNodeNS) r = e.getAttributeNodeNS(t, n);
			else for (var i = e.attributes, a, o, s = 0, c = i.length; s < c; ++s) if (a = i[s], a.namespaceURI === t && (o = a.prefix ? a.prefix + ":" + n : n, o === a.nodeName)) {
				r = a;
				break;
			}
			return r;
		},
		getAttributeNS: function(e, t, n) {
			var r = "";
			if (e.getAttributeNS) r = e.getAttributeNS(t, n) || "";
			else {
				var i = this.getAttributeNodeNS(e, t, n);
				i && (r = i.nodeValue);
			}
			return r;
		},
		pixelRatio: 1,
		getStrokeDashstyle: function(e) {
			if (e) {
				e = e.split(" ");
				for (var t = 0; t < e.length; t++) e[t] = parseInt(e[t], 10) * this.pixelRatio;
				return e;
			} else return;
		},
		getStrokeWidth: function(e) {
			return parseInt(e.trim(), 10) * this.pixelRatio;
		},
		getFontValue: function(e) {
			var t = this, n = "";
			return n = t.addFontValue(n, e.fontStyle), n = t.addFontValue(n, e.fontWeight), e.fontSize && (e.fontSize.indexOf("px") < 0 ? (n = t.addFontValue(n, e.fontSize), n += "px") : n = t.addFontValue(n, e.fontSize)), n = t.addFontValue(n, e.fontFamily), n.trim();
		},
		addFontValue: function(e, t) {
			return t === void 0 ? e : (e.length > 0 && (e += " "), e + t);
		},
		getAlignValue: function(e) {
			if (e === void 0) return "center";
			var t = parseFloat(e);
			return t === 0 ? "left" : t > 0 && t < 1 ? "center" : "right";
		},
		getBaselineValue: function(e) {
			if (e === void 0) return "middle";
			var t = parseFloat(e);
			return t === 0 ? "bottom" : t > 0 && t < 1 ? "middle" : "top";
		},
		getColorValue: function(e, t) {
			e === void 0 && (e = "#000000");
			var n = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e.trim());
			if (!(n.length < 4)) return {
				r: parseInt(n[1], 16),
				g: parseInt(n[2], 16),
				b: parseInt(n[3], 16),
				a: t ? parseFloat(t.trim()) : 1,
				getValue: function() {
					return [
						this.r,
						this.g,
						this.b,
						this.a
					];
				}
			}.getValue();
		},
		getGraphicFormat: function(e) {
			var t;
			for (var n in this.graphicFormats) if (this.graphicFormats[n].test(e)) {
				t = n;
				break;
			}
			return t || this.defaultGraphicFormat;
		},
		defaultGraphicFormat: "image/png",
		graphicFormats: {
			"image/jpeg": /\.jpe?g$/i,
			"image/gif": /\.gif$/i,
			"image/png": /\.png$/i
		},
		multipleSymbolizers: !1,
		featureTypeCounter: null,
		defaultSymbolizer: {
			fillColor: "#808080",
			fillOpacity: 1,
			strokeColor: "#000000",
			strokeOpacity: 1,
			strokeWidth: 1,
			pointRadius: 3,
			graphicName: "square"
		}
	};
}, gd = (e, t, n, r, i, a, o, s, c, l, u, g, _, v) => {
	var y, b = [], x = [], S = [], C, w, T, E = !1, D = "", le = "", ue = 3e3, Te = 0, A = 0, j, M, ke, N, Ae, je, Me, Ne;
	function Pe(e, t) {
		D = t.proxyHost, le = t.ticketHost, T = t.hoverOptions;
		var n = t.numZoomLevels, r = [];
		r[0] = t.newMaxRes, w = [], w[0] = t.newMaxScale;
		for (var i = 1; i < n; i++) r[i] = r[i - 1] / 2, w[i] = w[i - 1] / 2;
		C = r;
		for (var a = new ee({
			code: t.coordinate_system,
			extent: t.extent,
			units: t.extentUnits
		}), o = ne({
			altShiftDragRotate: !1,
			pinchRotate: !1
		}), s = Array(t.numZoomLevels), l = t.matrixSet, u = 0; u < t.numZoomLevels; ++u) s[u] = t.basemap.matrixprefix ? l + ":" + u : s[u] = u;
		(t.basemap.matrixSet === null || t.basemap.matrixSet === "" || t.basemap.matrixSet === void 0) && (t.basemap.matrixSet = t.basemap.matrixprefix ? t.coordinate_system : parseInt(t.coordinate_system.substr(t.coordinate_system.indexOf(":") + 1), 10));
		var d = t.basemap ? [new se({
			source: new De({
				url: t.basemap.url,
				layer: t.basemap.layers,
				matrixSet: t.basemap.matrixSet,
				format: t.basemap.format,
				projection: a,
				tileGrid: new Oe({
					origin: k(a.getExtent()),
					resolutions: r,
					matrixIds: s
				}),
				style: "default"
			}),
			zIndex: -1
		})] : [];
		return y = new O({
			target: e,
			renderer: t.renderer,
			layers: d,
			loadTilesWhileAnimating: !0,
			loadTilesWhileInteracting: !0,
			view: new te({
				projection: a,
				enableRotation: !1,
				center: t.center,
				zoom: t.zoom,
				resolutions: r,
				maxResolution: t.newMaxRes,
				numZoomLevels: n
			}),
			controls: [],
			overlays: [],
			interactions: o
		}), c && vn(), Fe(), t.showProgressBar && Le(), t.showMousePosition && Re(t.mouseProjectionPrefix), Ie(), y;
	}
	function Fe() {
		var t = y.getView();
		t.on("change:center", function() {
			var t = Pn();
			e.TriggerEvent(vi.ChangeCenter, t);
		}), t.on("change:resolution", function() {
			var t = Pn();
			e.TriggerEvent(vi.ChangeResolution, t);
		}), y.on("moveend", function() {
			ze();
			var t = Pn();
			e.TriggerEvent(vi.MapMoveend, t);
		});
	}
	function Ie() {
		cd(e, rt).Init(y), Ne = cd(), Ne.InitMessage("");
	}
	function Le() {
		pd(e).Init(y);
	}
	function Re(e) {
		var t = document.getElementById("mouseposition");
		if (t) {
			var n = y.getView().getProjection().getUnits(), r = Wn();
			e === void 0 && (e = "");
			var i = new re({
				coordinateFormat: function(t) {
					var i = "" + e, a = !1;
					if (i.length > 0) switch (n) {
						case "degrees":
							i = "", a = !0;
							break;
						default:
							switch (r) {
								case "EPSG:25831":
								case "EPSG:32631":
									i += "31 ";
									break;
								case "EPSG:25832":
								case "EPSG:32632":
									i += "32 ";
									break;
								case "EPSG:25833":
								case "EPSG:32633":
									i += "33 ";
									break;
								case "EPSG:25834":
								case "EPSG:32634":
									i += "34 ";
									break;
								case "EPSG:25835":
								case "EPSG:32635":
									i += "35 ";
									break;
								case "EPSG:25836":
								case "EPSG:32636":
									i += "36 ";
									break;
								case "EPSG:25837":
								case "EPSG:32637":
									i += "37 ";
									break;
								case "EPSG:25838":
								case "EPSG:32638":
									i += "38 ";
									break;
								default:
									i += "33 ";
									break;
							}
							break;
					}
					return a ? i += Math.round(t[1] * 1e4) / 1e4 + ke.north + Math.round(t[0] * 1e4) / 1e4 + ke.east : i += parseInt(t[1], 10) + ke.north + parseInt(t[0], 10) + ke.east, i;
				},
				projection: r,
				className: "mousePosition",
				target: t
			});
			y.addControl(i);
		}
	}
	function ze() {
		var e = (/* @__PURE__ */ new Date()).getTime();
		e < Te + 6e4 || (Te = e, y.getLayers() && y.getLayers().forEach(function(t) {
			var n = t.getSource();
			if (n && n.getParams) {
				var r = n.getParams();
				if (r && r.ticket) {
					var i = n.get("timestamp");
					i && Math.round((e - i) / 1e3) > ue && P(n);
				}
			}
		}));
	}
	function P(e) {
		e.updateParams({ ticket: qe() }), e.set("timestamp", (/* @__PURE__ */ new Date()).getTime());
	}
	function F(e) {
		if (y !== void 0) {
			var t = y.getView(), n, r, i;
			if (e.lon && (n = e.lon), e.lat && (r = e.lat), e.zoom && (i = e.zoom), n !== void 0 && r !== void 0) {
				var a = typeof r == "number" ? r : parseFloat(r.replace(/,/g, ".")), o = typeof n == "number" ? n : parseFloat(n.replace(/,/g, "."));
				isFinite(a) && isFinite(o) && t.setCenter([o, a]);
			}
			i !== void 0 && t.setZoom(i);
		}
	}
	function I(e, t) {
		var n = et(e);
		if (e.format === hr.geoJson) {
			var r = JSON.parse(t), i = new f().readFeatures(r);
			if (e.id && e.name) for (var a = 0; a < i.length; ++a) i[a].getProperties().Guid === void 0 && i[a].setProperties({ Guid: lt.newGuid() }), i[a].setId(e.name + "." + i[a].getProperties().Guid);
			n.getSource().addFeatures(i);
		}
	}
	function L(e, t) {
		var n = et(e);
		if (e.format === hr.geoJson) {
			for (var r = JSON.parse(t), i = new f().readFeatures(r), a = 0; a < i.length; ++a) if (i[a].getProperties().Guid) {
				var o = n.getSource().getFeatureById(e.name + "." + i[a].getProperties().Guid);
				o && n.getSource().removeFeature(o);
			}
		}
	}
	function Be(e) {
		var t = et(e);
		t !== void 0 && t.getSource().clear();
	}
	function Ve(e) {
		var t = !1;
		return y.getLayers().forEach(function(n) {
			!t && n.guid === e.id && (t = !0);
		}), t;
	}
	function He(e) {
		if (!Ve(e)) {
			var t = Xe(e);
			t && (t.sortingIndex = e.sortingIndex, y.addLayer(t), xt());
		}
	}
	function Ue(e) {
		var t = et(e);
		if (t !== null) return rr(t);
	}
	function We(e) {
		if (!Ve(e)) {
			var t = Xe(e);
			t && (y.getLayers().insertAt(0, t), xt());
		}
	}
	function Ge(e) {
		if (Ve(e)) {
			var t = pt(e.id);
			t && (y.removeLayer(t), xt());
		}
	}
	function Ke(e, t) {
		if (Array.isArray(e) && (e = e[0]), t) return Array.isArray(D) ? D[0] + e : D + e;
		if (!Array.isArray(D)) return D + e;
		for (var n = [], r = 0; r < D.length; r++) n.push(D[r] + e);
		return n;
	}
	function qe() {
		if (le) (!j || Je()) && (j = sd.default.ajax({
			type: "GET",
			url: le,
			async: !1
		}).responseText.trim().replace(/"/g, ""), A = (/* @__PURE__ */ new Date()).getTime());
		else return null;
		return j;
	}
	function Je() {
		var e = (/* @__PURE__ */ new Date()).getTime();
		return e < A + ue * 1e3 ? (A = e, !1) : !0;
	}
	function Ye(t, n) {
		t.set("config", n), t.on("change", function() {
			t.set("loading", !0);
		}, t), t.on("render", function() {
			t.get("loading") && (t.set("loading", void 0), e.TriggerEvent(vi.LoadingLayerEnd, t));
		}, t);
	}
	function Xe(t) {
		var n, r, i = et(t), a = !0, o;
		N && N.length > 0 && (o = { isyToken: N });
		var s = function(r) {
			n.set("config", t);
			var i = S[t.id].ParseSld(r, parseInt(t.id, 10));
			i.maxScaleDenominator && Qe(n, R(i.maxScaleDenominator), "styleCallback"), i.minScaleDenominator && Ze(n, R(i.minScaleDenominator), "styleCallback"), nt(t), b.push(n), n.sortingIndex = t.sortingIndex, y.addLayer(n), e.TriggerEvent(vi.LayerCreated, b), _t(), xt();
		};
		if (i !== null) n = i, n.set("config", t);
		else {
			switch (t.source) {
				case U.wmts:
					r = ud(t, o);
					break;
				case U.proxyWmts:
					t.url = Ke(t.url), r = ud(t, o);
					break;
				case U.wms:
					r = ld(t, o), t.ticket && (c === void 0 || !c.IsActive()) && P(r);
					break;
				case U.proxyWms:
					t.url = Ke(t.url), r = ld(t, o);
					break;
				case U.vector:
					r = dd(t), t.url !== "" && (t.noProxy || (t.url = Ke(t.url)));
					break;
				case U.wfs:
					t.noProxy, r = fd(t, c, o);
					break;
				default: throw Error("Unsupported source: SOURCES.'" + t.source + "'. For SubLayer with url " + t.url + " and name " + t.name + ".");
			}
			t.source === U.vector ? t.style ? typeof t.style == "object" || t.style.indexOf("http") < 0 ? (S[t.id] = md(t.style), n = new ce({
				source: r,
				style: function(e, n) {
					return S[t.id].GetStyle(e, at(n));
				}
			})) : (S[t.id] = new hd(), n = new ce({
				source: r,
				style: function(e, n) {
					return S[t.id].GetStyle(e, at(n));
				}
			}), t.style && (a = !1, En(t.style, "application/xml", s)), Ye(n, t)) : n = new ce({ source: new de({
				format: new f({ dataProjection: t.coordinate_system }),
				url: t.url
			}) }) : t.source === U.wfs ? (S[t.id] = new hd(), n = new ce({
				source: r,
				style: function(e, n) {
					return S[t.id].GetStyle(e, at(n));
				}
			}), t.style && (a = !1, En(t.style, "application/xml", s)), Ye(n, t)) : n = t.tiled ? new se({
				extent: t.extent,
				opacity: t.opacity,
				source: r
			}) : new oe({
				extent: t.extent,
				opacity: t.opacity,
				source: r
			}), n.set("config", t), n.layerIndex = t.layerIndex, n.guid = t.id, n.typename = t.name, n.tooltipTemplate = t.tooltipTemplate, t.minResolution !== void 0 && n.setMinResolution(t.minResolution), t.maxResolution !== void 0 && n.setMaxResolution(t.maxResolution), t.maxScale &&= Qe(n, R(t.maxScale), "layer"), t.minScale &&= Ze(n, R(t.minScale), "layer"), a && (nt(t), b.push(n));
		}
		if (a) return n;
	}
	function Ze(e, t) {
		if (e && t) {
			var n = e.getMinResolution();
			return n && n >= t ? void 0 : (e.setMinResolution(t), t);
		}
	}
	function Qe(e, t) {
		if (e && t) {
			var n = e.getMaxResolution();
			return n && n <= t ? void 0 : (e.setMaxResolution(t), t);
		}
	}
	function $e(e, t) {
		var n = function(e) {
			e = typeof e == "object" ? e : JSON.parse(e);
			for (var n = new f(), r = 0; r < e.features.length; r++) {
				var i = e.features[r];
				i.type && t.addFeature(n.readFeature(i));
			}
		};
		sd.default.ajax({
			url: e.url,
			async: !1
		}).done(function(e) {
			n(e);
		});
	}
	function et(e) {
		for (var t = 0; t < b.length; t++) {
			var n = b[t];
			if (n.guid === e.id) return n;
		}
		return null;
	}
	function tt(e) {
		for (var t = 0; t < b.length; t++) {
			var n = b[t];
			if (n.guid === e) return n;
		}
		return null;
	}
	function nt(e) {
		for (var t = !1, n = 0; n < x.length; n++) if (e.id === x[n].id) {
			t = !0;
			break;
		}
		t || x.push(e);
	}
	function rt(e) {
		for (var t, n = 0; n < x.length; n++) if (x[n].id === e.guid) {
			t = x[n];
			break;
		}
		return t;
	}
	function it(e) {
		var t = e.get("layerguid");
		if (t === void 0) {
			if (t = e.getId(), t === void 0) return null;
			if (t.indexOf(".") > 0) t = t.slice(0, t.indexOf("."));
			else {
				var n = t.substr(0, t.indexOf("_")) + ":" + t.substr(t.indexOf("_") + 1);
				t = n.slice(0, n.indexOf("_"));
			}
			for (var r = 0; r < b.length; r++) {
				var i = b[r], a = i.typename;
				if (a.indexOf(":") > 0 && (a = a.slice(a.indexOf(":") + 1)), a === t) return i;
			}
		} else for (var o = 0; o < b.length; o++) if (t === b[o].guid) return b[o];
		return null;
	}
	var at = function(e) {
		if (e !== void 0) {
			for (var t, n = 0; n < C.length; n++) if (C[n] === e) {
				t = w[n];
				break;
			}
			return t;
		}
	}, R = function(e) {
		if (e === void 0 && (e = nr()), e === 1) return C[C.length - 1];
		if (e !== Infinity) {
			for (var t = -1, n = 0; n < w.length; n++) if (w[n] < e) {
				t = n - 1;
				break;
			}
			return t < 0 ? C[C.length - 1] : C[t];
		}
	};
	function ot(e, t) {
		var n = pt(e.id);
		n && !isNaN(t) && n.setBrightness(Math.min(t, 1));
	}
	function st(e, t) {
		var n = pt(e.id);
		n && !isNaN(t) && n.setContrast(Math.min(t, 1));
	}
	function ct(e, t) {
		var n = pt(e.id);
		n && !isNaN(t) && n.setOpacity(Math.min(t, 1));
	}
	function ut(e, t) {
		var n = pt(e.id);
		n && !isNaN(t) && n.setSaturation(Math.min(t, 1));
	}
	function dt(e, t) {
		var n = pt(e.id);
		n && !isNaN(t) && n.setHue(Math.min(t, 1));
	}
	function ft() {
		return y.getLayers().getArray().filter((e) => e.guid !== void 0);
	}
	function pt(e) {
		for (var t = ft(), n = 0; n < t.length; n++) {
			var r = t[n];
			if (r.guid === e) return r;
		}
		return null;
	}
	function mt(e) {
		for (var t = ft(), n = 0; n < t.length; n++) if (t[n].guid === e.id) return n;
		return null;
	}
	function ht(e) {
		for (var t = ft(), n = 0; n < t.length; n++) if (t[n].get("title") === e) return t[n];
		return null;
	}
	function gt(e, t) {
		for (var n = mt(e), r = y.getLayers().getArray(), i = 0; i < r.length; i++) if (r[i].guid === void 0) {
			r.splice(i, 1);
			break;
		}
		r.splice(t, 0, r.splice(n, 1)[0]), xt();
	}
	function _t() {
		vt(y.getLayers().getArray(), "sortingIndex"), xt();
	}
	function vt(e, t) {
		return e.sort(function(e, n) {
			var r = e[t], i = n[t];
			return r > i ? -1 : +(r < i);
		});
	}
	function yt(e) {
		for (var t = y.getLayers().getArray(), n = 0; n < t.length; n++) if (t[n].guid === e) return t[n];
	}
	function bt(e) {
		for (var t = 0; t < e.length && e[t].isyLayers !== void 0; t++) for (var n = 0; n < e[t].isyLayers.length; n++) for (var r = 0; r < e[t].isyLayers[n].subLayers.length; r++) {
			var i = yt(e[t].isyLayers[n].subLayers[r].id);
			i !== void 0 && (i.sortingIndex = e[t].isyLayers[n].subLayers[r].sortingIndex);
		}
	}
	function xt() {
		var t = Pn();
		e.TriggerEvent(vi.ChangeLayers, t);
	}
	function St() {
		for (var e = [], t = ft(), n = 0; n < t.length; n++) t[n].getVisible() === !0 && e.push(t[n]);
		e.sort(Ct);
		for (var r = [], i = 0; i < e.length; i++) r.push(e[i].guid);
		return r.join(",");
	}
	function Ct(e, t) {
		return e.mapLayerIndex < t.mapLayerIndex ? -1 : +(e.mapLayerIndex > t.mapLayerIndex);
	}
	var wt = function() {
		i.WindowResized(y);
	};
	function z(e) {
		i.Activate(e, y, Dt), window.addEventListener("resize", wt, !1);
	}
	function Tt() {
		window.removeEventListener("resize", wt, !1), i.Deactivate(Dt);
	}
	function Et(e) {
		i.ExportMap(e, y);
	}
	function Dt() {
		y && y.updateSize();
	}
	function Ot() {
		y.getLayers().forEach(function(e) {
			jt(e);
		});
	}
	function kt(e, t) {
		e && jt(tt(e), void 0, t);
	}
	function At(e, t) {
		jt(et(e), e, t);
	}
	function jt(t, n, r) {
		if (t !== void 0 && (n === void 0 && (n = rt(t)), n !== void 0)) {
			var i;
			N && N.length > 0 && (i = { isyToken: N });
			var a;
			switch (n.source) {
				case U.wmts:
					a = new ud(n, i);
					break;
				case U.proxyWmts:
					a = new ud(n, i);
					break;
				case U.wms:
					a = new ld(n, i);
					break;
				case U.proxyWms:
					a = new ld(n, i);
					break;
				case U.vector:
					a = new dd(n), n.url !== "" && $e(n, a);
					break;
				case U.wfs:
					i._olSalt = Math.random(), a = new fd(n, c, i, r, e);
					break;
				default: break;
			}
			a && t.setSource(a);
		}
	}
	var Mt = function(e) {
		if (e.length !== 0 && !(N && N === e)) {
			N = e;
			for (var t = { isyToken: N }, n = 0; n < x.length; n++) {
				x[n].isyToken = N;
				var r = x[n], i, a = et(r), o = !1;
				switch (r.source) {
					case U.wms:
					case U.wmts:
					case U.proxyWms:
					case U.proxyWmts:
						i = a.getSource();
						break;
					case U.vector:
						o = !0, i = new dd(r), r.url !== "" && $e(r, i);
						break;
					case U.wfs:
						o = !0, i = new fd(r, c, t);
						break;
					default: break;
				}
				i && (o ? a.setSource(i) : i.updateParams(t));
			}
		}
	}, Nt = function() {
		N = void 0;
		for (var e = { isyToken: "" }, t = 0; t < x.length; t++) {
			x[t].isyToken = N;
			var n = x[t], r, i = et(n), a = !1;
			switch (n.source) {
				case U.wms:
				case U.wmts:
				case U.proxyWms:
				case U.proxyWmts:
					r = i.getSource();
					break;
				case U.vector:
					a = !0, r = new dd(n), n.url !== "" && $e(n, r);
					break;
				case U.wfs:
					a = !0, r = new fd(n, c);
					break;
				default: break;
			}
			r && (a ? i.setSource(r) : r.updateParams(e));
		}
	};
	function B(e) {
		Ne.ShowCustomMessage(e);
	}
	function Pt() {
		y.renderSync();
	}
	function Ft(e) {
		r.ActivateInfoClick(e, y);
	}
	function V() {
		r.DeactivateInfoClick(y);
	}
	function It(e, t) {
		return D + r.GetFeatureInfoUrl(e, et(e), t, y.getView());
	}
	function Lt(e, t) {
		r.ShowHighlightedFeatures(tn(e, t), y);
	}
	function Rt() {
		r.ClearHighlightedFeatures();
	}
	function zt(e, t) {
		r.ShowInfoMarker(e, t, y);
	}
	function Bt(e, t) {
		r.ShowInfoMarkers(e, t, y);
	}
	function Vt(e) {
		r.RemoveInfoMarker(e, y);
	}
	function Ht(e) {
		r.RemoveInfoMarkers(e, y);
	}
	function Ut(e) {
		r.SetHighlightStyle(e);
	}
	function Wt(e) {
		r.ActivateBoxSelect(e, y);
	}
	function Gt() {
		r.DeactivateBoxSelect(y);
	}
	Array.prototype.where = function(e) {
		for (var t = [], n = 0; n < this.length; n++) e(this[n]) && t.push(this[n]);
		return t;
	};
	function Kt(e, t, n, r, i) {
		return Array.prototype.slice.call(r.getElementsByTagName(e), 0).where(function(e) {
			return i ? e.getAttribute(t).toLowerCase() === n.toLowerCase() : e.getAttribute(t).indexOf(n) > -1 || n.indexOf(e.getAttribute(t)) > -1;
		});
	}
	function qt(t) {
		var n = Ae.name.split(":");
		if (n.length > 0) n = n[n.length - 1];
		else return;
		var r = Kt("element", "name", n, t, !0)[0], i = Kt("element", "type", Me, r, !1)[0];
		if (i !== void 0) {
			i = i.getAttribute("name");
			var a = t.firstChild.getAttribute("targetNamespace");
			if (je.format === void 0) {
				var o;
				switch (Ae.version) {
					case "1.0.0":
						o = new h();
						break;
					case "1.1.0":
						o = new ie();
						break;
					case "2.0.0":
						o = new ie();
						break;
					default:
						o = new d();
						break;
				}
				je.format = new p({
					featureType: Ae.providerName,
					featureNS: a,
					gmlFormat: o
				});
			}
			Ae.featureNS = a, Ae.geometryName = i, e.TriggerEvent(vi.FeatureHasBeenDescribed, [Ae, je]);
		}
	}
	function Jt(e, t) {
		Ae = e, Me = t, je = new de({ projection: fe(e.coordinate_system) }), je.set("type", "ol.source.Vector");
		var n = e.url;
		Array.isArray(e.url) && (n = e.url[0]), n.toLowerCase().indexOf("service=wfs") < 0 && (n += "service=WFS&"), n += "request=DescribeFeatureType&version=" + e.version + "&typename=" + e.name, sd.default.ajax({ url: n }).done(function(e) {
			qt(e);
		});
	}
	function Yt(e, t) {
		return r.GetExtentForCoordinate(e, t, y.getView().getResolution());
	}
	function Xt(e, t) {
		return r.GetFeaturesInExtent(t, et(e), y.getView().getResolution());
	}
	function Zt(e) {
		return r.GetFeatureCollection(et(e));
	}
	function Qt(e) {
		return r.GetFeaturesInMap(et(e));
	}
	function $t(e) {
		return it(e);
	}
	function en(e, t) {
		var n = this.GetLayerByFeature(e);
		if (n) return S[n.guid] ? S[n.guid].GetHoverStyle(e, at(t)) : n.getStyle ? n.getStyle() : void 0;
	}
	function tn(e, t) {
		if (e === void 0) return t;
		for (var n = at(y.getView().getResolution()), r, i = function(e) {
			for (var t = 0; t < r.attributes.length; t++) if (e === r.attributes[t][0]) return r.attributes[t][1];
		}, a = 0; a < t.length; a++) {
			r = t[a], t[a].get === void 0 && (t[a].get = i);
			var o = S[e].GetHoverStyle(t[a], n);
			o && (t[a].hoverstyle = o);
		}
		return t;
	}
	function nn(e) {
		return r.GetFeatureExtent(e);
	}
	function rn(e) {
		a.ActivateHoverInfo(y, e, this, T);
	}
	function an() {
		a.DeactivateHoverInfo(y);
	}
	function on(e, t) {
		n.Activate(y, e, t);
	}
	function sn() {
		n.Deactivate(y);
	}
	function cn(e, t) {
		o.Activate(y, e, t);
	}
	function ln() {
		o.Deactivate(y);
	}
	function un(e) {
		l.Activate(y, e);
	}
	function dn() {
		l.Deactivate(y);
	}
	function fn(e) {
		g.Activate(y, e);
	}
	function pn(e) {
		g.AddCoordinates(e);
	}
	function mn() {
		g.Deactivate(y);
	}
	function hn(e) {
		u.Activate(y, e);
	}
	function gn() {
		u.Deactivate(y);
	}
	function _n(e, t) {
		s.Activate(y, e, t);
	}
	function H() {
		s.Deactivate(y);
	}
	function vn() {
		c && c.Init(y, e);
	}
	function yn() {
		c && c.Activate();
	}
	function bn(t, n, r) {
		c && c.StartCaching(t, n, r, e);
	}
	function xn() {
		c.StopCaching();
	}
	function Sn(e, t, n) {
		c.DeleteDatabase(e, t, n);
	}
	function Cn() {
		return c.CacheDatabaseExist();
	}
	function wn(e, t, n) {
		if (c) return c.CalculateTileCount(e, t, n);
	}
	function Tn(e, t, n) {
		c && c.GetResource(e, t, n);
	}
	function En(e, t, n) {
		c && c.GetConfigResource(e, t, n);
	}
	function Dn(e, t, n) {
		c && c.GetResourceFromJson(e, t, n);
	}
	function On(e, t, n) {
		c && c.GetLayerResource(e, t, n);
	}
	function kn() {
		c && c.Deactivate();
	}
	var An = function(e) {
		_.Activate(y, e);
	}, jn = function() {
		_.Deactivate(y);
	}, Mn = function(e) {
		v.Activate(y, e);
	}, Nn = function() {
		v.Deactivate(y);
	}, Pn = function() {
		if (y !== void 0) {
			var e = { layers: St() }, t = y.getView(), n = t.getCenter(), r = t.getZoom();
			return r && (e.zoom = r.toString()), n && (e.lat = n[1].toFixed(2), e.lon = n[0].toFixed(2)), e;
		}
	}, Fn = function(e) {
		var t = et(e);
		if (t) {
			var n = t.getSource().getExtent === void 0 ? t.getSource().getTileGrid().getExtent() : t.getSource().getExtent();
			Array.isArray(n) && n[0] !== Infinity && (Ce(n, y.getView().getCenter()) || y.getView().fit(n, y.getSize()));
		}
	}, In = function(e) {
		var t = [
			Infinity,
			Infinity,
			-Infinity,
			-Infinity
		], n = function(e) {
			t[0] > e[0] && (t[0] = e[0]), t[1] > e[1] && (t[1] = e[1]), t[2] < e[2] && (t[2] = e[2]), t[3] < e[3] && (t[3] = e[3]);
		};
		e.forEach(function(e) {
			var t = et(e);
			if (t) {
				var r = t.getSource().getExtent();
				Array.isArray(r) && r[0] !== Infinity && n(r);
			}
		}), Array.isArray(t) && t[0] !== Infinity && y.getView().fit(t, y.getSize());
	}, Ln = function(e) {
		y.getView().fit(e, y.getSize());
	}, Rn = function() {
		var e, t = y.getView(), n = t.getCenter(), r = t.getZoom();
		return e = {
			lon: n[0],
			lat: n[1],
			zoom: r
		}, e;
	}, zn = function(e) {
		var t = y.getView();
		e.epsg && (e = Gn(e, Wn())), t.setCenter([e.lon, e.lat]), e.zoom && t.setZoom(e.zoom);
	}, Bn = function() {
		return y.getView().getZoom();
	}, Vn = function(e) {
		return y.getView().setZoom(e);
	}, Hn = function() {
		return y.getView().getRotation();
	}, Un = function(e, t) {
		var n = y.getView();
		t ? n.rotate(e, t) : n.setRotation(e);
	}, Wn = function() {
		return y.getView().getProjection().getCode();
	};
	function Gn(e, t) {
		if (e.epsg !== "" && t !== "" && e.epsg !== t) {
			var n = pe([e.lon, e.lat], e.epsg, t);
			t === "EPSG:4326" && (n = [n[1], n[0]]), e.lon = n[0], e.lat = n[1], e.epsg = t;
		}
		return e;
	}
	function Kn(e, t, n) {
		var r = n;
		if (e !== "" && t !== "" && e !== t) {
			var i = me(n, e, t);
			r = i, t === "EPSG:4326" && (r = i[1] + "," + i[0] + "," + i[3] + "," + i[2]);
		}
		return r;
	}
	function qn(e) {
		var t = new m().read(e), n = new d().readFeatures(t);
		return new f().writeFeatures(n);
	}
	function Jn(e, t) {
		var n = new be([e, t]), r = new Se();
		return r.setGeometry(n), new f().writeFeature(r);
	}
	function Yn() {
		var e = new ge();
		y.addControl(e);
	}
	function Xn() {
		var e = new _e();
		y.addControl(e);
	}
	function Zn(e) {
		var t = new ve({ extent: e });
		y.addControl(t);
	}
	function Qn() {
		var e = new he();
		y.addControl(e);
	}
	var $n = function(e, t) {
		for (var n = [], r = dd(e.subLayers[0], y.getView().getProjection()), i = fe(e.subLayers[0].coordinate_system), a = fe(r.getProjection().getCode()), o = r.parser.readFeatures(t), s = 0; s < o.length; s++) {
			var c = o[s];
			c.getGeometry().transform(i, a), n.push(c);
		}
		return n;
	}, er = function() {
		return y ? y.getLayers().getArray().length : 0;
	}, tr = function(e) {
		return we(e);
	}, nr = function() {
		return w[y.getView().getZoom()];
	}, rr = function(e) {
		if (S[e.guid] !== void 0) return S[e.guid].GetStyleForLegend();
	}, ir = function() {
		return y.getView().calculateExtent(y.getSize());
	}, ar = function() {
		return Pn();
	};
	function or(e) {
		var t = new ce({
			source: new de(),
			projection: y.getView().getProjection()
		});
		t.guid = e, y.addLayer(t), xt();
	}
	function sr(e, t) {
		var n = pt(99999);
		if (n !== null) {
			var r = n.getSource();
			r.clear();
			var i = new ae.Style({
				image: new ae.Circle({
					radius: 6,
					stroke: new ae.Stroke({
						color: "rgba(255,255,255,0.8)",
						width: 2
					}),
					fill: new ae.Fill({ color: "rgba(32,170,172,0.8)" })
				}),
				fill: new ae.Fill({ color: "rgba(0,102,204,0.15)" }),
				zIndex: Infinity
			}), a = new Se({
				geometry: new xe([new be(e), new ye(e, parseInt(t, 10))]),
				name: "geolocation_center"
			});
			if (a.setStyle(i), r.addFeature(a), E) {
				E = !1;
				var o = a.getGeometry().getExtent();
				o[0] -= 5 * t, o[1] -= 5 * t, o[2] += 5 * t, o[3] += 5 * t, y.getView().fit(o, y.getSize());
			}
		}
	}
	function cr() {
		var t = y.getView(), n = M.getPosition();
		if (n !== void 0) {
			t.setCenter(n), sr(n, M.getAccuracy());
			var r = {
				center: n,
				accuracy: Math.round(M.getAccuracy() * 10) / 10,
				altitude: M.getAltitude(),
				altitudeAccuracy: M.getAltitudeAccuracy(),
				heading: M.getHeading(),
				speed: M.getSpeed()
			};
			e.TriggerEvent(vi.GeolocationUpdated, r);
		}
	}
	var lr = function() {
		M = new Ee({
			projection: y.getView().getProjection(),
			tracking: !0,
			trackingOptions: { maximumAge: 0 }
		}), or(99999), E = !0, M.on("change:position", cr), M.on("change:accuracy", cr);
	}, ur = function() {
		var e = pt(99999);
		e !== null && (y.removeLayer(e), xt()), M !== void 0 && (M.un("change:position", cr), M.un("change:accuracy", cr), M = void 0);
	}, dr = function() {
		return D;
	}, fr = function(e) {
		ke = e;
	}, pr = function(e, t, n) {
		if (Z.defs(e) && Z.defs(t)) return Z(e, t).forward(n);
	}, mr = function(e) {
		var t = Wn();
		if (Z.defs(t)) return Z(t).forward(e);
	}, gr = function(e) {
		var t = Wn();
		if (Z.defs(t)) return Z(t).inverse(e);
	};
	function _r(e, t) {
		var n = pt(e.id);
		n && !isNaN(t) && n.setZIndex(t);
	}
	function vr(e) {
		var t = pt(e.id);
		return t ? t.getZIndex() : "";
	}
	return {
		InitMap: Pe,
		ChangeView: F,
		AddDataToLayer: I,
		RemoveDataFromLayer: L,
		ClearLayer: Be,
		ShowLayer: He,
		ShowBaseLayer: We,
		HideLayer: Ge,
		GetLayerByName: ht,
		SetLayerOpacity: ct,
		SetLayerSaturation: ut,
		SetLayerHue: dt,
		SetLayerBrightness: ot,
		SetLayerContrast: st,
		MoveLayerToIndex: gt,
		GetLayerIndex: mt,
		GetLegendStyles: Ue,
		RefreshLayer: jt,
		RefreshIsyLayer: At,
		RedrawMap: Dt,
		RefreshMap: Ot,
		RefreshLayerByGuid: kt,
		RenderSync: Pt,
		ExportMap: Et,
		ActivateExport: z,
		DeactivateExport: Tt,
		ActivateInfoClick: Ft,
		DeactivateInfoClick: V,
		GetInfoUrl: It,
		ShowHighlightedFeatures: Lt,
		ClearHighlightedFeatures: Rt,
		ShowInfoMarker: zt,
		ShowInfoMarkers: Bt,
		SetHighlightStyle: Ut,
		RemoveInfoMarker: Vt,
		RemoveInfoMarkers: Ht,
		ActivateBoxSelect: Wt,
		DeactivateBoxSelect: Gt,
		GetFeaturesInExtent: Xt,
		GetExtentForCoordinate: Yt,
		GetFeatureCollection: Zt,
		GetFeatureExtent: nn,
		GetFeaturesInMap: Qt,
		GetLayerByFeature: $t,
		GetHoverStyle: en,
		GetLegendStyleFromLayer: rr,
		ActivateHoverInfo: rn,
		DeactivateHoverInfo: an,
		ActivateMeasure: on,
		DeactivateMeasure: sn,
		ActivateMeasureLine: cn,
		DeactivateMeasureLine: ln,
		ActivateAddLayerFeature: un,
		DeactivateAddLayerFeature: dn,
		ActivateAddFeatureGps: fn,
		AddCoordinatesGps: pn,
		DeactivateAddFeatureGps: mn,
		ActivateModifyFeature: hn,
		DeactivateModifyFeature: gn,
		ActivateDrawFeature: _n,
		DeactivateDrawFeature: H,
		ActivateOffline: yn,
		StartCaching: bn,
		StopCaching: xn,
		DeleteDatabase: Sn,
		CacheDatabaseExist: Cn,
		CalculateTileCount: wn,
		GetResource: Tn,
		GetConfigResource: En,
		GetLayerResource: On,
		DeactivateOffline: kn,
		GetResourceFromJson: Dn,
		ActivatePrintBoxSelect: An,
		DeactivatePrintBoxSelect: jn,
		ActivateAddLayerUrl: Mn,
		DeactivateAddLayerUrl: Nn,
		TransformBox: Kn,
		ConvertGmlToGeoJson: qn,
		ExtentToGeoJson: Jn,
		AddZoom: Yn,
		AddZoomSlider: Xn,
		AddZoomToExtent: Zn,
		AddScaleLine: Qn,
		ZoomToLayer: Fn,
		ZoomToLayers: In,
		FitExtent: Ln,
		GetCenter: Rn,
		SetCenter: zn,
		GetZoom: Bn,
		SetZoom: Vn,
		GetRotation: Hn,
		SetRotation: Un,
		GetEpsgCode: Wn,
		GetVectorLayers: $n,
		GetLayerCount: er,
		GetCenterFromExtent: tr,
		GetScale: nr,
		SortLayerBySortIndex: _t,
		UpdateLayerSortIndex: bt,
		GetExtent: ir,
		GetUrlObject: ar,
		GetGeolocation: lr,
		RemoveGeolocation: ur,
		GetProxyHost: dr,
		SetTranslateOptions: fr,
		TransformCoordinates: pr,
		TransformFromGeographic: mr,
		TransformToGeographic: gr,
		DescribeFeature: Jt,
		RemoveIsyToken: Nt,
		SetIsyToken: Mt,
		ShowCustomMessage: B,
		SetZIndex: _r,
		GetZIndex: vr
	};
}, _d = class e {
	static loadCustomCrs() {
		Z.defs("EPSG:25831", "+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), Z.defs("EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), Z.defs("EPSG:25833", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), Z.defs("EPSG:25834", "+proj=utm +zone=34 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), Z.defs("EPSG:25835", "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), Z.defs("EPSG:25836", "+proj=utm +zone=36 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"), Z.defs("EPSG:32631", "+proj=utm +zone=31 +datum=WGS84 +units=m +no_defs"), Z.defs("EPSG:32632", "+proj=utm +zone=32 +datum=WGS84 +units=m +no_defs"), Z.defs("EPSG:32633", "+proj=utm +zone=33 +datum=WGS84 +units=m +no_defs"), Z.defs("EPSG:32634", "+proj=utm +zone=34 +datum=WGS84 +units=m +no_defs"), Z.defs("EPSG:32635", "+proj=utm +zone=35 +datum=WGS84 +units=m +no_defs"), Z.defs("EPSG:32636", "+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs"), Z.defs("EPSG:3575", "+proj=laea +lat_0=90 +lon_0=10 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"), Z.defs("EPSG:4258", "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs"), Ne(Z);
	}
	static addCustomProj(e) {
		je(new Ae({
			code: e,
			units: "m"
		}));
	}
	static toDms(t) {
		let n = parseInt(t, 10), r = parseInt((t - n) * 60, 10), i = (t - n - r / 60) * 3600;
		return `${n}° ${e.zerofill(r)}' ${e.zerofill(i.toFixed(2))}''`;
	}
	static zerofill(e) {
		return e < 10 ? `0${e}` : e;
	}
	static getResolutionForScale(e, t) {
		let n = Pe[t];
		return parseFloat(e) / (n * 39.37 * 90.7142857142857);
	}
	static roundScale(e) {
		let t;
		return e < 100 && (t = Math.round(e, 10)), e >= 100 && e < 1e4 && (t = Math.round(e / 10) * 10), e >= 1e4 && e < 1e6 && (t = Math.round(e / 100) * 100), e >= 1e6 && (t = Math.round(e / 1e3) * 1e3), t;
	}
}, vd = class {
	constructor(e) {
		this.categories = e.categories;
	}
	getCcategories() {
		return this.categories;
	}
	getCategoryById(e) {
		for (var t = 0; t < this.categories.length; t++) {
			var n = this.categories[t];
			if (n.catId.toString() === e.toString()) return n;
			for (var r = 0; r < this.categories[t].subCategories.length; r++) {
				var i = this.categories[t].subCategories[r];
				if (i.catId.toString() === e.toString()) return i;
			}
		}
	}
}, yd = class {
	constructor(e) {
		this.groups = e.groups;
	}
	getGroups() {
		return this.groups;
	}
	getGroupById(e) {
		for (var t = 0; t < this.groups.length; t++) {
			var n = this.groups[t];
			if (n.groupId.toString() === e.toString()) return n;
			for (var r = 0; r < this.groups[t].subCategories.length; r++) {
				var i = this.groups[t].subCategories[r];
				if (i.groupId.toString() === e.toString()) return i;
			}
		}
	}
}, bd = class {
	constructor(e, t) {
		this.mapImplementation = t, this.config = e, this.layers = e.layers, this.layersArranged = null, this.setUpLayerIndex();
		for (var n = this.getBaseLayers(), r = !1, i = 0; i < n.length; i++) {
			var a = n[i];
			a.visibleOnLoad ? (this.setBaseLayer(a), r = !0) : r === !1 && (a.visibleOnLoad = !0, this.setBaseLayer(a), r = !0);
		}
		for (var o = this.getOverlayLayers(), s = 0; s < o.length; s++) {
			var c = o[s];
			c.visibleOnLoad ? this.showLayer(c) : this.hideLayer(c);
		}
	}
	setUpLayerIndex() {
		for (var e = 0, t = this.getBaseLayers(), n = 0; n < t.length; n++) for (var r = t[n], i = 0; i < r.subLayers.length; i++) r.subLayers[i].layerIndex = e, e++;
		for (var a = this.getOverlayLayers(), o = 0; o < a.length; o++) for (var s = a[o], c = 0; c < s.subLayers.length; c++) s.subLayers[c].layerIndex = e, e++;
	}
	getLayers() {
		return this.config === void 0 ? [] : this.config.layers;
	}
	compare(e, t) {
		return e.id < t.id ? -1 : +(e.id > t.id);
	}
	arrangeLayers() {
		if (!this.layersArranged) {
			this.layersArranged = !0;
			for (var e = this.getOverlayLayers(), t = [], n = 0; n < e.length; n++) {
				var r = e[n];
				r.isVisible && t.push(r);
			}
			t.sort(this.compare), t.forEach(function(e) {
				this.showLayer(e);
			});
		}
	}
	getBaseLayers() {
		return this.getLayers().filter((e) => e.isBaseLayer === !0);
	}
	getOverlayLayers() {
		return this.getLayers().filter((e) => e.isBaseLayer === !1);
	}
	setBaseLayer(e) {
		for (var t = this.getVisibleBaseLayers(), n = 0; n < t.length; n++) {
			var r = t[n];
			this.hideLayer(r);
		}
		this.showBaseLayer(e);
	}
	updateSortingIndex() {
		for (var e = 1, t = 0; t < this.config.groups.length && this.config.groups[t].isyLayers !== void 0; t++) for (var n = 0; n < this.config.groups[t].isyLayers.length; n++) for (var r = 0; r < this.config.groups[t].isyLayers[n].subLayers.length; r++) this.config.groups[t].isyLayers[n].subLayers[r].sortingIndex = e, e += 1;
	}
	addLayer(e) {
		this.showLayer(e), this.layers.push(e);
	}
	showLayer(e) {
		for (var t = e.subLayers, n = 0; n < t.length; n++) {
			var r = t[n];
			this.shouldBeVisible(r) ? this.mapImplementation.ShowLayer(r) : this.mapImplementation.HideLayer(r);
		}
		e.isVisible = !0;
	}
	hideLayer(e) {
		var t = e.subLayers;
		e.isVisible = !1;
		for (var n = 0; n < t.length; n++) {
			var r = t[n];
			this.mapImplementation.HideLayer(r);
		}
		e.mapLayerIndex = -1;
	}
	getVisibleSubLayers() {
		for (var e = [], t = this.getVisibleOverlayLayers(), n = 0; n < t.length; n++) for (var r = t[n], i = 0; i < r.subLayers.length; i++) {
			var a = r.subLayers[i];
			this.shouldBeVisible(a) && e.push(a);
		}
		return e;
	}
	getVisibleBaseLayers() {
		return this.getBaseLayers().filter((e) => e.isVisible === !0);
	}
	getLayerById(e) {
		if (this.layers !== void 0) for (var t = 0; t < this.layers.length; t++) {
			var n = this.layers[t];
			if (n.id.toString() === e.toString()) return n;
		}
	}
	moveLayerToIndexInGroup() {
		this.updateSortingIndex(), this.mapImplementation.UpdateLayerSortIndex(this.config.groups), this.mapImplementation.SortLayerBySortIndex(), this.mapImplementation.RedrawMap();
	}
	moveLayerToIndex(e, t) {
		for (var n = e.subLayers, r = 0; r < n.length; r++) {
			var i = n[r];
			this.shouldBeVisible(i) && this.mapImplementation.MoveLayerToIndex(i, t);
		}
		this.mapImplementation.RedrawMap();
	}
	moveLayerAbove(e, t) {
		for (var n = this.getMaxLayerIndexForLayer(t), r = e.subLayers, i = 0; i < r.length; i++) {
			var a = r[i];
			this.shouldBeVisible(a) && this.mapImplementation.MoveLayerToIndex(a, n);
		}
	}
	showBaseLayer(e) {
		for (var t = e.subLayers, n = 0; n < t.length; n++) {
			var r = t[n];
			this.shouldBeVisible(r) ? this.mapImplementation.ShowBaseLayer(r) : this.mapImplementation.HideLayer(r);
		}
		e.isVisible = !0, this.recalculateMapLayerIndexes();
	}
	recalculateMapLayerIndexes() {
		for (var e = this.getVisibleOverlayLayers(), t = 0; t < e.length; t++) {
			var n = e[t];
			n.mapLayerIndex = this.getMaxLayerIndexForLayer(n);
		}
	}
	getVisibleOverlayLayers() {
		return this.getOverlayLayers().filter((e) => e.isVisible === !0);
	}
	shouldBeVisible() {
		return !0;
	}
	getMaxLayerIndexForLayer(e) {
		for (var t = e.subLayers, n = [], r = 0; r < t.length; r++) {
			var i = t[r], a = this.mapImplementation.GetLayerIndex(i);
			a !== null && n.push(a);
		}
		return Math.max(n);
	}
}, xd = (e, t, n) => {
	var r, i, a, o;
	function s(n, s) {
		c(), r = s;
		var l = e.InitMap(n, s);
		return o = new bd(s, e), a = new yd(s), i = new vd(s), t.TriggerEvent(vi.MapLoaded), l;
	}
	function c() {
		_d.loadCustomCrs(), _d.addCustomProj("EPSG:25832"), _d.addCustomProj("EPSG:25833"), _d.addCustomProj("EPSG:25834"), _d.addCustomProj("EPSG:25835"), _d.addCustomProj("EPSG:25836"), _d.addCustomProj("EPSG:32632"), _d.addCustomProj("EPSG:32633"), _d.addCustomProj("EPSG:32634"), _d.addCustomProj("EPSG:32635"), _d.addCustomProj("EPSG:32636"), _d.addCustomProj("EPSG:4258");
	}
	function l(t) {
		e.ChangeView(t);
	}
	function u() {
		e.RedrawMap();
	}
	function d() {
		e.RefreshMap();
	}
	function f(t, n) {
		e.RefreshLayerByGuid(t, n);
	}
	function p(e) {
		o.addLayer(e);
	}
	function m(t, n) {
		e.AddDataToLayer(t.subLayers[0], n);
	}
	function h(t, n) {
		e.RemoveDataFromLayer(t.subLayers[0], n);
	}
	function g(t) {
		e.ClearLayer(t.subLayers[0]);
	}
	function _(e) {
		o.showLayer(e);
	}
	function v(e) {
		o.hideLayer(e);
	}
	function y(t, n) {
		for (var r = t.subLayers, i = 0; i < r.length; i++) {
			var a = r[i];
			e.SetLayerOpacity(a, n);
		}
		e.RedrawMap();
	}
	function b(t, n) {
		e.SetZIndex(t, n);
	}
	function x(t) {
		return e.GetZIndex(t);
	}
	function S(e) {
		o.setBaseLayer(e);
	}
	function C() {
		return o.getBaseLayers();
	}
	function w() {
		return o.getVisibleBaseLayers()[0];
	}
	function T() {
		return o.getOverlayLayers();
	}
	function E() {
		return o.getVisibleSubLayers();
	}
	function D(e) {
		return o.getLayerById(e);
	}
	function O(e, t) {
		o.moveLayerToIndex(e, t);
	}
	function ee() {
		o.moveLayerToIndexInGroup();
	}
	function te(e, t) {
		o.moveLayerAbove(e, t);
	}
	function ne(e) {
		return o.shouldBeVisible(e);
	}
	function re(e) {
		return i.getCategoryById(e);
	}
	function ie() {
		return i.getCategories();
	}
	function ae(e) {
		return a.GetGroupById(e);
	}
	function oe() {
		return a.GetGroups();
	}
	function se(t) {
		e.ExportMap(t);
	}
	function ce(t) {
		e.ActivateExport(t);
	}
	function le() {
		e.DeactivateExport();
	}
	function ue() {
		return e.RenderSync();
	}
	function de(e) {
		n.SetInfoMarkerPath(e), n.CreateDefaultInfoMarker();
	}
	function fe(e, t) {
		n.SetInfoMarker(e, t);
	}
	function pe() {
		n.RemoveInfoMarker();
	}
	function me() {
		n.RemoveInfoMarkers();
	}
	function he(t, n) {
		e.ShowHighlightedFeatures(t, n);
	}
	function ge() {
		e.ClearHighlightedFeatures();
	}
	function _e(t) {
		e.SetHighlightStyle(t);
	}
	function ve() {
		e.ActivateInfoClick(Ae);
	}
	function ye(e) {
		n.ShowInfoMarker(e);
	}
	function be(e) {
		n.ShowInfoMarkers(e);
	}
	function xe() {
		e.DeactivateInfoClick();
	}
	function Se() {
		e.ActivateBoxSelect(Me);
	}
	function Ce() {
		e.DeactivateBoxSelect();
	}
	function we(t) {
		return e.InitEdit(t);
	}
	function k(t, n) {
		e.DescribeFeature(t, n);
	}
	function Te() {
		e.ActivateEditSelect(Pe);
	}
	function Ee() {
		e.DeactivateEditSelect();
	}
	function A(t) {
		e.UpdateFeature(t);
	}
	function De(t, n) {
		return e.InsertFeature(t, n);
	}
	function Oe(t) {
		return e.DeleteFeature(t);
	}
	function j(e, t) {
		n.GetSupportedGetFeatureInfoFormats(e, t);
	}
	function M(e, t) {
		n.GetSupportedGetFeatureFormats(e, t);
	}
	function ke() {
		z() === Tt() && o.arrangeLayers();
	}
	function N(t) {
		return e.ConvertGmlToGeoJson(t);
	}
	function Ae(e) {
		n.HandlePointSelect(e, je());
	}
	function je() {
		return E().filter(function(e) {
			return e.featureInfo ? e.featureInfo.supportsGetFeatureInfo === !0 : !1;
		});
	}
	function Me(e) {
		n.HandleBoxSelect(e, Ne());
	}
	function Ne() {
		return E().filter(function(e) {
			return e.featureInfo.supportsGetFeature === !0;
		});
	}
	function Pe(t) {
		e.HandlePointSelect(t);
	}
	function Fe(t) {
		e.ActivateMeasure(t);
	}
	function Ie() {
		e.DeactivateMeasure();
	}
	function Le(t) {
		e.ActivateMeasureLine(t);
	}
	function Re() {
		e.DeactivateMeasureLine();
	}
	function ze(t) {
		e.ActivateAddLayerFeature(t);
	}
	function P() {
		e.DeactivateAddLayerFeature();
	}
	function F(t) {
		e.ActivateAddFeatureGps(t);
	}
	function I(t) {
		e.AddCoordinatesGps(t);
	}
	function L() {
		e.DeactivateAddFeatureGps();
	}
	function Be(t) {
		e.ActivateModifyFeature(t);
	}
	function Ve() {
		e.DeactivateModifyFeature();
	}
	function He(t) {
		e.ActivateDrawFeature(t);
	}
	function Ue(t) {
		e.DeactivateDrawFeature(t);
	}
	function We() {
		e.InitOffline();
	}
	function Ge() {
		e.ActivateOffline();
	}
	function Ke(t, n, r) {
		e.StartCaching(t, n, r);
	}
	function qe() {
		e.StopCaching();
	}
	function Je(t, n, r) {
		e.DeleteDatabase(t, n, r);
	}
	function Ye() {
		return e.CacheDatabaseExist();
	}
	function Xe(t, n, r) {
		return e.CalculateTileCount(t, n, r);
	}
	function Ze(t, n, r) {
		e.GetResource(t, n, r);
	}
	function Qe(t, n, r) {
		e.GetConfigResource(t, n, r);
	}
	function $e(t, n, r) {
		e.GetResourceFromJson(t, n, r);
	}
	function et(t, n, r) {
		e.GetLayerResource(t, n, r);
	}
	function tt() {
		e.DeactivateOffline();
	}
	function nt() {
		e.ActivateHoverInfo();
	}
	function rt() {
		e.DeactivateHoverInfo();
	}
	function it(t) {
		e.ActivatePrintBoxSelect(t);
	}
	function at() {
		e.DeactivatePrintBoxSelect();
	}
	function R(t) {
		e.ActivateAddLayerUrl(t);
	}
	function ot() {
		e.DeactivateAddLayerUrl();
	}
	function st(t, n) {
		e.ExtentToGeoJson(t, n);
	}
	function ct(t) {
		e.ChangeView(t), t.layers && t.layers.split(",").forEach(function(e) {
			var t = D(e);
			t && (t.isBaseLayer === !0 ? S(t) : _(t));
		});
	}
	function lt(e) {
		e.legendGraphicUrls = [];
		for (var t = 0; t < e.subLayers.length; t++) {
			var n = e.subLayers[t];
			e.isVisible && ne(n) && e.legendGraphicUrls.push(n.legendGraphicUrl);
		}
	}
	function ut() {
		e.AddZoom();
	}
	function dt() {
		e.AddZoomSlider();
	}
	function ft(t) {
		e.AddZoomToExtent(t);
	}
	function pt() {
		e.AddScaleLine();
	}
	function mt(t) {
		e.ZoomToLayer(t);
	}
	function ht(t) {
		e.ZoomToLayers(t);
	}
	function gt(t) {
		e.FitExtent(t);
	}
	function _t() {
		return e.GetCenter();
	}
	function vt(t) {
		return e.SetCenter(t);
	}
	function yt() {
		return e.GetZoom();
	}
	function bt(t) {
		e.SetZoom(t);
	}
	function xt() {
		return e.GetRotation();
	}
	function St(t, n) {
		e.SetRotation(t, n);
	}
	function Ct() {
		return e.GetEpsgCode();
	}
	function wt(t, n) {
		return e.GetVectorLayers(t, n);
	}
	function z() {
		if (r) {
			var e = 0;
			return r.layers.forEach(function(t) {
				t.isVisible && t.subLayers.forEach(function() {
					e++;
				});
			}), e;
		}
	}
	function Tt() {
		return e.GetLayerCount();
	}
	function Et(t) {
		return e.GetCenterFromExtent(t);
	}
	function Dt() {
		return e.GetScale();
	}
	function Ot(t) {
		return e.GetFeatureCollection(t);
	}
	function kt(t) {
		return e.GetFeaturesInMap(t);
	}
	function At(t) {
		return e.GetFeatureExtent(t);
	}
	function jt(t) {
		return e.GetLegendStyles(t);
	}
	function Mt() {
		return e.GetExtent();
	}
	function Nt() {
		return e.GetUrlObject();
	}
	function B() {
		return e.GetGeolocation();
	}
	function Pt() {
		return e.RemoveGeolocation();
	}
	function Ft(e) {
		Ae(e);
	}
	function V(t) {
		e.SetTranslateOptions(t);
	}
	function It(t, n, r) {
		return e.TransformCoordinates(t, n, r);
	}
	function Lt(t) {
		return e.TransformFromGeographic(t);
	}
	function Rt(t) {
		return e.TransformToGeographic(t);
	}
	function zt() {
		e.RemoveIsyToken();
	}
	function Bt(t) {
		e.SetIsyToken(t);
	}
	function Vt(t) {
		e.ShowCustomMessage(t);
	}
	return {
		Init: s,
		AddLayer: p,
		AddDataToLayer: m,
		RemoveDataFromLayer: h,
		ClearLayer: g,
		ShowLayer: _,
		HideLayer: v,
		GetOverlayLayers: T,
		GetBaseLayers: C,
		GetLayerById: D,
		GetFirstVisibleBaseLayer: w,
		SetBaseLayer: S,
		SetStateFromUrlParams: ct,
		SetLayerOpacity: y,
		MoveLayerToIndex: O,
		MoveLayerAbove: te,
		MoveLayerToIndexInGroup: ee,
		GetCategoryById: re,
		GetCategories: ie,
		GetGroupById: ae,
		GetGroups: oe,
		RenderSync: ue,
		ExportMap: se,
		ActivateExport: ce,
		DeactivateExport: le,
		ActivateInfoClick: ve,
		DeactivateInfoClick: xe,
		ShowHighlightedFeatures: he,
		ClearHighlightedFeatures: ge,
		SetHighlightStyle: _e,
		SetInfoMarker: fe,
		SetImageInfoMarker: de,
		GetSupportedGetFeatureInfoFormats: j,
		GetSupportedGetFeatureFormats: M,
		RemoveInfoMarker: pe,
		RemoveInfoMarkers: me,
		ActivateBoxSelect: Se,
		DeactivateBoxSelect: Ce,
		GetFeatureCollection: Ot,
		GetFeaturesInMap: kt,
		GetFeatureExtent: At,
		InitEdit: we,
		ActivateEditClick: Te,
		DeactivateEditClick: Ee,
		UpdateFeature: A,
		InsertFeature: De,
		DeleteFeature: Oe,
		ActivateHoverInfo: nt,
		DeactivateHoverInfo: rt,
		ActivateMeasure: Fe,
		DeactivateMeasure: Ie,
		InitOffline: We,
		ActivateOffline: Ge,
		StartCaching: Ke,
		StopCaching: qe,
		DeleteDatabase: Je,
		CacheDatabaseExist: Ye,
		CalculateTileCount: Xe,
		GetResource: Ze,
		GetConfigResource: Qe,
		GetLayerResource: et,
		DeactivateOffline: tt,
		GetResourceFromJson: $e,
		ActivateMeasureLine: Le,
		DeactivateMeasureLine: Re,
		ActivateAddLayerFeature: ze,
		DeactivateAddLayerFeature: P,
		ActivateAddFeatureGps: F,
		AddCoordinatesGps: I,
		DeactivateAddFeatureGps: L,
		ActivateModifyFeature: Be,
		DeactivateModifyFeature: Ve,
		ActivateDrawFeature: He,
		DeactivateDrawFeature: Ue,
		ActivatePrintBoxSelect: it,
		DeactivatePrintBoxSelect: at,
		ActivateAddLayerUrl: R,
		DeactivateAddLayerUrl: ot,
		ArrangeLayers: ke,
		ConvertGmlToGeoJson: N,
		SetLegendGraphics: lt,
		ExtentToGeoJson: st,
		AddZoom: ut,
		AddZoomSlider: dt,
		AddZoomToExtent: ft,
		AddScaleLine: pt,
		ZoomToLayer: mt,
		ZoomToLayers: ht,
		FitExtent: gt,
		GetCenter: _t,
		SetCenter: vt,
		GetZoom: yt,
		SetZoom: bt,
		GetRotation: xt,
		SetRotation: St,
		GetEpsgCode: Ct,
		GetVectorLayers: wt,
		GetCenterFromExtent: Et,
		GetScale: Dt,
		ChangeView: l,
		GetLegendStyles: jt,
		RedrawMap: u,
		RefreshMap: d,
		RefreshLayerByGuid: f,
		ShowInfoMarker: ye,
		ShowInfoMarkers: be,
		GetExtent: Mt,
		GetVisibleSubLayers: E,
		GetUrlObject: Nt,
		GetGeolocation: B,
		RemoveGeolocation: Pt,
		InfoClickSimulation: Ft,
		SetTranslateOptions: V,
		TransformCoordinates: It,
		TransformFromGeographic: Lt,
		TransformToGeographic: Rt,
		DescribeFeature: k,
		RemoveIsyToken: zt,
		SetIsyToken: Bt,
		ShowCustomMessage: Vt,
		SetZIndex: b,
		GetZIndex: x
	};
}, Sd = class {
	static postMessage = function(e) {
		window.parent.postMessage(JSON.stringify(e), "*");
	};
	static listener = function(e) {
		if (e.origin === "http://localhost:3000" || "http://skrivte57.statkart.no") try {
			let u = JSON.parse(JSON.stringify(e.data));
			if (u) {
				if (u.cmd === "setCenter") window.olMap.getView().setCenter([u.x, u.y]), window.olMap.getView().setZoom(u.zoom);
				else if (u.cmd === "setVisible" || u.cmd === "setBasemap") {
					if (u.cmd === "setBasemap") for (var t in window.olMap.layers) window.olMap.layers[t].isUrlDataLayer || window.olMap.layers[t].isBasemap || window.olMap.layers[t].setVisibility(!1);
					var n = window.olMap.getLayersByName(u.id);
					n.length > 0 ? n[0].setVisibility(!0) : (n = window.olMap.getLayersBy("shortid", u.id), n.length > 0 && n[0].setVisibility(!0)), this.postMessage({
						type: "result",
						cmd: u.cmd,
						affected: n.length
					});
				} else if (u.cmd === "addDataSource") this.parseParamsAndAddDataLayerFromUrl([u.type, u.url]);
				else if (u.cmd === "setVisibleVectorLayer") {
					let e = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice();
					for (let t = 0, n = e.length; t < n; t += 1) {
						let n = e[t];
						if (n.shortid === u.shortid) {
							if (n.setVisibility(!0), n.preferredBackground) {
								let e = window.olMap.getLayersByClass("OpenLayers.Layer.WMTS");
								for (let t = 0, r = e.length; t < r; t += 1) {
									let r = e[t];
									r.shortid === n.preferredBackground ? r.setVisibility(!0) : r.isBaseLayer || r.setVisibility(!1);
								}
							}
						} else n.setVisibility(!1);
					}
				} else if (u.cmd === "getFeatures") if (u.layer) {
					let e = window.olMap.getLayersBy("shortid", u.layer);
					if (e.length > 0) {
						let t = e[0], n = this.getFeaturesInLayer(t);
						this.postMessage({
							type: "layerFeatures",
							layer: t.shortid,
							features: n
						});
					} else this.postMessage({
						type: "error",
						message: "no such layer"
					});
				} else {
					let e = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice(), t = [];
					for (let n = 0, r = e.length; n < r; n += 1) {
						let r = e[n];
						t.push({
							layer: r.shortid,
							features: this.getFeaturesInLayer(r)
						});
					}
					this.postMessage({
						type: "features",
						layers: t
					});
				}
				else if (u.cmd === "getVisibleFeatures") if (u.layer) {
					let e = window.olMap.getLayersBy("shortid", u.layer);
					if (e.length > 0) {
						let t = e[0], n = this.getVisibleFeaturesInLayer(t);
						this.postMessage({
							type: "layerVisibleFeatures",
							layer: t.shortid,
							features: n
						});
					} else this.postMessage({
						type: "error",
						message: "no such layer"
					});
				} else {
					let e = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice(), t = [];
					for (let n = 0, r = e.length; n < r; n += 1) {
						let r = e[n];
						t.push({
							layer: r.shortid,
							features: this.getVisibleFeaturesInLayer(r)
						});
					}
					this.postMessage({
						type: "visibleFeatures",
						layers: t
					});
				}
				else if (u.cmd === "selectFeature") {
					let e = window.olMap.getLayersBy("shortid", u.layer), t = null, n = null;
					if (e.length > 0) {
						let r = e[0];
						if (t = r.getFeatureByFid(u.feature), t) {
							let e = r.map.getControlsByClass("OpenLayers.Control.SelectFeature");
							for (let t = 0, i = e.length; t < i && n === null; t += 1) e[t].layer.shortid === r.shortid && e[t].click && (n = e[t]);
						}
					}
					t !== null && n !== null ? (u.panAndZoom && t.geometry.bounds && t.layer.map.zoomToExtent(t.geometry.bounds), n.clickFeature.call(n, t)) : this.postMessage({
						type: "error",
						message: "no such layer or feature"
					});
				} else if (u.cmd === "setBoundingBox") {
					var r = window.olMap.getControlsByClass("OpenLayers.Control.Draw")[0];
					if (r) {
						var i = u.bounds[0], a = u.bounds[1], o = u.bounds[2], s = u.bounds[3];
						let e = new ze(new Ie([new Le([
							new Fe(i, a),
							new Fe(o, a),
							new Fe(o, s),
							new Fe(i, s),
							new Fe(i, a)
						])]));
						r.displayBBoxFeature(e);
					}
				} else if (u.cmd === "addMarker") {
					let e = new Re({
						position: [u.x, u.y],
						positioning: "center-center",
						element: document.getElementById("marker"),
						stopEvent: !1
					});
					window.olMap.addOverlay(e);
				} else if (u.cmd === "clearMarkers") {
					var c = window.olMap.getLayersByClass("OpenLayers.Layer.Markers").slice();
					for (let e = 0, t = c.length; e < t; e += 1) c[e].destroy();
				} else if (u.cmd === "removeMarker") {
					var l = window.olMap.getLayersByClass("OpenLayers.Layer.Markers").slice();
					for (let e = 0, t = l.length; e < t; e += 1) l[e].removeMarker(u.x + "," + u.y);
				}
			}
		} catch (e) {
			console.error(e);
		}
	};
	static parseParamsAndAddDataLayerFromUrl = function(e) {
		var t = e[0], n = e[1];
		switch (n.indexOf("%") > -1 && (n = decodeURIComponent(n)), t) {
			case "geojson":
				this.addGeoJsonLayer(n, "4326", null, !0);
				break;
			case "sosi":
				this.addSOSILayer(n, !0);
				break;
			case "drawing":
				this.addGeoJsonLayer(n, "32633", { isDrawing: !0 });
				break;
			case "bbox":
				this.addBboxLayer(n);
				break;
			case "wms":
				this.addWMSLayer(n);
				break;
			case "wfs":
				this.addWFSLayer(n);
				break;
			case "wcs":
				console.warn("Cannot display WCS directly. Use a Portrayal Service WMS with WCS as data layer.<br/>Syntax: /l/wms/[URL to portrayal]/d/wcs/[URL to data]");
				break;
			default: break;
		}
	};
	static getFeaturesInLayer = (e) => {
		let t = [], n;
		for (let r = 0, i = e.features.length; r < i; r += 1) n = {}, n.fid = e.features[r].fid, n.attributes = e.features[r].attributes, t.push(n);
		return t;
	};
	static getVisibleFeaturesInLayer = (e) => {
		let t = [], n;
		for (let r = 0, i = e.features.length; r < i; r += 1) e.features[r].getVisibility() && e.features[r].onScreen() && (n = {}, n.fid = e.features[r].fid, n.attributes = e.features[r].attributes, t.push(n));
		return t;
	};
}, Cd = [], wd = !1, Q = {
	groups: [],
	coordinate_system: "EPSG:25833",
	center: [396722, 7197860],
	extent: [
		-25e5,
		35e5,
		3045984,
		9045984
	],
	zoom: 4,
	mapbackgroundcolor: "#FFFFFF",
	displaycenterepsgcode: "EPSG:25833",
	displayCenter: "396722,7197864",
	displayprojectionepsgcode: "EPSG:25833",
	projectName: "norgeskart",
	basemap: {
		url: "https://cache.kartverket.no/v1/service?",
		layers: "europaForenklet",
		format: "image/png",
		matrixprefix: !1,
		matrixSet: "utm33n"
	},
	wmts: [
		{
			type: "map",
			gatekeeper: "true",
			name: "Landkart",
			url: "https://cache.kartverket.no/v1/service|https://cache.kartverket.no/v1/service",
			params: {
				layers: "topo",
				format: "image/png"
			},
			matrixprefix: "false",
			matrixset: "utm33n",
			guid: "0.topo",
			options: {
				isbaselayer: "true",
				singletile: "false",
				visibility: "false"
			},
			thumbnail: "land"
		},
		{
			type: "map",
			gatekeeper: "true",
			name: "Gråtone",
			url: "https://cache.kartverket.no/v1/service/|https://cache.kartverket.no/v1/service/",
			params: {
				layers: "topograatone",
				format: "image/png"
			},
			matrixprefix: "false",
			matrixset: "utm33n",
			guid: "0.topograatone",
			options: {
				isbaselayer: "true",
				singletile: "false",
				visibility: "true"
			}
		},
		{
			type: "map",
			gatekeeper: "true",
			name: "Sjøkart",
			url: "https://cache.kartverket.no/v1/service?|https://cache.kartverket.no/v1/service?",
			params: {
				layers: "sjokartraster",
				format: "image/png"
			},
			matrixprefix: "false",
			matrixset: "utm33n",
			guid: "0.sjokartraster",
			options: {
				isbaselayer: "true",
				singletile: "false",
				visibility: "false"
			}
		}
	],
	maplayer: [{
		index: 3,
		name: "fakta",
		groupid: 3
	}, {
		index: 5,
		name: "tur_og_friluftsruter",
		groupid: 5
	}],
	mapbounds: { mapbound: [
		{
			epsg: "EPSG:23031",
			extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:23032",
			extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:23033",
			extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:23034",
			extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:23035",
			extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:23036",
			extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:25831",
			extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:25832",
			extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:25833",
			extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:25834",
			extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:25835",
			extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:25836",
			extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:32631",
			extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:32632",
			extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:25833",
			extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:32634",
			extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:32635",
			extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
		},
		{
			epsg: "EPSG:32636",
			extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
		},
		{
			epsg: "EPSG:4326",
			extent: "-180, -90, 180, 90"
		},
		{
			epsg: "EPSG:3857",
			extent: "-20037508.34, -20037508.34, 20037508.34, 20037508.34"
		},
		{
			epsg: "EPSG:900913",
			extent: "-20037508.34, -20037508.34, 20037508.34, 20037508.34"
		},
		{
			epsg: "EPSG:54009",
			extent: "-18000000.0, -9000000.0, 18000000.0, 9000000.0"
		},
		{
			epsg: "EPSG:3006",
			extent: "-1200000.0, 4700000.0, 2600000.0, 8500000.0"
		}
	] },
	name: "default config",
	useCategories: !0,
	showProgressBar: !0,
	showMousePosition: !0,
	comment: "",
	numZoomLevels: 18,
	newMaxRes: 21664,
	extentUnits: "m",
	proxyHost: "",
	searchHost: "",
	searchpointzoom: 12,
	languages: {
		no: {},
		en: {}
	},
	layers: [],
	hoverOptions: {
		multiSelect: !0,
		mmultiSelect: !1
	},
	onlyOneGroup: !1,
	isOffline: !1
}, Td = (e, t, n, r) => {
	var i = hi({
		groupId: e,
		name: t,
		parentId: n,
		visibleOnLoad: r
	});
	Cd.push(e), Q.groups.push(i), Q.languages.en[i.groupId] = t, Q.languages.no[i.groupId] = n;
}, Ed = (e) => {
	e.maplayer !== void 0 && (e.maplayer.length === void 0 ? Td(e.maplayer.groupid, e.maplayer.name, e.maplayer.namelng, e.maplayer.display) : e.maplayer.forEach(function(e) {
		Td(e.groupid, e.name, e.namelng, e.display);
	}));
}, Dd = (e) => {
	let t = [];
	return e.forEach((e) => {
		Cd.indexOf(e) === -1 && t.push(e);
	}), t;
}, Od = (e, t, n) => {
	Dd(e).forEach((e) => {
		Td(e, t, n);
	});
}, kd = () => {
	wd === !1 && (Td(999, "Other layers", "Andre lag"), wd = !0);
}, Ad = (e) => e.indexOf("|") >= 0 ? e.split("|") : e, jd = (e, t) => {
	let n = [999];
	return t.groupid === void 0 ? t.options.isbaselayer === "false" && kd() : (n = t.groupid.toString().split(",").map((e) => parseInt(e, 10)), Od(n, t.name, t.namelng)), gr({
		subLayers: [{
			title: t.name,
			name: t.params.layers || t.name,
			providerName: t.params.layers || t.name,
			source: e,
			gatekeeper: t.gatekeeper === "true",
			url: Ad(t.url),
			format: t.params.format,
			coordinate_system: t.epsg || Q.coordinate_system,
			extent: Q.extent,
			extentUnits: Q.extentUnits,
			matrixPrefix: t.matrixprefix === "true",
			matrixSet: t.matrixset,
			numZoomLevels: Q.numZoomLevels,
			id: e === "VECTOR" ? Q.layers.length + 8001 : Q.layers.length + 1001,
			transparent: !0,
			layerIndex: -1,
			legendGraphicUrl: t.legendurl || "",
			minScale: t.options.minscale,
			maxScale: t.options.maxscale,
			sortingIndex: -1,
			featureInfo: {
				supportsGetFeatureInfo: !0,
				getFeatureInfoFormat: "application/vnd.ogc.gml",
				getFeatureInfoCrs: "",
				supportsGetFeature: !0,
				getFeatureBaseUrl: "",
				getFeatureFormat: "application/json",
				getFeatureCrs: "EPSG:4326",
				includedFields: t.includedfields
			},
			tiled: t.options.singletile !== "true",
			crossOrigin: "anonymous",
			style: t.style,
			wmtsExtent: t.wmtsextent,
			getCapabilities: t.getcapabilities === "true",
			styles: t.params.styles,
			minResolution: t.minresolution,
			maxResolution: t.maxresolution || 21664
		}],
		guid: t.guid,
		name: t.name,
		groupId: n,
		visibleOnLoad: t.options.visibility === "true",
		id: e === "VECTOR" ? Q.layers.length + 8001 : Q.layers.length + 1001,
		isBaseLayer: t.options.isbaselayer === "true",
		previewActive: !1,
		opacity: 1,
		mapLayerIndex: -1,
		legendGraphicUrls: [],
		selectedLayerOpen: !1,
		thumbnail: t.thumbnail
	});
}, Md = (e, t) => {
	Q.layers.push(e), Q.languages.en[e.id] = t.name, Q.languages.no[e.id] = t.namelng;
};
Ed(Q), ((e) => {
	e.wmts !== void 0 && (e.wmts.length === void 0 ? Md(jd("WMTS", e.wmts), e.wmts) : e.wmts.forEach((e) => {
		Md(jd("WMTS", e), e);
	})), e.wms !== void 0 && (e.wms.length === void 0 ? Md(jd("WMS", e.wms), e.wms) : e.wms.forEach((e) => {
		Md(jd("WMS", e), e);
	})), e.vector !== void 0 && (e.vector.length === void 0 ? Md(jd("VECTOR", e.vector), e.vector) : e.vector.forEach(function(e) {
		Md(jd("VECTOR", e), e);
	}));
})(Q), Q = gi(Q), Q.instance = "geoportal", Q.proxyHost = "";
var Nd = _i(), Pd = xd(gd(Nd), Nd, null);
window.addEventListener ? window.addEventListener("message", Sd.listener, !1) : window.attachEvent("onmessage", Sd.listener);
//#endregion
//#region src/MapUtil/CapabilitiesUtil.js
var Fd = (e, t) => {
	let n = [999];
	return t.groupid === void 0 ? t.options.isbaselayer === "false" && kd() : (n = t.groupid.toString().split(",").map((e) => parseInt(e, 10)), Od(n, t.name, t.namelng)), new gr({
		subLayers: [{
			title: t.name,
			name: t.params.layers || t.name,
			providerName: t.params.layers || t.name,
			source: e,
			gatekeeper: t.gatekeeper === "true",
			url: Ad(t.url),
			format: t.params.format,
			featureNS: t.featureNS || "",
			featureType: t.featureType || "",
			coordinate_system: t.epsg || Q.coordinate_system,
			extent: Q.extent,
			extentUnits: Q.extentUnits,
			matrixPrefix: t.matrixprefix === "true",
			matrixSet: t.matrixset,
			numZoomLevels: Q.numZoomLevels,
			id: e === "VECTOR" ? t.name + 8001 : t.name + 1001,
			version: t.version,
			transparent: !0,
			layerIndex: -1,
			legendGraphicUrl: t.legendurl || "",
			minScale: t.options.minscale,
			maxScale: t.options.maxscale,
			sortingIndex: -1,
			featureInfo: {
				supportsGetFeatureInfo: t.options.queryable,
				getFeatureInfoFormat: "application/vnd.ogc.gml",
				getFeatureInfoCrs: "",
				supportsGetFeature: !0,
				getFeatureBaseUrl: "",
				getFeatureFormat: "application/json",
				getFeatureCrs: "EPSG:4326",
				includedFields: t.includedfields
			},
			tiled: t.options.singletile !== "true",
			crossOrigin: "anonymous",
			style: t.style,
			wmtsExtent: t.wmtsextent,
			getCapabilities: t.getcapabilities === "true",
			styles: t.params.styles,
			minResolution: t.minresolution,
			maxResolution: t.maxresolution || 21664
		}],
		guid: t.guid,
		name: t.name,
		groupId: n,
		visibleOnLoad: t.options.visibility === "true",
		id: e === "VECTOR" ? t.name + 8001 : t.name + 1001,
		isBaseLayer: t.options.isbaselayer === "true",
		previewActive: !1,
		opacity: 1,
		mapLayerIndex: -1,
		legendGraphicUrls: [],
		selectedLayerOpen: !1,
		thumbnail: t.thumbnail,
		abstract: t.abstract,
		label: t.name,
		value: t.name
	});
}, Id = class {
	static parseWmsCapabilities(e) {
		let t = dr(e, {
			service: "WMS",
			request: "GetCapabilities"
		});
		return fetch(t).then((e) => e.text()).then((e) => new s().read(e));
	}
	static getLayersFromWmsCapabilties(e, t = "Name") {
		let n = (0, W.default)(e, "version"), r = (0, W.default)(e, "Capability.Layer.Layer"), i = (0, W.default)((0, W.default)(e, "Capability.Request.GetMap"), "DCPType[0].HTTP.Get.OnlineResource");
		return r.map((e) => Fd("WMS", {
			type: "map",
			name: (0, W.default)(e, t) || (0, W.default)(e, "Title"),
			abstract: (0, W.default)(e, "Abstract"),
			url: i,
			legendurl: (0, W.default)(e, "Style[0].LegendURL[0].OnlineResource"),
			params: {
				layers: (0, W.default)(e, "Name"),
				format: "image/png",
				VERSION: n
			},
			guid: "1.temakart",
			options: {
				isbaselayer: "false",
				singletile: "false",
				visibility: "true",
				maxscale: e.MaxScaleDenominator || "",
				minscale: e.MinScaleDenominator || "",
				queryable: e.queryable
			}
		}));
	}
	static parseWmtsCapabilities(e) {
		let t = dr(e, {
			service: "WMTS",
			request: "GetCapabilities"
		});
		return fetch(t).then((e) => e.text()).then((e) => new c().read(e));
	}
	static getLayersFromWfsCapabilties(e, t = "name.localPart") {
		let n = (0, W.default)(e, "value.featureTypeList.featureType"), r = (0, W.default)(e, "value.operationsMetadata.operation[0].dcp[0].http.getOrPost[0].value.href"), i = {};
		return n.map((e) => (i[e.name.prefix] = e.name.namespaceURI, Fd("WFS", {
			type: "map",
			name: (0, W.default)(e, t),
			url: r,
			version: "1.1.0",
			params: {
				layers: (0, W.default)(e, t),
				format: "image/png"
			},
			guid: "1.temakart",
			options: {
				isbaselayer: "false",
				singletile: "false",
				visibility: "true",
				maxscale: e.MaxScaleDenominator || "",
				minscale: e.MinScaleDenominator || ""
			},
			featureNS: i,
			featureType: e.name.prefix + ":" + e.name.localPart
		})));
	}
	static getOlLayerFromWFS(e, t, n = "name.localPart") {
		let r = "1.1.0", i = (0, W.default)(e, "MapUrl"), a = window.olMap.getView().getProjection(), o = (e) => {
			if (e = new DOMParser().parseFromString(e, "text/xml"), s.format === void 0) {
				let e;
				switch (r) {
					case "1.0.0":
						e = new h();
						break;
					case "1.1.0":
						e = new g();
						break;
					case "2.0.0":
						e = new g();
						break;
					default:
						e = new d();
						break;
				}
				s.format = new p({
					featureNS: "",
					featureTypes: [t.name.prefix + ":" + t.name.localPart],
					gmlFormat: e
				});
			}
			let n = s.format.readFeatures(e);
			return n && n.length > 0 && (n.forEach(function(e) {
				console.log(e);
			}), s.addFeatures(n), console.log(n[0].getGeometryName())), n;
		};
		var s = new y({
			loader: (e) => (i = dr(i, {
				service: "WFS",
				request: "GetFeature",
				version: r,
				typename: t.Name,
				srsname: a.getCode(),
				bbox: e.join(",") + "," + a.getCode(),
				outputFormat: "text/xml; subtype=gml/3.2.1"
			}), fetch(i).then((e) => e.text()).then((e) => {
				if (typeof e == "object") {
					if (e.firstChild.childElementCount === 0) return;
				} else return o(e);
			})),
			strategy: b,
			projection: a
		});
		return window.olMap.on("click", function(e) {
			var t = window.olMap.getFeaturesAtPixel(e.pixel);
			if (t) {
				var n = t[0];
				console.log(n.getProperties());
			}
		}), new v({ source: s });
	}
	static parseWFSCapabilities(e) {
		let t = dr(e, {
			service: "WFS",
			request: "GetCapabilities"
		});
		return fetch(t).then((e) => e.text()).then((e) => new DOMParser().parseFromString(e, "text/xml"));
	}
	static getGeoJson(e) {
		return fetch(e).then((e) => e.json()).then((e) => (e.Name = e.name, e));
	}
	static getOlLayerFromGeoJson(e, t) {
		return new v({
			source: new y({ features: new _().readFeatures(t, {
				dataProjection: e.EPSG,
				featureProjection: "EPSG:25833"
			}) }),
			style: function(t, n) {
				return t.getGeometry().getType() === "Point" ? new E({
					image: new C({
						anchor: [.5, 46],
						anchorXUnits: "fraction",
						anchorYUnits: "pixels",
						src: _r
					}),
					text: new D({
						font: "12px Calibri,sans-serif",
						fill: new S({ color: "#000" }),
						stroke: new T({
							color: "#fff",
							width: 3
						}),
						text: t.get(e.ShowPropertyName)
					})
				}) : new E({
					fill: new S({ color: "rgba(255, 255, 255, 0.6)" }),
					stroke: new T({
						color: "#319FD3",
						width: 2
					}),
					text: new D({
						font: "12px Calibri,sans-serif",
						fill: new S({ color: "#000" }),
						stroke: new T({
							color: "#fff",
							width: 3
						}),
						text: t.get(e.ShowPropertyName)
					})
				});
			},
			name: t.name
		});
	}
	static getWMSMetaCapabilities(e) {
		let t = {}, n = (0, W.default)(e, "Capability.Request.GetMap");
		return t.Version = (0, W.default)(e, "version"), t.Attributions = (0, W.default)(e, "Service.AccessConstraints"), t.MapUrl = (0, W.default)(n, "DCPType[0].HTTP.Get.OnlineResource"), t.FeatureInfoConfig = (0, W.default)(e, "Capability.Request.GetFeatureInfo"), t.FeatureInfoUrl = (0, W.default)(t.FeatureInfoConfig, "DCPType[0].HTTP.Get.OnlineResource"), t.LegendUrl = (0, W.default)(e, "Capability.Layer.Layer") && (0, W.default)(e, "Capability.Layer.Layer").length > 0 ? (0, W.default)((0, W.default)(e, "Capability.Layer.Layer")[0], "Style[0].LegendURL[0].OnlineResource") : null, t;
	}
	static getWFSMetaCapabilities(e) {
		let t = {};
		return t.Version = (0, W.default)(e, "value.version"), t.Attributions = (0, W.default)(e, "Service.AccessConstraints"), t.MapUrl = (0, W.default)(e, "value.operationsMetadata.operation[0].dcp[0].http.getOrPost[0].value.href"), t;
	}
	static getOlLayerFromWmsCapabilities(e, t) {
		let n = e.Params || {};
		return n.LAYERS = t.Name, n.VERSION = e.Version, new u({
			opacity: 1,
			title: t.Title + "_" + e.uuid,
			name: t.Name + "_" + e.uuid,
			abstract: t.Abstract,
			getFeatureInfoUrl: e.FeatureInfoUrl,
			getFeatureInfoFormats: (0, W.default)(e.FeatureInfoConfig, "Format"),
			legendUrl: e.LegendUrl,
			queryable: t.queryable,
			source: new l({
				url: e.MapUrl,
				attributions: e.Attribution,
				params: n
			})
		});
	}
}, Ld = {
	removeInline: "_removeInline_1vt5u_1",
	selectedlayers: "_selectedlayers_1vt5u_11",
	open: "_open_1vt5u_22",
	ellipsisToggle: "_ellipsisToggle_1vt5u_26",
	expandLayersBtn: "_expandLayersBtn_1vt5u_38",
	facet: "_facet_1vt5u_53"
}, Rd = {
	movelayerBtn: "_movelayerBtn_62ros_1",
	priority: "_priority_62ros_20",
	slider: "_slider_62ros_25",
	settings: "_settings_62ros_35",
	info: "_info_62ros_39",
	infoIcon: "_infoIcon_62ros_43",
	infoText: "_infoText_62ros_46",
	facetSub: "_facetSub_62ros_59",
	spanCheckbox: "_spanCheckbox_62ros_78"
}, zd = (e) => /* @__PURE__ */ I("img", {
	src: e.legendUrl,
	alt: e.legendAlternative
}), Bd = {
	legend: "_legend_1hrcs_1",
	closed: "_closed_1hrcs_8",
	toggle: "_toggle_1hrcs_14",
	label: "_label_1hrcs_21"
}, Vd = (e) => {
	let [t, n] = o(!1);
	return /* @__PURE__ */ I("div", { children: e.legendUrl ? /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("div", {
		className: Bd.toggle,
		onClick: () => n(!t),
		children: [/* @__PURE__ */ L("span", {
			className: Bd.label,
			children: [t ? "Skjul tegnforklaring" : "Vis tegnforklaring", " "]
		}), /* @__PURE__ */ I(P, { icon: t ? ["fas", "angle-up"] : ["fas", "angle-down"] })]
	}), /* @__PURE__ */ I("div", {
		className: t ? Bd.legend : Bd.legend + " " + Bd.closed,
		children: /* @__PURE__ */ I(zd, {
			legendUrl: e.legendUrl,
			legendAlternative: "Legend"
		})
	})] }) : "" });
}, Hd = {}, Ud = t(Hd), { Provider: Wd } = Ud, Gd = ({ children: e }) => {
	let [t, n] = a((e = {}, t) => {
		switch (t.type) {
			case "SET_FEATURES":
				let n = e.info ? e.info.concat(t.info) : t.info;
				return {
					...e,
					info: n,
					show: !0
				};
			case "SHOW_FEATURES": return {
				...e,
				info: t.info,
				show: !0
			};
			case "HIDE_FEATURES": return {
				...e,
				info: [],
				show: !1
			};
			default: throw Error();
		}
	}, Hd);
	return /* @__PURE__ */ I(Wd, {
		value: {
			state: t,
			dispatch: n
		},
		children: e
	});
}, Kd = new lr({
	ignoreAttributes: !1,
	attributeNamePrefix: "",
	allowBooleanAttributes: !0,
	transformTagName: (e) => e.includes(":") ? e.split(":")[1] : e
}), qd = (e, t) => {
	switch (t) {
		case "text/plain": return Qd(e);
		case "text/html": return e;
		case "text/xml": return Yd(e);
		case "text/xml; subtype=gml/3.1.1": return Yd(e);
		case "application/vnd.ogc.gml": return Yd(e);
		case "application/vnd.ogc.gml/3.1.1": return Yd(e);
		case "application/json": return e;
		default: return Qd(e);
	}
}, Jd = (e) => {
	let t = [], n = [], r = {}, i = "";
	e.startsWith("@") && (i = e.substring(e.indexOf("@") + 1, e.indexOf(" ")), e = e.substring(e.indexOf(" ") + 1)), e = e.split("; "), e.pop();
	for (let r = 0; r < e.length; r++) t = e[r].split(";"), n.push(t);
	return r[i] = Xd(n[0], n[1]), [r];
}, Yd = (e) => {
	let t = "", n = Kd.parse(e);
	n.msGMLOutput ? t = n.msGMLOutput : n.FeatureCollection && (t = n.FeatureCollection.featureMember);
	let r = {};
	for (let e in t) {
		console.log(e, t[e]);
		let n = e.split("_layer")[0], i = {};
		for (let n in t[e]) {
			let r = n.split("_")[0];
			i[r] = t[e][n];
		}
		r[n] = [i];
	}
	return [r];
}, Xd = (e, t) => {
	let n = {};
	for (let r = 0; r < e.length; r++) n[e[r]] = t[r];
	return n;
}, Zd = (e) => e.reduce((e, t) => {
	if (typeof t == "string" && t.length > 0) {
		let [n, r] = t.trim().split(" :");
		r !== void 0 && (e[n] = r.replace(/'/g, "").trim());
	} else t.objid ? e[t.objid] = t : t.fid ? e[t.fid] = t : e[0] = t;
	return e;
}, {}), Qd = (e) => {
	let t;
	if (e === "no features were found" || e.includes("Search returned no results")) return "";
	if (e.includes("Layer")) {
		let n = e.split("\n\n");
		n.shift(), t = n.map((e) => {
			let t = {}, n = e.split(/(Layer[^\r\n]*)/);
			n.shift();
			let r = "";
			return n && n.length > 0 && (r = n.splice(0, 1)[0].split("Layer ")[1].replace(/'/g, "")), t[r] = n.map((e) => {
				let t = e.split(/(Feature[^\r\n]*)/);
				t.shift();
				let n = t.splice(0, 1)[0].split("Feature ")[1].replace(/:/g, "").trim();
				return Array.isArray(t) && t[0].length > 1 ? (t = t.map((e) => (e = e.trim().replace(/=(?=\s)/g, ":").split("\n"), Zd(e))), Zd(t)) : { feature: n };
			}), t;
		});
	} else t = Jd(e).length === 0 ? [e] : Jd(e);
	return t;
}, $d = (e) => {
	let { dispatch: t } = n(Ud), [r, i] = o(!1), [a, s] = o(), [c, l] = o(e.layer.isVisible), [u, d] = o(50), f = e.layer;
	f.Name = f.name && typeof f.name == "object" ? f.name.localPart : f.Name;
	let p = () => {
		let e = "";
		return f.Name && f.Name.length > 0 && (e = f.Name), f.Title && f.Title.length > 0 && f.Title !== f.Name && (e = f.Title), f.Abstract && f.Abstract.length > 0 && f.Abstract !== f.Title && f.Abstract !== f.Name && e.length === 0 && (e = e.length === 0 ? f.Abstract : e + " - " + f.Abstract), /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I("span", {
			className: Rd.spanCheckbox,
			children: e
		}), /* @__PURE__ */ L("p", {
			hidden: !0,
			children: [f.Layer ? "Group layer" : "layer", " "]
		})] });
	}, m = (n) => {
		let r = !0;
		if (f.Name) {
			let i;
			e.meta.Type === "OGC:WMS" || e.meta.Type === "WMS" || e.meta.Type === "WMS-tjeneste" ? i = Id.getOlLayerFromWmsCapabilities(e.meta, n) : e.meta.Type === "GEOJSON" ? i = Id.getOlLayerFromGeoJson(e.meta, n) : (e.meta.Type === "OGC:WFS" || e.meta.Type === "WFS" || e.meta.Type === "WFS-tjeneste") && (i = Id.getOlLayerFromWFS(e.meta, n)), s(i), window.olMap.getLayers().forEach(function(t) {
				t.get("name") === (n.Name + "_" + e.meta.uuid || n.Title + "_" + e.meta.uuid) && (r = !1, t.getVisible() ? t.setVisible(!1) : t.setVisible(!0), l(t.getVisible()));
			}), r && (window.olMap.addLayer(i), l(i.getVisible()), n.queryable ? window.olMap.on("singleclick", function(e) {
				let n = window.olMap.getView().getResolution(), r = i.getProperties().getFeatureInfoFormats, a = 0;
				r.indexOf("application/vnd.ogc.gml") > 0 ? a = r.indexOf("application/vnd.ogc.gml") : r.indexOf("text/xml") > 0 ? a = r.indexOf("text/xml") : r.indexOf("text/plain") > 0 ? a = r.indexOf("text/plain") : r.indexOf("application/json") > 0 ? a = r.indexOf("application/json") : r.indexOf("text/html") === 0 && (a = 1);
				let o = i.getSource().getFeatureInfoUrl(e.coordinate, n, window.olMap.getView().getProjection(), { INFO_FORMAT: r[a] });
				o && i.getVisible() && fetch(o).then((e) => e.text()).then((e) => t({
					type: "SET_FEATURES",
					show: !0,
					info: qd(e, r[a])
				})).catch((e) => {
					console.error("Error:", e);
				});
			}) : window.olMap.on("click", function(t) {
				let n = window.olMap.getFeaturesAtPixel(t.pixel, (e, t) => e);
				n && n.forEach((t) => {
					t.getGeometry().getCoordinates(), t.setStyle(new E({
						fill: new S({ color: "rgba(255, 255, 255, 0.5)" }),
						stroke: new T({
							color: "#310FD3",
							width: 3
						}),
						text: new D({
							font: "14px Calibri,sans-serif",
							fill: new S({ color: "#000" }),
							stroke: new T({
								color: "#fff",
								width: 5
							}),
							text: t.get(e.meta.ShowPropertyName)
						})
					})), t.get(e.meta.ShowPropertyName), t.getId();
				});
			}));
		}
	}, h = (e) => {
		d(e), a && a.setOpacity(Math.min(u / 100, 1));
	}, g = () => {
		let e = window.olMap.getView().getResolution();
		f.MaxScaleDenominator <= e && console.warn("Resolution mismatch, layer " + f.Name + " doesn't show at this zoom level ");
	};
	return window.olMap.getView().on("change:resolution", function(e) {
		g();
	}), /* @__PURE__ */ L(F, { children: [
		f.Name ? /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I("input", {
			className: "checkbox",
			id: f.Name,
			type: "checkbox"
		}), /* @__PURE__ */ I("label", {
			onClick: () => m(f),
			htmlFor: f.Title,
			children: /* @__PURE__ */ I(P, {
				className: "svg-checkbox",
				icon: c ? ["far", "check-square"] : ["far", "square"]
			})
		})] }) : /* @__PURE__ */ I("label", {
			onClick: () => m(f),
			htmlFor: f.Title,
			children: " "
		}),
		p(),
		f.Name ? /* @__PURE__ */ I("label", {
			onClick: () => i(!r),
			children: /* @__PURE__ */ I(P, {
				icon: ["fas", "sliders-h"],
				color: r ? "red" : "black"
			})
		}) : "",
		f.Style ? ((e) => {
			let t = [], n = e.Style, r = e.Name;
			return n.forEach((e) => {
				(e.Name.includes("inspire_common:DEFAULT") || e.Name.includes("DEFAULT")) && ur.parseUrl(e.LegendURL[0].OnlineResource).query.layer === r && t.push(e.LegendURL[0].OnlineResource);
			}), t.length === 0 && n.forEach((e) => {
				e.LegendURL && e.LegendURL.length > 0 && t.push(e.LegendURL[0].OnlineResource);
			}), t;
		})(f).map((e, t) => /* @__PURE__ */ I(Vd, { legendUrl: e }, t)) : "",
		r ? /* @__PURE__ */ I("div", {
			className: Rd.settings,
			children: /* @__PURE__ */ L("label", {
				className: Rd.slider,
				children: ["Gjennomsiktighet:", /* @__PURE__ */ I("input", {
					type: "range",
					min: 0,
					max: 100,
					value: u,
					onChange: (e) => h(e.target.value)
				})]
			})
		}) : "",
		e.children,
		f.Layer ? f.Layer.map((t, n) => /* @__PURE__ */ I("div", {
			className: Rd.facetSub,
			children: /* @__PURE__ */ I($d, {
				layer: t,
				meta: e.meta
			}, n)
		}, n)) : ""
	] });
}, ef = /* @__PURE__ */ R(((e, t) => {
	t.exports = {};
})), tf = /* @__PURE__ */ st((/* @__PURE__ */ R(((e, t) => {
	var n = typeof process < "u" && process.pid ? process.pid.toString(36) : "", r = "";
	if (typeof __webpack_require__ != "function" && ct !== void 0) {
		var i = "", a = ef();
		if (a.networkInterfaces) var o = a.networkInterfaces();
		if (o) {
			loop: for (let e in o) {
				let t = o[e], n = t.length;
				for (var s = 0; s < n; s++) if (t[s] !== void 0 && t[s].mac && t[s].mac != "00:00:00:00:00:00") {
					i = t[s].mac;
					break loop;
				}
			}
			r = i ? parseInt(i.replace(/\:|\D+/gi, "")).toString(36) : "";
		}
	}
	t.exports = t.exports.default = function(e, t) {
		return (e || "") + r + n + c().toString(36) + (t || "");
	}, t.exports.process = function(e, t) {
		return (e || "") + n + c().toString(36) + (t || "");
	}, t.exports.time = function(e, t) {
		return (e || "") + c().toString(36) + (t || "");
	};
	function c() {
		var e = Date.now(), t = c.last || e;
		return c.last = e > t ? e : t + 1;
	}
})))(), 1), nf = (e) => {
	let [t, n] = o(), [i, a] = o(), [s, c] = o(!0);
	return r(() => {
		let t = {};
		switch (e.services.DistributionProtocol) {
			case "WMS":
			case "WMS-tjeneste":
			case "OGC:WMS":
				Id.parseWmsCapabilities(e.services.GetCapabilitiesUrl).then((r) => {
					n(r), t = Id.getWMSMetaCapabilities(r), t.Type = "OGC:WMS", t.Params = e.services.customParams || "", t.uuid = e.services.uuid || (0, tf.default)(), a(t);
				}).catch((e) => console.warn(e));
				break;
			case "WFS":
			case "WFS-tjeneste":
			case "OGC:WFS":
				Id.parseWFSCapabilities(e.services.GetCapabilitiesUrl).then((r) => {
					n(r), t = Id.getWFSMetaCapabilities(r), t.Type = "WFS", t.Params = e.services.customParams || "", t.uuid = e.services.uuid || (0, tf.default)(), a(t);
				}).catch((e) => console.warn(e));
				break;
			case "GEOJSON":
				Id.getGeoJson(e.services.url).then((r) => {
					n(r), t.Type = "GEOJSON", t.ShowPropertyName = e.services.ShowPropertyName || "id", t.EPSG = e.services.EPSG || "EPSG:4326", t.uuid = e.services.uuid || (0, tf.default)(), a(t);
				}).catch((e) => console.warn(e));
				break;
			default:
				console.warn("No service type specified");
				break;
		}
	}, [
		e.services.DistributionProtocol,
		e.services.GetCapabilitiesUrl,
		e.services.url,
		e.services.ShowPropertyName,
		e.services.customParams,
		e.services.EPSG
	]), /* @__PURE__ */ L("div", { children: [
		/* @__PURE__ */ L("div", {
			onClick: () => c(!s),
			className: Ld.expandLayersBtn,
			children: [/* @__PURE__ */ I("span", {
				className: Ld.ellipsisToggle,
				children: e.services.Title
			}), /* @__PURE__ */ I(P, { icon: s ? ["fas", "angle-up"] : ["fas", "angle-down"] })]
		}),
		e.removeMapItem ? /* @__PURE__ */ I(P, {
			className: Ld.removeInline,
			onClick: (void 0).props.removeMapItem,
			icon: ["fas", "times"]
		}) : "",
		/* @__PURE__ */ I("div", {
			className: s ? `${Ld.selectedlayers} ${Ld.open}` : Ld.selectedlayers,
			children: (() => {
				if (t && t.Capability) {
					let e = t.Capability.Layer || t.Capability.Layer.Layer;
					return Array.isArray(e) ? e.map((e, t) => /* @__PURE__ */ I("div", {
						className: Ld.facet,
						children: /* @__PURE__ */ I($d, {
							layer: e,
							meta: i
						}, t)
					}, t)) : /* @__PURE__ */ I("div", {
						className: Ld.facet,
						children: /* @__PURE__ */ I($d, {
							layer: e,
							meta: i
						}, 0)
					}, 0);
				} else if (t && t.value) return t.value.featureTypeList.featureType.map((e, t) => /* @__PURE__ */ I("div", {
					className: Ld.facet,
					children: /* @__PURE__ */ I($d, {
						layer: e,
						meta: i
					}, t)
				}, t));
				else if (t && t.features) return /* @__PURE__ */ I("div", {
					className: Ld.facet,
					children: /* @__PURE__ */ I($d, {
						layer: t,
						meta: i
					})
				});
				else return "";
			})()
		})
	] });
}, rf = {
	backgroundChooser: "_backgroundChooser_evppx_1",
	active: "_active_evppx_28",
	icon_1001: "_icon_1001_evppx_41",
	icon_1002: "_icon_1002_evppx_44",
	icon_1003: "_icon_1003_evppx_47",
	icon_1004: "_icon_1004_evppx_50",
	icon_1005: "_icon_1005_evppx_53"
}, af = () => {
	let [e, t] = o([]), [n, r] = o([]);
	return Nd.RegisterEvent("MapLoaded", () => t(Pd.GetBaseLayers())), /* @__PURE__ */ I(Ve, {
		type: "radio",
		name: "Backgound",
		className: rf.backgroundChooser,
		onChange: (e) => {
			Pd.SetBaseLayer(e), Pd.ZoomToLayer(e), r(e);
		},
		value: n,
		children: ((e, t) => e.map((e, n) => {
			let r = rf[`icon_${e.id}`], i = e.id === t.id ? rf.active : "";
			return /* @__PURE__ */ I(Be, {
				id: `bg-layer-${n}`,
				className: `${r} ${i}`,
				value: e,
				children: /* @__PURE__ */ L("span", { children: [
					" ",
					e.name,
					" "
				] })
			}, n);
		}))(e, n)
	});
}, of = /* @__PURE__ */ R(((e, t) => {
	t.exports = function(e) {
		return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
			return "%" + e.charCodeAt(0).toString(16).toUpperCase();
		});
	};
})), sf = /* @__PURE__ */ R(((e) => {
	var t = of();
	e.extract = function(e) {
		return e.split("?")[1] || "";
	}, e.parse = function(e) {
		return typeof e != "string" || (e = e.trim().replace(/^(\?|#|&)/, ""), !e) ? {} : e.split("&").reduce(function(e, t) {
			var n = t.replace(/\+/g, " ").split("="), r = n.shift(), i = n.length > 0 ? n.join("=") : void 0;
			return r = decodeURIComponent(r), i = i === void 0 ? null : decodeURIComponent(i), e.hasOwnProperty(r) ? Array.isArray(e[r]) ? e[r].push(i) : e[r] = [e[r], i] : e[r] = i, e;
		}, {});
	}, e.stringify = function(e) {
		return e ? Object.keys(e).sort().map(function(n) {
			var r = e[n];
			return Array.isArray(r) ? r.sort().map(function(e) {
				return t(n) + "=" + t(e);
			}).join("&") : t(n) + "=" + t(r);
		}).filter(function(e) {
			return e.length > 0;
		}).join("&") : "";
	};
})), cf = /* @__PURE__ */ st((/* @__PURE__ */ R(((e, t) => {
	var n = sf(), r, i;
	typeof window < "u" && (r = window && window.history && window.history.replaceState, i = window && window.history && window.history.pushState), r ? t.exports = function(e, t) {
		t ||= {};
		var a = !e, o = !a && typeof e == "string", s = t.clear || o, c = t.pushState ? i : r, l = s ? {} : n.parse(window.location.search), u;
		if (!a && !o) {
			for (var d in e) {
				var f = e[d];
				!f && f !== 0 ? delete l[d] : l[d] = e[d];
			}
			u = n.stringify(l);
		} else u = e || "";
		u.length && u.charAt(0) !== "?" && (u = "?" + u), c.call(window.history, t.state || window.history.state, "", window.location.pathname + (u || ""));
	} : t.exports = function() {};
})))(), 1), lf = ({ crs: e = "EPSG:25833", lat: t = 7197860, lon: n = 396722, services: r = [], zoom: a = 4 }) => {
	let [s, c] = o(), l = ur.parse(window.location.search), u = Pd;
	Q.coordinate_system = l.crs || e, n = Number(l.lon || n), t = Number(l.lat || t), a = Number(l.zoom || a);
	let d = Object.assign({}, Q, {
		center: [n, t],
		zoom: a
	});
	i(() => {
		window.olMap = u.Init("map", d), u.AddZoom(), u.AddScaleLine(), Nd.RegisterEvent("MapMoveend", f), p(), window.olMap.on("click", function(e) {
			let t = window.olMap.forEachFeatureAtPixel(e.pixel, (e, t) => e);
			if (t) {
				let e = t.getGeometry().getCoordinates(), n = t.get("n"), r = {
					cmd: "featureSelected",
					featureId: t.getId(),
					properties: n,
					coordinates: e
				};
				Sd.postMessage(JSON.stringify(r));
			}
		});
	}, [u]);
	let f = () => {
		let e = Pd.GetCenter(), t = ur.parse(window.location.search);
		t.lon = e.lon, t.lat = e.lat, t.zoom = e.zoom, (0, cf.default)(t);
	}, p = () => {
		r.forEach((e) => {
			let t = {};
			switch (e.DistributionProtocol) {
				case "WMS":
				case "WMS-tjeneste":
				case "OGC:WMS":
					Id.parseWmsCapabilities(e.GetCapabilitiesUrl).then((n) => {
						if (t = Id.getWMSMetaCapabilities(n), t.Type = "OGC:WMS", t.Params = e.customParams || "", t.uuid = r.uuid || (0, tf.default)(), e.addLayers.length > 0) {
							let r = [];
							r = n.Capability.Layer.Layer.filter((t) => e.addLayers.includes(t.Name)), (r.length === 0 || r.length !== e.addLayers.length) && (r = [], e.addLayers.forEach((e) => {
								r.push({ Name: e });
							})), r.forEach((e) => {
								let n = Id.getOlLayerFromWmsCapabilities(t, e);
								window.olMap.addLayer(n);
							});
						}
					}).then((e) => {
						console.log("Added wms layers ready");
					}).catch((e) => console.warn(e));
					break;
				case "GEOJSON":
					Id.getGeoJson(e.url).then((n) => {
						if (t.Type = "GEOJSON", t.ShowPropertyName = e.ShowPropertyName || "id", t.EPSG = e.EPSG || "EPSG:4326", t.uuid = r.uuid || (0, tf.default)(), e.addLayers.length > 0 && n.name === e.addLayers[0]) {
							let e = Id.getOlLayerFromGeoJson(t, n);
							window.olMap.addLayer(e);
						}
					}).catch((e) => console.warn(e));
					break;
				default:
					console.warn("No service type specified");
					break;
			}
		});
	};
	return /* @__PURE__ */ I("div", {
		id: "map",
		style: {
			position: "relative",
			width: "100%",
			height: "100%",
			zIndex: 0
		},
		tabIndex: "0"
	});
}, uf = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAoCAYAAABw65OnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkNCio4bxT67gAAA+JJREFUWMPFmE9oHFUYwH9vt93sFs26EGk1hUiLSjzYQy5zEknX3nKS0kPREtHNxaumNxEqpCkeA3ZRAkJS7B5KoweFqQQJMiCxVGlSWxKypuZPu3Ez2WR3uzuzz0NfYDeZ2Z2ZTfGDx8Kbfd/3+/68974ZIaWkXszzvbQSLWn0AUmHR/r8YHwWnyK8QmhJIwGk1DjRROcikAbS84PxvBeIkJc/aUnjLLAAjLQAQD0fARZ6x82zBwKhJY0R4DqQ8BnlBHC9d9wcaQtCSxpXgWHak+HecfNqoJrQkkYKcFz8Ulzw4ZsRjsVCHDsSYq1YY61U4+s/Kqya0s3W0PxgPO0ZQhXhglMKRvujJI9HiIXFPmUlW6I/rPDpz2UnW3ngpFOxuqUj5QQwdibGQE+HIwBALCwY6Olg7EzMrUZSfmpi2CkC/d0RT0XQ3x1htD/qSa8jhNqODVE41f3UQz8y0NPBqe59EUs4bduQyz5vkPOvdwTaFi7rTniB6Ns7cbIzHAjCZV2fF4gEz1YSgY7tZy1OEPtuwYUtO5Byl3WzXiD2HSYz61YgiFvL1S0v+kMuV3GDTN21mMv7A5nLW/z0wO70ot8TBEBKL5IteEtLtmCT0ovN+o3mEIauzTqFbGNbcm5qh7nN5hGZ27Q4N7XDxrbjRZZ36rwOuejKOJ3zZkXy7o0d3n7lEO+/EeHVeJiuaIhcucYD0+bbuQrTS00hM06TbhC622UDML1ktTJGE73eLjBD1zJOKWlT8vOD8Yzfzip9wBDpIO3d/w9h6NqiWyEFqYX5wfhi0G77oKJxOXC3beia7lbRPqPQoEMI0TBC7XrRSmT1yRUhxGEhRIcQIiqEiAIRdTyEAdESop1oSKs6/dfQ0dvAi2p0qX7iOSDmGaKdaGzf+XECOA68DBxVEJ3A88BhVQ4hTxAqGr6KtPo4e/OfsffuK6NH1IgAu41nbfc35LPCvZ2itlXIfT/6nfJUqN/dG+0JUAKqQMUXhDo3PKWltHT7mjkzsVo3ZSmDpnKkqEBqvntMQ9cutyrSWiE3m/3inWu7tamMF4Ec8BgoADt16QjU6A65psW2CuuZz75Uxm1lbBNYBR4pgHJdaoJBGLq2iG1dcUxD9s6kOTPxUOX9X+X5CrABFKWUVbn3DTwIxAuT98S9j7pGsSo36uct89Gt7KXT36i8rwBrwDqwBVSllLW2Phc5fVLY+v2Hj0XNzj4lqCyvT35yURldVhHYlFKWpZQ1J+8PAkKufPVBvrR89wJA6e8/LxR+u3m/zvOylNLzy0pgCKCy9Plbv9YKudeyl07/ooquIqW0W3m+V/4Dpf+U0wEuecIAAAAASUVORK5CYII=", df = {
	searchResult: "_searchResult_1pxhx_1",
	selected: "_selected_1pxhx_10",
	open: "_open_1pxhx_21",
	ellipsisToggle: "_ellipsisToggle_1pxhx_25",
	expandBtn: "_expandBtn_1pxhx_37",
	searchInput: "_searchInput_1pxhx_52"
}, ff = "https://ws.geonorge.no/", pf = "https://ws.geonorge.no/adresser/v1/sok", mf = (e, t, n) => {
	if (e) {
		var r = e.split(",");
		if (r.length >= 2) return e = r[0] + "*&fylkeKommuneNavnListe=+" + r[1].trim(), ff + "stedsnavn/v1/navn?sok=" + e + "&treffPerSide=" + n + "&side=" + t;
	}
	return ff + "stedsnavn/v1/navn?sok=" + e + "*&treffPerSide=" + n + "&side=" + t;
}, hf = (e) => (e = typeof e == "string" ? e : "", e = e.indexOf(",") === -1 ? e + "*" : e.replace(",", "*"), pf + "?sok=" + encodeURIComponent(e) + "&treffPerSide=100"), gf = 13, _f = new y({}), vf = (e) => {
	let t = new v({ source: _f });
	window.olMap.addLayer(t);
	let n = new E({ image: new C({
		anchor: [.5, 46],
		anchorXUnits: "fraction",
		anchorYUnits: "pixels",
		src: _r
	}) }), r = new E({ image: new C({
		anchor: [.5, 46],
		anchorXUnits: "fraction",
		anchorYUnits: "pixels",
		src: uf
	}) }), i = [], a = (e) => {
		let t = new Se({ geometry: new He(e) });
		t.setStyle(n), _f.addFeature(t);
	}, o = (e) => {
		i.forEach((e) => e.setStyle(n)), window.olMap.getView().setCenter(e), window.olMap.getView().getZoom() < gf && window.olMap.getView().setZoom(gf), i = _f.getFeaturesAtCoordinate(e), i.forEach((e) => e.setStyle(r));
	}, s = (e, t = "EPSG:25833") => Me([Number(e.lon), Number(e.lat)], e.epsg, t);
	return /* @__PURE__ */ L("div", {
		className: "list-group",
		children: [e.searchResult.searchResult && e.searchResult.searchResult.adresser.map((e, t) => (a(s(e.representasjonspunkt)), /* @__PURE__ */ L("button", {
			type: "button",
			className: "list-group-item list-group-item-action",
			onClick: () => {
				o(s(e.representasjonspunkt));
			},
			children: [
				e.adressetekst,
				" , ",
				e.kommunenavn
			]
		}, t))), e.searchResult.searchResultSSR && e.searchResult.searchResultSSR.map((e, t) => (a(s({
			lon: e.representasjonspunkt.øst,
			lat: e.representasjonspunkt.nord,
			epsg: "EPSG:4258"
		})), /* @__PURE__ */ L("button", {
			type: "button",
			className: "list-group-item list-group-item-action",
			onClick: () => {
				o(s({
					lon: e.representasjonspunkt.øst,
					lat: e.representasjonspunkt.nord,
					epsg: "EPSG:4258"
				}));
			},
			children: [
				e.skrivemåte,
				" , ",
				e.kommuner ? e.kommuner[0].kommunenavn : ""
			]
		}, t)))]
	});
}, yf = ({ placeholder: e = "Søk etter steder eller adresser" }) => {
	let [t, n] = o(ur.parse(window.location.search).search), [i, a] = o(), [s, c] = o(), [l, u] = o(!1), [d, f] = o(!1);
	r(() => {
		t ? (_f.clear(), (0, cf.default)({ search: t }), fetch(hf(t)).then((e) => {
			if (!e.ok) throw Error(e.statusText);
			return e.json();
		}).then((e) => {
			a(e);
		}).catch((e) => {
			console.warn(e);
		}), fetch(mf(t, 1, 15)).then((e) => {
			if (!e.ok) throw Error(e.statusText);
			return e.json();
		}).then((e) => {
			let t = e.navn;
			c(t ? t || "" : null);
		}).catch((e) => {
			console.warn(e);
		})) : (a(""), c(""), _f.clear(), (0, cf.default)());
	}, [t]);
	let p = (e) => {
		n(e.target.value);
	}, m = () => {
		n("");
	};
	return /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("div", {
		className: "input-group col",
		children: [/* @__PURE__ */ I("input", {
			className: df.searchInput,
			onChange: p,
			placeholder: e,
			type: "text",
			value: t,
			"aria-describedby": "button-addon1"
		}), /* @__PURE__ */ I("div", {
			className: "input-group-append",
			children: /* @__PURE__ */ I("button", {
				className: "btn btn-link",
				type: "button",
				id: "button-addon1",
				onClick: () => m(),
				children: t ? /* @__PURE__ */ I(P, { icon: "times" }) : ""
			})
		})]
	}), /* @__PURE__ */ I("div", {
		className: df.searchResult,
		children: i && /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("div", { children: [/* @__PURE__ */ L("div", {
			onClick: () => u(!l),
			className: df.expandBtn,
			children: [/* @__PURE__ */ I("span", {
				className: df.ellipsisToggle,
				children: "ADRESSER"
			}), /* @__PURE__ */ I(P, { icon: l ? ["fas", "angle-up"] : ["fas", "angle-down"] })]
		}), /* @__PURE__ */ I("div", {
			className: l ? `${df.selected} ${df.open}` : df.selected,
			children: /* @__PURE__ */ I(vf, { searchResult: { searchResult: i } })
		})] }), /* @__PURE__ */ L("div", { children: [/* @__PURE__ */ L("div", {
			onClick: () => f(!d),
			className: df.expandBtn,
			children: [/* @__PURE__ */ I("span", {
				className: df.ellipsisToggle,
				children: "STEDSNAVN"
			}), /* @__PURE__ */ I(P, { icon: d ? ["fas", "angle-up"] : ["fas", "angle-down"] })]
		}), /* @__PURE__ */ I("div", {
			className: d ? `${df.selected} ${df.open}` : df.selected,
			children: /* @__PURE__ */ I(vf, { searchResult: { searchResultSSR: s } })
		})] })] })
	})] });
}, $ = {
	"m-0": "_m-0_139sv_2",
	"mx-0": "_mx-0_139sv_6",
	"my-0": "_my-0_139sv_11",
	"mb-0": "_mb-0_139sv_16",
	"ml-0": "_ml-0_139sv_20",
	"mr-0": "_mr-0_139sv_24",
	"mt-0": "_mt-0_139sv_28",
	"p-0": "_p-0_139sv_32",
	"px-0": "_px-0_139sv_36",
	"py-0": "_py-0_139sv_41",
	"pb-0": "_pb-0_139sv_46",
	"pl-0": "_pl-0_139sv_50",
	"pr-0": "_pr-0_139sv_54",
	"pt-0": "_pt-0_139sv_58",
	"m-1": "_m-1_139sv_62",
	"mx-1": "_mx-1_139sv_66",
	"my-1": "_my-1_139sv_71",
	"mb-1": "_mb-1_139sv_76",
	"ml-1": "_ml-1_139sv_80",
	"mr-1": "_mr-1_139sv_84",
	"mt-1": "_mt-1_139sv_88",
	"p-1": "_p-1_139sv_92",
	"px-1": "_px-1_139sv_96",
	"py-1": "_py-1_139sv_101",
	"pb-1": "_pb-1_139sv_106",
	"pl-1": "_pl-1_139sv_110",
	"pr-1": "_pr-1_139sv_114",
	"pt-1": "_pt-1_139sv_118",
	"m-2": "_m-2_139sv_122",
	"mx-2": "_mx-2_139sv_126",
	"my-2": "_my-2_139sv_131",
	"mb-2": "_mb-2_139sv_136",
	"ml-2": "_ml-2_139sv_140",
	"mr-2": "_mr-2_139sv_144",
	"mt-2": "_mt-2_139sv_148",
	"p-2": "_p-2_139sv_152",
	"px-2": "_px-2_139sv_156",
	"py-2": "_py-2_139sv_161",
	"pb-2": "_pb-2_139sv_166",
	"pl-2": "_pl-2_139sv_170",
	"pr-2": "_pr-2_139sv_174",
	"pt-2": "_pt-2_139sv_178",
	"m-3": "_m-3_139sv_182",
	"mx-3": "_mx-3_139sv_186",
	"my-3": "_my-3_139sv_191",
	"mb-3": "_mb-3_139sv_196",
	"ml-3": "_ml-3_139sv_200",
	"mr-3": "_mr-3_139sv_204",
	"mt-3": "_mt-3_139sv_208",
	"p-3": "_p-3_139sv_212",
	"px-3": "_px-3_139sv_216",
	"py-3": "_py-3_139sv_221",
	"pb-3": "_pb-3_139sv_226",
	"pl-3": "_pl-3_139sv_230",
	"pr-3": "_pr-3_139sv_234",
	"pt-3": "_pt-3_139sv_238",
	"search-bar-overlay": "_search-bar-overlay_139sv_243",
	"field-group": "_field-group_139sv_250",
	"col-xs-11": "_col-xs-11_139sv_254",
	"logo-overlay": "_logo-overlay_139sv_257",
	"ol-zoom": "_ol-zoom_139sv_260",
	"ol-noembed": "_ol-noembed_139sv_264",
	"ol-geolocation": "_ol-geolocation_139sv_268",
	nextbtn: "_nextbtn_139sv_272",
	backbtn: "_backbtn_139sv_275",
	upbtn: "_upbtn_139sv_278",
	sidenav: "_sidenav_139sv_281",
	closebtn: "_closebtn_139sv_281",
	"text-kartverket": "_text-kartverket_139sv_284",
	"search-content": "_search-content_139sv_287",
	"new-section": "_new-section_139sv_287",
	btn: "_btn_139sv_290",
	moveableOverlay: "_moveableOverlay_139sv_293",
	"panel-group": "_panel-group_139sv_300",
	"spinner-loader": "_spinner-loader_139sv_303",
	movemenu: "_movemenu_139sv_314",
	"draw-content": "_draw-content_139sv_317",
	dropdown: "_dropdown_139sv_317",
	"dropdown-search": "_dropdown-search_139sv_320",
	circle: "_circle_139sv_323",
	"text-ellipsis": "_text-ellipsis_139sv_326",
	"change-base-map-mobile": "_change-base-map-mobile_139sv_334",
	"ol-scale-line": "_ol-scale-line_139sv_337",
	"norgeskart-logo": "_norgeskart-logo_139sv_340",
	"dropdown-menu": "_dropdown-menu_139sv_350",
	"side-menu-position": "_side-menu-position_139sv_381",
	"margin-header-text": "_margin-header-text_139sv_396",
	"sidenav-header-text": "_sidenav-header-text_139sv_402",
	"sidenav-sections": "_sidenav-sections_139sv_410",
	"sidenav-subsection": "_sidenav-subsection_139sv_424",
	"sidenav-link": "_sidenav-link_139sv_429",
	offcanvas: "_offcanvas_139sv_434",
	"tab-group": "_tab-group_139sv_474",
	"tab-group-item": "_tab-group-item_139sv_478",
	active: "_active_139sv_490",
	"sidenav-group": "_sidenav-group_139sv_494",
	"sidenav-row": "_sidenav-row_139sv_537",
	glyphicon: "_glyphicon_139sv_541",
	activeMenu: "_activeMenu_139sv_545",
	"nav-item": "_nav-item_139sv_550",
	"nav-link": "_nav-link_139sv_550",
	"row-input": "_row-input_139sv_562",
	"no-print": "_no-print_139sv_592",
	"print-icon": "_print-icon_139sv_599",
	"ol-control": "_ol-control_139sv_604",
	fa: "_fa_139sv_649",
	"ol-scale-line-inner": "_ol-scale-line-inner_139sv_682",
	backgroundChooser: "_backgroundChooser_139sv_694",
	featherlight: "_featherlight_139sv_701",
	sidebasemapnav: "_sidebasemapnav_139sv_706",
	baseMapPanel: "_baseMapPanel_139sv_717",
	baseMap: "_baseMap_139sv_717",
	baseMaps: "_baseMaps_139sv_737",
	"base-layer-panel": "_base-layer-panel_139sv_742",
	"group-layer-fix": "_group-layer-fix_139sv_752",
	"spinner-content": "_spinner-content_139sv_757",
	"app-spinner": "_app-spinner_139sv_761",
	spinner: "_spinner_139sv_303",
	rotate: "_rotate_139sv_1",
	path: "_path_139sv_789",
	dash: "_dash_139sv_1",
	mousePosition: "_mousePosition_139sv_816",
	clickThrough: "_clickThrough_139sv_893",
	"body-overlay": "_body-overlay_139sv_893",
	fullSizeMap: "_fullSizeMap_139sv_893",
	"header-move": "_header-move_139sv_900",
	mapContainer: "_mapContainer_139sv_904",
	overlayContent: "_overlayContent_139sv_908",
	"pointer-cursor": "_pointer-cursor_139sv_919",
	"panel-body": "_panel-body_139sv_923",
	content: "_content_139sv_927",
	"btn-important": "_btn-important_139sv_939",
	"btn-ordinary": "_btn-ordinary_139sv_945",
	"btn-toggle": "_btn-toggle_139sv_951",
	"btn-default": "_btn-default_139sv_957",
	focus: "_focus_139sv_957",
	open: "_open_139sv_966",
	"dropdown-toggle": "_dropdown-toggle_139sv_966",
	disabled: "_disabled_139sv_978",
	activeBtn: "_activeBtn_139sv_1104",
	"btn-searchPanel": "_btn-searchPanel_139sv_1109",
	"section-content": "_section-content_139sv_1145",
	"icon-toggle-on": "_icon-toggle-on_139sv_1149",
	"icon-important": "_icon-important_139sv_1153",
	"icon-focus": "_icon-focus_139sv_1157",
	"line-zebra-grey": "_line-zebra-grey_139sv_1161",
	"no-border": "_no-border_139sv_1165",
	"no-margin": "_no-margin_139sv_1169",
	"no-padding": "_no-padding_139sv_1174",
	"field-group-header": "_field-group-header_139sv_1179",
	caret: "_caret_139sv_1216",
	isy: "_isy_139sv_1246",
	panel: "_panel_139sv_300",
	"search-loading-overlay": "_search-loading-overlay_139sv_1301",
	breadcrumbs: "_breadcrumbs_139sv_1324",
	"no-breadcrumbs": "_no-breadcrumbs_139sv_1333",
	tooltip: "_tooltip_139sv_1342",
	"tooltip-measure": "_tooltip-measure_139sv_1352",
	"tooltip-static": "_tooltip-static_139sv_1357",
	"tooltip-info": "_tooltip-info_139sv_1379",
	"tooltip-absolute": "_tooltip-absolute_139sv_1394",
	"has-tooltip": "_has-tooltip_139sv_1403",
	"searchbar-hover": "_searchbar-hover_139sv_1412",
	"inner-addon": "_inner-addon_139sv_1417",
	"ajax-loader-search": "_ajax-loader-search_139sv_1428",
	"search-panel": "_search-panel_139sv_1432",
	"list-result": "_list-result_139sv_1439",
	"default-list": "_default-list_139sv_1449",
	"draw-small-size": "_draw-small-size_139sv_1453",
	"btn-color-picker": "_btn-color-picker_139sv_1466",
	"color-picker": "_color-picker_139sv_1470",
	lineWithDefaultButton: "_lineWithDefaultButton_139sv_1474",
	lineWithButton: "_lineWithButton_139sv_1478",
	"info-text": "_info-text_139sv_1482",
	badge: "_badge_139sv_1486",
	"content-text-align": "_content-text-align_139sv_1508",
	"options-header-text": "_options-header-text_139sv_1522",
	isHeaderClose: "_isHeaderClose_139sv_1525",
	circleLayers: "_circleLayers_139sv_1534",
	"text-and-button": "_text-and-button_139sv_1555",
	"move-up": "_move-up_139sv_1558",
	"header-text": "_header-text_139sv_1562",
	"title-text": "_title-text_139sv_1566",
	title: "_title_139sv_1566",
	"btn-group": "_btn-group_139sv_1580",
	"btn-same-size": "_btn-same-size_139sv_1583",
	"btn-rectangle-same-size": "_btn-rectangle-same-size_139sv_1586",
	h_iframe: "_h_iframe_139sv_1592",
	"closeable-subcontent": "_closeable-subcontent_139sv_1607",
	"collapse-btn": "_collapse-btn_139sv_1614",
	"rise-btn": "_rise-btn_139sv_1623",
	"header-moveable": "_header-moveable_139sv_1637",
	"header-icon": "_header-icon_139sv_1646",
	isClosed: "_isClosed_139sv_1649",
	descriptionVisible: "_descriptionVisible_139sv_1653",
	cleanResults: "_cleanResults_139sv_1658",
	header: "_header_139sv_900",
	"hide-button": "_hide-button_139sv_1698",
	"navigation-button": "_navigation-button_139sv_1713",
	"search-pagination": "_search-pagination_139sv_1721",
	pagination: "_pagination_139sv_1727",
	"no-top": "_no-top_139sv_1778",
	"no-padding-top": "_no-padding-top_139sv_1782",
	noMarginTop: "_noMarginTop_139sv_1786",
	"dropdown-searchPanel": "_dropdown-searchPanel_139sv_1796",
	"dropdown-menu-relative": "_dropdown-menu-relative_139sv_1824",
	"search-options": "_search-options_139sv_1839",
	"legend-panel": "_legend-panel_139sv_1852",
	"logo-panel": "_logo-panel_139sv_1856",
	"no-gutter": "_no-gutter_139sv_1892",
	"display-inline": "_display-inline_139sv_1897",
	"full-width": "_full-width_139sv_1901",
	husnum: "_husnum_139sv_1905",
	"change-base-map-overlay": "_change-base-map-overlay_139sv_1925",
	"change-base-layer-overlay": "_change-base-layer-overlay_139sv_1937",
	"tab-content": "_tab-content_139sv_1953",
	"nav-tabs": "_nav-tabs_139sv_1958",
	navTabsTransparent: "_navTabsTransparent_139sv_1962",
	nav: "_nav_139sv_550",
	"scale-image": "_scale-image_139sv_2010",
	"no-display": "_no-display_139sv_2020",
	"left-addon": "_left-addon_139sv_2030",
	"left-side": "_left-side_139sv_2030",
	"right-addon": "_right-addon_139sv_2034",
	"right-side": "_right-side_139sv_2034",
	"absolute-right-side": "_absolute-right-side_139sv_2038",
	"table-borderless": "_table-borderless_139sv_2060",
	"checkbox-below": "_checkbox-below_139sv_2065",
	"faq-items": "_faq-items_139sv_2074",
	expanded: "_expanded_139sv_2085",
	drawInfo: "_drawInfo_139sv_2100",
	highPriorityBtn: "_highPriorityBtn_139sv_2117",
	menuCloseBtn: "_menuCloseBtn_139sv_2122",
	noSearchHits: "_noSearchHits_139sv_2128",
	link: "_link_139sv_2139",
	closeMap: "_closeMap_139sv_2147",
	closeButtonLabel: "_closeButtonLabel_139sv_2164",
	container: "_container_139sv_2181",
	closed: "_closed_139sv_2204",
	toggleBtn: "_toggleBtn_139sv_2215",
	tabs: "_tabs_139sv_2227",
	tabList: "_tabList_139sv_2237",
	tabButton: "_tabButton_139sv_2241",
	tabPanel: "_tabPanel_139sv_2254",
	hiddenPanel: "_hiddenPanel_139sv_2258",
	search: "_search_139sv_243"
}, bf = { mouseposition: "_mouseposition_1nqpk_1" }, xf = () => {
	let [e, t] = o();
	r(() => {
		n(window.olMap);
	});
	let n = (n) => {
		let r = n.getControls().getArray().find((e) => e instanceof We);
		t(n.getView().getProjection().getCode());
		let i = (e) => Ue(e, "{y}N, {x}Ø");
		if (!r) {
			let t = new We({
				name: "ol-mouse-position",
				coordinateFormat: i,
				target: document.getElementById("mouse-position"),
				undefinedHTML: "&nbsp;",
				projection: e
			});
			n.addControl(t);
		}
	};
	return /* @__PURE__ */ L("div", {
		className: bf.mouseposition,
		children: [/* @__PURE__ */ I("span", { children: e }), /* @__PURE__ */ I("div", { id: "mouse-position" })]
	});
}, Sf = { ulContainer: "_ulContainer_kpwtl_1" }, Cf = () => {
	let t = n(Ud), { dispatch: r } = t, i = (e) => {
		if (typeof e == "object") return "isObject";
		let t = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i.exec(e);
		if (!t) return "";
		switch (t[1]) {
			case t[2]: return "isNumeric";
			case t[3]: return "isBoolean";
			case t[4]: return "isDate";
			case t[5]: return t[5].length === 50 || t[5].length === 194 ? "isBboxInternal" : t[5].startsWith("{\"type\":\"Point\"") ? "isBboxJsonPoint" : t[5].startsWith("{\"type\":\"Polygon\"") ? "isBboxJsonPolygon" : t[5].startsWith("BOX(") ? "isBboxSimple" : t[5].startsWith("http") ? "isLink" : "isString";
			default: return !1;
		}
	}, a = (e) => {
		switch (i(e)) {
			case "isNumeric": return /* @__PURE__ */ I(F, { children: e });
			case "isBoolean": return /* @__PURE__ */ I(F, { children: e });
			case "isDate": return /* @__PURE__ */ I(F, { children: e });
			case "isBboxInternal": return /* @__PURE__ */ I(F, { children: "BBOX db internal" });
			case "isBboxJsonPoint": return /* @__PURE__ */ I(F, { children: "BBOX point" });
			case "isBboxJsonPolygon": return /* @__PURE__ */ I(F, { children: "BBOX polygon" });
			case "isBboxSimple": return /* @__PURE__ */ I(F, { children: e });
			case "isLink": return /* @__PURE__ */ I("a", {
				href: e,
				target: "_blank",
				rel: "noreferrer",
				children: e
			});
			case "isString": return /* @__PURE__ */ I(F, { children: e });
			default: return /* @__PURE__ */ I(F, {});
		}
	}, o = (t) => {
		let n = [];
		for (let r in t) {
			let i = t[r], o = [];
			if (Array.isArray(i)) {
				for (let e in i) if (e !== "name") {
					let t = i[e];
					for (let e in t) {
						let n = t[e];
						if (typeof n != "string") for (let [e, t] of Object.entries(n)) o.push(/* @__PURE__ */ L("li", { children: [
							/* @__PURE__ */ L("i", { children: [e, " "] }),
							" = ",
							/* @__PURE__ */ I("strong", { children: a(t) }),
							" "
						] }, (0, tf.default)(e)));
						else o.push(/* @__PURE__ */ L("li", { children: [
							/* @__PURE__ */ L("i", { children: ["FeatureID", " "] }),
							" = ",
							/* @__PURE__ */ I("strong", { children: a(n) }),
							" "
						] }, (0, tf.default)(e)));
					}
				}
			} else for (let [e, t] of Object.entries(i)) o.push(/* @__PURE__ */ L("li", { children: [
				/* @__PURE__ */ L("i", { children: [e, " "] }),
				" = ",
				/* @__PURE__ */ I("strong", { children: a(t) }),
				" "
			] }, (0, tf.default)(e)));
			n.push(/* @__PURE__ */ L(e.Fragment, { children: [/* @__PURE__ */ I("h3", { children: r }), /* @__PURE__ */ I("ul", { children: o })] }, (0, tf.default)(r)));
		}
		return /* @__PURE__ */ I("div", {
			className: Sf.ulContainer,
			children: n
		}, (0, tf.default)());
	};
	return /* @__PURE__ */ L(Ge, {
		show: t.state.show,
		onHide: () => r({
			type: "HIDE_FEATURES",
			info: t.state.info
		}),
		children: [/* @__PURE__ */ I(Ge.Header, {
			closeButton: !0,
			children: /* @__PURE__ */ L(Ge.Title, { children: [
				"Egenskaper ",
				/* @__PURE__ */ L("span", { children: [
					" ( ",
					t.state.info ? t.state.info.length : 0,
					" )"
				] }),
				" "
			] })
		}), /* @__PURE__ */ I(Ge.Body, { children: Array.isArray(t.state.info) ? t.state.info.map((e) => o(e)) : /* @__PURE__ */ I("div", { children: "No info" }) })]
	});
}, wf = (e) => /* @__PURE__ */ I(nf, {
	services: e.listItem,
	removeMapItem: e.removeMapItem,
	draggable: !0
}), Tf = ({ crs: e = "EPSG:25833", lat: t = 7197860, lon: n = 396722, removeMapItem: r = null, services: a = [], zoom: s = 4 }) => {
	let [c, l] = o(!1), [u, d] = o(), [f, p] = o("layers"), m = ur.parse(window.location.search), h = Pd;
	Q.coordinate_system = m.crs || e, n = Number(m.lon || n), t = Number(m.lat || t), s = Number(m.zoom || s);
	let g = JSON.parse(JSON.stringify(Q)), _ = Object.assign({}, g, {
		center: [n, t],
		zoom: s
	});
	i(() => {
		window.olMap = h.Init("map", _), h.AddZoom(), h.AddScaleLine(), Nd.RegisterEvent("MapMoveend", y);
	}, [h]);
	let v = () => {
		let e = a;
		if (u) {
			let t = {
				Title: "Added WMS from url",
				DistributionProtocol: "OGC:WMS",
				GetCapabilitiesUrl: u,
				addLayers: []
			};
			e = a.concat(t);
		}
		return e.map((e, t) => /* @__PURE__ */ I(wf, {
			listItem: e,
			removeMapItem: r,
			map: Pd
		}, t));
	}, y = () => {
		let e = Pd.GetCenter(), t = ur.parse(window.location.search);
		t.lon = e.lon, t.lat = e.lat, t.zoom = e.zoom, (0, cf.default)(t);
	}, b = () => {
		window.history.back();
	};
	return /* @__PURE__ */ I(Gd, { children: /* @__PURE__ */ L("div", {
		id: "MapContainer",
		className: `${$.mapContainer}`,
		children: [
			/* @__PURE__ */ I(af, {}),
			/* @__PURE__ */ I("div", { children: /* @__PURE__ */ L("div", { children: [/* @__PURE__ */ L("div", {
				className: $.closeMap,
				children: [/* @__PURE__ */ I(P, {
					title: "Lukk kartet",
					onClick: () => b(),
					className: $.toggleBtn,
					icon: "times"
				}), /* @__PURE__ */ I("span", {
					className: $.closeButtonLabel,
					children: "Lukk kartet"
				})]
			}), /* @__PURE__ */ L("div", {
				className: `${$.container} ${c ? $.closed : $.open}`,
				children: [/* @__PURE__ */ I(P, {
					onClick: () => l(!c),
					className: $.toggleBtn,
					icon: c ? ["fas", "layer-group"] : "times"
				}), /* @__PURE__ */ L("div", {
					className: `${$.tabs} ${c ? $.closed : $.open}`,
					children: [
						/* @__PURE__ */ L("div", {
							className: $.tabList,
							role: "tablist",
							"aria-label": "Kartfaner",
							children: [/* @__PURE__ */ I("button", {
								type: "button",
								role: "tab",
								"aria-selected": f === "search",
								className: `${$.tabButton} ${f === "search" ? $.active : ""}`,
								onClick: () => p("search"),
								children: "Søk"
							}), /* @__PURE__ */ I("button", {
								type: "button",
								role: "tab",
								"aria-selected": f === "layers",
								className: `${$.tabButton} ${f === "layers" ? $.active : ""}`,
								onClick: () => p("layers"),
								children: "Visning"
							})]
						}),
						/* @__PURE__ */ I("div", {
							className: f === "search" ? $.tabPanel : $.hiddenPanel,
							children: /* @__PURE__ */ I(yf, {})
						}),
						/* @__PURE__ */ I("div", {
							className: `${$.search} ${f === "layers" ? $.tabPanel : $.hiddenPanel}`,
							children: /* @__PURE__ */ I("div", {
								id: "ServiceList",
								children: v()
							})
						})
					]
				})]
			})] }) }),
			/* @__PURE__ */ I("div", {
				id: "map",
				style: {
					position: "relative",
					width: "100%",
					height: "100%",
					zIndex: 0
				},
				tabIndex: "0"
			}),
			h ? /* @__PURE__ */ I(xf, {
				map: h,
				projection: e
			}) : null,
			/* @__PURE__ */ I("div", {
				id: "mapPopover",
				children: /* @__PURE__ */ I(Cf, {
					info: "",
					show: !1
				})
			})
		]
	}) });
};
//#endregion
//#region src/Utils/icons.js
Ke.add([
	Ye,
	Xe,
	Ze,
	qe,
	Je,
	Qe,
	$e
]);
//#endregion
export { af as BackgroundChooser, zd as Legend, lf as MapComponent, Tf as MapContainer, nf as ServicePanel };

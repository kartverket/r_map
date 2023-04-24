"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWmsCapabilities = exports.mergeDefaultParams = exports.getWMSCapabilities = exports.getResolutionFromScale = exports.getImageSourceRatio = exports.createOlWMSFromCap = exports.addWmsToMapFromConfig = exports.addWmsToMapFromCap = void 0;

var _queryString = _interopRequireDefault(require("query-string"));

var _fastXmlParser = _interopRequireDefault(require("fast-xml-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @ngdoc method
 * @name addWmsToMapFromCap
 *
 * @description
 * Add a new ol.Layer object to the map from a capabilities parsed
 * ojbect.
 *
 * @param {ol.map} map to add the layer
 * @param {Object} getCapLayer object to convert
 * @param {string} style of the style to use
 */
var addWmsToMapFromCap = function addWmsToMapFromCap(map, getCapLayer) {
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var isNewLayer = true;
  var returnLayer;
  map.getLayers().forEach(function (layer) {
    if (layer.get('name') === (getCapLayer.Name || getCapLayer.Title)) {
      isNewLayer = false;
      var visibility = layer.getVisible();

      if (visibility === false) {
        layer.setVisible(true);
      } else if (visibility === true) {
        layer.setVisible(false);
      }

      returnLayer = layer;
    }
  });

  if (isNewLayer) {
    returnLayer = createOlWMSFromCap(map, getCapLayer);
    map.addLayer(returnLayer);
  }

  return returnLayer;
};

exports.addWmsToMapFromCap = addWmsToMapFromCap;

var addWmsToMapFromConfig = function addWmsToMapFromConfig(map, wmslayer, project) {
  var isNewLayer = true;
  var returnLayer;
  map.getLayers().forEach(function (layer) {
    if (layer.get('name') === wmslayer.layers) {
      isNewLayer = false;
      var visibility = layer.getVisible();

      if (visibility === false) {
        layer.setVisible(true);
      } else if (visibility === true) {
        layer.setVisible(false);
      }

      returnLayer = layer;
    }
  });

  if (isNewLayer) {
    returnLayer = createOlWMSFromCap(map, wmslayer, project);
    map.addLayer(returnLayer);
  }

  return returnLayer;
};
/**
 * @description
 * Parse an object describing a layer from
 * a getCapabilities document parsing. Create a ol.Layer WMS
 * from this object and add it to the map with all known
 * properties.
 *
 * @param {ol.map} map to add the layer
 * @param {Object} getCapLayer object to convert
 * @param {string} url of the wms service (we want this one instead
 *  of the one from the capabilities to be sure its persistent)
 * @return {ol.Layer} the created layer
 */


exports.addWmsToMapFromConfig = addWmsToMapFromConfig;

var createOlWMSFromCap = function createOlWMSFromCap(map, getCapLayer, project) {
  var layer,
      errors = [];

  if (getCapLayer) {
    var layerParam = {
      LAYERS: getCapLayer.layers
    };

    if (getCapLayer.version) {
      layerParam.VERSION = getCapLayer.version;
    }
    /*
    var  attribution, attributionUrl, metadata
      if (getCapLayer.Attribution !== undefined) {
        if (Array.isArray(getCapLayer.Attribution)) {
            console.warn('');
        } else {
            attribution = getCapLayer.Attribution.Title;
            if (getCapLayer.Attribution.OnlineResource) {
                attributionUrl = getCapLayer.Attribution.OnlineResource;
            }
        }
    }
    if (Array.isArray(getCapLayer.MetadataURL)) {
        metadata = getCapLayer.MetadataURL[0].OnlineResource;
    }
          layer = createOlWMS(map, layerParam, {
          url: getCapLayer.url,
          label: getCapLayer.title,
          attribution: attribution,
          attributionUrl: attributionUrl,
          projection: projCode,
          legend: getCapLayer.legendurl,
          group: getCapLayer.group,
          metadata: metadata,
          extent: getLayerExtentFromGetCap(map,
              getCapLayer),
          minResolution: getResolutionFromScale(
              map.getView().getProjection(),
              getCapLayer.MinScaleDenominator),
          maxResolution: getResolutionFromScale(
              map.getView().getProjection(),
              getCapLayer.MaxScaleDenominator)
      });*/


    if (Array.isArray(getCapLayer.Dimension)) {
      for (var i = 0; i < getCapLayer.Dimension.length; i++) {
        if (getCapLayer.Dimension[i].name === 'elevation') {
          layer.set('elevation', getCapLayer.Dimension[i].values.split(','));
        }

        if (getCapLayer.Dimension[i].name === 'time') {
          layer.set('time', getCapLayer.Dimension[i].values.split(','));
        }
      }
    }

    if (Array.isArray(getCapLayer.Style) && getCapLayer.Style.length > 1) {
      layer.set('style', getCapLayer.Style);
    }

    layer.set('advanced', !!(layer.get('elevation') || layer.get('time') || layer.get('style')));
    layer.set('errors', errors);
    map.on('singleclick', function (evt) {
      var viewResolution = map.getView().getResolution();
      var url = layer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, map.getView().getProjection(), {
        INFO_FORMAT: 'text/plain'
      });

      if (url) {
        fetch(url).then(function (response) {
          console.log('FeatureInfo : ' + response.data);
        });
      }
    });
    return layer;
  }
};

exports.createOlWMSFromCap = createOlWMSFromCap;

var mergeDefaultParams = function mergeDefaultParams(url, defaultParams) {
  //merge URL parameters with default ones
  var parsedUrl = _queryString.default.parseUrl(url);

  var urlParams = parsedUrl.query;
  var urlObj = new URL(parsedUrl.url); //force https

  if (window.location.protocol === 'https:' && urlObj.protocol === 'http:') {
    urlObj.protocol = 'https:';
  }

  for (var p in urlParams) {
    defaultParams[p] = urlParams[p];

    if (defaultParams.hasOwnProperty(p.toLowerCase()) && p !== p.toLowerCase()) {
      delete defaultParams[p.toLowerCase()];
    }
  }

  if (urlObj.href === 'https://norgeskart.no/ws/px.py') {
    return url;
  } else {
    return urlObj.href + "?" + _queryString.default.stringify(defaultParams);
  }
};

exports.mergeDefaultParams = mergeDefaultParams;

var parseWmsCapabilities = function parseWmsCapabilities(data) {
  if (data && _fastXmlParser.default.validate(data) === true) {
    //optional
    var parsed = parseCapabilities(data);
    var layers = [];

    if (parsed.WMS_Capabilities) {
      var url = parsed.WMS_Capabilities.Capability.Request.GetMap.DCPType.HTTP.Get.OnlineResource["xlink:href"]; // Push all leaves into a flat array of Layers.

      var getFlatLayers = function getFlatLayers(layer) {
        if (Array.isArray(layer)) {
          for (var i = 0, len = layer.length; i < len; i++) {
            getFlatLayers(layer[i]);
          }
        } else if (layer) {
          layer.url = url;
          layers.push(layer);
          getFlatLayers(layer.Layer);
        }
      }; // Make sur Layer property is an array even if
      // there is only one element.


      var setLayerAsArray = function setLayerAsArray(node) {
        if (node) {
          if (node.Layer && !Array.isArray(node.Layer)) {
            node.Layer = [node.Layer];
          }

          if (node.Layer) {
            for (var i = 0; i < node.Layer.length; i++) {
              setLayerAsArray(node.Layer[i]);
            }
          }
        }
      };

      getFlatLayers(parsed.WMS_Capabilities.Capability.Layer);
      setLayerAsArray(parsed.WMS_Capabilities.Capability);
      parsed.WMS_Capabilities.Capability.layers = layers;
      parsed.WMS_Capabilities.Capability.version = parsed.WMS_Capabilities.version;
      return parsed.WMS_Capabilities;
    } else {
      return {};
    }
  } else {
    return {};
  }
};

exports.parseWmsCapabilities = parseWmsCapabilities;

var parseCapabilities = function parseCapabilities(xml) {
  return _fastXmlParser.default.parse(xml, {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true
  });
};

var getWMSCapabilities = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
    var newUrl;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (url) {
              newUrl = mergeDefaultParams(url, {
                service: "WMS",
                request: "GetCapabilities"
              });
              fetch(newUrl).then(function (response) {
                return Promise.resolve(response.text());
              }).then(function (text) {
                var resultText = parseWmsCapabilities(text);
                return resultText;
              });
            } else {
              console.warn("No wms parameter given");
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getWMSCapabilities(_x) {
    return _ref.apply(this, arguments);
  };
}();
/*
export const getLayerExtentFromGetCap = (map, getCapLayer) => {
    var extent = null;
    var layer = getCapLayer;
    var proj = map.getView().getProjection();

    var setProjectionFromEPSG = function (bbox) {
        var epsg_url = 'https://epsg.io/?format=json&q=' + bbox.crs.split(':')[1];
        return fetch(epsg_url)
            .then(function (response) {
                var results = response.data.results;
                if (results && results.length > 0) {
                    for (var i = 0, ii = results.length; i < ii; i++) {
                        var result = results[i];
                        if (result) {
                            if (result['code'] && result['code'].length > 0 && result['proj4'] && result['proj4'].length > 0) {
                                proj4.defs('EPSG:' + result['code'], result['proj4']);
                            }
                        }
                    }
                }
            });
    };
    var bboxProp;
    ['EX_GeographicBoundingBox', 'WGS84BoundingBox'].forEach(
        function (prop) {
            if (Array.isArray(layer[prop])) {
                bboxProp = layer[prop];
            }
        });
    if (bboxProp) {
        extent = transformExtent(bboxProp, 'EPSG:4326', proj);
    } else if (Array.isArray(layer.BoundingBox)) {
        for (var i = 0; i < layer.BoundingBox.length; i++) {
            var bbox = layer.BoundingBox[i];
            if (!get(bbox.crs)) {
                // eslint-disable-next-line
                setProjectionFromEPSG(bbox).then(() => {
                    extent = transformExtent(bbox.extent, bbox.crs || 'EPSG:4326', proj);
                });
            } else {
                if (bbox.crs === proj.getCode() || layer.BoundingBox.length === 1) {
                    extent = transformExtent(bbox.extent, bbox.crs || 'EPSG:4326', proj);
                    break;
                }
            }
        }
    }
    return extent;
}
*/

/**
 * @description
 * Compute the resolution from a given scale
 *
 * @param {ol.Projection} projection of the map
 * @param {number} scale to convert
 * @return {number} resolution
 */


exports.getWMSCapabilities = getWMSCapabilities;

var getResolutionFromScale = function getResolutionFromScale(projection, scale) {
  return scale && scale * 0.00028 / projection.getMetersPerUnit();
};

exports.getResolutionFromScale = getResolutionFromScale;

var getImageSourceRatio = function getImageSourceRatio(map, maxWidth) {
  var width = map.getSize() && map.getSize()[0];
  var ratio = maxWidth / width;
  ratio = Math.floor(ratio * 100) / 100;
  return Math.min(1.5, Math.max(1, ratio));
};

exports.getImageSourceRatio = getImageSourceRatio;
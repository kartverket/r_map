"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResolutionFromScale = exports.getWMSCapabilities = exports.parseWmsCapabilities = exports.mergeDefaultParams = exports.createOlWMSFromCap = exports.addWmsToMapFromConfig = exports.addWmsToMapFromCap = void 0;

var _proj = _interopRequireDefault(require("proj4"));

var _queryString = _interopRequireDefault(require("query-string"));

var _fastXmlParser = _interopRequireDefault(require("fast-xml-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var attribution,
      attributionUrl,
      metadata,
      errors = [];

  if (getCapLayer) {
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

    var layerParam = {
      LAYERS: getCapLayer.layers
    };

    if (getCapLayer.version) {
      layerParam.VERSION = getCapLayer.version;
    }

    var layer;
    /* = createOlWMS(map, layerParam, {
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
      var url = layer.getSource().getGetFeatureInfoUrl(evt.coordinate, viewResolution, map.getView().getProjection(), {
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

  for (var p in urlParams) {
    defaultParams[p] = urlParams[p];

    if (defaultParams.hasOwnProperty(p.toLowerCase()) && p !== p.toLowerCase()) {
      delete defaultParams[p.toLowerCase()];
    }
  }

  return parsedUrl.url + "?" + _queryString.default.stringify(defaultParams);
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

function getInfo(_x) {
  return _getInfo.apply(this, arguments);
}

function _getInfo() {
  _getInfo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(url) {
    var info, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return fetch(url);

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.text();

          case 6:
            info = _context2.sent;
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log('Error!', _context2.t0);

          case 12:
            return _context2.abrupt("return", info);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 9]]);
  }));
  return _getInfo.apply(this, arguments);
}

var getWMSCapabilities =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(url) {
    var newUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(url);

            if (url) {
              newUrl = mergeDefaultParams(url, {
                service: "WMS",
                request: "GetCapabilities"
              });
              console.log(newUrl);
              fetch(newUrl).then(function (response) {
                return Promise.resolve(response.text());
              }).then(function (text) {
                var resultText = parseWmsCapabilities(text);
                return resultText;
              });
            } else {
              console.log("No wms parameter given");
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getWMSCapabilities(_x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getWMSCapabilities = getWMSCapabilities;

var getLayerExtentFromGetCap = function getLayerExtentFromGetCap(map, getCapLayer) {
  var extent = null;
  var layer = getCapLayer;
  var proj = map.getView().getProjection(); //var ext = layer.BoundingBox[0].extent;
  //var olExtent = [ext[1],ext[0],ext[3],ext[2]];
  // TODO fix using layer.BoundingBox[0].extent
  // when sextant fix his capabilities

  var setProjectionFromEPSG = function setProjectionFromEPSG(bbox) {
    var epsg_url = 'https://epsg.io/?format=json&q=' + bbox.crs.split(':')[1];
    return fetch(epsg_url).then(function (response) {
      var results = response.data.results;

      if (results && results.length > 0) {
        for (var i = 0, ii = results.length; i < ii; i++) {
          var result = results[i];

          if (result) {
            if (result['code'] && result['code'].length > 0 && result['proj4'] && result['proj4'].length > 0) {
              _proj.default.defs('EPSG:' + result['code'], result['proj4']);
            }
          }
        }
      }
    });
  };

  var bboxProp;
  ['EX_GeographicBoundingBox', 'WGS84BoundingBox'].forEach(function (prop) {
    if (Array.isArray(layer[prop])) {
      bboxProp = layer[prop];
    }
  });
  /*
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
      */

  return extent;
};
/**
 * @description
 * Compute the resolution from a given scale
 *
 * @param {ol.Projection} projection of the map
 * @param {number} scale to convert
 * @return {number} resolution
 */


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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseWmsCapabilities = exports.mergeDefaultParams = exports.getWMSCapabilities = exports.getResolutionFromScale = exports.getImageSourceRatio = exports.createOlWMSFromCap = exports.addWmsToMapFromConfig = exports.addWmsToMapFromCap = void 0;
var _queryString = _interopRequireDefault(require("query-string"));
var _fastXmlParser = _interopRequireDefault(require("fast-xml-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//import proj4 from "proj4";

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
const addWmsToMapFromCap = function (map, getCapLayer) {
  let style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
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
const addWmsToMapFromConfig = (map, wmslayer, project) => {
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
const createOlWMSFromCap = (map, getCapLayer, project) => {
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
const mergeDefaultParams = (url, defaultParams) => {
  //merge URL parameters with default ones
  const parsedUrl = _queryString.default.parseUrl(url);
  const urlParams = parsedUrl.query;
  const urlObj = new URL(parsedUrl.url);
  //force https
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
const parseWmsCapabilities = data => {
  if (data && _fastXmlParser.default.validate(data) === true) {
    //optional
    var parsed = parseCapabilities(data);
    var layers = [];
    if (parsed.WMS_Capabilities) {
      let url = parsed.WMS_Capabilities.Capability.Request.GetMap.DCPType.HTTP.Get.OnlineResource["xlink:href"];

      // Push all leaves into a flat array of Layers.
      var getFlatLayers = function (layer) {
        if (Array.isArray(layer)) {
          for (var i = 0, len = layer.length; i < len; i++) {
            getFlatLayers(layer[i]);
          }
        } else if (layer) {
          layer.url = url;
          layers.push(layer);
          getFlatLayers(layer.Layer);
        }
      };

      // Make sur Layer property is an array even if
      // there is only one element.
      var setLayerAsArray = function (node) {
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
const parseCapabilities = xml => {
  return _fastXmlParser.default.parse(xml, {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true
  });
};
const getWMSCapabilities = async url => {
  if (url) {
    let newUrl = mergeDefaultParams(url, {
      service: "WMS",
      request: "GetCapabilities"
    });
    fetch(newUrl).then(function (response) {
      return Promise.resolve(response.text());
    }).then(function (text) {
      let resultText = parseWmsCapabilities(text);
      return resultText;
    });
  } else {
    console.warn("No wms parameter given");
  }
};
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
const getResolutionFromScale = (projection, scale) => {
  return scale && scale * 0.00028 / projection.getMetersPerUnit();
};
exports.getResolutionFromScale = getResolutionFromScale;
const getImageSourceRatio = (map, maxWidth) => {
  var width = map.getSize() && map.getSize()[0];
  var ratio = maxWidth / width;
  ratio = Math.floor(ratio * 100) / 100;
  return Math.min(1.5, Math.max(1, ratio));
};
exports.getImageSourceRatio = getImageSourceRatio;
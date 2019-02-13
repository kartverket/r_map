"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CapabilitiesUtil = exports.newMaplibLayer = void 0;

var _WMSCapabilities = _interopRequireDefault(require("ol/format/WMSCapabilities"));

var _WMTSCapabilities = _interopRequireDefault(require("ol/format/WMTSCapabilities.js"));

var _Domain = require("./Domain");

var _get = _interopRequireDefault(require("lodash/get.js"));

var _maplibHelper = require("./maplibHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var newMaplibLayer = function newMaplibLayer(sourceType, source) {
  var catIds = [999];

  if (source.groupid !== undefined) {
    catIds = source.groupid.toString().split(',').map(function (item) {
      return parseInt(item, 10);
    });
    (0, _maplibHelper.createNotExistGroup)(catIds, source.name, source.namelng);
  } else {
    if (source.options.isbaselayer === 'false') {
      (0, _maplibHelper.createDummyGroup)();
    }
  }

  var newIsyLayer = new _Domain.Layer({
    subLayers: [{
      title: source.name,
      name: source.params.layers || source.name,
      providerName: source.params.layers || source.name,
      source: sourceType,
      gatekeeper: source.gatekeeper === 'true',
      url: (0, _maplibHelper.getWmsUrl)(source.url),
      format: source.params.format,
      coordinate_system: source.epsg || _maplibHelper.mapConfig.coordinate_system,
      extent: _maplibHelper.mapConfig.extent,
      extentUnits: _maplibHelper.mapConfig.extentUnits,
      matrixPrefix: source.matrixprefix === 'true',
      matrixSet: source.matrixset,
      numZoomLevels: _maplibHelper.mapConfig.numZoomLevels,
      id: sourceType === 'VECTOR' ? source.name + 8001 : source.name + 1001,
      transparent: true,
      layerIndex: -1,
      legendGraphicUrl: source.legendurl || '',
      minScale: source.options.minscale,
      maxScale: source.options.maxscale,
      sortingIndex: -1,
      featureInfo: {
        supportsGetFeatureInfo: true,
        getFeatureInfoFormat: 'application/vnd.ogc.gml',
        getFeatureInfoCrs: '',
        supportsGetFeature: true,
        getFeatureBaseUrl: '',
        getFeatureFormat: 'application/json',
        getFeatureCrs: 'EPSG:4326',
        includedFields: source.includedfields
      },
      tiled: source.options.singletile !== 'true',
      crossOrigin: 'anonymous',
      style: source.style,
      wmtsExtent: source.wmtsextent,
      getCapabilities: source.getcapabilities === 'true',
      styles: source.params.styles,
      minResolution: source.minresolution,
      maxResolution: source.maxresolution || 21664
    }],
    guid: source.guid,
    name: source.name,
    groupId: catIds,
    visibleOnLoad: source.options.visibility === 'true',
    id: sourceType === 'VECTOR' ? source.name + 8001 : source.name + 1001,
    isBaseLayer: source.options.isbaselayer === 'true',
    previewActive: false,
    opacity: 1,
    mapLayerIndex: -1,
    legendGraphicUrls: [],
    selectedLayerOpen: false,
    thumbnail: source.thumbnail,
    label: source.name,
    value: source.name
  });
  return newIsyLayer;
};
/**
 * Helper class to parse capabilities of WMS layers
 *
 * @class CapabilitiesUtil
 */


exports.newMaplibLayer = newMaplibLayer;

var CapabilitiesUtil =
/*#__PURE__*/
function () {
  function CapabilitiesUtil() {
    _classCallCheck(this, CapabilitiesUtil);
  }

  _createClass(CapabilitiesUtil, null, [{
    key: "parseWmsCapabilities",

    /**
     * Parses the given WMS Capabilities string.
     *
     * @param {string} capabilitiesUrl Url to WMS capabilities document
     * @return {Object} An object representing the WMS capabilities.
     */
    value: function parseWmsCapabilities(capabilitiesUrl) {
      return fetch(capabilitiesUrl).then(function (response) {
        return response.text();
      }).then(function (data) {
        var wmsCapabilitiesParser = new _WMSCapabilities.default();
        return wmsCapabilitiesParser.read(data);
      });
    }
    /**
     * Returns the layers from a parsed WMS GetCapabilities object.
     *
     * @param {Object} capabilities A capabilities object.
     * @param {string} nameField Configure the field which should be set as the
     *                           'name' property in the openlayers layer.
     * @return {OlLayerTile[]} Array of OlLayerTile
     */

  }, {
    key: "getLayersFromWmsCapabilties",
    value: function getLayersFromWmsCapabilties(capabilities) {
      var nameField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Name';
      var wmsVersion = (0, _get.default)(capabilities, 'version');
      var layersInCapabilities = (0, _get.default)(capabilities, 'Capability.Layer.Layer');
      var wmsGetMapConfig = (0, _get.default)(capabilities, 'Capability.Request.GetMap');
      var getMapUrl = (0, _get.default)(wmsGetMapConfig, 'DCPType[0].HTTP.Get.OnlineResource');
      return layersInCapabilities.map(function (layerObj) {
        return newMaplibLayer('WMS', {
          type: "map",
          name: (0, _get.default)(layerObj, nameField),
          url: getMapUrl,
          legendurl: (0, _get.default)(layerObj, 'Style[0].LegendURL[0].OnlineResource'),
          params: {
            layers: (0, _get.default)(layerObj, 'Name'),
            format: "image/png",
            'VERSION': wmsVersion
          },
          guid: "1.temakart",
          options: {
            isbaselayer: "false",
            singletile: "false",
            visibility: "true"
          }
        });
      });
    }
    /**
     * Parses the given WMTS Capabilities string.
     *
     * @param {string} capabilitiesUrl Url to WMTS capabilities document
     * @return {Object} An object representing the WMTS capabilities.
     */

  }, {
    key: "parseWmtsCapabilities",
    value: function parseWmtsCapabilities(capabilitiesUrl) {
      return fetch(capabilitiesUrl).then(function (response) {
        return response.text();
      }).then(function (data) {
        var wmtsCapabilitiesParser = new _WMTSCapabilities.default();
        return wmtsCapabilitiesParser.read(data);
      });
    }
  }]);

  return CapabilitiesUtil;
}();

exports.CapabilitiesUtil = CapabilitiesUtil;
var _default = CapabilitiesUtil;
exports.default = _default;
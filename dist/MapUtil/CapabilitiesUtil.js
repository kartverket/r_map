'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CapabilitiesUtil = exports.newMaplibLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WMSCapabilities = require('ol/format/WMSCapabilities');

var _WMSCapabilities2 = _interopRequireDefault(_WMSCapabilities);

var _WMTSCapabilities = require('ol/format/WMTSCapabilities.js');

var _WMTSCapabilities2 = _interopRequireDefault(_WMTSCapabilities);

var _ImageWMS = require('ol/source/ImageWMS');

var _ImageWMS2 = _interopRequireDefault(_ImageWMS);

var _Domain = require('./Domain');

var _get = require('lodash/get.js');

var _get2 = _interopRequireDefault(_get);

var _maplibHelper = require('./maplibHelper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var newMaplibLayer = exports.newMaplibLayer = function newMaplibLayer(sourceType, source) {
  var catIds = [999];
  if (source.groupid !== undefined) {
    catIds = source.groupid.toString().split(',').map(function (item) {
      return parseInt(item, 10);
    });
    createNotExistGroup(catIds, source.name, source.namelng);
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

var CapabilitiesUtil = exports.CapabilitiesUtil = function () {
  function CapabilitiesUtil() {
    _classCallCheck(this, CapabilitiesUtil);
  }

  _createClass(CapabilitiesUtil, null, [{
    key: 'parseWmsCapabilities',


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
        var wmsCapabilitiesParser = new _WMSCapabilities2.default();
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
    key: 'getLayersFromWmsCapabilties',
    value: function getLayersFromWmsCapabilties(capabilities) {
      var nameField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Name';

      var wmsVersion = (0, _get2.default)(capabilities, 'version');
      var wmsAttribution = (0, _get2.default)(capabilities, 'Service.AccessConstraints');
      var layersInCapabilities = (0, _get2.default)(capabilities, 'Capability.Layer.Layer');
      var wmsGetMapConfig = (0, _get2.default)(capabilities, 'Capability.Request.GetMap');
      var wmsGetFeatureInfoConfig = (0, _get2.default)(capabilities, 'Capability.Request.GetFeatureInfo');
      var getMapUrl = (0, _get2.default)(wmsGetMapConfig, 'DCPType[0].HTTP.Get.OnlineResource');
      var getFeatureInfoUrl = (0, _get2.default)(wmsGetFeatureInfoConfig, 'DCPType[0].HTTP.Get.OnlineResource');

      return layersInCapabilities.map(function (layerObj) {
        return newMaplibLayer('WMS', {
          type: "map",
          name: (0, _get2.default)(layerObj, nameField),
          url: getMapUrl,
          params: {
            layers: (0, _get2.default)(layerObj, 'Name'),
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
    key: 'parseWmtsCapabilities',
    value: function parseWmtsCapabilities(capabilitiesUrl) {
      return fetch(capabilitiesUrl).then(function (response) {
        return response.text();
      }).then(function (data) {
        var wmtsCapabilitiesParser = new _WMTSCapabilities2.default();
        return wmtsCapabilitiesParser.read(data);
      });
    }
  }]);

  return CapabilitiesUtil;
}();

exports.default = CapabilitiesUtil;
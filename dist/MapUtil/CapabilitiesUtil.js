"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CapabilitiesUtil = exports.newMaplibLayer = void 0;

var _WMSCapabilities = _interopRequireDefault(require("ol/format/WMSCapabilities"));

var _WMTSCapabilities = _interopRequireDefault(require("ol/format/WMTSCapabilities.js"));

var _ImageWMS = _interopRequireDefault(require("ol/source/ImageWMS"));

var _Image = _interopRequireDefault(require("ol/layer/Image"));

var _GeoJSON = _interopRequireDefault(require("ol/format/GeoJSON.js"));

var _layer = require("ol/layer.js");

var _source = require("ol/source.js");

var _Domain = require("./Domain");

var _get = _interopRequireDefault(require("lodash/get.js"));

var _maplibHelper = require("./maplibHelper");

var _MapHelper = require("../Utils/MapHelper");

var _jsonix = require("@boundlessgeo/jsonix");

var _w3cSchemas = require("w3c-schemas");

var _scripts = require("ogc-schemas/scripts/");

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
      featureNS: source.featureNS || '',
      featureType: source.featureType || '',
      coordinate_system: source.epsg || _maplibHelper.mapConfig.coordinate_system,
      extent: _maplibHelper.mapConfig.extent,
      extentUnits: _maplibHelper.mapConfig.extentUnits,
      matrixPrefix: source.matrixprefix === 'true',
      matrixSet: source.matrixset,
      numZoomLevels: _maplibHelper.mapConfig.numZoomLevels,
      id: sourceType === 'VECTOR' ? source.name + 8001 : source.name + 1001,
      version: source.version,
      transparent: true,
      layerIndex: -1,
      legendGraphicUrl: source.legendurl || '',
      minScale: source.options.minscale,
      maxScale: source.options.maxscale,
      sortingIndex: -1,
      featureInfo: {
        supportsGetFeatureInfo: source.options.queryable,
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
    abstract: source.abstract,
    label: source.name,
    value: source.name
  });
  return newIsyLayer;
};

exports.newMaplibLayer = newMaplibLayer;
var context_wfs_2_0_0 = new _jsonix.Jsonix.Context([_w3cSchemas.XLink_1_0, _scripts.OWS_1_1_0, _scripts.GML_2_1_2, _scripts.Filter_2_0, _scripts.WFS_2_0]);
var unmarshaller_wfs_2_0_0 = context_wfs_2_0_0.createUnmarshaller();
var context_wfs_1_1_0 = new _jsonix.Jsonix.Context([_w3cSchemas.XLink_1_0, _scripts.OWS_1_0_0, _scripts.OWS_1_1_0, _scripts.Filter_1_1_0, _scripts.GML_2_1_2, _scripts.GML_3_1_1, _scripts.SMIL_2_0, _scripts.SMIL_2_0_Language, _scripts.WFS_1_1_0]);
var unmarshaller_wfs_1_1_0 = context_wfs_1_1_0.createUnmarshaller();
/**
 * Helper class to parse capabilities of WMS layers
 *
 * @class CapabilitiesUtil
 */

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
      var newUrl = (0, _MapHelper.mergeDefaultParams)(capabilitiesUrl, {
        service: "WMS",
        request: "GetCapabilities"
      });
      return fetch(newUrl).then(function (response) {
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
          type: 'map',
          name: (0, _get.default)(layerObj, nameField) || (0, _get.default)(layerObj, 'Title'),
          abstract: (0, _get.default)(layerObj, 'Abstract'),
          url: getMapUrl,
          legendurl: (0, _get.default)(layerObj, 'Style[0].LegendURL[0].OnlineResource'),
          params: {
            layers: (0, _get.default)(layerObj, 'Name'),
            format: 'image/png',
            'VERSION': wmsVersion
          },
          guid: '1.temakart',
          options: {
            isbaselayer: 'false',
            singletile: 'false',
            visibility: 'true',
            maxscale: layerObj.MaxScaleDenominator || '',
            minscale: layerObj.MinScaleDenominator || '',
            queryable: layerObj.queryable
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
      var newUrl = (0, _MapHelper.mergeDefaultParams)(capabilitiesUrl, {
        service: "WMTS",
        request: "GetCapabilities"
      });
      return fetch(newUrl).then(function (response) {
        return response.text();
      }).then(function (data) {
        var wmtsCapabilitiesParser = new _WMTSCapabilities.default();
        return wmtsCapabilitiesParser.read(data);
      });
    }
  }, {
    key: "getLayersFromWfsCapabilties",
    value: function getLayersFromWfsCapabilties(capabilities) {
      var nameField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name.localPart';
      var version = '1.1.0'; //get(capabilities, 'value.version');

      var featureTypesInCapabilities = (0, _get.default)(capabilities, 'value.featureTypeList.featureType');
      var url = (0, _get.default)(capabilities, 'value.operationsMetadata.operation[0].dcp[0].http.getOrPost[0].value.href');
      var featureNS = {};
      return featureTypesInCapabilities.map(function (layerObj) {
        featureNS[layerObj.name.prefix] = layerObj.name.namespaceURI;
        return newMaplibLayer('WFS', {
          type: 'map',
          name: (0, _get.default)(layerObj, nameField),
          url: url,
          version: version,
          params: {
            layers: (0, _get.default)(layerObj, nameField),
            format: 'image/png'
          },
          guid: '1.temakart',
          options: {
            isbaselayer: 'false',
            singletile: 'false',
            visibility: 'true',
            maxscale: layerObj.MaxScaleDenominator || '',
            minscale: layerObj.MinScaleDenominator || ''
          },
          featureNS: featureNS,
          featureType: layerObj.name.prefix + ':' + layerObj.name.localPart
        });
      });
    }
  }, {
    key: "parseWFSCapabilities",
    value: function parseWFSCapabilities(capabilitiesUrl) {
      var newUrl = (0, _MapHelper.mergeDefaultParams)(capabilitiesUrl, {
        service: "WFS",
        request: "GetCapabilities"
      });
      return fetch(newUrl).then(function (response) {
        return response.text();
      }).then(function (data) {
        var parser;
        var xmlDoc;
        var result;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, 'text/xml');
        var version = xmlDoc.getElementsByTagName('WFS_Capabilities')[0].attributes.version.value;

        switch (version) {
          case '1.1.0':
            result = unmarshaller_wfs_1_1_0.unmarshalString(data);
            break;

          case '2.0.0':
            result = unmarshaller_wfs_2_0_0.unmarshalString(data);
            break;

          default:
            console.warn('No matching WFS version parser found.');
        }

        return result;
      });
    }
  }, {
    key: "getGeoJson",
    value: function getGeoJson(url) {
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        data.Name = data.name;
        return data;
      });
    }
  }, {
    key: "getOlLayerFromGeoJson",
    value: function getOlLayerFromGeoJson(layerCapabilities) {
      var vectorSource = new _source.Vector({
        features: new _GeoJSON.default().readFeatures(layerCapabilities, {
          featureProjection: 'EPSG:3857'
        })
      });
      return new _layer.Vector({
        source: vectorSource
      });
    }
  }, {
    key: "getMetaCapabilities",
    value: function getMetaCapabilities(capabilities) {
      var Meta = {};
      var wmsGetMapConfig = (0, _get.default)(capabilities, 'Capability.Request.GetMap');
      Meta.Version = (0, _get.default)(capabilities, 'version');
      Meta.Attributions = (0, _get.default)(capabilities, 'Service.AccessConstraints');
      Meta.MapUrl = (0, _get.default)(wmsGetMapConfig, 'DCPType[0].HTTP.Get.OnlineResource');
      Meta.FeatureInfoConfig = (0, _get.default)(capabilities, 'Capability.Request.GetFeatureInfo');
      Meta.FeatureInfoUrl = (0, _get.default)(Meta.FeatureInfoConfig, 'DCPType[0].HTTP.Get.OnlineResource');
      Meta.LegendUrl = (0, _get.default)(capabilities, 'Capability.Layer.Layer').length > 0 ? (0, _get.default)((0, _get.default)(capabilities, 'Capability.Layer.Layer')[0], 'Style[0].LegendURL[0].OnlineResource') : null;
      return Meta;
    }
    /**
       * Returns an OpenlLayers Layer ready to be added to the map
       *
       * @param {Object} metaCapabilities The generell top capabilities object.
       * @param {Object} layerCapabilities A layer spesific capabilities object.
       * @return {OlLayerTile[]} Array of OlLayerTile
       */

  }, {
    key: "getOlLayerFromWmsCapabilities",
    value: function getOlLayerFromWmsCapabilities(metaCapabilities, layerCapabilities) {
      return new _Image.default({
        opacity: 1,
        title: layerCapabilities.Title,
        name: layerCapabilities.Name,
        abstract: layerCapabilities.Abstract,
        getFeatureInfoUrl: metaCapabilities.FeatureInfoUrl,
        getFeatureInfoFormats: (0, _get.default)(metaCapabilities.FeatureInfoConfig, 'Format'),
        legendUrl: metaCapabilities.LegendUrl,
        queryable: layerCapabilities.queryable,
        source: new _ImageWMS.default({
          url: metaCapabilities.MapUrl,
          attributions: metaCapabilities.Attribution,
          params: {
            'LAYERS': layerCapabilities.Name,
            'VERSION': metaCapabilities.Version
          }
        })
      });
    }
  }]);

  return CapabilitiesUtil;
}();

exports.CapabilitiesUtil = CapabilitiesUtil;
var _default = CapabilitiesUtil;
exports.default = _default;
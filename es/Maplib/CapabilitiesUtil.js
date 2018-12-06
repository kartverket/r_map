function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import OlWMSCapabilities from 'ol/format/WMSCapabilities';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import OlSourceImageWMS from 'ol/source/ImageWMS';
import { Layer } from './Domain';

import get from 'lodash/get.js';
import { createDummyGroup, getWmsUrl, mapConfig } from './maplibHelper';
export var newMaplibLayer = function newMaplibLayer(sourceType, source) {
  var catIds = [999];
  if (source.groupid !== undefined) {
    catIds = source.groupid.toString().split(',').map(function (item) {
      return parseInt(item, 10);
    });
    createNotExistGroup(catIds, source.name, source.namelng);
  } else {
    if (source.options.isbaselayer === 'false') {
      createDummyGroup();
    }
  }
  var newIsyLayer = new Layer({
    subLayers: [{
      title: source.name,
      name: source.params.layers || source.name,
      providerName: source.params.layers || source.name,
      source: sourceType,
      gatekeeper: source.gatekeeper === 'true',
      url: getWmsUrl(source.url),
      format: source.params.format,
      coordinate_system: source.epsg || mapConfig.coordinate_system,
      extent: mapConfig.extent,
      extentUnits: mapConfig.extentUnits,
      matrixPrefix: source.matrixprefix === 'true',
      matrixSet: source.matrixset,
      numZoomLevels: mapConfig.numZoomLevels,
      id: sourceType === 'VECTOR' ? mapConfig.layers.length + 8001 : mapConfig.layers.length + 1001,
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
      crossOrigin: null,
      style: source.style,
      wmtsExtent: source.wmtsextent,
      getCapabilities: source.getcapabilities === 'true',
      styles: source.params.styles,
      minResolution: source.minresolution,
      maxResolution: source.maxresolution
    }],
    guid: source.guid,
    name: source.name,
    groupId: catIds,
    visibleOnLoad: source.options.visibility === 'true',
    id: sourceType === 'VECTOR' ? mapConfig.layers.length + 8001 : mapConfig.layers.length + 1001,
    isBaseLayer: source.options.isbaselayer === 'true',
    previewActive: false,
    opacity: 1,
    mapLayerIndex: -1,
    legendGraphicUrls: [],
    selectedLayerOpen: false,
    thumbnail: source.thumbnail
  });
  return newIsyLayer;
};

/**
 * Helper class to parse capabilities of WMS layers
 *
 * @class CapabilitiesUtil
 */
export var CapabilitiesUtil = function () {
  function CapabilitiesUtil() {
    _classCallCheck(this, CapabilitiesUtil);
  }

  /**
   * Parses the given WMS Capabilities string.
   *
   * @param {string} capabilitiesUrl Url to WMS capabilities document
   * @return {Object} An object representing the WMS capabilities.
   */
  CapabilitiesUtil.parseWmsCapabilities = function parseWmsCapabilities(capabilitiesUrl) {
    return fetch(capabilitiesUrl).then(function (response) {
      return response.text();
    }).then(function (data) {
      var wmsCapabilitiesParser = new OlWMSCapabilities();
      return wmsCapabilitiesParser.read(data);
    });
  };

  /**
   * Returns the layers from a parsed WMS GetCapabilities object.
   *
   * @param {Object} capabilities A capabilities object.
   * @param {string} nameField Configure the field which should be set as the
   *                           'name' property in the openlayers layer.
   * @return {OlLayerTile[]} Array of OlLayerTile
   */


  CapabilitiesUtil.getLayersFromWmsCapabilties = function getLayersFromWmsCapabilties(capabilities) {
    var nameField = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Name';

    var wmsVersion = get(capabilities, 'version');
    var wmsAttribution = get(capabilities, 'Service.AccessConstraints');
    var layersInCapabilities = get(capabilities, 'Capability.Layer.Layer');
    var wmsGetMapConfig = get(capabilities, 'Capability.Request.GetMap');
    var wmsGetFeatureInfoConfig = get(capabilities, 'Capability.Request.GetFeatureInfo');
    var getMapUrl = get(wmsGetMapConfig, 'DCPType[0].HTTP.Get.OnlineResource');
    var getFeatureInfoUrl = get(wmsGetFeatureInfoConfig, 'DCPType[0].HTTP.Get.OnlineResource');

    return layersInCapabilities.map(function (layerObj) {
      return newMaplibLayer('WMS', {
        type: "map",
        name: get(layerObj, nameField),
        url: getMapUrl,
        params: {
          layers: get(layerObj, 'Name'),
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
  };
  /**
  * Parses the given WMTS Capabilities string.
  *
  * @param {string} capabilitiesUrl Url to WMTS capabilities document
  * @return {Object} An object representing the WMTS capabilities.
  */


  CapabilitiesUtil.parseWmtsCapabilities = function parseWmtsCapabilities(capabilitiesUrl) {
    return fetch(capabilitiesUrl).then(function (response) {
      return response.text();
    }).then(function (data) {
      var wmtsCapabilitiesParser = new WMTSCapabilities();
      return wmtsCapabilitiesParser.read(data);
    });
  };

  return CapabilitiesUtil;
}();

export default CapabilitiesUtil;
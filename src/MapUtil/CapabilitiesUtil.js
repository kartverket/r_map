import OlWMSCapabilities from 'ol/format/WMSCapabilities';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import {
  Layer
} from './Domain'

import get from 'lodash/get.js';
import {
  createDummyGroup,
  getWmsUrl,
  mapConfig,
  createNotExistGroup
} from './maplibHelper'

import {
  Jsonix
} from '@boundlessgeo/jsonix'
import {
  XLink_1_0
} from 'w3c-schemas'
import {
  OWS_1_1_0,
  OWS_1_0_0,
  Filter_1_1_0,
  Filter_2_0,
  GML_2_1_2,
  GML_3_1_1,
  SMIL_2_0,
  SMIL_2_0_Language,
  WFS_1_1_0,
  WFS_2_0
} from 'ogc-schemas'

export const newMaplibLayer = (sourceType, source) => {
  let catIds = [999]
  if (source.groupid !== undefined) {
    catIds = source.groupid.toString().split(',').map((item) => {
      return parseInt(item, 10)
    })
    createNotExistGroup(catIds, source.name, source.namelng)
  } else {
    if (source.options.isbaselayer === 'false') {
      createDummyGroup()
    }
  }
  const newIsyLayer = new Layer({
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
      getCapabilities: (source.getcapabilities === 'true'),
      styles: source.params.styles,
      minResolution: source.minresolution,
      maxResolution: source.maxresolution || 21664
    }],
    guid: source.guid,
    name: source.name,
    groupId: catIds,
    visibleOnLoad: (source.options.visibility === 'true'),
    id: sourceType === 'VECTOR' ? source.name + 8001 : source.name + 1001,
    isBaseLayer: (source.options.isbaselayer === 'true'),
    previewActive: false,
    opacity: 1,
    mapLayerIndex: -1,
    legendGraphicUrls: [],
    selectedLayerOpen: false,
    thumbnail: source.thumbnail,
    label: source.name,
    value: source.name
  })
  return newIsyLayer
}

var context_wfs_2_0_0 = new Jsonix.Context([XLink_1_0, OWS_1_1_0, GML_2_1_2, Filter_2_0, WFS_2_0]);
var unmarshaller_wfs_2_0_0 = context_wfs_2_0_0.createUnmarshaller();

var context_wfs_1_1_0 = new Jsonix.Context([XLink_1_0, OWS_1_0_0, OWS_1_1_0, Filter_1_1_0, GML_2_1_2, GML_3_1_1, SMIL_2_0, SMIL_2_0_Language, WFS_1_1_0]);
var unmarshaller_wfs_1_1_0 = context_wfs_1_1_0.createUnmarshaller();

/**
 * Helper class to parse capabilities of WMS layers
 *
 * @class CapabilitiesUtil
 */
export class CapabilitiesUtil {

  /**
   * Parses the given WMS Capabilities string.
   *
   * @param {string} capabilitiesUrl Url to WMS capabilities document
   * @return {Object} An object representing the WMS capabilities.
   */
  static parseWmsCapabilities(capabilitiesUrl) {
    return fetch(capabilitiesUrl)
      .then((response) => response.text())
      .then((data) => {
        const wmsCapabilitiesParser = new OlWMSCapabilities();
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
  static getLayersFromWmsCapabilties(capabilities, nameField = 'Name') {
    const wmsVersion = get(capabilities, 'version');
    const layersInCapabilities = get(capabilities, 'Capability.Layer.Layer');
    const wmsGetMapConfig = get(capabilities, 'Capability.Request.GetMap');
    const getMapUrl = get(wmsGetMapConfig, 'DCPType[0].HTTP.Get.OnlineResource');
    return layersInCapabilities.map((layerObj) =>
      newMaplibLayer('WMS', {
        type: "map",
        name: get(layerObj, nameField),
        url: getMapUrl,
        legendurl: get(layerObj, 'Style[0].LegendURL[0].OnlineResource'),
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
      }));
  }
  /**
   * Parses the given WMTS Capabilities string.
   *
   * @param {string} capabilitiesUrl Url to WMTS capabilities document
   * @return {Object} An object representing the WMTS capabilities.
   */
  static parseWmtsCapabilities(capabilitiesUrl) {
    return fetch(capabilitiesUrl)
      .then((response) => response.text())
      .then((data) => {
        const wmtsCapabilitiesParser = new WMTSCapabilities();
        return wmtsCapabilitiesParser.read(data);
      });
  }

  static parseWFSCapabilities(capabilitiesUrl) {
    return fetch(capabilitiesUrl)
      .then((response) => response.text())
      .then((data) => {
        let parser, xmlDoc, result;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, "text/xml");

        let version = xmlDoc.getElementsByTagName("WFS_Capabilities")[0].attributes.version.value;
        switch (version) {
          case '1.1.0':
            result = unmarshaller_wfs_1_1_0.unmarshalString(data);
            break;
          case '2.0.0':
            result = unmarshaller_wfs_2_0_0.unmarshalString(data);
            break;
          default:
            console.warn('No matching WFS version parser found.')
        }
        console.log('WFS : ', result);
        return result
      });

  };


}

export default CapabilitiesUtil;

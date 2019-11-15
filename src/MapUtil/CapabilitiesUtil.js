import OlWMSCapabilities from 'ol/format/WMSCapabilities';
import WMTSCapabilities from 'ol/format/WMTSCapabilities.js';
import OlSourceImageWMS from 'ol/source/ImageWMS';
import OlLayerImage from 'ol/layer/Image';
import {
  GML as GMLFormat,
  WFS as WFSFormat
} from 'ol/format';
import GML2Format from 'ol/format/GML2'
//import GML3Format from 'ol/format/GML3'
import GML32Format from 'ol/format/GML32'

import GeoJSON from 'ol/format/GeoJSON.js';
import { Vector as VectorLayer } from 'ol/layer.js';
import { Vector as VectorSource } from 'ol/source.js';
import { bbox as bboxStrategy } from 'ol/loadingstrategy.js';

import { Layer } from './Domain';

import get from 'lodash/get.js';
import {
  createDummyGroup,
  getWmsUrl,
  mapConfig,
  createNotExistGroup
} from './maplibHelper';

import { mergeDefaultParams } from '../Utils/MapHelper'
import {
  Jsonix
} from '@boundlessgeo/jsonix';
import {
  XLink_1_0
} from 'w3c-schemas';
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
} from 'ogc-schemas/scripts/';

export const newMaplibLayer = (sourceType, source) => {
  let catIds = [999];
  if (source.groupid !== undefined) {
    catIds = source.groupid.toString().split(',').map((item) => parseInt(item, 10));
    createNotExistGroup(catIds, source.name, source.namelng);
  } else {
    if (source.options.isbaselayer === 'false') {
      createDummyGroup();
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
      featureNS: source.featureNS || '',
      featureType: source.featureType || '',
      coordinate_system: source.epsg || mapConfig.coordinate_system,
      extent: mapConfig.extent,
      extentUnits: mapConfig.extentUnits,
      matrixPrefix: source.matrixprefix === 'true',
      matrixSet: source.matrixset,
      numZoomLevels: mapConfig.numZoomLevels,
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
    abstract: source.abstract,
    label: source.name,
    value: source.name
  });
  return newIsyLayer;
};

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
    const newUrl = mergeDefaultParams(capabilitiesUrl, {
      service: "WMS",
      request: "GetCapabilities"
    })
    return fetch(newUrl)
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
        type: 'map',
        name: get(layerObj, nameField) || get(layerObj, 'Title'),
        abstract: get(layerObj, 'Abstract'),
        url: getMapUrl,
        legendurl: get(layerObj, 'Style[0].LegendURL[0].OnlineResource'),
        params: {
          layers: get(layerObj, 'Name'),
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
      }));
  }
  /**
   * Parses the given WMTS Capabilities string.
   *
   * @param {string} capabilitiesUrl Url to WMTS capabilities document
   * @return {Object} An object representing the WMTS capabilities.
   */
  static parseWmtsCapabilities(capabilitiesUrl) {
    const newUrl = mergeDefaultParams(capabilitiesUrl, {
      service: "WMTS",
      request: "GetCapabilities"
    })
    return fetch(newUrl)
      .then((response) => response.text())
      .then((data) => {
        const wmtsCapabilitiesParser = new WMTSCapabilities();
        return wmtsCapabilitiesParser.read(data);
      });
  }
  static getLayersFromWfsCapabilties(capabilities, nameField = 'name.localPart') {
    const version = '1.1.0'; //get(capabilities, 'value.version');
    const featureTypesInCapabilities = get(capabilities, 'value.featureTypeList.featureType');
    const url = get(capabilities, 'value.operationsMetadata.operation[0].dcp[0].http.getOrPost[0].value.href');
    let featureNS = {};
    return featureTypesInCapabilities.map((layerObj) => {
      featureNS[layerObj.name.prefix] = layerObj.name.namespaceURI;
      return newMaplibLayer('WFS', {
        type: 'map',
        name: get(layerObj, nameField),
        url: url,
        version: version,
        params: {
          layers: get(layerObj, nameField),
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

  static getOlLayerFromWFS(metaCapabilities, capabilities, nameField = 'name.localPart') {
    const version = '1.1.0' //get(metaCapabilities, 'Version')
    let url = get(metaCapabilities, 'MapUrl')
    const projection = window.olMap.getView().getProjection()

    const parseResponse = (response) => {
      response = new DOMParser().parseFromString(response, "text/xml")

      if (typeof vectorSource.format === 'undefined') {
        let gmlFormat;
        switch (version) {
          case '1.0.0':
            gmlFormat = new GML2Format()
            break
          case '1.1.0':
            gmlFormat = new GML32Format()
            break
          case '2.0.0':
            gmlFormat = new GML32Format()
            break
          default:
            gmlFormat = new GMLFormat()
            break
        }

        let featureNS = '' // capabilities.featureNS || response.firstChild.namespaceURI || 'http://www.opengis.net/gml/3.2'
        vectorSource.format = new WFSFormat({
          featureNS: featureNS,
          featureTypes: [capabilities.name.prefix + ':' + capabilities.name.localPart],
          gmlFormat: gmlFormat
        })
      }

      let features = vectorSource.format.readFeatures(response)

      if (features && features.length > 0) {
        features.forEach(function (featureitem) {
          console.log(featureitem)
        });
        vectorSource.addFeatures(features);
        console.log(features[0].getGeometryName())
      }

      return features
    }

    const loader = (extent) => {
      url = mergeDefaultParams(url, {
        service: "WFS",
        request: "GetFeature",
        version: version,
        typename: capabilities.Name,
        srsname: projection.getCode(),
        bbox: extent.join(',') + ',' + projection.getCode(),
        outputFormat: 'text/xml; subtype=gml/3.2.1'
      })
      return fetch(url)
        .then((response) => response.text())
        .then(response => {
          if (typeof response === 'object') {
            if (response.firstChild.childElementCount === 0) {
              return
            }
          } else {
            return parseResponse(response)
          }
        })
    }

    var vectorSource = new VectorSource({
      loader: loader,
      strategy: bboxStrategy,
      projection: projection
    })

    window.olMap.on('click', function (event) {
      var features = window.olMap.getFeaturesAtPixel(event.pixel);
      if (!features) {
        return
      }
      var feature = features[0]
      console.log(feature.getProperties())
    })

    return new VectorLayer({
      source: vectorSource
    })
  }

  static parseWFSCapabilities(capabilitiesUrl) {
    const newUrl = mergeDefaultParams(capabilitiesUrl, {
      service: "WFS",
      request: "GetCapabilities"
    })
    return fetch(newUrl)
      .then((response) => response.text())
      .then((data) => {
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(data, 'text/xml')
        let result;
        let version = xmlDoc.getElementsByTagName('WFS_Capabilities')[0].attributes.version.value;
        switch (version) {
          case '1.1.0':
            result = unmarshaller_wfs_1_1_0.unmarshalString(data)
            break;
          case '2.0.0':
            result = unmarshaller_wfs_2_0_0.unmarshalString(data)
            break;
          default:
            console.warn('No matching WFS version parser found.')
        }
        return result
      })
  }
  static getGeoJson(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.Name = data.name
        return data
      })
  }
  static getOlLayerFromGeoJson(layerCapabilities) {
    const vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(layerCapabilities, {
        featureProjection: 'EPSG:3857'
      })
    })
    return new VectorLayer({
      source: vectorSource,
    });
  }
  static getWMSMetaCapabilities(capabilities) {
    let Meta = {}
    const wmsGetMapConfig = get(capabilities, 'Capability.Request.GetMap')
    Meta.Version = get(capabilities, 'version')
    Meta.Attributions = get(capabilities, 'Service.AccessConstraints')
    Meta.MapUrl = get(wmsGetMapConfig, 'DCPType[0].HTTP.Get.OnlineResource')
    Meta.FeatureInfoConfig = get(capabilities, 'Capability.Request.GetFeatureInfo')
    Meta.FeatureInfoUrl = get(Meta.FeatureInfoConfig, 'DCPType[0].HTTP.Get.OnlineResource')
    Meta.LegendUrl = get(capabilities, 'Capability.Layer.Layer') ? (get(capabilities, 'Capability.Layer.Layer').length > 0 ? get(get(capabilities, 'Capability.Layer.Layer')[0], 'Style[0].LegendURL[0].OnlineResource') : null) : null

    return Meta
  }
  static getWFSMetaCapabilities(capabilities) {
    let Meta = {}
    Meta.Version = get(capabilities, 'value.version')
    Meta.Attributions = get(capabilities, 'Service.AccessConstraints')
    Meta.MapUrl = get(capabilities, 'value.operationsMetadata.operation[0].dcp[0].http.getOrPost[0].value.href')

    return Meta
  }
  /**
     * Returns an OpenlLayers Layer ready to be added to the map
     *
     * @param {Object} metaCapabilities The generell top capabilities object.
     * @param {Object} layerCapabilities A layer spesific capabilities object.
     * @return {OlLayerTile[]} Array of OlLayerTile
     */
  static getOlLayerFromWmsCapabilities(metaCapabilities, layerCapabilities) {
    let params = metaCapabilities.Params || {}
    params['LAYERS'] = layerCapabilities.Name
    params['VERSION'] = metaCapabilities.Version
    return new OlLayerImage({
      opacity: 1,
      title: layerCapabilities.Title,
      name: layerCapabilities.Name,
      abstract: layerCapabilities.Abstract,
      getFeatureInfoUrl: metaCapabilities.FeatureInfoUrl,
      getFeatureInfoFormats: get(metaCapabilities.FeatureInfoConfig, 'Format'),
      legendUrl: metaCapabilities.LegendUrl,
      queryable: layerCapabilities.queryable,
      source: new OlSourceImageWMS({
        url: metaCapabilities.MapUrl,
        attributions: metaCapabilities.Attribution,
        params: params
      })
    })
  }
}

export default CapabilitiesUtil;

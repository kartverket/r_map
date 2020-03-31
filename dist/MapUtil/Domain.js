"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Layer = exports.FORMATS = exports.SOURCES = exports.SubLayer = exports.LegendGraphic = exports.FeatureInfo = void 0;

var _Utils = _interopRequireDefault(require("./Utils"));

var _MapHelper = require("../Utils/MapHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FeatureInfo = config => {
  var defaults = {
    // single select via WMS GetFeatureInfo
    supportsGetFeatureInfo: true,
    getFeatureInfoFormat: 'application/json',
    getFeatureInfoCrs: '',
    // multi select via WFS GetFeature
    supportsGetFeature: true,
    getFeatureBaseUrl: '',
    getFeatureFormat: 'application/json',
    getFeatureCrs: 'EPSG:4326'
  };
  return Object.assign({}, defaults, config);
};

exports.FeatureInfo = FeatureInfo;

const LegendGraphic = config => {
  if (config.url === '' || config.url === '?') {
    return null;
  }

  const defaults = {
    width: '20',
    height: '20',
    format: 'image/png',
    request: 'GetLegendGraphic',
    version: '1.0.0',
    service: 'wms',
    layer: ''
  };
  return (0, _MapHelper.mergeDefaultParams)(config.url, defaults);
};

exports.LegendGraphic = LegendGraphic;

const SubLayer = config => {
  const id = _Utils.default.newGuid();

  const defaults = {
    name: '',
    providerName: '',
    //f.eks Fiskeridirektoratet
    source: SOURCES.wmts,
    url: '',
    format: FORMATS.imagepng,
    coordinate_system: '',
    srs_dimension: '',
    matrixSet: '',
    extent: [-1, 1, -1, 1],
    extentUnits: 'm',
    id: id,
    transparent: true,
    layerIndex: -1,
    legendGraphicUrl: '',
    Origin: 'anonymous',
    featureInfoTitle: '',
    tooltipTemplate: '',
    showDialog: true,
    openNewWindow: false,
    openParentWindow: false,
    windowWidth: 500,
    featureInfoElement: [],
    editable: false,
    featureInfo: FeatureInfo(),
    featureNS: '',
    geometryName: 'geometry'
  };
  let instance = Object.assign({}, defaults, config); // subLayerInstance

  if (instance.legendGraphicUrl.indexOf('?') === -1) {
    instance.legendGraphicUrl += '?';
  }

  if (instance.legendGraphicUrl !== '') {
    instance.legendGraphicUrl = LegendGraphic({
      url: instance.legendGraphicUrl,
      layer: instance.name
    });
    ;
  }

  return instance;
};

exports.SubLayer = SubLayer;
const SOURCES = {
  wmts: 'WMTS',
  wms: 'WMS',
  vector: 'VECTOR',
  proxyWmts: 'proxyWmts',
  proxyWms: 'proxyWms',
  tms: 'TMS',
  wfs: 'WFS'
};
exports.SOURCES = SOURCES;
const FORMATS = {
  imagepng: 'image/png',
  imagejpeg: 'image/jpeg',
  geoJson: 'application/json'
};
exports.FORMATS = FORMATS;

const Layer = config => {
  const defaults = {
    guid: '',
    subLayers: [],
    name: '',
    categoryId: 0,
    visibleOnLoad: true,
    isVisible: false,
    // Holds current state, will be set to true on factory.Init if VisibleOnLoad = true
    id: _Utils.default.newGuid(),
    isBaseLayer: false,
    previewActive: false,
    opacity: 1,
    mapLayerIndex: -1,
    minResolution: 0,
    maxResolution: 21664,
    legendGraphicUrls: [],
    selectedLayerOpen: false //todo johben temp

  };
  let layerInstance = Object.assign({}, defaults, config);
  let subLayers = [];

  for (let i = 0; i < config.subLayers.length; i++) {
    subLayers.push(SubLayer(config.subLayers[i]));
  }

  layerInstance.subLayers = subLayers;
  return layerInstance;
};

exports.Layer = Layer;
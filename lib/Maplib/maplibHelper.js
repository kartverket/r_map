'use strict';

exports.__esModule = true;
exports.map = exports.mapImplementation = exports.eventHandler = exports.addLayer2 = exports.addLayer = exports.getWmsUrl = exports.createDummyGroup = exports.createGroup = exports.mapConfig = undefined;

var _Repository = require('./Repository');

var _Domain = require('./Domain');

var _EventHandler = require('./EventHandler');

var _OLMap = require('./OLMap');

var _Layers = require('./Layers');

var _Groups = require('./Groups');

var _Categories = require('./Categories');

var _Map = require('./Map');

var groupIds = [];
var notDummyGroup = false;
var config = {
  groups: [],
  coordinate_system: 'EPSG:25833',
  center: [396722, 7197860],
  extent: [-2500000.0, 3500000.0, 3045984.0, 9045984.0],
  zoom: 4,
  mapbackgroundcolor: '#FFFFFF',
  displaycenterepsgcode: 'EPSG:25833',
  displayCenter: '396722,7197864',
  displayprojectionepsgcode: 'EPSG:25833',
  tokenHost: 'https://www.norgeskart.no/ws/gkt.py',
  proxyHost: '/?',
  projectName: 'norgeskart',
  wmts: [{
    type: 'map',
    gatekeeper: 'true',
    name: 'Landkart',
    url: 'https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?',
    params: {
      layers: 'norgeskart_bakgrunn',
      format: 'image/png'
    },
    matrixprefix: 'true',
    guid: '0.norgeskart_bakgrunn',
    options: {
      isbaselayer: 'true',
      singletile: 'false',
      visibility: 'false'
    },
    thumbnail: 'land'
  }, {
    type: 'map',
    gatekeeper: 'true',
    name: 'Gråtone',
    url: 'https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?',
    params: {
      layers: 'norges_grunnkart_graatone',
      format: 'image/png'
    },
    matrixprefix: 'true',
    guid: '0.norges_grunnkart_graatone',
    options: {
      isbaselayer: 'true',
      singletile: 'false',
      visibility: 'true'
    }
  }, {
    type: 'map',
    gatekeeper: 'true',
    name: 'Enkel',
    url: 'https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?',
    params: {
      layers: 'norges_grunnkart',
      format: 'image/png'
    },
    matrixprefix: 'true',
    guid: '0.norges_grunnkart',
    options: {
      isbaselayer: 'true',
      singletile: 'false',
      visibility: 'false'
    }
  }, {
    type: 'map',
    gatekeeper: 'true',
    name: 'Terreng',
    url: 'https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?',
    params: {
      layers: 'terreng_norgeskart',
      format: 'image/png'
    },
    matrixprefix: 'true',
    guid: '0.terreng_norgeskart',
    options: {
      isbaselayer: 'true',
      singletile: 'false',
      visibility: 'false'
    }
  }, {
    type: 'map',
    gatekeeper: 'true',
    name: 'Sjøkart',
    url: 'https://gatekeeper1.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?|https://gatekeeper2.geonorge.no/BaatGatekeeper/gk/gk.cache_wmts?',
    params: {
      layers: 'sjokartraster',
      format: 'image/png'
    },
    matrixprefix: 'true',
    guid: '0.sjokartraster',
    options: {
      isbaselayer: 'true',
      singletile: 'false',
      visibility: 'false'
    }
  }],
  maplayer: [{
    index: 3,
    name: 'fakta',
    groupid: 3
  }, {
    index: 5,
    name: 'tur_og_friluftsruter',
    groupid: 5
  }]
};

var mapConfig = exports.mapConfig = {
  name: 'default config',
  useCategories: true,
  showProgressBar: true,
  showMousePosition: true,
  comment: '',
  numZoomLevels: 18,
  newMaxRes: 21664,
  extentUnits: 'm',
  proxyHost: '',
  searchHost: '',
  searchpointzoom: 12,
  languages: {
    no: {},
    en: {}
  },
  layers: [],
  hoverOptions: {
    multiSelect: true,
    mmultiSelect: false
  },
  onlyOneGroup: false,
  isOffline: false
};
exports.mapConfig = mapConfig = Object.assign({}, mapConfig, config);
var createGroup = exports.createGroup = function createGroup(groupId, groupNameLng1, groupNameLng2, visibleOnLoad) {
  var newGroup = new _Repository.Category({
    groupId: groupId,
    name: groupNameLng1,
    parentId: groupNameLng2,
    visibleOnLoad: visibleOnLoad
  });
  groupIds.push(groupId);
  mapConfig.groups.push(newGroup);
  mapConfig.languages.en[newGroup.groupId] = groupNameLng1; // has to be fix with correct value!
  mapConfig.languages.no[newGroup.groupId] = groupNameLng2;
};
var updateMapConfigWithGroups = function updateMapConfigWithGroups(mapConfig) {
  if (mapConfig.maplayer !== undefined) {
    if (mapConfig.maplayer.length !== undefined) {
      mapConfig.maplayer.forEach(function (group) {
        createGroup(group.groupid, group.name, group.namelng, group.display);
      });
    } else {
      createGroup(mapConfig.maplayer.groupid, mapConfig.maplayer.name, mapConfig.maplayer.namelng, mapConfig.maplayer.display);
    }
  }
};
var findGroupExistance = function findGroupExistance(grpIds) {
  var notExistGroups = [];
  grpIds.forEach(function (grpId) {
    if (groupIds.indexOf(grpId) === -1) {
      notExistGroups.push(grpId);
    }
  });
  return notExistGroups;
};
var createNotExistGroup = function createNotExistGroup(grpIds, groupNameLng1, groupNameLng2) {
  var notExistGroups = findGroupExistance(grpIds);
  notExistGroups.forEach(function (grpId) {
    createGroup(grpId, groupNameLng1, groupNameLng2);
  });
};
var createDummyGroup = exports.createDummyGroup = function createDummyGroup() {
  // dummy category for layers without group id
  if (notDummyGroup === false) {
    createGroup(999, 'Other layers', 'Andre lag');
    notDummyGroup = true;
  }
};
var getWmsUrl = exports.getWmsUrl = function getWmsUrl(url) {
  if (url.indexOf('|')) {
    return url.split('|');
  } else {
    return url;
  }
};
var addLayer = exports.addLayer = function addLayer(sourceType, source) {
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
  var newIsyLayer = new _Domain.Layer({
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
  mapConfig.layers.push(newIsyLayer);
  mapConfig.languages.en[newIsyLayer.id] = source.name;
  mapConfig.languages.no[newIsyLayer.id] = source.namelng;
};
var addLayer2 = exports.addLayer2 = function addLayer2(sourceType, source) {
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
  var newIsyLayer = new _Domain.Layer({
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
      legendGraphicUrl: source.legendurl,
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
var updateMapConfigWithImageLayers = function updateMapConfigWithImageLayers(mapConfig) {
  if (mapConfig.wmts !== undefined) {
    if (mapConfig.wmts.length !== undefined) {
      mapConfig.wmts.forEach(function (wmts) {
        addLayer('WMTS', wmts);
      });
    } else {
      addLayer('WMTS', mapConfig.wmts);
    }
  }
  if (mapConfig.wms !== undefined) {
    if (mapConfig.wms.length !== undefined) {
      mapConfig.wms.forEach(function (wms) {
        addLayer('WMS', wms);
      });
    } else {
      addLayer('WMS', mapConfig.wms);
    }
  }
  if (mapConfig.vector !== undefined) {
    if (mapConfig.vector.length !== undefined) {
      mapConfig.vector.forEach(function (vector) {
        addLayer('VECTOR', vector);
      });
    } else {
      addLayer('VECTOR', mapConfig.vector);
    }
  }
};
updateMapConfigWithGroups(mapConfig);
updateMapConfigWithImageLayers(mapConfig);
exports.mapConfig = mapConfig = new _Repository.MapConfig(mapConfig);
mapConfig.instance = 'geoportal';
mapConfig.proxyHost = '/?';

var eventHandler = exports.eventHandler = new _EventHandler.EventHandler();
var mapImplementation = exports.mapImplementation = new _OLMap.OLMap(null, eventHandler);
var layerHandler = new _Layers.Layers(mapImplementation);
var groupHandler = new _Groups.Groups();
var categoryHandler = new _Categories.Categories();
var map = exports.map = new _Map.Map(mapImplementation, eventHandler, null, layerHandler, groupHandler, categoryHandler);
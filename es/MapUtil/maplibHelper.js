var _mapConfig;

import { Category, MapConfig } from './Repository';

import { Layer } from './Domain';
import { EventHandler } from './EventHandler';
import { OLMap } from './OLMap';
import Layers from './Layers';
import Groups from './Groups';
import { Map } from './Map';

var groupIds = [];
var notDummyGroup = false;
export var mapConfig = (_mapConfig = {
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
  }],
  mapbounds: {
    mapbound: [{
      epsg: "EPSG:23031",
      extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
    }, {
      epsg: "EPSG:23032",
      extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
    }, {
      epsg: "EPSG:23033",
      extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
    }, {
      epsg: "EPSG:23034",
      extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
    }, {
      epsg: "EPSG:23035",
      extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
    }, {
      epsg: "EPSG:23036",
      extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
    }, {
      epsg: "EPSG:25831",
      extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
    }, {
      epsg: "EPSG:25832",
      extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
    }, {
      epsg: "EPSG:25833",
      extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
    }, {
      epsg: "EPSG:25834",
      extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
    }, {
      epsg: "EPSG:25835",
      extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
    }, {
      epsg: "EPSG:25836",
      extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
    }, {
      epsg: "EPSG:32631",
      extent: "-1500000.0, 3500000.0, 4045984.0, 9045984.0"
    }, {
      epsg: "EPSG:32632",
      extent: "-2000000.0, 3500000.0, 3545984.0, 9045984.0"
    }, {
      epsg: "EPSG:25833",
      extent: "-2500000.0, 3500000.0, 3045984.0, 9045984.0"
    }, {
      epsg: "EPSG:32634",
      extent: "-3000000.0, 3500000.0, 2545984.0, 9045984.0"
    }, {
      epsg: "EPSG:32635",
      extent: "-3500000.0, 3500000.0, 2045984.0, 9045984.0"
    }, {
      epsg: "EPSG:32636",
      extent: "-4000000.0, 3500000.0, 1545984.0, 9045984.0"
    }, {
      epsg: "EPSG:4326",
      extent: "-180, -90, 180, 90"
    }, {
      epsg: "EPSG:3857",
      extent: "-20037508.34, -20037508.34, 20037508.34, 20037508.34"
    }, {
      epsg: "EPSG:900913",
      extent: "-20037508.34, -20037508.34, 20037508.34, 20037508.34"
    }, {
      epsg: "EPSG:54009",
      extent: "-18000000.0, -9000000.0, 18000000.0, 9000000.0"
    }, {
      epsg: "EPSG:3006",
      extent: "-1200000.0, 4700000.0, 2600000.0, 8500000.0"
    }]
  },
  name: 'default config',
  useCategories: true,
  showProgressBar: true,
  showMousePosition: true,
  comment: '',
  numZoomLevels: 18,
  newMaxRes: 21664,
  extentUnits: 'm'
}, _mapConfig['proxyHost'] = '', _mapConfig.searchHost = '', _mapConfig.searchpointzoom = 12, _mapConfig.languages = {
  no: {},
  en: {}
}, _mapConfig.layers = [], _mapConfig.hoverOptions = {
  multiSelect: true,
  mmultiSelect: false
}, _mapConfig.onlyOneGroup = false, _mapConfig.isOffline = false, _mapConfig);

export var createGroup = function createGroup(groupId, groupNameLng1, groupNameLng2, visibleOnLoad) {
  var newGroup = new Category({
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
export var createDummyGroup = function createDummyGroup() {
  // dummy category for layers without group id
  if (notDummyGroup === false) {
    createGroup(999, 'Other layers', 'Andre lag');
    notDummyGroup = true;
  }
};
export var getWmsUrl = function getWmsUrl(url) {
  if (url.indexOf('|')) {
    return url.split('|');
  } else {
    return url;
  }
};
export var addLayer = function addLayer(sourceType, source) {
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

var addLayerToConfig = function addLayerToConfig(newIsyLayer, source) {
  mapConfig.layers.push(newIsyLayer);
  mapConfig.languages.en[newIsyLayer.id] = source.name;
  mapConfig.languages.no[newIsyLayer.id] = source.namelng;
};
var updateMapConfigWithImageLayers = function updateMapConfigWithImageLayers(mapConfig) {
  if (mapConfig.wmts !== undefined) {
    if (mapConfig.wmts.length !== undefined) {
      mapConfig.wmts.forEach(function (wmts) {
        addLayerToConfig(addLayer('WMTS', wmts), wmts);
      });
    } else {
      addLayerToConfig(addLayer('WMTS', mapConfig.wmts), mapConfig.wmts);
    }
  }
  if (mapConfig.wms !== undefined) {
    if (mapConfig.wms.length !== undefined) {
      mapConfig.wms.forEach(function (wms) {
        addLayerToConfig(addLayer('WMS', wms), wms);
      });
    } else {
      addLayerToConfig(addLayer('WMS', mapConfig.wms), mapConfig.wms);
    }
  }
  if (mapConfig.vector !== undefined) {
    if (mapConfig.vector.length !== undefined) {
      mapConfig.vector.forEach(function (vector) {
        addLayerToConfig(addLayer('VECTOR', vector), vector);
      });
    } else {
      addLayerToConfig(addLayer('VECTOR', mapConfig.vector), mapConfig.vector);
    }
  }
};
updateMapConfigWithGroups(mapConfig);
updateMapConfigWithImageLayers(mapConfig);
mapConfig = new MapConfig(mapConfig);
mapConfig.instance = 'geoportal';
mapConfig.proxyHost = '/?';

export var eventHandler = new EventHandler();
export var mapImplementation = new OLMap(null, eventHandler);
export var map = new Map(mapImplementation, eventHandler, null);
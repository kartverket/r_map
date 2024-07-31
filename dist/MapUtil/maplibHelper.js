"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapImplementation = exports.mapConfig = exports.map = exports.getWmsUrl = exports.eventHandler = exports.createNotExistGroup = exports.createGroup = exports.createDummyGroup = exports.addLayer = void 0;
var _Repository = require("./Repository");
var _Domain = require("./Domain");
var _EventHandler = require("./EventHandler");
var _OLMap = require("./OLMap");
var _Map = require("./Map");
var _communication = require("../Utils/communication");
let groupIds = [];
let notDummyGroup = false;
let mapConfig = {
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
  projectName: 'norgeskart',
  basemap: {
    url: 'https://cache.kartverket.no/europa_forenklet/v1/wmts/1.0.0/',
    layers: 'europa_forenklet',
    format: 'image/png',
    matrixprefix: false,
    matrixSet: "utm33n"
  },
  wmts: [{
    type: 'map',
    gatekeeper: 'true',
    name: 'Landkart',
    url: 'https://cache.kartverket.no/topo/v1/wmts/1.0.0/|https://cache.kartverket.no/topo/v1/wmts/1.0.0/',
    params: {
      layers: 'topo',
      format: 'image/png'
    },
    matrixprefix: "false",
    matrixset: "utm33n",
    guid: '0.topo',
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
    url: 'https://cache.kartverket.no/topograatone/v1/wmts/1.0.0/|https://cache.kartverket.no/topograatone/v1/wmts/1.0.0/',
    params: {
      layers: 'topograatone',
      format: 'image/png'
    },
    matrixprefix: "false",
    matrixset: "utm33n",
    guid: '0.topograatone',
    options: {
      isbaselayer: 'true',
      singletile: 'false',
      visibility: 'true'
    }
  }, {
    type: 'map',
    gatekeeper: 'true',
    name: 'Enkel',
    url: 'https://cache.kartverket.no/norges_grunnkart/v1/wmts/1.0.0/|https://cache.kartverket.no/norges_grunnkart/v1/wmts/1.0.0/',
    params: {
      layers: 'norges_grunnkart',
      format: 'image/png'
    },
    matrixprefix: "false",
    matrixset: "utm33n",
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
    url: 'https://cache.kartverket.no/terreng_norgeskart/v1/wmts/1.0.0/|https://cache.kartverket.no/terreng_norgeskart/v1/wmts/1.0.0/',
    params: {
      layers: 'terreng_norgeskart',
      format: 'image/png'
    },
    matrixprefix: "false",
    matrixset: "utm33n",
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
    url: 'https://cache.kartverket.no/sjokartraster/v1/wmts/1.0.0/|https://cache.kartverket.no/sjokartraster/v1/wmts/1.0.0/',
    params: {
      layers: 'sjokartraster',
      format: 'image/png'
    },
    matrixprefix: "false",
    matrixset: "utm33n",
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
exports.mapConfig = mapConfig;
const createGroup = (groupId, groupNameLng1, groupNameLng2, visibleOnLoad) => {
  var newGroup = (0, _Repository.Category)({
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
exports.createGroup = createGroup;
const updateMapConfigWithGroups = mapConfig => {
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
const findGroupExistance = grpIds => {
  let notExistGroups = [];
  grpIds.forEach(grpId => {
    if (groupIds.indexOf(grpId) === -1) {
      notExistGroups.push(grpId);
    }
  });
  return notExistGroups;
};
const createNotExistGroup = (grpIds, groupNameLng1, groupNameLng2) => {
  let notExistGroups = findGroupExistance(grpIds);
  notExistGroups.forEach(grpId => {
    createGroup(grpId, groupNameLng1, groupNameLng2);
  });
};
exports.createNotExistGroup = createNotExistGroup;
const createDummyGroup = () => {
  // dummy category for layers without group id
  if (notDummyGroup === false) {
    createGroup(999, 'Other layers', 'Andre lag');
    notDummyGroup = true;
  }
};
exports.createDummyGroup = createDummyGroup;
const getWmsUrl = url => {
  if (url.indexOf('|') >= 0) {
    return url.split('|');
  } else {
    return url;
  }
};
exports.getWmsUrl = getWmsUrl;
const addLayer = (sourceType, source) => {
  let catIds = [999];
  if (source.groupid !== undefined) {
    catIds = source.groupid.toString().split(',').map(item => {
      return parseInt(item, 10);
    });
    createNotExistGroup(catIds, source.name, source.namelng);
  } else {
    if (source.options.isbaselayer === 'false') {
      createDummyGroup();
    }
  }
  const newIsyLayer = (0, _Domain.Layer)({
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
exports.addLayer = addLayer;
const addLayerToConfig = (newIsyLayer, source) => {
  mapConfig.layers.push(newIsyLayer);
  mapConfig.languages.en[newIsyLayer.id] = source.name;
  mapConfig.languages.no[newIsyLayer.id] = source.namelng;
};
const updateMapConfigWithImageLayers = mapConfig => {
  if (mapConfig.wmts !== undefined) {
    if (mapConfig.wmts.length !== undefined) {
      mapConfig.wmts.forEach(wmts => {
        addLayerToConfig(addLayer('WMTS', wmts), wmts);
      });
    } else {
      addLayerToConfig(addLayer('WMTS', mapConfig.wmts), mapConfig.wmts);
    }
  }
  if (mapConfig.wms !== undefined) {
    if (mapConfig.wms.length !== undefined) {
      mapConfig.wms.forEach(wms => {
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
exports.mapConfig = mapConfig = (0, _Repository.MapConfig)(mapConfig);
mapConfig.instance = 'geoportal';
mapConfig.proxyHost = '';
const eventHandler = (0, _EventHandler.EventHandler)();
exports.eventHandler = eventHandler;
const mapImplementation = (0, _OLMap.OLMap)(eventHandler);
exports.mapImplementation = mapImplementation;
const map = (0, _Map.Map)(mapImplementation, eventHandler, null);
exports.map = map;
if (window.addEventListener) {
  window.addEventListener("message", _communication.Messaging.listener, false);
} else {
  window.attachEvent("onmessage", _communication.Messaging.listener);
}
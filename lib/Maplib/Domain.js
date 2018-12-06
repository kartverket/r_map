'use strict';

exports.__esModule = true;
exports.Layer = exports.FORMATS = exports.SOURCES = exports.SubLayer = exports.LegendGraphic = exports.FeatureInfo = undefined;

var _Utils = require('./Utils');

var FeatureInfo = exports.FeatureInfo = function FeatureInfo(config) {
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

var LegendGraphic = exports.LegendGraphic = function LegendGraphic(config) {
    var defaults = {
        width: "20",
        height: "20",
        format: "image/png",
        request: "GetLegendGraphic",
        version: "1.0.0",
        service: 'wms',
        layer: '',
        url: ''
    };

    var instance = Object.assign({}, defaults, config);

    function getLegendGraphicUrl() {
        if (instance.url !== "?") {
            return instance.url + "Service=" + instance.service + "&Request=" + instance.request + "&Version=" + instance.version + "&Format=" + instance.format + "&Width=" + instance.width + "&Height=" + instance.height + "&Layer=" + instance.layer;
        } else {
            return "";
        }
    }

    return {
        GetLegendGraphicUrl: getLegendGraphicUrl
    };
};
var SubLayer = exports.SubLayer = function SubLayer(config) {
    var id = new _Utils.Guid().NewGuid();

    var defaults = {
        name: '',
        providerName: '', //f.eks Fiskeridirektoratet
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
        featureInfo: new FeatureInfo(),
        featureNS: '',
        geometryName: 'geometry'
    };
    var instance = Object.assign({}, defaults, config); // subLayerInstance

    if (instance.legendGraphicUrl.indexOf('?') === -1) {
        instance.legendGraphicUrl += '?';
    }
    if (instance.legendGraphicUrl !== '') {
        var legendGraphic = new LegendGraphic({
            url: instance.legendGraphicUrl,
            layer: instance.name
        });
        instance.legendGraphicUrl = legendGraphic.GetLegendGraphicUrl();
    }

    return instance;
};

var SOURCES = exports.SOURCES = {
    wmts: "WMTS",
    wms: "WMS",
    vector: "VECTOR",
    proxyWmts: "proxyWmts",
    proxyWms: "proxyWms",
    tms: "TMS",
    wfs: "WFS"
};

var FORMATS = exports.FORMATS = {
    imagepng: "image/png",
    imagejpeg: "image/jpeg",
    geoJson: "application/json"
};
var Layer = exports.Layer = function Layer(config) {
    var defaults = {
        guid: '',
        subLayers: [],
        name: '',
        categoryId: 0,
        visibleOnLoad: true,
        isVisible: false, // Holds current state, will be set to true on factory.Init if VisibleOnLoad = true
        id: new _Utils.Guid().NewGuid(),
        isBaseLayer: false,
        previewActive: false,
        opacity: 1,
        mapLayerIndex: -1,
        minResolution: 0,
        maxResolution: 21664,
        legendGraphicUrls: [],
        selectedLayerOpen: false //todo johben temp
    };
    var layerInstance = Object.assign({}, defaults, config); // layerInstance

    var subLayers = [];
    for (var i = 0; i < config.subLayers.length; i++) {
        subLayers.push(new SubLayer(config.subLayers[i]));
    }

    layerInstance.subLayers = subLayers;

    return layerInstance;
};
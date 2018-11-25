import Map from 'ol/Map'
import Projection from 'ol/proj/Projection'
import View from 'ol/View'
import {
    defaults as defaultInteractions,
} from 'ol/interaction'
import {
    defaults as defaultControls
} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import {
    GeoJSON as GeoJSONFormat,
    GML as GMLFormat,
    WFS as WFSFormat,
    WMSCapabilities
} from 'ol/format';
import GML2Format from 'ol/format/GML2'
import GML3Format from 'ol/format/GML3'
import style from 'ol/style/Style'
import {
    Tile as TileLayer,
    Vector as VectorLayer,
    Image as ImageLayer
} from 'ol/layer'
import {
    Vector as VectorSource
} from 'ol/source'
import {
    transform,
    transformExtent,
    get as getProjection
} from 'ol/proj.js';
import {
    Zoom,
    ZoomSlider,
    ZoomToExtent,
    ScaleLine
} from 'ol/control'
import {
    Point,
    Circle
} from 'ol/geom.js'
import GeometryCollection from 'ol/geom/GeometryCollection'
import Feature from 'ol/Feature.js'
import {
    getCenter as OLGetCenterFromExtent,
    containsCoordinate
} from 'ol/extent'
import OlGeolocation from 'ol/Geolocation'
import proj4 from 'proj4'

import {
    EventTypes
} from './EventHandler'
import {
    Vector as MaplibVectorSource,
    Wmts as MaplibWMTSSource,
    Wms as MaplibWMSSource,
    MaplibCustomMessageHandler,
    Wfs as MaplibWfsSource
} from './Sources'
import {
    Guid
} from './Utils'
import {
    OLProgressBar
} from './OLProgessBar'
import {
    FORMATS,
    SOURCES
} from './Domain'
import {
    OLStylesJson,
    OLStylesSLD
} from './OLStyles'

import $ from "jquery";

export const OLMap = (repository, eventHandler, httpHelper, measure, featureInfo, mapExport, hoverInfo, measureLine, drawFeature, offline, addLayerFeature, modifyFeature, addFeatureGps, printBoxSelect, addLayerUrl) => {
    var map;
    var layerPool = [];
    var isySubLayerPool = [];
    var sldstyles = [];
    var mapResolutions;
    var mapScales;
    var hoverOptions;
    var initialGeolocationChange = false;

    var proxyHost = "";
    var tokenHost = "";
    var ticketHost = "";
    var gktLifetime = 3000;
    var ticketLifetime = 3000;
    var lastGktCheck = 0;
    var lastTicketCheck = 0;
    var lastGlobalGktCheck = 0;
    var lastGlobalTicketCheck = 0;
    var globalGkt;
    var globalTicket;
    var geolocation;
    var translateOptions;
    var isyToken;

    var describedSubLayer;
    var describedSource;
    var isyLayerGeometryType;

    var customMessageHandler;

    /*
        Start up functions Start
     */

    function initMap(targetId, mapConfig) {
        proxyHost = mapConfig.proxyHost;
        tokenHost = mapConfig.tokenHost;
        ticketHost = mapConfig.ticketHost;
        hoverOptions = mapConfig.hoverOptions;
        var numZoomLevels = mapConfig.numZoomLevels;
        var newMapRes = [];
        newMapRes[0] = mapConfig.newMaxRes;
        mapScales = [];
        mapScales[0] = mapConfig.newMaxScale;
        for (var t = 1; t < numZoomLevels; t++) {
            newMapRes[t] = newMapRes[t - 1] / 2;
            mapScales[t] = mapScales[t - 1] / 2;
        }
        mapResolutions = newMapRes;
        var sm = new Projection({
            code: mapConfig.coordinate_system,
            extent: mapConfig.extent,
            units: mapConfig.extentUnits
        });

        var interactions = defaultInteractions({
            altShiftDragRotate: false,
            pinchRotate: false
        });

        map = new Map({
            target: targetId,
            renderer: mapConfig.renderer,
            layers: [],
            loadTilesWhileAnimating: true, // Improve user experience by loading tiles while animating. Will make animations stutter on mobile or slow devices.
            loadTilesWhileInteracting: true,
            view: new View({
                projection: sm,
                //constrainRotation: 4,
                enableRotation: false,
                center: mapConfig.center,
                zoom: mapConfig.zoom,
                resolutions: newMapRes,
                maxResolution: mapConfig.newMaxRes,
                numZoomLevels: numZoomLevels
            }),
            controls: [],
            overlays: [],
            interactions: interactions
        });
        if (offline) {
            _initOffline();
        }
        _registerMapCallbacks();

        if (mapConfig.showProgressBar) {
            _registerProgressBar();
        }
        if (mapConfig.showMousePosition) {
            _registerMousePositionControl(mapConfig.mouseProjectionPrefix);
        }
        _registerMessageHandler();
    }

    function _registerMapCallbacks() {
        var view = map.getView();

        var changeCenter = function () {
            var mapViewChangedObj = _getUrlObject();
            eventHandler.TriggerEvent(EventTypes.ChangeCenter, mapViewChangedObj);
        };

        var changeResolution = function () {
            var mapViewChangedObj = _getUrlObject();
            eventHandler.TriggerEvent(EventTypes.ChangeResolution, mapViewChangedObj);
        };

        var mapMoveend = function () {
            _checkGktToken();
            _checkTicket();
            var mapViewChangedObj = _getUrlObject();
            eventHandler.TriggerEvent(EventTypes.MapMoveend, mapViewChangedObj);
        };

        view.on('change:center', changeCenter);
        view.on('change:resolution', changeResolution);
        map.on('moveend', mapMoveend);
    }

    function _registerMessageHandler() {
        var layerMessageHandler = new MaplibCustomMessageHandler(eventHandler, _getIsySubLayerFromPool);
        layerMessageHandler.Init(map);

        customMessageHandler = new MaplibCustomMessageHandler();
        customMessageHandler.InitMessage('');
    }

    function _registerProgressBar() {
        var progressBar = new OLProgressBar(eventHandler);
        progressBar.Init(map);
    }

    function _registerMousePositionControl(prefix) {
        var element = document.getElementById('mouseposition');
        if (element) {
            var units = map.getView().getProjection().getUnits();
            var epsg = getEpsgCode();
            if (prefix === undefined) {
                prefix = '';
            }
            var coordinate2string = function (coord) {
                var mousehtml = '' + prefix;
                var geographic = false;
                if (mousehtml.length > 0) {
                    switch (units) {
                        case 'degrees':
                            mousehtml = '';
                            geographic = true;
                            break;
                        case 'm':
                            switch (epsg) {
                                case 'EPSG:25831':
                                case 'EPSG:32631':
                                    mousehtml += '31 ';
                                    break;
                                case 'EPSG:25832':
                                case 'EPSG:32632':
                                    mousehtml += '32 ';
                                    break;
                                case 'EPSG:25833':
                                case 'EPSG:32633':
                                    mousehtml += '33 ';
                                    break;
                                case 'EPSG:25834':
                                case 'EPSG:32634':
                                    mousehtml += '34 ';
                                    break;
                                case 'EPSG:25835':
                                case 'EPSG:32635':
                                    mousehtml += '35 ';
                                    break;
                                case 'EPSG:25836':
                                case 'EPSG:32636':
                                    mousehtml += '36 ';
                                    break;
                                case 'EPSG:25837':
                                case 'EPSG:32637':
                                    mousehtml += '37 ';
                                    break;
                                case 'EPSG:25838':
                                case 'EPSG:32638':
                                    mousehtml += '38 ';
                                    break;
                            }
                            break;
                    }
                }
                if (geographic) {
                    mousehtml += Math.round(coord[1] * 10000) / 10000 + translateOptions['north'] + Math.round(coord[0] * 10000) / 10000 + translateOptions['east'];
                } else {
                    mousehtml += parseInt(coord[1], 10) + translateOptions['north'] + parseInt(coord[0], 10) + translateOptions['east'];
                }
                return mousehtml;
            };
            var mousePositionControl = new MousePosition({
                coordinateFormat: coordinate2string,
                projection: epsg,
                //undefinedHTML: '&nbsp;',
                // comment the following two lines to have the mouse position
                // be placed within the map.
                className: 'mousePosition',
                target: element
            });
            map.addControl(mousePositionControl);
        }
    }

    function _checkGktToken() {
        var currentTime = (new Date()).getTime();
        if (currentTime < (lastGktCheck + 60000)) {
            // check if token has expired each minute
            return;
        }
        lastGktCheck = currentTime;
        if (map.getLayers()) {
            map.getLayers().forEach(function (layer) {
                var source = layer.getSource();
                if (source && source.getParams) {
                    var params = source.getParams();
                    if (params && params.GKT) {
                        //console.log(layer.typename + ' ' + params.GKT);
                        var initTime = source.get("timestamp");
                        if (initTime) {
                            var elapsedTime = Math.round((currentTime - initTime) / 1000);
                            if (elapsedTime > gktLifetime) {
                                _setToken(source);
                            }
                        }
                    }
                }
            });
        }
    }

    function _checkTicket() {
        var currentTime = (new Date()).getTime();
        if (currentTime < (lastTicketCheck + 60000)) {
            // check if token has expired each minute
            return;
        }
        lastTicketCheck = currentTime;
        if (map.getLayers()) {
            map.getLayers().forEach(function (layer) {
                var source = layer.getSource();
                if (source && source.getParams) {
                    var params = source.getParams();
                    if (params && params.ticket) {
                        var initTime = source.get("timestamp");
                        if (initTime) {
                            var elapsedTime = Math.round((currentTime - initTime) / 1000);
                            if (elapsedTime > ticketLifetime) {
                                _setTicket(source);
                            }
                        }
                    }
                }
            });
        }
    }
    // Adds GKT-token to existing source
    function _setToken(source) {
        //console.log(layer.typename + ' - ' + source.get("timestamp") + ' - ' + params.GKT);
        source.updateParams({
            GKT: _getToken()
        });
        source.set("timestamp", (new Date()).getTime());
    }

    function _setTicket(source) {
        source.updateParams({
            ticket: _getTicket()
        });
        source.set("timestamp", (new Date()).getTime());
    }

    function changeView(viewPropertyObject) {
        if (map !== undefined) {
            var view = map.getView();
            var lon, lat, zoom;
            if (viewPropertyObject.lon) {
                lon = viewPropertyObject.lon;
            }
            if (viewPropertyObject.lat) {
                lat = viewPropertyObject.lat;
            }
            if (viewPropertyObject.zoom) {
                zoom = viewPropertyObject.zoom;
            }

            if (lon !== undefined && lat !== undefined) {
                var latitude = typeof (lat) === 'number' ? lat : parseFloat(lat.replace(/,/g, '.'));
                var longitude = typeof (lon) === 'number' ? lon : parseFloat(lon.replace(/,/g, '.'));
                if (isFinite(latitude) && isFinite(longitude)) {
                    view.setCenter([longitude, latitude]);
                }
            }

            if (zoom !== undefined) {
                view.setZoom(zoom);
            }
        }
    }
    /*
        Start up functions End
     */

    /*
        Layer functions Start
        Functionality to be moved to ISY.MapImplementation.OL3.Layers
     */

    function addDataToLayer(isySubLayer, data) {
        var layer = _getLayerFromPool(isySubLayer);
        if (isySubLayer.format === FORMATS.geoJson) {
            var geoJson = JSON.parse(data);
            var geoJsonParser = new GeoJSONFormat();
            var features = geoJsonParser.readFeatures(geoJson);

            //for (var i = 0; i < features.length; ++i) {
            //    if (features[i].getProperties().Guid) {
            //        features[i].setId(features[i].getProperties().Guid);
            //    }
            //}
            if (isySubLayer.id && isySubLayer.name) {
                for (var i = 0; i < features.length; ++i) {
                    if (features[i].getProperties().Guid === undefined) {
                        features[i].setProperties({
                            Guid: new Guid().NewGuid()
                        });
                    }
                    features[i].setId(isySubLayer.name + '.' + features[i].getProperties().Guid);
                }
            }

            layer.getSource().addFeatures(features);
        }
    }

    function removeDataFromLayer(isySubLayer, data) {
        var layer = _getLayerFromPool(isySubLayer);
        if (isySubLayer.format === FORMATS.geoJson) {
            var geoJson = JSON.parse(data);
            var geoJsonParser = new GeoJSONFormat();
            var features = geoJsonParser.readFeatures(geoJson);
            for (var i = 0; i < features.length; ++i) {
                if (features[i].getProperties().Guid) {
                    var feature = layer.getSource().getFeatureById(isySubLayer.name + '.' + features[i].getProperties().Guid);
                    if (feature) {
                        layer.getSource().removeFeature(feature);
                    }
                }
            }
        }
    }

    function clearLayer(isySubLayer) {
        var layer = _getLayerFromPool(isySubLayer);
        if (layer !== undefined) {
            layer.getSource().clear();
        }
    }

    function _isLayerVisible(isySubLayer) {
        var layerexists = false;
        map.getLayers().forEach(function (maplayer) {
            if (!layerexists && maplayer.guid === isySubLayer.id) {
                layerexists = true;
            }
        });
        return layerexists;
    }

    function showLayer(isySubLayer) {
        if (!_isLayerVisible(isySubLayer)) {
            var layer = _createLayer(isySubLayer);
            if (layer) {
                layer.sortingIndex = isySubLayer.sortingIndex;
                map.addLayer(layer);
                _trigLayersChanged();
            }
        }
    }

    function getLegendStyles(isySubLayer) {
        var layer = _getLayerFromPool(isySubLayer);
        if (layer !== null) {
            return getLegendStyleFromLayer(layer);
        }
        return undefined;
    }

    function showBaseLayer(isySubLayer) {
        if (!_isLayerVisible(isySubLayer)) {
            var layer = _createLayer(isySubLayer);
            if (layer) {
                map.getLayers().insertAt(0, layer);
                _trigLayersChanged();
            }
        }
    }

    function hideLayer(isySubLayer) {
        if (_isLayerVisible(isySubLayer)) {
            var layer = _getLayerByGuid(isySubLayer.id);
            if (layer) {
                map.removeLayer(layer);
                _trigLayersChanged();
            }
        }
    }

    function _getProxyUrl(layerUrl, flattenproxy) {
        if (Array.isArray(layerUrl)) {
            layerUrl = layerUrl[0];
        }
        if (flattenproxy) {
            if (Array.isArray(proxyHost)) {
                return proxyHost[0] + layerUrl;
            }
            return proxyHost + layerUrl;
        }
        if (!Array.isArray(proxyHost)) {
            return proxyHost + layerUrl;
        }
        var newLayerUrl = [];
        for (var i = 0; i < proxyHost.length; i++) {
            newLayerUrl.push(proxyHost[i] + layerUrl);
        }
        return newLayerUrl;
    }

     function _getToken() {
         if (!tokenHost) {
             return null;
         } else if (!globalGkt || _checkGlobalGktTokenExpired()) {
             globalGkt = $.ajax({
                 type: "GET",
                 url: tokenHost,
                 async: false
             }).responseText.trim().replace(/"/g, "");
             lastGlobalGktCheck = (new Date()).getTime();
         }
         return globalGkt;
     }
 function _getTicket() {
     if (!ticketHost) {
         return null;
     } else if (!globalTicket || _checkGlobalTicketExpired()) {
         globalTicket = $.ajax({
             type: "GET",
             url: ticketHost,
             async: false
         }).responseText.trim().replace(/"/g, "");
         lastGlobalTicketCheck = (new Date()).getTime();
     }
     return globalTicket;
 }


    function _checkGlobalGktTokenExpired() {
        var currentTime = (new Date()).getTime();
        if (currentTime < (lastGlobalGktCheck + (gktLifetime * 1000))) {
            lastGlobalGktCheck = currentTime;
            return false;
        }
        return true;
    }

    function _checkGlobalTicketExpired() {
        var currentTime = (new Date()).getTime();
        if (currentTime < (lastGlobalTicketCheck + (ticketLifetime * 1000))) {
            lastGlobalTicketCheck = currentTime;
            return false;
        }
        return true;
    }

    function _setLayerProperties(layer, isySubLayer) {
        // For caching, remember layer config
        layer.set('config', isySubLayer);
        layer.on('change', function () {
            layer.set('loading', true);
        }, layer);
        layer.on('render', function () {
            // usikker på om render er riktig funksjon...
            if (layer.get('loading')) {
                layer.set('loading', undefined);
                eventHandler.TriggerEvent(EventTypes.LoadingLayerEnd, layer);
            }
        }, layer);
    }

    function _createLayer(isySubLayer) {
        var layer;
        var source;
        var layerFromPool = _getLayerFromPool(isySubLayer);
        var returnlayer = true;
        var parameters;
        if (isyToken && isyToken.length > 0) {
            parameters = {
                isyToken: isyToken
            };
        }

        var styleCallback = function (response) {
            // For caching, remember layer config
            layer.set('config', isySubLayer);
            var scales = sldstyles[isySubLayer.id].ParseSld(response, parseInt(isySubLayer.id, 10));
            if (scales.maxScaleDenominator) {
                _setLayerMaxresolution(layer, _getResolutionByScale(scales.maxScaleDenominator), 'styleCallback');
            }
            if (scales.minScaleDenominator) {
                _setLayerMinresolution(layer, _getResolutionByScale(scales.minScaleDenominator), 'styleCallback');
            }
            _addIsySubLayer(isySubLayer);
            layerPool.push(layer);
            layer.sortingIndex = isySubLayer.sortingIndex;
            map.addLayer(layer);
            eventHandler.TriggerEvent(EventTypes.LayerCreated, layerPool);
            sortLayerBySortIndex();
            _trigLayersChanged();
        };

        if (layerFromPool !== null) {
            layer = layerFromPool;
            // For caching, remember layer config
            layer.set('config', isySubLayer);
        } else {
            switch (isySubLayer.source) {
                case SOURCES.wmts:
                    if (isySubLayer.gatekeeper && isySubLayer.tiled && ((offline === undefined) ? true : !offline.IsActive())) {
                        if (parameters) {
                            parameters['gkt'] = _getToken();
                        } else {
                            parameters = {
                                gkt: _getToken()
                            };
                        }
                    }
                    source = new MaplibWMTSSource(isySubLayer, parameters);
                    break;
                case SOURCES.proxyWmts:
                    isySubLayer.url = _getProxyUrl(isySubLayer.url);
                    source = new MaplibWMTSSource(isySubLayer, parameters);
                    break;
                case SOURCES.wms:
                    source = new MaplibWMSSource(isySubLayer, parameters);
                    if (isySubLayer.gatekeeper && isySubLayer.tiled && ((offline === undefined) ? true : !offline.IsActive())) {
                        _setToken(source);
                    }
                    if (isySubLayer.ticket && ((offline === undefined) ? true : !offline.IsActive())) {
                        _setTicket(source);
                    }
                    break;
                case SOURCES.proxyWms:
                    isySubLayer.url = _getProxyUrl(isySubLayer.url);
                    source = new MaplibWMSSource(isySubLayer, parameters);
                    break;
                case SOURCES.vector:
                    source = new MaplibVectorSource(isySubLayer);
                    if (isySubLayer.url !== "") {
                        if (!isySubLayer.noProxy) {
                            isySubLayer.url = _getProxyUrl(isySubLayer.url);
                        }
                        // _loadVectorLayer(isySubLayer, source);

                    }
                    break;
                case SOURCES.wfs:
                    if (!isySubLayer.noProxy) {
                        isySubLayer.url = _getProxyUrl(isySubLayer.url, true);
                    }
                    source = new MaplibWfsSource(isySubLayer, offline, parameters);
                    break;

                default:
                    throw "Unsupported source: SOURCES.'" +
                        isySubLayer.source +
                        "'. For SubLayer with url " + isySubLayer.url +
                        " and name " + isySubLayer.name + ".";
            }

            if (isySubLayer.source === SOURCES.vector) {
                if (isySubLayer.style) {
                    if (typeof isySubLayer.style === "object" || isySubLayer.style.indexOf("http") < 0) {
                        sldstyles[isySubLayer.id] = new OLStylesJson(isySubLayer.style);
                        layer = new VectorLayer({
                            source: source,
                            style: function (feature, resolution) {
                                return sldstyles[isySubLayer.id].GetStyle(feature, _getScaleByResolution(resolution));
                            }
                        });
                    } else {
                        sldstyles[isySubLayer.id] = new OLStylesSLD();
                        layer = new VectorLayer({
                            source: source,
                            style: function (feature, resolution) {
                                return sldstyles[isySubLayer.id].GetStyle(feature, _getScaleByResolution(resolution));
                            }
                        });
                        if (isySubLayer.style) {
                            returnlayer = false;
                            getConfigResource(isySubLayer.style, 'application/xml', styleCallback);
                        }
                        _setLayerProperties(layer, isySubLayer);
                    }
                } else {
                    layer = new VectorLayer({
                        source: new VectorSource({
                            format: new GeoJSONFormat({
                                defaultDataProjection: isySubLayer.coordinate_system
                            }),
                            url: isySubLayer.url

                        })
                    });
                }
            } else if (isySubLayer.source === SOURCES.wfs) {
                sldstyles[isySubLayer.id] = new OLStylesSLD();
                layer = new VectorLayer({
                    source: source,
                    style: function (feature, resolution) {
                        return sldstyles[isySubLayer.id].GetStyle(feature, _getScaleByResolution(resolution));
                    }
                });
                if (isySubLayer.style) {
                    returnlayer = false;
                    getConfigResource(isySubLayer.style, 'application/xml', styleCallback);
                }
                _setLayerProperties(layer, isySubLayer);
            } else if (isySubLayer.tiled) {
                layer = new TileLayer({
                    extent: isySubLayer.extent,
                    opacity: isySubLayer.opacity,
                    source: source
                });
            } else {
                layer = new ImageLayer({
                    extent: isySubLayer.extent,
                    opacity: isySubLayer.opacity,
                    source: source
                });
            }

            // For caching, remember layer config
            layer.set('config', isySubLayer);
            layer.layerIndex = isySubLayer.layerIndex;
            layer.guid = isySubLayer.id;
            layer.typename = isySubLayer.name;
            layer.tooltipTemplate = isySubLayer.tooltipTemplate;
            if (isySubLayer.minResolution !== undefined) {
                layer.setMinResolution(isySubLayer.minResolution);
            }
            if (isySubLayer.maxResolution !== undefined) {
                layer.setMaxResolution(isySubLayer.maxResolution);
            }
            if (isySubLayer.maxScale) {
                _setLayerMinresolution(layer, _getResolutionByScale(isySubLayer.maxScale), 'layer');
            }
            if (isySubLayer.minScale) {
                _setLayerMaxresolution(layer, _getResolutionByScale(isySubLayer.minScale), 'layer');
            }
            if (returnlayer) {
                _addIsySubLayer(isySubLayer);
                layerPool.push(layer);
            }
        }

        if (returnlayer) {
            return layer;
        }
    }

    function _setLayerMinresolution(layer, scale) { //}, debuginfo) {
        if (layer && scale) {
            var minRes = layer.getMinResolution();
            if (minRes && minRes >= scale) {
                //console.log(minRes + ' > ' + scale);
                return;
            }
            //console.log(debuginfo + ' setLayerMinresolution() ' + layer.get('config').name + ': ' + scale);
            layer.setMinResolution(scale);
        }
    }

    function _setLayerMaxresolution(layer, scale) { //, debuginfo) {
        if (layer && scale) {
            var maxRes = layer.getMaxResolution();
            if (maxRes && maxRes <= scale) {
                //console.log(maxRes + ' < ' + scale);
                return;
            }
            //console.log(debuginfo + ' setLayerMaxresolution() ' + layer.get('config').name + ': ' + scale);
            layer.setMaxResolution(scale);
        }
    }

    function _loadVectorLayer(isySubLayer, source) {
        var callback = function (data) {
            data = typeof data === 'object' ? data : JSON.parse(data);
            var format = new GeoJSONFormat();
            for (var i = 0; i < data.features.length; i++) {
                var feature = data.features[i];
                if (feature.type) {
                    source.addFeature(format.readFeature(feature));
                }
            }
        };
        $.ajax({
            url: isySubLayer.url,
            async: false
        }).done(function (response) {
            callback(response);
        });
    }

    function _getLayerFromPool(isySubLayer) {
        for (var i = 0; i < layerPool.length; i++) {
            var layerInPool = layerPool[i];
            if (layerInPool.guid === isySubLayer.id) {
                return layerInPool;
            }
        }
        return null;
    }

    function _getLayerFromPoolByGuid(guid) {
        for (var i = 0; i < layerPool.length; i++) {
            var layerInPool = layerPool[i];
            if (layerInPool.guid === guid) {
                return layerInPool;
            }
        }
        return null;
    }

    function _addIsySubLayer(isySubLayer) {
        var itemExists = false;
        for (var i = 0; i < isySubLayerPool.length; i++) {
            if (isySubLayer.id === isySubLayerPool[i].id) {
                itemExists = true;
                break;
            }
        }
        if (!itemExists) {
            isySubLayerPool.push(isySubLayer);
        }
    }

    function _getIsySubLayerFromPool(layer) {
        var isySubLayer;
        for (var i = 0; i < isySubLayerPool.length; i++) {
            if (isySubLayerPool[i].id === layer.guid) {
                isySubLayer = isySubLayerPool[i];
                break;
            }
        }
        return isySubLayer;
    }

    function _getLayerFromPoolByFeature(feature) {
        var featureId = feature.get("layerguid");
        if (featureId === undefined) {
            featureId = feature.getId();

            if (featureId === undefined) {
                return null;
            }

            if (featureId.indexOf('.') > 0) {
                featureId = featureId.slice(0, featureId.indexOf('.'));
            } else {
                var tempFeatureId = featureId.substr(0, featureId.indexOf('_')) + ':' + featureId.substr(featureId.indexOf('_') + 1);
                featureId = tempFeatureId.slice(0, tempFeatureId.indexOf('_'));
            }
            for (var i = 0; i < layerPool.length; i++) {
                var layerInPool = layerPool[i];
                var typename = layerInPool.typename;
                if (typename.indexOf(':') > 0) {
                    typename = typename.slice(typename.indexOf(':') + 1);
                }
                if (typename === featureId) {
                    return layerInPool;
                }
            }
        } else {
            for (var j = 0; j < layerPool.length; j++) {
                if (featureId === layerPool[j].guid) {
                    return layerPool[j];
                }
            }
        }
        return null;
    }

    var _getScaleByResolution = function (resolution) {
        if (resolution === undefined) {
            return;
        }
        var scale;
        for (var i = 0; i < mapResolutions.length; i++) {
            if (mapResolutions[i] === resolution) {
                scale = mapScales[i];
                break;
            }
        }
        return scale;
    };

    var _getResolutionByScale = function (scale) {
        if (scale === undefined) {
            scale = getScale();
        }
        if (scale === 1) {
            return mapResolutions[mapResolutions.length - 1];
        }
        if (scale === Infinity) {
            return undefined;
        }
        var zoomlevel = -1;
        for (var i = 0; i < mapScales.length; i++) {
            if (mapScales[i] < scale) {
                zoomlevel = i - 1;
                break;
            }
        }
        if (zoomlevel < 0) {
            return mapResolutions[mapResolutions.length - 1];
        }
        return mapResolutions[zoomlevel];
    };

    function setLayerBrightness(isySubLayer, value) {
        // Require WebGL-rendering of map
        var layer = _getLayerByGuid(isySubLayer.id);
        if (layer && !isNaN(value)) {
            layer.setBrightness(Math.min(value, 1));
        }
    }

    function setLayerContrast(isySubLayer, value) {
        // Require WebGL-rendering of map
        var layer = _getLayerByGuid(isySubLayer.id);
        if (layer && !isNaN(value)) {
            layer.setContrast(Math.min(value, 1));
        }
    }

    function setLayerOpacity(isySubLayer, value) {
        var layer = _getLayerByGuid(isySubLayer.id);
        if (layer && !isNaN(value)) {
            layer.setOpacity(Math.min(value, 1));
        }
    }

    function setLayerSaturation(isySubLayer, value) {
        // Require WebGL-rendering of map
        var layer = _getLayerByGuid(isySubLayer.id);
        if (layer && !isNaN(value)) {
            layer.setSaturation(Math.min(value, 1));
        }
    }

    function setLayerHue(isySubLayer, value) {
        // Require WebGL-rendering of map
        var layer = _getLayerByGuid(isySubLayer.id);
        if (layer && !isNaN(value)) {
            layer.setHue(Math.min(value, 1));
        }
    }

    function _getLayersWithGuid() {
        return map.getLayers().getArray().filter(function (elem) {
            return elem.guid !== undefined;
        });
    }

    function _getLayerByGuid(guid) {
        var layers = _getLayersWithGuid();
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.guid === guid) {
                return layer;
            }
        }
        return null;
    }

    function getLayerIndex(isySubLayer) {
        var layers = _getLayersWithGuid();
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.guid === isySubLayer.id) {
                return i;
            }
        }
        return null;
    }

    function getLayerByName(layerTitle) {
        var layers = _getLayersWithGuid();
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].get('title') === layerTitle) {
                return layers[i];
            }
        }
        return null;
    }

    function moveLayerToIndex(isySubLayer, index) {
        var subLayerIndex = getLayerIndex(isySubLayer);
        var layersArray = map.getLayers().getArray();

        for (var i = 0; i < layersArray.length; i++) {
            if (layersArray[i].guid === undefined) {
                layersArray.splice(i, 1);
                break;
            }
        }
        layersArray.splice(index, 0, layersArray.splice(subLayerIndex, 1)[0]);

        _trigLayersChanged();
    }

    function sortLayerBySortIndex() {
        var layersArray = map.getLayers().getArray();
        _sortByKey(layersArray, 'sortingIndex');
        _trigLayersChanged();
    }

    function _sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    function _getLayerById(layerId) {
        var layers = map.getLayers().getArray();
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].guid === layerId) {
                return layers[i];
            }
        }
        return undefined;
    }

    function updateLayerSortIndex(groups) {
        for (var i = 0; i < groups.length; i++) {
            if (groups[i].isyLayers !== undefined) {
                for (var j = 0; j < groups[i].isyLayers.length; j++) {
                    for (var k = 0; k < groups[i].isyLayers[j].subLayers.length; k++) {
                        var layer = _getLayerById(groups[i].isyLayers[j].subLayers[k].id);
                        if (layer !== undefined) {
                            layer.sortingIndex = groups[i].isyLayers[j].subLayers[k].sortingIndex;
                        }
                    }
                }
            } else {
                break;
            }
        }
    }

    function _trigLayersChanged() {
        var eventObject = _getUrlObject();
        eventHandler.TriggerEvent(EventTypes.ChangeLayers, eventObject);
    }

    function _getGuidsForVisibleLayers() {
        var visibleLayers = [];
        var layers = _getLayersWithGuid();
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            if (layer.getVisible() === true) {
                visibleLayers.push(layers[i]);
            }
        }

        visibleLayers.sort(_compareMapLayerIndex);
        var result = [];
        for (var j = 0; j < visibleLayers.length; j++) {
            result.push(visibleLayers[j].guid);
        }
        return result.join(",");
    }

    function _compareMapLayerIndex(a, b) {
        if (a.mapLayerIndex < b.mapLayerIndex) {
            return -1;
        }
        if (a.mapLayerIndex > b.mapLayerIndex) {
            return 1;
        }
        return 0;
    }

    /*
        Layer functions End
     */

    /*
        Map Export Start
        Functionality in ISY.;ap.OL3.Export
     */

    var _resizeEvent = function () {
        mapExport.WindowResized(map);
    };

    function activateExport(options) {
        mapExport.Activate(options, map, redrawMap);
        window.addEventListener('resize', _resizeEvent, false);
    }

    function deactivateExport() {
        window.removeEventListener('resize', _resizeEvent, false);
        mapExport.Deactivate(redrawMap);
    }

    function exportMap(callback) {
        mapExport.ExportMap(callback, map);
    }

    function redrawMap() {
        if (map) {
            map.updateSize();
        }
    }

    function refreshMap() {
        map.getLayers().forEach(function (layer) {
            refreshLayer(layer);
        });
    }

    function refreshLayerByGuid(guid, featureObj) {
        if (guid) {
            refreshLayer(_getLayerFromPoolByGuid(guid), undefined, featureObj);
        }
    }

    function refreshIsyLayer(isySubLayer, featureObj) {
        refreshLayer(_getLayerFromPool(isySubLayer), isySubLayer, featureObj);
    }

    function refreshLayer(layer, isySubLayer, featureObj) {
        if (layer === undefined) {
            return;
        }
        if (isySubLayer === undefined) {
            isySubLayer = _getIsySubLayerFromPool(layer);
        }
        if (isySubLayer === undefined) {
            return;
        }
        var parameters;
        if (isyToken && isyToken.length > 0) {
            parameters = {
                isyToken: isyToken
            };
        }
        var source;
        switch (isySubLayer.source) {
            case SOURCES.wmts:
                source = new MaplibWMTSSource(isySubLayer, parameters);
                if (isySubLayer.gatekeeper && ((offline === undefined) ? true : !offline.IsActive())) {
                    _setToken(source);
                }
                break;
            case SOURCES.proxyWmts:
                source = new MaplibWMTSSource(isySubLayer, parameters);
                break;
            case SOURCES.wms:
                source = new MaplibWMSSource(isySubLayer, parameters);
                if (isySubLayer.gatekeeper && isySubLayer.tiled && ((offline === undefined) ? true : !offline.IsActive())) {
                    _setToken(source);
                }
                break;
            case SOURCES.proxyWms:
                source = new MaplibWMSSource(isySubLayer, parameters);
                break;
            case SOURCES.vector:
                source = new MaplibVectorSource(isySubLayer);
                if (isySubLayer.url !== "") {
                    _loadVectorLayer(isySubLayer, source);
                }
                break;
            case SOURCES.wfs:
                parameters._olSalt = Math.random();
                source = new MaplibWfsSource(isySubLayer, offline, parameters, featureObj, eventHandler);
                break;
        }
        if (source) {
            layer.setSource(source);
        }
    }

    var setIsyToken = function (token) {
        if (token.length === 0) {
            return;
        }
        if (isyToken && isyToken === token) {
            return;
        }
        isyToken = token;
        var parameters = {
            isyToken: isyToken
        };
        for (var i = 0; i < isySubLayerPool.length; i++) {
            isySubLayerPool[i].isyToken = isyToken;
            var isySubLayer = isySubLayerPool[i];
            var source;
            var layer = _getLayerFromPool(isySubLayer);
            var isVector = false;
            switch (isySubLayer.source) {
                case SOURCES.wms:
                case SOURCES.wmts:
                case SOURCES.proxyWms:
                case SOURCES.proxyWmts:
                    source = layer.getSource();
                    break;
                case SOURCES.vector:
                    isVector = true;
                    source = new MaplibVectorSource(isySubLayer);
                    if (isySubLayer.url !== "") {
                        _loadVectorLayer(isySubLayer, source);
                    }
                    break;
                case SOURCES.wfs:
                    isVector = true;
                    source = new MaplibWfsSource(isySubLayer, offline, parameters);
                    break;
            }
            if (source) {
                if (isVector) {
                    layer.setSource(source);
                } else {
                    source.updateParams(parameters);
                }
            }
        }
    };
    var removeIsyToken = function () {
        isyToken = undefined;
        var parameters = {
            isyToken: ''
        };
        for (var i = 0; i < isySubLayerPool.length; i++) {
            isySubLayerPool[i].isyToken = isyToken;
            var isySubLayer = isySubLayerPool[i];
            var source;
            var layer = _getLayerFromPool(isySubLayer);
            var isVector = false;
            switch (isySubLayer.source) {
                case SOURCES.wms:
                case SOURCES.wmts:
                case SOURCES.proxyWms:
                case SOURCES.proxyWmts:
                    source = layer.getSource();
                    break;
                case SOURCES.vector:
                    isVector = true;
                    source = new MaplibVectorSource(isySubLayer);
                    if (isySubLayer.url !== "") {
                        _loadVectorLayer(isySubLayer, source);
                    }
                    break;
                case SOURCES.wfs:
                    isVector = true;
                    source = new MaplibWfsSource(isySubLayer, offline);
                    break;
            }
            if (source) {
                if (isVector) {
                    layer.setSource(source);
                } else {
                    source.updateParams(parameters);
                }
            }
        }
    };

    function showCustomMessage(message) {
        customMessageHandler.ShowCustomMessage(message);
    }

    function renderSync() {
        map.renderSync();
    }

    /*
        Map Export End
     */

    /*
        Feature Info Start
        Functionality in ISY.MapImplementation.OL3.FeatureInfo
     */

    function activateInfoClick(callback) {
        featureInfo.ActivateInfoClick(callback, map);
    }

    function deactivateInfoClick() {
        featureInfo.DeactivateInfoClick(map);
    }

    function getFeatureInfoUrl(isySubLayer, coordinate) {
        return proxyHost + featureInfo.GetFeatureInfoUrl(isySubLayer, _getLayerFromPool(isySubLayer), coordinate, map.getView());
    }

    function showHighlightedFeatures(layerguid, features) {
        featureInfo.ShowHighlightedFeatures(_getFeaturesAndAddHoverStyle(layerguid, features), map);
    }

    function clearHighlightedFeatures() {
        featureInfo.ClearHighlightedFeatures();
    }

    function showInfoMarker(coordinate, element) {
        featureInfo.ShowInfoMarker(coordinate, element, map);
    }

    function showInfoMarkers(coordinates, element) {
        featureInfo.ShowInfoMarkers(coordinates, element, map);
    }

    function removeInfoMarker(element) {
        featureInfo.RemoveInfoMarker(element, map);
    }

    function removeInfoMarkers(element) {
        featureInfo.RemoveInfoMarkers(element, map);
    }

    function setHighlightStyle(style) {
        featureInfo.SetHighlightStyle(style);
    }

    function activateBoxSelect(callback) {
        featureInfo.ActivateBoxSelect(callback, map);
    }

    function deactivateBoxSelect() {
        featureInfo.DeactivateBoxSelect(map);
    }


    Array.prototype.where = function (matcher) {
        var result = [];
        for (var i = 0; i < this.length; i++) {
            if (matcher(this[i])) {
                result.push(this[i]);
            }
        }
        return result;
    };

    function _getElementsByAttribute(tag, attr, attrValue, response, exactName) {
        //Get elements and convert to array
        var elems = Array.prototype.slice.call(response.getElementsByTagName(tag), 0);

        var matcher = function (el) {
            if (exactName) {
                return el.getAttribute(attr).toLowerCase() === attrValue.toLowerCase();
            } else {
                return el.getAttribute(attr).indexOf(attrValue) > -1 || attrValue.indexOf(el.getAttribute(attr)) > -1;
            }
        };

        return elems.where(matcher);
    }


    function _parseResponse(response) {

        var subLayerName = describedSubLayer.name.split(":");
        if (subLayerName.length > 0) {
            subLayerName = subLayerName[subLayerName.length - 1];
        } else {
            return;
        }

        var elementNodeByName = _getElementsByAttribute("element", "name", subLayerName, response, true)[0];

        var elementGeometryName = _getElementsByAttribute("element", "type", isyLayerGeometryType, elementNodeByName, false)[0];

        if (elementGeometryName === undefined) {
            return;
        } else {
            elementGeometryName = elementGeometryName.getAttribute("name");
        }

        var featureNamespace = response.firstChild.getAttribute("targetNamespace");

        if (typeof describedSource.format === 'undefined') {
            var gmlFormat;
            switch (describedSubLayer.version) {
                case '1.0.0':
                    gmlFormat = new GML2Format();
                    break;
                case '1.1.0':
                    gmlFormat = new GML3Format();
                    break;
                case '2.0.0':
                    gmlFormat = new GML3Format();
                    break;
                default:
                    gmlFormat = new GMLFormat();
                    break;
            }

            describedSource.format = new WFSFormat({
                featureType: describedSubLayer.providerName,
                featureNS: featureNamespace,
                gmlFormat: gmlFormat
            });
        }

        describedSubLayer.featureNS = featureNamespace;
        describedSubLayer.geometryName = elementGeometryName;

        eventHandler.TriggerEvent(EventTypes.FeatureHasBeenDescribed, [describedSubLayer, describedSource]);
    }

    function describeFeature(isySubLayer, geometryType) {
        describedSubLayer = isySubLayer;
        isyLayerGeometryType = geometryType;
        var projection = getProjection(isySubLayer.coordinate_system);
        describedSource = new VectorSource({
            projection: projection
        });
        describedSource.set('type', 'ol.source.Vector');
        var url = isySubLayer.url;
        if (Array.isArray(isySubLayer.url)) {
            url = isySubLayer.url[0];
        }
        if (url.toLowerCase().indexOf("service=wfs") < 0) {
            url += "service=WFS&";
        }
        url += 'request=DescribeFeatureType&' +
            'version=' + isySubLayer.version + '&typename=' + isySubLayer.name;
         $.ajax({
             url: url
         }).done(function (response) {
             _parseResponse(response);
         });

    }

    function getExtentForCoordinate(coordinate, pixelTolerance) {
        return featureInfo.GetExtentForCoordinate(coordinate, pixelTolerance, map.getView().getResolution());
    }

    function getFeaturesInExtent(isySubLayer, extent) {
        return featureInfo.GetFeaturesInExtent(extent, _getLayerFromPool(isySubLayer), map.getView().getResolution());
    }

    function getFeatureCollection(isySubLayer) {
        return featureInfo.GetFeatureCollection(_getLayerFromPool(isySubLayer));
    }

    function getFeaturesInMap(isySubLayer) {
        return featureInfo.GetFeaturesInMap(_getLayerFromPool(isySubLayer));
    }

    function getLayerByFeature(feature) {
        return _getLayerFromPoolByFeature(feature);
    }

    function getHoverStyle(feature, resolution) {
        //var featureId = feature.getId();
        //if (featureId.indexOf('.') > 0) {
        //    featureId = featureId.slice(0, featureId.indexOf('.'));
        //}
        //else {
        //    var tempFeatureId = featureId.substr(0,featureId.indexOf('_')) + ':' + featureId.substr(featureId.indexOf('_') + 1);
        //    featureId = tempFeatureId.slice(0, tempFeatureId.indexOf('_'));
        //}
        var layer = this.GetLayerByFeature(feature);
        if (layer) {
            if (sldstyles[layer.guid]) {
                return sldstyles[layer.guid].GetHoverStyle(feature, _getScaleByResolution(resolution));
            } else {
                return layer.getStyle ? layer.getStyle() : undefined;
            }
        }
    }

    function _getFeaturesAndAddHoverStyle(layerguid, features) {
        if (layerguid === undefined) {
            return features;
        }
        var scale = _getScaleByResolution(map.getView().getResolution());
        var feature;
        var featureAttribute = function (attr) {
            for (var j = 0; j < feature.attributes.length; j++) {
                if (attr === feature.attributes[j][0]) {
                    return feature.attributes[j][1];
                }
            }
        };
        for (var i = 0; i < features.length; i++) {
            feature = features[i];
            if (features[i].get === undefined) {
                features[i].get = featureAttribute;
            }
            var hoverstyle = sldstyles[layerguid].GetHoverStyle(features[i], scale);
            if (hoverstyle) {
                features[i].hoverstyle = hoverstyle;
            }
        }
        return features;
    }

    function getFeatureExtent(feature) {
        return featureInfo.GetFeatureExtent(feature);
    }
    /*
        Feature Info End
     */

    /*
     HoverInfo Start
     */

    function activateHoverInfo(callback) {
        hoverInfo.ActivateHoverInfo(map, callback, this, hoverOptions);
    }

    function deactivateHoverInfo() {
        hoverInfo.DeactivateHoverInfo(map);
    }

    /*
     HoverInfo End
     */

    /*
     Measure Start
     Functionality in ISY.MapImplementation.OL3.Measure
     */
    function activateMeasure(callback, options) {
        measure.Activate(map, callback, options);
    }

    function deactivateMeasure() {
        measure.Deactivate(map);
    }

    function activateMeasureLine(callback, options) {
        measureLine.Activate(map, callback, options);
        //var vector = measure.Activate(map, callback);

    }

    function deactivateMeasureLine() {
        measureLine.Deactivate(map);
    }

    /*
     Measure End
     */

    /*
     AddLayerFeature Start
     Functionality in ISY.MapImplementation.OL3.AddLayerFeature
     */
    function activateAddLayerFeature(options) {
        addLayerFeature.Activate(map, options);
    }

    function deactivateAddLayerFeature() {
        addLayerFeature.Deactivate(map);
    }

    /*
     AddLayerFeature End
     */

    /*
     AddFeatureGps Start
     Functionality in ISY.MapImplementation.OL3.AddFeatureGps
     */
    function activateAddFeatureGps(options) {
        addFeatureGps.Activate(map, options);
    }

    function addCoordinatesGps(coordinates) {
        addFeatureGps.AddCoordinates(coordinates);
    }

    function deactivateAddFeatureGps() {
        addFeatureGps.Deactivate(map);
    }

    /*
     AddLayerFeature End
     */


    /*
     Modify Feature Start
     */

    function activateModifyFeature(options) {
        modifyFeature.Activate(map, options);
    }

    function deactivateModifyFeature() {
        modifyFeature.Deactivate(map);
    }

    /*
     Modify Feature End
     */


    /*
     DrawFeature Start
     */

    function activateDrawFeature(callback, options) {
        drawFeature.Activate(map, callback, options);
    }

    function deactivateDrawFeature() {
        drawFeature.Deactivate(map);
    }

    /*
     DrawFeature End
     */

    /*
     Offline Start
     Functionality in ISY.MapImplementation.OL3.Offline
     */

    function _initOffline() {
        if (offline) {
            offline.Init(map, eventHandler);
        }
    }

    function activateOffline() {
        if (offline) {
            offline.Activate();
        }
    }

    function startCaching(zoomLevelMin, zoomLevelMax, extentView) {
        if (offline) {
            offline.StartCaching(zoomLevelMin, zoomLevelMax, extentView, eventHandler);
        }
    }

    function stopCaching() {
        offline.StopCaching();
    }

    function deleteDatabase(callback, zoomlevels, eventhandler) {
        offline.DeleteDatabase(callback, zoomlevels, eventhandler);
    }

    function cacheDatabaseExist() {
        return offline.CacheDatabaseExist();
    }

    function calculateTileCount(zoomLevelMin, zoomLevelMax, extentView) {
        if (offline) {
            return offline.CalculateTileCount(zoomLevelMin, zoomLevelMax, extentView);
        }
    }

    function getResource(url, contentType, callback) {
        if (offline) {
            offline.GetResource(url, contentType, callback);
        }
    }

    function getConfigResource(url, contentType, callback) {
        if (offline) {
            offline.GetConfigResource(url, contentType, callback);
        }
    }

    function getResourceFromJson(url, contentType, callback) {
        if (offline) {
            offline.GetResourceFromJson(url, contentType, callback);
        }
    }



    function getLayerResource(key, name, url) {
        if (offline) {
            offline.GetLayerResource(key, name, url);
        }
    }

    function deactivateOffline() {
        if (offline) {
            offline.Deactivate();
        }
    }

    /*
     Offline End
     */


    /*
      PrintBoxSelect Start
     */
    var activatePrintBoxSelect = function (options) {
        printBoxSelect.Activate(map, options);
    };

    var deactivatePrintBoxSelect = function () {
        printBoxSelect.Deactivate(map);
    };

    /*
     PrintBoxSelect End
     */


    /*
     AddLayerUrl Start
     */
    var activateAddLayerUrl = function (options) {
        addLayerUrl.Activate(map, options);
    };

    var deactivateAddLayerUrl = function () {
        addLayerUrl.Deactivate(map);
    };

    /*
     AddLayerUrl End
     */



    /*
        Utility functions start
     */

    var _getUrlObject = function () {
        if (map !== undefined) {
            var retVal = {
                layers: _getGuidsForVisibleLayers()
            };

            var view = map.getView();
            var center = view.getCenter();
            var zoom = view.getZoom();
            if (zoom) {
                retVal.zoom = zoom.toString();
            }
            if (center) {
                retVal.lat = center[1].toFixed(2);
                retVal.lon = center[0].toFixed(2);
            }
            return retVal;
        }
    };

    var zoomToLayer = function (isySubLayer) {
        var layer = _getLayerFromPool(isySubLayer);
        if (layer) {
            var extent;
            if (typeof layer.getSource().getExtent !== "undefined") {
                extent = layer.getSource().getExtent();
            } else {
                extent = layer.getSource().getTileGrid().getExtent();
            }
            if (Array.isArray(extent) && extent[0] !== Infinity) {
                if (!containsCoordinate(extent, map.getView().getCenter())) {
                    map.getView().fit(extent, map.getSize());
                }
            }
        }
    };

    var zoomToLayers = function (isySubLayers) {
        var layersExtent = [Infinity, Infinity, -Infinity, -Infinity];
        var setNewExtent = function (newExtent) {
            if (layersExtent[0] > newExtent[0]) {
                layersExtent[0] = newExtent[0];
            }
            if (layersExtent[1] > newExtent[1]) {
                layersExtent[1] = newExtent[1];
            }
            if (layersExtent[2] < newExtent[2]) {
                layersExtent[2] = newExtent[2];
            }
            if (layersExtent[3] < newExtent[3]) {
                layersExtent[3] = newExtent[3];
            }
        };
        isySubLayers.forEach(function (isySubLayer) {
            var layer = _getLayerFromPool(isySubLayer);
            if (layer) {
                var extent = layer.getSource().getExtent();
                if (Array.isArray(extent) && extent[0] !== Infinity) {
                    setNewExtent(extent);
                }
            }
        });
        if (Array.isArray(layersExtent) && layersExtent[0] !== Infinity) {
            map.getView().fit(layersExtent, map.getSize());
        }
    };

    var fitExtent = function (extent) {
        map.getView().fit(extent, map.getSize());
    };

    var getCenter = function () {
        var retVal;
        var view = map.getView();
        var center = view.getCenter();
        var zoom = view.getZoom();
        retVal = {
            lon: center[0],
            lat: center[1],
            zoom: zoom
        };
        return retVal;
    };

    var setCenter = function (center) {
        var view = map.getView();
        if (center.epsg) {
            center = transformEpsgCoordinate(center, getEpsgCode());
        }
        view.setCenter([center.lon, center.lat]);
        if (center.zoom) {
            view.setZoom(center.zoom);
        }
    };

    var getZoom = function () {
        var view = map.getView();
        return view.getZoom();
    };

    var setZoom = function (zoom) {
        var view = map.getView();
        return view.setZoom(zoom);
    };

    var getRotation = function () {
        var view = map.getView();
        return view.getRotation();
    };

    var setRotation = function (angle, anchor) {
        var view = map.getView();
        if (anchor) {
            view.rotate(angle, anchor);
        } else {
            view.setRotation(angle);
        }
    };

    var getEpsgCode = function () {
        var view = map.getView();
        var projection = view.getProjection();
        return projection.getCode();
    };

    function transformEpsgCoordinate(coord, toCrs) {
        if (coord.epsg !== "" && toCrs !== "" && coord.epsg !== toCrs) {
            //var fromProj = getProjection(coord.epsg);
            //var toProj = getProjection(toCrs);
            var transformedCoord = transform([coord.lon, coord.lat], coord.epsg, toCrs);

            if (toCrs === "EPSG:4326") {
                transformedCoord = [transformedCoord[1], transformedCoord[0]];
            }
            coord.lon = transformedCoord[0];
            coord.lat = transformedCoord[1];
            coord.epsg = toCrs;
        }

        return coord;
    }

    function transformBox(fromCrs, toCrs, boxExtent) {
        var returnExtent = boxExtent;
        if (fromCrs !== "" && toCrs !== "" && fromCrs !== toCrs) {
            //var fromProj = getProjection(fromCrs);
            //var toProj = getProjection(toCrs);
            //var transformedExtent = transformExtent(boxExtent, fromProj, toProj);
            var transformedExtent = transformExtent(boxExtent, fromCrs, toCrs);

            returnExtent = transformedExtent;
            if (toCrs === "EPSG:4326") {
                returnExtent = transformedExtent[1] + "," + transformedExtent[0] + "," + transformedExtent[3] + "," + transformedExtent[2];
            }
        }

        return returnExtent;
    }

    function convertGmlToGeoJson(gml) {
        var xmlParser = new WMSCapabilities();
        var xmlFeatures = xmlParser.read(gml);
        var gmlParser = new GMLFormat();
        var features = gmlParser.readFeatures(xmlFeatures);
        var jsonParser = new GeoJSONFormat();
        return jsonParser.writeFeatures(features);
    }

    function extentToGeoJson(x, y) {
        var point = new Point([x, y]);
        var feature = new Feature();
        feature.setGeometry(point);
        var geoJson = new GeoJSONFormat();
        return geoJson.writeFeature(feature);
    }

    function addZoom() {
        var zoom = new Zoom();
        map.addControl(zoom);
    }

    function addZoomSlider() {
        var zoomslider = new ZoomSlider();
        map.addControl(zoomslider);
    }

    function addZoomToExtent(extent) {
        var zoomToExtent = new ZoomToExtent({
            "extent": extent
        });
        map.addControl(zoomToExtent);
    }

    function addScaleLine() {
        var scaleLine = new ScaleLine();
        map.addControl(scaleLine);
    }

    var getVectorLayers = function (isySubLayer, data) {
        var vectors = [];
        var source = MaplibVectorSource(isySubLayer.subLayers[0], map.getView().getProjection());

        var fromProj = getProjection(isySubLayer.subLayers[0].coordinate_system);
        var toProj = getProjection(source.getProjection().getCode());
        var features = source.parser.readFeatures(data);
        for (var i = 0; i < features.length; i++) {
            var feature = features[i];
            feature.getGeometry().transform(fromProj, toProj);
            vectors.push(feature);
        }

        return vectors;
    };

    var getLayerCount = function () {
        if (map) {
            return map.getLayers().getArray().length;
        }
        return 0;
    };

    var getCenterFromExtent = function (extent) {
        return OLGetCenterFromExtent(extent);
    };

    var getScale = function () {
        return mapScales[map.getView().getZoom()];
    };

    var getLegendStyleFromLayer = function (layer) {
        if (sldstyles[layer.guid] !== undefined) {
            return sldstyles[layer.guid].GetStyleForLegend();
        } else {
            return undefined;
        }
    };

    var getExtent = function () {
        return map.getView().calculateExtent(map.getSize());
    };

    var getUrlObject = function () {
        return _getUrlObject();
    };

    function _addGeolocationLayer(guid) {
        var geolocationLayer = new VectorLayer({
            source: new VectorSource(),
            projection: map.getView().getProjection()
        });
        geolocationLayer.guid = guid;
        map.addLayer(geolocationLayer);
        _trigLayersChanged();
    }

    function _drawGeolocation(center, radius) {
        var geolocationLayer = _getLayerByGuid(99999);
        if (geolocationLayer !== null) {
            var geolocationSource = geolocationLayer.getSource();
            geolocationSource.clear();
            var geolocationStyle = new style.Style({
                image: new style.Circle({
                    radius: 6,
                    stroke: new style.Stroke({
                        color: 'rgba(255,255,255,0.8)',
                        width: 2
                    }),
                    fill: new style.Fill({
                        color: 'rgba(32,170,172,0.8)'
                    })
                }),
                fill: new style.Fill({
                    color: 'rgba(0,102,204,0.15)'
                }),
                zIndex: Infinity
            });
            var geolocationFeature = new Feature({
                geometry: new GeometryCollection([
                    new Point(center),
                    new Circle(center, parseInt(radius, 10))
                ]),
                name: 'geolocation_center'
            });
            geolocationFeature.setStyle(geolocationStyle);
            geolocationSource.addFeature(geolocationFeature);
            if (initialGeolocationChange) {
                initialGeolocationChange = false;
                var geolocextent = geolocationFeature.getGeometry().getExtent();
                geolocextent[0] -= 5 * radius;
                geolocextent[1] -= 5 * radius;
                geolocextent[2] += 5 * radius;
                geolocextent[3] += 5 * radius;
                map.getView().fit(geolocextent, map.getSize());
            }
        }
    }

    function _geolocationChange() {
        var view = map.getView();
        var center = geolocation.getPosition();
        if (center === undefined) {
            return;
        }
        view.setCenter(center);
        _drawGeolocation(center, geolocation.getAccuracy());
        var geolocationObject = {
            center: center,
            accuracy: Math.round(geolocation.getAccuracy() * 10) / 10,
            altitude: geolocation.getAltitude(),
            altitudeAccuracy: geolocation.getAltitudeAccuracy(),
            heading: geolocation.getHeading(),
            speed: geolocation.getSpeed()
        };
        eventHandler.TriggerEvent(EventTypes.GeolocationUpdated, geolocationObject);
    }

    var getGeolocation = function () {
        var view = map.getView();
        var mapProjection = view.getProjection();
        geolocation = new OlGeolocation({
            projection: mapProjection,
            tracking: true,
            trackingOptions: {
                //enableHighAccuracy: true,
                //timeout: 5000,
                maximumAge: 0
            }
        });

        _addGeolocationLayer(99999);

        initialGeolocationChange = true;

        geolocation.on('change:position', _geolocationChange);
        geolocation.on('change:accuracy', _geolocationChange);
    };

    var removeGeolocation = function () {
        var geolocationLayer = _getLayerByGuid(99999);
        if (geolocationLayer !== null) {
            map.removeLayer(geolocationLayer);
            _trigLayersChanged();
        }

        if (geolocation !== undefined) {
            geolocation.un('change:position', _geolocationChange);
            geolocation.un('change:accuracy', _geolocationChange);
            geolocation = undefined;
        }
    };

    var getProxyHost = function () {
        return proxyHost;
    };

    var setTranslateOptions = function (translate) {
        translateOptions = translate;
    };

    var transformCoordinates = function (fromEpsg, toEpsg, coordinates) {
        if (proj4.defs(fromEpsg) && proj4.defs(toEpsg)) {
            var transformObject = proj4(fromEpsg, toEpsg);
            return transformObject.forward(coordinates);
        }
    };

    var transformFromGeographic = function (coordinates) {
        // If no coordinates are given an object with two methods is returned,
        // its methods are forward which projects from the first projection to
        // the second and inverse which projects from the second to the first.
        var fromEpsg = getEpsgCode();
        if (proj4.defs(fromEpsg)) {
            var transformObject = proj4(fromEpsg);
            return transformObject.forward(coordinates);
        }
    };

    var transformToGeographic = function (coordinates) {
        // If no coordinates are given an object with two methods is returned,
        // its methods are forward which projects from the first projection to
        // the second and inverse which projects from the second to the first.
        var fromEpsg = getEpsgCode();
        if (proj4.defs(fromEpsg)) {
            var transformObject = proj4(fromEpsg);
            return transformObject.inverse(coordinates);
        }
    };

    /*
        Utility functions End
     */

    return {
        // Start up start
        InitMap: initMap,
        ChangeView: changeView,
        // Start up end

        /***********************************/

        // Layer start
        AddDataToLayer: addDataToLayer,
        RemoveDataFromLayer: removeDataFromLayer,
        ClearLayer: clearLayer,
        ShowLayer: showLayer,
        ShowBaseLayer: showBaseLayer,
        HideLayer: hideLayer,
        GetLayerByName: getLayerByName,
        SetLayerOpacity: setLayerOpacity,
        SetLayerSaturation: setLayerSaturation,
        SetLayerHue: setLayerHue,
        SetLayerBrightness: setLayerBrightness,
        SetLayerContrast: setLayerContrast,
        MoveLayerToIndex: moveLayerToIndex,
        GetLayerIndex: getLayerIndex,
        GetLegendStyles: getLegendStyles,
        RefreshLayer: refreshLayer,
        RefreshIsyLayer: refreshIsyLayer,
        // Layer end

        /***********************************/

        // Export start
        RedrawMap: redrawMap,
        RefreshMap: refreshMap,
        RefreshLayerByGuid: refreshLayerByGuid,
        RenderSync: renderSync,
        ExportMap: exportMap,
        ActivateExport: activateExport,
        DeactivateExport: deactivateExport,
        // Export end

        /***********************************/

        // Feature Info start
        ActivateInfoClick: activateInfoClick,
        DeactivateInfoClick: deactivateInfoClick,
        GetInfoUrl: getFeatureInfoUrl,
        ShowHighlightedFeatures: showHighlightedFeatures,
        ClearHighlightedFeatures: clearHighlightedFeatures,
        ShowInfoMarker: showInfoMarker,
        ShowInfoMarkers: showInfoMarkers,
        SetHighlightStyle: setHighlightStyle,
        RemoveInfoMarker: removeInfoMarker,
        RemoveInfoMarkers: removeInfoMarkers,
        ActivateBoxSelect: activateBoxSelect,
        DeactivateBoxSelect: deactivateBoxSelect,
        GetFeaturesInExtent: getFeaturesInExtent,
        GetExtentForCoordinate: getExtentForCoordinate,
        GetFeatureCollection: getFeatureCollection,
        GetFeatureExtent: getFeatureExtent,
        GetFeaturesInMap: getFeaturesInMap,
        GetLayerByFeature: getLayerByFeature,
        GetHoverStyle: getHoverStyle,
        GetLegendStyleFromLayer: getLegendStyleFromLayer,
        // Feature Info end

        /***********************************/

        // Hover Info start
        ActivateHoverInfo: activateHoverInfo,
        DeactivateHoverInfo: deactivateHoverInfo,
        // Hover Info end

        /***********************************/

        // Measure start
        ActivateMeasure: activateMeasure,
        DeactivateMeasure: deactivateMeasure,
        // Measure end

        /***********************************/

        // Measure line start
        ActivateMeasureLine: activateMeasureLine,
        DeactivateMeasureLine: deactivateMeasureLine,
        // Measure line end

        /***********************************/

        // AddLayerFeature start
        ActivateAddLayerFeature: activateAddLayerFeature,
        DeactivateAddLayerFeature: deactivateAddLayerFeature,
        // AddLayerFeature end

        /***********************************/

        // AddFeatureGps start
        ActivateAddFeatureGps: activateAddFeatureGps,
        AddCoordinatesGps: addCoordinatesGps,
        DeactivateAddFeatureGps: deactivateAddFeatureGps,
        // AddLayerFeature end

        /***********************************/

        // ModifyFeature start
        ActivateModifyFeature: activateModifyFeature,
        DeactivateModifyFeature: deactivateModifyFeature,
        // ModifyFeature end

        /***********************************/

        // DrawFeature start
        ActivateDrawFeature: activateDrawFeature,
        DeactivateDrawFeature: deactivateDrawFeature,
        // DrawFeature end

        /***********************************/

        // Offline startS
        ActivateOffline: activateOffline,
        StartCaching: startCaching,
        StopCaching: stopCaching,
        DeleteDatabase: deleteDatabase,
        CacheDatabaseExist: cacheDatabaseExist,
        CalculateTileCount: calculateTileCount,
        GetResource: getResource,
        GetConfigResource: getConfigResource,
        GetLayerResource: getLayerResource,
        DeactivateOffline: deactivateOffline,
        GetResourceFromJson: getResourceFromJson,
        // Offline end

        /***********************************/

        // PrintBoxSelect Start
        ActivatePrintBoxSelect: activatePrintBoxSelect,
        DeactivatePrintBoxSelect: deactivatePrintBoxSelect,
        // PrintBoxSelect End

        /***********************************/


        // AddLayerUrl Start
        ActivateAddLayerUrl: activateAddLayerUrl,
        DeactivateAddLayerUrl: deactivateAddLayerUrl,
        // AddLayerUrl End

        /***********************************/

        // Utility start
        TransformBox: transformBox,
        ConvertGmlToGeoJson: convertGmlToGeoJson,
        ExtentToGeoJson: extentToGeoJson,
        AddZoom: addZoom,
        AddZoomSlider: addZoomSlider,
        AddZoomToExtent: addZoomToExtent,
        AddScaleLine: addScaleLine,
        ZoomToLayer: zoomToLayer,
        ZoomToLayers: zoomToLayers,
        FitExtent: fitExtent,
        GetCenter: getCenter,
        SetCenter: setCenter,
        GetZoom: getZoom,
        SetZoom: setZoom,
        GetRotation: getRotation,
        SetRotation: setRotation,
        GetEpsgCode: getEpsgCode,
        GetVectorLayers: getVectorLayers,
        GetLayerCount: getLayerCount,
        GetCenterFromExtent: getCenterFromExtent,
        GetScale: getScale,
        SortLayerBySortIndex: sortLayerBySortIndex,
        UpdateLayerSortIndex: updateLayerSortIndex,
        GetExtent: getExtent,
        GetUrlObject: getUrlObject,
        GetGeolocation: getGeolocation,
        RemoveGeolocation: removeGeolocation,
        GetProxyHost: getProxyHost,
        SetTranslateOptions: setTranslateOptions,
        TransformCoordinates: transformCoordinates,
        TransformFromGeographic: transformFromGeographic,
        TransformToGeographic: transformToGeographic,
        DescribeFeature: describeFeature,
        RemoveIsyToken: removeIsyToken,
        SetIsyToken: setIsyToken,
        ShowCustomMessage: showCustomMessage
        // Utility end
    };
};

export const MapRENDERERS = {
    canvas: 'canvas',
    webgl: 'webgl'
};
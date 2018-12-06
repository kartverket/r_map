'use strict';

exports.__esModule = true;
exports.Wfs = exports.Vector = exports.Wmts = exports.Wms = exports.MaplibCustomMessageHandler = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _EventHandler = require('./EventHandler');

var _Domain = require('./Domain');

var _source = require('ol/source');

var _format = require('ol/format');

var _GML = require('ol/format/GML2');

var _GML2 = _interopRequireDefault(_GML);

var _GML3 = require('ol/format/GML3');

var _GML4 = _interopRequireDefault(_GML3);

var _Projection = require('ol/proj/Projection');

var _Projection2 = _interopRequireDefault(_Projection);

var _WMTSCapabilities = require('ol/format/WMTSCapabilities');

var _WMTSCapabilities2 = _interopRequireDefault(_WMTSCapabilities);

var _WMTS = require('ol/source/WMTS');

var _WMTS2 = _interopRequireDefault(_WMTS);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _fastXmlParser = require('fast-xml-parser');

var _fastXmlParser2 = _interopRequireDefault(_fastXmlParser);

var _WMTS3 = require('ol/tilegrid/WMTS');

var _WMTS4 = _interopRequireDefault(_WMTS3);

var _TileGrid = require('ol/tilegrid/TileGrid');

var _TileGrid2 = _interopRequireDefault(_TileGrid);

var _extent = require('ol/extent');

var _loadingstrategy = require('ol/loadingstrategy');

var _proj = require('ol/proj.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaplibCustomMessageHandler = exports.MaplibCustomMessageHandler = function MaplibCustomMessageHandler(eventHandler, _getIsySubLayerFromPool) {
    var olMap;
    var _message = 'Service down: ';
    var _messageHandler;
    var getIsySubLayerFromPool;
    /*
     Start up functions Start
     */

    function init(map, message) {
        olMap = map;
        if (message && message.length > 0) {
            _message = message;
        }
        getIsySubLayerFromPool = _getIsySubLayerFromPool;
        eventHandler.RegisterEvent(_EventHandler.EventTypes.ChangeLayers, _registerMessageHandler);
    }

    function initMessage(message) {
        if (message !== undefined) {
            _message = message;
        }
        _registerMessageHandler();
    }

    function showCustomMessage(message) {
        if (_messageHandler) {
            _messageHandler.showMessage(message);
        }
    }

    function _registerMessageHandler() {
        var element = document.getElementById('messagecontainer');
        if (element === undefined || element === null) {
            return;
        }
        _messageHandler = new CustomMessageHandler(element);
        if (olMap) {
            olMap.getLayers().forEach(function (layer) {
                var isySubLayer = getIsySubLayerFromPool(layer);
                var source = layer.getSource();
                if (source) {
                    var sourceType = source.get('type');
                    switch (sourceType) {
                        case 'ol.source.ImageWMS':
                            source.on('imageloaderror', function (event) {
                                _messageHandler.showMessage(isySubLayer.title, event);
                            });
                            break;
                        case 'ol.source.TileWMS':
                            source.on('tileloaderror', function (event) {
                                _messageHandler.showMessage(isySubLayer.title, event);
                            });
                            break;
                        //case undefined:
                        //    break;
                        default:
                            //    console.log(source.get('type'));
                            break;
                    }
                }
            });
        }
    }

    function CustomMessageHandler(el) {
        this.el = el;
        this.messages = [];
        this.looping = false;
        this.visible = false;
    }

    CustomMessageHandler.prototype.showMessage = function (message, event) {
        var self = this;
        message = self.getResponse(message, event);
        if (self.messages.length === 0) {
            self.messages.push(message);
        } else {
            var addItem = true;
            self.messages.forEach(function (item) {
                if (addItem && item === message) {
                    addItem = false;
                }
            });
            if (addItem) {
                self.messages.push(message);
            }
        }
        self.show();
    };

    CustomMessageHandler.prototype.getResponse = function (message, event) {
        try {
            var image = event.tile.getImage();
            if (image && image.src && (image.src.toLowerCase().indexOf('&gkt=') < 0 || image.src.toLowerCase().indexOf('?gkt=') < 0)) {
                var response = _jquery2.default.ajax({
                    type: "GET",
                    url: image.src,
                    async: false
                }).responseText;
                var responseObject = (0, _fastXmlParser2.default)(response);
                if (responseObject && responseObject.serviceexceptionreport && responseObject.serviceexceptionreport.serviceexception) {
                    var gkterror = responseObject.serviceexceptionreport.serviceexception.split('\n');
                    return message + '<br>' + gkterror[2] + ' ' + gkterror[3].substr(0, gkterror[3].indexOf(' Token:'));
                }
            }
        } catch (err) {
            return err;
        }
        return message;
    };

    CustomMessageHandler.prototype.show = function () {
        var self = this;
        if (self.visible) {
            return;
        }
        self.visible = true;
        self.el.innerHTML = '';
        self.el.style.opacity = 1;
        self.el.style.visibility = 'visible';
        if (!self.looping) {
            self.looping = true;
            self.loopMessages();
        }
    };

    CustomMessageHandler.prototype.hide = function () {
        var self = this;
        if (!self.visible) {
            return;
        }
        self.looping = false;
        self.visible = false;
        self.el.style.opacity = 0;
        setTimeout(function () {
            self.el.style.visibility = 'hidden';
        }, 2000);
    };

    CustomMessageHandler.prototype.loopMessages = function (self) {
        if (self === undefined) {
            self = this;
        }
        if (self.messages.length > 0) {
            self.el.innerHTML = _message + self.messages.pop();
            setTimeout(function () {
                self.loopMessages(self);
            }, 1000);
        } else {
            self.hide();
        }
    };

    return {
        // Start up start
        Init: init,
        InitMessage: initMessage,
        // Start up end
        ShowCustomMessage: showCustomMessage
    };
};
var Wms = exports.Wms = function Wms(isySubLayer, parameters) {
    var url;
    var urls;
    var getUrlParameter = function getUrlParameter(url) {
        var urlParameter = '';
        if (parameters) {
            for (var index in parameters) {
                if (urlParameter.length > 0) {
                    urlParameter += '&';
                }
                urlParameter += index + '=' + parameters[index];
            }
            if (url.indexOf('?') > 0) {
                url += '&';
            } else {
                url += '?';
            }
            url += urlParameter;
        }
        return url;
    };
    if (Array.isArray(isySubLayer.url)) {
        urls = isySubLayer.url;
        for (var i = 0; i < urls.length; i++) {
            urls[i] = getUrlParameter(urls[i]);
        }
    } else {
        url = isySubLayer.url;
        url = getUrlParameter(url);
    }
    var source;

    if (isySubLayer.tiled) {
        source = new _source.TileWMS({
            params: {
                LAYERS: isySubLayer.name,
                VERSION: "1.1.1",
                FORMAT: isySubLayer.format,
                STYLES: isySubLayer.styles || ''
            },
            url: url,
            urls: urls,
            crossOrigin: isySubLayer.crossOrigin,
            transparent: isySubLayer.transparent,
            minResolution: isySubLayer.minResolution,
            maxResolution: isySubLayer.maxResolution
        });
        source.set('type', 'ol.source.TileWMS');
    } else {
        if (url === undefined) {
            url = urls[urls.length - 1];
        }
        source = new _source.ImageWMS({
            params: {
                LAYERS: isySubLayer.name,
                VERSION: "1.1.1",
                FORMAT: isySubLayer.format,
                STYLES: isySubLayer.styles || ''
            },
            ratio: 1,
            url: url,
            crossOrigin: isySubLayer.crossOrigin,
            transparent: isySubLayer.transparent,
            minResolution: isySubLayer.minResolution,
            maxResolution: isySubLayer.maxResolution
        });
        source.set('type', 'ol.source.ImageWMS');
    }
    return source;
};
var Wmts = exports.Wmts = function Wmts(isySubLayer, parameters) {
    var projection = new _Projection2.default({
        code: isySubLayer.coordinate_system,
        extent: isySubLayer.extent,
        units: isySubLayer.extentUnits
    });
    var getUrlParameter = function getUrlParameter() {
        var urlParameter = '';
        if (parameters) {
            for (var index in parameters) {
                urlParameter += '&' + index + '=' + parameters[index];
            }
        }
        return urlParameter;
    };

    var matrixSet = isySubLayer.matrixSet;
    if (matrixSet === null || matrixSet === '' || matrixSet === undefined) {
        matrixSet = isySubLayer.matrixPrefix ? isySubLayer.coordinate_system : parseInt(isySubLayer.coordinate_system.substr(isySubLayer.coordinate_system.indexOf(':') + 1), 10);
    }

    var urls = isySubLayer.url;
    for (var i = 0; i < urls.length; i++) {
        urls[i] += getUrlParameter();
    }

    var source, sourceOptions;
    var projectionExtent = projection.getExtent();
    var wmtsExtent = isySubLayer.wmtsExtent ? isySubLayer.wmtsExtent.split(',') : projectionExtent;
    if (isySubLayer.getCapabilities) {
        var capabilitiesUrl = urls[0] + '&Request=GetCapabilities&Service=WMTS&Version=1.0.0';
        var capabilities = _jquery2.default.ajax({
            type: "GET",
            url: capabilitiesUrl,
            async: false
        }).responseText;
        var parser = new _WMTSCapabilities2.default();
        capabilities = parser.read(capabilities);
        capabilities.Contents.Layer.forEach(function (layer) {
            if (layer.Identifier === isySubLayer.name) {
                layer.WGS84BoundingBox = undefined;
            }
        });
        sourceOptions = _WMTS2.default.optionsFromCapabilities(capabilities, {
            layer: isySubLayer.name,
            matrixSet: matrixSet,
            requestEncoding: 'KVP'
        });
        sourceOptions.tileGrid = new _WMTS4.default({
            extent: wmtsExtent,
            origin: sourceOptions.tileGrid.getOrigin(0),
            resolutions: sourceOptions.tileGrid.getResolutions(),
            matrixIds: sourceOptions.tileGrid.getMatrixIds(),
            tileSize: sourceOptions.tileGrid.getTileSize(0)
        });
    } else {
        var size = (0, _extent.getWidth)(projectionExtent) / 256;
        var resolutions = new Array(isySubLayer.numZoomLevels);
        var matrixIds = new Array(isySubLayer.numZoomLevels);
        for (var z = 0; z < isySubLayer.numZoomLevels; ++z) {
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = isySubLayer.matrixPrefix ? matrixSet + ":" + z : matrixIds[z] = z;
        }
        sourceOptions = {
            layer: isySubLayer.name,
            format: isySubLayer.format,
            matrixSet: matrixSet,
            crossOrigin: isySubLayer.crossOrigin,
            tileGrid: new _WMTS4.default({
                extent: wmtsExtent,
                origin: (0, _extent.getTopLeft)(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            style: 'default',
            wrapX: true
        };
    }
    sourceOptions.projection = projection;
    sourceOptions.urls = urls;
    source = new _WMTS2.default(sourceOptions);
    source.set('type', 'ol.source.WMTS');

    return source;
};
var Vector = exports.Vector = function Vector(isySubLayer) {
    var source;
    switch (isySubLayer.format) {
        default:
        case _Domain.FORMATS.geoJson:
            source = new _source.Vector({
                format: new _format.GeoJSON({
                    defaultDataProjection: isySubLayer.coordinate_system
                }),
                url: isySubLayer.url
            });
            source.set('type', 'ol.source.Vector');
            break;
    }

    return source;
};
var Wfs = exports.Wfs = function Wfs(isySubLayer, offline, parameters, featureObj, eventHandler) {
    /* jshint -W024 */
    var strategy;
    //isySubLayer.tiled = true; // todo: just for testing, remove before merge!

    if (isySubLayer.tiled) {
        var newMapRes = [];
        newMapRes[0] = 21664;
        for (var t = 1; t < 18; t++) {
            newMapRes[t] = newMapRes[t - 1] / 2;
        }
        strategy = (0, _loadingstrategy.tile)(new _TileGrid2.default({
            origin: [0, 0, 0],
            resolutions: newMapRes
            //strategy = loadingstrategy.tile(new tilegrid.XYZ({
            //maxZoom: 19
        }));
    } else {
        strategy = _loadingstrategy.bbox;
    }
    var projection = (0, _proj.get)(isySubLayer.coordinate_system);

    var parseResponse = function parseResponse(response) {
        source.dispatchEvent('vectorloadend');
        var featureNamespace;

        if (typeof source.format === 'undefined') {
            var gmlFormat;
            switch (isySubLayer.version) {
                case '1.0.0':
                    gmlFormat = new _GML2.default();
                    break;
                case '1.1.0':
                    gmlFormat = new _GML4.default();
                    break;
                case '2.0.0':
                    gmlFormat = new _GML4.default();
                    break;
                default:
                    gmlFormat = new _format.GML();
                    break;
            }

            // TODO: Remove this gigahack when the number of returned coordinates is static (or implement an algorithm that can find the dimension dynamically).
            if (isySubLayer.srs_dimension && isySubLayer.srs_dimension.length > 0) {
                featureNamespace = response.firstChild.firstElementChild.firstElementChild.namespaceURI;
                source.format = new _format.WFS({
                    featureType: response.firstChild.firstElementChild.firstElementChild.localName,
                    featureNS: featureNamespace,
                    gmlFormat: gmlFormat
                });
            } else {
                featureNamespace = response.firstChild.namespaceURI;
                source.format = new _format.WFS({
                    featureType: isySubLayer.name,
                    featureNS: featureNamespace,
                    gmlFormat: gmlFormat
                });
            }
        }
        if (isySubLayer.srs_dimension === "3") {
            featureNamespace = response.firstChild.firstElementChild.firstElementChild.namespaceURI;
            if (response.firstChild.nodeName.toLowerCase() === "gml:featurecollection") {
                for (var i = 0; i < response.firstChild.childNodes.length; i++) {
                    var member = response.firstChild.childNodes.item(i);
                    if (member.nodeName.toLowerCase() === "gml:featuremember") {
                        for (var j = 0; j < member.childNodes.length; j++) {
                            var feature = member.childNodes.item(j);
                            if (feature.nodeName.toLowerCase() === isySubLayer.name.toLowerCase()) {
                                for (var k = 0; k < feature.childNodes.length; k++) {
                                    var attribute = feature.childNodes.item(k);
                                    for (var l = 0; l < attribute.childNodes.length; l++) {
                                        var attributeType = attribute.childNodes.item(l).nodeName;
                                        if (attributeType.toLowerCase() === "gml:linestring" || attributeType.toLowerCase() === "gml:point") {
                                            var srsAttribute = document.createAttribute("srsDimension");
                                            srsAttribute.value = isySubLayer.srs_dimension;
                                            attribute.firstElementChild.attributes.setNamedItem(srsAttribute);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        var features = source.format.readFeatures(response);
        //
        //var featureIsValid = function (feature){
        //    var geometryIsOk = false;
        //    var getZCoordinate = function (c) {
        //        if (Array.isArray(c)) {
        //            return getZCoordinate(c[c.length - 1]);
        //        }
        //        return c;
        //    };
        //    var geometry = feature.getGeometry();
        //    var coords = geometry.getCoordinates();
        //    var z = getZCoordinate(coords);
        //    if (!isNaN(z)){
        //        geometryIsOk = true;
        //    }
        //    return geometryIsOk;
        //};

        if (features && features.length > 0) {
            //var featureIsOk = true;
            //if (!featureIsValid(features[0])) {
            //    if (console && console.log) {
            //        featureIsOk = false;
            //        console.log(isySubLayer.name + ' does not have valid coordinates!');
            //    }
            //}
            features.forEach(function (featureitem) {
                featureitem.set("layerguid", isySubLayer.id);
                //if (!featureIsOk){
                //    var geometry = featureitem.getGeometry();
                //    var coords = geometry.getCoordinates().join(',').split(',');
                //    var newcoords = [];
                //    for (var i = 0; i < coords.length; i+=2){
                //        if(!isNaN(coords[i])) {
                //            newcoords.push([parseFloat(coords[i]), parseFloat(coords[i + 1]), 0]);
                //        }
                //    }
                //    geometry.setCoordinates(newcoords);
                //}
                //if (featureObj) {
                //    if (featureObj.getId() === featureitem.getId()) {
                //        featureObj = featureitem;
                //    }
                //}
            });
            source.addFeatures(features);
        }

        if (features.length > 0) {
            isySubLayer.geometryName = features[0].getGeometryName();
        }
        isySubLayer.featureNS = featureNamespace;

        if (featureObj) {
            if (eventHandler) {
                eventHandler.TriggerEvent(_EventHandler.EventTypes.RefreshSourceDone, featureObj);
            }
        }
    };

    var loader = function loader(extent) {
        source.dispatchEvent('vectorloadstart');
        var url = isySubLayer.url;
        if (Array.isArray(isySubLayer.url)) {
            url = isySubLayer.url[0];
        }
        if (url.toLowerCase().indexOf("service=wfs") < 0) {
            url += "service=WFS&";
        }
        url += 'request=GetFeature&' + 'version=' + isySubLayer.version + '&typename=' + isySubLayer.name + '&' + 'srsname=' + isySubLayer.coordinate_system + '&' + 'bbox=' + extent.join(',');

        if (parameters) {
            // source is refreshed
            for (var index in parameters) {
                url += '&' + index + '=' + parameters[index];
            }
        }
        var isCaching = source.get('caching');
        if (isCaching || offline.IsActive()) {
            // We are either offline or in caching mode
            // problem finding unique key here, using extent og zoom for now
            //var key = view.getZoom() + '-' + extent[0] + '-' + extent[1];
            var key = extent[0] + '-' + extent[1];
            // todo: should not use zoom in key, but rather cache the tiles from outmost zoom level
            offline.GetLayerResource(key, isySubLayer.name, url, parseResponse);
        } else {
            _jquery2.default.ajax({
                url: url
            }).done(function (response) {
                if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object') {
                    if (response.firstChild.childElementCount === 0) {
                        return;
                    }
                } else {
                    return;
                }
                parseResponse(response);
            });
        }
    };

    var source = new _source.Vector({
        loader: loader,
        strategy: strategy,
        projection: projection
    });
    source.set('type', 'ol.source.Vector');

    //// v3.11.2 bugfix:
    //if (source.getProjection() === null){
    //    if (source.setProjection) {
    //        source.setProjection(projection);
    //    } else if (source.f !== undefined) {
    //        source.f = projection;
    //    }
    //}

    return source;
};
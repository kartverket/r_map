"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messaging = void 0;

var _geom = require("ol/geom");

var _LinearRing = _interopRequireDefault(require("ol/geom/LinearRing"));

var _Overlay = _interopRequireDefault(require("ol/Overlay"));

var _Feature = _interopRequireDefault(require("ol/Feature"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import { Icon } from 'ol/style'
var Messaging = function Messaging() {
  _classCallCheck(this, Messaging);
};

exports.Messaging = Messaging;

_defineProperty(Messaging, "postMessage", function (msg) {
  window.parent.postMessage(JSON.stringify(msg), '*');
});

_defineProperty(Messaging, "listener", function (event) {
  if (event.origin === "http://localhost:3000" || "http://skrivte57.statkart.no" || "http:://geonorge.no" || "http://labs.norgeskart.no" || "https://register.geonorge.no/" || "http://www.kartverket.no/" || "https://www.norgeskart.no/") {
    try {
      var json = JSON.parse(JSON.stringify(event.data));

      if (json) {
        if (json.cmd === 'setCenter') {
          window.olMap.getView().setCenter([json.x, json.y]);
          window.olMap.getView().setZoom(json.zoom);
        } else if (json.cmd === 'setVisible' || json.cmd === 'setBasemap') {
          if (json.cmd === 'setBasemap') {
            for (var m in window.olMap.layers) {
              if (window.olMap.layers[m].isUrlDataLayer) continue;
              if (window.olMap.layers[m].isBasemap) continue; // europe base map is actually always on

              window.olMap.layers[m].setVisibility(false);
            }
          }

          var candidates = window.olMap.getLayersByName(json.id);

          if (candidates.length > 0) {
            candidates[0].setVisibility(true);
          } else {
            candidates = window.olMap.getLayersBy("shortid", json.id);

            if (candidates.length > 0) {
              candidates[0].setVisibility(true);
            }
          }

          this.postMessage({
            "type": "result",
            "cmd": json.cmd,
            "affected": candidates.length
          });
        } else if (json.cmd === 'addDataSource') {
          this.parseParamsAndAddDataLayerFromUrl([json.type, json.url]);
        } else if (json.cmd === 'setVisibleVectorLayer') {
          var vectorLayers = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice();

          for (var i = 0, j = vectorLayers.length; i < j; i += 1) {
            var layer = vectorLayers[i];

            if (layer.shortid === json.shortid) {
              layer.setVisibility(true);

              if (layer.preferredBackground) {
                var rasterLayers = window.olMap.getLayersByClass("OpenLayers.Layer.WMTS");

                for (var k = 0, _l = rasterLayers.length; k < _l; k += 1) {
                  var raster = rasterLayers[k];

                  if (raster.shortid === layer.preferredBackground) {
                    raster.setVisibility(true);
                  } else if (!raster.isBaseLayer) {
                    raster.setVisibility(false);
                  }
                }
              }
            } else {
              layer.setVisibility(false);
            }
          }
        } else if (json.cmd === 'getFeatures') {
          if (json.layer) {
            var layers = window.olMap.getLayersBy('shortid', json.layer);

            if (layers.length > 0) {
              var _layer = layers[0];
              var features = this.getFeaturesInLayer(_layer);
              this.postMessage({
                "type": "layerFeatures",
                "layer": _layer.shortid,
                "features": features
              });
            } else {
              this.postMessage({
                "type": "error",
                "message": "no such layer"
              });
            }
          } else {
            var _vectorLayers = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice();

            var _layers = [];

            for (var _i = 0, _j = _vectorLayers.length; _i < _j; _i += 1) {
              var _layer2 = _vectorLayers[_i];

              _layers.push({
                "layer": _layer2.shortid,
                "features": this.getFeaturesInLayer(_layer2)
              });
            }

            this.postMessage({
              "type": "features",
              "layers": _layers
            });
          }
        } else if (json.cmd === 'getVisibleFeatures') {
          if (json.layer) {
            var _layers2 = window.olMap.getLayersBy('shortid', json.layer);

            if (_layers2.length > 0) {
              var _layer3 = _layers2[0];

              var _features = this.getVisibleFeaturesInLayer(_layer3);

              this.postMessage({
                "type": "layerVisibleFeatures",
                "layer": _layer3.shortid,
                "features": _features
              });
            } else {
              this.postMessage({
                "type": "error",
                "message": "no such layer"
              });
            }
          } else {
            var _vectorLayers2 = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice();

            var _layers3 = [];

            for (var _i2 = 0, _j2 = _vectorLayers2.length; _i2 < _j2; _i2 += 1) {
              var _layer4 = _vectorLayers2[_i2];

              _layers3.push({
                "layer": _layer4.shortid,
                "features": this.getVisibleFeaturesInLayer(_layer4)
              });
            }

            this.postMessage({
              "type": "visibleFeatures",
              "layers": _layers3
            });
          }
        } else if (json.cmd === 'selectFeature') {
          var _layers4 = window.olMap.getLayersBy('shortid', json.layer);

          var feature = null;
          var selector = null;

          if (_layers4.length > 0) {
            var _layer5 = _layers4[0];
            feature = _layer5.getFeatureByFid(json.feature);

            if (feature) {
              var controls = _layer5.map.getControlsByClass('OpenLayers.Control.SelectFeature');

              for (var _i3 = 0, _j3 = controls.length; _i3 < _j3 && selector === null; _i3 += 1) {
                if (controls[_i3].layer.shortid === _layer5.shortid) {
                  if (controls[_i3].click) {
                    // ensure the correct control is used
                    selector = controls[_i3];
                  }
                }
              }
            }
          }

          if (feature !== null && selector !== null) {
            if (json.panAndZoom && feature.geometry.bounds) {
              feature.layer.map.zoomToExtent(feature.geometry.bounds);
            }

            selector.clickFeature.call(selector, feature);
          } else {
            this.postMessage({
              "type": "error",
              "message": "no such layer or feature"
            });
          }
        } else if (json.cmd === 'setBoundingBox') {
          var draw = window.olMap.getControlsByClass('OpenLayers.Control.Draw')[0];

          if (!!draw) {
            var l = json.bounds[0],
                b = json.bounds[1],
                r = json.bounds[2],
                t = json.bounds[3];
            var polygon = new _geom.Polygon([new _LinearRing.default([new _geom.Point(l, b), new _geom.Point(r, b), new _geom.Point(r, t), new _geom.Point(l, t), new _geom.Point(l, b)])]);

            var _feature = new _Feature.default(polygon);

            draw.displayBBoxFeature(_feature);
          }
        } else if (json.cmd === 'addMarker') {
          var marker = new _Overlay.default({
            position: [json.x, json.y],
            positioning: 'center-center',
            element: document.getElementById('marker'),
            stopEvent: false
          });
          window.olMap.addOverlay(marker);
          /*
            var size = [20, 25]
            var offset = [-(size.w / 2), -size.h]
            var icon = new Icon('/theme/norgeskart/img/embed-marker.png', size, offset)
           */
        } else if (json.cmd === 'clearMarkers') {
          var markerLayersForClearing = window.olMap.getLayersByClass("OpenLayers.Layer.Markers").slice();

          for (var _i4 = 0, _j4 = markerLayersForClearing.length; _i4 < _j4; _i4 += 1) {
            markerLayersForClearing[_i4].destroy();
          }
        } else if (json.cmd === 'removeMarker') {
          var markerLayersForRemoving = window.olMap.getLayersByClass("OpenLayers.Layer.Markers").slice();

          for (var _i5 = 0, _j5 = markerLayersForRemoving.length; _i5 < _j5; _i5 += 1) {
            markerLayersForRemoving[_i5].removeMarker(json.x + ',' + json.y);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
});

_defineProperty(Messaging, "parseParamsAndAddDataLayerFromUrl", function (params) {
  var type, url;
  type = params[0];
  url = params[1];

  if (url.indexOf("%") > -1) {
    // you can URL-encode or escape or both
    url = decodeURIComponent(url);
  }

  switch (type) {
    case 'geojson':
      this.addGeoJsonLayer(url, "4326", null, true); //defaults to WGS84 as per standard definition

      break;

    case 'sosi':
      this.addSOSILayer(url, true);
      break;

    case 'drawing':
      this.addGeoJsonLayer(url, "32633", {
        'isDrawing': true
      });
      break;

    case 'bbox':
      this.addBboxLayer(url);
      break;

    case 'wms':
      this.addWMSLayer(url);
      break;

    case 'wfs':
      this.addWFSLayer(url);
      break;

    case 'wcs':
      console.warn("Cannot display WCS directly. Use a Portrayal Service WMS with WCS as data layer.<br/>Syntax: /l/wms/[URL to portrayal]/d/wcs/[URL to data]");
      break;

    default:
      break;
  }
});

_defineProperty(Messaging, "getFeaturesInLayer", function (layer) {
  var features = [],
      feature;

  for (var i = 0, j = layer.features.length; i < j; i += 1) {
    feature = {};
    feature.fid = layer.features[i].fid;
    feature['attributes'] = layer.features[i]['attributes'];
    features.push(feature);
  }

  return features;
});

_defineProperty(Messaging, "getVisibleFeaturesInLayer", function (layer) {
  var features = [],
      feature;

  for (var i = 0, j = layer.features.length; i < j; i += 1) {
    if (layer.features[i].getVisibility() && layer.features[i].onScreen()) {
      feature = {};
      feature.fid = layer.features[i].fid;
      feature['attributes'] = layer.features[i]['attributes'];
      features.push(feature);
    }
  }

  return features;
});
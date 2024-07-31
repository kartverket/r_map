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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//import { Icon } from 'ol/style'

class Messaging {}
exports.Messaging = Messaging;
_defineProperty(Messaging, "postMessage", function (msg) {
  window.parent.postMessage(JSON.stringify(msg), '*');
});
_defineProperty(Messaging, "listener", function (event) {
  if (event.origin === "http://localhost:3000" || "http://skrivte57.statkart.no" || "http:://geonorge.no" || "http://labs.norgeskart.no" || "https://register.geonorge.no/" || "http://www.kartverket.no/" || "https://www.norgeskart.no/") {
    try {
      let json = JSON.parse(JSON.stringify(event.data));
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
          const vectorLayers = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice();
          for (let i = 0, j = vectorLayers.length; i < j; i += 1) {
            let layer = vectorLayers[i];
            if (layer.shortid === json.shortid) {
              layer.setVisibility(true);
              if (layer.preferredBackground) {
                let rasterLayers = window.olMap.getLayersByClass("OpenLayers.Layer.WMTS");
                for (let k = 0, l = rasterLayers.length; k < l; k += 1) {
                  let raster = rasterLayers[k];
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
            let layers = window.olMap.getLayersBy('shortid', json.layer);
            if (layers.length > 0) {
              let layer = layers[0];
              let features = this.getFeaturesInLayer(layer);
              this.postMessage({
                "type": "layerFeatures",
                "layer": layer.shortid,
                "features": features
              });
            } else {
              this.postMessage({
                "type": "error",
                "message": "no such layer"
              });
            }
          } else {
            let vectorLayers = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice();
            let layers = [];
            for (let i = 0, j = vectorLayers.length; i < j; i += 1) {
              let layer = vectorLayers[i];
              layers.push({
                "layer": layer.shortid,
                "features": this.getFeaturesInLayer(layer)
              });
            }
            this.postMessage({
              "type": "features",
              "layers": layers
            });
          }
        } else if (json.cmd === 'getVisibleFeatures') {
          if (json.layer) {
            let layers = window.olMap.getLayersBy('shortid', json.layer);
            if (layers.length > 0) {
              let layer = layers[0];
              let features = this.getVisibleFeaturesInLayer(layer);
              this.postMessage({
                "type": "layerVisibleFeatures",
                "layer": layer.shortid,
                "features": features
              });
            } else {
              this.postMessage({
                "type": "error",
                "message": "no such layer"
              });
            }
          } else {
            let vectorLayers = window.olMap.getLayersByClass("OpenLayers.Layer.Vector").slice();
            let layers = [];
            for (let i = 0, j = vectorLayers.length; i < j; i += 1) {
              let layer = vectorLayers[i];
              layers.push({
                "layer": layer.shortid,
                "features": this.getVisibleFeaturesInLayer(layer)
              });
            }
            this.postMessage({
              "type": "visibleFeatures",
              "layers": layers
            });
          }
        } else if (json.cmd === 'selectFeature') {
          let layers = window.olMap.getLayersBy('shortid', json.layer);
          let feature = null;
          let selector = null;
          if (layers.length > 0) {
            let layer = layers[0];
            feature = layer.getFeatureByFid(json.feature);
            if (feature) {
              let controls = layer.map.getControlsByClass('OpenLayers.Control.SelectFeature');
              for (let i = 0, j = controls.length; i < j && selector === null; i += 1) {
                if (controls[i].layer.shortid === layer.shortid) {
                  if (controls[i].click) {
                    // ensure the correct control is used
                    selector = controls[i];
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
            let feature = new _Feature.default(polygon);
            draw.displayBBoxFeature(feature);
          }
        } else if (json.cmd === 'addMarker') {
          const marker = new _Overlay.default({
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
          for (let i = 0, j = markerLayersForClearing.length; i < j; i += 1) {
            markerLayersForClearing[i].destroy();
          }
        } else if (json.cmd === 'removeMarker') {
          var markerLayersForRemoving = window.olMap.getLayersByClass("OpenLayers.Layer.Markers").slice();
          for (let i = 0, j = markerLayersForRemoving.length; i < j; i += 1) {
            markerLayersForRemoving[i].removeMarker(json.x + ',' + json.y);
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
_defineProperty(Messaging, "getFeaturesInLayer", layer => {
  let features = [],
    feature;
  for (let i = 0, j = layer.features.length; i < j; i += 1) {
    feature = {};
    feature.fid = layer.features[i].fid;
    feature['attributes'] = layer.features[i]['attributes'];
    features.push(feature);
  }
  return features;
});
_defineProperty(Messaging, "getVisibleFeaturesInLayer", layer => {
  let features = [],
    feature;
  for (let i = 0, j = layer.features.length; i < j; i += 1) {
    if (layer.features[i].getVisibility() && layer.features[i].onScreen()) {
      feature = {};
      feature.fid = layer.features[i].fid;
      feature['attributes'] = layer.features[i]['attributes'];
      features.push(feature);
    }
  }
  return features;
});
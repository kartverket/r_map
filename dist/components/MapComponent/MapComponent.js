"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _communication = require("../../Utils/communication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MapComponent = function MapComponent(props) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      wms = _useState2[0],
      setWMS = _useState2[1];

  var queryValues = _queryString.default.parse(window.location.search);

  var internMap = _maplibHelper.map;
  _maplibHelper.mapConfig.coordinate_system = queryValues['crs'] || props.crs;
  var lon = Number(queryValues["lon"] || props.lon);
  var lat = Number(queryValues["lat"] || props.lat);
  var zoom = Number(queryValues["zoom"] || props.zoom);
  var newMapConfig = Object.assign({}, _maplibHelper.mapConfig, {
    center: [lon, lat],
    zoom: zoom
  });
  (0, _react.useLayoutEffect)(function () {
    window.olMap = internMap.Init("map", newMapConfig);
    internMap.AddZoom();
    internMap.AddScaleLine();

    _maplibHelper.eventHandler.RegisterEvent("MapMoveend", updateMapInfoState);

    addWMS();
    window.olMap.on('click', function (evt) {
      var feature = window.olMap.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        return feature;
      });

      if (feature) {
        var coord = feature.getGeometry().getCoordinates();
        var content = feature.get('n');
        var message = {
          cmd: 'featureSelected',
          featureId: feature.getId(),
          properties: content,
          coordinates: coord
        };

        _communication.Messaging.postMessage(JSON.stringify(message));
      }
    });
  }, [internMap]);

  var updateMapInfoState = function updateMapInfoState() {
    var center = _maplibHelper.map.GetCenter();

    var queryValues = _queryString.default.parse(window.location.search); //this.props = { lon: center.lon, lat: center.lat, zoom: center.zoom }


    queryValues.lon = center.lon;
    queryValues.lat = center.lat;
    queryValues.zoom = center.zoom;
    (0, _setQueryString.default)(queryValues);
  };

  var addWMS = function addWMS() {
    props.services.forEach(function (service) {
      var meta = {};

      switch (service.DistributionProtocol) {
        case 'WMS':
        case 'WMS-tjeneste':
        case 'OGC:WMS':
          _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(service.GetCapabilitiesUrl).then(function (capa) {
            meta = _CapabilitiesUtil.CapabilitiesUtil.getWMSMetaCapabilities(capa);
            meta.Type = 'OGC:WMS';
            meta.Params = service.customParams || '';

            if (service.addLayers.length > 0) {
              var layersToBeAdded = [];
              layersToBeAdded = capa.Capability.Layer.Layer.filter(function (e) {
                return service.addLayers.includes(e.Name);
              });

              if (layersToBeAdded.length === 0 || layersToBeAdded.length !== service.addLayers.length) {
                layersToBeAdded = [];
                service.addLayers.forEach(function (layerName) {
                  layersToBeAdded.push({
                    Name: layerName
                  });
                });
              }

              layersToBeAdded.forEach(function (layer) {
                var laycapaLayerer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromWmsCapabilities(meta, layer);

                window.olMap.addLayer(laycapaLayerer);
              });
            }
          }).then(function (layers) {
            console.log('Added wms layers ready');
          }).catch(function (e) {
            return console.warn(e);
          });

          break;

        case 'GEOJSON':
          _CapabilitiesUtil.CapabilitiesUtil.getGeoJson(service.url).then(function (layers) {
            meta.Type = 'GEOJSON';
            meta.ShowPropertyName = service.ShowPropertyName || 'id';
            meta.EPSG = service.EPSG || 'EPSG:4326';

            if (service.addLayers.length > 0) {
              if (layers.name === service.addLayers['0']) {
                var currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromGeoJson(meta, layers);

                window.olMap.addLayer(currentLayer);
              }
            }
          }).catch(function (e) {
            return console.warn(e);
          });

          break;

        default:
          console.warn('No service type specified');
          break;
      }
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    id: "map",
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: 0
    },
    tabIndex: "0"
  });
};

MapComponent.defaultProps = {
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  crs: 'EPSG:25833'
};
var _default = MapComponent;
exports.default = _default;
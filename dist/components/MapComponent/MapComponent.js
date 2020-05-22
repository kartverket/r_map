"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _communication = require("../../Utils/communication");

var MapComponent = function MapComponent(props) {
  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
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
    }
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
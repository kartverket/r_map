"use strict";

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapComponent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/inherits"));

var _defineProperty2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _communication = require("../../Utils/communication");

/**
 * @class The Map Component
 * @extends React.Component
 */
var MapComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(MapComponent, _React$Component);

  /**
   * The prop types.
   * @type {Object}
   */

  /**
   *
   *@constructs Map
   */
  function MapComponent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MapComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MapComponent).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateMapInfoState", function () {
      var center = _maplibHelper.map.GetCenter();

      var queryValues = _queryString.default.parse(window.location.search);

      _this.props = {
        lon: center.lon,
        lat: center.lat,
        zoom: center.zoom
      };
      queryValues.lon = center.lon;
      queryValues.lat = center.lat;
      queryValues.zoom = center.zoom;
      (0, _setQueryString.default)(queryValues);
    });

    var _queryValues = _queryString.default.parse(window.location.search);

    var lon = Number(_queryValues["lon"] || props.lon);
    var lat = Number(_queryValues["lat"] || props.lat);
    var zoom = Number(_queryValues["zoom"] || props.zoom);
    /*
    let wmts = Array(queryValues['wmts'] || [])
    let wfs = Array(queryValues['wfs'] || [])
    */
    //  this.props = { lon: lon, lat: lat, zoom: zoom };

    _maplibHelper.mapConfig.coordinate_system = _queryValues['crs'] || props.crs;
    _this.newMapConfig = Object.assign({}, _maplibHelper.mapConfig, {
      center: [lon, lat],
      zoom: zoom
    });
    return _this;
  }

  (0, _createClass2.default)(MapComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.olMap = _maplibHelper.map.Init("map", this.newMapConfig);

      _maplibHelper.map.AddZoom();

      _maplibHelper.map.AddScaleLine();

      _maplibHelper.eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);

      this.setState({
        map: _maplibHelper.map
      });
      this.addWMS();
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
    }
  }, {
    key: "addWMS",
    value: function addWMS() {
      var _this2 = this;

      this.props.services.forEach(function (service) {
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
              _this2.setState({
                wmsLayers: layers
              });
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
              return console.log(e);
            });

            break;

          default:
            console.warn('No service type specified');
            break;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        id: "map",
        style: {
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0
        }
      });
    }
  }]);
  return MapComponent;
}(_react.default.Component);

exports.MapComponent = MapComponent;
(0, _defineProperty2.default)(MapComponent, "defaultProps", {
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  crs: 'EPSG:25833'
});
var _default = MapComponent;
exports.default = _default;
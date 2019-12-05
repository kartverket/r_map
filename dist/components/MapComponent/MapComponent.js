"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _MapComponent = _interopRequireDefault(require("./MapComponent.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @class The Map Component
 * @extends React.Component
 */
var MapComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MapComponent, _React$Component);

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

    _classCallCheck(this, MapComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapComponent).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "updateMapInfoState", function () {
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

  _createClass(MapComponent, [{
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
                var layersToBeAdded = capa.Capability.Layer.Layer.filter(function (e) {
                  return service.addLayers.includes(e.Name);
                });
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
        className: _MapComponent.default.mapContainer
      }, _react.default.createElement("div", {
        id: "map",
        style: {
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0
        }
      }));
    }
  }]);

  return MapComponent;
}(_react.default.Component);

exports.MapComponent = MapComponent;

_defineProperty(MapComponent, "propTypes", {
  /**
   * @type {Number}
   */
  lon: _propTypes.default.number,

  /**
   * @type {Number}
   */
  lat: _propTypes.default.number,

  /**
   * @type {Number}
   */
  zoom: _propTypes.default.number,

  /**
   * @type {Array}
   */
  services: _propTypes.default.arrayOf(_propTypes.default.object),
  crs: _propTypes.default.string
});

_defineProperty(MapComponent, "defaultProps", {
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  crs: 'EPSG:25833'
});

var _default = MapComponent;
exports.default = _default;
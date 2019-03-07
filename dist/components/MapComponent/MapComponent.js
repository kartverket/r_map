"use strict";

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapComponent = void 0;

var _classCallCheck2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/inherits"));

var _defineProperty2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _MapComponent = _interopRequireDefault(require("./MapComponent.scss"));

/**
 * @class The Map Component
 * @extends React.Component
 */
var MapComponent =
/*#__PURE__*/
function (_React$Component) {
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
    _this.state = {
      activeKey: '1'
    };

    var _queryValues = _queryString.default.parse(window.location.search);

    var lon = Number(_queryValues['lon'] || props.lon);
    var lat = Number(_queryValues['lat'] || props.lat);
    var zoom = Number(_queryValues['zoom'] || props.zoom);
    /*
    let wmts = Array(queryValues['wmts'] || [])
    let wfs = Array(queryValues['wfs'] || [])
    let epsg = queryValues['epsg'] || 'EPSG:3857'
    */
    //  this.props = { lon: lon, lat: lat, zoom: zoom };

    _this.newMapConfig = Object.assign({}, _maplibHelper.mapConfig, {
      center: [lon, lat],
      zoom: zoom
    });
    _this.olMap = null;
    return _this;
  }

  (0, _createClass2.default)(MapComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.olMap = _maplibHelper.map.Init('map', this.newMapConfig);

      _maplibHelper.map.AddZoom();

      _maplibHelper.map.AddScaleLine();

      _maplibHelper.eventHandler.RegisterEvent('MapMoveend', this.updateMapInfoState);

      this.props = {
        map: _maplibHelper.map
      };
      this.addWMS();
    }
  }, {
    key: "addWMS",
    value: function addWMS() {
      var _this2 = this;

      this.props.services.forEach(function (service) {
        _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(service.GetCapabilitiesUrl).then(_CapabilitiesUtil.CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
          if (service.addLayers.length > 0) {
            var layersToBeAdded = layers.filter(function (e) {
              return service.addLayers.includes(e.name);
            });
            layersToBeAdded.forEach(function (layer) {
              return _maplibHelper.map.AddLayer(layer);
            });
          }

          _this2.setState({
            wmsLayers: layers
          });
        }).catch(function (e) {
          return console.warn(e);
        });
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
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 0
        }
      }));
    }
  }]);
  return MapComponent;
}(_react.default.Component);

exports.MapComponent = MapComponent;
(0, _defineProperty2.default)(MapComponent, "defaultProps", {
  onMapViewChanges: function onMapViewChanges() {},
  onChangeLon: function onChangeLon() {},
  onChangeLat: function onChangeLat() {},
  onChangeZoom: function onChangeZoom() {},
  lon: 396722,
  lat: 7197860,
  zoom: 4
});
var _default = MapComponent;
exports.default = _default;
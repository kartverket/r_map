'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

require('bootstrap/dist/css/bootstrap.css');

require('bootstrap/dist/css/bootstrap-theme.css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _maplibHelper = require('./Maplib/maplibHelper');

var _MapHelper = require('./Utils/MapHelper');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _setQueryString = require('set-query-string');

var _setQueryString2 = _interopRequireDefault(_setQueryString);

require('ol/ol.css');

var _Layerswitch = require('./Components/Layerswitch');

var _AddWmsPanel = require('./Components/AddWmsPanel');

var _olUtil = require('@terrestris/ol-util');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class The Map Component
 * @extends React.Component
 */
var Map = (_temp = _class = function (_React$Component) {
  _inherits(Map, _React$Component);

  /**
   * 
   *@constructs Map
   */
  function Map(props) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    var queryValues = _queryString2.default.parse(window.location.search);

    var lon = Number(queryValues["lon"] || props.lon);
    var lat = Number(queryValues["lat"] || props.lat);
    var zoom = Number(queryValues["zoom"] || props.zoom);

    _this.wms = queryValues["wms"] || "";
    _this.layers = Array(queryValues["layers"] || []);
    /*
    let wmts = Array(queryValues["wmts"] || []);
    let wfs = Array(queryValues["wfs"] || []);
    let projectName = queryValues["project"] || "norgeskart";
    let epsg = queryValues["epsg"] || "EPSG:3857";
    */
    _this.props = { lon: lon, lat: lat, zoom: zoom };
    _this.newMapConfig = Object.assign({}, _maplibHelper.mapConfig, {
      center: [_this.props.lon, _this.props.lat],
      zoom: _this.props.zoom
    });
    _this.olMap = null;
    return _this;
  }

  /**
   * 
   */

  /**
   * The prop types.
   * @type {Object}
   */


  Map.prototype.componentDidMount = function componentDidMount() {
    if (this.props.wms) {
      this.addWMS(this.wms, this.layers);
    }
    this.olMap = _maplibHelper.map.Init("map", this.newMapConfig);
    _maplibHelper.map.AddZoom();
    _maplibHelper.map.AddScaleLine();
    _maplibHelper.eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);
    this.props = { map: _maplibHelper.map };
  };

  /**
   * 
   */


  /**
   * 
   */


  /**
   * 
   */
  Map.prototype.addWMS = function addWMS() {
    var _this2 = this;

    _olUtil.CapabilitiesUtil.parseWmsCapabilities(this.props.wms).then(_olUtil.CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
      _this2.setState({
        layers: layers
      });
    }).catch(function () {
      return alert("Could not parse capabilities document.");
    });
  };
  /**
   * 
   */


  Map.prototype.render = function render() {
    var layers = this.state.layers;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Navbar,
        null,
        _react2.default.createElement(_Layerswitch.Layerswitch, { map: _maplibHelper.map })
      ),
      _react2.default.createElement('div', { id: 'map', style: { height: "500px", width: "700px" } }),
      _react2.default.createElement(_AddWmsPanel.AddWmsPanel, {
        style: { position: "relative", height: "400px" },
        key: '1',
        map: this.olMap,
        wmsLayers: layers,
        draggable: true,
        width: 500,
        height: 400,
        x: 0,
        y: 100
      })
    );
  };

  return Map;
}(_react2.default.Component), _class.defaultProps = {
  onMapViewChanges: function onMapViewChanges() {},
  onChangeLon: function onChangeLon() {},
  onChangeLat: function onChangeLat() {},
  onChangeZoom: function onChangeZoom() {},
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  wms: ''
}, _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    layers: []
  };

  this.addWMS_ = function (url, layers) {
    if (url) {
      var newUrl = (0, _MapHelper.mergeDefaultParams)(url, {
        service: "WMS",
        request: "GetCapabilities"
      });
      fetch(newUrl).then(function (response) {
        return Promise.resolve(response.text());
      }).then(function (text) {
        var resultText = (0, _MapHelper.parseWmsCapabilities)(text);

        var _resultText = _extends({}, resultText),
            Service = _resultText.Service,
            Capability = _resultText.Capability;

        if (Capability) {
          var layerConfig = {
            type: "map",
            name: Capability.Layer[0].Abstract,
            url: Capability.Layer[0].url,
            params: {
              layers: layers,
              format: "image/png"
            },
            guid: "1.temakart",
            options: {
              isbaselayer: "true",
              singletile: "false",
              visibility: "true"
            }
          };
          var newLayerConfig = (0, _maplibHelper.addLayer2)(Service.Name, layerConfig);
          _maplibHelper.map.AddLayer(newLayerConfig);
        } else {
          // console.log('No capabilities!')
        }
      });
    } else {
      // console.log("No wms parameter given");
    }
  };

  this.updateMapInfoState = function () {
    var center = _maplibHelper.map.GetCenter();
    var queryValues = _queryString2.default.parse(window.location.search);
    _this3.props = { lon: center.lon, lat: center.lat, zoom: center.zoom };
    queryValues.lon = center.lon;
    queryValues.lat = center.lat;
    queryValues.zoom = center.zoom;
    (0, _setQueryString2.default)(queryValues);
  };
}, _temp);
exports.default = Map;
Map.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @type {Number}
   */
  lon: _propTypes2.default.number,
  /**
   * @type {Number}
   */
  lat: _propTypes2.default.number,
  /**
   * @type {Number}
   */
  zoom: _propTypes2.default.number,
  /**
   * @type {Function}
   */
  onChangeLon: _propTypes2.default.func,
  /** 
   * @type {Function}
   */
  onChangeLat: _propTypes2.default.func,
  /** 
   * @type {Function}
   */
  onChangeZoom: _propTypes2.default.func,
  /**
   * @type {Function} 
   */
  onMapViewChanges: _propTypes2.default.func,
  /**
   * @type {String}
   */
  wms: _propTypes2.default.string
} : {};
module.exports = exports['default'];
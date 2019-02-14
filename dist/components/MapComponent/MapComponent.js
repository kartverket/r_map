"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MapComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _MapHelper = require("../../Utils/MapHelper");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _BackgroundChooser = _interopRequireDefault(require("../BackgroundChooser/BackgroundChooser"));

var _AddWmsPanel = _interopRequireDefault(require("../AddWmsPanel/AddWmsPanel"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _MapComponent = _interopRequireDefault(require("./MapComponent.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ListItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ListItem, _React$Component);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(ListItem).apply(this, arguments));
  }

  _createClass(ListItem, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_AddWmsPanel.default, {
        key: "1",
        map: _maplibHelper.map,
        services: this.props.listItem,
        removeMapItem: this.props.removeMapItem,
        draggable: true
      });
    }
  }]);

  return ListItem;
}(_react.default.Component);
/**
 * @class The Map Component
 * @extends React.Component
 */


var MapComponent =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(MapComponent, _React$Component2);

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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      layers: []
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addWMS_", function (url, layers) {
      if (url) {
        var newUrl = (0, _MapHelper.mergeDefaultParams)(url, {
          service: "WMS",
          request: "GetCapabilities"
        });
        fetch(newUrl).then(function (response) {
          return Promise.resolve(response.text());
        }).then(function (text) {
          var resultText = (0, _MapHelper.parseWmsCapabilities)(text);

          var _resultText = _objectSpread({}, resultText),
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
            var newLayerConfig = (0, _maplibHelper.addLayer)(Service.Name, layerConfig);

            _maplibHelper.map.AddLayer(newLayerConfig);
          } else {// console.log('No capabilities!')
          }
        });
      } else {// console.log('No wms parameter given')
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateMapInfoState", function () {
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

    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      activeKey: "1",
      open: false,
      menu: _this.props.menu
    };

    var _queryValues = _queryString.default.parse(window.location.search);

    var lon = Number(_queryValues["lon"] || props.lon);
    var lat = Number(_queryValues["lat"] || props.lat);
    var zoom = Number(_queryValues["zoom"] || props.zoom);
    _this.wms = _queryValues["wms"] || "";
    _this.layers = Array(_queryValues["layers"] || []);
    /*
    let wmts = Array(queryValues['wmts'] || [])
    let wfs = Array(queryValues['wfs'] || [])
    let projectName = queryValues['project'] || 'norgeskart'
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
  /**
   *
   */


  _createClass(MapComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.wms) {
        this.addWMS(this.wms, this.layers);
      }

      this.olMap = _maplibHelper.map.Init("map", this.newMapConfig);

      _maplibHelper.map.AddZoom();

      _maplibHelper.map.AddScaleLine();

      _maplibHelper.eventHandler.RegisterEvent("MapMoveend", this.updateMapInfoState);

      this.props = {
        map: _maplibHelper.map
      };
    }
    /**
     *
     */

  }, {
    key: "addWMS",
    value: function addWMS() {
      var _this2 = this;

      _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl).then(_CapabilitiesUtil.CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
        _this2.setState({
          wmsLayers: layers
        });
      }).catch(function () {
        return alert("Could not parse capabilities document.");
      });
    }
  }, {
    key: "renderServiceList",
    value: function renderServiceList() {
      var _this3 = this;

      return this.props.services.map(function (listItem, i) {
        return _react.default.createElement(ListItem, {
          listItem: listItem,
          removeMapItem: _this3.props.removeMapItem ? _this3.props.removeMapItem : null,
          key: i,
          map: _maplibHelper.map
        });
      });
    }
  }, {
    key: "renderLayerButton",
    value: function renderLayerButton() {
      return this.props.services && this.props.services.length > 0;
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(activeKey) {
      this.setState({
        activeKey: activeKey
      });
    }
  }, {
    key: "toogleLayers",
    value: function toogleLayers() {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }
  }, {
    key: "toogleMap",
    value: function toogleMap() {
      console.log('lukke kartet');
      window.history.back(); // TODO: get paramtere to check for url til goto for closing map
    }
    /**
     *
     */

  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement("div", {
        className: _MapComponent.default.mapContainer
      }, _react.default.createElement(_BackgroundChooser.default, {
        map: _maplibHelper.map
      }), _react.default.createElement("div", null, this.renderLayerButton() ? _react.default.createElement("div", {
        className: this.state.isExpanded ? _MapComponent.default.container + ' closed' : _MapComponent.default.container + ' open'
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        onClick: function onClick() {
          return _this4.toogleLayers();
        },
        className: _MapComponent.default.toggleBtn,
        icon: this.state.isExpanded ? ['far', 'layer-group'] : 'times'
      }), _react.default.createElement("div", null, this.renderServiceList())) : _react.default.createElement("div", null, "G\xE5 til kartkatalogen"), _react.default.createElement("div", {
        className: _MapComponent.default.closeMap
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        title: "Lukk kartet",
        onClick: function onClick() {
          return _this4.toogleMap();
        },
        className: _MapComponent.default.toggleBtn,
        icon: 'times'
      }), _react.default.createElement("span", {
        className: _MapComponent.default.closeButtonLabel
      }, "Lukk kartet"))), _react.default.createElement("div", {
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
   * @type {Function}
   */
  onChangeLon: _propTypes.default.func,

  /**
   * @type {Function}
   */
  onChangeLat: _propTypes.default.func,

  /**
   * @type {Function}
   */
  onChangeZoom: _propTypes.default.func,

  /**
   * @type {Function}
   */
  onMapViewChanges: _propTypes.default.func,

  /**
   * @type {String}
   */
  wms: _propTypes.default.string,

  /**
   * @type {Array}
   */
  services: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   * @type {Boolean}
   */
  menu: _propTypes.default.bool
});

_defineProperty(MapComponent, "defaultProps", {
  onMapViewChanges: function onMapViewChanges() {},
  onChangeLon: function onChangeLon() {},
  onChangeLat: function onChangeLat() {},
  onChangeZoom: function onChangeZoom() {},
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  wms: "",
  menu: true
});

var _default = MapComponent;
exports.default = _default;
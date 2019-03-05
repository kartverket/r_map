"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _BackgroundChooser = _interopRequireDefault(require("../BackgroundChooser/BackgroundChooser"));

var _AddServicePanel = _interopRequireDefault(require("../AddServicePanel/AddServicePanel"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _MapContainer = _interopRequireDefault(require("./MapContainer.scss"));

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

var ListItem = function ListItem(props) {
  return _react.default.createElement(_AddServicePanel.default, {
    services: props.listItem,
    removeMapItem: props.removeMapItem,
    draggable: true
  });
};
/**
 * @class The Map Component
 * @extends React.Component
 */


var MapContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MapContainer, _React$Component);

  /**
   * The prop types.
   * @type {Object}
   */

  /**
   *
   *@constructs Map
   */
  function MapContainer(props) {
    var _this;

    _classCallCheck(this, MapContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      layers: []
    });

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

    _this.handleSelect = _this.handleSelect.bind(_assertThisInitialized(_this));
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

    var defaultConfig = JSON.parse(JSON.stringify(_maplibHelper.mapConfig));
    _this.newMapConfig = Object.assign({}, defaultConfig, {
      center: [lon, lat],
      zoom: zoom
    });
    return _this;
  }
  /**
   *
   */


  _createClass(MapContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.wms) {
        this.addWMS(this.wms, this.layers);
      }

      window.olMap = _maplibHelper.map.Init("map", this.newMapConfig);

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
      console.log("lukke kartet");
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
        className: _MapContainer.default.mapContainer
      }, _react.default.createElement(_BackgroundChooser.default, null), _react.default.createElement("div", null, this.renderLayerButton() ? _react.default.createElement("div", {
        className: this.state.isExpanded ? _MapContainer.default.container + " closed" : _MapContainer.default.container + " open"
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        onClick: function onClick() {
          return _this4.toogleLayers();
        },
        className: _MapContainer.default.toggleBtn,
        icon: this.state.isExpanded ? ["far", "layer-group"] : "times"
      }), _react.default.createElement("div", null, this.renderServiceList())) : _react.default.createElement("div", null, "G\xE5 til kartkatalogen"), _react.default.createElement("div", {
        className: _MapContainer.default.closeMap
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        title: "Lukk kartet",
        onClick: function onClick() {
          return _this4.toogleMap();
        },
        className: _MapContainer.default.toggleBtn,
        icon: "times"
      }), _react.default.createElement("span", {
        className: _MapContainer.default.closeButtonLabel
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

  return MapContainer;
}(_react.default.Component);

exports.default = MapContainer;

_defineProperty(MapContainer, "propTypes", {
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

_defineProperty(MapContainer, "defaultProps", {
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
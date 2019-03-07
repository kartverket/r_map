"use strict";

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/inherits"));

var _defineProperty2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _BackgroundChooser = _interopRequireDefault(require("../BackgroundChooser/BackgroundChooser"));

var _AddServicePanel = _interopRequireDefault(require("../AddServicePanel/AddServicePanel"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _MapContainer = _interopRequireDefault(require("./MapContainer.scss"));

/**
 *
 * @param {*} props
 */
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
  (0, _inherits2.default)(MapContainer, _React$Component);

  /**
   *
   *@constructs Map
   */
  function MapContainer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MapContainer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MapContainer).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      layers: []
    });
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
    _this.handleSelect = _this.handleSelect.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      activeKey: '1',
      open: false,
      menu: _this.props.menu
    };

    var _queryValues = _queryString.default.parse(window.location.search);

    var lon = Number(_queryValues['lon'] || props.lon);
    var lat = Number(_queryValues['lat'] || props.lat);
    var zoom = Number(_queryValues['zoom'] || props.zoom);
    _this.wms = _queryValues['wms'] || '';
    _this.layers = Array(_queryValues['layers'] || []);
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


  (0, _createClass2.default)(MapContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.wms) {
        this.addWMS(this.wms, this.layers);
      }

      window.olMap = _maplibHelper.map.Init('map', this.newMapConfig);

      _maplibHelper.map.AddZoom();

      _maplibHelper.map.AddScaleLine();

      _maplibHelper.eventHandler.RegisterEvent('MapMoveend', this.updateMapInfoState);

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
        return alert('Could not parse capabilities document.');
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
        className: _MapContainer.default.mapContainer
      }, _react.default.createElement(_BackgroundChooser.default, null), _react.default.createElement("div", null, this.renderLayerButton() ? _react.default.createElement("div", {
        className: this.state.isExpanded ? _MapContainer.default.container + ' closed' : _MapContainer.default.container + ' open'
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        onClick: function onClick() {
          return _this4.toogleLayers();
        },
        className: _MapContainer.default.toggleBtn,
        icon: this.state.isExpanded ? ['far', 'layer-group'] : 'times'
      }), _react.default.createElement("div", null, this.renderServiceList())) : _react.default.createElement("div", null, "G\xE5 til kartkatalogen"), _react.default.createElement("div", {
        className: _MapContainer.default.closeMap
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        title: "Lukk kartet",
        onClick: function onClick() {
          return _this4.toogleMap();
        },
        className: _MapContainer.default.toggleBtn,
        icon: 'times'
      }), _react.default.createElement("span", {
        className: _MapContainer.default.closeButtonLabel
      }, "Lukk kartet"))), _react.default.createElement("div", {
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
  return MapContainer;
}(_react.default.Component);

exports.default = MapContainer;
(0, _defineProperty2.default)(MapContainer, "defaultProps", {
  onMapViewChanges: function onMapViewChanges() {},
  onChangeLon: function onChangeLon() {},
  onChangeLat: function onChangeLat() {},
  onChangeZoom: function onChangeZoom() {},
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  wms: '',
  menu: true
});
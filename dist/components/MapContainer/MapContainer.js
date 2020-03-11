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

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _BackgroundChooser = _interopRequireDefault(require("../BackgroundChooser/BackgroundChooser"));

var _ServicePanel = _interopRequireDefault(require("../ServicePanel/ServicePanel"));

var _SearchBar = _interopRequireDefault(require("../SearchBar/SearchBar"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _MapContainerModule = _interopRequireDefault(require("./MapContainer.module.scss"));

var _Position = _interopRequireDefault(require("../Position/Position"));

var _Tabs = _interopRequireDefault(require("react-bootstrap/Tabs"));

var _Tab = _interopRequireDefault(require("react-bootstrap/Tab"));

var _FeatureInfoItem = _interopRequireDefault(require("../ServicePanel/FeatureInfoItem"));

require("ol/ol.css");

var ServiceListItem = function ServiceListItem(props) {
  return _react.default.createElement(_ServicePanel.default, {
    services: props.listItem,
    removeMapItem: props.removeMapItem,
    draggable: true
  });
};
/**
 * @class The Map Component
 * @extends React.Component
 */


var MapContainer = /*#__PURE__*/function (_React$Component) {
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

      queryValues.lon = center.lon;
      queryValues.lat = center.lat;
      queryValues.zoom = center.zoom;
      (0, _setQueryString.default)(queryValues);
    });
    _this.state = {
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
    */

    _maplibHelper.mapConfig.coordinate_system = _queryValues['crs'] || props.crs;
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
      window.olMap = _maplibHelper.map.Init("map", this.newMapConfig);

      _maplibHelper.map.AddZoom();

      _maplibHelper.map.AddScaleLine();
    }
    /**
     *
     */

  }, {
    key: "renderServiceList",
    value: function renderServiceList() {
      var _this2 = this;

      if (this.wms) {
        var addedWms = {
          'Title': 'Added WMS from url',
          'DistributionProtocol': 'OGC:WMS',
          'GetCapabilitiesUrl': this.wms,
          addLayers: []
        };
        this.props.services.push(addedWms);
      }

      return this.props.services.map(function (listItem, i) {
        return _react.default.createElement(ServiceListItem, {
          listItem: listItem,
          removeMapItem: _this2.props.removeMapItem ? _this2.props.removeMapItem : null,
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
    key: "toogleLayers",
    value: function toogleLayers() {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }
  }, {
    key: "toogleMap",
    value: function toogleMap() {
      window.history.back(); // TODO: get paramtere to check for url til goto for closing map
    }
    /**
     *
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var map = this.props.map;
      return _react.default.createElement("div", {
        id: "MapContainer",
        className: "".concat(_MapContainerModule.default.mapContainer)
      }, _react.default.createElement(_BackgroundChooser.default, null), _react.default.createElement("div", null, this.renderLayerButton() ? _react.default.createElement("div", null, _react.default.createElement("div", {
        className: _MapContainerModule.default.closeMap
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        title: "Lukk kartet",
        onClick: function onClick() {
          return _this3.toogleMap();
        },
        className: _MapContainerModule.default.toggleBtn,
        icon: "times"
      }), _react.default.createElement("span", {
        className: _MapContainerModule.default.closeButtonLabel
      }, "Lukk kartet")), _react.default.createElement("div", {
        className: "".concat(_MapContainerModule.default.container, " ").concat(this.state.isExpanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open)
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        onClick: function onClick() {
          return _this3.toogleLayers();
        },
        className: _MapContainerModule.default.toggleBtn,
        icon: this.state.isExpanded ? ["far", "layer-group"] : "times"
      }), _react.default.createElement(_Tabs.default, {
        className: "".concat(_MapContainerModule.default.tabs, " ").concat(this.state.isExpanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open),
        defaultActiveKey: "search",
        id: "tab"
      }, _react.default.createElement(_Tab.default, {
        className: "".concat(_MapContainerModule.default.search, " ").concat(this.state.isExpanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open),
        eventKey: "search",
        title: "S\xF8k"
      }, _react.default.createElement(_SearchBar.default, null)), _react.default.createElement(_Tab.default, {
        eventKey: "layers",
        title: "Visning"
      }, _react.default.createElement("div", {
        id: "ServiceList"
      }, this.renderServiceList())), "                "))) : _react.default.createElement("div", {
        className: _MapContainerModule.default.link,
        onClick: function onClick() {
          return _this3.toogleMap();
        }
      }, "G\xE5 til kartkatalogen")), _react.default.createElement("div", {
        id: "map",
        style: {
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0
        }
      }), _react.default.createElement(_Position.default, {
        map: map,
        projection: this.props.crs
      }), _react.default.createElement("div", {
        id: "mapPopover"
      }, _react.default.createElement(_FeatureInfoItem.default, {
        info: '',
        show: false
      })));
    }
  }]);
  return MapContainer;
}(_react.default.Component);

exports.default = MapContainer;
(0, _defineProperty2.default)(MapContainer, "defaultProps", {
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  wms: "",
  menu: true,
  crs: 'EPSG:25833'
});
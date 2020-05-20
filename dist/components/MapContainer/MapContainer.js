"use strict";

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _queryString = _interopRequireDefault(require("query-string"));

var _BackgroundChooser = _interopRequireDefault(require("../BackgroundChooser/BackgroundChooser"));

var _ServicePanel = _interopRequireDefault(require("../ServicePanel/ServicePanel"));

var _SearchBar = _interopRequireDefault(require("../SearchBar/SearchBar"));

var _icons = require("@ant-design/icons");

var _MapContainerModule = _interopRequireDefault(require("./MapContainer.module.scss"));

var _Position = _interopRequireDefault(require("../Position/Position"));

var _Tabs = _interopRequireDefault(require("react-bootstrap/Tabs"));

var _Tab = _interopRequireDefault(require("react-bootstrap/Tab"));

var _FeatureInfoItem = _interopRequireDefault(require("../ServicePanel/FeatureInfoItem"));

require("ol/ol.css");

var _store = require("../../Utils/store.js");

var _this = void 0;

var ServiceListItem = function ServiceListItem(props) {
  return /*#__PURE__*/_react.default.createElement(_ServicePanel.default, {
    services: props.listItem,
    removeMapItem: props.removeMapItem,
    draggable: true
  });
};

var MapContainer = function MapContainer(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      expanded = _useState2[0],
      toggleExpand = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      wms = _useState4[0],
      setWMS = _useState4[1];

  var queryValues = _queryString.default.parse(window.location.search);

  var internMap = _maplibHelper.map;
  _maplibHelper.mapConfig.coordinate_system = queryValues['crs'] || props.crs;
  var defaultConfig = JSON.parse(JSON.stringify(_maplibHelper.mapConfig));
  var newMapConfig = Object.assign({}, defaultConfig, {
    center: [props.lon, props.lat],
    zoom: props.zoom
  });
  (0, _react.useLayoutEffect)(function () {
    window.olMap = internMap.Init("map", newMapConfig);
    internMap.AddZoom();
    internMap.AddScaleLine();
  }, [internMap]);

  var renderServiceList = function renderServiceList() {
    if (wms) {
      var addedWms = {
        'Title': 'Added WMS from url',
        'DistributionProtocol': 'OGC:WMS',
        'GetCapabilitiesUrl': wms,
        addLayers: []
      };
      props.services.push(addedWms);
    }

    return props.services.map(function (listItem, i) {
      return /*#__PURE__*/_react.default.createElement(ServiceListItem, {
        listItem: listItem,
        removeMapItem: props.removeMapItem ? props.removeMapItem : null,
        key: i,
        map: _maplibHelper.map
      });
    });
  };

  var showDefaultTab = function showDefaultTab() {
    if (props.services.length) {
      return 'layers';
    } else return 'search';
  };

  var toogleMap = function toogleMap() {
    window.history.back(); // TODO: get paramtere to check for url til goto for closing map
  };

  return /*#__PURE__*/_react.default.createElement(_store.StateProvider, null, /*#__PURE__*/_react.default.createElement("div", {
    id: "MapContainer",
    className: "".concat(_MapContainerModule.default.mapContainer)
  }, /*#__PURE__*/_react.default.createElement(_BackgroundChooser.default, null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, _this.renderLayerButton() ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_MapContainerModule.default.container, " ").concat(_this.state.isExpanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open)
  }, _this.state.isExpanded ? /*#__PURE__*/_react.default.createElement(_icons.UpOutlined, {
    onClick: function onClick() {
      return _this.toogleLayers();
    },
    className: _MapContainerModule.default.toggleBtn
  }) : /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, {
    onClick: function onClick() {
      return _this.toogleLayers();
    },
    className: _MapContainerModule.default.toggleBtn
  }), /*#__PURE__*/_react.default.createElement(_Tabs.default, {
    className: "".concat(_MapContainerModule.default.tabs, " ").concat(_this.state.isExpanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open),
    defaultActiveKey: "search",
    id: "tab"
  }, /*#__PURE__*/_react.default.createElement(_Tab.default, {
    className: "".concat(_MapContainerModule.default.search, " ").concat(_this.state.isExpanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open),
    eventKey: "search",
    title: "S\xF8k"
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    eventKey: "layers",
    title: "Visning"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "ServiceList"
  }, _this.renderServiceList()))))) : /*#__PURE__*/_react.default.createElement("div", {
    className: _MapContainerModule.default.link,
    onClick: function onClick() {
      return _this.toogleMap();
    }
  }, "G\xE5 til kartkatalogen"))), /*#__PURE__*/_react.default.createElement("div", {
    id: "map",
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: 0
    }
  }), internMap ? /*#__PURE__*/_react.default.createElement(_Position.default, {
    map: internMap,
    projection: props.crs
  }) : null, /*#__PURE__*/_react.default.createElement("div", {
    id: "mapPopover"
  }, /*#__PURE__*/_react.default.createElement(_FeatureInfoItem.default, {
    info: '',
    show: false
  }))));
};

MapContainer.defaultProps = {
  lon: 396722,
  lat: 7197860,
  zoom: 4,
  crs: 'EPSG:25833'
};
var _default = MapContainer;
exports.default = _default;
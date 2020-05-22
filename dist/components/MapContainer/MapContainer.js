"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _queryString = _interopRequireDefault(require("query-string"));

var _BackgroundChooser = _interopRequireDefault(require("../BackgroundChooser/BackgroundChooser"));

var _ServicePanel = _interopRequireDefault(require("../ServicePanel/ServicePanel"));

var _SearchBar = _interopRequireDefault(require("../SearchBar/SearchBar"));

var _icons = require("@material-ui/icons");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _core = require("@material-ui/core");

var _Position = _interopRequireDefault(require("../Position/Position"));

var _FeatureInfoItem = _interopRequireDefault(require("../ServicePanel/FeatureInfoItem"));

var _store = require("../../Utils/store.js");

var _MapContainerModule = _interopRequireDefault(require("./MapContainer.module.scss"));

var ServiceListItem = function ServiceListItem(props) {
  return /*#__PURE__*/_react.default.createElement(_ServicePanel.default, {
    services: props.listItem,
    removeMapItem: props.removeMapItem,
    draggable: true
  });
};

function TabPanel(props) {
  var children = props.children,
      value = props.value,
      index = props.index,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "value", "index"]);
  return /*#__PURE__*/_react.default.createElement(_Typography.default, Object.assign({
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, other), /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 1
  }, children));
}

var MapContainer = function MapContainer(props) {
  var _React$useState = _react.default.useState(1),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

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

  var handleChange = function handleChange(event, newValue) {
    setValue(newValue);
  };

  return /*#__PURE__*/_react.default.createElement(_store.StateProvider, null, /*#__PURE__*/_react.default.createElement("div", {
    id: "MapContainer",
    className: "".concat(_MapContainerModule.default.mapContainer)
  }, /*#__PURE__*/_react.default.createElement(_BackgroundChooser.default, null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_MapContainerModule.default.container, " ").concat(expanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open)
  }, /*#__PURE__*/_react.default.createElement(_core.IconButton, {
    "aria-label": "expand",
    onClick: function onClick() {
      return toggleExpand(!expanded);
    }
  }, expanded ? /*#__PURE__*/_react.default.createElement(_icons.ExpandLess, null) : /*#__PURE__*/_react.default.createElement(_icons.ExpandMore, null)), /*#__PURE__*/_react.default.createElement(_core.Tabs, {
    value: value,
    variant: "fullWidth",
    onChange: handleChange,
    indicatorColor: "primary",
    textColor: "primary"
  }, /*#__PURE__*/_react.default.createElement(_core.Tab, {
    label: "S\xF8k",
    value: 0
  }), /*#__PURE__*/_react.default.createElement(_core.Tab, {
    label: "Visning",
    value: 1
  })), /*#__PURE__*/_react.default.createElement(TabPanel, {
    value: value,
    index: 0
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)), /*#__PURE__*/_react.default.createElement(TabPanel, {
    value: value,
    index: 1
  }, renderServiceList())))), /*#__PURE__*/_react.default.createElement("div", {
    id: "map",
    className: "map",
    style: {
      position: "relative",
      width: "100%",
      height: "100vh",
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
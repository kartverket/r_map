"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _queryString = _interopRequireDefault(require("query-string"));

var _BackgroundChooser = _interopRequireDefault(require("../BackgroundChooser/BackgroundChooser"));

var _ServicePanel = _interopRequireDefault(require("../ServicePanel/ServicePanel"));

var _SearchBar = _interopRequireDefault(require("../SearchBar/SearchBar"));

var _icons = require("@material-ui/icons");

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _Position = _interopRequireDefault(require("../Position/Position"));

var _FeatureInfoItem = _interopRequireDefault(require("../ServicePanel/FeatureInfoItem"));

var _store = require("../../Utils/store.js");

var _MapContainerModule = _interopRequireDefault(require("./MapContainer.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ServiceListItem = function ServiceListItem(props) {
  return /*#__PURE__*/_react.default.createElement(_ServicePanel.default, {
    services: props.listItem,
    removeMapItem: props.removeMapItem,
    draggable: true
  });
};

var TabPanel = function TabPanel(props) {
  var children = props.children,
      value = props.value,
      index = props.index,
      other = _objectWithoutProperties(props, ["children", "value", "index"]);

  return /*#__PURE__*/_react.default.createElement(_Typography.default, _extends({
    component: "div",
    role: "tabpanel",
    hidden: value !== index,
    id: "simple-tabpanel-".concat(index),
    "aria-labelledby": "simple-tab-".concat(index)
  }, other), /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 1
  }, children));
};

TabPanel.propTypes = {
  children: _propTypes.default.node,
  index: _propTypes.default.any.isRequired,
  value: _propTypes.default.any.isRequired
};

var MapContainer = function MapContainer(props) {
  var _React$useState = _react.default.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      toggleExpand = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
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
    value: 1
  }), /*#__PURE__*/_react.default.createElement(_core.Tab, {
    label: "Visning",
    value: 0
  })), /*#__PURE__*/_react.default.createElement(TabPanel, {
    value: value,
    index: 1
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)), /*#__PURE__*/_react.default.createElement(TabPanel, {
    value: value,
    index: 0
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
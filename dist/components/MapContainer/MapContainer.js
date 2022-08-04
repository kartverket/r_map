"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

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

var _store = require("../../Utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ServiceListItem = function ServiceListItem(props) {
  return /*#__PURE__*/_react.default.createElement(_ServicePanel.default, {
    services: props.listItem,
    removeMapItem: props.removeMapItem,
    draggable: true
  });
};

var MapContainer = function MapContainer(props) {
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
  var lon = Number(queryValues["lon"] || props.lon);
  var lat = Number(queryValues["lat"] || props.lat);
  var zoom = Number(queryValues["zoom"] || props.zoom);
  var defaultConfig = JSON.parse(JSON.stringify(_maplibHelper.mapConfig));
  var newMapConfig = Object.assign({}, defaultConfig, {
    center: [lon, lat],
    zoom: zoom
  });
  (0, _react.useLayoutEffect)(function () {
    window.olMap = internMap.Init("map", newMapConfig);
    internMap.AddZoom();
    internMap.AddScaleLine();

    _maplibHelper.eventHandler.RegisterEvent("MapMoveend", updateMapInfoState);
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

  var updateMapInfoState = function updateMapInfoState() {
    var center = _maplibHelper.map.GetCenter();

    var queryValues = _queryString.default.parse(window.location.search);

    queryValues.lon = center.lon;
    queryValues.lat = center.lat;
    queryValues.zoom = center.zoom;
    (0, _setQueryString.default)(queryValues);
  };

  var showDefaultTab = function showDefaultTab() {
    return 'layers';
    /*
    if (props.services.length) {
      return 'layers'
    }
    else
      return 'search'
    */
  };

  var toogleMap = function toogleMap() {
    window.history.back(); // TODO: get paramtere to check for url til goto for closing map
  };

  return /*#__PURE__*/_react.default.createElement(_store.StateProvider, null, /*#__PURE__*/_react.default.createElement("div", {
    id: "MapContainer",
    className: "".concat(_MapContainerModule.default.mapContainer)
  }, /*#__PURE__*/_react.default.createElement(_BackgroundChooser.default, null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: _MapContainerModule.default.closeMap
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    title: "Lukk kartet",
    onClick: function onClick() {
      return toogleMap();
    },
    className: _MapContainerModule.default.toggleBtn,
    icon: "times"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: _MapContainerModule.default.closeButtonLabel
  }, "Lukk kartet")), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_MapContainerModule.default.container, " ").concat(expanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open)
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    onClick: function onClick() {
      return toggleExpand(!expanded);
    },
    className: _MapContainerModule.default.toggleBtn,
    icon: expanded ? ["far", "layer-group"] : "times"
  }), /*#__PURE__*/_react.default.createElement(_Tabs.default, {
    className: "".concat(_MapContainerModule.default.tabs, " ").concat(expanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open),
    defaultActiveKey: showDefaultTab(),
    id: "tab"
  }, /*#__PURE__*/_react.default.createElement(_Tab.default, {
    eventKey: "search",
    title: "S\xF8k"
  }, /*#__PURE__*/_react.default.createElement(_SearchBar.default, null)), /*#__PURE__*/_react.default.createElement(_Tab.default, {
    className: "".concat(_MapContainerModule.default.search, " ").concat(expanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open),
    eventKey: "layers",
    title: "Visning"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "ServiceList"
  }, renderServiceList())))))), /*#__PURE__*/_react.default.createElement("div", {
    id: "map",
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex: 0
    },
    tabIndex: "0"
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
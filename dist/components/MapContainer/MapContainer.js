"use strict";

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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ServiceListItem = props => /*#__PURE__*/_react.default.createElement(_ServicePanel.default, {
  services: props.listItem,
  removeMapItem: props.removeMapItem,
  draggable: true
});
const MapContainer = props => {
  const [expanded, toggleExpand] = (0, _react.useState)(false);
  const [wms, setWMS] = (0, _react.useState)();
  const queryValues = _queryString.default.parse(window.location.search);
  let internMap = _maplibHelper.map;
  _maplibHelper.mapConfig.coordinate_system = queryValues['crs'] || props.crs;
  let lon = Number(queryValues["lon"] || props.lon);
  let lat = Number(queryValues["lat"] || props.lat);
  let zoom = Number(queryValues["zoom"] || props.zoom);
  let defaultConfig = JSON.parse(JSON.stringify(_maplibHelper.mapConfig));
  let newMapConfig = Object.assign({}, defaultConfig, {
    center: [lon, lat],
    zoom: zoom
  });
  (0, _react.useLayoutEffect)(() => {
    window.olMap = internMap.Init("map", newMapConfig);
    internMap.AddZoom();
    internMap.AddScaleLine();
    _maplibHelper.eventHandler.RegisterEvent("MapMoveend", updateMapInfoState);
  }, [internMap]);
  const renderServiceList = () => {
    if (wms) {
      const addedWms = {
        'Title': 'Added WMS from url',
        'DistributionProtocol': 'OGC:WMS',
        'GetCapabilitiesUrl': wms,
        addLayers: []
      };
      props.services.push(addedWms);
    }
    return props.services.map((listItem, i) => /*#__PURE__*/_react.default.createElement(ServiceListItem, {
      listItem: listItem,
      removeMapItem: props.removeMapItem ? props.removeMapItem : null,
      key: i,
      map: _maplibHelper.map
    }));
  };
  const updateMapInfoState = () => {
    let center = _maplibHelper.map.GetCenter();
    const queryValues = _queryString.default.parse(window.location.search);
    queryValues.lon = center.lon;
    queryValues.lat = center.lat;
    queryValues.zoom = center.zoom;
    (0, _setQueryString.default)(queryValues);
  };
  const showDefaultTab = () => {
    return 'layers';
    /*
    if (props.services.length) {
      return 'layers'
    }
    else
      return 'search'
    */
  };
  const toogleMap = () => {
    window.history.back();
    // TODO: get paramtere to check for url til goto for closing map
  };
  return /*#__PURE__*/_react.default.createElement(_store.StateProvider, null, /*#__PURE__*/_react.default.createElement("div", {
    id: "MapContainer",
    className: "".concat(_MapContainerModule.default.mapContainer)
  }, /*#__PURE__*/_react.default.createElement(_BackgroundChooser.default, null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: _MapContainerModule.default.closeMap
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    title: "Lukk kartet",
    onClick: () => toogleMap(),
    className: _MapContainerModule.default.toggleBtn,
    icon: "times"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: _MapContainerModule.default.closeButtonLabel
  }, "Lukk kartet")), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_MapContainerModule.default.container, " ").concat(expanded ? _MapContainerModule.default.closed : _MapContainerModule.default.open)
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    onClick: () => toggleExpand(!expanded),
    className: _MapContainerModule.default.toggleBtn,
    icon: expanded ? ["fas", "layer-group"] : "times"
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
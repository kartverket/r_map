"use strict";

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _ServicePanelModule = _interopRequireDefault(require("./ServicePanel.module.scss"));

var _icons = require("@ant-design/icons");

var _LayerEntry = _interopRequireDefault(require("./LayerEntry"));

var _this = void 0;

var ServicePanel = function ServicePanel(props) {
  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      capabilities = _useState2[0],
      setCapabilities = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      meta = _useState4[0],
      setMeta = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      expanded = _useState6[0],
      setState = _useState6[1];

  (0, _react.useEffect)(function () {
    var newMetaInfo = {};

    switch (props.services.DistributionProtocol) {
      case 'WMS':
      case 'WMS-tjeneste':
      case 'OGC:WMS':
        _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(props.services.GetCapabilitiesUrl).then(function (capa) {
          setCapabilities(capa);
          newMetaInfo = _CapabilitiesUtil.CapabilitiesUtil.getWMSMetaCapabilities(capa);
          newMetaInfo.Type = 'OGC:WMS';
          newMetaInfo.Params = props.services.customParams || '';
          setMeta(newMetaInfo);
        }).catch(function (e) {
          return console.log(e);
        });

        break;

      case 'WFS':
      case 'WFS-tjeneste':
      case 'OGC:WFS':
        _CapabilitiesUtil.CapabilitiesUtil.parseWFSCapabilities(props.services.GetCapabilitiesUrl).then(function (capa) {
          setCapabilities(capa);
          newMetaInfo = _CapabilitiesUtil.CapabilitiesUtil.getWFSMetaCapabilities(capa);
          newMetaInfo.Type = 'WFS';
          newMetaInfo.Params = props.services.customParams || '';
          setMeta(newMetaInfo);
        }).catch(function (e) {
          return console.log(e);
        });

        break;

      case 'GEOJSON':
        _CapabilitiesUtil.CapabilitiesUtil.getGeoJson(props.services.url).then(function (layers) {
          setCapabilities(layers);
          newMetaInfo.Type = 'GEOJSON';
          newMetaInfo.ShowPropertyName = props.services.ShowPropertyName || 'id';
          newMetaInfo.EPSG = props.services.EPSG || 'EPSG:4326';
          setMeta(newMetaInfo);
        }).catch(function (e) {
          return console.log(e);
        });

        break;

      default:
        console.warn('No service type specified');
        break;
    }
  }, [props.services.DistributionProtocol, props.services.GetCapabilitiesUrl, props.services.url, props.services.ShowPropertyName, props.services.customParams, props.services.EPSG]);

  var renderRemoveButton = function renderRemoveButton() {
    if (props.removeMapItem) {
      return _react.default.createElement(_icons.CloseOutlined, {
        className: _ServicePanelModule.default.removeInline,
        onClick: _this.props.removeMapItem
      });
    } else {
      return '';
    }
  };

  var renderCapabilites = function renderCapabilites() {
    if (capabilities && capabilities.Capability) {
      return capabilities.Capability.Layer.Layer.map(function (capaLayer, i) {
        return _react.default.createElement("div", {
          className: _ServicePanelModule.default.facet,
          key: i
        }, _react.default.createElement(_LayerEntry.default, {
          layer: capaLayer,
          meta: meta,
          key: i
        }));
      });
    } else if (capabilities && capabilities.value) {
      return capabilities.value.featureTypeList.featureType.map(function (capaLayer, i) {
        return _react.default.createElement("div", {
          className: _ServicePanelModule.default.facet,
          key: i
        }, _react.default.createElement(_LayerEntry.default, {
          layer: capaLayer,
          meta: meta,
          key: i
        }));
      });
    } else if (capabilities && capabilities.features) {
      return _react.default.createElement("div", {
        className: _ServicePanelModule.default.facet
      }, _react.default.createElement(_LayerEntry.default, {
        layer: capabilities,
        meta: meta
      }));
    } else {
      // console.warn(capabilities)
      return '';
    }
  };

  return _react.default.createElement("div", null, _react.default.createElement("div", {
    onClick: function onClick() {
      return setState(!expanded);
    },
    className: _ServicePanelModule.default.expandLayersBtn
  }, _react.default.createElement("span", {
    className: _ServicePanelModule.default.ellipsisToggle
  }, props.services.Title), expanded ? _react.default.createElement(_icons.UpOutlined, null) : _react.default.createElement(_icons.DownOutlined, null)), renderRemoveButton(), _react.default.createElement("div", {
    className: expanded ? "".concat(_ServicePanelModule.default.selectedlayers, " ").concat(_ServicePanelModule.default.open) : _ServicePanelModule.default.selectedlayers
  }, renderCapabilites()));
};

var _default = ServicePanel;
exports.default = _default;
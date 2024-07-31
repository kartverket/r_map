"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");
var _ServicePanelModule = _interopRequireDefault(require("./ServicePanel.module.scss"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _LayerEntry = _interopRequireDefault(require("./LayerEntry"));
var _uniqid = _interopRequireDefault(require("uniqid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ServicePanel = props => {
  const [capabilities, setCapabilities] = (0, _react.useState)();
  const [meta, setMeta] = (0, _react.useState)();
  const [expanded, setState] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    let newMetaInfo = {};
    switch (props.services.DistributionProtocol) {
      case 'WMS':
      case 'WMS-tjeneste':
      case 'OGC:WMS':
        _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(props.services.GetCapabilitiesUrl).then(capa => {
          setCapabilities(capa);
          newMetaInfo = _CapabilitiesUtil.CapabilitiesUtil.getWMSMetaCapabilities(capa);
          newMetaInfo.Type = 'OGC:WMS';
          newMetaInfo.Params = props.services.customParams || '';
          newMetaInfo.uuid = props.services.uuid || (0, _uniqid.default)();
          setMeta(newMetaInfo);
        }).catch(e => console.warn(e));
        break;
      case 'WFS':
      case 'WFS-tjeneste':
      case 'OGC:WFS':
        _CapabilitiesUtil.CapabilitiesUtil.parseWFSCapabilities(props.services.GetCapabilitiesUrl).then(capa => {
          setCapabilities(capa);
          newMetaInfo = _CapabilitiesUtil.CapabilitiesUtil.getWFSMetaCapabilities(capa);
          newMetaInfo.Type = 'WFS';
          newMetaInfo.Params = props.services.customParams || '';
          newMetaInfo.uuid = props.services.uuid || (0, _uniqid.default)();
          setMeta(newMetaInfo);
        }).catch(e => console.warn(e));
        break;
      case 'GEOJSON':
        _CapabilitiesUtil.CapabilitiesUtil.getGeoJson(props.services.url).then(layers => {
          setCapabilities(layers);
          newMetaInfo.Type = 'GEOJSON';
          newMetaInfo.ShowPropertyName = props.services.ShowPropertyName || 'id';
          newMetaInfo.EPSG = props.services.EPSG || 'EPSG:4326';
          newMetaInfo.uuid = props.services.uuid || (0, _uniqid.default)();
          setMeta(newMetaInfo);
        }).catch(e => console.warn(e));
        break;
      default:
        console.warn('No service type specified');
        break;
    }
  }, [props.services.DistributionProtocol, props.services.GetCapabilitiesUrl, props.services.url, props.services.ShowPropertyName, props.services.customParams, props.services.EPSG]);
  const renderRemoveButton = () => {
    if (props.removeMapItem) {
      return /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        className: _ServicePanelModule.default.removeInline,
        onClick: (void 0).props.removeMapItem,
        icon: ['fas', 'times']
      });
    } else {
      return '';
    }
  };
  const renderCapabilites = () => {
    if (capabilities && capabilities.Capability) {
      const capalayer = capabilities.Capability.Layer || capabilities.Capability.Layer.Layer;
      if (Array.isArray(capalayer)) {
        return capalayer.map((capaLayer, i) => {
          return /*#__PURE__*/_react.default.createElement("div", {
            className: _ServicePanelModule.default.facet,
            key: i
          }, /*#__PURE__*/_react.default.createElement(_LayerEntry.default, {
            layer: capaLayer,
            meta: meta,
            key: i
          }));
        });
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: _ServicePanelModule.default.facet,
          key: 0
        }, /*#__PURE__*/_react.default.createElement(_LayerEntry.default, {
          layer: capalayer,
          meta: meta,
          key: 0
        }));
      }
    } else if (capabilities && capabilities.value) {
      return capabilities.value.featureTypeList.featureType.map((capaLayer, i) => {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: _ServicePanelModule.default.facet,
          key: i
        }, /*#__PURE__*/_react.default.createElement(_LayerEntry.default, {
          layer: capaLayer,
          meta: meta,
          key: i
        }));
      });
    } else if (capabilities && capabilities.features) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: _ServicePanelModule.default.facet
      }, /*#__PURE__*/_react.default.createElement(_LayerEntry.default, {
        layer: capabilities,
        meta: meta
      }));
    } else {
      // console.warn(capabilities)
      return '';
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => setState(!expanded),
    className: _ServicePanelModule.default.expandLayersBtn
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: _ServicePanelModule.default.ellipsisToggle
  }, props.services.Title), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: expanded ? ['fas', 'angle-up'] : ['fas', 'angle-down']
  })), renderRemoveButton(), /*#__PURE__*/_react.default.createElement("div", {
    className: expanded ? "".concat(_ServicePanelModule.default.selectedlayers, " ").concat(_ServicePanelModule.default.open) : _ServicePanelModule.default.selectedlayers
  }, renderCapabilites()));
};
ServicePanel.propTypes = {
  /**
   * The services to be parsed and shown in the panel
   * @type {Object} -- required
   */
  services: _propTypes.default.object.isRequired,
  removeMapItem: _propTypes.default.object
};
var _default = ServicePanel;
exports.default = _default;
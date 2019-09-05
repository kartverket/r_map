"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

require("./ServicePanel.scss");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _LayerEntry = _interopRequireDefault(require("./LayerEntry"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ServicePanel = function ServicePanel(props) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      capabilities = _useState2[0],
      setCapabilities = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      meta = _useState4[0],
      setMeta = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      expanded = _useState6[0],
      setState = _useState6[1];

  (0, _react.useEffect)(function () {
    var newMetaInfo = {};

    switch (props.services.DistributionProtocol) {
      case 'WMS':
      case 'OGC:WMS':
        _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(props.services.GetCapabilitiesUrl).then(function (capa) {
          setCapabilities(capa);
          newMetaInfo = _CapabilitiesUtil.CapabilitiesUtil.getMetaCapabilities(capa);
          newMetaInfo.Type = 'OGC:WMS';
          setMeta(newMetaInfo);
        }).catch(function (e) {
          return console.log(e);
        });

        break;

      case 'WFS':
        _CapabilitiesUtil.CapabilitiesUtil.parseWFSCapabilities(props.services.GetCapabilitiesUrl) //.then(CapabilitiesUtil.getLayersFromWfsCapabilties)
        .then(function (capa) {
          setCapabilities(capa);
          newMetaInfo.Type = 'WFS';
          setMeta(newMetaInfo);
        }).catch(function (e) {
          return console.log(e);
        });

        break;

      case 'GEOJSON':
        _CapabilitiesUtil.CapabilitiesUtil.getGeoJson(props.services.url).then(function (layers) {
          setCapabilities(layers);
          newMetaInfo.Type = 'GEOJSON';
          setMeta(newMetaInfo);
        }).catch(function (e) {
          return console.log(e);
        });

        break;

      default:
        console.warn('No service type specified');
        break;
    }
  }, [props.services.DistributionProtocol, props.services.GetCapabilitiesUrl, props.services.url]);

  var renderRemoveButton = function renderRemoveButton() {
    if (props.removeMapItem) {
      return _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        className: "remove-inline",
        onClick: _this.props.removeMapItem,
        icon: ['fas', 'times']
      });
    } else {
      return '';
    }
  };

  var renderCapabilites = function renderCapabilites() {
    if (capabilities && capabilities.Capability) {
      return capabilities.Capability.Layer.Layer.map(function (capaLayer, i) {
        return _react.default.createElement("div", {
          className: "facet",
          key: i
        }, _react.default.createElement(_LayerEntry.default, {
          layer: capaLayer,
          meta: meta,
          key: i
        }), capaLayer.Layer ? capaLayer.Layer.map(function (subLayer, isub) {
          return _react.default.createElement("div", {
            className: "facet-sub"
          }, _react.default.createElement(_LayerEntry.default, {
            layer: subLayer,
            meta: meta,
            key: isub
          }));
        }) : '');
      });
    } else if (capabilities && capabilities.features) {
      return _react.default.createElement("div", {
        className: "facet"
      }, _react.default.createElement(_LayerEntry.default, {
        layer: capabilities,
        meta: meta
      }));
    } else {
      console.warn('Something went wrong when parsing the capabilities');
      console.warn(capabilities);
      return '';
    }
  };

  return _react.default.createElement("div", null, _react.default.createElement("div", {
    onClick: function onClick() {
      return setState(!expanded);
    },
    className: 'expand-layers-btn'
  }, _react.default.createElement("span", {
    className: 'ellipsis-toggle'
  }, props.services.Title), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: expanded ? ['fas', 'angle-up'] : ['fas', 'angle-down']
  })), renderRemoveButton(), _react.default.createElement("div", {
    className: expanded ? 'selectedlayers open' : 'selectedlayers'
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
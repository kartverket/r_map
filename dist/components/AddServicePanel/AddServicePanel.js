"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

require("./AddServicePanel.scss");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _InlineLegend = _interopRequireDefault(require("../Legend/InlineLegend"));

var _LayerEntry = _interopRequireDefault(require("./LayerEntry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Panel containing a (checkable) list.
 * This class can be used e.g with a result obtained by ol WMS capabilities
 * parser, in particular objects in `Capability.Layer.Layer`
 *
 * @class The AddServicePanel
 * @extends React.Component
 */
var AddServicePanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddServicePanel, _React$Component);

  /**
   * The prop types.
   * @type {Object}
   */

  /**
   * Create an AddWmsPanel.
   * @constructs AddWmsPanel
   */
  function AddServicePanel(props) {
    var _this;

    _classCallCheck(this, AddServicePanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddServicePanel).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onSelectionChange", function (currentNode) {
      if (!_maplibHelper.map.GetOverlayLayers().includes(currentNode)) {
        _maplibHelper.map.AddLayer(currentNode);
      } else {
        if (_maplibHelper.map.GetVisibleSubLayers().find(function (el) {
          return el.id === currentNode.id;
        })) {
          _maplibHelper.map.HideLayer(currentNode);
        } else {
          _maplibHelper.map.ShowLayer(currentNode);
        }
      }
    });

    _this.state = {
      expanded: false
    };

    _this.getCapabilitites();

    return _this;
  }

  _createClass(AddServicePanel, [{
    key: "getCapabilitites",
    value: function getCapabilitites() {
      var _this2 = this;

      switch (this.props.services.DistributionProtocol) {
        case "WMS":
        case "OGC:WMS":
          _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl).then(_CapabilitiesUtil.CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
            if (_this2.props.services.addLayers.length > 0) {
              var layersToBeAdded = layers.filter(function (e) {
                return _this2.props.services.addLayers.includes(e.name);
              });
              layersToBeAdded.forEach(function (layer) {
                return _maplibHelper.map.AddLayer(layer);
              });
            }

            _this2.setState({
              wmsLayers: layers
            });
          }).catch(function (e) {
            return console.log(e);
          });

          break;

        case "WFS":
          _CapabilitiesUtil.CapabilitiesUtil.parseWFSCapabilities(this.props.services.GetCapabilitiesUrl).then(_CapabilitiesUtil.CapabilitiesUtil.getLayersFromWfsCapabilties).then(function (layers) {
            _this2.setState({
              wmsLayers: layers
            });
          }).catch(function (e) {
            return console.log(e);
          });

          break;

        default:
          console.warn("No service type specified");
          break;
      }
    }
  }, {
    key: "toggleExpand",
    value: function toggleExpand() {
      this.setState(function (prevState) {
        return {
          expanded: !prevState.expanded
        };
      });
    }
  }, {
    key: "renderRemoveButton",
    value: function renderRemoveButton() {
      if (this.props.removeMapItem) {
        return _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
          className: "remove-inline",
          onClick: this.props.removeMapItem,
          icon: ["fas", "times"]
        });
      } else {
        return "";
      }
    }
  }, {
    key: "renderSelectedLayers",
    value: function renderSelectedLayers() {
      var wmsLayers = this.state.wmsLayers;

      if (wmsLayers && wmsLayers.length) {
        var wmsLayersList = wmsLayers.map(function (layer) {
          return _react.default.createElement("div", {
            className: "facet",
            key: layer.id
          }, _react.default.createElement(_LayerEntry.default, {
            layer: layer
          }), _react.default.createElement(_InlineLegend.default, {
            legendUrl: layer.subLayers[0].legendGraphicUrl
          }));
        });
        return wmsLayersList;
      } else {
        return "";
      }
    }
    /**
     * The render function.
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("div", null, _react.default.createElement("div", {
        onClick: function onClick() {
          return _this3.toggleExpand();
        },
        className: "expand-layers-btn"
      }, _react.default.createElement("span", {
        className: "ellipsis-toggle"
      }, this.props.services.Title), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: this.state.expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]
      })), this.renderRemoveButton(), _react.default.createElement("div", {
        className: this.state.expanded ? "selectedlayers open" : "selectedlayers"
      }, this.renderSelectedLayers()));
    }
  }]);

  return AddServicePanel;
}(_react.default.Component);

exports.default = AddServicePanel;

_defineProperty(AddServicePanel, "propTypes", {
  /**
   * The services to be parsed and shown in the panel
   * @type {Object} -- required
   */
  services: _propTypes.default.object.isRequired
});
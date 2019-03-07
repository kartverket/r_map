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

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

require("./AddServicePanel.scss");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _InlineLegend = _interopRequireDefault(require("../Legend/InlineLegend"));

var _LayerEntry = _interopRequireDefault(require("./LayerEntry"));

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
  (0, _inherits2.default)(AddServicePanel, _React$Component);

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

    (0, _classCallCheck2.default)(this, AddServicePanel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AddServicePanel).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onSelectionChange", function (currentNode) {
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

  (0, _createClass2.default)(AddServicePanel, [{
    key: "getCapabilitites",
    value: function getCapabilitites() {
      var _this2 = this;

      switch (this.props.services.DistributionProtocol) {
        case 'WMS':
        case 'OGC:WMS':
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

        case 'WFS':
          _CapabilitiesUtil.CapabilitiesUtil.parseWFSCapabilities(this.props.services.GetCapabilitiesUrl).then(_CapabilitiesUtil.CapabilitiesUtil.getLayersFromWfsCapabilties).then(function (layers) {
            _this2.setState({
              wmsLayers: layers
            });
          }).catch(function (e) {
            return console.log(e);
          });

          break;

        default:
          console.warn('No service type specified');
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
          icon: ['fas', 'times']
        });
      } else {
        return '';
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
        return '';
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
        className: 'expand-layers-btn'
      }, _react.default.createElement("span", {
        className: 'ellipsis-toggle'
      }, this.props.services.Title), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: this.state.expanded ? ['fas', 'angle-up'] : ['fas', 'angle-down']
      })), this.renderRemoveButton(), _react.default.createElement("div", {
        className: this.state.expanded ? 'selectedlayers open' : 'selectedlayers'
      }, this.renderSelectedLayers()));
    }
  }]);
  return AddServicePanel;
}(_react.default.Component);

exports.default = AddServicePanel;
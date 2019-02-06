"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDropdownTreeSelect = _interopRequireDefault(require("react-dropdown-tree-select"));

require("react-dropdown-tree-select/dist/styles.css");

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

var _maplibHelper = require("../../MapUtil/maplibHelper");

require("./AddWmsPanel.scss");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Panel containing a (checkable) list.
 * This class can be used e.g with a result obtained by ol WMS capabilities
 * parser, in particular objects in `Capability.Layer.Layer`
 *
 * @class The AddWmsPanel
 * @extends React.Component
 */
var AddWmsPanel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AddWmsPanel, _React$Component);

  /**
   * The prop types.
   * @type {Object}
   */

  /**
   * Create an AddWmsPanel.
   * @constructs AddWmsPanel
   */
  function AddWmsPanel(props) {
    var _this;

    _classCallCheck(this, AddWmsPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AddWmsPanel).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addLayers", function (layers) {
      var Capability = layers[0];

      if (Capability) {
        var layerConfig = {
          type: "map",
          name: Capability.Layer[0].Abstract,
          url: Capability.Layer[0].url,
          params: {
            layers: layers,
            format: "image/png"
          },
          guid: "1.temakart",
          options: {
            isbaselayer: "true",
            singletile: "false",
            visibility: "true"
          }
        };
        var ServiceName = "WMS";
        var newLayerConfig = (0, _maplibHelper.addLayer)(ServiceName, layerConfig);

        _maplibHelper.map.AddLayer(newLayerConfig);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSelectionChange", function (currentNode, selectedNodes) {
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

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onAction", function (_ref) {
      var action = _ref.action,
          node = _ref.node;
      console.log("onAction:: [".concat(action, "]"), node);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onNodeToggle", function (currentNode) {
      console.log("onNodeToggle::", currentNode);
    });

    _this.state = {};

    _this.getCapabilitites();

    return _this;
  }

  _createClass(AddWmsPanel, [{
    key: "getCapabilitites",
    value: function getCapabilitites() {
      var _this2 = this;

      /*
          CapabilitiesUtil.parseWMTS(this.props.services.GetCapabilitiesUrl)
          .then(layers => {
              console.log(layers)
          });
          */
      _CapabilitiesUtil.CapabilitiesUtil.parseWmsCapabilities(this.props.services.GetCapabilitiesUrl).then(_CapabilitiesUtil.CapabilitiesUtil.getLayersFromWmsCapabilties).then(function (layers) {
        _this2.setState({
          wmsLayers: layers
        });
      }).catch(function (e) {
        return console.log(e);
      });
    }
  }, {
    key: "renderRemoveButton",
    value: function renderRemoveButton() {
      if (this.props.removeMapItem) {
        return _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
          className: "remove-inline",
          onClick: this.props.removeMapItem(this.props.services),
          icon: 'times'
        });
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
      var passThroughOpts = _extends({}, this.props);

      var wmsLayers = this.state.wmsLayers;
      return _react.default.createElement("div", null, this.props.services.Title, this.renderRemoveButton(), _react.default.createElement(_reactDropdownTreeSelect.default, {
        placeholderText: "Velg kartlag",
        data: wmsLayers,
        onChange: this.onSelectionChange,
        onAction: this.onAction,
        onNodeToggle: this.onNodeToggle
      }));
    }
  }]);

  return AddWmsPanel;
}(_react.default.Component);

exports.default = AddWmsPanel;

_defineProperty(AddWmsPanel, "propTypes", {
  /**
   * @type {Object} -- required
   */
  services: _propTypes.default.object.isRequired,

  /**
   * Optional instance of Map which is used if onLayerAddToMap is not provided
   * @type {Object}
   */
  map: _propTypes.default.object,

  /**
   * Optional function being called when onAddSelectedLayers
   * is triggered
   * @type {Function}
   */
  onLayerAddToMap: _propTypes.default.func,

  /**
   * Optional function that is called if selection has changed.
   * @type {Function}
   */
  onSelectionChange: _propTypes.default.func
});
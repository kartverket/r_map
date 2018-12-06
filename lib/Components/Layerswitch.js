"use strict";

exports.__esModule = true;
exports.Layerswitch = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _maplibHelper = require("../Maplib/maplibHelper");

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Layerswitch = exports.Layerswitch = function (_Component) {
  _inherits(Layerswitch, _Component);

  function Layerswitch(props) {
    _classCallCheck(this, Layerswitch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.setAsBaseLayer = function (baseLayer) {
      _maplibHelper.map.SetBaseLayer(baseLayer);
      _maplibHelper.map.ZoomToLayer(baseLayer);
      _this.setState({ value: baseLayer });
    };

    _this.state = { baseLayers: [] };
    _maplibHelper.eventHandler.RegisterEvent("MapLoaded", function () {
      return _this.setState({ baseLayers: _maplibHelper.map.GetBaseLayers() });
    });
    return _this;
  }

  Layerswitch.prototype.renderBaseLayers = function renderBaseLayers(baseLayers) {
    return baseLayers.map(function (baseLayer, index) {
      return _react2.default.createElement(
        _reactBootstrap.NavItem,
        { key: index, eventKey: baseLayer },
        baseLayer.name
      );
    });
  };

  Layerswitch.prototype.render = function render() {
    return _react2.default.createElement(
      _reactBootstrap.Nav,
      { bsStyle: "pills", stacked: true, onSelect: this.setAsBaseLayer, value: this.state.value },
      this.renderBaseLayers(this.state.baseLayers)
    );
  };

  return Layerswitch;
}(_react.Component);
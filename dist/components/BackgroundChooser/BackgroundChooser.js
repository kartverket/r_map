"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _reactBootstrap = require("react-bootstrap");

require("./BackgroundChooser.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Panel containing a list of backgroundLayers.
 *
 * @class The AddWmsPanel
 * @extends React.Component
 */
var BackgroundChooser = function (_Component) {
  _inherits(BackgroundChooser, _Component);

  function BackgroundChooser(props) {
    _classCallCheck(this, BackgroundChooser);

    var _this = _possibleConstructorReturn(this, (BackgroundChooser.__proto__ || Object.getPrototypeOf(BackgroundChooser)).call(this, props));

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

  _createClass(BackgroundChooser, [{
    key: "renderBaseLayers",
    value: function renderBaseLayers(baseLayers) {
      return baseLayers.map(function (baseLayer, index) {

        return _react2.default.createElement(
          _reactBootstrap.ToggleButton,
          { key: index, className: 'icon_' + baseLayer.id, value: baseLayer },
          _react2.default.createElement(
            "span",
            null,
            " ",
            baseLayer.name,
            " ",
            " "
          )
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.ToggleButtonGroup,
        {
          type: "radio",
          name: "Backgound",
          className: "backgroundChooser",
          onChange: this.setAsBaseLayer,
          value: this.state.value
        },
        this.renderBaseLayers(this.state.baseLayers)
      );
    }
  }]);

  return BackgroundChooser;
}(_react.Component);

exports.default = BackgroundChooser;
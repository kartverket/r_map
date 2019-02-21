"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Legend = _interopRequireDefault(require("./Legend"));

var _InlineLegend = _interopRequireDefault(require("./InlineLegend.scss"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InlineLegend =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InlineLegend, _React$Component);

  function InlineLegend(props) {
    var _this;

    _classCallCheck(this, InlineLegend);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InlineLegend).call(this, props));
    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(InlineLegend, [{
    key: "toggleExpand",
    value: function toggleExpand() {
      this.setState(function (prevState) {
        return {
          expanded: !prevState.expanded
        };
      });
    }
  }, {
    key: "legend",
    value: function legend() {
      var _this2 = this;

      if (this.props.legendUrl) {
        return _react.default.createElement("div", null, _react.default.createElement("div", {
          className: _InlineLegend.default.toggle,
          onClick: function onClick() {
            return _this2.toggleExpand();
          }
        }, _react.default.createElement("span", {
          className: _InlineLegend.default.label
        }, this.state.expanded ? 'Skjul tegnforklaring' : 'Vis tegnforklaring', " "), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
          icon: this.state.expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]
        })), _react.default.createElement("div", {
          className: this.state.expanded ? _InlineLegend.default.legend : _InlineLegend.default.legend + ' ' + _InlineLegend.default.closed
        }, _react.default.createElement(_Legend.default, {
          legendUrl: this.props.legendUrl,
          legendAlternative: "Legend"
        })));
      } else {
        return "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, this.legend());
    }
  }]);

  return InlineLegend;
}(_react.default.Component);

exports.default = InlineLegend;
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Legend = _interopRequireDefault(require("./Legend"));

var _InlineLegendModule = _interopRequireDefault(require("./InlineLegend.module.scss"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Legend to be used in the ServicePanel
 * @param {*} props
 */
var InlineLegend = function InlineLegend(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      toggleExpand = _useState2[1];

  var legend = function legend() {
    if (props.legendUrl) {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: _InlineLegendModule.default.toggle,
        onClick: function onClick() {
          return toggleExpand(!expanded);
        }
      }, _react.default.createElement("span", {
        className: _InlineLegendModule.default.label
      }, expanded ? "Skjul tegnforklaring" : "Vis tegnforklaring", " "), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]
      })), _react.default.createElement("div", {
        className: expanded ? _InlineLegendModule.default.legend : _InlineLegendModule.default.legend + " " + _InlineLegendModule.default.closed
      }, _react.default.createElement(_Legend.default, {
        legendUrl: props.legendUrl,
        legendAlternative: "Legend"
      })));
    } else {
      return "";
    }
  };

  return _react.default.createElement("div", null, legend());
};

InlineLegend.propTypes = {
  legendUrl: _propTypes.default.string
};
var _default = InlineLegend;
exports.default = _default;
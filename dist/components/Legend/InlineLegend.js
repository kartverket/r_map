"use strict";

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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Legend to be used in the ServicePanel
 * @param {*} props
 */
const InlineLegend = props => {
  const [expanded, toggleExpand] = (0, _react.useState)(false);
  const legend = () => {
    if (props.legendUrl) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: _InlineLegendModule.default.toggle,
        onClick: () => toggleExpand(!expanded)
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: _InlineLegendModule.default.label
      }, expanded ? "Skjul tegnforklaring" : "Vis tegnforklaring", " "), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: expanded ? ["fas", "angle-up"] : ["fas", "angle-down"]
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: expanded ? _InlineLegendModule.default.legend : _InlineLegendModule.default.legend + " " + _InlineLegendModule.default.closed
      }, /*#__PURE__*/_react.default.createElement(_Legend.default, {
        legendUrl: props.legendUrl,
        legendAlternative: "Legend"
      })));
    } else {
      return "";
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, legend());
};
InlineLegend.propTypes = {
  legendUrl: _propTypes.default.string
};
var _default = InlineLegend;
exports.default = _default;
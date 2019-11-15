"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Legend to be used in MapComponent
 * @param {*} props
 */
var Legend = function Legend(props) {
  return _react.default.createElement("img", {
    src: props.legendUrl,
    alt: props.legendAlternative
  });
};

Legend.propTypes = {
  legendUrl: _propTypes.default.string.isRequired,
  legendAlternative: _propTypes.default.string
};
var _default = Legend;
exports.default = _default;
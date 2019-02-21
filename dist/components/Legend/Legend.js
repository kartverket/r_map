"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Legend = function Legend(props) {
  return _react.default.createElement("div", null, _react.default.createElement("img", {
    src: props.legendUrl,
    alt: props.legendAlternative
  }));
};

var _default = Legend;
exports.default = _default;
"use strict";

var _interopRequireWildcard = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Legend = _interopRequireDefault(require("./Legend"));

var _icons = require("@ant-design/icons");

var _InlineLegendModule = _interopRequireDefault(require("./InlineLegend.module.scss"));

/**
 * Legend to be used in the ServicePanel
 * @param {*} props
 */
var InlineLegend = function InlineLegend(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      expanded = _useState2[0],
      toggleExpand = _useState2[1];

  var legend = function legend() {
    if (props.legendUrl) {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: _InlineLegendModule.default.toggle,
        onClick: function onClick() {
          return toggleExpand(!expanded);
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: _InlineLegendModule.default.label
      }, expanded ? "Skjul tegnforklaring" : "Vis tegnforklaring", " "), expanded ? /*#__PURE__*/_react.default.createElement(_icons.UpOutlined, null) : /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null)), /*#__PURE__*/_react.default.createElement("div", {
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

var _default = InlineLegend;
exports.default = _default;
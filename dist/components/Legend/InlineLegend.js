"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Legend = _interopRequireDefault(require("./Legend"));

var _InlineLegend = _interopRequireDefault(require("./InlineLegend.scss"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var InlineLegend = function InlineLegend(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      expanded = _useState2[0],
      toggleExpand = _useState2[1];

  var legend = function legend() {
    if (props.legendUrl) {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
        className: _InlineLegend.default.toggle,
        onClick: function onClick() {
          return toggleExpand(!expanded);
        }
      }, _react.default.createElement("span", {
        className: _InlineLegend.default.label
      }, expanded ? 'Skjul tegnforklaring' : 'Vis tegnforklaring', ' '), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: expanded ? ['fas', 'angle-up'] : ['fas', 'angle-down']
      })), _react.default.createElement("div", {
        className: expanded ? _InlineLegend.default.legend : _InlineLegend.default.legend + ' ' + _InlineLegend.default.closed
      }, _react.default.createElement(_Legend.default, {
        legendUrl: props.legendUrl,
        legendAlternative: "Legend"
      })));
    } else {
      return '';
    }
  };

  return _react.default.createElement("div", null, legend());
};

var _default = InlineLegend;
exports.default = _default;
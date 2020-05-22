"use strict";

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

it('renders without crashing', function () {
  var div = document.createElement('div');

  _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_App.default, null), div);

  _reactDom.default.unmountComponentAtNode(div);
});
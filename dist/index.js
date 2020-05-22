"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\babel-preset-react-app\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ServicePanel", {
  enumerable: true,
  get: function get() {
    return _ServicePanel.default;
  }
});
Object.defineProperty(exports, "BackgroundChooser", {
  enumerable: true,
  get: function get() {
    return _BackgroundChooser.default;
  }
});
Object.defineProperty(exports, "MapComponent", {
  enumerable: true,
  get: function get() {
    return _MapComponent.default;
  }
});
Object.defineProperty(exports, "MapContainer", {
  enumerable: true,
  get: function get() {
    return _MapContainer.default;
  }
});
Object.defineProperty(exports, "Legend", {
  enumerable: true,
  get: function get() {
    return _Legend.default;
  }
});

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./index.scss");

var _App = _interopRequireDefault(require("./App"));

var serviceWorker = _interopRequireWildcard(require("./serviceWorker"));

var _ServicePanel = _interopRequireDefault(require("./components/ServicePanel/ServicePanel"));

var _BackgroundChooser = _interopRequireDefault(require("./components/BackgroundChooser/BackgroundChooser"));

var _MapComponent = _interopRequireDefault(require("./components/MapComponent/MapComponent"));

var _MapContainer = _interopRequireDefault(require("./components/MapContainer/MapContainer"));

var _Legend = _interopRequireDefault(require("./components/Legend/Legend"));

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_App.default, null), document.getElementById('root'));

serviceWorker.unregister();
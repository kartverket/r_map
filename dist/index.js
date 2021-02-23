"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var _reactIntl = require("react-intl");

var _en = _interopRequireDefault(require("./lang/en.json"));

var _no = _interopRequireDefault(require("./lang/no.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = {
  'en': _en.default,
  'no': _no.default
};
var language = navigator.language.split(/[-_]/)[0];

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_reactIntl.IntlProvider, {
  messages: messages[language],
  locale: language
}, /*#__PURE__*/_react.default.createElement(_App.default, null)), document.getElementById('root'));

serviceWorker.unregister();
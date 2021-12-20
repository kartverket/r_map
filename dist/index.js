"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BackgroundChooser", {
  enumerable: true,
  get: function () {
    return _BackgroundChooser.default;
  }
});
Object.defineProperty(exports, "Legend", {
  enumerable: true,
  get: function () {
    return _Legend.default;
  }
});
Object.defineProperty(exports, "MapComponent", {
  enumerable: true,
  get: function () {
    return _MapComponent.default;
  }
});
Object.defineProperty(exports, "MapContainer", {
  enumerable: true,
  get: function () {
    return _MapContainer.default;
  }
});
Object.defineProperty(exports, "ServicePanel", {
  enumerable: true,
  get: function () {
    return _ServicePanel.default;
  }
});

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./index.scss");

require("bootstrap/dist/css/bootstrap.min.css");

var _App = _interopRequireDefault(require("./App"));

var serviceWorker = _interopRequireWildcard(require("./serviceWorker"));

require("./Utils/icons");

var _ServicePanel = _interopRequireDefault(require("./components/ServicePanel/ServicePanel"));

var _BackgroundChooser = _interopRequireDefault(require("./components/BackgroundChooser/BackgroundChooser"));

var _MapComponent = _interopRequireDefault(require("./components/MapComponent/MapComponent"));

var _MapContainer = _interopRequireDefault(require("./components/MapContainer/MapContainer"));

var _Legend = _interopRequireDefault(require("./components/Legend/Legend"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_App.default, null), document.getElementById('root'));

serviceWorker.unregister();
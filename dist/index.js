"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AddServicePanel", {
  enumerable: true,
  get: function get() {
    return _AddServicePanel.default;
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

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./index.css");

var _App = _interopRequireDefault(require("./App"));

var serviceWorker = _interopRequireWildcard(require("./serviceWorker"));

require("./Utils/icons");

var _AddServicePanel = _interopRequireDefault(require("./components/AddServicePanel/AddServicePanel"));

var _BackgroundChooser = _interopRequireDefault(require("./components/BackgroundChooser/BackgroundChooser"));

var _MapComponent = _interopRequireDefault(require("./components/MapComponent/MapComponent"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom.default.render(_react.default.createElement(_App.default, null), document.getElementById('root'));

serviceWorker.unregister();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _reactBootstrap = require("react-bootstrap");

var _BackgroundChooserModule = _interopRequireDefault(require("./BackgroundChooser.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Panel containing a list of backgroundLayers. To be used in MapContainer
 */
const BackgroundChooser = () => {
  const _useState = (0, _react.useState)([]),
        _useState2 = _slicedToArray(_useState, 2),
        baseLayers = _useState2[0],
        setBaseLayers = _useState2[1];

  const _useState3 = (0, _react.useState)([]),
        _useState4 = _slicedToArray(_useState3, 2),
        baseLayer = _useState4[0],
        setBaseLayer = _useState4[1];

  _maplibHelper.eventHandler.RegisterEvent("MapLoaded", () => setBaseLayers(_maplibHelper.map.GetBaseLayers()));

  const setAsBaseLayer = baseLayer => {
    _maplibHelper.map.SetBaseLayer(baseLayer);

    _maplibHelper.map.ZoomToLayer(baseLayer);

    setBaseLayer(baseLayer);
  };

  const renderBaseLayers = (baseLayers, selectedBaseLayer) => {
    return baseLayers.map((baseLayer, index) => {
      const iconClass = _BackgroundChooserModule.default["icon_".concat(baseLayer.id)];

      const activeClass = baseLayer.id === selectedBaseLayer.id ? _BackgroundChooserModule.default.active : '';
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButton, {
        key: index,
        className: "".concat(iconClass, " ").concat(activeClass),
        value: baseLayer
      }, /*#__PURE__*/_react.default.createElement("span", null, " ", baseLayer.name, " "));
    });
  };

  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.ToggleButtonGroup, {
    type: "radio",
    name: "Backgound",
    className: _BackgroundChooserModule.default.backgroundChooser,
    onChange: setAsBaseLayer,
    value: baseLayer
  }, renderBaseLayers(baseLayers, baseLayer));
};

var _default = BackgroundChooser;
exports.default = _default;
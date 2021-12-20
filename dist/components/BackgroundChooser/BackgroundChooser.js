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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Panel containing a list of backgroundLayers. To be used in MapContainer
 */
const BackgroundChooser = () => {
  const [baseLayers, setBaseLayers] = (0, _react.useState)([]);
  const [baseLayer, setBaseLayer] = (0, _react.useState)([]);

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
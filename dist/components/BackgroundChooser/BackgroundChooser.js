"use strict";

var _interopRequireWildcard = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _reactBootstrap = require("react-bootstrap");

var _BackgroundChooserModule = _interopRequireDefault(require("./BackgroundChooser.module.scss"));

/**
 * Panel containing a list of backgroundLayers. To be used in MapContainer
 */
var BackgroundChooser = function BackgroundChooser() {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      baseLayers = _useState2[0],
      setBaseLayers = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      baseLayer = _useState4[0],
      setBaseLayer = _useState4[1];

  _maplibHelper.eventHandler.RegisterEvent("MapLoaded", function () {
    return setBaseLayers(_maplibHelper.map.GetBaseLayers());
  });

  var setAsBaseLayer = function setAsBaseLayer(baseLayer) {
    _maplibHelper.map.SetBaseLayer(baseLayer);

    _maplibHelper.map.ZoomToLayer(baseLayer);

    setBaseLayer(baseLayer);
  };

  var renderBaseLayers = function renderBaseLayers(baseLayers, selectedBaseLayer) {
    return baseLayers.map(function (baseLayer, index) {
      var iconClass = _BackgroundChooserModule.default["icon_".concat(baseLayer.id)];

      var activeClass = baseLayer.id === selectedBaseLayer.id ? _BackgroundChooserModule.default.active : '';
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
"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _reactBootstrap = require("react-bootstrap");

require("./BackgroundChooser.scss");

/**
 * Panel containing a list of backgroundLayers.
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

  _maplibHelper.eventHandler.RegisterEvent('MapLoaded', function () {
    return setBaseLayers(_maplibHelper.map.GetBaseLayers());
  });

  var setAsBaseLayer = function setAsBaseLayer(baseLayer) {
    _maplibHelper.map.SetBaseLayer(baseLayer);

    _maplibHelper.map.ZoomToLayer(baseLayer);

    setBaseLayer(baseLayer);
  };

  var renderBaseLayers = function renderBaseLayers(baseLayers) {
    return baseLayers.map(function (baseLayer, index) {
      return _react.default.createElement(_reactBootstrap.ToggleButton, {
        key: index,
        className: 'icon_' + baseLayer.id,
        value: baseLayer
      }, _react.default.createElement("span", null, " ", baseLayer.name, " "));
    });
  };

  return _react.default.createElement(_reactBootstrap.ToggleButtonGroup, {
    type: "radio",
    name: "Backgound",
    className: "backgroundChooser",
    onChange: setAsBaseLayer,
    value: baseLayer
  }, renderBaseLayers(baseLayers));
};

var _default = BackgroundChooser;
exports.default = _default;
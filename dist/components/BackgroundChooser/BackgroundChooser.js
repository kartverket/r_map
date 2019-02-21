"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

var _reactBootstrap = require("react-bootstrap");

require("./BackgroundChooser.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Panel containing a list of backgroundLayers.
 */
var BackgroundChooser = function BackgroundChooser() {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      baseLayers = _useState2[0],
      setBaseLayers = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
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

  var renderBaseLayers = function renderBaseLayers(baseLayers) {
    return baseLayers.map(function (baseLayer, index) {
      return _react.default.createElement(_reactBootstrap.ToggleButton, {
        key: index,
        className: "icon_" + baseLayer.id,
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
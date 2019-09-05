"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _LayerEntry = _interopRequireDefault(require("./LayerEntry.scss"));

var _InlineLegend = _interopRequireDefault(require("../Legend/InlineLegend"));

var _CapabilitiesUtil = require("../../MapUtil/CapabilitiesUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LayerEntry = function LayerEntry(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      toggleOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      olLayer = _useState4[0],
      setLayer = _useState4[1];

  var _useState5 = (0, _react.useState)(props.layer.isVisible),
      _useState6 = _slicedToArray(_useState5, 2),
      checked = _useState6[0],
      setChecked = _useState6[1];

  var _useState7 = (0, _react.useState)(50),
      _useState8 = _slicedToArray(_useState7, 2),
      transparency = _useState8[0],
      setTransparency = _useState8[1];

  var layer = props.layer;
  var info = ''; // layer.Abstract  //Prepare for some info text, for example the Abstract info or more.

  var abstractTextSpan = function abstractTextSpan() {
    var textSpan = '';

    if (layer.Name && layer.Name.length > 0) {
      textSpan = layer.Name;
    }

    if (layer.Title && layer.Title.length > 0 && layer.Title !== layer.Name) {
      textSpan = layer.Title;
    }

    if (layer.Abstract && layer.Abstract.length > 0 && layer.Abstract !== layer.Title && layer.Abstract !== layer.Name && textSpan.length === 0) {
      textSpan = textSpan.length === 0 ? layer.Abstract : textSpan + ' - ' + layer.Abstract;
    }

    return _react.default.createElement("span", null, textSpan);
  };

  var onSelectionChange = function onSelectionChange(currentNode) {
    var isNewLayer = true;

    if (layer.Name) {
      var currentLayer = _CapabilitiesUtil.CapabilitiesUtil.getOlLayerFromWmsCapabilities(props.meta, currentNode);

      setLayer(currentLayer);
      window.olMap.getLayers().forEach(function (maplayer) {
        if (maplayer.get('name') === (currentNode.Name || currentNode.Title)) {
          isNewLayer = false;
          maplayer.getVisible() ? maplayer.setVisible(false) : maplayer.setVisible(true);
          setChecked(maplayer.getVisible());
        }
      });

      if (isNewLayer) {
        window.olMap.addLayer(currentLayer);
        setChecked(currentLayer.getVisible());
      }
    }
  };

  var setOpacity = function setOpacity(value) {
    setTransparency(value);

    if (olLayer) {
      olLayer.setOpacity(Math.min(transparency / 100, 1));
    }
  };

  var checkResolution = function checkResolution() {
    var resolution = window.olMap.getView().getResolution();

    if (layer.MaxScaleDenominator <= resolution) {
      console.warn("Resolution mismatch, layer " + layer.Name + " doesn't show at this zoom level ");
    }
  };

  window.olMap.getView().on('change:resolution', function (e) {
    checkResolution();
  });
  return _react.default.createElement(_react.default.Fragment, null, layer.Name ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", {
    className: "checkbox",
    id: layer.Name,
    type: "checkbox"
  }), _react.default.createElement("label", {
    onClick: function onClick() {
      return onSelectionChange(layer);
    },
    htmlFor: layer.Title
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "svg-checkbox",
    icon: checked ? ["far", "check-square"] : ["far", "square"]
  }))) : _react.default.createElement("label", {
    onClick: function onClick() {
      return onSelectionChange(layer);
    },
    htmlFor: layer.Title
  }, " "), abstractTextSpan(), info ? _react.default.createElement("div", {
    class: "info"
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "infoIcon",
    icon: ["far", "info"]
  }), _react.default.createElement("span", {
    class: "infoText"
  }, info)) : null, layer.Name ? _react.default.createElement("label", {
    onClick: function onClick() {
      return toggleOptions(!options);
    }
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ["far", "sliders-h"],
    color: options ? "red" : "black"
  })) : '', _react.default.createElement(_InlineLegend.default, {
    legendUrl: layer.Style && layer.Style[0].LegendURL ? layer.Style[0].LegendURL[0].OnlineResource : ''
  }), options ? _react.default.createElement("div", {
    className: _LayerEntry.default.settings
  }, _react.default.createElement("label", {
    className: _LayerEntry.default.slider
  }, "Gjennomsiktighet:", _react.default.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: transparency,
    onChange: function onChange(e) {
      return setOpacity(e.target.value);
    }
  }))) : "", props.children);
};

LayerEntry.propTypes = {
  layer: _propTypes.default.object,
  meta: _propTypes.default.object
};
var _default = LayerEntry;
exports.default = _default;
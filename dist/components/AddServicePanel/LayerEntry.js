"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _LayerEntry = _interopRequireDefault(require("./LayerEntry.scss"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

/**
 *
 */
var LayerEntry = function LayerEntry(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      options = _useState2[0],
      toggleOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(props.layer.isVisible),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      checked = _useState4[0],
      setChecked = _useState4[1];

  var _useState5 = (0, _react.useState)(50),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      transparency = _useState6[0],
      setTransparency = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      index = _useState8[0],
      setIndex = _useState8[1];

  var layer = props.layer;
  var copyright = layer.copyright;
  /**
   *
   */

  var abstractTextSpan = function abstractTextSpan() {
    return layer.abstract ? _react.default.createElement("span", null, "".concat(layer.label, " - ").concat(layer.abstract, ":")) : _react.default.createElement("span", null, "".concat(layer.label));
  };
  /**
   *
   * @param {*} currentNode
   */


  var onSelectionChange = function onSelectionChange(currentNode) {
    if (!_maplibHelper.map.GetOverlayLayers().includes(currentNode)) {
      _maplibHelper.map.AddLayer(currentNode);
    } else {
      if (_maplibHelper.map.GetVisibleSubLayers().find(function (el) {
        return el.id === currentNode.id;
      })) {
        _maplibHelper.map.HideLayer(currentNode);
      } else {
        _maplibHelper.map.ShowLayer(currentNode);
      }
    }

    setChecked(currentNode.isVisible);
  };
  /**
   *
   */


  var setOpacity = function setOpacity(value) {
    setTransparency(value);

    _maplibHelper.map.SetLayerOpacity(layer, transparency / 100);
  };
  /**
   *
   */


  var setLayerIndex = function setLayerIndex(newIndex) {
    setIndex(newIndex);

    _maplibHelper.map.SetZIndex(layer.subLayers[0], newIndex);
  };
  /**
   *
   */


  var checkResolution = function checkResolution() {
    var resolution = window.olMap.getView().getResolution();

    if (layer.subLayers[0].maxScale <= resolution) {
      console.warn('Resolution mismatch, layer ' + layer.name + ' doesn\'t show at this zoom level ');
    }
  };

  window.olMap.getView().on('change:resolution', function () {
    checkResolution();
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("input", {
    className: "checkbox",
    id: layer.id,
    type: "checkbox"
  }), _react.default.createElement("label", {
    onClick: function onClick() {
      return onSelectionChange(layer);
    },
    htmlFor: layer.id
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "svg-checkbox",
    icon: checked ? ['far', 'check-square'] : ['far', 'square']
  })), ' ', abstractTextSpan(), copyright ? _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "infoIcon",
    icon: ['info']
  }) : null, _react.default.createElement("label", {
    onClick: function onClick() {
      return toggleOptions(!options);
    }
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ['far', 'sliders-h'],
    color: options ? 'red' : 'black'
  })), options ? _react.default.createElement("div", {
    className: _LayerEntry.default.settings
  }, _react.default.createElement("div", null, _react.default.createElement("button", {
    className: _LayerEntry.default.movelayerBtn,
    onClick: function onClick() {
      return setLayerIndex(index + 1);
    }
  }, "Flytt fremover", _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    title: "Vis laget over",
    icon: ['fas', 'arrow-up']
  })), _react.default.createElement("button", {
    className: _LayerEntry.default.movelayerBtn,
    onClick: function onClick() {
      return setLayerIndex(index - 1);
    }
  }, "Flytt bakover ", _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    title: "Vis laget under",
    icon: ['fas', 'arrow-down']
  })), _react.default.createElement("span", {
    className: _LayerEntry.default.priority
  }, "Prioritet: ", index)), _react.default.createElement("label", {
    className: _LayerEntry.default.slider
  }, "Gjennomsiktighet:", _react.default.createElement("input", {
    type: "range",
    min: 0,
    max: 100,
    value: transparency,
    onChange: function onChange(e) {
      return setOpacity(e.target.value);
    }
  }))) : '', props.children);
};

var _default = LayerEntry;
exports.default = _default;
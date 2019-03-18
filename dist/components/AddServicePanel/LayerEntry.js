"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _LayerEntry = _interopRequireDefault(require("./LayerEntry.scss"));

var _maplibHelper = require("../../MapUtil/maplibHelper");

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

  var _useState3 = (0, _react.useState)(props.layer.isVisible),
      _useState4 = _slicedToArray(_useState3, 2),
      checked = _useState4[0],
      setChecked = _useState4[1];

  var _useState5 = (0, _react.useState)(50),
      _useState6 = _slicedToArray(_useState5, 2),
      transparency = _useState6[0],
      setTransparency = _useState6[1]; //const [index, setIndex] = useState(0);


  var layer = props.layer;
  var copyright = layer.copyright;

  var abstractTextSpan = function abstractTextSpan() {
    return layer.abstract ? _react.default.createElement("span", null, "".concat(layer.label, " - ").concat(layer.abstract, ":")) : _react.default.createElement("span", null, "".concat(layer.label));
  };

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

  var setOpacity = function setOpacity(value) {
    setTransparency(value);

    _maplibHelper.map.SetLayerOpacity(layer, transparency / 100);
  };
  /**
   *
   const setLayerIndex = newIndex => {
    setIndex(newIndex);
    map.SetZIndex(layer.subLayers[0], newIndex);
  };
   */

  /**
   *
   */


  var checkResolution = function checkResolution() {
    var resolution = window.olMap.getView().getResolution();

    if (layer.subLayers[0].maxScale <= resolution) {
      console.warn("Resolution mismatch, layer " + layer.name + " doesn't show at this zoom level ");
    }
  };

  window.olMap.getView().on('change:resolution', function (e) {
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
    icon: checked ? ["far", "check-square"] : ["far", "square"]
  })), " ", abstractTextSpan(), copyright ? _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "infoIcon",
    icon: ["info"]
  }) : null, _react.default.createElement("label", {
    onClick: function onClick() {
      return toggleOptions(!options);
    }
  }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: ["far", "sliders-h"],
    color: options ? "red" : "black"
  })), options ? _react.default.createElement("div", {
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
  layer: _propTypes.default.object
};
var _default = LayerEntry;
exports.default = _default;
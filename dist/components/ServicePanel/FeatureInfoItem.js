"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Modal = _interopRequireDefault(require("react-bootstrap/Modal"));

var _FeatureInfoItemModule = _interopRequireDefault(require("./FeatureInfoItem.module.scss"));

var _uniqid = _interopRequireDefault(require("uniqid"));

var _store = require("../../Utils/store.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FeatureInfoItem = function FeatureInfoItem() {
  var featureContext = (0, _react.useContext)(_store.store);
  var dispatch = featureContext.dispatch;

  var testFormat = function testFormat(s) {
    if (typeof s === 'object') return 'isObject';
    var rX = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i;
    var M = rX.exec(s);
    if (!M) return '';

    switch (M[1]) {
      case M[2]:
        return 'isNumeric';

      case M[3]:
        return 'isBoolean';

      case M[4]:
        return 'isDate';

      case M[5]:
        {
          if (M[5].length === 50 || M[5].length === 194) {
            return 'isBboxInternal';
          } else if (M[5].startsWith('{"type":"Point"')) {
            return 'isBboxJsonPoint';
          } else if (M[5].startsWith('{"type":"Polygon"')) {
            return 'isBboxJsonPolygon';
          } else if (M[5].startsWith('BOX(')) {
            return 'isBboxSimple';
          } else {
            return 'isString';
          }
        }

      default:
        return false;
    }
  };

  var prepareItemFormat = function prepareItemFormat(v) {
    var test = testFormat(v);

    switch (test) {
      case 'isNumeric':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);

      case 'isBoolean':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);

      case 'isDate':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);
      // TODO: formatt?

      case 'isBboxInternal':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "BBOX db internal");
      // TODO: klikke for å vise?

      case 'isBboxJsonPoint':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "BBOX point");
      // TODO: klikke for å vise?

      case 'isBboxJsonPolygon':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "BBOX polygon");
      // TODO: klikke for å vise?

      case 'isBboxSimple':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);
      // TODO: klikke for å vise?

      case 'isString':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);

      default:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }
  };

  var prepareFeature = function prepareFeature(info) {
    var layers = [];

    for (var key in info) {
      var layer = info[key];
      var featureRow = [];

      if (Array.isArray(layer)) {
        for (var _key in layer) {
          if (_key !== 'name') {
            var feature = layer[_key];

            for (var _key2 in feature) {
              var items = feature[_key2];

              if (typeof items !== "string") {
                for (var _i = 0, _Object$entries = Object.entries(items); _i < _Object$entries.length; _i++) {
                  var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                      _key3 = _Object$entries$_i[0],
                      value = _Object$entries$_i[1];

                  featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
                    key: (0, _uniqid.default)(_key3)
                  }, /*#__PURE__*/_react.default.createElement("i", null, _key3, " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(value)), " "));
                }
              } else {
                featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
                  key: (0, _uniqid.default)(_key2)
                }, /*#__PURE__*/_react.default.createElement("i", null, 'FeatureID', " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(items)), " "));
              }
            }
          }
        }
      } else {
        for (var _i2 = 0, _Object$entries2 = Object.entries(layer); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              _key4 = _Object$entries2$_i[0],
              _value = _Object$entries2$_i[1];

          featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
            key: (0, _uniqid.default)(_key4)
          }, /*#__PURE__*/_react.default.createElement("i", null, _key4, " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(_value)), " "));
        }
      }

      layers.push( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: (0, _uniqid.default)(key)
      }, /*#__PURE__*/_react.default.createElement("h3", null, key), /*#__PURE__*/_react.default.createElement("ul", null, featureRow)));
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: _FeatureInfoItemModule.default.ulContainer,
      key: (0, _uniqid.default)()
    }, layers);
  };

  var featureContent = function featureContent() {
    if (Array.isArray(featureContext.state.info)) {
      return featureContext.state.info.map(function (info) {
        return prepareFeature(info);
      });
    } else {
      return /*#__PURE__*/_react.default.createElement("div", null, "No info");
    }
  };

  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    show: featureContext.state.show,
    onHide: function onHide() {
      return dispatch({
        type: "HIDE_FEATURES",
        info: featureContext.state.info
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Header, {
    closeButton: true
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Title, null, "Egenskaper ", /*#__PURE__*/_react.default.createElement("span", null, " ( ", featureContext.state.info ? featureContext.state.info.length : 0, " )"), " ")), /*#__PURE__*/_react.default.createElement(_Modal.default.Body, null, featureContent()));
};

var _default = FeatureInfoItem;
exports.default = _default;
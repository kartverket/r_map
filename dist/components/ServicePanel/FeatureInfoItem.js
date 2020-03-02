"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Modal = _interopRequireDefault(require("react-bootstrap/Modal"));

var _FeatureInfoItemModule = _interopRequireDefault(require("./FeatureInfoItem.module.scss"));

var _uniqid = _interopRequireDefault(require("uniqid"));

var _reactSmee = require("react-smee");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var FeatureInfoItem = function FeatureInfoItem(props) {
  var featureState = (0, _reactSmee.useStore)('smee');

  var testFormat = function testFormat(s) {
    if (_typeof(s) === 'object') return 'isObject';
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
        return _react.default.createElement(_react.default.Fragment, null, v);

      case 'isBoolean':
        return _react.default.createElement(_react.default.Fragment, null, v);

      case 'isDate':
        return _react.default.createElement(_react.default.Fragment, null, v);
      // TODO: formatt?

      case 'isBboxInternal':
        return _react.default.createElement(_react.default.Fragment, null, "BBOX db internal");
      // TODO: klikke for å vise?

      case 'isBboxJsonPoint':
        return _react.default.createElement(_react.default.Fragment, null, "BBOX point");
      // TODO: klikke for å vise?

      case 'isBboxJsonPolygon':
        return _react.default.createElement(_react.default.Fragment, null, "BBOX polygon");
      // TODO: klikke for å vise?

      case 'isBboxSimple':
        return _react.default.createElement(_react.default.Fragment, null, v);
      // TODO: klikke for å vise?

      case 'isString':
        return _react.default.createElement(_react.default.Fragment, null, v);

      default:
        return _react.default.createElement(_react.default.Fragment, null);
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

              for (var _i = 0, _Object$entries = Object.entries(items); _i < _Object$entries.length; _i++) {
                var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                    _key3 = _Object$entries$_i[0],
                    value = _Object$entries$_i[1];

                featureRow.push(_react.default.createElement("li", {
                  key: (0, _uniqid.default)(_key3)
                }, _react.default.createElement("i", null, _key3, " "), " = ", _react.default.createElement("strong", null, prepareItemFormat(value)), " "));
              }
            }
          }
        }
      } else {
        for (var _i2 = 0, _Object$entries2 = Object.entries(layer); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
              _key4 = _Object$entries2$_i[0],
              _value = _Object$entries2$_i[1];

          featureRow.push(_react.default.createElement("li", {
            key: (0, _uniqid.default)(_key4)
          }, _react.default.createElement("i", null, _key4, " "), " = ", _react.default.createElement("strong", null, prepareItemFormat(_value)), " "));
        }
      }

      layers.push(_react.default.createElement(_react.default.Fragment, {
        key: (0, _uniqid.default)(key)
      }, _react.default.createElement("h3", null, key), _react.default.createElement("ul", null, featureRow)));
    }

    return _react.default.createElement("div", {
      className: _FeatureInfoItemModule.default.ulContainer,
      key: (0, _uniqid.default)()
    }, layers);
  };

  return _react.default.createElement(_Modal.default, {
    show: featureState.show,
    onHide: function onHide() {
      return (0, _reactSmee.setStore)('smee', function () {
        var info = {
          show: false,
          info: featureState.info
        };
        return info;
      });
    }
  }, _react.default.createElement(_Modal.default.Header, {
    closeButton: true
  }, _react.default.createElement(_Modal.default.Title, null, "Egenskaper ", _react.default.createElement("span", null, " ( ", featureState.info.length, " )"), " ")), _react.default.createElement(_Modal.default.Body, null, featureState.info.map(function (info) {
    return prepareFeature(info);
  })));
};

var _default = FeatureInfoItem;
exports.default = _default;
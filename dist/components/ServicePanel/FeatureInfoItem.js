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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const FeatureInfoItem = () => {
  const featureContext = (0, _react.useContext)(_store.store);
  const {
    dispatch
  } = featureContext;
  const testFormat = s => {
    if (typeof s === 'object') return 'isObject';
    const rX = /^((\d+)|(true|false)|(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\+\d{2})|([\w\W]+))$/i;
    const M = rX.exec(s);
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
          } else if (M[5].startsWith('http')) {
            return 'isLink';
          } else {
            return 'isString';
          }
        }
      default:
        return false;
    }
  };
  const prepareItemFormat = v => {
    const test = testFormat(v);
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
      case 'isLink':
        return /*#__PURE__*/_react.default.createElement("a", {
          href: v,
          target: "_blank",
          rel: "noreferrer"
        }, v);
      case 'isString':
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, v);
      default:
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
    }
  };
  const prepareFeature = info => {
    let layers = [];
    for (const key in info) {
      let layer = info[key];
      let featureRow = [];
      if (Array.isArray(layer)) {
        for (const key in layer) {
          if (key !== 'name') {
            const feature = layer[key];
            for (const key in feature) {
              const items = feature[key];
              if (typeof items !== "string") {
                for (let [key, value] of Object.entries(items)) {
                  featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
                    key: (0, _uniqid.default)(key)
                  }, /*#__PURE__*/_react.default.createElement("i", null, key, " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(value)), " "));
                }
              } else {
                featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
                  key: (0, _uniqid.default)(key)
                }, /*#__PURE__*/_react.default.createElement("i", null, 'FeatureID', " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(items)), " "));
              }
            }
          }
        }
      } else {
        for (let [key, value] of Object.entries(layer)) {
          featureRow.push( /*#__PURE__*/_react.default.createElement("li", {
            key: (0, _uniqid.default)(key)
          }, /*#__PURE__*/_react.default.createElement("i", null, key, " "), " = ", /*#__PURE__*/_react.default.createElement("strong", null, prepareItemFormat(value)), " "));
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
  const featureContent = () => {
    if (Array.isArray(featureContext.state.info)) {
      return featureContext.state.info.map(info => prepareFeature(info));
    } else {
      return /*#__PURE__*/_react.default.createElement("div", null, "No info");
    }
  };
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    show: featureContext.state.show,
    onHide: () => dispatch({
      type: "HIDE_FEATURES",
      info: featureContext.state.info
    })
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Header, {
    closeButton: true
  }, /*#__PURE__*/_react.default.createElement(_Modal.default.Title, null, "Egenskaper ", /*#__PURE__*/_react.default.createElement("span", null, " ( ", featureContext.state.info ? featureContext.state.info.length : 0, " )"), " ")), /*#__PURE__*/_react.default.createElement(_Modal.default.Body, null, featureContent()));
};
var _default = FeatureInfoItem;
exports.default = _default;
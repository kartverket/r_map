"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _FeatureReducer = _interopRequireDefault(require("./FeatureReducer"));

var _SearchReducer = _interopRequireDefault(require("./SearchReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return (0, _redux.combineReducers)({
    FeatureReducer: _FeatureReducer.default,
    SearchReducer: _SearchReducer.default
  });
};

exports.default = _default;
"use strict";

var _interopRequireWildcard = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateProvider = exports.store = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("/Users/carstenmielke/Projekte/r_map.github/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var initialState = {};
var store = (0, _react.createContext)(initialState);
exports.store = store;
var Provider = store.Provider;

var StateProvider = function StateProvider(_ref) {
  var children = _ref.children;

  var _useReducer = (0, _react.useReducer)(function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_FEATURES':
        var appendedAInfo = state.info ? state.info.concat(action.info) : action.info;
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          info: appendedAInfo,
          show: true
        });

      case 'SHOW_FEATURES':
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          info: action.info,
          show: true
        });

      case 'HIDE_FEATURES':
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, state), {}, {
          info: [],
          show: false
        });

      default:
        throw new Error();
    }

    ;
  }, initialState),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return /*#__PURE__*/_react.default.createElement(Provider, {
    value: {
      state,
      dispatch
    }
  }, children);
};

exports.StateProvider = StateProvider;
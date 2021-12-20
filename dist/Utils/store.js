"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.StateProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const initialState = {};
const store = /*#__PURE__*/(0, _react.createContext)(initialState);
exports.store = store;
const {
  Provider
} = store;

const StateProvider = _ref => {
  let {
    children
  } = _ref;
  const [state, dispatch] = (0, _react.useReducer)(function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SET_FEATURES':
        const appendedAInfo = state.info ? state.info.concat(action.info) : action.info;
        return { ...state,
          info: appendedAInfo,
          show: true
        };

      case 'SHOW_FEATURES':
        return { ...state,
          info: action.info,
          show: true
        };

      case 'HIDE_FEATURES':
        return { ...state,
          info: [],
          show: false
        };

      default:
        throw new Error();
    }

    ;
  }, initialState);
  return /*#__PURE__*/_react.default.createElement(Provider, {
    value: {
      state,
      dispatch
    }
  }, children);
};

exports.StateProvider = StateProvider;
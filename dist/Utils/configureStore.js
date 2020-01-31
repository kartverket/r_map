"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reducers = _interopRequireDefault(require("../reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = (0, _reduxDevtoolsExtension.composeWithDevTools)({// options like actionSanitizer, stateSanitizer
});

function configureStore(preloadedState) {
  var middleware = [_reduxThunk.default];
  var store = (0, _redux.createStore)((0, _reducers.default)(), preloadedState, composeEnhancers(_redux.applyMiddleware.apply(void 0, middleware))); //loadUser(store, userManager)

  return store;
}
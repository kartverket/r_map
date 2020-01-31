"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _types = require("../actions/types");

var initialState = '';

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.UPDATE_SEARCH_STRING:
      return action.payload;

    case _types.UPDATE_SEARCH_STRING_FROM_URL:
      return action.payload;

    default:
      return state;
  }
}
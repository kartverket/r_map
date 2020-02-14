"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FeatureActions = require("./FeatureActions");

var _SearchActions = require("./SearchActions");

var allActions = {
  setFeature: _FeatureActions.setFeature,
  updateSearchString: _SearchActions.updateSearchString,
  searchList: _SearchActions.searchList
};
var _default = allActions;
exports.default = _default;
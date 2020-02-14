"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideFeatureInfo = exports.setFeature = exports.HIDE_FEATURES = exports.SHOW_FEATURES = exports.SET_FEATURES = void 0;

var _FeatureUtil = require("../MapUtil/FeatureUtil");

var SET_FEATURES = 'SET_FEATURES';
exports.SET_FEATURES = SET_FEATURES;
var SHOW_FEATURES = 'SHOW_FEATURES';
exports.SHOW_FEATURES = SHOW_FEATURES;
var HIDE_FEATURES = 'HIDE_FEATURES';
exports.HIDE_FEATURES = HIDE_FEATURES;

var setFeature = function setFeature(features, format) {
  return {
    type: SET_FEATURES,
    info: (0, _FeatureUtil.parseFeatureInfo)(features, format)
  };
};

exports.setFeature = setFeature;

var hideFeatureInfo = function hideFeatureInfo(features) {
  return {
    type: HIDE_FEATURES,
    info: features
  };
};

exports.hideFeatureInfo = hideFeatureInfo;
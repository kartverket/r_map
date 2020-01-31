"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchList = exports.updateSearchStringFromUrl = exports.updateSearchString = void 0;

var _types = require("../actions/types");

var updateSearchString = function updateSearchString(searchString) {
  return function (dispatch) {
    dispatch({
      type: _types.UPDATE_SEARCH_STRING,
      payload: searchString
    });
  };
};

exports.updateSearchString = updateSearchString;

var updateSearchStringFromUrl = function updateSearchStringFromUrl() {
  return function (dispatch) {
    var urlParameters = decodeURI(window.location.search);
    var regex = /A?text=[^&]*/;
    var searchString = regex.exec(urlParameters) !== null ? regex.exec(urlParameters)[0].replace('text=', '') : '';
    dispatch({
      type: _types.UPDATE_SEARCH_STRING_FROM_URL,
      payload: searchString
    });
    return searchString;
  };
};

exports.updateSearchStringFromUrl = updateSearchStringFromUrl;

var searchList = function searchList(list) {
  return {
    type: _types.SEARCH_LIST,
    payload: list
  };
};

exports.searchList = searchList;
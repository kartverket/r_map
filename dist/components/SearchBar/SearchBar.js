"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _proj = require("ol/proj");

var _Overlay = _interopRequireDefault(require("ol/Overlay"));

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _n3api = require("../../Utils/n3api");

require("./SearchBar.scss");

var _pinMdOrange = _interopRequireDefault(require("../../../src/assets/img/pin-md-orange.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var parser = require('fast-xml-parser');

var SearchResult = function SearchResult(props) {
  window.olMap.getOverlays().clear();

  var showInfoMarker = function showInfoMarker(coordinate) {
    var markerElement = document.createElement('img');
    markerElement.src = _pinMdOrange.default;
    var marker = new _Overlay.default({
      position: coordinate,
      positioning: "center-center",
      element: markerElement,
      stopEvent: false
    });
    window.olMap.addOverlay(marker);
  };

  var centerPosition = function centerPosition(coordinate) {
    window.olMap.getView().setCenter(coordinate);
  };

  var constructPoint = function constructPoint(coord) {
    var epsgTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EPSG:25833';
    return (0, _proj.transform)([Number(coord.lon), Number(coord.lat)], coord.epsg, epsgTo);
  };

  return _react.default.createElement("div", {
    className: "list-group"
  }, props.searchResult.searchResult && props.searchResult.searchResult.adresser.map(function (data, idx) {
    showInfoMarker(constructPoint(data.representasjonspunkt));
    return _react.default.createElement("button", {
      type: "button",
      key: idx,
      className: "list-group-item list-group-item-action",
      onClick: function onClick() {
        centerPosition(constructPoint(data.representasjonspunkt));
      }
    }, "Adresse: ", data.adressetekst, " , ", data.kommunenavn);
  }), props.searchResult.searchResultSSR && props.searchResult.searchResultSSR.sokRes.stedsnavn.map(function (data, idx) {
    showInfoMarker(constructPoint({
      lon: data.aust,
      lat: data.nord,
      epsg: 'EPSG:25833'
    }));
    return _react.default.createElement("button", {
      type: "button",
      key: idx,
      className: "list-group-item list-group-item-action",
      onClick: function onClick() {
        centerPosition(constructPoint({
          lon: data.aust,
          lat: data.nord,
          epsg: 'EPSG:25833'
        }));
      }
    }, "Stedsnavn: ", data.stedsnavn, " , ", data.kommunenavn);
  }));
};
/**
 * SearchBar to be used in MapContainer
 * @param {*} props
 */


var SearchBar = function SearchBar(props) {
  var queryValues = _queryString.default.parse(window.location.search);

  var _useState = (0, _react.useState)(queryValues["search"]),
      _useState2 = _slicedToArray(_useState, 2),
      searchText = _useState2[0],
      setSearchText = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      searchResult = _useState4[0],
      setSearchResult = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      searchResultSSR = _useState6[0],
      setSearchResultSSR = _useState6[1];

  var placeholder = props.placeholder;
  (0, _react.useEffect)(function () {
    if (searchText) {
      queryValues.search = searchText;
      (0, _setQueryString.default)(queryValues);
      fetch((0, _n3api.generateAdresseSokUrl)(searchText)).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }).then(function (result) {
        setSearchResult(result);
      }).catch(function (error) {
        console.warn(error);
      });
      fetch((0, _n3api.generateSearchStedsnavnUrl)(searchText, 1, 15)).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.text();
      }).then(function (result) {
        var response = parser.parse(result);
        response.sokRes.stedsnavn ? setSearchResultSSR(response) : setSearchResultSSR('');
      }).catch(function (error) {
        console.warn(error);
      });
    } else {
      setSearchResult('');
      setSearchResultSSR('');
      window.olMap.getOverlays().clear();
    }
  }, [searchText]);

  var onChangeBound = function onChangeBound(event) {
    setSearchText(event.target.value);
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "input-group col col-lg-2"
  }, _react.default.createElement("input", {
    className: "form-control",
    onChange: onChangeBound,
    placeholder: placeholder,
    type: "text",
    value: searchText,
    "aria-describedby": "button-addon1"
  })), _react.default.createElement("div", {
    className: "searchResult"
  }, searchResult && _react.default.createElement(SearchResult, {
    searchResult: {
      searchResult: searchResult,
      searchResultSSR: searchResultSSR
    }
  })));
};

SearchBar.propTypes = {
  classNames: _propTypes.default.string,
  searchText: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onSearchClick: _propTypes.default.func
};
SearchBar.defaultProps = {
  classNames: '',
  searchText: '',
  placeholder: 'Search text',
  onChange: null,
  onEnter: null,
  onSearchClick: null
};
var _default = SearchBar;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _queryString = _interopRequireDefault(require("query-string"));

var _setQueryString = _interopRequireDefault(require("set-query-string"));

var _pinMdOrange = _interopRequireDefault(require("../../assets/img/pin-md-orange.png"));

var _pinMdBlueish = _interopRequireDefault(require("../../assets/img/pin-md-blueish.png"));

var _icons = require("@material-ui/icons");

var _styles = require("@material-ui/core/styles");

var _core = require("@material-ui/core");

var _SearchBarModule = _interopRequireDefault(require("./SearchBar.module.scss"));

var _proj = require("ol/proj");

var _layer = require("ol/layer.js");

var _source = require("ol/source.js");

var _Feature = _interopRequireDefault(require("ol/Feature.js"));

var _style = require("ol/style");

var _Point = _interopRequireDefault(require("ol/geom/Point"));

var _n3api = require("../../Utils/n3api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var parser = require('fast-xml-parser');

var defaultZoom = 13;
var vectorSource = new _source.Vector({});

var SearchResult = function SearchResult(props) {
  var vectorLayer = new _layer.Vector({
    source: vectorSource
  });
  window.olMap.addLayer(vectorLayer);
  var icon_orange = new _style.Style({
    image: new _style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: _pinMdOrange.default
    })
  });
  var icon_blue = new _style.Style({
    image: new _style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: _pinMdBlueish.default
    })
  });
  var features = [];

  var showInfoMarker = function showInfoMarker(coordinate) {
    var iconFeature = new _Feature.default({
      geometry: new _Point.default(coordinate)
    });
    iconFeature.setStyle(icon_orange);
    vectorSource.addFeature(iconFeature);
  };

  var centerPosition = function centerPosition(coordinate) {
    features.forEach(function (feature) {
      return feature.setStyle(icon_orange);
    });
    window.olMap.getView().setCenter(coordinate);
    var activeZoom = window.olMap.getView().getZoom();

    if (activeZoom < defaultZoom) {
      window.olMap.getView().setZoom(defaultZoom);
    }

    features = vectorSource.getFeaturesAtCoordinate(coordinate);
    features.forEach(function (feature) {
      return feature.setStyle(icon_blue);
    });
  };

  var constructPoint = function constructPoint(coord) {
    var epsgTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EPSG:25833';
    return (0, _proj.transform)([Number(coord.lon), Number(coord.lat)], coord.epsg, epsgTo);
  };

  return /*#__PURE__*/_react.default.createElement(_core.List, {
    component: "nav",
    dense: true,
    "aria-label": "search results"
  }, props.searchResult.searchResult && props.searchResult.searchResult.adresser.map(function (data, idx) {
    showInfoMarker(constructPoint(data.representasjonspunkt));
    return /*#__PURE__*/_react.default.createElement("div", {
      key: idx
    }, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
      color: "primary",
      button: true,
      onClick: function onClick() {
        centerPosition(constructPoint(data.representasjonspunkt));
      }
    }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
      primary: data.adressetekst + ', ' + data.kommunenavn
    })), /*#__PURE__*/_react.default.createElement(_core.Divider, null));
  }), props.searchResult.searchResultSSR && props.searchResult.searchResultSSR.sokRes.stedsnavn.map(function (data, idx) {
    showInfoMarker(constructPoint({
      lon: data.aust,
      lat: data.nord,
      epsg: 'EPSG:25833'
    }));
    return /*#__PURE__*/_react.default.createElement("div", {
      key: idx
    }, /*#__PURE__*/_react.default.createElement(_core.ListItem, {
      button: true,
      onClick: function onClick() {
        centerPosition(constructPoint({
          lon: data.aust,
          lat: data.nord,
          epsg: 'EPSG:25833'
        }));
      }
    }, /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
      primary: data.stedsnavn + ', ' + data.kommunenavn
    })), /*#__PURE__*/_react.default.createElement(_core.Divider, null));
  }));
};

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      '& > *': {
        margin: theme.spacing(2, 0)
      }
    }
  };
});
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

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      expandedAdress = _useState8[0],
      setStateAdress = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      expandedSsr = _useState10[0],
      setStateSsr = _useState10[1];

  var classes = useStyles();
  (0, _react.useEffect)(function () {
    if (searchText) {
      vectorSource.clear();
      (0, _setQueryString.default)({
        search: searchText
      });
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
      fetch((0, _n3api.generateSearchStedsnavnUrl)(searchText, 0, 15)).then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.text();
      }).then(function (result) {
        var response = parser.parse(result);

        if (response.sokRes.stedsnavn) {
          response.sokRes.stedsnavn = response.sokRes.stedsnavn[response.sokRes.stedsnavn.length - 1] === "" ? response.sokRes.stedsnavn.slice(0, response.sokRes.stedsnavn.length - 1) : response.sokRes.stedsnavn;
          response.sokRes.stedsnavn = Array.isArray(response.sokRes.stedsnavn) ? response.sokRes.stedsnavn : new Array(response.sokRes.stedsnavn);
          response.sokRes.stedsnavn ? setSearchResultSSR(response) : setSearchResultSSR('');
        } else {
          setSearchResultSSR(null);
        }
      }).catch(function (error) {
        console.warn(error);
      });
    } else {
      setSearchResult('');
      setSearchResultSSR('');
      vectorSource.clear();
      (0, _setQueryString.default)();
    }
  }, [searchText]);

  var onChangeBound = function onChangeBound(event) {
    setSearchText(event.target.value);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("form", {
    className: classes.root,
    noValidate: true,
    autoComplete: "off"
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    id: "standard-search",
    label: "Search field",
    variant: "outlined",
    size: "small",
    fullWidth: true,
    type: "search",
    placeholder: placeholder,
    onChange: onChangeBound
  })), /*#__PURE__*/_react.default.createElement("div", null, searchResult && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick() {
      return setStateAdress(!expandedAdress);
    },
    className: _SearchBarModule.default.expandBtn
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: _SearchBarModule.default.ellipsisToggle
  }, "ADRESSER"), expandedAdress ? /*#__PURE__*/_react.default.createElement(_icons.ExpandLess, null) : /*#__PURE__*/_react.default.createElement(_icons.ExpandMore, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: expandedAdress ? "".concat(_SearchBarModule.default.selected, " ").concat(_SearchBarModule.default.open) : _SearchBarModule.default.selected
  }, /*#__PURE__*/_react.default.createElement(SearchResult, {
    searchResult: {
      searchResult
    }
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick() {
      return setStateSsr(!expandedSsr);
    },
    className: _SearchBarModule.default.expandBtn
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: _SearchBarModule.default.ellipsisToggle
  }, "STEDSNAVN"), expandedSsr ? /*#__PURE__*/_react.default.createElement(_icons.ExpandLess, null) : /*#__PURE__*/_react.default.createElement(_icons.ExpandMore, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: expandedSsr ? "".concat(_SearchBarModule.default.selected, " ").concat(_SearchBarModule.default.open) : _SearchBarModule.default.selected
  }, /*#__PURE__*/_react.default.createElement(SearchResult, {
    searchResult: {
      searchResultSSR
    }
  }))))));
};

SearchBar.propTypes = {
  searchText: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onEnter: _propTypes.default.func,
  onSearchClick: _propTypes.default.func
};
SearchBar.defaultProps = {
  searchText: '',
  placeholder: 'Søk etter steder eller adresser',
  onChange: null,
  onEnter: null,
  onSearchClick: null
};
var _default = SearchBar;
exports.default = _default;
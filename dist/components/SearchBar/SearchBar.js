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

var _reactFontawesome = require("@fortawesome/react-fontawesome");

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

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

const parser = require('fast-xml-parser');

const defaultZoom = 13;
const vectorSource = new _source.Vector({});

const SearchResult = props => {
  const vectorLayer = new _layer.Vector({
    source: vectorSource
  });
  window.olMap.addLayer(vectorLayer);
  const icon_orange = new _style.Style({
    image: new _style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: _pinMdOrange.default
    })
  });
  const icon_blue = new _style.Style({
    image: new _style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: _pinMdBlueish.default
    })
  });
  let features = [];

  const showInfoMarker = coordinate => {
    let iconFeature = new _Feature.default({
      geometry: new _Point.default(coordinate)
    });
    iconFeature.setStyle(icon_orange);
    vectorSource.addFeature(iconFeature);
  };

  const centerPosition = coordinate => {
    features.forEach(feature => feature.setStyle(icon_orange));
    window.olMap.getView().setCenter(coordinate);
    const activeZoom = window.olMap.getView().getZoom();

    if (activeZoom < defaultZoom) {
      window.olMap.getView().setZoom(defaultZoom);
    }

    features = vectorSource.getFeaturesAtCoordinate(coordinate);
    features.forEach(feature => feature.setStyle(icon_blue));
  };

  const constructPoint = (coord, epsgTo = 'EPSG:25833') => (0, _proj.transform)([Number(coord.lon), Number(coord.lat)], coord.epsg, epsgTo);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "list-group"
  }, props.searchResult.searchResult && props.searchResult.searchResult.adresser.map((data, idx) => {
    showInfoMarker(constructPoint(data.representasjonspunkt));
    return /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      key: idx,
      className: "list-group-item list-group-item-action",
      onClick: () => {
        centerPosition(constructPoint(data.representasjonspunkt));
      }
    }, data.adressetekst, " , ", data.kommunenavn);
  }), props.searchResult.searchResultSSR && props.searchResult.searchResultSSR.sokRes.stedsnavn.map((data, idx) => {
    showInfoMarker(constructPoint({
      lon: data.aust,
      lat: data.nord,
      epsg: 'EPSG:25833'
    }));
    return /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      key: idx,
      className: "list-group-item list-group-item-action",
      onClick: () => {
        centerPosition(constructPoint({
          lon: data.aust,
          lat: data.nord,
          epsg: 'EPSG:25833'
        }));
      }
    }, data.stedsnavn, " , ", data.kommunenavn);
  }));
};
/**
 * SearchBar to be used in MapContainer
 * @param {*} props
 */


const SearchBar = props => {
  let queryValues = _queryString.default.parse(window.location.search);

  const _useState = (0, _react.useState)(queryValues["search"]),
        _useState2 = _slicedToArray(_useState, 2),
        searchText = _useState2[0],
        setSearchText = _useState2[1];

  const _useState3 = (0, _react.useState)(),
        _useState4 = _slicedToArray(_useState3, 2),
        searchResult = _useState4[0],
        setSearchResult = _useState4[1];

  const _useState5 = (0, _react.useState)(),
        _useState6 = _slicedToArray(_useState5, 2),
        searchResultSSR = _useState6[0],
        setSearchResultSSR = _useState6[1];

  const placeholder = props.placeholder;

  const _useState7 = (0, _react.useState)(false),
        _useState8 = _slicedToArray(_useState7, 2),
        expandedAdress = _useState8[0],
        setStateAdress = _useState8[1];

  const _useState9 = (0, _react.useState)(false),
        _useState10 = _slicedToArray(_useState9, 2),
        expandedSsr = _useState10[0],
        setStateSsr = _useState10[1];

  (0, _react.useEffect)(() => {
    if (searchText) {
      vectorSource.clear();
      (0, _setQueryString.default)({
        search: searchText
      });
      fetch((0, _n3api.generateAdresseSokUrl)(searchText)).then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.json();
      }).then(result => {
        setSearchResult(result);
      }).catch(error => {
        console.warn(error);
      });
      fetch((0, _n3api.generateSearchStedsnavnUrl)(searchText, 0, 15)).then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response.text();
      }).then(result => {
        let response = parser.parse(result);

        if (response.sokRes.stedsnavn) {
          response.sokRes.stedsnavn = response.sokRes.stedsnavn[response.sokRes.stedsnavn.length - 1] === "" ? response.sokRes.stedsnavn.slice(0, response.sokRes.stedsnavn.length - 1) : response.sokRes.stedsnavn;
          response.sokRes.stedsnavn = Array.isArray(response.sokRes.stedsnavn) ? response.sokRes.stedsnavn : new Array(response.sokRes.stedsnavn);
          response.sokRes.stedsnavn ? setSearchResultSSR(response) : setSearchResultSSR('');
        } else {
          setSearchResultSSR(null);
        }
      }).catch(error => {
        console.warn(error);
      });
    } else {
      setSearchResult('');
      setSearchResultSSR('');
      vectorSource.clear();
      (0, _setQueryString.default)();
    }
  }, [searchText]);

  const onChangeBound = event => {
    setSearchText(event.target.value);
  }; //const updateQuery = search_query => dispatch({ type: 'UPDATE_SEARCH_STRING', payload: search_query })


  const resetSearch = () => {
    setSearchText("");
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group col"
  }, /*#__PURE__*/_react.default.createElement("input", {
    className: _SearchBarModule.default.searchInput,
    onChange: onChangeBound,
    placeholder: placeholder,
    type: "text",
    value: searchText,
    "aria-describedby": "button-addon1"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group-append"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-link",
    type: "button",
    id: "button-addon1",
    onClick: () => resetSearch()
  }, searchText ? /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "times"
  }) : ''))), /*#__PURE__*/_react.default.createElement("div", {
    className: _SearchBarModule.default.searchResult
  }, searchResult && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => setStateAdress(!expandedAdress),
    className: _SearchBarModule.default.expandBtn
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: _SearchBarModule.default.ellipsisToggle
  }, "ADRESSER"), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: expandedAdress ? ['fas', 'angle-up'] : ['fas', 'angle-down']
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: expandedAdress ? "".concat(_SearchBarModule.default.selected, " ").concat(_SearchBarModule.default.open) : _SearchBarModule.default.selected
  }, /*#__PURE__*/_react.default.createElement(SearchResult, {
    searchResult: {
      searchResult
    }
  }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    onClick: () => setStateSsr(!expandedSsr),
    className: _SearchBarModule.default.expandBtn
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: _SearchBarModule.default.ellipsisToggle
  }, "STEDSNAVN"), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: expandedSsr ? ['fas', 'angle-up'] : ['fas', 'angle-down']
  })), /*#__PURE__*/_react.default.createElement("div", {
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
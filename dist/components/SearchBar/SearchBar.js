"use strict";

var _interopRequireWildcard = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("C:\\code_git\\r_map.github\\node_modules\\@babel\\runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

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
    }, data.adressetekst, " , ", data.kommunenavn);
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
    }, data.stedsnavn, " , ", data.kommunenavn);
  }));
};
/**
 * SearchBar to be used in MapContainer
 * @param {*} props
 */


var SearchBar = function SearchBar(props) {
  var queryValues = _queryString.default.parse(window.location.search);

  var _useState = (0, _react.useState)(queryValues["search"]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      searchText = _useState2[0],
      setSearchText = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      searchResult = _useState4[0],
      setSearchResult = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      searchResultSSR = _useState6[0],
      setSearchResultSSR = _useState6[1];

  var placeholder = props.placeholder;

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      expandedAdress = _useState8[0],
      setStateAdress = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      expandedSsr = _useState10[0],
      setStateSsr = _useState10[1];

  (0, _react.useEffect)(function () {
    if (searchText) {
      vectorSource.clear();
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
  }; //const updateQuery = search_query => dispatch({ type: 'UPDATE_SEARCH_STRING', payload: search_query })


  var resetSearch = function resetSearch() {
    setSearchText("");
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "input-group col"
  }, _react.default.createElement("input", {
    className: _SearchBarModule.default.searchInput,
    onChange: onChangeBound,
    placeholder: placeholder,
    type: "text",
    value: searchText,
    "aria-describedby": "button-addon1"
  }), _react.default.createElement("div", {
    className: "input-group-append"
  }, _react.default.createElement("button", {
    className: "btn btn-link",
    type: "button",
    id: "button-addon1",
    onClick: function onClick() {
      return resetSearch();
    }
  }, searchText ? _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "times"
  }) : ''))), _react.default.createElement("div", {
    className: _SearchBarModule.default.searchResult
  }, searchResult && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, _react.default.createElement("div", {
    onClick: function onClick() {
      return setStateAdress(!expandedAdress);
    },
    className: _SearchBarModule.default.expandBtn
  }, _react.default.createElement("span", {
    className: _SearchBarModule.default.ellipsisToggle
  }, "ADRESSER"), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: expandedAdress ? ['fas', 'angle-up'] : ['fas', 'angle-down']
  })), _react.default.createElement("div", {
    className: expandedAdress ? "".concat(_SearchBarModule.default.selected, " ").concat(_SearchBarModule.default.open) : _SearchBarModule.default.selected
  }, _react.default.createElement(SearchResult, {
    searchResult: {
      searchResult: searchResult
    }
  }))), _react.default.createElement("div", null, _react.default.createElement("div", {
    onClick: function onClick() {
      return setStateSsr(!expandedSsr);
    },
    className: _SearchBarModule.default.expandBtn
  }, _react.default.createElement("span", {
    className: _SearchBarModule.default.ellipsisToggle
  }, "STEDSNAVN"), _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: expandedSsr ? ['fas', 'angle-up'] : ['fas', 'angle-down']
  })), _react.default.createElement("div", {
    className: expandedSsr ? "".concat(_SearchBarModule.default.selected, " ").concat(_SearchBarModule.default.open) : _SearchBarModule.default.selected
  }, _react.default.createElement(SearchResult, {
    searchResult: {
      searchResultSSR: searchResultSSR
    }
  }))))));
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
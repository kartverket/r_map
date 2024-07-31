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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
  const constructPoint = function (coord) {
    let epsgTo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'EPSG:25833';
    return (0, _proj.transform)([Number(coord.lon), Number(coord.lat)], coord.epsg, epsgTo);
  };
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
  }), props.searchResult.searchResultSSR && props.searchResult.searchResultSSR.map((data, idx) => {
    showInfoMarker(constructPoint({
      lon: data.representasjonspunkt['øst'],
      lat: data.representasjonspunkt['nord'],
      epsg: 'EPSG:4258'
    }));
    return /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      key: idx,
      className: "list-group-item list-group-item-action",
      onClick: () => {
        centerPosition(constructPoint({
          lon: data.representasjonspunkt['øst'],
          lat: data.representasjonspunkt['nord'],
          epsg: 'EPSG:4258'
        }));
      }
    }, data['skrivemåte'], " , ", data.kommuner ? data.kommuner[0].kommunenavn : '');
  }));
};
/**
 * SearchBar to be used in MapContainer
 * @param {*} props
 */
const SearchBar = props => {
  let queryValues = _queryString.default.parse(window.location.search);
  const [searchText, setSearchText] = (0, _react.useState)(queryValues["search"]);
  const [searchResult, setSearchResult] = (0, _react.useState)();
  const [searchResultSSR, setSearchResultSSR] = (0, _react.useState)();
  const {
    placeholder
  } = props;
  const [expandedAdress, setStateAdress] = (0, _react.useState)(false);
  const [expandedSsr, setStateSsr] = (0, _react.useState)(false);
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
      fetch((0, _n3api.generateSearchStedsnavnUrl)(searchText, 1, 15)).then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      }).then(result => {
        let ssr = result['navn'];
        if (ssr) {
          ssr ? setSearchResultSSR(ssr) : setSearchResultSSR('');
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
  };
  //const updateQuery = search_query => dispatch({ type: 'UPDATE_SEARCH_STRING', payload: search_query })
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